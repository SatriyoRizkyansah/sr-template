import { signal } from '@Signal/signal'
import Cookies from 'js-cookie'
import { LoginData, LoginAuthorizationData } from '@Hooks/api-generated'
import { EJenisActor } from '@Utils/enum'
import network_cache from '@Hooks/api-cache'
import { jwtDecode } from 'jwt-decode'

const AUTH_COOKIE_OPTIONS = {
  expires: 7,
  path: '/',
  sameSite: 'lax' as const,
}

export type AuthSignalType = {
  selectedToken?: string
  loginResponse?: LoginData
  selectedAuthorization?: LoginAuthorizationData
  data?: any // JWT decoded data
}

function auth_signal_initial_value(): AuthSignalType {
  const selectedToken = Cookies.get('selectedToken')
  const loginResponse = Cookies.get('loginResponse')

  if (!selectedToken || !loginResponse) {
    return {}
  }

  try {
    const parsedLoginResponse: LoginData = JSON.parse(loginResponse)

    // Cari authorization yang sesuai
    const selectedAuthorization = parsedLoginResponse.authorization.find((auth: LoginAuthorizationData) => {
      return auth.token === selectedToken
    })

    // Decode JWT token
    let decodedData
    try {
      decodedData = jwtDecode(selectedToken)
    } catch {
      decodedData = undefined
    }

    return {
      selectedToken,
      loginResponse: parsedLoginResponse,
      selectedAuthorization,
      data: decodedData,
    }
  } catch {
    return {}
  }
}

export const auth_signal = signal<AuthSignalType>(auth_signal_initial_value())

// Set login response dan simpan ke cookie
export const set_login_response = (response: LoginData) => {
  auth_signal.value = {
    ...auth_signal.value,
    loginResponse: response,
  }

  Cookies.set('loginResponse', JSON.stringify(response), AUTH_COOKIE_OPTIONS)
}

// Set selected authorization token dan simpan ke cookie
export const set_selected_token = (authorization: LoginAuthorizationData) => {
  try {
    const actualToken = authorization.token

    let decodedData
    try {
      decodedData = jwtDecode(actualToken)
    } catch (decodeError) {
      console.error('Error decoding JWT:', decodeError)
      throw new Error('Invalid JWT token')
    }

    auth_signal.value = {
      ...auth_signal.value,
      selectedToken: actualToken,
      selectedAuthorization: authorization,
      data: decodedData,
    }

    Cookies.set('selectedToken', actualToken, AUTH_COOKIE_OPTIONS)
  } catch (error) {
    console.error('Error setting selected token:', error)
    throw new Error(`Failed to set selected token: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Clear auth data
export const clear_auth = () => {
  auth_signal.value = {}
  network_cache.clear()
  Cookies.remove('selectedToken')
  Cookies.remove('selectedToken', { path: '/' })
  Cookies.remove('loginResponse')
  Cookies.remove('loginResponse', { path: '/' })
}

// untuk cek role berdasarkan jenis_actor dari JWT data
export const they_are = (roles: string) => {
  const jwtData = auth_signal.value.data as any
  const normalizedRole = jwtData?.jenis_actor === 'UNIVERSITAS' ? EJenisActor.UNIVERSITAS : jwtData?.jenis_actor
  return roles.includes(normalizedRole || '')
}

// Force refresh auth state from cookies (for immediate validation)
export const refresh_auth_from_cookies = () => {
  const selectedToken = Cookies.get('selectedToken')
  const loginResponse = Cookies.get('loginResponse')

  if (!selectedToken || !loginResponse) {
    clear_auth()
    return false
  }

  try {
    const parsedLoginResponse: LoginData = JSON.parse(loginResponse)
    const selectedAuthorization = parsedLoginResponse.authorization.find((auth: LoginAuthorizationData) => {
      return auth.token === selectedToken
    })

    let decodedData
    try {
      decodedData = jwtDecode(selectedToken)

      // Check if token is expired
      const currentTime = Math.floor(Date.now() / 1000)
      if (decodedData.exp && decodedData.exp < currentTime) {
        clear_auth()
        return false
      }
    } catch {
      clear_auth()
      return false
    }

    auth_signal.value = {
      selectedToken,
      loginResponse: parsedLoginResponse,
      selectedAuthorization,
      data: decodedData,
    }

    return true
  } catch {
    clear_auth()
    return false
  }
}

// Helper function to check if user is authenticated
export const is_authenticated = () => {
  // First refresh from cookies to ensure consistency
  return refresh_auth_from_cookies()
}
