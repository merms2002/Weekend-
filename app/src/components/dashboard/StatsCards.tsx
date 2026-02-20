import { motion } from 'framer-motion';
import { BookOpen, Clock, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCard {
  title: string;
  value: number;
  icon: React.ElementType;
  change: number;
  changeLabel: string;
  gradient: string;
}

interface StatsCardsProps {
  activeCourses: number;
  pendingLectures: number;
  completedTasks: number;
}

export function StatsCards({ activeCourses, pendingLectures, completedTasks }: StatsCardsProps) {
  const stats: StatCard[] = [
    {
      title: 'Active Courses',
      value: activeCourses,
      icon: BookOpen,
      change: 12,
      changeLabel: 'vs last month',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Pending Lectures',
      value: pendingLectures,
      icon: Clock,
      change: -5,
      changeLabel: 'vs last week',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'Completed Tasks',
      value: completedTasks,
      icon: CheckCircle,
      change: 28,
      changeLabel: 'vs last month',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          variants={cardVariants}
          whileHover={{ 
            y: -4,
            transition: { duration: 0.2 }
          }}
          className={cn(
            "relative overflow-hidden rounded-2xl p-6",
            "bg-white/[0.03] backdrop-blur-lg border border-white/10",
            "hover:border-white/20 hover:shadow-glow-subtle",
            "transition-all duration-300 group"
          )}
        >
          {/* Background Gradient */}
          <div 
            className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500",
              "bg-gradient-to-br",
              stat.gradient
            )}
          />

          {/* Icon */}
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
            "bg-gradient-to-br",
            stat.gradient
          )}>
            <stat.icon className="w-6 h-6 text-white" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <p className="text-white/60 text-sm mb-1">{stat.title}</p>
            <motion.h3
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className="text-3xl font-bold text-white mb-3"
            >
              {stat.value}
            </motion.h3>

            {/* Change Indicator */}
            <div className="flex items-center gap-2">
              <div className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                stat.change > 0 
                  ? "bg-green-500/20 text-green-400" 
                  : "bg-red-500/20 text-red-400"
              )}>
                {stat.change > 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{Math.abs(stat.change)}%</span>
              </div>
              <span className="text-white/40 text-xs">{stat.changeLabel}</span>
            </div>
          </div>

          {/* Decorative Corner */}
          <div className={cn(
            "absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-20 blur-2xl",
            "bg-gradient-to-br",
            stat.gradient
          )} />
        </motion.div>
      ))}
    </motion.div>
  );
}
