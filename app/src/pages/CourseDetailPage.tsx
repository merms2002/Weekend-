import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Play, 
  Lock, 
  CheckCircle, 
  Clock, 
  FileText, 
  Calendar,
  User,
  BookOpen,
  Target,
  AlertCircle,
  CheckSquare,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { courses } from '@/data/dummyData';
import { lecturesData, assignmentsData } from '@/data/adminData';
import type { Lecture, Assignment } from '@/types';

type TabType = 'lectures' | 'assignments' | 'overview';

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('lectures');
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);

  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-white mb-4">Course Not Found</h2>
        <button
          onClick={() => navigate('/courses')}
          className="px-6 py-3 rounded-xl gradient-primary text-white"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  const courseLectures = lecturesData
    .filter((l) => l.courseId === course.id)
    .sort((a, b) => a.order - b.order);

  const courseAssignments = assignmentsData.filter((a) => a.courseId === course.id);

  const statusConfig = {
    waiting_payment: {
      label: 'Waiting Payment',
      color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      buttonText: 'Subscribe Now - $' + course.price,
    },
    active: {
      label: 'Active',
      color: 'bg-green-500/20 text-green-400 border-green-500/30',
      buttonText: 'Continue Learning',
    },
    completed: {
      label: 'Completed',
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      buttonText: 'Course Completed',
    },
  };

  const config = statusConfig[course.status];

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/courses')}
        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Courses</span>
      </motion.button>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={course.coverImage}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              {/* Category & Status */}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm text-white/80">
                  {course.category}
                </span>
                <span className={cn(
                  "px-3 py-1 rounded-full text-sm border",
                  config.color
                )}>
                  {config.label}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {course.title}
              </h1>

              {/* Description */}
              <p className="text-white/60 max-w-2xl mb-6">
                {course.description}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.totalLectures} lectures</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>{course.grade}</span>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className="lg:w-80 glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/60">Your Progress</span>
                <span className="text-2xl font-bold text-white">{course.progress}%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={cn(
                    "h-full rounded-full",
                    course.status === 'completed'
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                      : "bg-gradient-to-r from-primary to-accent"
                  )}
                />
              </div>
              <p className="text-sm text-white/50 mb-6">
                {course.completedLectures} of {course.totalLectures} lectures completed
              </p>
              <button
                className={cn(
                  "w-full py-3 rounded-xl font-medium text-sm",
                  course.status === 'waiting_payment' 
                    ? "gradient-primary text-white" 
                    : "bg-white/10 text-white/90 hover:bg-white/20 border border-white/20",
                  "transition-all duration-300"
                )}
              >
                {config.buttonText}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border-b border-white/10"
      >
        <div className="flex gap-8">
          {(['lectures', 'assignments', 'overview'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative py-4 text-sm font-medium capitalize transition-colors",
                activeTab === tab ? "text-white" : "text-white/50 hover:text-white/70"
              )}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 gradient-primary"
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'lectures' && (
            <LecturesTab 
              lectures={courseLectures} 
              onLectureClick={setSelectedLecture}
              courseStatus={course.status}
            />
          )}
          {activeTab === 'assignments' && (
            <AssignmentsTab assignments={courseAssignments} />
          )}
          {activeTab === 'overview' && (
            <OverviewTab course={course} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Video Player Modal */}
      <VideoPlayerModal
        lecture={selectedLecture}
        isOpen={!!selectedLecture}
        onClose={() => setSelectedLecture(null)}
      />
    </div>
  );
}

interface LecturesTabProps {
  lectures: Lecture[];
  onLectureClick: (lecture: Lecture) => void;
  courseStatus: string;
}

