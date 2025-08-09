
import { useEffect } from 'react';

import HomePage from './index';
import { PageWrapper } from '../../../components';
import { usePageLoader } from '../../../hooks/usePageLoader';

const HomeWithLoader = () => {
  const { isLoading, loadingMessage, hideLoader, updateMessage } = usePageLoader({
    initialLoading: true,
    minLoadingTime: 2000,
    autoHide: false
  });

  useEffect(() => {
    // Simular carga de datos
    const loadData = async () => {
      try {
        // Simular diferentes etapas de carga
        updateMessage('Cargando datos del usuario...');
        await new Promise(resolve => setTimeout(resolve, 800));
        
        updateMessage('Obteniendo métricas deportivas...');
        await new Promise(resolve => setTimeout(resolve, 600));
        
        updateMessage('Preparando dashboard...');
        await new Promise(resolve => setTimeout(resolve, 400));
        
        hideLoader();
      } catch (error) {
        console.error('Error loading data:', error);
        hideLoader();
      }
    };

    if (isLoading) {
      loadData();
    }
  }, [isLoading, updateMessage, hideLoader]);

  return (
    <PageWrapper 
      loading={isLoading}
      loadingMessage={loadingMessage}
      loadingVariant="sport"
      showLogo={true}
    >
      <HomePage />
    </PageWrapper>
  );
};

export default HomeWithLoader;