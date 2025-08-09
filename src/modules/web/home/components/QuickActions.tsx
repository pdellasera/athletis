import { motion } from 'framer-motion';
import { Video, FileText, BarChart3, Calendar, MessageSquare, Settings } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    { icon: <Video className="w-5 h-5" />, label: 'Clases en Vivo', color: 'from-[#3cefff] to-[#00d8ff]' },
    { icon: <FileText className="w-5 h-5" />, label: 'Entregar Tarea', color: 'from-[#9b5cff] to-[#ff57d2]' },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Calificaciones', color: 'from-[#ff3c6e] to-[#a800ff]' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Horarios', color: 'from-[#ffb648] to-[#00c0ff]' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Mensajes', color: 'from-[#00ffb3] to-[#45f3ff]' },
    { icon: <Settings className="w-5 h-5" />, label: 'Configuración', color: 'from-[#ffd815] to-[#ff3c6e]' },
  ];

  return (
    <div className="bg-[#1f223c] rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.4)] border border-gray-700/30">
      <h3 className="text-white font-semibold text-lg mb-6">Acciones Rápidas</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-r ${action.color} p-4 rounded-xl text-white font-medium text-sm flex flex-col items-center space-y-2 shadow-lg`}
          >
            {action.icon}
            <span>{action.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;