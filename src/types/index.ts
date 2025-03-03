export interface Course {
  id: number;
  name: string;
  instructor: string;
  description: string;
  enrollmentStatus: 'Open' | 'Closed' | 'In Progress';
  thumbnail: string;
  duration: string;
  schedule: string;
  location: string;
  prerequisites: string[];
  syllabus: {
    week: number;
    topic: string;
    content: string;
  }[];
  likes: number;
}

export interface EnrolledCourse extends Course {
  dueDate: string;
  progress: number;
  completed: boolean;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  enrolledCourses: number[]; // Course IDs
}