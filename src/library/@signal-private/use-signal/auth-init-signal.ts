import { signal } from "@Signal/signal";
import Cookies from "js-cookie";
import { AksesItemDto, LoginUserDto } from "@Hooks/api-generated";
import network_cache from "@Hooks/api-cache";
import { jwtDecode } from "jwt-decode";
import { EJenisActor } from "@Utils/enum";

const AUTH_COOKIE_SELECTED_TOKEN = "selectedToken";
const AUTH_COOKIE_AKSES_LIST = "aksesList";

const AUTH_COOKIE_OPTIONS = {
  expires: 7,
  path: "/",
  sameSite: "lax" as const,
  secure: typeof window !== "undefined" ? window.location.protocol === "https:" : false,
};

export type AuthSignalType = {
  selectedToken?: string;
  loginResponse?: LoginUserDto;
  selectedAuthorization?: AksesItemDto;
  data?: Record<string, unknown>;
};

type DecodedJwtPayload = {
  exp?: number;
  jenis_actor?: string;
  role?: string;
  roles?: string[];
  id_pegawai?: string;
  nama?: string;
  foto?: string;
} & Record<string, unknown>;

const normalize_role = (value: string): string => {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
};

const enum_role_map = Object.values(EJenisActor).reduce<Record<string, string>>((acc, role) => {
  acc[normalize_role(role)] = role;
  return acc;
}, {});

const decode_jwt = (token: string): DecodedJwtPayload | undefined => {
  try {
    return jwtDecode<DecodedJwtPayload>(token);
  } catch {
    return undefined;
  }
};

const find_selected_authorization = (loginResponse: LoginUserDto, selectedToken: string): AksesItemDto | undefined => {
  return loginResponse.akses?.find((auth) => auth.token === selectedToken);
};

const get_cookie_item = (key: string): string | undefined => Cookies.get(key);

const set_cookie_item = (key: string, value: string) => {
  Cookies.set(key, value, AUTH_COOKIE_OPTIONS);
};

const remove_cookie_item = (key: string) => {
  Cookies.remove(key);
  Cookies.remove(key, { path: "/" });
};

const parse_akses_list = (raw: string | null): AksesItemDto[] => {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as AksesItemDto[];
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item?.akses === "string" && typeof item?.token === "string") : [];
  } catch {
    return [];
  }
};

const find_akses_by_token = (aksesList: AksesItemDto[], selectedToken: string): AksesItemDto | undefined => {
  return aksesList.find((aksesItem) => aksesItem.token === selectedToken);
};

const resolve_selected_token_for_akses = (aksesList: AksesItemDto[], preferredToken?: string): string | undefined => {
  if (preferredToken && find_akses_by_token(aksesList, preferredToken)) {
    return preferredToken;
  }

  return aksesList[0]?.token;
};

const build_login_response_from_akses = (aksesList: AksesItemDto[], selectedToken: string): LoginUserDto => {
  const decodedData = decode_jwt(selectedToken);

  return {
    id_pegawai: typeof decodedData?.id_pegawai === "string" ? decodedData.id_pegawai : "",
    nama: typeof decodedData?.nama === "string" ? decodedData.nama : "Guest",
    foto: typeof decodedData?.foto === "string" ? decodedData.foto : undefined,
    akses: aksesList,
  };
};

const build_auth_state = (selectedToken: string, loginResponse: LoginUserDto): AuthSignalType | undefined => {
  const selectedAuthorization = find_selected_authorization(loginResponse, selectedToken);
  if (!selectedAuthorization) {
    return undefined;
  }

  const decodedData = decode_jwt(selectedToken);
  if (!decodedData) {
    return undefined;
  }

  return {
    selectedToken,
    loginResponse,
    selectedAuthorization,
    data: decodedData,
  };
};

const is_token_expired = (payload?: DecodedJwtPayload): boolean => {
  if (!payload?.exp) {
    return false;
  }
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
};

function auth_signal_initial_value(): AuthSignalType {
  const selectedToken = get_cookie_item(AUTH_COOKIE_SELECTED_TOKEN);
  const storedAkses = parse_akses_list(get_cookie_item(AUTH_COOKIE_AKSES_LIST) ?? null);
  const resolvedToken = resolve_selected_token_for_akses(storedAkses, selectedToken ?? undefined);

  if (!resolvedToken || storedAkses.length === 0) {
    return {};
  }

  try {
    const parsedLoginResponse = build_login_response_from_akses(storedAkses, resolvedToken);
    const authState = build_auth_state(resolvedToken, parsedLoginResponse);

    if (!authState || is_token_expired(authState.data as DecodedJwtPayload)) {
      remove_cookie_item(AUTH_COOKIE_SELECTED_TOKEN);
      remove_cookie_item(AUTH_COOKIE_AKSES_LIST);
      return {};
    }

    if (selectedToken !== resolvedToken) {
      set_cookie_item(AUTH_COOKIE_SELECTED_TOKEN, resolvedToken);
    }

    return authState;
  } catch {
    return {};
  }
}

export const auth_signal = signal<AuthSignalType>(auth_signal_initial_value());

const get_login_response_from_state_or_storage = (): LoginUserDto | undefined => {
  if (auth_signal.value.loginResponse) {
    return auth_signal.value.loginResponse;
  }

  const aksesList = parse_akses_list(get_cookie_item(AUTH_COOKIE_AKSES_LIST) ?? null);
  const selectedToken = get_cookie_item(AUTH_COOKIE_SELECTED_TOKEN);
  const resolvedToken = resolve_selected_token_for_akses(aksesList, selectedToken ?? undefined);

  if (!resolvedToken || aksesList.length === 0) {
    return undefined;
  }

  try {
    return build_login_response_from_akses(aksesList, resolvedToken);
  } catch {
    return undefined;
  }
};

// Set login response dan simpan akses ke cookie
export const set_login_response = (response: LoginUserDto) => {
  const aksesList = response.akses ?? [];
  const selectedTokenFromCookie = get_cookie_item(AUTH_COOKIE_SELECTED_TOKEN) || auth_signal.value.selectedToken;
  const nextToken = resolve_selected_token_for_akses(aksesList, selectedTokenFromCookie ?? undefined);

  const nextAuthState = nextToken ? build_auth_state(nextToken, response) : undefined;

  auth_signal.value = {
    ...(nextAuthState ?? {}),
    loginResponse: response,
  };

  set_cookie_item(AUTH_COOKIE_AKSES_LIST, JSON.stringify(aksesList));

  if (nextAuthState?.selectedToken) {
    set_cookie_item(AUTH_COOKIE_SELECTED_TOKEN, nextAuthState.selectedToken);
  } else {
    remove_cookie_item(AUTH_COOKIE_SELECTED_TOKEN);
  }
};

// Set selected authorization token dan simpan ke cookie
export const set_selected_token = (selectedToken: string) => {
  try {
    const loginResponse = get_login_response_from_state_or_storage();
    if (!loginResponse) {
      throw new Error("Missing login response");
    }

    const nextAuthState = build_auth_state(selectedToken, loginResponse);
    if (!nextAuthState) {
      throw new Error("Selected token is not available in login response or invalid");
    }

    if (is_token_expired(nextAuthState.data as DecodedJwtPayload)) {
      throw new Error("JWT token is expired");
    }

    auth_signal.value = {
      ...auth_signal.value,
      selectedToken: nextAuthState.selectedToken,
      selectedAuthorization: nextAuthState.selectedAuthorization,
      data: nextAuthState.data,
      loginResponse,
    };

    set_cookie_item(AUTH_COOKIE_SELECTED_TOKEN, selectedToken);
  } catch (error) {
    console.error("Error setting selected token:", error);
    throw new Error(`Failed to set selected token: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

// Clear auth data
export const clear_auth = () => {
  auth_signal.value = {};
  network_cache.clear();
  remove_cookie_item(AUTH_COOKIE_SELECTED_TOKEN);
  remove_cookie_item(AUTH_COOKIE_AKSES_LIST);
};

// untuk cek role berdasarkan jenis_actor dari JWT data
export const they_are = (roles: string | string[]) => {
  const expectedRolesRaw = Array.isArray(roles) ? roles : [roles];
  const expectedRoles = expectedRolesRaw.map((role) => normalize_role(role));
  const jwtData = auth_signal.value.data as DecodedJwtPayload | undefined;

  const currentRolesRaw = [...(Array.isArray(jwtData?.roles) ? jwtData.roles : []), ...(typeof jwtData?.role === "string" ? [jwtData.role] : []), ...(typeof jwtData?.jenis_actor === "string" ? [jwtData.jenis_actor] : [])];

  const normalizedCurrentRoles = currentRolesRaw.map((role) => normalize_role(role)).map((role) => (enum_role_map[role] ? normalize_role(enum_role_map[role]) : role));

  return normalizedCurrentRoles.some((role) => expectedRoles.includes(role));
};

// untuk cek akses user berdasarkan label akses dari API login
export const has_akses = (akses: string | string[]) => {
  const expectedAksesRaw = Array.isArray(akses) ? akses : [akses];
  const expectedAkses = expectedAksesRaw.map((item) => normalize_role(item));

  const currentAkses = auth_signal.value.loginResponse?.akses ?? [];
  const normalizedCurrentAkses = currentAkses.map((item) => normalize_role(item.akses));

  return normalizedCurrentAkses.some((item) => expectedAkses.includes(item));
};

// Force refresh auth state from cookies (for immediate validation)
export const refresh_auth_from_cookies = () => {
  const selectedToken = get_cookie_item(AUTH_COOKIE_SELECTED_TOKEN);
  const aksesList = parse_akses_list(get_cookie_item(AUTH_COOKIE_AKSES_LIST) ?? null);
  const resolvedToken = resolve_selected_token_for_akses(aksesList, selectedToken ?? undefined);

  if (!resolvedToken || aksesList.length === 0) {
    clear_auth();
    return false;
  }

  try {
    const parsedLoginResponse = build_login_response_from_akses(aksesList, resolvedToken);
    const authState = build_auth_state(resolvedToken, parsedLoginResponse);
    if (!authState || is_token_expired(authState.data as DecodedJwtPayload)) {
      clear_auth();
      return false;
    }

    auth_signal.value = authState;
    set_cookie_item(AUTH_COOKIE_SELECTED_TOKEN, resolvedToken);

    return true;
  } catch {
    clear_auth();
    return false;
  }
};

// Helper function to check if user is authenticated
export const is_authenticated = () => {
  // First refresh from cookies to ensure consistency
  return refresh_auth_from_cookies();
};
