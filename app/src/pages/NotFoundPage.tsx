import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mb-8"
        >
          {/* Background glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-64 h-64 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 blur-3xl"
            />
          </div>

          {/* 404 Text */}
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
            className="relative text-[150px] md:text-[200px] font-bold leading-none"
          >
            <span className="gradient-text">4</span>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block gradient-text"
            >
              0
            </motion.span>
            <span className="gradient-text">4</span>
          </motion.h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Page Not Found
          </h2>
          <p className="text-white/60 text-lg max-w-md mx-auto">
            Oops! The page you&apos;re looking for seems to have wandered off into the digital void.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate(-1)}
            className={cn(
              "w-full sm:w-auto px-6 py-3 rounded-xl",
              "bg-white/5 border border-white/10",
              "text-white/70 hover:text-white hover:bg-white/10",
              "flex items-center justify-center gap-2",
              "transition-all duration-300"
            )}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className={cn(
              "w-full sm:w-auto px-6 py-3 rounded-xl",
              "gradient-primary text-white",
              "flex items-center justify-center gap-2",
              "hover:opacity-90 transition-opacity"
            )}
          >
            <Home className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex items-center justify-center gap-8"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: 'easeInOut',
                delay: i * 0.3
              }}
              className="w-3 h-3 rounded-full bg-primary"
            />
          ))}
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <p className="text-white/40 text-sm mb-4">You might want to check:</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'Dashboard', path: '/dashboard' },
              { label: 'Courses', path: '/courses' },
              { label: 'Profile', path: '/profile' },
              { label: 'Messages', path: '/messages' },
            ].map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
