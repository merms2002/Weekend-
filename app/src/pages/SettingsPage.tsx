import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Moon, 
  Sun, 
  Globe, 
  Bell, 
  Mail, 
  MessageSquare, 
  Shield, 
  Save,
  Check,
  ChevronRight,
  Smartphone,
  Volume2,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function SettingsPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState('en');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    courseUpdates: true,
    assignmentReminders: true,
    paymentAlerts: true,
    marketingEmails: false,
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showProgress: false,
    allowAnalytics: true,
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 1000);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-white/60 mt-1">Customize your experience</p>
        </div>
        <motion.button
          onClick={handleSave}
          disabled={isSaving}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all",
            showSuccess 
              ? "bg-green-500 text-white" 
              : "gradient-primary text-white hover:opacity-90",
            isSaving && "opacity-70 cursor-not-allowed"
          )}
        >
          {isSaving ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            />
          ) : showSuccess ? (
            <Check className="w-5 h-5" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          <span>{showSuccess ? 'Saved!' : isSaving ? 'Saving...' : 'Save Changes'}</span>
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-purple-400" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-400" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Appearance</h3>
                <p className="text-sm text-white/50">Choose your preferred theme</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setTheme('dark')}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all text-left",
                  theme === 'dark'
                    ? "border-primary bg-primary/10"
                    : "border-white/10 hover:border-white/20"
                )}
              >
                <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center mb-3">
                  <Moon className="w-6 h-6 text-white" />
                </div>
                <p className="font-medium text-white">Dark</p>
                <p className="text-sm text-white/50">Easy on the eyes</p>
              </button>
              <button
                onClick={() => setTheme('light')}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all text-left",
                  theme === 'light'
                    ? "border-primary bg-primary/10"
                    : "border-white/10 hover:border-white/20"
                )}
              >
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-3">
                  <Sun className="w-6 h-6 text-slate-900" />
                </div>
                <p className="font-medium text-white">Light</p>
                <p className="text-sm text-white/50">Clean and bright</p>
              </button>
            </div>
          </motion.div>

          {/* Language */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Language</h3>
                <p className="text-sm text-white/50">Select your preferred language</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={cn(
                    "p-3 rounded-xl border transition-all flex items-center gap-3",
                    language === lang.code
                      ? "border-primary bg-primary/10"
                      : "border-white/10 hover:border-white/20"
                  )}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-white">{lang.name}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Bell className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Notifications</h3>
                <p className="text-sm text-white/50">Manage your notification preferences</p>
              </div>
            </div>

            <div className="space-y-4">
              <ToggleItem
                icon={Mail}
                title="Email Notifications"
                description="Receive updates via email"
                checked={notifications.email}
                onChange={(checked) => setNotifications({ ...notifications, email: checked })}
              />
              <ToggleItem
                icon={Smartphone}
                title="Push Notifications"
                description="Receive push notifications on your device"
                checked={notifications.push}
                onChange={(checked) => setNotifications({ ...notifications, push: checked })}
              />
              <ToggleItem
                icon={MessageSquare}
                title="SMS Notifications"
                description="Receive text message updates"
                checked={notifications.sms}
                onChange={(checked) => setNotifications({ ...notifications, sms: checked })}
              />
              <div className="border-t border-white/10 pt-4" />
              <ToggleItem
                title="Course Updates"
                description="New lectures and course announcements"
                checked={notifications.courseUpdates}
                onChange={(checked) => setNotifications({ ...notifications, courseUpdates: checked })}
              />
              <ToggleItem
                title="Assignment Reminders"
                description="Upcoming deadlines and due dates"
                checked={notifications.assignmentReminders}
                onChange={(checked) => setNotifications({ ...notifications, assignmentReminders: checked })}
              />
              <ToggleItem
                title="Payment Alerts"
                description="Payment confirmations and reminders"
                checked={notifications.paymentAlerts}
                onChange={(checked) => setNotifications({ ...notifications, paymentAlerts: checked })}
              />
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Privacy</h3>
                <p className="text-sm text-white/50">Control your privacy settings</p>
              </div>
            </div>

            <div className="space-y-4">
              <ToggleItem
                icon={Eye}
                title="Public Profile"
                description="Allow others to see your profile"
                checked={privacy.showProfile}
                onChange={(checked) => setPrivacy({ ...privacy, showProfile: checked })}
              />
              <ToggleItem
                title="Show Progress"
                description="Display your learning progress publicly"
                checked={privacy.showProgress}
                onChange={(checked) => setPrivacy({ ...privacy, showProgress: checked })}
              />
              <ToggleItem
                title="Analytics"
                description="Help us improve by sharing usage data"
                checked={privacy.allowAnalytics}
                onChange={(checked) => setPrivacy({ ...privacy, allowAnalytics: checked })}
              />
            </div>
          </motion.div>

          {/* Sound */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Sound</h3>
                <p className="text-sm text-white/50">Audio preferences</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Notification Sound</span>
                <button className="text-primary text-sm">Change</button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Message Sound</span>
                <button className="text-primary text-sm">Change</button>
              </div>
            </div>
          </motion.div>

          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Account</h3>
            <div className="space-y-2">
              <button className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between text-left">
                <span className="text-white/70">Change Password</span>
                <ChevronRight className="w-4 h-4 text-white/40" />
              </button>
              <button className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between text-left">
                <span className="text-white/70">Two-Factor Auth</span>
                <ChevronRight className="w-4 h-4 text-white/40" />
              </button>
              <button className="w-full p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-colors flex items-center justify-between text-left">
                <span className="text-red-400">Delete Account</span>
                <ChevronRight className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

interface ToggleItemProps {
  icon?: React.ElementType;
  title: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleItem({ icon: Icon, title, description, checked, onChange }: ToggleItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5 text-white/40" />}
        <div>
          <p className="text-white">{title}</p>
          {description && <p className="text-sm text-white/50">{description}</p>}
        </div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          "w-12 h-6 rounded-full transition-colors relative",
          checked ? "bg-primary" : "bg-white/20"
        )}
      >
        <motion.div
          animate={{ x: checked ? 24 : 4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 rounded-full bg-white"
        />
      </button>
    </div>
  );
}
