import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Users, 
  BarChart3, 
  Calendar,
  Trophy,
  Target,
  Zap,
  Star,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import useDeviceDetector from '../../hooks/useDeviceDetector';
import PageWrapper from '../../components/PageWrapper';
import PeriodSelector from '../../components/PeriodSelector';
import { hasValidActivePeriod } from '../../utils/periodUtils';
import type { Period } from '../../utils/periodUtils';
import pandeporteLogo from '../../assets/pandeporte_logo.png';

// Importaciones dinámicas para web y mobile
import WebLoginForm from '../../modules/web/auth/LoginForm';
import MobileLoginForm from '../../modules/mobile/auth/LoginForm';

const AdaptiveLoginPage = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [showPeriodSelector, setShowPeriodSelector] = useState(false);
  const [userRole, setUserRole] = useState<string>('');
  const [loginLoading, setLoginLoading] = useState(false);
  const deviceInfo = useDeviceDetector();

  const handleLogin = async (email: string, password: string) => {
    console.log('Login attempt:', { email, password });
    setLoginLoading(true);
    
    // Simulación de autenticación
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (email && password) {
      // Determinar el rol del usuario basado en el email
      const role = email.includes('entrenador') ? 'entrenador' : 'admin';
      setUserRole(role);
      
      // Guardar datos de autenticación
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRole', role);
      
      // Si es entrenador, verificar período activo
      if (role === 'entrenador') {
        const hasValidPeriod = hasValidActivePeriod();
        
        if (!hasValidPeriod) {
          setLoginLoading(false);
          // Mostrar selector de período
          setShowPeriodSelector(true);
          return; // No redirigir aún
        }
      }
      
      // Activar loading de página para la transición
      setLoginLoading(false);
      setPageLoading(true);
      
      // Pequeño delay para mostrar "Redirigiendo..."
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 500);
    } else {
      setLoginLoading(false);
    }
  };

  const handlePeriodSelected = (period: Period) => {
    console.log('Período seleccionado:', period);
    
    // Activar loading de página para la transición
    setPageLoading(true);
    setShowPeriodSelector(false);
    
    // Redirigir al dashboard
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 500);
  };

  // Renderizar versión mobile
  const renderMobileVersion = () => {
    return (
      <MobileLoginForm 
        onLogin={handleLogin} 
        isLoading={loginLoading}
      />
    );
  };

  // Renderizar versión web (contenido completo del LoginPage original)
  const renderWebVersion = () => {
    // Características del sistema
    const features = [
      {
        icon: Shield,
        title: "Seguro y Confiable",
        description: "Protección de datos avanzada"
      },
      {
        icon: BarChart3,
        title: "Análisis Detallado",
        description: "Estadísticas en tiempo real"
      },
      {
        icon: Users,
        title: "Gestión de Equipos",
        description: "Administra jugadores fácilmente"
      },
      {
        icon: Calendar,
        title: "Planificación",
        description: "Organiza entrenamientos y partidos"
      }
    ];

    // Elementos decorativos flotantes
    const floatingElements = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      icon: [Trophy, Target, Zap, Star, Sparkles, Shield][i],
      delay: i * 0.5,
      duration: 3 + (i * 0.3),
      x: Math.random() * 100,
      y: Math.random() * 100
    }));

    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Fondo con gradiente animado */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 30%, #2a2a2a 70%, #1a1a1a 100%)',
          }}
        />
        
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Círculos decorativos */}
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)'
            }}
          />
          
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)'
            }}
          />

          {/* Elementos flotantes */}
          {floatingElements.map((element) => {
            const IconComponent = element.icon;
            return (
              <motion.div
                key={element.id}
                initial={{ 
                  opacity: 0,
                  y: 100,
                  x: `${element.x}%`,
                  rotate: 0
                }}
                animate={{ 
                  opacity: [0, 0.3, 0],
                  y: [100, -100],
                  rotate: 360
                }}
                transition={{
                  duration: element.duration,
                  delay: element.delay,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute"
                style={{
                  left: `${element.x}%`,
                  top: `${element.y}%`
                }}
              >
                <IconComponent className="w-6 h-6 text-blue-400/30" />
              </motion.div>
            );
          })}
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 min-h-screen flex">
          {/* Panel izquierdo - Información */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 xl:p-16"
          >
            {/* Logo y título */}
            <div className="mb-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex items-center space-x-4 mb-6"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                  <Trophy className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-green-500 bg-clip-text text-transparent">Athletis</h1>
                  <div className="text-gray-400 flex items-center space-x-2">
                    <span>by</span>
                    <img 
                      src={pandeporteLogo} 
                      alt="Pandeporte Logo" 
                      className="w-36 object-contain"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-xl text-gray-300 leading-relaxed"
              >
                Gestiona tu equipo deportivo de manera profesional con herramientas 
                avanzadas de análisis, planificación y seguimiento.
              </motion.p>
            </div>

            {/* Características */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
                Características principales
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + (index * 0.1), duration: 0.5 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                        <IconComponent className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white group-hover:text-blue-300 transition-colors">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                          {feature.description}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Estadísticas */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="mt-12 grid grid-cols-3 gap-6"
            >
              {[
                { number: "500+", label: "Equipos" },
                { number: "10K+", label: "Jugadores" },
                { number: "99.9%", label: "Uptime" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Panel derecho - Formulario de login */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8"
          >
            <div className="w-full max-w-md">
              {/* Título móvil */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="lg:hidden text-center mb-8"
              >
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                    <Trophy className="w-6 h-6 text-blue-400" />
                  </div>
                  <h1 className="text-2xl font-bold text-white">Athletis</h1>
                </div>
                <p className="text-gray-400">Inicia sesión para continuar</p>
              </motion.div>

              <WebLoginForm onSubmit={handleLogin} />
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <PageWrapper 
      loading={pageLoading} 
      loadingMessage={
        deviceInfo.isMobile 
          ? "Redirigiendo a la app móvil..." 
          : "Redirigiendo al dashboard..."
      }
      loadingVariant="default"
    >
      {/* Renderizar según el dispositivo */}
      {deviceInfo.isMobile || deviceInfo.isTablet ? renderMobileVersion() : renderWebVersion()}
      
      {/* Modal de selección de período */}
      <AnimatePresence>
        {showPeriodSelector && (
          <PeriodSelector
            isOpen={showPeriodSelector}
            onClose={() => {
              setShowPeriodSelector(false);
              // Limpiar autenticación si se cancela
              localStorage.removeItem('isAuthenticated');
              localStorage.removeItem('userEmail');
              localStorage.removeItem('userRole');
            }}
            onPeriodSelected={handlePeriodSelected}
            userRole={userRole}
          />
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default AdaptiveLoginPage;