import api from '../../services/api'

export interface Classroom {
  id?: string
  name: string
  is_lab: boolean
  created_at?: string
  updated_at?: string
  is_active?: boolean
}

export const classroomService = {
  // READ: Fetch list of all classrooms
  async getClassrooms(): Promise<Classroom[]> {
    const response = await api.get<Classroom[]>('/classrooms/')
    return response.data
  },

  // CREATE: Add a new classroom
  async createClassroom(payload: Classroom): Promise<Classroom> {
    const response = await api.post<Classroom>('/classrooms/', payload)
    return response.data
  },

  // UPDATE: Update classroom details by ID
  async updateClassroom(id: string, payload: Classroom): Promise<Classroom> {
    const response = await api.put<Classroom>(`/classrooms/${id}/`, payload)
    return response.data
  },

  // DELETE: Remove a classroom by ID
  async deleteClassroom(id: string): Promise<void> {
    await api.delete(`/classrooms/${id}/`)
  }
}
