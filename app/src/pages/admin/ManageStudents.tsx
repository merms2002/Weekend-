import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Eye, 
  BookOpen,
  Filter,
  ChevronDown,
  Mail,
  Phone,
  GraduationCap,
  UserPlus,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { allStudents, courses } from '@/data/adminData';
import { Modal } from '@/components/ui/Modal';
import type { Student, Course } from '@/types';

export function ManageStudents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const filteredStudents = useMemo(() => {
    return allStudents.filter((student) => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
      const matchesGrade = gradeFilter === 'all' || student.grade === gradeFilter;
      
      return matchesSearch && matchesStatus && matchesGrade;
    });
  }, [searchQuery, statusFilter, gradeFilter]);

  const handleView = (student: Student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const handleAssign = (student: Student) => {
    setSelectedStudent(student);
    setSelectedCourses(student.enrolledCourses || []);
    setIsAssignModalOpen(true);
  };

  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'inactive':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'suspended':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  const grades = Array.from(new Set(allStudents.map((s) => s.grade)));

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search students..."
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
        <button className="h-12 px-6 rounded-xl gradient-primary text-white font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus className="w-5 h-5" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Filters */}
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
            <option value="active" className="bg-slate-900">Active</option>
            <option value="inactive" className="bg-slate-900">Inactive</option>
            <option value="suspended" className="bg-slate-900">Suspended</option>
          </select>
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 appearance-none"
          >
            <option value="all" className="bg-slate-900">All Grades</option>
            {grades.map((grade) => (
              <option key={grade} value={grade} className="bg-slate-900">{grade}</option>
            ))}
          </select>
        </motion.div>
      )}

      {/* Results Count */}
      <p className="text-sm text-white/50">
        Showing <span className="text-white font-medium">{filteredStudents.length}</span> students
      </p>

      {/* Students Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Student</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-white/60">Grade</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-white/60">Status</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-white/60">Courses</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-white/60">Progress</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-white/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-white">{student.name}</p>
                        <p className="text-sm text-white/50">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white/70">{student.grade}</td>
                  <td className="py-4 px-4">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium border capitalize",
                      getStatusColor(student.status)
                    )}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-white/70">
                      <BookOpen className="w-4 h-4" />
                      <span>{student.activeCourses}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full gradient-primary"
                          style={{ width: `${student.overallProgress}%` }}
                        />
                      </div>
                      <span className="text-sm text-white/60">{student.overallProgress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleView(student)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                        title="View Profile"
                      >
                        <Eye className="w-4 h-4 text-white/60" />
                      </button>
                      <button
                        onClick={() => handleAssign(student)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors"
                        title="Assign Courses"
                      >
                        <UserPlus className="w-4 h-4 text-white/60 hover:text-primary" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Student Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Student Profile"
        size="md"
      >
        {selectedStudent && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={selectedStudent.avatar}
                alt={selectedStudent.name}
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-white">{selectedStudent.name}</h3>
                <p className="text-white/60">{selectedStudent.email}</p>
                <span className={cn(
                  "inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium border capitalize",
                  getStatusColor(selectedStudent.status)
                )}>
                  {selectedStudent.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-2 text-white/50 mb-1">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-sm">Grade</span>
                </div>
                <p className="text-white font-medium">{selectedStudent.grade}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-2 text-white/50 mb-1">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">Phone</span>
                </div>
                <p className="text-white font-medium">{selectedStudent.phone || 'N/A'}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-2 text-white/50 mb-1">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">Active Courses</span>
                </div>
                <p className="text-white font-medium">{selectedStudent.activeCourses}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-2 text-white/50 mb-1">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">Parent</span>
                </div>
                <p className="text-white font-medium">{selectedStudent.parentName || 'N/A'}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-white/60 mb-3">Overall Progress</h4>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedStudent.overallProgress}%` }}
                    className="h-full rounded-full gradient-primary"
                  />
                </div>
                <span className="text-white font-medium">{selectedStudent.overallProgress}%</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Assign Courses Modal */}
      <Modal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        title={`Assign Courses to ${selectedStudent?.name}`}
        size="md"
      >
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {courses.map((course: Course) => {
            const isSelected = selectedCourses.includes(course.id);
            return (
              <button
                key={course.id}
                onClick={() => {
                  if (isSelected) {
                    setSelectedCourses(selectedCourses.filter((id) => id !== course.id));
                  } else {
                    setSelectedCourses([...selectedCourses, course.id]);
                  }
                }}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left",
                  isSelected 
                    ? "bg-primary/10 border-primary/50" 
                    : "bg-white/5 border-white/10 hover:border-white/20"
                )}
              >
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-white">{course.title}</p>
                  <p className="text-sm text-white/50">{course.instructor}</p>
                </div>
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                  isSelected 
                    ? "bg-primary border-primary" 
                    : "border-white/30"
                )}>
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <button
            onClick={() => setIsAssignModalOpen(false)}
            className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setIsAssignModalOpen(false)}
            className="px-6 py-3 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
          >
            Assign {selectedCourses.length} Courses
          </button>
        </div>
      </Modal>
    </div>
  );
}
