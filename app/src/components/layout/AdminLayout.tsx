import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  UserCircle, 
  CreditCard, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const adminMenuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
  { icon: BookOpen, label: 'Manage Courses', path: '/admin/courses' },
  { icon: Users, label: 'Manage Students', path: '/admin/students' },
  { icon: UserCircle, label: 'Manage Parents', path: '/admin/parents' },
  { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
  { icon: BarChart3, label: 'Reports', path: '/admin/reports' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export function AdminLayout({ children, isCollapsed, setIsCollapsed }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActivePath = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 280 }}
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
            onClick={() => navigate('/admin')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="font-bold text-lg text-white">Admin</span>
                <span className="text-xs text-white/50 block">EduFlow</span>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6">
          <ul className="space-y-1">
            {adminMenuItems.map((item, index) => (
              <motion.li
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl",
                    "text-white/70 hover:text-white hover:bg-white/10",
                    "transition-all duration-300 group",
                    isActivePath(item.path) && "bg-white/10 text-white"
                  )}
                >
                  <item.icon className={cn(
                    "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                    isActivePath(item.path) && "text-red-400"
                  )} />
                  {!isCollapsed && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                </button>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Back to App & Logout */}
        <div className="px-3 py-4 border-t border-white/10 space-y-2">
          <button
            onClick={() => navigate('/dashboard')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl",
              "text-white/70 hover:text-white hover:bg-white/10",
              "transition-all duration-300 group"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium text-sm">Back to App</span>}
          </button>
          <button
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl",
              "text-red-400 hover:text-red-300 hover:bg-red-500/10",
              "transition-all duration-300 group"
            )}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium text-sm">Sign Out</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen transition-all duration-300",
          isCollapsed ? "pl-20" : "pl-72"
        )}
      >
        {/* Admin Header */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-white/10 glass sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-semibold text-white">
              {adminMenuItems.find(item => isActivePath(item.path))?.label || 'Admin'}
            </h1>
            <p className="text-sm text-white/50">Manage your learning platform</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <span className="text-sm font-bold text-white">A</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-white/50">admin@eduflow.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
