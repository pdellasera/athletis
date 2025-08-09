import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  userAgent: string;
}

const useDeviceDetector = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    userAgent: navigator.userAgent,
  });

  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const userAgent = navigator.userAgent.toLowerCase();

      // Detectar dispositivos móviles por user agent
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      const tabletRegex = /ipad|android(?!.*mobile)|tablet/i;
      
      // Detectar por tamaño de pantalla
      const isMobileBySize = width <= 768;
      const isTabletBySize = width > 768 && width <= 1024;
      const isDesktopBySize = width > 1024;

      // Detectar por user agent
      const isMobileByUA = mobileRegex.test(userAgent) && !tabletRegex.test(userAgent);
      const isTabletByUA = tabletRegex.test(userAgent);

      // Combinar detección por tamaño y user agent
      const isMobile = isMobileBySize || isMobileByUA;
      const isTablet = (isTabletBySize || isTabletByUA) && !isMobile;
      const isDesktop = isDesktopBySize && !isMobile && !isTablet;

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        screenWidth: width,
        screenHeight: height,
        userAgent: navigator.userAgent,
      });
    };

    // Detectar al cargar
    detectDevice();

    // Detectar al cambiar el tamaño de la ventana
    const handleResize = () => {
      detectDevice();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceInfo;
};

export default useDeviceDetector;