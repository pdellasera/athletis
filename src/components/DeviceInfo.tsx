import { motion } from 'framer-motion';
import useDeviceDetector from '../hooks/useDeviceDetector';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

interface DeviceInfoProps {
  showDetails?: boolean;
  className?: string;
}

const DeviceInfo = ({ showDetails = false, className = '' }: DeviceInfoProps) => {
  const deviceInfo = useDeviceDetector();

  const getDeviceIcon = () => {
    if (deviceInfo.isMobile) return <Smartphone className="w-4 h-4" />;
    if (deviceInfo.isTablet) return <Tablet className="w-4 h-4" />;
    return <Monitor className="w-4 h-4" />;
  };

  const getDeviceType = () => {
    if (deviceInfo.isMobile) return 'Móvil';
    if (deviceInfo.isTablet) return 'Tablet';
    return 'Escritorio';
  };

  const getDeviceColor = () => {
    if (deviceInfo.isMobile) return 'text-green-400';
    if (deviceInfo.isTablet) return 'text-blue-400';
    return 'text-purple-400';
  };

  if (!showDetails) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-center space-x-2 ${className}`}
      >
        <div className={getDeviceColor()}>
          {getDeviceIcon()}
        </div>
        <span className={`text-sm font-medium ${getDeviceColor()}`}>
          {getDeviceType()}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white/10 backdrop-blur-xl rounded-lg p-4 border border-white/20 ${className}`}
    >
      <div className="flex items-center space-x-2 mb-3">
        <div className={getDeviceColor()}>
          {getDeviceIcon()}
        </div>
        <h3 className="text-white font-semibold">Información del Dispositivo</h3>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Tipo:</span>
          <span className={`font-medium ${getDeviceColor()}`}>
            {getDeviceType()}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Resolución:</span>
          <span className="text-white">
            {deviceInfo.screenWidth} × {deviceInfo.screenHeight}
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className={`text-center p-2 rounded ${deviceInfo.isMobile ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
            <div className="text-xs">Móvil</div>
            <div className="text-lg">{deviceInfo.isMobile ? '✓' : '✗'}</div>
          </div>
          
          <div className={`text-center p-2 rounded ${deviceInfo.isTablet ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'}`}>
            <div className="text-xs">Tablet</div>
            <div className="text-lg">{deviceInfo.isTablet ? '✓' : '✗'}</div>
          </div>
          
          <div className={`text-center p-2 rounded ${deviceInfo.isDesktop ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-500/20 text-gray-400'}`}>
            <div className="text-xs">Escritorio</div>
            <div className="text-lg">{deviceInfo.isDesktop ? '✓' : '✗'}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DeviceInfo;