import { motion } from 'framer-motion';
import { Clock, BookOpen, Award, TrendingUp, User, Bell, Search } from 'lucide-react';
import { useState } from 'react';
// Importar iconos de deportes de React Icons
import { 
  FaFutbol, 
  FaBasketballBall, 
  FaTableTennis, 
  FaChess, 
  FaFistRaised 
} from 'react-icons/fa';
import MetricsCard from './components/MetricsCard';
import PeriodInfo from '../../components/PeriodInfo';
import PeriodSelector from '../../components/PeriodSelector';
import type { Period } from '../../utils/periodUtils';
import GraficaMejoras from './components/GraficaMejoras';
import GraficaAsistencia from './components/GraficaAsistencia';

const HomePage = () => {
  const [showPeriodSelector, setShowPeriodSelector] = useState(false);

  const handlePeriodSelected = (period: Period) => {
    console.log('Período seleccionado:', period);
    setShowPeriodSelector(false);
    // Aquí podrías recargar los datos del dashboard basados en el nuevo período
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2a2a2a 100%)' }}>
      <div className="relative">
        {/* Top Navigation Bar */}
        <div className="sticky top-0 z-50">
          {/* Main Navigation Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-24 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 px-6 flex items-center justify-between shadow-2xl"
            style={{ backdropFilter: 'blur(12px)' }}
          >
            {/* Left Section - Logo/Brand */}
            <div className="flex items-center space-x-4">
              {/* Athletis Brand */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">A</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-base">Athletis</span>
                  <span className="text-gray-400 text-xs">Dashboard</span>
                </div>
              </div>

              {/* Separador */}
              <div className="w-px h-8 bg-gray-600"></div>

              {/* Logo de la Escuela Mejorado */}
              <div className="flex items-center space-x-3 bg-gray-800/50 rounded-xl px-4 py-2 border border-gray-600/50 hover:bg-gray-700/50 transition-all duration-300">
                <div className="relative">
                  <img
                    src="/src/assets/logo_escuela.png"
                    alt="Logo Escuela Padre Fernando Guardia Jaen"
                    className="w-10 h-10 object-contain drop-shadow-lg"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm leading-tight">
                    Escuela Padre Fernando Guardia Jaen
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-gray-400 text-xs font-medium">Sistema Deportivo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative group">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="bg-gray-800/50 border border-gray-600/50 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 text-sm w-72 transition-all duration-300 hover:bg-gray-700/50"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {/* Notifications */}
                <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-300 relative group">
                  <Bell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg"></span>
                </button>

                {/* Help */}
                <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-300 group">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-3 bg-gray-800/50 rounded-lg p-2 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer border border-gray-600/50 group">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-sm font-medium">Atleta</span>
                  <span className="text-gray-400 text-xs">En línea</span>
                </div>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Secondary Navigation Items */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/90 backdrop-blur-xl border-b border-gray-600/50 px-6 py-3 shadow-lg"
            style={{ backdropFilter: 'blur(12px)' }}
          >
            <nav className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 text-white bg-blue-600 rounded-lg text-sm font-medium hover:bg-blue-500 transition-all duration-300 shadow-lg border border-blue-500/30">
                <div className="w-4 h-4 bg-blue-400 rounded-sm shadow-sm"></div>
                <span>Dashboard</span>
              </button>

              <button className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg text-sm transition-all duration-300 group">
                <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Programas</span>
                <svg className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <button className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg text-sm transition-all duration-300 group">
                <TrendingUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Rendimiento</span>
                <svg className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <button className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg text-sm transition-all duration-300 group">
                <Award className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Logros</span>
                <svg className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <button className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg text-sm transition-all duration-300 group">
                <Clock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Horarios</span>
                <svg className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="max-w-[90%] mx-auto p-6">

          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-white text-2xl font-semibold mb-2">
              ¡Bienvenido de vuelta! 👋
            </h2>
            <p className="text-gray-400 text-sm">
              Aquí tienes un resumen de tu progreso deportivo
            </p>
          </motion.div>

          {/* Period Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8"
          >
            <div className="flex justify-center">
              {/* Period Info Card */}
              <div className="w-full">
                <PeriodInfo 
                  onChangePeriod={() => setShowPeriodSelector(true)}
                  showActions={true}
                />
              </div>
            </div>
          </motion.div>

          {/* Metrics Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
          >
            {/* Futsal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <MetricsCard
                title="Futsal"
                value="18"
                subtitle="Participantes activos"
                icon={<div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"><FaFutbol className="w-3 h-3 text-white" /></div>}
                trend={15}
                progress={78}
                color="#22c55e"
              />
            </motion.div>

            {/* Baloncesto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <MetricsCard
                title="Baloncesto"
                value="15"
                subtitle="Participantes activos"
                icon={<div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center"><FaBasketballBall className="w-3 h-3 text-white" /></div>}
                trend={8}
                progress={65}
                color="#f97316"
              />
            </motion.div>

            {/* Bádminton */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <MetricsCard
                title="Bádminton"
                value="12"
                subtitle="Participantes activos"
                icon={<div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"><FaTableTennis className="w-3 h-3 text-white" /></div>}
                trend={12}
                progress={52}
                color="#3b82f6"
              />
            </motion.div>

            {/* Ajedrez */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <MetricsCard
                title="Ajedrez"
                value="20"
                subtitle="Participantes activos"
                icon={<div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center"><FaChess className="w-3 h-3 text-white" /></div>}
                trend={25}
                progress={87}
                color="#a855f7"
              />
            </motion.div>

            {/* Boxeo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <MetricsCard
                title="Boxeo"
                value="14"
                subtitle="Participantes activos"
                icon={<div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"><FaFistRaised className="w-3 h-3 text-white" /></div>}
                trend={10}
                progress={61}
                color="#ef4444"
              />
            </motion.div>
          </motion.div>

          {/* Analytics Dashboard Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          >
            {/* Mejoras por Deporte Chart */}
            <GraficaMejoras />

            {/* Gráfica de Asistencia */}
            <GraficaAsistencia />
          </motion.div>
        </div>
      </div>

      {/* Period Selector Modal */}
      <PeriodSelector
        isOpen={showPeriodSelector}
        onClose={() => setShowPeriodSelector(false)}
        onPeriodSelected={handlePeriodSelected}
        userRole={localStorage.getItem('userRole') || 'entrenador'}
      />
    </div>
  );
};

export default HomePage;



