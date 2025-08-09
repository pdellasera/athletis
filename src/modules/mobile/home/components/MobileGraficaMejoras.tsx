import { motion } from 'framer-motion';
import { TrendingUp, RefreshCw} from 'lucide-react';
import { 
    FaFutbol, 
    FaBasketballBall, 
    FaTableTennis, 
    FaChess, 
    FaFistRaised 
} from 'react-icons/fa';

interface MejoraData {
    name: string;
    tecnica: number;
    participacion: number;
    rendimiento: number;
    color: string;
    icon: React.ReactNode;
}

const MobileGraficaMejoras = () => {
    const mejorasData: MejoraData[] = [
        { 
            name: 'Futsal', 
            tecnica: 85, 
            participacion: 92, 
            rendimiento: 88, 
            color: '#22c55e', 
            icon: <FaFutbol className="w-4 h-4 text-green-500" /> 
        },
        { 
            name: 'Baloncesto', 
            tecnica: 78, 
            participacion: 85, 
            rendimiento: 82, 
            color: '#f97316', 
            icon: <FaBasketballBall className="w-4 h-4 text-orange-500" /> 
        },
        { 
            name: 'Bádminton', 
            tecnica: 72, 
            participacion: 68, 
            rendimiento: 75, 
            color: '#3b82f6', 
            icon: <FaTableTennis className="w-4 h-4 text-blue-500" /> 
        },
        { 
            name: 'Ajedrez', 
            tecnica: 90, 
            participacion: 65, 
            rendimiento: 88, 
            color: '#a855f7', 
            icon: <FaChess className="w-4 h-4 text-purple-500" /> 
        },
        { 
            name: 'Boxeo', 
            tecnica: 82, 
            participacion: 75, 
            rendimiento: 85, 
            color: '#ef4444', 
            icon: <FaFistRaised className="w-4 h-4 text-red-500" /> 
        }
    ];

    const mejorRendimiento = mejorasData.reduce((max, item) => 
        item.rendimiento > max.rendimiento ? item : max
    );
    
    const mayorParticipacion = mejorasData.reduce((max, item) => 
        item.participacion > max.participacion ? item : max
    );

    const colors = {
        tecnica: '#10b981',
        participacion: '#f97316', 
        rendimiento: '#3b82f6'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50 shadow-xl"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-bold">Análisis de Mejoras</h3>
                        <p className="text-gray-400 text-xs">Rendimiento por disciplina</p>
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
                >
                    <RefreshCw className="w-4 h-4" />
                </motion.button>
            </div>

            {/* Gráfico de barras horizontales con efecto de cilindro de vidrio con líquido */}
            <div className="mb-4">
                <div className="space-y-3">
                    {mejorasData.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + (index * 0.1) }}
                            className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="text-white text-sm font-medium">{item.name}</span>
                                </div>
                                <span className="text-gray-400 text-xs">
                                    Prom: {Math.round((item.tecnica + item.participacion + item.rendimiento) / 3)}%
                                </span>
                            </div>

                            {/* Barras horizontales con efecto de cilindro de vidrio con líquido - EXACTO COMO WEB */}
                            <div className="space-y-3">
                                {/* Técnica */}
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.tecnica }}></div>
                                    <span className="text-gray-300 text-xs w-20">Técnica</span>
                                    <div className="flex-1 relative h-6 rounded-md border-2 border-gray-400/40 overflow-hidden shadow-lg"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                                            backdropFilter: 'blur(5px)',
                                            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.3)'
                                        }}
                                    >
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.tecnica}%` }}
                                            transition={{ 
                                                delay: 0.2 + (index * 0.1), 
                                                duration: 1.5, 
                                                ease: "easeOut" 
                                            }}
                                            className="absolute left-0 top-0 bottom-0 rounded-md"
                                            style={{ 
                                                background: `linear-gradient(90deg, ${colors.tecnica}60 0%, ${colors.tecnica}90 50%, ${colors.tecnica} 100%)`,
                                                boxShadow: `inset 0 2px 6px ${colors.tecnica}80, 0 0 15px ${colors.tecnica}40`
                                            }}
                                        >
                                            <div 
                                                className="absolute right-0 top-0 bottom-0 w-1 rounded-md opacity-80"
                                                style={{
                                                    background: `linear-gradient(180deg, transparent, ${colors.tecnica}, transparent)`,
                                                    animation: 'wave 2s ease-in-out infinite'
                                                }}
                                            />
                                        </motion.div>
                                        
                                        <div 
                                            className="absolute top-0 left-0 bottom-0 w-1/3 rounded-l-md"
                                            style={{
                                                background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, transparent 100%)'
                                            }}
                                        />
                                    </div>
                                    <span className="text-green-400 text-xs font-medium w-10 text-right">{item.tecnica}%</span>
                                </div>

                                {/* Participación */}
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.participacion }}></div>
                                    <span className="text-gray-300 text-xs w-20">Participación</span>
                                    <div className="flex-1 relative h-6 rounded-md border-2 border-gray-400/40 overflow-hidden shadow-lg"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                                            backdropFilter: 'blur(5px)',
                                            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.3)'
                                        }}
                                    >
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.participacion}%` }}
                                            transition={{ 
                                                delay: 0.3 + (index * 0.1), 
                                                duration: 1.5, 
                                                ease: "easeOut" 
                                            }}
                                            className="absolute left-0 top-0 bottom-0 rounded-md"
                                            style={{ 
                                                background: `linear-gradient(90deg, ${colors.participacion}60 0%, ${colors.participacion}90 50%, ${colors.participacion} 100%)`,
                                                boxShadow: `inset 0 2px 6px ${colors.participacion}80, 0 0 15px ${colors.participacion}40`
                                            }}
                                        >
                                            <div 
                                                className="absolute right-0 top-0 bottom-0 w-1 rounded-md opacity-80"
                                                style={{
                                                    background: `linear-gradient(180deg, transparent, ${colors.participacion}, transparent)`,
                                                    animation: 'wave 2s ease-in-out infinite 0.3s'
                                                }}
                                            />
                                        </motion.div>
                                        <div 
                                            className="absolute top-0 left-0 bottom-0 w-1/3 rounded-l-md"
                                            style={{
                                                background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, transparent 100%)'
                                            }}
                                        />
                                    </div>
                                    <span className="text-orange-400 text-xs font-medium w-10 text-right">{item.participacion}%</span>
                                </div>

                                {/* Rendimiento */}
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.rendimiento }}></div>
                                    <span className="text-gray-300 text-xs w-20">Rendimiento</span>
                                    <div className="flex-1 relative h-6 rounded-md border-2 border-gray-400/40 overflow-hidden shadow-lg"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                                            backdropFilter: 'blur(5px)',
                                            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.3)'
                                        }}
                                    >
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.rendimiento}%` }}
                                            transition={{ 
                                                delay: 0.4 + (index * 0.1), 
                                                duration: 1.5, 
                                                ease: "easeOut" 
                                            }}
                                            className="absolute left-0 top-0 bottom-0 rounded-md"
                                            style={{ 
                                                background: `linear-gradient(90deg, ${colors.rendimiento}60 0%, ${colors.rendimiento}90 50%, ${colors.rendimiento} 100%)`,
                                                boxShadow: `inset 0 2px 6px ${colors.rendimiento}80, 0 0 15px ${colors.rendimiento}40`
                                            }}
                                        >
                                            <div 
                                                className="absolute right-0 top-0 bottom-0 w-1 rounded-md opacity-80"
                                                style={{
                                                    background: `linear-gradient(180deg, transparent, ${colors.rendimiento}, transparent)`,
                                                    animation: 'wave 2s ease-in-out infinite 0.6s'
                                                }}
                                            />
                                        </motion.div>
                                        <div 
                                            className="absolute top-0 left-0 bottom-0 w-1/3 rounded-l-md"
                                            style={{
                                                background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, transparent 100%)'
                                            }}
                                        />
                                    </div>
                                    <span className="text-blue-400 text-xs font-medium w-10 text-right">{item.rendimiento}%</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Leyenda compacta */}
            <div className="mb-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30">
                <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.tecnica }}></div>
                        <span className="text-gray-300">Mejora Técnica</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.participacion }}></div>
                        <span className="text-gray-300">Participación</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.rendimiento }}></div>
                        <span className="text-gray-300">Rendimiento</span>
                    </div>
                </div>
            </div>

            {/* Estadísticas destacadas */}
            <div className="grid grid-cols-2 gap-3">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-lg p-3 border border-green-500/30 bg-green-500/10"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-400 text-xs font-medium">Mejor Rendimiento</p>
                            <p className="text-white text-sm font-bold">{mejorRendimiento.rendimiento}%</p>
                        </div>
                        <div className="text-lg">
                            {mejorRendimiento.icon}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-lg p-3 border border-blue-500/30 bg-blue-500/10"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-400 text-xs font-medium">Mayor Participación</p>
                            <p className="text-white text-sm font-bold">{mayorParticipacion.participacion}%</p>
                        </div>
                        <div className="text-lg">
                            {mayorParticipacion.icon}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default MobileGraficaMejoras;