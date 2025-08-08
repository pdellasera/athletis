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

const MetricsCard = ({ title, value, subtitle, icon, trend, progress = 75, color = '#3b82f6' }: MetricsCardProps) => {
  const getProgressColor = () => {
    return color;
  };

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
              backgroundColor: `${getProgressColor()}15`,
              borderColor: `${getProgressColor()}30`
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

      {/* Barra de progreso */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Progreso</span>
          <span className="text-gray-300 font-medium">{progress}%</span>
        </div>
        
        <div className="relative">
          {/* Fondo de la barra */}
          <div className="w-full h-2 bg-gray-800/80 rounded-full overflow-hidden border border-gray-700/30">
            {/* Barra de progreso animada */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              className="h-full rounded-full relative"
              style={{ 
                background: `linear-gradient(90deg, ${getProgressColor()}, ${getProgressColor()}CC)`,
                boxShadow: `0 0 10px ${getProgressColor()}40`
              }}
            >
              {/* Efecto de brillo en la barra */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${getProgressColor()}40, transparent)`,
                  animation: 'shimmer 2s infinite'
                }}
              />
            </motion.div>
          </div>
          
          {/* Indicador de posición */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="absolute top-0 w-1 h-2 rounded-full"
            style={{ 
              left: `${progress}%`,
              backgroundColor: getProgressColor(),
              boxShadow: `0 0 8px ${getProgressColor()}`,
              transform: 'translateX(-50%)'
            }}
          />
        </div>
      </div>

      {/* Información adicional en la parte inferior */}
      <div className="mt-4 pt-3 border-t border-gray-700/30">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Desde el mes pasado</span>
          <div className="flex items-center space-x-1">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: getProgressColor() }}
            />
            <span className="text-gray-400">Activo</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MetricsCard;