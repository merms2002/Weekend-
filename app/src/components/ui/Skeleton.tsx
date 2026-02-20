import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

export function Skeleton({ 
  className, 
  variant = 'text',
  width,
  height,
  animate = true 
}: SkeletonProps) {
  const baseStyles = 'bg-white/10';
  
  const variantStyles = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
  };

  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  if (!animate) {
    return (
      <div 
        className={cn(baseStyles, variantStyles[variant], className)}
        style={style}
      />
    );
  }

  return (
    <motion.div
      className={cn(baseStyles, variantStyles[variant], 'overflow-hidden', className)}
      style={style}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div
        className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

export function CardSkeleton() {
  return (
    <div className="glass-card p-6 space-y-4">
      <Skeleton variant="rounded" height={160} />
      <Skeleton variant="text" height={24} width="70%" />
      <Skeleton variant="text" height={16} width="90%" />
      <Skeleton variant="text" height={16} width="60%" />
      <div className="flex gap-2 pt-2">
        <Skeleton variant="rounded" height={40} width="100%" />
      </div>
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" height={16} width="60%" />
          <Skeleton variant="text" height={32} width="40%" />
        </div>
      </div>
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 p-4">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton 
          key={i} 
          variant="text" 
          height={20} 
          width={i === 0 ? '30%' : `${60 + Math.random() * 30}%`}
          className="flex-1"
        />
      ))}
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-8">
      <div className="glass-card overflow-hidden">
        <Skeleton variant="rounded" height={128} />
        <div className="px-8 pb-8 -mt-16">
          <div className="flex gap-6">
            <Skeleton variant="circular" width={128} height={128} />
            <div className="flex-1 space-y-3 pt-16">
              <Skeleton variant="text" height={32} width={250} />
              <Skeleton variant="text" height={20} width={200} />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 space-y-4">
            <Skeleton variant="text" height={24} width={200} />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton variant="rounded" height={48} />
              <Skeleton variant="rounded" height={48} />
              <Skeleton variant="rounded" height={48} />
              <Skeleton variant="rounded" height={48} />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            <Skeleton variant="text" height={24} width={150} />
            <Skeleton variant="rounded" height={80} />
            <Skeleton variant="rounded" height={80} />
          </div>
        </div>
      </div>
    </div>
  );
}
