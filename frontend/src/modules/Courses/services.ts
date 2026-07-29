import api from '../../services/api'

export interface Course {
  id?: string
  name: string
  is_lab_required: boolean
  created_at?: string
  updated_at?: string
  is_active?: boolean
}

export const courseService = {
  // READ: Fetch list of all courses
  async getCourses(): Promise<Course[]> {
    const response = await api.get<Course[]>('/courses/')
    return response.data
  },

  // CREATE: Add a new course
  async createCourse(payload: Course): Promise<Course> {
    const response = await api.post<Course>('/courses/', payload)
    return response.data
  },

  // UPDATE: Update course details by ID
  async updateCourse(id: string, payload: Course): Promise<Course> {
    const response = await api.put<Course>(`/courses/${id}/`, payload)
    return response.data
  },

  // DELETE: Remove a course by ID
  async deleteCourse(id: string): Promise<void> {
    await api.delete(`/courses/${id}/`)
  }
}
