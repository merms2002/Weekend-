export interface Course {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  price: number;
  progress: number;
  status: 'waiting_payment' | 'active' | 'completed';
  totalLectures: number;
  completedLectures: number;
  instructor: string;
  category: string;
  grade: string;
  duration: string;
  objectives: string[];
  requirements: string[];
  enrolledStudents?: number;
  revenue?: number;
  createdAt?: string;
}

export interface Lecture {
  id: string;
  courseId: string;
  title: string;
  duration: string;
  status: 'locked' | 'available' | 'completed';
  order: number;
  videoUrl?: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  maxScore: number;
  score?: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  grade: string;
  parentName?: string;
  parentId?: string;
  activeCourses: number;
  pendingLectures: number;
  completedTasks: number;
  overallProgress: number;
  totalCompletedCourses: number;
  totalPayments: number;
  nextPaymentDue?: string;
  status: 'active' | 'inactive' | 'suspended';
  joinedAt: string;
  enrolledCourses?: string[];
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  children: Student[];
  status: 'active' | 'inactive';
  joinedAt: string;
}

export interface Payment {
  id: string;
  courseId: string;
  courseName: string;
  studentId: string;
  studentName: string;
  amount: number;
  referenceNumber: string;
  status: 'pending' | 'completed' | 'rejected';
  date: string;
  method?: 'card' | 'paypal' | 'crypto';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'payment' | 'lecture' | 'assignment';
  timestamp: string;
  read: boolean;
  userId?: string;
  link?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export interface WeeklyProgress {
  day: string;
  hours: number;
  tasks: number;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  completedAt?: string;
  progress: number;
}

export interface AdminStats {
  totalStudents: number;
  totalParents: number;
  totalCourses: number;
  totalRevenue: number;
  pendingPayments: number;
  activeEnrollments: number;
}

export interface Activity {
  id: string;
  user: string;
  userAvatar: string;
  action: string;
  target: string;
  timestamp: string;
}
