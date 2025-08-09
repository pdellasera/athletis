import { motion } from 'framer-motion';
import { Calendar, BookOpen, Users, MessageCircle, Camera, FileText } from 'lucide-react';

const MobileQuickActions = () => {
  const actions = [
    { id: 'schedule', label: 'Ver Horarios', icon: <Calendar className="w-5 h-5" />, color: '#3b82f6' },
    { id: 'courses', label: 'Mis Cursos', icon: <BookOpen className="w-5 h-5" />, color: '#22c55e' },
    { id: 'team', label: 'Mi Equipo', icon: <Users className="w-5 h-5" />, color: '#f59e0b' },
    { id: 'chat', label: 'Chat', icon: <MessageCircle className="w-5 h-5" />, color: '#a855f7' },
    { id: 'photos', label: 'Galería', icon: <Camera className="w-5 h-5" />, color: '#ef4444' },
    { id: 'reports', label: 'Reportes', icon: <FileText className="w-5 h-5" />, color: '#06b6d4' }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
      <h3 className="text-white text-lg font-semibold mb-4">Acciones Rápidas</h3>
      
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center space-y-2 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
          >
            <div 
              className="p-3 rounded-xl"
              style={{ backgroundColor: `${action.color}20` }}
            >
              <div style={{ color: action.color }}>
                {action.icon}
              </div>
            </div>
            <span className="text-white text-xs font-medium text-center">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MobileQuickActions;