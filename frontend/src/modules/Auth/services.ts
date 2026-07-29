import api from '../../services/api'

export interface LoginPayload {
  username: string
  password: string
}

export interface LoginResponse {
  message?: string
  access?: string
  refresh?: string
  user?: {
    id: number
    username: string
  }
  error?: string
}

export interface UserMeResponse {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  is_staff: boolean
}

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login/', payload)
    return response.data
  },
  async getMe(): Promise<UserMeResponse> {
    const response = await api.get<UserMeResponse>('/auth/me/')
    return response.data
  }
}
