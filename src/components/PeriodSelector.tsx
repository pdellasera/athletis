import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Trophy, X, Check } from 'lucide-react';
import { 
  AVAILABLE_SPORTS, 
  getAvailablePeriods, 
  setActivePeriod, 
  formatDateRange 
} from '../utils/periodUtils';

import type { 
  Period, 
  SportType
} from '../utils/periodUtils';

interface PeriodSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onPeriodSelected: (period: Period) => void;
  userRole?: string;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ 
  isOpen, 
  onClose, 
  onPeriodSelected
}) => {
  const [selectedSport, setSelectedSport] = useState<SportType | null>(null);
  const [availablePeriods, setAvailablePeriods] = useState<Period[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Cargar períodos disponibles
      const periods = getAvailablePeriods();
      setAvailablePeriods(periods);
    }
  }, [isOpen]);

  const handleSportSelect = (sport: SportType) => {
    setSelectedSport(sport);
    const periodsForSport = getAvailablePeriods(sport);
    setAvailablePeriods(periodsForSport);
  };

  const handlePeriodSelect = (period: Period) => {
    setSelectedPeriod(period);
  };

  const handleConfirm = async () => {
    if (!selectedPeriod) return;
    
    setIsLoading(true);
    
    try {
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Guardar en localStorage
      setActivePeriod(selectedPeriod);
      
      // Notificar al componente padre
      onPeriodSelected(selectedPeriod);
      
      // Cerrar modal
      onClose();
    } catch (error) {
      console.error('Error al seleccionar período:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-600/50 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-600/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Calendar className="w-6 h-6 text-blue-400" />
                  <span>Seleccionar Período Activo</span>
                </h2>
                <p className="text-gray-400 mt-1">
                  Elige el período y deporte para tu sesión de entrenamiento
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Step 1: Seleccionar Deporte */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>1. Selecciona tu Deporte</span>
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {AVAILABLE_SPORTS.map((sport) => (
                  <motion.button
                    key={sport}
                    onClick={() => handleSportSelect(sport)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl border transition-all duration-200 ${
                      selectedSport === sport
                        ? 'border-blue-500 bg-blue-500/20 text-white'
                        : 'border-gray-600/50 bg-gray-800/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{getSportIcon(sport)}</div>
                    <div className="text-sm font-medium">{sport}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Step 2: Seleccionar Período */}
            {selectedSport && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span>2. Selecciona el Período</span>
                </h3>
                
                <div className="space-y-3">
                  {availablePeriods
                    .filter(period => period.sport === selectedSport)
                    .map((period) => (
                      <motion.button
                        key={period.id}
                        onClick={() => handlePeriodSelect(period)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
                          selectedPeriod?.id === period.id
                            ? 'border-green-500 bg-green-500/20'
                            : 'border-gray-600/50 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-700/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white font-semibold mb-1">
                              {period.name}
                            </div>
                            <div className="text-gray-400 text-sm">
                              {formatDateRange(period.startDate, period.endDate)}
                            </div>
                            {period.description && (
                              <div className="text-gray-500 text-xs mt-1">
                                {period.description}
                              </div>
                            )}
                          </div>
                          {selectedPeriod?.id === period.id && (
                            <Check className="w-5 h-5 text-green-400" />
                          )}
                        </div>
                      </motion.button>
                    ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-600/50 bg-gray-800/50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                {selectedPeriod ? (
                  <span className="text-green-400">
                    ✓ Período seleccionado: {selectedPeriod.name}
                  </span>
                ) : (
                  'Selecciona un deporte y período para continuar'
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <motion.button
                  onClick={handleConfirm}
                  disabled={!selectedPeriod || isLoading}
                  whileHover={selectedPeriod && !isLoading ? { scale: 1.02 } : {}}
                  whileTap={selectedPeriod && !isLoading ? { scale: 0.98 } : {}}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                    selectedPeriod && !isLoading
                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <span>Confirmar Selección</span>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PeriodSelector;