import { motion } from 'framer-motion';
import { TrendingUp, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { weeklyProgress } from '@/data/dummyData';

export function WeeklyProgressChart() {
  const maxHours = Math.max(...weeklyProgress.map(d => d.hours));
  const totalHours = weeklyProgress.reduce((acc, d) => acc + d.hours, 0);
  const totalTasks = weeklyProgress.reduce((acc, d) => acc + d.tasks, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card overflow-hidden"
    >
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Weekly Activity</h3>
            <p className="text-sm text-white/50">Learning hours and tasks completed</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <Calendar className="w-4 h-4 text-white/50" />
            <span className="text-sm text-white/70">This Week</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm text-white/60">Total Hours</span>
            </div>
            <p className="text-2xl font-bold text-white">{totalHours.toFixed(1)}h</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full bg-accent/50" />
              <span className="text-sm text-white/60">Tasks Done</span>
            </div>
            <p className="text-2xl font-bold text-white">{totalTasks}</p>
          </div>
        </div>

        {/* Chart */}
        <div className="relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-white/40">
            <span>{maxHours}h</span>
            <span>{(maxHours / 2).toFixed(1)}h</span>
            <span>0h</span>
          </div>

          {/* Bars */}
          <div className="ml-10 flex items-end justify-between gap-3 h-48 pb-8">
            {weeklyProgress.map((day, index) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full flex items-end justify-center">
                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-white/10 backdrop-blur-md text-xs text-white whitespace-nowrap pointer-events-none z-10"
                  >
                    {day.hours}h • {day.tasks} tasks
                  </motion.div>

                  {/* Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.hours / maxHours) * 100}%` }}
                    transition={{ 
                      delay: 0.6 + index * 0.1, 
                      duration: 0.8, 
                      ease: 'easeOut' 
                    }}
                    whileHover={{ scale: 1.05 }}
                    className={cn(
                      "w-full max-w-12 rounded-t-lg cursor-pointer relative overflow-hidden",
                      "bg-gradient-to-t from-primary/50 to-primary"
                    )}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                  </motion.div>
                </div>
                <span className="text-xs text-white/60 font-medium">{day.day}</span>
              </div>
            ))}
          </div>

          {/* Grid lines */}
          <div className="absolute left-10 right-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none">
            {[0, 1, 2].map((i) => (
              <div key={i} className="border-t border-white/5" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
