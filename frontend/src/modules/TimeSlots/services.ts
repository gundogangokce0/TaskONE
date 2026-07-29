import api from '../../services/api'

export interface TimeSlot {
  id?: string
  day: string
  hour: number
  created_at?: string
  updated_at?: string
  is_active?: boolean
}

export const timeSlotService = {
  // READ: Fetch list of all time slots
  async getTimeSlots(): Promise<TimeSlot[]> {
    const response = await api.get<TimeSlot[]>('/timeslots/')
    return response.data
  },

  // CREATE: Add a new time slot
  async createTimeSlot(payload: TimeSlot): Promise<TimeSlot> {
    const response = await api.post<TimeSlot>('/timeslots/', payload)
    return response.data
  },

  // UPDATE: Update time slot details by ID
  async updateTimeSlot(id: string, payload: TimeSlot): Promise<TimeSlot> {
    const response = await api.put<TimeSlot>(`/timeslots/${id}/`, payload)
    return response.data
  },

  // DELETE: Remove a time slot by ID
  async deleteTimeSlot(id: string): Promise<void> {
    await api.delete(`/timeslots/${id}/`)
  }
}
