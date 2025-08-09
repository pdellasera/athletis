import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Menu, 
  Bell, 
  User, 
  Home,
  BarChart3,
  Settings,
  BookOpen,
  Clock,
} from 'lucide-react';
// Importar iconos de deportes de React Icons
import { 
  FaFutbol, 
  FaBasketballBall, 
  FaTableTennis, 
  FaChess, 
  FaFistRaised 
} from 'react-icons/fa';
import MobileMetricsCard from './components/MobileMetricsCard';
import MobilePeriodInfo from './components/MobilePeriodInfo';
import MobilePeriodSelector from './components/MobilePeriodSelector';
import MobileGraficaMejoras from './components/MobileGraficaMejoras';
import MobileGraficaAsistencia from './components/MobileGraficaAsistencia';
import type { Period } from '../../../utils/periodUtils';

const MobileHomePage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showMenu, setShowMenu] = useState(false);
  const [showPeriodSelector, setShowPeriodSelector] = useState(false);

  const handlePeriodSelected = (period: Period) => {
    console.log('Período seleccionado:', period);
    setShowPeriodSelector(false);
  };

  // Navegación principal del bottom tab - SIMPLIFICADO
  const navigationTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'programs', label: 'Programas', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'schedule', label: 'Horarios', icon: <Clock className="w-5 h-5" /> },
    { id: 'profile', label: 'Perfil', icon: <User className="w-5 h-5" /> }
  ];

  return (
    <div 
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2a2a2a 100%)' }}
    >
      {/* Header Mobile - OPTIMIZADO PARA PANTALLAS PEQUEÑAS */}
      <div className="sticky top-0 z-50">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl"
          style={{ backdropFilter: 'blur(12px)' }}
        >
          {/* Primera fila - Navegación principal compacta */}
          <div className="flex items-center justify-between px-2 sm:px-4 py-2">
            {/* Left Section - Menu y Logo principal */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Menu Button */}
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 sm:p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>

              {/* Athletis Brand - Compacto */}
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs sm:text-sm font-bold">A</span>
                </div>
                <div className="hidden xs:flex flex-col">
                  <span className="text-white font-bold text-sm sm:text-base">Athletis</span>
                  <span className="text-gray-400 text-xs hidden sm:block">Dashboard Deportivo</span>
                </div>
                {/* Solo mostrar "A" en pantallas muy pequeñas */}
                <span className="text-white font-bold text-sm xs:hidden">Athletis</span>
              </div>
            </div>

            {/* Right Section - Acciones principales compactas */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Notifications */}
              <button className="p-1.5 sm:p-2 hover:bg-gray-700/50 rounded-lg sm:rounded-xl transition-all duration-300 relative group">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white transition-colors" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full animate-pulse shadow-lg"></span>
              </button>

              {/* User Profile - Adaptativo */}
              <div className="flex items-center space-x-1 sm:space-x-2 bg-gray-800/50 rounded-lg sm:rounded-xl p-1 sm:p-1.5 border border-gray-600/50 hover:bg-gray-700/50 transition-all group">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-blue-600 to-blue-500 rounded-md sm:rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-white text-xs font-medium">Atleta</span>
                  <span className="text-gray-400 text-xs">En línea</span>
                </div>
              </div>
            </div>
          </div>

          {/* Segunda fila - Información de la escuela adaptativa */}
          <div className="px-2 sm:px-4 pb-2 sm:pb-3">
            <div className="flex items-center justify-center bg-gray-800/30 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-600/30">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="relative flex-shrink-0">
                  <img
                    src="/src/assets/logo_escuela.png"
                    alt="Logo Escuela"
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain drop-shadow-lg"
                  />
                </div>
                <div className="flex flex-col items-center min-w-0">
                  <span className="text-white font-semibold text-xs sm:text-sm leading-tight text-center truncate max-w-full">
                    Escuela Padre Fernando Guardia Jaen
                  </span>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-gray-400 text-xs hidden sm:block">Sistema Deportivo Activo</span>
                    <span className="text-gray-400 text-xs sm:hidden">Activo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 pb-24">
        {/* Welcome Section - MISMO TEXTO QUE WEB */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-white text-xl font-semibold mb-1">
            ¡Bienvenido de vuelta! 👋
          </h2>
          <p className="text-gray-400 text-sm">
            Aquí tienes un resumen de tu progreso deportivo
          </p>
        </motion.div>

        {/* Period Information Section - VERSIÓN MÓVIL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-6"
        >
          <MobilePeriodInfo 
            onChangePeriod={() => setShowPeriodSelector(true)}
            showActions={true}
          />
        </motion.div>

        {/* Quick Stats - MÉTRICAS DE DEPORTES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <MobileMetricsCard
            title="Futsal"
            value="18"
            subtitle="Participantes activos"
            icon={<FaFutbol className="w-4 h-4 text-white" />}
            color="#22c55e"
            trend={15}
            progress={78}
          />
          <MobileMetricsCard
            title="Baloncesto"
            value="15"
            subtitle="Participantes activos"
            icon={<FaBasketballBall className="w-4 h-4 text-white" />}
            color="#f97316"
            trend={8}
            progress={65}
          />
          <MobileMetricsCard
            title="Bádminton"
            value="12"
            subtitle="Participantes activos"
            icon={<FaTableTennis className="w-4 h-4 text-white" />}
            color="#3b82f6"
            trend={12}
            progress={52}
          />
          <MobileMetricsCard
            title="Ajedrez"
            value="20"
            subtitle="Participantes activos"
            icon={<FaChess className="w-4 h-4 text-white" />}
            color="#a855f7"
            trend={25}
            progress={87}
          />
        </motion.div>

        {/* Métrica adicional de Boxeo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="grid grid-cols-1 gap-4 mb-6"
        >
          <MobileMetricsCard
            title="Boxeo"
            value="14"
            subtitle="Participantes activos"
            icon={<FaFistRaised className="w-4 h-4 text-white" />}
            color="#ef4444"
            trend={10}
            progress={61}
          />
        </motion.div>

        {/* Gráficas de Análisis - NUEVAS SECCIONES MÓVILES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-6"
        >
          <MobileGraficaMejoras />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="mb-6"
        >
          <MobileGraficaAsistencia />
        </motion.div>

      </div>

      {/* Bottom Navigation - NAVEGACIÓN PRINCIPAL CON TODOS LOS ELEMENTOS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="fixed bottom-0 left-0 right-0 bg-gray-800/50 backdrop-blur-xl border-t border-gray-600/50 px-2 py-2"
        style={{ backdropFilter: 'blur(12px)' }}
      >
        <div className="flex items-center justify-around">
          {navigationTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'text-blue-400 bg-blue-400/20 border border-blue-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
              }`}
            >
              {tab.icon}
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Side Menu Overlay - MISMA PALETA */}
      {showMenu && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={() => setShowMenu(false)}
        >
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-80 h-full bg-gray-800/95 backdrop-blur-xl border-r border-gray-600/50 p-6"
            style={{ backdropFilter: 'blur(12px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* User Profile Section - MISMO ESTILO QUE WEB */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Atleta</h3>
                <p className="text-gray-400 text-sm">estudiante@pandeporte.com</p>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-gray-400 text-xs">En línea</span>
                </div>
              </div>
            </div>

            {/* Navigation Menu - ELEMENTOS ADICIONALES */}
            <nav className="space-y-2">
              <button className="w-full flex items-center space-x-3 p-3 text-white bg-blue-600/20 border border-blue-500/30 rounded-lg transition-colors">
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors">
                <BarChart3 className="w-5 h-5" />
                <span>Estadísticas</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors">
                <User className="w-5 h-5" />
                <span>Perfil</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
                <span>Configuración</span>
              </button>
            </nav>
          </motion.div>
        </motion.div>
      )}

      {/* Period Selector Modal - VERSIÓN MÓVIL */}
      <MobilePeriodSelector
        isOpen={showPeriodSelector}
        onClose={() => setShowPeriodSelector(false)}
        onPeriodSelected={handlePeriodSelected}
        userRole={localStorage.getItem('userRole') || 'entrenador'}
      />
    </div>
  );
};

export default MobileHomePage;