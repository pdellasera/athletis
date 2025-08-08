import { motion } from 'framer-motion';
import { Users, RefreshCw } from 'lucide-react';

interface AsistenciaData {
    name: string;
    value: number;
    percentage: number;
    color: string;
    icon: string;
}

const GraficaAsistencia = () => {
    // Datos de asistencia por deporte (valores de 0 a 100)
    const asistenciaData: AsistenciaData[] = [
        { name: 'Futsal', value: 87, percentage: 86, color: '#3b82f6', icon: '⚽' },
        { name: 'Baloncesto', value: 73, percentage: 73, color: '#06b6d4', icon: '🏀' },
        { name: 'Bádminton', value: 45, percentage: 45, color: '#f97316', icon: '🏸' },
        { name: 'Ajedrez', value: 32, percentage: 32, color: '#10b981', icon: '♟️' }
    ];

    // Calcular el total de porcentajes para obtener porcentajes relativos para el donut
    const totalPercentage = asistenciaData.reduce((sum, item) => sum + item.percentage, 0);

    // Calcular porcentajes relativos para el donut chart (que sumen 100%)
    const dataWithRelativePercentages = asistenciaData.map(item => ({
        ...item,
        relativePercentage: (item.percentage / totalPercentage) * 100
    }));

    const promedioAsistencia = Number((asistenciaData.reduce((sum, item) => sum + item.percentage, 0) / asistenciaData.length).toFixed(1));

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-2xl"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30">
                        <Users className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-white text-2xl font-bold tracking-tight">Estadísticas de Asistencia</h3>
                        <p className="text-gray-400 text-sm">Distribución por disciplina deportiva</p>
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white text-sm transition-all duration-200 hover:bg-gray-700/50 rounded-lg px-3 py-2"
                >
                    <span>Actualizar</span>
                    <RefreshCw className="w-4 h-4" />
                </motion.button>
            </div>

            {/* Donut Chart con efecto de cilindro de vidrio */}
            <div className="relative flex items-center justify-center mb-6">
                <svg className="w-60 h-60" viewBox="0 0 200 200">
                    {/* Definir gradientes y filtros para el efecto de vidrio */}
                    <defs>
                        {dataWithRelativePercentages.map((item) => (
                            <g key={`gradients-${item.name}`}>
                                {/* Gradiente radial para simular líquido 3D */}
                                <radialGradient id={`liquid-${item.name}`} cx="30%" cy="30%">
                                    <stop offset="0%" stopColor={item.color} stopOpacity="0.9" />
                                    <stop offset="50%" stopColor={item.color} stopOpacity="0.7" />
                                    <stop offset="100%" stopColor={item.color} stopOpacity="0.5" />
                                </radialGradient>

                                {/* Gradiente para efecto de vidrio */}
                                <linearGradient id={`glass-${item.name}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                                    <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                                    <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                                </linearGradient>
                            </g>
                        ))}

                        {/* Filtro para sombra interna */}
                        <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                            <feOffset dx="2" dy="2" result="offset" />
                            <feFlood floodColor="rgba(0,0,0,0.3)" />
                            <feComposite in2="offset" operator="in" />
                            <feComposite in2="SourceGraphic" operator="over" />
                        </filter>

                        {/* Filtro para brillo de vidrio */}
                        <filter id="glassShine" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
                            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.8 0" />
                        </filter>
                    </defs>



                    {/* Segmentos del donut con efecto de líquido */}
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
                                    stroke={`url(#liquid-${item.name})`}
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={strokeDasharray}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="butt"
                                    filter="url(#innerShadow)"
                                    initial={{ strokeDasharray: `0 ${circumference}` }}
                                    animate={{ strokeDasharray }}
                                    transition={{
                                        delay: 0.5 + (index * 0.3),
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
                                    stroke={`url(#glass-${item.name})`}
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={strokeDasharray}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="butt"
                                    filter="url(#glassShine)"
                                    initial={{ strokeDasharray: `0 ${circumference}` }}
                                    animate={{ strokeDasharray }}
                                    transition={{
                                        delay: 0.7 + (index * 0.3),
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

                    {/* Borde exterior del cilindro de vidrio */}
                    <circle
                        cx="100"
                        cy="100"
                        r="95"
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="2"
                        filter="url(#glassShine)"
                    />
                    <circle
                        cx="100"
                        cy="100"
                        r="75"
                        fill="none"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="4"
                    />

                    {/* Reflejo principal del vidrio */}
                    {/* <motion.ellipse
                        cx="100"
                        cy="100"
                        rx="85"
                        ry="85"
                        fill="rgba(255,255,255,0.3)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 2.5, duration: 1 }}
                        style={{ filter: 'blur(2px)' }}
                    /> */}

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
                            transition={{ delay: 1.5, duration: 0.8 }}
                            className="text-4xl font-bold text-white drop-shadow-lg"
                        >
                            {promedioAsistencia}%
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.7 }}
                            className="text-gray-300 text-sm font-medium mt-1"
                        >
                            Promedio General
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Leyenda */}
            <div className="space-y-3 mb-6">
                {asistenciaData.map((item, index) => (
                    <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.0 + (index * 0.1) }}
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
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-gray-300 text-sm font-medium">{item.name}</span>
                        </div>
                        <div className="text-right">
                            <span
                                className="font-bold text-lg block"
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

            {/* Estadísticas adicionales */}
            <div className="mt-6 pt-4 border-t border-gray-700/30">
                <div className="grid grid-cols-2 gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.8 }}
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
                        transition={{ delay: 3.0 }}
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
            </div>
        </motion.div>
    );
};

export default GraficaAsistencia;