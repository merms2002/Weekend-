import { motion } from 'framer-motion';
import { AlertTriangle, Clock, BookOpen, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  type: 'warning' | 'info' | 'urgent';
  title: string;
  message: string;
  studentName: string;
  timestamp: string;
}

const alerts: Alert[] = [
  {
    id: '1',
    type: 'urgent',
    title: 'Payment Due',
    message: 'Creative Writing course payment is overdue',
    studentName: 'Alex Johnson',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    type: 'warning',
    title: 'Low Attendance',
    message: 'Physics Fundamentals attendance below 75%',
    studentName: 'Alex Johnson',
    timestamp: '1 day ago',
  },
  {
    id: '3',
    type: 'info',
    title: 'New Assignment',
    message: 'Advanced Mathematics assignment due in 3 days',
    studentName: 'Emma Johnson',
    timestamp: '2 days ago',
  },
  {
    id: '4',
    type: 'warning',
    title: 'Missing Lectures',
    message: '3 pending lectures in Data Science Basics',
    studentName: 'Emma Johnson',
    timestamp: '3 days ago',
  },
];

export function AlertsSection() {
  const getAlertStyles = (type: Alert['type']) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'warning':
        return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
      case 'info':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
    }
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'urgent':
        return AlertTriangle;
      case 'warning':
        return Clock;
      case 'info':
        return BookOpen;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card overflow-hidden"
    >
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Alerts & Notifications</h3>
            <p className="text-sm text-white/50">Stay updated on your children's activities</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-medium">
            {alerts.length} New
          </span>
        </div>
      </div>

      <div className="divide-y divide-white/5">
        {alerts.map((alert, index) => {
          const Icon = getAlertIcon(alert.type);
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={cn(
                "p-4 flex items-start gap-4 hover:bg-white/5 transition-colors cursor-pointer group"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border",
                getAlertStyles(alert.type)
              )}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-white">{alert.title}</h4>
                  <span className="text-xs text-white/40">•</span>
                  <span className="text-xs text-white/40">{alert.studentName}</span>
                </div>
                <p className="text-sm text-white/60 mb-1">{alert.message}</p>
                <p className="text-xs text-white/40">{alert.timestamp}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </motion.div>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10">
        <button className="w-full py-3 text-sm text-primary hover:text-primary/80 transition-colors">
          View All Alerts
        </button>
      </div>
    </motion.div>
  );
}
