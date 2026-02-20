import { motion } from 'framer-motion';
import { Users, TrendingUp, AlertCircle, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Parent, Student } from '@/types';

interface ParentOverviewProps {
  parent: Parent;
}

export function ParentOverview({ parent }: ParentOverviewProps) {
  const totalActiveCourses = parent.children.reduce((acc, child) => acc + child.activeCourses, 0);
  const totalPendingLectures = parent.children.reduce((acc, child) => acc + child.pendingLectures, 0);
  const averageProgress = Math.round(
    parent.children.reduce((acc, child) => acc + child.overallProgress, 0) / parent.children.length
  );

  const stats = [
    {
      label: 'Children',
      value: parent.children.length,
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Active Courses',
      value: totalActiveCourses,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Pending Lectures',
      value: totalPendingLectures,
      icon: AlertCircle,
      color: 'from-orange-500 to-red-500',
    },
    {
      label: 'Avg Progress',
      value: `${averageProgress}%`,
      icon: DollarSign,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-4">
          <img
            src={parent.avatar}
            alt={parent.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
          />
          <div>
            <h2 className="text-2xl font-bold text-white">Welcome back, {parent.name.split(' ')[0]}</h2>
            <p className="text-white/60">Monitor your children&apos;s learning progress</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className={cn(
              "glass-card p-4 text-center",
              "hover:border-white/20 transition-all duration-300"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center",
              "bg-gradient-to-br",
              stat.color
            )}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-white/50">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Children Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {parent.children.map((child, index) => (
          <ChildProgressCard key={child.id} child={child} index={index} />
        ))}
      </div>
    </div>
  );
}

function ChildProgressCard({ child, index }: { child: Student; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      whileHover={{ y: -4 }}
      className={cn(
        "glass-card p-6",
        "hover:border-white/20 hover:shadow-glow-subtle",
        "transition-all duration-300"
      )}
    >
      <div className="flex items-center gap-4 mb-6">
        <img
          src={child.avatar}
          alt={child.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-white/20"
        />
        <div>
          <h3 className="font-semibold text-white">{child.name}</h3>
          <p className="text-sm text-white/50">{child.email}</p>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 rounded-xl bg-white/5">
          <p className="text-lg font-bold text-white">{child.activeCourses}</p>
          <p className="text-xs text-white/50">Courses</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-white/5">
          <p className="text-lg font-bold text-white">{child.pendingLectures}</p>
          <p className="text-xs text-white/50">Pending</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-white/5">
          <p className="text-lg font-bold text-white">{child.completedTasks}</p>
          <p className="text-xs text-white/50">Tasks</p>
        </div>
      </div>

      {/* Overall Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white/60">Overall Progress</span>
          <span className="text-sm font-medium text-white">{child.overallProgress}%</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${child.overallProgress}%` }}
            transition={{ delay: 0.5 + index * 0.2, duration: 1, ease: 'easeOut' }}
            className={cn(
              "h-full rounded-full bg-gradient-to-r",
              child.overallProgress >= 70 
                ? "from-green-500 to-emerald-500"
                : child.overallProgress >= 40
                ? "from-yellow-500 to-orange-500"
                : "from-red-500 to-pink-500"
            )}
          />
        </div>
      </div>
    </motion.div>
  );
}
