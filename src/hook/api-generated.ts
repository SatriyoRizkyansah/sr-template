/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface StandartResponse {
  /** @example 200 */
  status: number;
  /** @example "ok" */
  message: string;
}

export interface AksesItemDto {
  /**
   * Label akses yang ditampilkan ke user
   * @example "Admin Universitas Pamulang"
   */
  akses: string;
  /**
   * JWT token untuk akses ini
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  token: string;
}

export interface LoginUserDto {
  /** @example "211972" */
  id_pegawai: string;
  /** @example "M. IRHAM" */
  nama: string;
  /** @example "foto/xxx.png" */
  foto?: string;
  akses: AksesItemDto[];
}

export interface LoginResponseDto {
  /** @example 200 */
  status: number;
  /** @example "Login berhasil" */
  message: string;
  data: LoginUserDto;
}

export interface LoginDto {
  /**
   * NIP / ID Pegawai
   * @example "250286"
   */
  username: string;
  /**
   * Password user
   * @example "devByPass"
   */
  password: string;
  /** Captcha jika diperlukan */
  captcha?: string;
}

export interface StandartResponseError {
  /** @example 400 */
  status: number;
  /** @example "Data tidak ditemukan" */
  message: string;
}

export interface StandartResponseServerError {
  /** @example 500 */
  status: number;
  /** @example "Server error" */
  message: string;
}

export interface ProfileUserDto {
  /** @example "211972" */
  id_pegawai: string;
  /** @example "M. IRHAM" */
  nama: string;
  gelar_depan?: string;
  gelar_belakang?: string;
  tempat_lahir?: string;
  /**
   * @format date-time
   * @example "1990-01-01"
   */
  tgl_lahir?: string;
  jenis_kelamin?: number;
  agama?: number;
  nama_ibu?: string;
  no_ktp?: string;
  no_kk?: string;
  npwp?: string;
  provinsi?: string;
  kota?: string;
  kecamatan?: string;
  kelurahan?: string;
  kode_pos?: string;
  rt?: string;
  rw?: string;
  alamat?: string;
  provinsi_dom?: string;
  kota_dom?: string;
  kecamatan_dom?: string;
  kelurahan_dom?: string;
  kode_pos_dom?: string;
  rt_dom?: string;
  rw_dom?: string;
  alamat_dom?: string;
  no_telp?: string;
  no_hp?: string;
  email?: string;
  email_pribadi?: string;
  no_rekening?: string;
  no_rekening_bpr?: string;
  no_rekening_dki?: string;
  status_aktif?: number;
  keterangan?: string;
  status_payroll?: boolean;
  status_siskemu?: boolean;
  status_sia?: boolean;
  jab_fungsional?: number;
  foto?: string;
}

export interface ProfileResponseDto {
  /** @example 200 */
  status: number;
  /** @example "Berhasil mengambil profil" */
  message: string;
  data: ProfileUserDto;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys.map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key))).join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) => (input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input),
    [ContentType.JsonApi]: (input: any) => (input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input),
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(key, property instanceof Blob ? property : typeof property === "object" && property !== null ? JSON.stringify(property) : `${property}`);
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({ body, secure, path, type, query, format, baseUrl, cancelToken, ...params }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams = ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) && this.securityWorker && (await this.securityWorker(this.securityData))) || {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title HRMS API
 * @version 2.0
 * @contact
 *
 * Dokumentasi API untuk aplikasi HRMS
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name HealthCheck
     * @summary api health check
     * @request GET:/api/health
     */
    healthCheck: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/health`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name Login
     * @request POST:/api/auth/login
     */
    login: (data: LoginDto, params: RequestParams = {}) =>
      this.request<
        StandartResponse & {
          data?: LoginResponseDto;
        },
        StandartResponseError | StandartResponseServerError
      >({
        path: `/api/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  profile = {
    /**
     * No description
     *
     * @tags Profile
     * @name GetProfile
     * @summary Get profile user login (Pegawai, Admin, PanitiaBeasiswa, dan Keuangan)
     * @request GET:/api/profile
     * @secure
     */
    getProfile: (params: RequestParams = {}) =>
      this.request<
        StandartResponse & {
          data?: ProfileResponseDto;
        },
        StandartResponseError | StandartResponseServerError
      >({
        path: `/api/profile`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
