import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Filter,
  ChevronDown,
  Users,
  Image as ImageIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { courses } from '@/data/dummyData';
import { Modal, ConfirmModal } from '@/components/ui/Modal';
import type { Course } from '@/types';

export function ManageCourses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Course>>({
    title: '',
    description: '',
    instructor: '',
    category: '',
    grade: '',
    price: 0,
    duration: '',
    totalLectures: 0,
  });

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchQuery, statusFilter, categoryFilter]);

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setFormData(course);
    setIsEditModalOpen(true);
  };

  const handleDelete = (course: Course) => {
    setSelectedCourse(course);
    setIsDeleteModalOpen(true);
  };

  const categories = Array.from(new Set(courses.map((c) => c.category)));

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search courses..."
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
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="h-12 px-6 rounded-xl gradient-primary text-white font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          <span>Add Course</span>
        </button>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-4 overflow-hidden"
          >
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 appearance-none"
            >
              <option value="all" className="bg-slate-900">All Status</option>
              <option value="active" className="bg-slate-900">Active</option>
              <option value="waiting_payment" className="bg-slate-900">Waiting Payment</option>
              <option value="completed" className="bg-slate-900">Completed</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 appearance-none"
            >
              <option value="all" className="bg-slate-900">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
              ))}
            </select>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <p className="text-sm text-white/50">
        Showing <span className="text-white font-medium">{filteredCourses.length}</span> courses
      </p>

      {/* Courses Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Course</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-white/60">Instructor</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-white/60">Category</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-white/60">Price</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-white/60">Status</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-white/60">Students</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-white/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course, index) => (
                <motion.tr
                  key={course.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={course.coverImage}
                        alt={course.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-white">{course.title}</p>
                        <p className="text-sm text-white/50">{course.grade}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white/70">{course.instructor}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 rounded-lg bg-white/5 text-white/70 text-sm">
                      {course.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white font-medium">${course.price}</td>
                  <td className="py-4 px-4">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium border",
                      course.status === 'active' && "bg-green-500/20 text-green-400 border-green-500/30",
                      course.status === 'waiting_payment' && "bg-orange-500/20 text-orange-400 border-orange-500/30",
                      course.status === 'completed' && "bg-blue-500/20 text-blue-400 border-blue-500/30"
                    )}>
                      {course.status === 'waiting_payment' ? 'Pending' : course.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-white/70">
                      <Users className="w-4 h-4" />
                      <span>{Math.floor(Math.random() * 100) + 20}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(course)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-white/60" />
                      </button>
                      <button
                        onClick={() => handleDelete(course)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-white/60 hover:text-red-400" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Course Modal */}
      <CourseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Course"
        formData={formData}
        setFormData={setFormData}
        onSubmit={() => {
          setIsAddModalOpen(false);
          setFormData({
            title: '',
            description: '',
            instructor: '',
            category: '',
            grade: '',
            price: 0,
            duration: '',
            totalLectures: 0,
          });
        }}
      />

      {/* Edit Course Modal */}
      <CourseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Course"
        formData={formData}
        setFormData={setFormData}
        onSubmit={() => setIsEditModalOpen(false)}
      />

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Course"
        message={`Are you sure you want to delete "${selectedCourse?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="danger"
        onConfirm={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  formData: Partial<Course>;
  setFormData: (data: Partial<Course>) => void;
  onSubmit: () => void;
}

function CourseModal({ isOpen, onClose, title, formData, setFormData, onSubmit }: CourseModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <div className="space-y-6">
        {/* Cover Image Upload */}
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-xl bg-white/5 border border-white/10 border-dashed flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-white/30" />
          </div>
          <div>
            <p className="text-sm text-white/60 mb-2">Course Cover Image</p>
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 text-sm transition-colors">
              Upload Image
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-white/60 mb-2 block">Course Title</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter course title"
              className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label className="text-sm text-white/60 mb-2 block">Instructor</label>
            <input
              type="text"
              value={formData.instructor || ''}
              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              placeholder="Enter instructor name"
              className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label className="text-sm text-white/60 mb-2 block">Category</label>
            <select
              value={formData.category || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 appearance-none"
            >
              <option value="" className="bg-slate-900">Select category</option>
              <option value="Mathematics" className="bg-slate-900">Mathematics</option>
              <option value="Science" className="bg-slate-900">Science</option>
              <option value="Technology" className="bg-slate-900">Technology</option>
              <option value="Arts" className="bg-slate-900">Arts</option>
              <option value="Languages" className="bg-slate-900">Languages</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-white/60 mb-2 block">Grade Level</label>
            <select
              value={formData.grade || ''}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 appearance-none"
            >
              <option value="" className="bg-slate-900">Select grade</option>
              <option value="9th Grade" className="bg-slate-900">9th Grade</option>
              <option value="10th Grade" className="bg-slate-900">10th Grade</option>
              <option value="11th Grade" className="bg-slate-900">11th Grade</option>
              <option value="12th Grade" className="bg-slate-900">12th Grade</option>
              <option value="All Grades" className="bg-slate-900">All Grades</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-white/60 mb-2 block">Price ($)</label>
            <input
              type="number"
              value={formData.price || ''}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              placeholder="0.00"
              className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label className="text-sm text-white/60 mb-2 block">Duration</label>
            <input
              type="text"
              value={formData.duration || ''}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g., 12 weeks"
              className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-white/60 mb-2 block">Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter course description"
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 resize-none"
          />
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-6 py-3 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
          >
            {title === 'Add New Course' ? 'Create Course' : 'Save Changes'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
