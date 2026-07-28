import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000/api'

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

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/login/`, payload)
    return response.data
  }
}
