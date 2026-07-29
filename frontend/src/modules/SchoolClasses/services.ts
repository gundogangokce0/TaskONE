import api from '../../services/api'

export interface SchoolClass {
  id?: string
  name: string
  created_at?: string
  updated_at?: string
  is_active?: boolean
}

export const schoolClassService = {
  // READ: Fetch list of all school classes
  async getSchoolClasses(): Promise<SchoolClass[]> {
    const response = await api.get<SchoolClass[]>('/schoolclasses/')
    return response.data
  },

  // CREATE: Add a new school class
  async createSchoolClass(payload: SchoolClass): Promise<SchoolClass> {
    const response = await api.post<SchoolClass>('/schoolclasses/', payload)
    return response.data
  },

  // UPDATE: Update school class details by ID
  async updateSchoolClass(id: string, payload: SchoolClass): Promise<SchoolClass> {
    const response = await api.put<SchoolClass>(`/schoolclasses/${id}/`, payload)
    return response.data
  },

  // DELETE: Remove a school class by ID
  async deleteSchoolClass(id: string): Promise<void> {
    await api.delete(`/schoolclasses/${id}/`)
  }
}
