import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Users, 
  Lock, 
  Shield, 
  BookOpen, 
  CheckCircle, 
  CreditCard, 
  Calendar,
  Eye,
  EyeOff,
  Save,
  Edit3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { currentStudent, courses } from '@/data/dummyData';

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: currentStudent.name,
    email: currentStudent.email,
    phone: currentStudent.phone || '',
    grade: currentStudent.grade,
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, save to backend
  };

  const activeCoursesCount = courses.filter((c) => c.status === 'active').length;
  const completedCoursesCount = courses.filter((c) => c.status === 'completed').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <p className="text-white/60">Manage your account and preferences</p>
      </motion.div>

      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card overflow-hidden"
      >
        <div className="relative h-32 gradient-primary">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-accent/50" />
        </div>
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6 flex flex-col sm:flex-row sm:items-end gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-background">
                <img
                  src={currentStudent.avatar}
                  alt={currentStudent.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-primary hover:bg-primary/90 flex items-center justify-center transition-colors shadow-lg">
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 pb-2">
              <h2 className="text-2xl font-bold text-white">{currentStudent.name}</h2>
              <p className="text-white/60">{currentStudent.email}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm text-white/80">
                  {currentStudent.grade}
                </span>
                <span className="text-sm text-white/50">
                  Parent: {currentStudent.parentName}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={cn(
                "px-6 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-all",
                isEditing 
                  ? "gradient-primary text-white" 
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
              )}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Account Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Account Information */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white">Account Information</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-white/60 mb-2 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    className={cn(
                      "w-full h-12 pl-12 pr-4 rounded-xl",
                      "bg-white/5 border border-white/10",
                      "text-white",
                      "focus:outline-none focus:border-primary/50",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "transition-all duration-300"
                    )}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-white/60 mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className={cn(
                      "w-full h-12 pl-12 pr-4 rounded-xl",
                      "bg-white/5 border border-white/10",
                      "text-white",
                      "focus:outline-none focus:border-primary/50",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "transition-all duration-300"
                    )}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-white/60 mb-2 block">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    className={cn(
                      "w-full h-12 pl-12 pr-4 rounded-xl",
                      "bg-white/5 border border-white/10",
                      "text-white",
                      "focus:outline-none focus:border-primary/50",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "transition-all duration-300"
                    )}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-white/60 mb-2 block">Grade Level</label>
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    disabled={!isEditing}
                    className={cn(
                      "w-full h-12 pl-12 pr-4 rounded-xl",
                      "bg-white/5 border border-white/10",
                      "text-white",
                      "focus:outline-none focus:border-primary/50",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "appearance-none",
                      "transition-all duration-300"
                    )}
                  >
                    <option value="9th Grade" className="bg-slate-900">9th Grade</option>
                    <option value="10th Grade" className="bg-slate-900">10th Grade</option>
                    <option value="11th Grade" className="bg-slate-900">11th Grade</option>
                    <option value="12th Grade" className="bg-slate-900">12th Grade</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-white/40" />
                <span className="text-white/60">Parent/Guardian:</span>
                <span className="text-white">{currentStudent.parentName}</span>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Lock className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Security</h3>
            </div>

            {/* Change Password */}
            <div className="space-y-4 mb-8">
              <h4 className="text-sm font-medium text-white/80">Change Password</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordData.current}
                      onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                      placeholder="••••••••"
                      className={cn(
                        "w-full h-12 pl-12 pr-12 rounded-xl",
                        "bg-white/5 border border-white/10",
                        "text-white placeholder:text-white/30",
                        "focus:outline-none focus:border-primary/50",
                        "transition-all duration-300"
                      )}
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-white/60 mb-2 block">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.new}
                      onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                      placeholder="••••••••"
                      className={cn(
                        "w-full h-12 pl-12 pr-12 rounded-xl",
                        "bg-white/5 border border-white/10",
                        "text-white placeholder:text-white/30",
                        "focus:outline-none focus:border-primary/50",
                        "transition-all duration-300"
                      )}
                    />
                    <button
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <button className="px-6 py-3 rounded-xl gradient-primary text-white font-medium text-sm hover:opacity-90 transition-opacity">
                Update Password
              </button>
            </div>

            {/* Two-Factor Authentication */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                    <p className="text-sm text-white/50">Add an extra layer of security</p>
                  </div>
                </div>
                <button
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className={cn(
                    "w-14 h-8 rounded-full transition-colors relative",
                    twoFactorEnabled ? "bg-green-500" : "bg-white/20"
                  )}
                >
                  <motion.div
                    animate={{ x: twoFactorEnabled ? 24 : 4 }}
                    className="absolute top-1 w-6 h-6 rounded-full bg-white"
                  />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Subscription Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Learning Summary</h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="text-white/70">Active Courses</span>
                </div>
                <span className="text-xl font-bold text-white">{activeCoursesCount}</span>
              </div>

              <div className="p-4 rounded-xl bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white/70">Completed</span>
                </div>
                <span className="text-xl font-bold text-white">{completedCoursesCount}</span>
              </div>

              <div className="p-4 rounded-xl bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-accent" />
                  <span className="text-white/70">Total Spent</span>
                </div>
                <span className="text-xl font-bold text-white">
                  ${currentStudent.totalPayments.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Next Payment */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Next Payment</h3>
            </div>
            
            {currentStudent.nextPaymentDue ? (
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <p className="text-sm text-orange-400/80 mb-1">Due Date</p>
                <p className="text-lg font-semibold text-white">
                  {new Date(currentStudent.nextPaymentDue).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            ) : (
              <p className="text-white/50 text-center py-4">No upcoming payments</p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-medium text-white/60 mb-4">Overall Progress</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentStudent.overallProgress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full gradient-primary"
                  />
                </div>
              </div>
              <span className="text-xl font-bold text-white">{currentStudent.overallProgress}%</span>
            </div>
            <p className="text-sm text-white/50 mt-2">Keep up the great work!</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