function LecturesTab({ lectures, onLectureClick, courseStatus }: LecturesTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Course Content</h3>
        <p className="text-sm text-white/50">
          {lectures.filter((l) => l.status === 'completed').length} / {lectures.length} completed
        </p>
      </div>

      {lectures.map((lecture, index) => {
        const isLocked = lecture.status === 'locked' || courseStatus === 'waiting_payment';
        const isCompleted = lecture.status === 'completed';
        const isAvailable = lecture.status === 'available';

        return (
          <motion.div
            key={lecture.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => !isLocked && onLectureClick(lecture)}
            className={cn(
              "flex items-center gap-4 p-4 rounded-xl",
              "bg-white/[0.03] border border-white/10",
              !isLocked && "hover:bg-white/5 hover:border-white/20 cursor-pointer",
              isLocked && "opacity-60 cursor-not-allowed",
              "transition-all duration-300"
            )}
          >
            {/* Status Icon */}
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
              isCompleted && "bg-green-500/20 text-green-400",
              isAvailable && "bg-primary/20 text-primary",
              isLocked && "bg-white/5 text-white/30"
            )}>
              {isCompleted ? <CheckCircle className="w-5 h-5" /> : 
               isAvailable ? <Play className="w-5 h-5" /> : 
               <Lock className="w-5 h-5" />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <span className="text-sm text-white/40">{String(index + 1).padStart(2, '0')}</span>
                <h4 className={cn(
                  "font-medium truncate",
                  isCompleted ? "text-white/60" : "text-white"
                )}>
                  {lecture.title}
                </h4>
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Clock className="w-4 h-4" />
              <span>{lecture.duration}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

interface AssignmentsTabProps {
  assignments: Assignment[];
}

function AssignmentsTab({ assignments }: AssignmentsTabProps) {
  const getStatusConfig = (status: Assignment['status']) => {
    switch (status) {
      case 'submitted':
        return { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', label: 'Submitted' };
      case 'graded':
        return { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Graded' };
      case 'overdue':
        return { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'Overdue' };
      default:
        return { color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', label: 'Pending' };
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Assignments</h3>
        <p className="text-sm text-white/50">
          {assignments.filter((a) => a.status === 'graded').length} / {assignments.length} completed
        </p>
      </div>

      {assignments.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/50">No assignments for this course yet</p>
        </div>
      ) : (
        assignments.map((assignment, index) => {
          const statusConfig = getStatusConfig(assignment.status);
          const isOverdue = new Date(assignment.dueDate) < new Date() && assignment.status === 'pending';

          return (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "p-5 rounded-xl",
                "bg-white/[0.03] border border-white/10",
                "hover:border-white/20",
                "transition-all duration-300"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-white">{assignment.title}</h4>
                    <span className={cn("px-2 py-0.5 rounded-full text-xs border", statusConfig.color)}>
                      {statusConfig.label}
                    </span>
                  </div>
                  <p className="text-sm text-white/60 mb-3">{assignment.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className={cn(
                      "flex items-center gap-1.5",
                      isOverdue ? "text-red-400" : "text-white/50"
                    )}>
                      <Calendar className="w-4 h-4" />
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/50">
                      <Target className="w-4 h-4" />
                      <span>Max Score: {assignment.maxScore}</span>
                    </div>
                  </div>
                </div>

                {assignment.score !== undefined && (
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{assignment.score}</p>
                    <p className="text-xs text-white/50">/ {assignment.maxScore}</p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })
      )}
    </div>
  );
}

interface OverviewTabProps {
  course: typeof courses[0];
}

function OverviewTab({ course }: OverviewTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-white">About This Course</h3>
        </div>
        <p className="text-white/70 leading-relaxed">{course.description}</p>
      </motion.div>

      {/* Course Objectives */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
            <Target className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">What You&apos;ll Learn</h3>
        </div>
        <ul className="space-y-3">
          {course.objectives.map((objective, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckSquare className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-white/70">{objective}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Requirements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-orange-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">Requirements</h3>
        </div>
        <ul className="space-y-3">
          {course.requirements.map((req, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-white/60">{index + 1}</span>
              </div>
              <span className="text-white/70">{req}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Course Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Clock className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">Course Details</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-sm text-white/50 mb-1">Duration</p>
            <p className="text-white font-medium">{course.duration}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-sm text-white/50 mb-1">Lectures</p>
            <p className="text-white font-medium">{course.totalLectures}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-sm text-white/50 mb-1">Grade Level</p>
            <p className="text-white font-medium">{course.grade}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-sm text-white/50 mb-1">Category</p>
            <p className="text-white font-medium">{course.category}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface VideoPlayerModalProps {
  lecture: Lecture | null;
  isOpen: boolean;
  onClose: () => void;
}

function VideoPlayerModal({ lecture, isOpen, onClose }: VideoPlayerModalProps) {
  if (!lecture) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl z-50"
          >
            <div className="glass-card overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div>
                  <h3 className="font-semibold text-white">{lecture.title}</h3>
                  <p className="text-sm text-white/50">Duration: {lecture.duration}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>
              </div>

              {/* Video Placeholder */}
              <div className="aspect-video bg-black flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4"
                  >
                    <Play className="w-8 h-8 text-white ml-1" />
                  </motion.div>
                  <p className="text-white/60">Video player placeholder</p>
                  <p className="text-white/40 text-sm mt-1">Click to play lecture</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
