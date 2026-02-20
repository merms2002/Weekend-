import { motion } from 'framer-motion';
import { Play, Lock, CheckCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Course } from '@/types';

interface CourseCardProps {
  course: Course;
  onSubscribe: (course: Course) => void;
  index: number;
}

export function CourseCard({ course, onSubscribe, index }: CourseCardProps) {
  const statusConfig = {
    waiting_payment: {
      label: 'Waiting Payment',
      color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      icon: Lock,
      buttonText: 'Subscribe Now',
      buttonClass: 'gradient-primary hover:opacity-90',
    },
    active: {
      label: 'Active',
      color: 'bg-green-500/20 text-green-400 border-green-500/30',
      icon: Play,
      buttonText: 'Enter Course',
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
      transition={{ 
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "bg-white/[0.03] backdrop-blur-lg border border-white/10",
        "hover:border-white/20 hover:shadow-glow-subtle",
        "transition-all duration-500"
      )}
    >
      {/* Cover Image */}
      <div className="relative h-44 overflow-hidden">
        <motion.img
          src={course.coverImage}
          alt={course.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Status Badge */}
        <div className={cn(
          "absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium border",
          config.color
        )}>
          <div className="flex items-center gap-1.5">
            <StatusIcon className="w-3.5 h-3.5" />
            {config.label}
          </div>
        </div>

        {/* Price Badge */}
        {course.status === 'waiting_payment' && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span className="text-sm font-bold text-white">${course.price}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <span className="text-xs text-white/50 uppercase tracking-wider">{course.category}</span>
          <h3 className="text-lg font-semibold text-white mt-1 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-white/60 mt-2 line-clamp-2">{course.description}</p>
        </div>

        {/* Instructor */}
        <p className="text-xs text-white/40 mb-4">
          by <span className="text-white/60">{course.instructor}</span>
        </p>

        {/* Progress Bar */}
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
                transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: 'easeOut' }}
                className={cn(
                  "h-full rounded-full",
                  course.status === 'completed' 
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                    : "bg-gradient-to-r from-primary to-accent"
                )}
              />
            </div>
            <p className="text-xs text-white/40 mt-2">
              {course.completedLectures} of {course.totalLectures} lectures completed
            </p>
          </div>
        )}

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => course.status === 'waiting_payment' && onSubscribe(course)}
          className={cn(
            "w-full py-3 px-4 rounded-xl font-medium text-sm",
            "flex items-center justify-center gap-2",
            "transition-all duration-300",
            config.buttonClass
          )}
        >
          <span className={course.status === 'waiting_payment' ? 'text-white' : 'text-white/90'}>
            {config.buttonText}
          </span>
          <ArrowRight className={cn(
            "w-4 h-4 transition-transform duration-300",
            course.status === 'waiting_payment' ? 'text-white' : 'text-white/70',
            "group-hover:translate-x-1"
          )} />
        </motion.button>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
      </div>
    </motion.div>
  );
}
