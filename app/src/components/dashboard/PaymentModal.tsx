import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, CreditCard, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Course } from '@/types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
}

export function PaymentModal({ isOpen, onClose, course }: PaymentModalProps) {
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!course) return null;

  const referenceNumber = `EDU-${Date.now().toString(36).toUpperCase()}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="glass-card overflow-hidden">
              {/* Header */}
              <div className="relative p-6 border-b border-white/10">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>
                <h2 className="text-xl font-semibold text-white">Complete Payment</h2>
                <p className="text-sm text-white/50 mt-1">Secure payment processing</p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4"
                    >
                      <Check className="w-10 h-10 text-green-500" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white mb-2">Payment Successful!</h3>
                    <p className="text-white/60">You can now access the course</p>
                  </motion.div>
                ) : (
                  <>
                    {/* Course Info */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                      <img
                        src={course.coverImage}
                        alt={course.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{course.title}</h3>
                        <p className="text-sm text-white/50">{course.instructor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-white">${course.price}</p>
                      </div>
                    </div>

                    {/* Reference Number */}
                    <div>
                      <label className="text-sm text-white/60 mb-2 block">Reference Number</label>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                          <code className="text-white font-mono">{referenceNumber}</code>
                        </div>
                        <button
                          onClick={handleCopy}
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                            copied 
                              ? "bg-green-500/20 text-green-400" 
                              : "bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
                          )}
                        >
                          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                      </div>
                      <p className="text-xs text-white/40 mt-2">
                        Copy this reference number for your records
                      </p>
                    </div>

                    {/* Payment Methods */}
                    <div>
                      <label className="text-sm text-white/60 mb-3 block">Payment Method</label>
                      <div className="grid grid-cols-3 gap-3">
                        {['Card', 'PayPal', 'Crypto'].map((method) => (
                          <button
                            key={method}
                            className={cn(
                              "py-3 px-4 rounded-xl border transition-all",
                              "bg-white/5 border-white/10 hover:border-white/20",
                              "text-white/70 hover:text-white text-sm font-medium"
                            )}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Security Note */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <p className="text-xs text-green-400/80">
                        Your payment is secured with 256-bit encryption
                      </p>
                    </div>

                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className={cn(
                        "w-full py-4 rounded-xl font-medium",
                        "gradient-primary text-white",
                        "flex items-center justify-center gap-2",
                        "hover:opacity-90 transition-opacity",
                        isProcessing && "opacity-70 cursor-not-allowed"
                      )}
                    >
                      {isProcessing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          <span>I have paid ${course.price}</span>
                        </>
                      )}
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
