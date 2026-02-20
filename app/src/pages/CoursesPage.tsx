import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen, Clock, ChevronDown, Play, Lock, CheckCircle, ArrowUpDown, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { courses } from '@/data/dummyData';
import { grades, courseCategories } from '@/data/adminData';
import type { Course } from '@/types';

type SortOption = 'recommended' | 'title' | 'progress-high' | 'newest';

export function CoursesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [gradeFilter, setGradeFilter] = useState<string>('All Grades');
  const [categoryFilter, setCategoryFilter] = useState<string>('All Categories');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourses = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    const coursePool = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query);

      const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
      const matchesGrade = gradeFilter === 'All Grades' || course.grade === gradeFilter || course.grade === 'All Grades';
      const matchesCategory = categoryFilter === 'All Categories' || course.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesGrade && matchesCategory;
    });

    return [...coursePool].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'progress-high':
          return b.progress - a.progress;
        case 'newest':
          return Number(b.id) - Number(a.id);
        case 'recommended':
        default: {
          const statusScore = { active: 3, waiting_payment: 2, completed: 1 };
          return statusScore[b.status] - statusScore[a.status];
        }
      }
    });
  }, [searchQuery, statusFilter, gradeFilter, categoryFilter, sortBy]);

  const activeCoursesCount = filteredCourses.filter((course) => course.status === 'active').length;
  const averageProgress =
    filteredCourses.length > 0
      ? Math.round(filteredCourses.reduce((sum, course) => sum + course.progress, 0) / filteredCourses.length)
      : 0;

  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setGradeFilter('All Grades');
    setCategoryFilter('All Categories');
    setSortBy('recommended');
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-white">All Courses</h1>
        <p className="text-white/60">Browse and manage your learning journey</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 sm:grid-cols-3"
      >
        <InsightCard title="Filtered Courses" value={String(filteredCourses.length)} helper="Based on your filters" />
        <InsightCard title="Currently Active" value={String(activeCoursesCount)} helper="Ready to continue" />
        <InsightCard title="Average Progress" value={`${averageProgress}%`} helper="Across visible courses" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-4"
      >
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search courses, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'w-full h-12 pl-12 pr-4 rounded-xl',
                'bg-white/5 border border-white/10',
                'text-white placeholder:text-white/40',
                'focus:outline-none focus:border-primary/50 focus:bg-white/[0.07]',
                'transition-all duration-300'
              )}
            />
          </div>

          <div className="flex gap-4">
            <div className="relative min-w-[210px]">
              <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className={cn(
                  'w-full h-12 pl-11 pr-4 rounded-xl',
                  'bg-white/5 border border-white/10',
                  'text-white',
                  'focus:outline-none focus:border-primary/50',
                  'appearance-none cursor-pointer'
                )}
              >
                <option value="recommended" className="bg-slate-900">Recommended</option>
                <option value="title" className="bg-slate-900">Title (A-Z)</option>
                <option value="progress-high" className="bg-slate-900">Progress (High-Low)</option>
                <option value="newest" className="bg-slate-900">Newest first</option>
              </select>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'h-12 px-6 rounded-xl flex items-center justify-center gap-2',
                'bg-white/5 border border-white/10',
                'text-white/70 hover:text-white hover:bg-white/10',
                'transition-all duration-300',
                showFilters && 'bg-white/10 border-primary/50 text-white'
              )}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <ChevronDown className={cn('w-4 h-4 transition-transform', showFilters && 'rotate-180')} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-hidden"
            >
              <div>
                <label className="text-sm text-white/60 mb-2 block">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={selectClassName}
                >
                  <option value="all" className="bg-slate-900">All Status</option>
                  <option value="active" className="bg-slate-900">Active</option>
                  <option value="waiting_payment" className="bg-slate-900">Waiting Payment</option>
                  <option value="completed" className="bg-slate-900">Completed</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-white/60 mb-2 block">Grade</label>
                <select
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  className={selectClassName}
                >
                  {grades.map((grade: string) => (
                    <option key={grade} value={grade} className="bg-slate-900">{grade}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-white/60 mb-2 block">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className={selectClassName}
                >
                  {courseCategories.map((cat: string) => (
                    <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <p className="text-sm text-white/60">
            Showing <span className="text-white font-medium">{filteredCourses.length}</span> courses
          </p>
          {(searchQuery || statusFilter !== 'all' || gradeFilter !== 'All Grades' || categoryFilter !== 'All Categories' || sortBy !== 'recommended') && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      </motion.div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <CourseListCard
              key={course.id}
              course={course}
              index={index}
              onClick={() => handleCourseClick(course.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState onClear={clearFilters} />
      )}
    </div>
  );
}

const selectClassName = cn(
  'w-full h-11 px-4 rounded-xl',
  'bg-white/5 border border-white/10',
  'text-white',
  'focus:outline-none focus:border-primary/50',
  'appearance-none cursor-pointer'
);

function InsightCard({ title, value, helper }: { title: string; value: string; helper: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
        <Sparkles className="w-4 h-4" />
      </div>
      <p className="text-sm text-white/60">{title}</p>
      <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
      <p className="text-xs text-white/40 mt-1">{helper}</p>
    </div>
  );
}

interface CourseListCardProps {
  course: Course;
  index: number;
  onClick: () => void;
}

function CourseListCard({ course, index, onClick }: CourseListCardProps) {
  const statusConfig = {
    waiting_payment: {
      label: 'Waiting Payment',
      color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      icon: Lock,
      buttonText: 'Subscribe Now',
      buttonClass: 'gradient-primary',
    },
    active: {
      label: 'Active',
      color: 'bg-green-500/20 text-green-400 border-green-500/30',
      icon: Play,
      buttonText: 'Continue Learning',
      buttonClass: 'bg-white/10 hover:bg-white/20 border border-white/20',
    },
    completed: {
      label: 'Completed',
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      icon: CheckCircle,
      buttonText: 'Review Course',
      buttonClass: 'bg-white/10 hover:bg-white/20 border border-white/20',
    },
  };

  const config = statusConfig[course.status];
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-2xl cursor-pointer',
        'bg-white/[0.03] backdrop-blur-lg border border-white/10',
        'hover:border-white/20 hover:shadow-glow-subtle',
        'transition-all duration-500'
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={course.coverImage}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        <div className={cn(
          'absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md',
          config.color
        )}>
          <div className="flex items-center gap-1.5">
            <StatusIcon className="w-3.5 h-3.5" />
            {config.label}
          </div>
        </div>

        {course.status === 'waiting_payment' && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span className="text-sm font-bold text-white">${course.price}</span>
          </div>
        )}

        <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
          <span className="text-xs text-white/80">{course.category}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-white/60 mb-4 line-clamp-2">{course.description}</p>

        <div className="flex items-center gap-4 mb-4 text-sm text-white/50">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>{course.totalLectures} lectures</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
        </div>

        <p className="text-xs text-white/40 mb-4">
          by <span className="text-white/60">{course.instructor}</span>
          <span className="mx-2">•</span>
          <span>{course.grade}</span>
        </p>

        {course.status !== 'waiting_payment' && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-white/60">Progress</span>
              <span className="text-white font-medium">{course.progress}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ delay: 0.3 + index * 0.05, duration: 0.8, ease: 'easeOut' }}
                className={cn(
                  'h-full rounded-full',
                  course.status === 'completed'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                    : 'bg-gradient-to-r from-primary to-accent'
                )}
              />
            </div>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className={cn(
            'w-full py-3 rounded-xl font-medium text-sm',
            'flex items-center justify-center gap-2',
            'transition-all duration-300',
            config.buttonClass,
            course.status === 'waiting_payment' ? 'text-white' : 'text-white/90'
          )}
        >
          {config.buttonText}
        </button>
      </div>
    </motion.div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6"
      >
        <BookOpen className="w-10 h-10 text-white/30" />
      </motion.div>
      <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
      <p className="text-white/50 text-center max-w-md mb-6">
        We couldn&apos;t find any courses matching your filters. Try adjusting your search or filters.
      </p>
      <button
        onClick={onClear}
        className="px-6 py-3 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
      >
        Clear Filters
      </button>
    </motion.div>
  );
}
