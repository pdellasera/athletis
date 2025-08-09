import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Activity, Target } from 'lucide-react';
import { useState } from 'react';
// Importar iconos de deportes de React Icons
import { 
  FaFutbol, 
  FaBasketballBall, 
  FaTableTennis,
  FaChess, 
  FaFistRaised 
} from 'react-icons/fa';

interface DeporteData {
  name: string;
  mejoraTecnica: number;
  participacion: number;
  rendimiento: number;
  icon: React.ReactNode;
}

const GraficaMejoras = () => {
  const [hoveredSport, setHoveredSport] = useState<string | null>(null);

  // Datos de los 5 deportes - SIN colores individuales
  const deportesData: DeporteData[] = [
    { name: 'Futsal', mejoraTecnica: 88, participacion: 95, rendimiento: 90, icon: <FaFutbol className="w-5 h-5 text-green-400" /> },
    { name: 'Baloncesto', mejoraTecnica: 84, participacion: 92, rendimiento: 88, icon: <FaBasketballBall className="w-5 h-5 text-orange-400" /> },
    { name: 'Bádminton', mejoraTecnica: 80, participacion: 88, rendimiento: 84, icon: <FaTableTennis className="w-5 h-5 text-blue-400" /> },
    { name: 'Ajedrez', mejoraTecnica: 95, participacion: 82, rendimiento: 98, icon: <FaChess className="w-5 h-5 text-purple-400" /> },
    { name: 'Boxeo', mejoraTecnica: 92, participacion: 98, rendimiento: 95, icon: <FaFistRaised className="w-5 h-5 text-red-400" /> }
  ];

  // Solo 3 colores para las 3 métricas
  const colors = {
    mejoraTecnica: '#10b981', // Verde
    participacion: '#f59e0b',  // Naranja
    rendimiento: '#3b82f6'     // Azul
  };

  const maxValue = 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="lg:col-span-2 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30">
            <BarChart3 className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-white text-2xl font-bold tracking-tight">Mejoras</h3>
            <p className="text-gray-400 text-sm">Análisis de rendimiento por disciplina</p>
          </div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4"
        >
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-green-400 text-sm font-medium">Mejora Promedio</p>
              <p className="text-white text-xl font-bold">87.8%</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-xl p-4"
        >
          <div className="flex items-center space-x-3">
            <Activity className="w-5 h-5 text-orange-400" />
            <div>
              <p className="text-orange-400 text-sm font-medium">Participación</p>
              <p className="text-white text-xl font-bold">91.0%</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2}}
          className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4"
        >
          <div className="flex items-center space-x-3">
            <Target className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-blue-400 text-sm font-medium">Rendimiento</p>
              <p className="text-white text-xl font-bold">91.0%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gráfico principal */}
      <div className="relative h-80 mb-6 bg-gradient-to-b from-gray-800/20 to-gray-900/30 rounded-xl border border-gray-700/30 p-6">
        {/* Grid de fondo */}
        <div className="absolute inset-6 grid grid-rows-5 gap-0">
          {[100, 80, 60, 40, 20, 0].map((value) => (
            <div key={value} className="relative border-b border-gray-600/20">
              <span className="absolute -left-12 top-0 text-xs text-gray-400 font-medium">
                {value}%
              </span>
            </div>
          ))}
        </div>

        {/* Contenedor de barras */}
        <div className="absolute inset-6 flex items-end justify-between px-8 pb-8">
          {deportesData.map((sport, index) => (
            <motion.div
              key={sport.name}
              className="relative group cursor-pointer"
              style={{ width: '16%' }}
              onMouseEnter={() => setHoveredSport(sport.name)}
              onMouseLeave={() => setHoveredSport(null)}
            >
              {/* Contenedor de los 3 cilindros */}
              <div className="flex justify-center items-end space-x-1 h-64">
                
                {/* Cilindro de Mejora Técnica - VERDE */}
                <div className="relative flex flex-col items-center w-10">
                  <div 
                    className="relative w-full rounded-md border-2 border-gray-400/40 overflow-hidden shadow-lg"
                    style={{ 
                      height: '240px',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                      backdropFilter: 'blur(5px)',
                      boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.3)'
                    }}
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(sport.mejoraTecnica / maxValue) * 100}%` }}
                      transition={{ 
                        delay: 0.2 + (index * 0.1),
                        duration: 1.5,
                        ease: "easeOut"
                      }}
                      className="absolute bottom-0 left-0 right-0 rounded-md"
                      style={{ 
                        background: `linear-gradient(180deg, ${colors.mejoraTecnica}60 0%, ${colors.mejoraTecnica}90 50%, ${colors.mejoraTecnica} 100%)`,
                        boxShadow: `inset 0 2px 6px ${colors.mejoraTecnica}80, 0 0 15px ${colors.mejoraTecnica}40`
                      }}
                    >
                      <div 
                        className="absolute top-0 left-0 right-0 h-1 rounded-md opacity-80"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${colors.mejoraTecnica}, transparent)`,
                          animation: 'wave 2s ease-in-out infinite'
                        }}
                      />
                    </motion.div>
                    
                    <div 
                      className="absolute top-0 left-0 w-1/3 h-full rounded-l-md"
                      style={{
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, transparent 100%)'
                      }}
                    />
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                    className="mt-1 text-xs font-bold text-center text-green-400"
                  >
                    {sport.mejoraTecnica}%
                  </motion.div>
                </div>

                {/* Cilindro de Participación - NARANJA */}
                <div className="relative flex flex-col items-center w-10">
                  <div 
                    className="relative w-full rounded-md border-2 border-gray-400/40 overflow-hidden shadow-lg"
                    style={{ 
                      height: '240px',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                      backdropFilter: 'blur(5px)',
                      boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.3)'
                    }}
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(sport.participacion / maxValue) * 100}%` }}
                      transition={{ 
                        delay: 0.2 + (index * 0.1),
                        duration: 1.5,
                        ease: "easeOut"
                      }}
                      className="absolute bottom-0 left-0 right-0 rounded-md"
                      style={{ 
                        background: `linear-gradient(180deg, ${colors.participacion}60 0%, ${colors.participacion}90 50%, ${colors.participacion} 100%)`,
                        boxShadow: `inset 0 2px 6px ${colors.participacion}80, 0 0 15px ${colors.participacion}40`
                      }}
                    >
                      <div 
                        className="absolute top-0 left-0 right-0 h-1 rounded-md opacity-80"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${colors.participacion}, transparent)`,
                          animation: 'wave 2s ease-in-out infinite 0.3s'
                        }}
                      />
                    </motion.div>
                    <div 
                      className="absolute top-0 left-0 w-1/3 h-full rounded-l-md"
                      style={{
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, transparent 100%)'
                      }}
                    />
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                    className="mt-1 text-xs font-bold text-center text-orange-400"
                  >
                    {sport.participacion}%
                  </motion.div>
                </div>

                {/* Cilindro de Rendimiento - AZUL */}
                <div className="relative flex flex-col items-center w-10">
                  <div 
                    className="relative w-full rounded-md border-2 border-gray-400/40 overflow-hidden shadow-lg"
                    style={{ 
                      height: '240px',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                      backdropFilter: 'blur(5px)',
                      boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.3)'
                    }}
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(sport.rendimiento / maxValue) * 100}%` }}
                      transition={{ 
                        delay: 0.2 + (index * 0.1),
                        duration: 1.5,
                        ease: "easeOut"
                      }}
                      className="absolute bottom-0 left-0 right-0 rounded-md"
                      style={{ 
                        background: `linear-gradient(180deg, ${colors.rendimiento}60 0%, ${colors.rendimiento}90 50%, ${colors.rendimiento} 100%)`,
                        boxShadow: `inset 0 2px 6px ${colors.rendimiento}80, 0 0 15px ${colors.rendimiento}40`
                      }}
                    >
                      <div 
                        className="absolute top-0 left-0 right-0 h-1 rounded-md opacity-80"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${colors.rendimiento}, transparent)`,
                          animation: 'wave 2s ease-in-out infinite 0.6s'
                        }}
                      />
                    </motion.div>
                    <div 
                      className="absolute top-0 left-0 w-1/3 h-full rounded-l-md"
                      style={{
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, transparent 100%)'
                      }}
                    />
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                    className="mt-1 text-xs font-bold text-center text-blue-400"
                  >
                    {sport.rendimiento}%
                  </motion.div>
                </div>
              </div>

              {/* Tooltip */}
              {hoveredSport === sport.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 z-50"
                >
                  <div className="bg-gray-900/95 backdrop-blur-xl text-white text-sm px-4 py-3 rounded-xl shadow-2xl border border-gray-600/50 min-w-max">
                    <div className="flex items-center space-x-2 mb-2">
                      {sport.icon}
                      <span className="font-bold text-white">{sport.name}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.mejoraTecnica }}></div>
                          <span className="text-gray-300 text-xs">Mejora Técnica</span>
                        </div>
                        <span className="font-semibold text-white text-xs">{sport.mejoraTecnica}%</span>
                      </div>
                      <div className="flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.participacion }}></div>
                          <span className="text-gray-300 text-xs">Participación</span>
                        </div>
                        <span className="font-semibold text-white text-xs">{sport.participacion}%</span>
                      </div>
                      <div className="flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.rendimiento }}></div>
                          <span className="text-gray-300 text-xs">Rendimiento</span>
                        </div>
                        <span className="font-semibold text-white text-xs">{sport.rendimiento}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Etiqueta del deporte */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center"
              >
                <div className="mb-1 flex justify-center">{sport.icon}</div>
                <div className="text-xs text-gray-400 font-medium whitespace-nowrap">{sport.name}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex justify-center space-x-8 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.mejoraTecnica }}></div>
          <span className="text-gray-300 text-sm">Mejora Técnica</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.participacion }}></div>
          <span className="text-gray-300 text-sm">Participación</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.rendimiento }}></div>
          <span className="text-gray-300 text-sm">Rendimiento</span>
        </div>
      </div>

      {/* Estadísticas finales */}
      <div className="grid grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Mejor Rendimiento</p>
              <p className="text-white text-lg font-bold">Ajedrez - 98%</p>
            </div>
            <FaChess className="w-6 h-6 text-purple-400" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-400 text-sm font-medium">Mayor Participación</p>
              <p className="text-white text-lg font-bold">Boxeo - 98%</p>
            </div>
            <FaFistRaised className="w-6 h-6 text-red-400" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GraficaMejoras;