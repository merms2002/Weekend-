import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock,
  Filter,
  ChevronDown,
  DollarSign,
  CreditCard,
  Eye,
  Calendar,
  User,
  BookOpen,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { allPayments } from '@/data/adminData';
import { Modal } from '@/components/ui/Modal';
import type { Payment } from '@/types';

export function Payments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Local state for payments (to simulate updates)
  const [payments, setPayments] = useState(allPayments);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch = 
        payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [payments, searchQuery, statusFilter]);

  const handleApprove = (paymentId: string) => {
    setPayments(payments.map(p => 
      p.id === paymentId ? { ...p, status: 'completed' } : p
    ));
  };

  const handleReject = (paymentId: string) => {
    setPayments(payments.map(p => 
      p.id === paymentId ? { ...p, status: 'rejected' } : p
    ));
  };

  const handleViewDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDetailsModalOpen(true);
  };

  const getStatusConfig = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return { 
          label: 'Paid', 
          color: 'bg-green-500/20 text-green-400 border-green-500/30',
          icon: CheckCircle 
        };
      case 'pending':
        return { 
          label: 'Pending', 
          color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          icon: Clock 
        };
      case 'rejected':
        return { 
          label: 'Rejected', 
          color: 'bg-red-500/20 text-red-400 border-red-500/30',
          icon: XCircle 
        };
    }
  };

  const stats = {
    total: payments.reduce((acc, p) => acc + p.amount, 0),
    pending: payments.filter(p => p.status === 'pending').reduce((acc, p) => acc + p.amount, 0),
    completed: payments.filter(p => p.status === 'completed').length,
    rejected: payments.filter(p => p.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `$${stats.total.toLocaleString()}`, icon: DollarSign, color: 'from-blue-500 to-cyan-500' },
          { label: 'Pending', value: `$${stats.pending.toLocaleString()}`, icon: Clock, color: 'from-orange-500 to-red-500' },
          { label: 'Completed', value: stats.completed.toString(), icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
          { label: 'Rejected', value: stats.rejected.toString(), icon: XCircle, color: 'from-red-500 to-pink-500' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-4"
          >
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
              "bg-gradient-to-br",
              stat.color
            )}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-white/50">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full h-12 pl-12 pr-4 rounded-xl",
                "bg-white/5 border border-white/10",
                "text-white placeholder:text-white/40",
                "focus:outline-none focus:border-primary/50",
                "transition-all duration-300"
              )}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "h-12 px-4 rounded-xl flex items-center gap-2",
              "bg-white/5 border border-white/10",
              "text-white/70 hover:text-white hover:bg-white/10",
              "transition-all duration-300",
              showFilters && "bg-white/10 border-primary/50"
            )}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform", showFilters && "rotate-180")} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-4"
          >
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 appearance-none"
            >
              <option value="all" className="bg-slate-900">All Status</option>
              <option value="pending" className="bg-slate-900">Pending</option>
              <option value="completed" className="bg-slate-900">Paid</option>
              <option value="rejected" className="bg-slate-900">Rejected</option>
            </select>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <p className="text-sm text-white/50">
        Showing <span className="text-white font-medium">{filteredPayments.length}</span> payments
      </p>

      {/* Payments Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Reference</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-white/60">Student</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-white/60">Course</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-white/60">Amount</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-white/60">Status</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-white/60">Date</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-white/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment, index) => {
                const statusConfig = getStatusConfig(payment.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <motion.tr
                    key={payment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-4 px-6">
                      <code className="text-sm text-white/70 font-mono">{payment.referenceNumber}</code>
                    </td>
                    <td className="py-4 px-4 text-white/70">{payment.studentName}</td>
                    <td className="py-4 px-4 text-white/70">{payment.courseName}</td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-white">${payment.amount.toFixed(2)}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 w-fit",
                        statusConfig.color
                      )}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig.label}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-white/50">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        {payment.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(payment.id)}
                              className="w-8 h-8 rounded-lg bg-green-500/20 hover:bg-green-500/30 flex items-center justify-center transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            </button>
                            <button
                              onClick={() => handleReject(payment.id)}
                              className="w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-colors"
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4 text-red-400" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleViewDetails(payment)}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-white/60" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Payment Details"
        size="md"
      >
        {selectedPayment && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <div>
                <p className="text-sm text-white/50">Amount</p>
                <p className="text-3xl font-bold text-white">${selectedPayment.amount.toFixed(2)}</p>
              </div>
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center",
                getStatusConfig(selectedPayment.status).color.split(' ')[0]
              )}>
                {(() => {
                  const Icon = getStatusConfig(selectedPayment.status).icon;
                  return <Icon className="w-7 h-7" />;
                })()}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Student</p>
                  <p className="text-white font-medium">{selectedPayment.studentName}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Course</p>
                  <p className="text-white font-medium">{selectedPayment.courseName}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Payment Method</p>
                  <p className="text-white font-medium capitalize">{selectedPayment.method || 'Card'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Payment Date</p>
                  <p className="text-white font-medium">
                    {new Date(selectedPayment.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5">
              <p className="text-sm text-white/50 mb-1">Reference Number</p>
              <code className="text-lg text-white font-mono">{selectedPayment.referenceNumber}</code>
            </div>

            {selectedPayment.status === 'pending' && (
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleApprove(selectedPayment.id);
                    setIsDetailsModalOpen(false);
                  }}
                  className="flex-1 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Approve Payment
                </button>
                <button
                  onClick={() => {
                    handleReject(selectedPayment.id);
                    setIsDetailsModalOpen(false);
                  }}
                  className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Reject Payment
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
