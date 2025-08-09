import { motion } from 'framer-motion';
import { Users, RefreshCw } from 'lucide-react';
import { 
    FaFutbol, 
    FaBasketballBall, 
    FaTableTennis, 
    FaChess 
} from 'react-icons/fa';

interface AsistenciaData {
    name: string;
    value: number;
    percentage: number;
    color: string;
    icon: React.ReactNode;
}

const MobileGraficaAsistencia = () => {
    const asistenciaData: AsistenciaData[] = [
        { name: 'Futsal', value: 87, percentage: 86, color: '#22c55e', icon: <FaFutbol className="w-4 h-4 text-green-500" /> },
        { name: 'Baloncesto', value: 73, percentage: 73, color: '#f97316', icon: <FaBasketballBall className="w-4 h-4 text-orange-500" /> },
        { name: 'Bádminton', value: 45, percentage: 45, color: '#3b82f6', icon: <FaTableTennis className="w-4 h-4 text-blue-500" /> },
        { name: 'Ajedrez', value: 32, percentage: 32, color: '#a855f7', icon: <FaChess className="w-4 h-4 text-purple-500" /> }
    ];

    const totalPercentage = asistenciaData.reduce((sum, item) => sum + item.percentage, 0);
    const dataWithRelativePercentages = asistenciaData.map(item => ({
        ...item,
        relativePercentage: (item.percentage / totalPercentage) * 100
    }));

    const promedioAsistencia = Number((asistenciaData.reduce((sum, item) => sum + item.percentage, 0) / asistenciaData.length).toFixed(1));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50 shadow-xl"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
                        <Users className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-bold">Estadísticas de Asistencia</h3>
                        <p className="text-gray-400 text-xs">Distribución por disciplina deportiva</p>
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

            {/* Donut Chart con efecto de cilindro de vidrio - MISMO ESTILO QUE WEB */}
            <div className="relative flex items-center justify-center mb-4">
                <svg className="w-48 h-48" viewBox="0 0 200 200">
                    {/* Definir gradientes y filtros para el efecto de vidrio - IDÉNTICOS A WEB */}
                    <defs>
                        {dataWithRelativePercentages.map((item) => (
                            <g key={`gradients-${item.name}`}>
                                {/* Gradiente radial para simular líquido 3D */}
                                <radialGradient id={`mobile-liquid-${item.name}`} cx="30%" cy="30%">
                                    <stop offset="0%" stopColor={item.color} stopOpacity="0.9" />
                                    <stop offset="50%" stopColor={item.color} stopOpacity="0.7" />
                                    <stop offset="100%" stopColor={item.color} stopOpacity="0.5" />
                                </radialGradient>

                                {/* Gradiente para efecto de vidrio */}
                                <linearGradient id={`mobile-glass-${item.name}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                                    <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                                    <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                                </linearGradient>
                            </g>
                        ))}

                        {/* Filtro para sombra interna */}
                        <filter id="mobileInnerShadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                            <feOffset dx="2" dy="2" result="offset" />
                            <feFlood floodColor="rgba(0,0,0,0.3)" />
                            <feComposite in2="offset" operator="in" />
                            <feComposite in2="SourceGraphic" operator="over" />
                        </filter>

                        {/* Filtro para brillo de vidrio */}
                        <filter id="mobileGlassShine" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
                            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.8 0" />
                        </filter>
                    </defs>

                    {/* Segmentos del donut con efecto de líquido - MISMO ESTILO QUE WEB */}
                    {dataWithRelativePercentages.map((item, index) => {
                        const centerX = 100;
                        const centerY = 100;
                        const radius = 80;
                        const strokeWidth = 30;
                        const circumference = 2 * Math.PI * radius;

                        // Calcular el offset acumulativo usando los porcentajes relativos
                        const cumulativePercentage = dataWithRelativePercentages
                            .slice(0, index)
                            .reduce((sum, prevItem) => sum + prevItem.relativePercentage, 0);

                        const strokeDasharray = `${(item.relativePercentage / 100) * circumference} ${circumference}`;
                        const strokeDashoffset = -((cumulativePercentage / 100) * circumference);

                        return (
                            <g key={item.name}>
                                {/* Segmento principal con efecto de líquido */}
                                <motion.circle
                                    cx={centerX}
                                    cy={centerY}
                                    r={radius}
                                    fill="transparent"
                                    stroke={`url(#mobile-liquid-${item.name})`}
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={strokeDasharray}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="butt"
                                    filter="url(#mobileInnerShadow)"
                                    initial={{ strokeDasharray: `0 ${circumference}` }}
                                    animate={{ strokeDasharray }}
                                    transition={{
                                        delay: 0.2 + (index * 0.3),
                                        duration: 1.2,
                                        ease: "easeOut"
                                    }}
                                    style={{
                                        transform: 'rotate(-90deg)',
                                        transformOrigin: `${centerX}px ${centerY}px`
                                    }}
                                />

                                {/* Capa de vidrio encima */}
                                <motion.circle
                                    cx={centerX}
                                    cy={centerY}
                                    r={radius}
                                    fill="transparent"
                                    stroke={`url(#mobile-glass-${item.name})`}
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={strokeDasharray}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="butt"
                                    filter="url(#mobileGlassShine)"
                                    initial={{ strokeDasharray: `0 ${circumference}` }}
                                    animate={{ strokeDasharray }}
                                    transition={{
                                        delay: 0.2 + (index * 0.3),
                                        duration: 1.2,
                                        ease: "easeOut"
                                    }}
                                    style={{
                                        transform: 'rotate(-90deg)',
                                        transformOrigin: `${centerX}px ${centerY}px`
                                    }}
                                />
                            </g>
                        );
                    })}

                    {/* Borde exterior del cilindro de vidrio - MISMO ESTILO QUE WEB */}
                    <circle
                        cx="100"
                        cy="100"
                        r="95"
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="2"
                        filter="url(#mobileGlassShine)"
                    />
                    <circle
                        cx="100"
                        cy="100"
                        r="65"
                        fill="none"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="4"
                    />

                    {/* Sombra del cilindro */}
                    <ellipse cx="100" cy="195" rx="85" ry="12" fill="rgba(0,0,0,0.2)" />

                    {/* Base del cilindro */}
                    <ellipse cx="100" cy="190" rx="80" ry="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                </svg>

                {/* Texto central */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-3xl font-bold text-white drop-shadow-lg"
                        >
                            {promedioAsistencia}%
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-300 text-xs font-medium mt-1"
                        >
                            Promedio General
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Leyenda - MISMO ESTILO QUE WEB */}
            <div className="space-y-3 mb-4">
                {asistenciaData.map((item, index) => (
                    <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (index * 0.1) }}
                        className="flex items-center justify-between hover:bg-gray-700/20 rounded-lg p-3 transition-all duration-200"
                    >
                        <div className="flex items-center space-x-3">
                            <div
                                className="w-4 h-4 rounded-full shadow-lg"
                                style={{
                                    backgroundColor: item.color,
                                    boxShadow: `0 0 10px ${item.color}40`
                                }}
                            ></div>
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-gray-300 text-sm font-medium">{item.name}</span>
                        </div>
                        <div className="text-right">
                            <span
                                className="font-bold text-sm block"
                                style={{ color: item.color }}
                            >
                                {item.percentage}%
                            </span>
                            <span className="text-gray-400 text-xs">
                                ({dataWithRelativePercentages.find(d => d.name === item.name)?.relativePercentage.toFixed(1)}% del gráfico)
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Estadísticas adicionales - MISMO ESTILO QUE WEB */}
            <div className="grid grid-cols-2 gap-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-xl p-4 border border-green-500/30 bg-green-500/10"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-400 text-sm font-medium">Mayor Asistencia</p>
                            <p className="text-white text-lg font-bold">
                                {Math.max(...asistenciaData.map(item => item.percentage))}%
                            </p>
                        </div>
                        <div className="text-2xl">
                            {asistenciaData.find(item => item.percentage === Math.max(...asistenciaData.map(i => i.percentage)))?.icon}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-xl p-4 border border-blue-500/30 bg-blue-500/10"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-400 text-sm font-medium">Menor Asistencia</p>
                            <p className="text-white text-lg font-bold">
                                {Math.min(...asistenciaData.map(item => item.percentage))}%
                            </p>
                        </div>
                        <div className="text-2xl">
                            {asistenciaData.find(item => item.percentage === Math.min(...asistenciaData.map(i => i.percentage)))?.icon}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default MobileGraficaAsistencia;