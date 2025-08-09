import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTrophy, 
  FaChartLine, 
  FaUsers, 
  FaArrowRight,
  FaPlay,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { 
  MdSportsSoccer, 
  MdSportsBasketball, 
  MdSportsVolleyball,
  MdDirectionsRun 
} from 'react-icons/md';
import pandeporteLogo from '../../../assets/pandeporte_logo.png';

const MobileWelcomePage = () => {
  const [currentSportIndex, setCurrentSportIndex] = useState(0);
  const [showFeatures, setShowFeatures] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  // MISMA PALETA DE COLORES QUE LA VERSIÓN WEB
  const sports = [
    { icon: MdSportsSoccer, name: 'Fútbol', color: 'text-green-400' },
    { icon: MdSportsBasketball, name: 'Baloncesto', color: 'text-orange-400' },
    { icon: MdSportsVolleyball, name: 'Voleibol', color: 'text-blue-400' },
    { icon: MdDirectionsRun, name: 'Atletismo', color: 'text-purple-400' }
  ];

  const features = [
    {
      icon: FaTrophy,
      title: "Gestión de Competencias",
      description: "Organiza y administra eventos deportivos de manera eficiente con herramientas avanzadas",
      color: "text-yellow-400"
    },
    {
      icon: FaChartLine,
      title: "Análisis de Rendimiento",
      description: "Monitorea el progreso y desarrollo de cada atleta con métricas detalladas",
      color: "text-blue-400"
    },
    {
      icon: FaUsers,
      title: "Comunidad Deportiva",
      description: "Conecta atletas, entrenadores y organizaciones en una red colaborativa",
      color: "text-purple-400"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSportIndex((prev) => (prev + 1) % sports.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sports.length]);

  // Auto-slide para las características
  useEffect(() => {
    if (!showFeatures) return;
    
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [showFeatures, features.length]);

  const nextFeature = () => {
    setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setCurrentFeatureIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToFeature = (index: number) => {
    setCurrentFeatureIndex(index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        type: "spring" as const,
        stiffness: 120,
        damping: 15
      }
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2a2a2a 100%)' }}
    >
      {/* Elementos decorativos de fondo - MISMOS COLORES QUE WEB */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-16 left-6 text-3xl opacity-10"
          animate={{
            y: [-10, 10, -10]
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
          className="absolute top-32 right-8 text-2xl opacity-10"
          animate={{
            y: [-10, 10, -10]
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
          className="absolute bottom-32 left-8 text-2xl opacity-10"
          animate={{
            y: [-10, 10, -10]
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

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header Section */}
        <motion.div 
          className="flex-1 flex flex-col justify-center text-center text-white py-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo y título principal - MISMOS COLORES QUE WEB */}
          <motion.div className="mb-8" variants={itemVariants}>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-green-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Athletis
            </motion.h1>
            <motion.div 
              className="text-lg md:text-xl text-gray-300 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Sistema Integral para la Formación Deportiva
            </motion.div>
            <motion.div 
              className="text-base text-gray-400 font-medium flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              by 
              <motion.img 
                src={pandeporteLogo} 
                alt="Pandeporte Logo" 
                className="w-32 object-contain"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              />
            </motion.div>
          </motion.div>

          {/* Icono deportivo animado - MISMOS COLORES QUE WEB */}
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
                className="text-5xl"
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
            className="text-base md:text-lg mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed px-4"
            variants={itemVariants}
          >
            Plataforma completa para la gestión, seguimiento y desarrollo de programas deportivos. 
            Conecta atletas, entrenadores y organizaciones en un ecosistema deportivo integral.
          </motion.p>

          {/* Botones de acción - MISMOS COLORES QUE WEB */}
          <motion.div 
            className="flex flex-col gap-4 mb-8"
            variants={itemVariants}
          >
            <motion.a 
              href="/auth/login" 
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg border border-blue-500/30 flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <FaPlay className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
              Iniciar Sesión
            </motion.a>
            <motion.a 
              href="/auth/register" 
              className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 backdrop-blur-xl flex items-center justify-center gap-2 group"
              style={{ backdropFilter: 'blur(12px)' }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              Registrarse
              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </motion.div>

          {/* Indicador para ver características */}
          <motion.button
            onClick={() => setShowFeatures(!showFeatures)}
            className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            <span>Ver características</span>
            <motion.div
              animate={{ rotate: showFeatures ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaChevronDown className="text-xs" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Slider de Características - MISMOS COLORES QUE WEB */}
        <AnimatePresence>
          {showFeatures && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-8">
                {/* Slider Container */}
                <div className="relative">
                  {/* Slide Content */}
                  <div className="relative h-64 overflow-hidden rounded-xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentFeatureIndex}
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        transition={{
                          duration: 0.5,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-600/50 p-6 flex flex-col items-center justify-center text-center"
                        style={{ backdropFilter: 'blur(12px)' }}
                      >
                        <motion.div 
                          className="text-4xl mb-4"
                          whileHover={{ 
                            rotate: currentFeatureIndex === 0 ? 360 : 0,
                            scale: 1.1
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          {(() => {
                            const IconComponent = features[currentFeatureIndex].icon;
                            return (
                              <IconComponent 
                                className={`${features[currentFeatureIndex].color} drop-shadow-lg`} 
                              />
                            );
                          })()}
                        </motion.div>
                        <h3 className={`text-xl font-semibold mb-3 ${features[currentFeatureIndex].color} transition-colors duration-300`}>
                          {features[currentFeatureIndex].title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed transition-colors duration-300">
                          {features[currentFeatureIndex].description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Navigation Arrows */}
                  <motion.button
                    onClick={prevFeature}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-600/50 rounded-full p-3 text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-xl z-10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ backdropFilter: 'blur(12px)' }}
                  >
                    <FaChevronLeft className="text-sm" />
                  </motion.button>
                  
                  <motion.button
                    onClick={nextFeature}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-600/50 rounded-full p-3 text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-xl z-10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ backdropFilter: 'blur(12px)' }}
                  >
                    <FaChevronRight className="text-sm" />
                  </motion.button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center mt-6 space-x-2">
                  {features.map((feature, index) => (
                    <motion.button
                      key={index}
                      onClick={() => goToFeature(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentFeatureIndex 
                          ? feature.color.replace('text-', 'bg-') + ' shadow-lg'
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-4 mx-auto w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${features[currentFeatureIndex].color.replace('text-', 'bg-')} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4, ease: "linear" }}
                    key={currentFeatureIndex}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobileWelcomePage;