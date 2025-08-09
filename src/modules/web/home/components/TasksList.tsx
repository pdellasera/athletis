import { motion } from 'framer-motion';
import { Clock, AlertCircle, CheckCircle2, FileText } from 'lucide-react';
import type { Task } from '../types';

interface TasksListProps {
  tasks: Task[];
}

const TasksList = ({ tasks }: TasksListProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-[#dc3545]';
      case 'medium': return 'text-[#ffc107]';
      case 'low': return 'text-[#28a745]';
      default: return 'text-white/50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'project': return <FileText className="w-4 h-4" />;
      case 'quiz': return <CheckCircle2 className="w-4 h-4" />;
      case 'assignment': return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div 
      className="bg-white/8 backdrop-blur-xl rounded-xl p-5 border border-white/20"
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <h3 className="text-white text-lg font-medium mb-4">Tareas Pendientes</h3>
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start space-x-3">
                <div className={`p-1 ${getPriorityColor(task.priority)}`}>
                  {getTypeIcon(task.type)}
                </div>
                <div className="flex-1">
                  <h4 className="text-white text-sm font-medium mb-1">{task.title}</h4>
                  <p className="text-white/50 text-xs">{task.course}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-white/50">
                <Clock className="w-3 h-3" />
                <span className="text-xs">{task.dueDate}</span>
              </div>
              <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority.toUpperCase()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TasksList;