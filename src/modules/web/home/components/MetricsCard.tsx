import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  trend?: number;
  progress?: number;
  color?: string;
}

const MetricsCard = ({ title, value, subtitle, icon, trend, progress = 75 }: MetricsCardProps) => {
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

  const progressColor = getMainColor();
  const gradientClasses = getProgressGradient();

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-2xl"
      style={{ 
        backdropFilter: 'blur(15px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
      }}
    >
      {/* Header con título y trend */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-300 text-sm font-medium tracking-wide">{title}</h3>
        {trend && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${
            trend > 0 
              ? 'text-green-400 bg-green-500/10 border border-green-500/20' 
              : 'text-red-400 bg-red-500/10 border border-red-500/20'
          }`}>
            {trend > 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>

      {/* Valor principal */}
      <div className="mb-4">
        <div className="flex items-center space-x-3 mb-2">
          <div 
            className="p-2 rounded-lg shadow-lg border"
            style={{ 
              backgroundColor: `${progressColor}15`,
              borderColor: `${progressColor}30`
            }}
          >
            {icon}
          </div>
          <div>
            <p className="text-white text-3xl font-bold tracking-tight">{value}</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>

      {/* Progress Bar usando el estilo de PeriodInfo */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.4 }} 
        className="mt-6" 
      > 
        <div className="flex justify-between items-center mb-2"> 
          <span className="text-gray-400 text-xs">Progreso</span> 
          <span className="text-white text-xs font-semibold"> 
            {Math.round(progress)}% 
          </span> 
        </div> 
        <div className="w-full bg-gray-600/30 rounded-full h-2 overflow-hidden"> 
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${progress}%` }} 
            transition={{ duration: 1.5, ease: "easeOut" }} 
            className={`h-full bg-gradient-to-r ${gradientClasses} rounded-full shadow-lg`} 
          /> 
        </div> 
      </motion.div>

      {/* Información adicional en la parte inferior */}
      <div className="mt-4 pt-3 border-t border-gray-700/30">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Desde el mes pasado</span>
          <div className="flex items-center space-x-1">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: progressColor }}
            />
            <span className="text-gray-400">Activo</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MetricsCard;