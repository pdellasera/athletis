import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MobileMetricsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  trend?: number;
  progress?: number;
  color?: string;
}

const MobileMetricsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  progress = 75,
  color 
}: MobileMetricsCardProps) => {
  // Función para obtener el gradiente basado en el porcentaje
  const getProgressGradient = () => {
    if (progress <= 50) {
      return 'from-red-500 to-red-600'; // Rojo
    } else if (progress <= 70) {
      return 'from-orange-500 to-amber-600'; // Naranja
    } else {
      return 'from-green-500 to-emerald-600'; // Verde
    }
  };

  // Función para obtener el color principal basado en el porcentaje
  const getMainColor = () => {
    if (progress <= 50) {
      return '#ef4444'; // Rojo
    } else if (progress <= 70) {
      return '#f59e0b'; // Naranja
    } else {
      return '#10b981'; // Verde
    }
  };

  const progressColor = color || getMainColor();
  const gradientClasses = getProgressGradient();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-lg"
      style={{ 
        backdropFilter: 'blur(15px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Header con título y trend */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-300 text-xs font-medium tracking-wide">{title}</h3>
        {trend && (
          <div className={`flex items-center space-x-1 px-1.5 py-0.5 rounded-full text-xs font-semibold ${
            trend > 0 
              ? 'text-green-400 bg-green-500/10 border border-green-500/20' 
              : 'text-red-400 bg-red-500/10 border border-red-500/20'
          }`}>
            {trend > 0 ? (
              <TrendingUp className="w-2.5 h-2.5" />
            ) : (
              <TrendingDown className="w-2.5 h-2.5" />
            )}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>

      {/* Valor principal */}
      <div className="mb-3">
        <div className="flex items-center space-x-2 mb-2">
          <div 
            className="p-1.5 rounded-lg shadow-lg border"
            style={{ 
              backgroundColor: `${progressColor}15`,
              borderColor: `${progressColor}30`
            }}
          >
            <div style={{ color: progressColor }}>
              {icon}
            </div>
          </div>
          <div>
            <p className="text-white text-xl font-bold tracking-tight">{value}</p>
          </div>
        </div>
        <p className="text-gray-400 text-xs">{subtitle}</p>
      </div>

      {/* Progress Bar - Solo si se proporciona progress */}
      {progress !== undefined && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }} 
          className="mt-3" 
        > 
          <div className="flex justify-between items-center mb-1"> 
            <span className="text-gray-400 text-xs">Progreso</span> 
            <span className="text-white text-xs font-semibold"> 
              {Math.round(progress)}% 
            </span> 
          </div> 
          <div className="w-full bg-gray-600/30 rounded-full h-1.5 overflow-hidden"> 
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${progress}%` }} 
              transition={{ duration: 1.2, ease: "easeOut" }} 
              className={`h-full bg-gradient-to-r ${gradientClasses} rounded-full shadow-sm`} 
            /> 
          </div> 
        </motion.div>
      )}

      {/* Información adicional en la parte inferior */}
      <div className="mt-3 pt-2 border-t border-gray-700/30">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Actualizado</span>
          <div className="flex items-center space-x-1">
            <div 
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: progressColor }}
            />
            <span className="text-gray-400">Activo</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileMetricsCard;