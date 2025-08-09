import { motion } from 'framer-motion';
import { Calendar, Clock, Trophy, Settings, RefreshCw } from 'lucide-react';
import { usePeriod } from '../../../../hooks/usePeriod';
import { formatDateRange } from '../../../../utils/periodUtils';
// Importar iconos de deportes de React Icons
import { 
  FaFutbol, 
  FaBasketballBall, 
  FaTableTennis,
  FaRunning,
  FaSwimmer,
  FaBaseballBall,
  FaBiking
} from 'react-icons/fa';
import { GiVolleyballBall } from 'react-icons/gi';

interface MobilePeriodInfoProps {
  onChangePeriod?: () => void;
  showActions?: boolean;
}

const MobilePeriodInfo: React.FC<MobilePeriodInfoProps> = ({ 
  onChangePeriod, 
  showActions = true 
}) => {
  const { activePeriod, isLoading, refreshPeriods } = usePeriod();

  const getSportIcon = (sport: string) => {
    const icons: Record<string, React.ReactNode> = {
      'Fútbol': <FaFutbol className="w-4 h-4 text-white" />,
      'Baloncesto': <FaBasketballBall className="w-4 h-4 text-white" />,
      'Voleibol': <GiVolleyballBall className="w-4 h-4 text-white" />,
      'Atletismo': <FaRunning className="w-4 h-4 text-white" />,
      'Natación': <FaSwimmer className="w-4 h-4 text-white" />,
      'Tenis': <FaTableTennis className="w-4 h-4 text-white" />,
      'Béisbol': <FaBaseballBall className="w-4 h-4 text-white" />,
      'Ciclismo': <FaBiking className="w-4 h-4 text-white" />
    };
    return icons[sport] || <Trophy className="w-4 h-4 text-white" />;
  };

  const getSportColor = (sport: string) => {
    const colors: Record<string, { gradient: string, bg: string, text: string }> = {
      'Fútbol': { gradient: 'from-green-500 to-emerald-600', bg: 'bg-green-500/20', text: 'text-green-400' },
      'Baloncesto': { gradient: 'from-orange-500 to-amber-600', bg: 'bg-orange-500/20', text: 'text-orange-400' },
      'Voleibol': { gradient: 'from-blue-500 to-cyan-600', bg: 'bg-blue-500/20', text: 'text-blue-400' },
      'Atletismo': { gradient: 'from-red-500 to-rose-600', bg: 'bg-red-500/20', text: 'text-red-400' },
      'Natación': { gradient: 'from-cyan-500 to-teal-600', bg: 'bg-cyan-500/20', text: 'text-cyan-400' },
      'Tenis': { gradient: 'from-yellow-500 to-orange-600', bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
      'Béisbol': { gradient: 'from-purple-500 to-violet-600', bg: 'bg-purple-500/20', text: 'text-purple-400' },
      'Ciclismo': { gradient: 'from-pink-500 to-rose-600', bg: 'bg-pink-500/20', text: 'text-pink-400' }
    };
    return colors[sport] || { gradient: 'from-gray-500 to-gray-600', bg: 'bg-gray-500/20', text: 'text-gray-400' };
  };

  const getDaysRemaining = () => {
    if (!activePeriod) return 0;
    const now = new Date();
    const endDate = new Date(activePeriod.endDate);
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const getProgressPercentage = () => {
    if (!activePeriod) return 0;
    const now = new Date();
    const startDate = new Date(activePeriod.startDate);
    const endDate = new Date(activePeriod.endDate);
    
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsed = now.getTime() - startDate.getTime();
    
    return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-600/30 p-4 shadow-xl"
      >
        <div className="animate-pulse">
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-6 bg-gray-700 rounded w-1/2"></div>
            <div className="h-2 bg-gray-700 rounded w-full"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!activePeriod) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-600/30 p-4 shadow-xl"
      >
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-white font-semibold text-sm mb-2">Sin Período Activo</h3>
          <p className="text-gray-400 text-xs mb-3">
            No hay un período deportivo configurado
          </p>
          {showActions && onChangePeriod && (
            <button
              onClick={onChangePeriod}
              className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors"
            >
              Configurar Período
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  const daysRemaining = getDaysRemaining();
  const progressPercentage = getProgressPercentage();
  const sportColors = getSportColor(activePeriod.sport);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-600/30 p-4 shadow-xl"
    >
      {/* Header Mobile */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 bg-gradient-to-br ${sportColors.gradient} rounded-lg flex items-center justify-center shadow-lg`}>
            {getSportIcon(activePeriod.sport)}
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Período Activo</h3>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-medium">En curso</span>
            </div>
          </div>
        </div>
        
        {showActions && (
          <div className="flex items-center space-x-1">
            <button
              onClick={refreshPeriods}
              className="p-1.5 hover:bg-gray-700/50 rounded-lg transition-colors group"
              title="Actualizar"
            >
              <RefreshCw className="w-3.5 h-3.5 text-gray-400 group-hover:text-white group-hover:rotate-180 transition-all duration-300" />
            </button>
            {onChangePeriod && (
              <button
                onClick={onChangePeriod}
                className="p-1.5 hover:bg-gray-700/50 rounded-lg transition-colors group"
                title="Cambiar período"
              >
                <Settings className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Content Mobile - Layout Vertical */}
      <div className="space-y-3">
        {/* Sport Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <Trophy className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-gray-400 text-xs font-medium">Deporte:</span>
          </div>
          <div className="text-right">
            <div className={`text-xs font-bold ${sportColors.text}`}>
              {activePeriod.sport}
            </div>
            <div className="text-white font-semibold text-xs">
              {activePeriod.name}
            </div>
          </div>
        </motion.div>

        {/* Duration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-gray-400 text-xs font-medium">Duración:</span>
          </div>
          <div className="text-right">
            <div className="text-white font-bold text-xs">
              {formatDateRange(new Date(activePeriod.startDate), new Date(activePeriod.endDate))}
            </div>
            <div className="text-gray-400 text-xs">
              Período completo
            </div>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-green-400" />
            <span className="text-gray-400 text-xs font-medium">Restante:</span>
          </div>
          <div className="text-right">
            <div className="text-white font-bold text-sm">
              {daysRemaining} días
            </div>
            <div className="text-gray-400 text-xs">
              por finalizar
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress Bar Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-4"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400 text-xs">Progreso del período</span>
          <span className="text-white text-xs font-semibold">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full bg-gray-600/30 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`h-full bg-gradient-to-r ${sportColors.gradient} rounded-full shadow-lg`}
          />
        </div>
      </motion.div>

      {/* Description Mobile */}
      {activePeriod.description && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3"
        >
          <p className="text-gray-400 text-xs leading-relaxed text-center">
            {activePeriod.description}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MobilePeriodInfo;