import { useState, useEffect } from 'react';

interface UsePageLoaderOptions {
  initialLoading?: boolean;
  minLoadingTime?: number; // Tiempo mínimo de loading en ms
  autoHide?: boolean;
}

export const usePageLoader = (options: UsePageLoaderOptions = {}) => {
  const {
    initialLoading = true,
    minLoadingTime = 1000,
    autoHide = true
  } = options;

  const [isLoading, setIsLoading] = useState(initialLoading);
  const [loadingMessage, setLoadingMessage] = useState('Cargando...');

  useEffect(() => {
    if (initialLoading && autoHide) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, minLoadingTime);

      return () => clearTimeout(timer);
    }
  }, [initialLoading, autoHide, minLoadingTime]);

  const showLoader = (message?: string) => {
    if (message) setLoadingMessage(message);
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  const updateMessage = (message: string) => {
    setLoadingMessage(message);
  };

  return {
    isLoading,
    loadingMessage,
    showLoader,
    hideLoader,
    updateMessage
  };
};