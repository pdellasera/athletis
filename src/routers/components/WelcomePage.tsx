import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTrophy, 
  FaChartLine, 
  FaUsers, 
  FaArrowRight,
  FaPlay,
} from 'react-icons/fa';
import { 
  MdSportsSoccer, 
  MdSportsBasketball, 
  MdSportsVolleyball,
  MdDirectionsRun 
} from 'react-icons/md';
import PageWrapper from '../../components/PageWrapper';
import pandeporteLogo from '../../assets/pandeporte_logo.png';

const WelcomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSportIndex, setCurrentSportIndex] = useState(0);

  const sports = [
    { icon: MdSportsSoccer, name: 'Fútbol', color: 'text-green-400' },
    { icon: MdSportsBasketball, name: 'Baloncesto', color: 'text-orange-400' },
    { icon: MdSportsVolleyball, name: 'Voleibol', color: 'text-blue-400' },
    { icon: MdDirectionsRun, name: 'Atletismo', color: 'text-purple-400' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSportIndex((prev) => (prev + 1) % sports.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sports.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <PageWrapper 
      loading={isLoading} 
      loadingMessage="Cargando componente de bienvenida..."
      loadingVariant="sport"
    >
      <div 
        className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2a2a2a 100%)' }}
      >
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 text-6xl opacity-10"
            animate={{
              y: [-15, 15, -15]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ 
              opacity: 0.1, 
              scale: 1
            }}
          >
            <FaTrophy className="text-yellow-400" />
          </motion.div>
          <motion.div
            className="absolute top-40 right-20 text-5xl opacity-10"
            animate={{
              y: [-15, 15, -15]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ 
              opacity: 0.1, 
              scale: 1
            }}
          >
            <FaUsers className="text-blue-400" />
          </motion.div>
          <motion.div
            className="absolute bottom-32 left-20 text-4xl opacity-10"
            animate={{
              y: [-15, 15, -15]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ 
              opacity: 0.1, 
              scale: 1
            }}
          >
            <FaChartLine className="text-green-400" />
          </motion.div>
        </div>

        <motion.div 
          className="text-center text-white max-w-6xl mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo/Título Principal */}
          <motion.div className="mb-8" variants={itemVariants}>
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-green-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Athletis
            </motion.h1>
            <motion.div 
              className="text-xl md:text-2xl text-gray-300 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Sistema Integral para la Formación Deportiva
            </motion.div>
            <motion.div 
              className="text-lg text-gray-400 font-medium flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              by 
              <motion.img 
                src={pandeporteLogo} 
                alt="Pandeporte Logo" 
                className="w-42 object-contain"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              />
            </motion.div>
          </motion.div>

          {/* Icono deportivo animado */}
          <motion.div 
            className="mb-8 flex justify-center"
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSportIndex}
                initial={{ 
                  opacity: 0, 
                  scale: 0.3, 
                  rotateY: 90
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotateY: 0
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.3, 
                  rotateY: -90
                }}
                transition={{ 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                className="text-6xl"
              >
                {sports[currentSportIndex] && (() => {
                  const IconComponent = sports[currentSportIndex].icon;
                  return (
                    <IconComponent 
                      className={`${sports[currentSportIndex].color} drop-shadow-lg`} 
                    />
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Descripción */}
          <motion.p 
            className="text-lg md:text-xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Plataforma completa para la gestión, seguimiento y desarrollo de programas deportivos. 
            Conecta atletas, entrenadores y organizaciones en un ecosistema deportivo integral.
          </motion.p>

          {/* Botones de acción */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            variants={itemVariants}
          >
            <motion.a 
              href="/auth/login" 
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg border border-blue-500/30 flex items-center gap-2 group"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <FaPlay className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
              Iniciar Sesión
            </motion.a>
            <motion.a 
              href="/auth/register" 
              className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 backdrop-blur-xl flex items-center gap-2 group"
              style={{ backdropFilter: 'blur(12px)' }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              Registrarse
              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </motion.div>

          {/* Características destacadas */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            variants={itemVariants}
          >
            {[
              {
                icon: FaTrophy,
                title: "Gestión de Competencias",
                description: "Organiza y administra eventos deportivos de manera eficiente con herramientas avanzadas",
                color: "text-yellow-400",
                hoverColor: "group-hover:text-yellow-300"
              },
              {
                icon: FaChartLine,
                title: "Análisis de Rendimiento",
                description: "Monitorea el progreso y desarrollo de cada atleta con métricas detalladas",
                color: "text-blue-400",
                hoverColor: "group-hover:text-blue-300"
              },
              {
                icon: FaUsers,
                title: "Comunidad Deportiva",
                description: "Conecta atletas, entrenadores y organizaciones en una red colaborativa",
                color: "text-purple-400",
                hoverColor: "group-hover:text-purple-300"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-8 border border-gray-600/50 hover:bg-gray-700/50 transition-all duration-500 group"
                style={{ backdropFilter: 'blur(12px)' }}
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="text-4xl mb-4 flex justify-center"
                  whileHover={{ 
                    rotate: index === 0 ? 360 : 0,
                    scale: 1.1
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className={`${feature.color} drop-shadow-lg`} />
                </motion.div>
                <h3 className={`text-xl font-semibold mb-3 ${feature.color} ${feature.hoverColor} transition-colors duration-300`}>
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default WelcomePage;