import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Trophy, X, Check, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePeriod } from '../../../../hooks/usePeriod';
import { formatDateRange } from '../../../../utils/periodUtils';
import type { Period } from '../../../../utils/periodUtils';
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

interface MobilePeriodSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onPeriodSelected: (period: Period) => void;
  userRole: string;
}

const AVAILABLE_SPORTS = [
  'Fútbol',
  'Baloncesto', 
  'Voleibol',
  'Atletismo',
  'Natación',
  'Tenis',
  'Béisbol',
  'Ciclismo'
];

const MobilePeriodSelector: React.FC<MobilePeriodSelectorProps> = ({
  isOpen,
  onClose,
  onPeriodSelected
}) => {
  const { availablePeriods, updateActivePeriod } = usePeriod();
  const [selectedSport, setSelectedSport] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'sport' | 'period' | 'confirm'>('sport');

  // Reset selections when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedSport('');
      setSelectedPeriod(null);
      setStep('sport');
    }
  }, [isOpen]);

  const handleSportSelect = (sport: string) => {
    setSelectedSport(sport);
    setSelectedPeriod(null);
    setStep('period');
  };

  const handlePeriodSelect = (period: Period) => {
    setSelectedPeriod(period);
    setStep('confirm');
  };

  const handleConfirm = async () => {
    if (!selectedPeriod) return;
    
    setIsLoading(true);
    try {
      const success = updateActivePeriod(selectedPeriod);
      
      if (success) {
        onPeriodSelected(selectedPeriod);
        onClose();
      } else {
        console.error('Error al actualizar el período activo');
      }
    } catch (error) {
      console.error('Error al seleccionar período:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 'period') {
      setStep('sport');
      setSelectedSport('');
    } else if (step === 'confirm') {
      setStep('period');
      setSelectedPeriod(null);
    }
  };

  const getSportIcon = (sport: string, size: 'sm' | 'md' = 'md') => {
    const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    const icons: Record<string, React.ReactNode> = {
      'Fútbol': <FaFutbol className={`${sizeClass} text-green-400`} />,
      'Baloncesto': <FaBasketballBall className={`${sizeClass} text-orange-400`} />,
      'Voleibol': <GiVolleyballBall className={`${sizeClass} text-blue-400`} />,
      'Atletismo': <FaRunning className={`${sizeClass} text-red-400`} />,
      'Natación': <FaSwimmer className={`${sizeClass} text-cyan-400`} />,
      'Tenis': <FaTableTennis className={`${sizeClass} text-yellow-400`} />,
      'Béisbol': <FaBaseballBall className={`${sizeClass} text-purple-400`} />,
      'Ciclismo': <FaBiking className={`${sizeClass} text-pink-400`} />
    };
    return icons[sport] || <Trophy className={`${sizeClass} text-gray-400`} />;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-xl rounded-t-2xl border-t border-gray-600/50 shadow-2xl max-h-[85vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Mobile */}
          <div className="p-4 border-b border-gray-600/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {step !== 'sport' && (
                  <button
                    onClick={handleBack}
                    className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-400" />
                  </button>
                )}
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <span>
                      {step === 'sport' && 'Seleccionar Deporte'}
                      {step === 'period' && 'Seleccionar Período'}
                      {step === 'confirm' && 'Confirmar Selección'}
                    </span>
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {step === 'sport' && 'Elige tu deporte favorito'}
                    {step === 'period' && `Períodos disponibles para ${selectedSport}`}
                    {step === 'confirm' && 'Revisa tu selección'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Mobile */}
          <div className="p-4 overflow-y-auto max-h-[calc(85vh-120px)]">
            {/* Step 1: Seleccionar Deporte */}
            {step === 'sport' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-3"
              >
                {AVAILABLE_SPORTS.map((sport) => (
                  <motion.button
                    key={sport}
                    onClick={() => handleSportSelect(sport)}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-4 rounded-xl border border-gray-600/50 bg-gray-800/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50 transition-all duration-200 flex items-center space-x-3"
                  >
                    <div className="flex-shrink-0">{getSportIcon(sport)}</div>
                    <div className="text-left flex-1">
                      <div className="text-sm font-medium text-white">{sport}</div>
                      <div className="text-xs text-gray-400">
                        {availablePeriods.filter(p => p.sport === sport).length} períodos disponibles
                      </div>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Step 2: Seleccionar Período */}
            {step === 'period' && selectedSport && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-3"
              >
                {availablePeriods
                  .filter(period => period.sport === selectedSport)
                  .map((period) => (
                    <motion.button
                      key={period.id}
                      onClick={() => handlePeriodSelect(period)}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-4 rounded-xl border border-gray-600/50 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-700/50 transition-all duration-200 text-left"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-white font-semibold text-sm">
                          {period.name}
                        </div>
                        <div className="flex items-center space-x-1">
                          {getSportIcon(selectedSport, 'sm')}
                        </div>
                      </div>
                      <div className="text-gray-400 text-xs mb-1">
                        {formatDateRange(new Date(period.startDate), new Date(period.endDate))}
                      </div>
                      {period.description && (
                        <div className="text-gray-500 text-xs">
                          {period.description}
                        </div>
                      )}
                    </motion.button>
                  ))}
              </motion.div>
            )}

            {/* Step 3: Confirmar */}
            {step === 'confirm' && selectedPeriod && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-600/50">
                  <div className="flex items-center space-x-3 mb-3">
                    {getSportIcon(selectedSport)}
                    <div>
                      <div className="text-white font-semibold text-sm">{selectedSport}</div>
                      <div className="text-gray-400 text-xs">Deporte seleccionado</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs">Período:</span>
                      <span className="text-white text-xs font-medium">{selectedPeriod.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs">Duración:</span>
                      <span className="text-white text-xs">
                        {formatDateRange(new Date(selectedPeriod.startDate), new Date(selectedPeriod.endDate))}
                      </span>
                    </div>
                    {selectedPeriod.description && (
                      <div className="pt-2 border-t border-gray-600/30">
                        <span className="text-gray-400 text-xs">Descripción:</span>
                        <p className="text-gray-300 text-xs mt-1">{selectedPeriod.description}</p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Confirmar Selección</span>
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobilePeriodSelector;