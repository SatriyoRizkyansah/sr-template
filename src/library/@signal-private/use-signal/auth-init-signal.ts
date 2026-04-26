import { signal } from "@Signal/signal";
import Cookies from "js-cookie";
import { AksesItemDto, LoginUserDto } from "@Hooks/api-generated";
import network_cache from "@Hooks/api-cache";
import { jwtDecode } from "jwt-decode";
import { EJenisActor } from "@Utils/enum";

const AUTH_COOKIE_SELECTED_TOKEN = "selectedToken";
const AUTH_COOKIE_LOGIN_RESPONSE = "loginResponse";

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
  const selectedToken = Cookies.get(AUTH_COOKIE_SELECTED_TOKEN);
  const loginResponse = Cookies.get(AUTH_COOKIE_LOGIN_RESPONSE);

  if (!selectedToken || !loginResponse) {
    return {};
  }

  try {
    const parsedLoginResponse: LoginUserDto = JSON.parse(loginResponse);
    const authState = build_auth_state(selectedToken, parsedLoginResponse);

    if (!authState || is_token_expired(authState.data as DecodedJwtPayload)) {
      return {};
    }

    return authState;
  } catch {
    return {};
  }
}

export const auth_signal = signal<AuthSignalType>(auth_signal_initial_value());

// Set login response dan simpan ke cookie
export const set_login_response = (response: LoginUserDto) => {
  const selectedTokenFromCookie = Cookies.get(AUTH_COOKIE_SELECTED_TOKEN) || auth_signal.value.selectedToken;
  const fallbackToken = response.akses?.[0]?.token;
  const nextToken = selectedTokenFromCookie || fallbackToken;

  const nextAuthState = nextToken ? build_auth_state(nextToken, response) : undefined;

  auth_signal.value = {
    ...(nextAuthState ?? {}),
    loginResponse: response,
  };

  Cookies.set(AUTH_COOKIE_LOGIN_RESPONSE, JSON.stringify(response), AUTH_COOKIE_OPTIONS);

  if (nextAuthState?.selectedToken) {
    Cookies.set(AUTH_COOKIE_SELECTED_TOKEN, nextAuthState.selectedToken, AUTH_COOKIE_OPTIONS);
  } else {
    Cookies.remove(AUTH_COOKIE_SELECTED_TOKEN, { path: "/" });
    Cookies.remove(AUTH_COOKIE_SELECTED_TOKEN);
  }
};

// Set selected authorization token dan simpan ke cookie
export const set_selected_token = (authorization: AksesItemDto) => {
  try {
    const actualToken = authorization.token;

    const decodedData = decode_jwt(actualToken);
    if (!decodedData) {
      throw new Error("Invalid JWT token");
    }

    if (is_token_expired(decodedData)) {
      throw new Error("JWT token is expired");
    }

    auth_signal.value = {
      ...auth_signal.value,
      selectedToken: actualToken,
      selectedAuthorization: authorization,
      data: decodedData,
    };

    Cookies.set(AUTH_COOKIE_SELECTED_TOKEN, actualToken, AUTH_COOKIE_OPTIONS);
  } catch (error) {
    console.error("Error setting selected token:", error);
    throw new Error(`Failed to set selected token: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

// Clear auth data
export const clear_auth = () => {
  auth_signal.value = {};
  network_cache.clear();
  Cookies.remove(AUTH_COOKIE_SELECTED_TOKEN);
  Cookies.remove(AUTH_COOKIE_SELECTED_TOKEN, { path: "/" });
  Cookies.remove(AUTH_COOKIE_LOGIN_RESPONSE);
  Cookies.remove(AUTH_COOKIE_LOGIN_RESPONSE, { path: "/" });
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
  const selectedToken = Cookies.get(AUTH_COOKIE_SELECTED_TOKEN);
  const loginResponse = Cookies.get(AUTH_COOKIE_LOGIN_RESPONSE);

  if (!selectedToken || !loginResponse) {
    clear_auth();
    return false;
  }

  try {
    const parsedLoginResponse: LoginUserDto = JSON.parse(loginResponse);
    const authState = build_auth_state(selectedToken, parsedLoginResponse);
    if (!authState || is_token_expired(authState.data as DecodedJwtPayload)) {
      clear_auth();
      return false;
    }

    auth_signal.value = authState;

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
