import { motion } from 'framer-motion';
import { Activity, Zap } from 'lucide-react';

interface PageLoaderProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'sport' | 'minimal';
  showLogo?: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ 
  message = "Cargando...", 
  size = 'medium',
  variant = 'default',
  showLogo = true 
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const containerSizes = {
    small: 'min-h-[200px]',
    medium: 'min-h-[400px]',
    large: 'min-h-screen'
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  // Variante deportiva con iconos animados
  const SportLoader = () => (
    <div className="flex items-center space-x-3">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="relative"
      >
        <Activity className={`${sizeClasses[size]} text-blue-500`} />
      </motion.div>
      
      <motion.div
        animate={{ 
          x: [0, 10, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <Zap className={`${sizeClasses[size]} text-yellow-500`} />
      </motion.div>
    </div>
  );

  // Variante minimalista
  const MinimalLoader = () => (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`border-2 border-gray-600/30 border-t-blue-500 rounded-full ${sizeClasses[size]}`}
    />
  );

  // Variante por defecto con efectos avanzados
  const DefaultLoader = () => (
    <div className="relative">
      {/* Círculo exterior */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className={`border-2 border-gray-600/20 border-t-blue-500 border-r-purple-500 rounded-full ${sizeClasses[size]}`}
      />
      
      {/* Círculo interior */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className={`absolute inset-2 border-2 border-gray-600/10 border-b-cyan-400 border-l-green-400 rounded-full`}
      />
      
      {/* Punto central */}
      <motion.div
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 m-auto w-2 h-2 bg-white rounded-full"
      />
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case 'sport':
        return <SportLoader />;
      case 'minimal':
        return <MinimalLoader />;
      default:
        return <DefaultLoader />;
    }
  };

  return (
    <div 
      className={`${containerSizes[size]} flex flex-col items-center justify-center px-4`}
      style={{ 
        background: size === 'large' 
          ? 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2a2a2a 100%)' 
          : 'transparent'
      }}
    >
      {/* Partículas de fondo para pantalla completa */}
      {size === 'large' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-500/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 text-center">
        {/* Logo de la escuela */}
        {showLogo && size === 'large' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl border border-gray-600/30 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-white font-bold text-lg">Athletis</h3>
            <p className="text-gray-400 text-sm">Sistema Deportivo</p>
          </motion.div>
        )}

        {/* Loader principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-6"
        >
          {renderLoader()}
        </motion.div>

        {/* Mensaje de carga */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="text-center"
        >
          <p className={`text-white font-medium ${textSizes[size]} mb-2`}>
            {message}
          </p>
          
          {/* Puntos animados */}
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="w-1.5 h-1.5 bg-blue-500 rounded-full"
              />
            ))}
          </div>
        </motion.div>

        {/* Barra de progreso simulada para carga larga */}
        {size === 'large' && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 w-64 max-w-full mx-auto"
          >
            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PageLoader;