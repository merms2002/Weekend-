import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  CreditCard, 
  Calendar, 
  MessageSquare, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Users,
  GraduationCap,
  User,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  activeView: 'student' | 'parent';
  setActiveView: (view: 'student' | 'parent') => void;
}

const studentMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: BookOpen, label: 'My Courses', path: '/courses' },
  { icon: Calendar, label: 'Schedule', path: '/schedule' },
  { icon: CreditCard, label: 'Payments', path: '/payments' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
];

const parentMenuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: Users, label: 'My Children', path: '/children' },
  { icon: GraduationCap, label: 'Progress', path: '/progress' },
  { icon: CreditCard, label: 'Payments', path: '/payments' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
];

export function Sidebar({ isCollapsed, setIsCollapsed, activeView, setActiveView }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = activeView === 'student' ? studentMenuItems : parentMenuItems;

  const handleNavigation = (path: string) => {
    // For demo purposes, only certain paths are implemented
    const implementedPaths = ['/dashboard', '/courses', '/profile', '/messages', '/settings'];
    if (implementedPaths.includes(path)) {
      navigate(path);
    }
  };

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }}
      className={cn(
        "fixed left-0 top-0 h-screen z-40 glass border-r border-white/10",
        "flex flex-col"
      )}
    >
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-white/10">
        <motion.div
          animate={{ scale: isCollapsed ? 0.9 : 1 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-bold text-lg text-white"
            >
              EduFlow
            </motion.span>
          )}
        </motion.div>
      </div>

      {/* View Toggle */}
      <div className="px-4 py-4">
        <div className={cn(
          "flex bg-white/5 rounded-xl p-1",
          isCollapsed && "flex-col"
        )}>
          <button
            onClick={() => setActiveView('student')}
            className={cn(
              "flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300",
              activeView === 'student' 
                ? "gradient-primary text-white" 
                : "text-white/60 hover:text-white hover:bg-white/5"
            )}
          >
            <GraduationCap className="w-4 h-4" />
            {!isCollapsed && <span>Student</span>}
          </button>
          <button
            onClick={() => setActiveView('parent')}
            className={cn(
              "flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300",
              activeView === 'parent' 
                ? "gradient-primary text-white" 
                : "text-white/60 hover:text-white hover:bg-white/5"
            )}
          >
            <Users className="w-4 h-4" />
            {!isCollapsed && <span>Parent</span>}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl",
                  "text-white/70 hover:text-white hover:bg-white/10",
                  "transition-all duration-300 group",
                  isActivePath(item.path) && "bg-white/10 text-white"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                  isActivePath(item.path) && "text-primary"
                )} />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="px-3 py-4 border-t border-white/10 space-y-2">
        {/* Admin Link */}
        <button
          onClick={() => navigate('/admin')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl",
            "text-white/70 hover:text-white hover:bg-white/10",
            "transition-all duration-300 group",
            location.pathname.startsWith('/admin') && "bg-white/10 text-white"
          )}
        >
          <Shield className={cn(
            "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
            location.pathname.startsWith('/admin') && "text-red-400"
          )} />
          {!isCollapsed && <span className="font-medium">Admin Panel</span>}
        </button>

        {/* Profile */}
        <button
          onClick={() => navigate('/profile')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl",
            "text-white/70 hover:text-white hover:bg-white/10",
            "transition-all duration-300 group",
            location.pathname === '/profile' && "bg-white/10 text-white"
          )}
        >
          <User className={cn(
            "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
            location.pathname === '/profile' && "text-primary"
          )} />
          {!isCollapsed && <span className="font-medium">Profile</span>}
        </button>

        {/* Settings */}
        <button
          onClick={() => navigate('/settings')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl",
            "text-white/70 hover:text-white hover:bg-white/10",
            "transition-all duration-300 group",
            location.pathname === '/settings' && "bg-white/10 text-white"
          )}
        >
          <Settings className={cn(
            "w-5 h-5 transition-transform duration-300 group-hover:rotate-90",
            location.pathname === '/settings' && "text-primary"
          )} />
          {!isCollapsed && <span className="font-medium">Settings</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-glow hover:scale-110 transition-transform"
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
  );
}
