export interface StudentMetrics {
  totalCourses: number;
  completedCourses: number;
  averageGrade: number;
  studyHours: number;
  weeklyProgress?: number;
  monthlyProgress: number;
}

export interface Course {
  id: string | number;
  title: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  nextClass: string;
  category: string;
  color?: string;
}

export interface Task {
  id: string | number;
  title: string;
  course: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  type: 'assignment' | 'quiz' | 'project' | 'exercise' | 'reading';
}

export interface Achievement {
  id: string | number;
  title: string;
  description: string;
  date: string;
  icon: string;
  color?: string;
  points?: number;
}

export interface WeeklyData {
  day: string;
  hours: number;
  performance: number;
}

export interface MonthlyData {
  week: string;
  progress: number;
  assignments: number;
}