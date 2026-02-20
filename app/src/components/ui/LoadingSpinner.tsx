import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: 'primary' | 'white' | 'accent';
}

const sizeMap = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-3',
  xl: 'w-12 h-12 border-4',
};

const colorMap = {
  primary: 'border-primary border-t-transparent',
  white: 'border-white border-t-transparent',
  accent: 'border-accent border-t-transparent',
};

export function LoadingSpinner({ 
  size = 'md', 
  className,
  color = 'primary' 
}: LoadingSpinnerProps) {
  return (
    <motion.div
      className={cn(
        'rounded-full',
        sizeMap[size],
        colorMap[color],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{ 
        duration: 1, 
        repeat: Infinity, 
        ease: 'linear' 
      }}
    />
  );
}

export function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        {/* Outer ring */}
        <motion.div
          className="w-20 h-20 rounded-full border-4 border-primary/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent" />
        </motion.div>
        
        {/* Inner ring */}
        <motion.div
          className="absolute inset-4 rounded-full border-3 border-accent/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 rounded-full border-3 border-t-accent border-r-transparent border-b-transparent border-l-transparent" />
        </motion.div>
        
        {/* Center dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-3 h-3 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-white/60 text-sm"
      >
        Loading...
      </motion.p>
    </div>
  );
}

export function ButtonLoader({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <LoadingSpinner size="sm" color="white" />
      <span className="text-sm">Loading...</span>
    </div>
  );
}

export function ContentLoader() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-white/5 animate-pulse" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-1/3 bg-white/5 rounded animate-pulse" />
          <div className="h-3 w-1/4 bg-white/5 rounded animate-pulse" />
        </div>
      </div>
      <div className="h-32 bg-white/5 rounded-xl animate-pulse" />
    </div>
  );
}
