import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  LogOut, 
  User,
  Settings,
  Check,
  X,
  DollarSign,
  BookOpen,
  FileText,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { notifications as initialNotifications } from '@/data/dummyData';

interface NavbarProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  isCollapsed: boolean;
}

export function Navbar({ user, isCollapsed }: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return DollarSign;
      case 'lecture':
        return BookOpen;
      case 'assignment':
        return FileText;
      case 'success':
        return Check;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'bg-green-500/20 text-green-400';
      case 'lecture':
        return 'bg-blue-500/20 text-blue-400';
      case 'assignment':
        return 'bg-orange-500/20 text-orange-400';
      case 'success':
        return 'bg-green-500/20 text-green-400';
      case 'warning':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-white/10 text-white/60';
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 right-0 h-20 z-30 glass border-b border-white/10",
        "flex items-center justify-between px-6 transition-all duration-300"
      )}
      style={{ left: isCollapsed ? 80 : 260 }}
    >
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search courses, assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full h-12 pl-12 pr-4 rounded-xl",
              "bg-white/5 border border-white/10",
              "text-white placeholder:text-white/40",
              "focus:outline-none focus:border-primary/50 focus:bg-white/[0.07]",
              "transition-all duration-300"
            )}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 ml-6">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={cn(
              "relative w-12 h-12 rounded-xl",
              "bg-white/5 border border-white/10",
              "flex items-center justify-center",
              "hover:bg-white/10 hover:border-white/20",
              "transition-all duration-300",
              showNotifications && "bg-white/10 border-primary/50"
            )}
          >
            <Bell className="w-5 h-5 text-white/70" />
            {unreadCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-medium"
              >
                {unreadCount}
              </motion.span>
            )}
          </button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-3 w-96 glass-card overflow-hidden z-50"
              >
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">Notifications</h3>
                    <p className="text-sm text-white/50">{unreadCount} unread</p>
                  </div>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <Bell className="w-10 h-10 text-white/20 mx-auto mb-3" />
                      <p className="text-white/50">No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification) => {
                      const Icon = getNotificationIcon(notification.type);
                      return (
                        <motion.div
                          key={notification.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, x: -100 }}
                          onClick={() => markAsRead(notification.id)}
                          className={cn(
                            "p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group relative",
                            !notification.read && "bg-white/[0.03]"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                              getNotificationColor(notification.type)
                            )}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 pr-6">
                              <p className="font-medium text-white text-sm">{notification.title}</p>
                              <p className="text-white/60 text-sm mt-1">{notification.message}</p>
                              <p className="text-white/40 text-xs mt-2 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(notification.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                            )}
                          </div>
                          <button
                            onClick={(e) => deleteNotification(notification.id, e)}
                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 w-6 h-6 rounded-lg hover:bg-white/10 flex items-center justify-center transition-all"
                          >
                            <X className="w-3 h-3 text-white/40 hover:text-white/60" />
                          </button>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-xl",
              "bg-white/5 border border-white/10",
              "hover:bg-white/10 hover:border-white/20",
              "transition-all duration-300",
              showProfile && "bg-white/10 border-primary/50"
            )}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover border border-white/20"
            />
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-white/50">{user.email}</p>
            </div>
            <ChevronDown className={cn(
              "w-4 h-4 text-white/50 transition-transform duration-300",
              showProfile && "rotate-180"
            )} />
          </button>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-3 w-56 glass-card overflow-hidden z-50"
              >
                <div className="p-4 border-b border-white/10">
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="text-sm text-white/50">{user.email}</p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all">
                    <User className="w-4 h-4" />
                    <span className="text-sm">Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                  </button>
                  <div className="border-t border-white/10 my-2" />
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Sign out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Backdrop for dropdowns */}
      <AnimatePresence>
        {(showNotifications || showProfile) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={() => {
              setShowNotifications(false);
              setShowProfile(false);
            }}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
