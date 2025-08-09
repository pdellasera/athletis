import { motion } from 'framer-motion';
import { Clock, Users, Play } from 'lucide-react';
import type { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/20 hover:bg-white/10 transition-all duration-200 cursor-pointer"
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-white font-medium text-sm mb-1">{course.title}</h4>
          <p className="text-white/50 text-xs mb-2">{course.instructor}</p>
        </div>
        <button className="p-2 bg-[#5b8df9] hover:bg-[#7ca9f9] rounded-lg transition-colors">
          <Play className="w-3 h-3 text-white" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-white/75 text-xs">Progreso</span>
          <span className="text-white text-xs font-medium">{course.progress}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-[#5b8df9] h-2 rounded-full"
          />
        </div>
      </div>

      {/* Course Info */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1 text-white/50">
          <Users className="w-3 h-3" />
          <span>{course.completedLessons}/{course.totalLessons} sesiones</span>
        </div>
        <div className="flex items-center space-x-1 text-white/50">
          <Clock className="w-3 h-3" />
          <span>{course.nextClass}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;