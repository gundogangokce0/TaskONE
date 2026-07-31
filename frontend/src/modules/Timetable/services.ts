export interface TimetableEntry {
  id: string
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'
  hour: number // 1 to 7
  timeString: string // e.g. "09:00 - 09:50"
  courseName: string
  teacherTitle: string
  teacherName: string
  classroomName: string
  className: string
  isLab: boolean
  colorTheme: 'purple' | 'blue' | 'emerald' | 'amber' | 'rose'
}

export const mockTimetableData: TimetableEntry[] = [
  // MONDAY
  {
    id: '1',
    day: 'Monday',
    hour: 1,
    timeString: '09:00 - 09:50',
    courseName: 'Veritabanı Yönetimi',
    teacherTitle: 'Prof. Dr.',
    teacherName: 'Ahmet Yılmaz',
    classroomName: 'Lab 101',
    className: 'Yazılım Müh. 1. Sınıf',
    isLab: true,
    colorTheme: 'purple'
  },
  {
    id: '2',
    day: 'Monday',
    hour: 2,
    timeString: '10:00 - 10:50',
    courseName: 'Veritabanı Yönetimi Lab',
    teacherTitle: 'Prof. Dr.',
    teacherName: 'Ahmet Yılmaz',
    classroomName: 'Lab 101',
    className: 'Yazılım Müh. 1. Sınıf',
    isLab: true,
    colorTheme: 'purple'
  },
  {
    id: '3',
    day: 'Monday',
    hour: 4,
    timeString: '13:00 - 13:50',
    courseName: 'Yazılım Mimarisi',
    teacherTitle: 'Doç. Dr.',
    teacherName: 'Zeynep Kaya',
    classroomName: 'Amfi A-101',
    className: 'Yazılım Müh. 2. Sınıf',
    isLab: false,
    colorTheme: 'blue'
  },

  // TUESDAY
  {
    id: '4',
    day: 'Tuesday',
    hour: 2,
    timeString: '10:00 - 10:50',
    courseName: 'Yapay Zeka & Derin Öğrenme',
    teacherTitle: 'Dr. Öğr. Üyesi',
    teacherName: 'Mehmet Demir',
    classroomName: 'Oda 204',
    className: 'Yazılım Müh. 2. Sınıf',
    isLab: false,
    colorTheme: 'emerald'
  },
  {
    id: '5',
    day: 'Tuesday',
    hour: 3,
    timeString: '11:00 - 11:50',
    courseName: 'Yapay Zeka & Derin Öğrenme',
    teacherTitle: 'Dr. Öğr. Üyesi',
    teacherName: 'Mehmet Demir',
    classroomName: 'Oda 204',
    className: 'Yazılım Müh. 2. Sınıf',
    isLab: false,
    colorTheme: 'emerald'
  },

  // WEDNESDAY
  {
    id: '6',
    day: 'Wednesday',
    hour: 1,
    timeString: '09:00 - 09:50',
    courseName: 'Web Programlama',
    teacherTitle: 'Öğr. Gör.',
    teacherName: 'Canan Şahin',
    classroomName: 'Bilgisayar Lab-2',
    className: 'Yazılım Müh. 1. Sınıf',
    isLab: true,
    colorTheme: 'amber'
  },
  {
    id: '7',
    day: 'Wednesday',
    hour: 2,
    timeString: '10:00 - 10:50',
    courseName: 'Web Programlama',
    teacherTitle: 'Öğr. Gör.',
    teacherName: 'Canan Şahin',
    classroomName: 'Bilgisayar Lab-2',
    className: 'Yazılım Müh. 1. Sınıf',
    isLab: true,
    colorTheme: 'amber'
  },

  // THURSDAY
  {
    id: '8',
    day: 'Thursday',
    hour: 4,
    timeString: '13:00 - 13:50',
    courseName: 'Algoritma & Veri Yapıları',
    teacherTitle: 'Prof. Dr.',
    teacherName: 'Ahmet Yılmaz',
    classroomName: 'Amfi B-201',
    className: 'Bilgisayar Müh. 1. Sınıf',
    isLab: false,
    colorTheme: 'rose'
  },
  {
    id: '9',
    day: 'Thursday',
    hour: 5,
    timeString: '14:00 - 14:50',
    courseName: 'Algoritma & Veri Yapıları',
    teacherTitle: 'Prof. Dr.',
    teacherName: 'Ahmet Yılmaz',
    classroomName: 'Amfi B-201',
    className: 'Bilgisayar Müh. 1. Sınıf',
    isLab: false,
    colorTheme: 'rose'
  },

  // FRIDAY
  {
    id: '10',
    day: 'Friday',
    hour: 2,
    timeString: '10:00 - 10:50',
    courseName: 'Siber Güvenlik Esasları',
    teacherTitle: 'Arş. Gör.',
    teacherName: 'Oğuz Arslan',
    classroomName: 'Oda 305',
    className: 'Yazılım Müh. 2. Sınıf',
    isLab: false,
    colorTheme: 'purple'
  }
]
