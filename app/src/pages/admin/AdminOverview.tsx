import { motion } from 'framer-motion';
import { 
  Users, 
  UserCircle, 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Clock,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { adminStats, recentActivities, revenueData } from '@/data/adminData';

export function AdminOverview() {
  const stats = [
    {
      label: 'Total Students',
      value: adminStats.totalStudents,
      icon: Users,
      change: 12,
      changeType: 'up',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Total Parents',
      value: adminStats.totalParents,
      icon: UserCircle,
      change: 8,
      changeType: 'up',
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Total Courses',
      value: adminStats.totalCourses,
      icon: BookOpen,
      change: 2,
      changeType: 'up',
      color: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Total Revenue',
      value: `$${adminStats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: 15,
      changeType: 'up',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className={cn(
              "glass-card p-6",
              "hover:border-white/20 hover:shadow-glow-subtle",
              "transition-all duration-300"
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center",
                "bg-gradient-to-br",
                stat.color
              )}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                stat.changeType === 'up' 
                  ? "bg-green-500/20 text-green-400" 
                  : "bg-red-500/20 text-red-400"
              )}>
                {stat.changeType === 'up' ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{stat.change}%</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-sm text-white/50">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Revenue Overview</h3>
              <p className="text-sm text-white/50">Monthly revenue for current year</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-white/60">Revenue</span>
              <span className="w-3 h-3 rounded-full bg-accent ml-2" />
              <span className="text-sm text-white/60">Students</span>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="h-64 relative">
            <div className="absolute inset-0 flex items-end justify-between gap-2 px-4">
              {revenueData.map((data, index) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end gap-1 h-48">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.revenue / 15000) * 100}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      className="flex-1 bg-primary/60 rounded-t-lg hover:bg-primary/80 transition-colors"
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.students / 100) * 100}%` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                      className="flex-1 bg-accent/60 rounded-t-lg hover:bg-accent/80 transition-colors"
                    />
                  </div>
                  <span className="text-xs text-white/50">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
              <p className="text-sm text-white/50">Latest platform activities</p>
            </div>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
              >
                <img
                  src={activity.userAvatar}
                  alt={activity.user}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">
                    <span className="font-medium">{activity.user}</span>
                    {' '}<span className="text-white/60">{activity.action}</span>{' '}
                    <span className="text-primary">{activity.target}</span>
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    {new Date(activity.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 text-sm text-primary hover:text-primary/80 transition-colors flex items-center justify-center gap-2">
            View All Activity
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Add New Course', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
            { label: 'Add Student', icon: Users, color: 'from-green-500 to-emerald-500' },
            { label: 'View Payments', icon: DollarSign, color: 'from-orange-500 to-red-500' },
            { label: 'Generate Report', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
          ].map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all text-left"
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
                "bg-gradient-to-br",
                action.color
              )}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-white/80">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Pending Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Pending Actions</h3>
              <p className="text-sm text-white/50">Items requiring your attention</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm font-medium">
            {adminStats.pendingPayments} pending
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white/5 flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{adminStats.pendingPayments}</p>
              <p className="text-sm text-white/50">Payment Approvals</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-orange-400" />
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">8</p>
              <p className="text-sm text-white/50">New Enrollments</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">3</p>
              <p className="text-sm text-white/50">Support Tickets</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-red-400" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
