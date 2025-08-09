import { motion } from 'framer-motion';
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Smartphone } from 'lucide-react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  isLoading: boolean;
}

const LoginForm = ({ onLogin, isLoading }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);

  // Credenciales demo para mobile
  const demoCredentials = [
    { email: 'estudiante@pandeporte.com', password: 'estudiante123', role: 'Estudiante', icon: <User className="w-4 h-4" /> },
    { email: 'entrenador@pandeporte.com', password: 'entrenador123', role: 'Entrenador', icon: <User className="w-4 h-4" /> },
    { email: 'admin@pandeporte.com', password: 'admin123', role: 'Administrador', icon: <User className="w-4 h-4" /> }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    onLogin(demoEmail, demoPassword);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2a2a2a 100%)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-600/50 shadow-2xl"
        style={{ backdropFilter: 'blur(12px)' }}
      >
        {/* Header Mobile */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <Smartphone className="w-8 h-8 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-green-500 bg-clip-text text-transparent mb-2"
          >
            Athletis Mobile
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 text-sm"
          >
            Accede a tu cuenta deportiva
          </motion.p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-white text-sm font-medium mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/30 transition-all backdrop-blur-xl"
                style={{ backdropFilter: 'blur(12px)' }}
                placeholder="tu@email.com"
                required
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-white text-sm font-medium mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/30 transition-all backdrop-blur-xl"
                style={{ backdropFilter: 'blur(12px)' }}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>

          {/* Demo Credentials Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center"
          >
            <button
              type="button"
              onClick={() => setShowDemoCredentials(!showDemoCredentials)}
              className="text-blue-400 text-sm hover:text-blue-300 transition-colors underline"
            >
              Ver credenciales de prueba
            </button>
          </motion.div>

          {/* Demo Credentials */}
          {showDemoCredentials && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-600/50 backdrop-blur-xl"
              style={{ backdropFilter: 'blur(12px)' }}
            >
              <p className="text-white text-xs mb-3 text-center">Credenciales de prueba:</p>
              <div className="space-y-2">
                {demoCredentials.map((cred, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleDemoLogin(cred.email, cred.password)}
                    className="w-full bg-gray-700/50 hover:bg-gray-600/50 rounded-lg p-3 text-left transition-all border border-gray-600/50 hover:border-gray-500/50 backdrop-blur-xl"
                    style={{ backdropFilter: 'blur(12px)' }}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {cred.icon}
                      <span className="text-white text-sm font-medium">{cred.role}</span>
                    </div>
                    <p className="text-gray-300 text-xs">{cred.email}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Login Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed border border-blue-500/30"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Iniciando sesión...</span>
              </div>
            ) : (
              'Iniciar Sesión'
            )}
          </motion.button>
        </form>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 text-center space-y-2"
        >
          <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
            ¿Olvidaste tu contraseña?
          </button>
          <div className="text-gray-400 text-xs">
            ¿No tienes cuenta?{' '}
            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              Regístrate aquí
            </button>
          </div>
        </motion.div>

        {/* Pandeporte Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-8 text-center"
        >
          <div className="flex items-center justify-center space-x-2">
            <img
              src="/src/assets/pandeporte_logo.png"
              alt="Pandeporte"
              className="w-6 h-6 object-contain"
            />
            <span className="text-gray-400 text-xs">by Pandeporte</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginForm;