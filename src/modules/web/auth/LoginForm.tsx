import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Info, User, Shield, Loader2 } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void> | void;
}

interface DemoCredential {
  role: string;
  email: string;
  password: string;
  icon: React.ReactNode;
  color: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Credenciales demo con nueva paleta de colores
  const demoCredentials: DemoCredential[] = [
    {
      role: 'Administrador',
      email: 'admin@athletis.com',
      password: 'admin123',
      icon: <Shield className="w-4 h-4" />,
      color: 'text-red-400'
    },
    {
      role: 'Entrenador',
      email: 'entrenador@athletis.com',
      password: 'coach123',
      icon: <User className="w-4 h-4" />,
      color: 'text-green-400'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await onSubmit(email, password);
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
    }
    // No reseteamos isLoading aquí porque la página se redirige
  };

  const selectDemoCredential = (credential: DemoCredential) => {
    setEmail(credential.email);
    setPassword(credential.password);
    setShowDemoCredentials(false);
  };

  return (
    <div className="relative w-full">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl p-8 border border-gray-600/30 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
          backdropFilter: 'blur(5px)',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.3)'
        }}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Iniciar Sesión</h2>
          <p className="text-gray-300">Accede a tu cuenta de Athletis</p>
        </div>

        {/* Demo Credentials Button */}
        <div className="relative">
          <motion.button
            type="button"
            onClick={() => setShowDemoCredentials(!showDemoCredentials)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-200 border border-blue-500/30 hover:border-blue-400/50 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.1) 100%)',
              backdropFilter: 'blur(5px)'
            }}
          >
            <Info className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Mostrar credenciales Demo</span>
          </motion.button>

          {/* Demo Credentials Tooltip */}
          <AnimatePresence>
            {showDemoCredentials && !isLoading && (
              <>
                {/* Overlay para cerrar al hacer click fuera */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                  onClick={() => setShowDemoCredentials(false)}
                />
                
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-3 p-6 z-50 shadow-2xl rounded-xl border-2 border-gray-500/50"
                  style={{
                    minWidth: '380px',
                    background: 'linear-gradient(135deg, rgba(31,41,55,0.95) 0%, rgba(17,24,39,0.95) 50%, rgba(0,0,0,0.95) 100%)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="text-center mb-5">
                    <h3 className="text-white font-bold text-lg mb-2 flex items-center justify-center space-x-2">
                      <span>🔑</span>
                      <span>Credenciales Demo</span>
                    </h3>
                    <p className="text-gray-300 text-sm">Selecciona un rol para autocompletar los campos</p>
                  </div>
                  
                  <div className="space-y-3">
                    {demoCredentials.map((credential, index) => (
                      <motion.button
                        key={index}
                        type="button"
                        onClick={() => selectDemoCredential(credential)}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-4 text-left transition-all duration-200 group shadow-lg rounded-xl border border-gray-500/40 hover:border-gray-400/60"
                        style={{
                          background: 'linear-gradient(135deg, rgba(55,65,81,0.8) 0%, rgba(31,41,55,0.8) 50%, rgba(17,24,39,0.8) 100%)',
                          backdropFilter: 'blur(10px)',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.3)'
                        }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="p-2 rounded-lg border border-gray-500/30"
                              style={{
                                background: 'linear-gradient(135deg, rgba(75,85,99,0.6) 0%, rgba(55,65,81,0.6) 100%)'
                              }}
                            >
                              <span className={`${credential.color} text-lg`}>
                                {credential.icon}
                              </span>
                            </div>
                            <span className="text-white font-semibold text-base">{credential.role}</span>
                          </div>
                          <div className="text-gray-400 group-hover:text-gray-200 transition-colors">
                            <span className="text-xs font-medium">Click para usar →</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-200 font-mono text-xs">{credential.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Lock className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-200 font-mono text-xs">{credential.password}</span>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                  
                  <div className="mt-5 pt-4 border-t border-gray-600/50 text-center">
                    <button
                      type="button"
                      onClick={() => setShowDemoCredentials(false)}
                      className="text-sm text-gray-400 hover:text-white transition-colors font-medium px-4 py-2 rounded-lg hover:bg-gray-700/50"
                    >
                      ✕ Cerrar
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Email Field */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="w-full pl-12 pr-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 border border-gray-600/30"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
              backdropFilter: 'blur(5px)'
            }}
            required
            disabled={isLoading}
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full pl-12 pr-12 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 border border-gray-600/30"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
              backdropFilter: 'blur(5px)'
            }}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={!isLoading ? { scale: 1.02 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg border border-blue-500/30 flex items-center justify-center space-x-2 ${
            isLoading ? 'cursor-not-allowed opacity-80' : 'hover:shadow-xl'
          }`}
          style={{
            background: isLoading 
              ? 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.15) 100%)'
              : 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(139,92,246,0.2) 100%)',
            backdropFilter: 'blur(5px)',
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.3)',
            color: 'white'
          }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Iniciando sesión...</span>
            </>
          ) : (
            <span>Iniciar Sesión</span>
          )}
        </motion.button>

        {/* Additional Links */}
        <div className="text-center space-y-2">
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
            ¿Olvidaste tu contraseña?
          </a>
          <div className="text-sm text-gray-400">
            ¿No tienes cuenta?{' '}
            <a href="/auth/register" className="text-blue-400 hover:text-blue-300 transition-colors">
              Regístrate aquí
            </a>
          </div>
        </div>
      </motion.form>
    </div>
  );
};

export default LoginForm;