import api from '../../services/api'

export interface Teacher {
  id?: string
  name: string
  off_day: string
  created_at?: string
  updated_at?: string
  is_active?: boolean
}

export const teacherService = {
  // READ: Fetch list of all teachers
  async getTeachers(): Promise<Teacher[]> {
    const response = await api.get<Teacher[]>('/teachers/')
    return response.data
  },

  // CREATE: Add a new teacher
  async createTeacher(payload: Teacher): Promise<Teacher> {
    const response = await api.post<Teacher>('/teachers/', payload)
    return response.data
  },

  // UPDATE: Update teacher details by ID
  async updateTeacher(id: string, payload: Teacher): Promise<Teacher> {
    const response = await api.put<Teacher>(`/teachers/${id}/`, payload)
    return response.data
  },

  // DELETE: Remove a teacher by ID
  async deleteTeacher(id: string): Promise<void> {
    await api.delete(`/teachers/${id}/`)
  }
}
