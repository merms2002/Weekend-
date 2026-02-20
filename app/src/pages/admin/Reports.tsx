import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  DollarSign,
  Download,
  Calendar,
  ChevronDown,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { revenueData, courseCompletionStats, adminStats } from '@/data/adminData';

export function Reports() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Analytics & Reports</h2>
          <p className="text-sm text-white/50">Platform performance insights</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Last 30 Days</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="h-11 px-4 rounded-xl gradient-primary text-white hover:opacity-90 transition-opacity flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { 
            label: 'Total Revenue', 
            value: `$${adminStats.totalRevenue.toLocaleString()}`, 
            change: '+15%', 
            icon: DollarSign,
            color: 'from-green-500 to-emerald-500'
          },
          { 
            label: 'Active Students', 
            value: adminStats.totalStudents.toString(), 
            change: '+12%', 
            icon: Users,
            color: 'from-blue-500 to-cyan-500'
          },
          { 
            label: 'Course Completions', 
            value: '89', 
            change: '+8%', 
            icon: BookOpen,
            color: 'from-purple-500 to-pink-500'
          },
          { 
            label: 'Avg. Progress', 
            value: '68%', 
            change: '+5%', 
            icon: Activity,
            color: 'from-orange-500 to-red-500'
          },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                "bg-gradient-to-br",
                metric.color
              )}>
                <metric.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-green-400 font-medium">{metric.change}</span>
            </div>
            <p className="text-2xl font-bold text-white">{metric.value}</p>
            <p className="text-sm text-white/50">{metric.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Revenue Trends</h3>
                <p className="text-sm text-white/50">Monthly revenue overview</p>
              </div>
            </div>
          </div>

          <div className="h-64 relative">
            <div className="absolute inset-0 flex items-end justify-between gap-3 px-2">
              {revenueData.map((data, index) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.revenue / 15000) * 180}px` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t-lg hover:from-primary hover:to-primary/70 transition-all cursor-pointer group"
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-white/10 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ${data.revenue.toLocaleString()}
                      </div>
                    </motion.div>
                  </div>
                  <span className="text-xs text-white/50">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Course Completion Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <PieChart className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Course Completion</h3>
                <p className="text-sm text-white/50">Enrollment vs completion rates</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {courseCompletionStats.map((stat, index) => (
              <motion.div
                key={stat.course}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">{stat.course}</span>
                  <span className="text-sm text-white/50">
                    {stat.completed}/{stat.enrolled} completed
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(stat.completed / stat.enrolled) * 100}%` }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Student Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Student Activity</h3>
              <p className="text-sm text-white/50">Daily active users and engagement</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-white/60">Active Users</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-sm text-white/60">New Enrollments</span>
            </div>
          </div>
        </div>

        <div className="h-48 relative">
          <div className="absolute inset-0 flex items-end justify-between gap-1">
            {Array.from({ length: 14 }).map((_, index) => {
              const height1 = 30 + Math.random() * 50;
              const height2 = 20 + Math.random() * 40;
              return (
                <div key={index} className="flex-1 flex items-end gap-0.5">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height1}%` }}
                    transition={{ delay: 0.7 + index * 0.05, duration: 0.5 }}
                    className="flex-1 bg-primary/60 rounded-t"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height2}%` }}
                    transition={{ delay: 0.75 + index * 0.05, duration: 0.5 }}
                    className="flex-1 bg-accent/60 rounded-t"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-white/40">
          <span>2 weeks ago</span>
          <span>1 week ago</span>
          <span>Today</span>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="glass-card p-6">
          <h4 className="text-sm font-medium text-white/60 mb-4">Top Performing Courses</h4>
          <div className="space-y-3">
            {['Web Development', 'Advanced Mathematics', 'Data Science'].map((course, i) => (
              <div key={course} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/60">
                    {i + 1}
                  </span>
                  <span className="text-white/70">{course}</span>
                </div>
                <span className="text-sm text-green-400">+{15 - i * 3}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h4 className="text-sm font-medium text-white/60 mb-4">Recent Enrollments</h4>
          <div className="space-y-3">
            {[
              { name: 'Alex Johnson', course: 'Physics', time: '2h ago' },
              { name: 'Emma Chen', course: 'Web Dev', time: '5h ago' },
              { name: 'Mike Smith', course: 'Math', time: '1d ago' },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div>
                  <p className="text-white/70">{item.name}</p>
                  <p className="text-xs text-white/40">{item.course}</p>
                </div>
                <span className="text-xs text-white/40">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h4 className="text-sm font-medium text-white/60 mb-4">Platform Health</h4>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-white/50">Server Uptime</span>
                <span className="text-sm text-green-400">99.9%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[99.9%] bg-green-500 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-white/50">User Satisfaction</span>
                <span className="text-sm text-primary">4.8/5</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[96%] bg-primary rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-white/50">Course Completion</span>
                <span className="text-sm text-accent">72%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[72%] bg-accent rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
