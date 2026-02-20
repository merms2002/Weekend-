import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { CourseCard } from '@/components/dashboard/CourseCard';
import { currentStudent, courses } from '@/data/dummyData';
import type { Course } from '@/types';

export function DashboardPage() {
  const navigate = useNavigate();

  const handleSubscribe = (course: Course) => {
    // In a real app, this would open payment modal
    // For now, navigate to course detail
    navigate(`/courses/${course.id}`);
  };

  const recentCourses = courses.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <WelcomeSection userName={currentStudent.name} />

      {/* Stats Cards */}
      <StatsCards
        activeCourses={currentStudent.activeCourses}
        pendingLectures={currentStudent.pendingLectures}
        completedTasks={currentStudent.completedTasks}
      />

      {/* My Courses Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">My Courses</h2>
            <p className="text-white/60 mt-1">
              You have {courses.length} courses in total
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/courses')}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
            >
              All Courses
            </button>
            <button className="px-4 py-2 rounded-lg gradient-primary text-white text-sm hover:opacity-90 transition-opacity">
              Browse More
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {recentCourses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              onSubscribe={handleSubscribe}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Continue Learning', icon: '▶', color: 'from-primary to-blue-500' },
            { label: 'View Schedule', icon: '📅', color: 'from-green-500 to-emerald-500' },
            { label: 'Check Messages', icon: '💬', color: 'from-purple-500 to-pink-500' },
            { label: 'View Payments', icon: '💳', color: 'from-orange-500 to-red-500' },
          ].map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all text-left"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3`}>
                <span className="text-lg">{action.icon}</span>
              </div>
              <span className="text-sm text-white/80">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
