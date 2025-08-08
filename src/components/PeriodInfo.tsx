import { motion } from 'framer-motion';
import { Calendar, Clock, Trophy, Settings, RefreshCw } from 'lucide-react';
import { usePeriod } from '../hooks/usePeriod';
import { formatDateRange } from '../utils/periodUtils';

interface PeriodInfoProps {
  onChangePeriod?: () => void;
  showActions?: boolean;
}

const PeriodInfo: React.FC<PeriodInfoProps> = ({ 
  onChangePeriod, 
  showActions = true 
}) => {
  const { activePeriod, isLoading, refreshPeriods } = usePeriod();

  const getSportIcon = (sport: string) => {
    const icons: Record<string, string> = {
      'Fútbol': '⚽',
      'Baloncesto': '🏀',
      'Voleibol': '🏐',
      'Atletismo': '🏃‍♂️',
      'Natación': '🏊‍♂️',
      'Tenis': '🎾',
      'Béisbol': '⚾',
      'Ciclismo': '🚴‍♂️'
    };
    return icons[sport] || '🏆';
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
        className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-600/30 p-6 shadow-xl"
      >
        <div className="animate-pulse">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-8 bg-gray-700 rounded"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-8 bg-gray-700 rounded"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-8 bg-gray-700 rounded"></div>
            </div>
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
        className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-600/30 p-6 shadow-xl"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-white font-semibold mb-2">Sin Período Activo</h3>
          <p className="text-gray-400 text-sm mb-4">
            No hay un período deportivo configurado
          </p>
          {showActions && onChangePeriod && (
            <button
              onClick={onChangePeriod}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
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
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-600/30 p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-gradient-to-br ${sportColors.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
            <span className="text-xl">{getSportIcon(activePeriod.sport)}</span>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Período Activo</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-medium">En curso</span>
            </div>
          </div>
        </div>
        
        {showActions && (
          <div className="flex items-center space-x-1">
            <button
              onClick={refreshPeriods}
              className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors group"
              title="Actualizar"
            >
              <RefreshCw className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:rotate-180 transition-all duration-300" />
            </button>
            {onChangePeriod && (
              <button
                onClick={onChangePeriod}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors group"
                title="Cambiar período"
              >
                <Settings className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* Column 1: Sport Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <Trophy className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-gray-400 text-xs font-medium">Deporte</span>
          </div>
          <div className={`text-sm font-bold ${sportColors.text} mb-1`}>
            {activePeriod.sport}
          </div>
          <div className="text-white font-semibold text-sm leading-tight">
            {activePeriod.name}
          </div>
        </motion.div>

        {/* Column 2: Duration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center border-x border-gray-600/30"
        >
          <div className="flex items-center justify-center mb-2">
            <Calendar className="w-4 h-4 text-blue-400 mr-1" />
            <span className="text-gray-400 text-xs font-medium">Duración</span>
          </div>
          <div className="text-white font-bold text-sm mb-1">
            {formatDateRange(new Date(activePeriod.startDate), new Date(activePeriod.endDate))}
          </div>
          <div className="text-gray-400 text-xs">
            Período completo
          </div>
        </motion.div>

        {/* Column 3: Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <Clock className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-gray-400 text-xs font-medium">Progreso</span>
          </div>
          <div className="text-white font-bold text-lg mb-1">
            {daysRemaining}
          </div>
          <div className="text-gray-400 text-xs">
            días restantes
          </div>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
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

      {/* Description */}
      {activePeriod.description && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
          <p className="text-gray-400 text-xs leading-relaxed">
            {activePeriod.description}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PeriodInfo;