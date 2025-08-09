import { useState, useEffect } from 'react';
import useDeviceDetector from '../../hooks/useDeviceDetector';
import PageWrapper from '../../components/PageWrapper';

// Importaciones dinámicas para web y mobile
import WebWelcomePage from './WelcomePage';
import MobileWelcomePage from '../../modules/mobile/auth/WelcomePage';

const AdaptiveWelcomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const deviceInfo = useDeviceDetector();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Renderizar según el dispositivo
  const renderWelcomePage = () => {
    if (deviceInfo.isMobile || deviceInfo.isTablet) {
      return <MobileWelcomePage />;
    }
    return <WebWelcomePage />;
  };

  return (
    <PageWrapper 
      loading={isLoading} 
      loadingMessage={
        deviceInfo.isMobile 
          ? "Optimizando para móvil..." 
          : "Cargando página de bienvenida..."
      }
      loadingVariant="sport"
    >
      {renderWelcomePage()}
    </PageWrapper>
  );
};

export default AdaptiveWelcomePage;