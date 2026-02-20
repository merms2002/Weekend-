import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '@/components/shared/Sidebar';
import { Navbar } from '@/components/shared/Navbar';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { CoursesPage } from '@/pages/CoursesPage';
import { CourseDetailPage } from '@/pages/CourseDetailPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { MessagesPage } from '@/pages/MessagesPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { AdminOverview } from '@/pages/admin/AdminOverview';
import { ManageCourses } from '@/pages/admin/ManageCourses';
import { ManageStudents } from '@/pages/admin/ManageStudents';
import { Payments } from '@/pages/admin/Payments';
import { Reports } from '@/pages/admin/Reports';
import { currentStudent, parentData } from '@/data/dummyData';
import { cn } from '@/lib/utils';

// Main Layout for student/parent views
function MainLayout({ 
  isSidebarCollapsed, 
  setIsSidebarCollapsed, 
  activeView, 
  setActiveView 
}: {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (value: boolean) => void;
  activeView: 'student' | 'parent';
  setActiveView: (view: 'student' | 'parent') => void;
}) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      <Navbar
        user={activeView === 'student' ? currentStudent : parentData}
        isCollapsed={isSidebarCollapsed}
      />
      <main
        className={cn(
          "pt-20 min-h-screen transition-all duration-300",
          isSidebarCollapsed ? "pl-20" : "pl-64"
        )}
      >
        <div className="p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/courses/:id" element={<CourseDetailPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// Admin Layout Wrapper
function AdminLayoutWrapper({ 
  isCollapsed, 
  setIsCollapsed 
}: {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}) {
  const location = useLocation();

  return (
    <AdminLayout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/courses" element={<ManageCourses />} />
            <Route path="/students" element={<ManageStudents />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </AdminLayout>
  );
}

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState<'student' | 'parent'>('student');
  const [isAdminSidebarCollapsed, setIsAdminSidebarCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route 
          path="/admin/*" 
          element={
            <AdminLayoutWrapper 
              isCollapsed={isAdminSidebarCollapsed}
              setIsCollapsed={setIsAdminSidebarCollapsed}
            />
          } 
        />
        
        {/* Main App Routes */}
        <Route 
          path="/*" 
          element={
            <MainLayout
              isSidebarCollapsed={isSidebarCollapsed}
              setIsSidebarCollapsed={setIsSidebarCollapsed}
              activeView={activeView}
              setActiveView={setActiveView}
            />
          }
        />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
