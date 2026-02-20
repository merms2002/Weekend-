import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import { paymentHistory } from '@/data/dummyData';

export function PaymentStatus() {
  const totalPaid = paymentHistory.reduce((acc, p) => acc + p.amount, 0);
  const pendingPayments = 2;
  const pendingAmount = 269.98;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-card overflow-hidden"
    >
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Payment Status</h3>
            <p className="text-sm text-white/50">Track your payment history</p>
          </div>
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400/80">Paid</span>
            </div>
            <p className="text-xl font-bold text-white">${totalPaid.toFixed(2)}</p>
            <p className="text-xs text-white/40">{paymentHistory.length} courses</p>
          </div>
          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-orange-400/80">Pending</span>
            </div>
            <p className="text-xl font-bold text-white">${pendingAmount.toFixed(2)}</p>
            <p className="text-xs text-white/40">{pendingPayments} courses</p>
          </div>
        </div>

        {/* Recent Payments */}
        <div>
          <h4 className="text-sm font-medium text-white mb-4">Recent Payments</h4>
          <div className="space-y-3">
            {paymentHistory.map((payment, index) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{payment.courseName}</p>
                    <p className="text-xs text-white/40">{payment.date}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-white">${payment.amount.toFixed(2)}</span>
              </motion.div>
            ))}

            {/* Pending Payment */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="flex items-center justify-between p-3 rounded-xl bg-orange-500/10 border border-orange-500/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Creative Writing</p>
                  <p className="text-xs text-orange-400/80">Payment due in 3 days</p>
                </div>
              </div>
              <span className="text-sm font-medium text-orange-400">$89.99</span>
            </motion.div>
          </div>
        </div>

        {/* View All Button */}
        <button className="w-full mt-4 py-3 flex items-center justify-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group">
          <span>View All Payments</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
