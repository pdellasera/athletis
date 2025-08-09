import { useState, useEffect } from 'react';
import HomePage from '../../modules/home';
import PageWrapper from '../../components/PageWrapper';
import PeriodSelector from '../../components/PeriodSelector';
import { hasValidActivePeriod } from '../../utils/periodUtils';
import type { Period } from '../../utils/periodUtils';

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Iniciando dashboard...');
  const [showPeriodSelector, setShowPeriodSelector] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // Verificar autenticación
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        const userRole = localStorage.getItem('userRole');
        
        if (!isAuthenticated) {
          window.location.href = '/auth/login';
          return;
        }

        // Si es entrenador, verificar período activo
        if (userRole === 'entrenador') {
          setLoadingMessage('Verificando período activo...');
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const hasValidPeriod = hasValidActivePeriod();
          
          if (!hasValidPeriod) {
            setIsLoading(false);
            setShowPeriodSelector(true);
            return;
          }
        }
        
        // Simular carga de datos del usuario
        setLoadingMessage('Cargando datos del usuario...');
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Simular carga de métricas
        setLoadingMessage('Obteniendo métricas deportivas...');
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Simular carga de gráficos
        setLoadingMessage('Preparando gráficos y estadísticas...');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Simular carga final
        setLoadingMessage('Finalizando carga...');
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading dashboard:', error);
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handlePeriodSelected = (period: Period) => {
    console.log('Período seleccionado en dashboard:', period);
    setShowPeriodSelector(false);
    
    // Recargar el dashboard con el nuevo período
    setIsLoading(true);
    setLoadingMessage('Cargando datos del período seleccionado...');
    
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <PageWrapper 
      loading={isLoading} 
      loadingMessage={loadingMessage}
      loadingVariant="sport"
    >
      <HomePage />
      
      {/* Modal de selección de período */}
      <PeriodSelector
        isOpen={showPeriodSelector}
        onClose={() => {
          // Si no hay período válido, redirigir al login
          if (!hasValidActivePeriod()) {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userRole');
            window.location.href = '/auth/login';
          } else {
            setShowPeriodSelector(false);
          }
        }}
        onPeriodSelected={handlePeriodSelected}
        userRole={localStorage.getItem('userRole') || 'entrenador'}
      />
    </PageWrapper>
  );
};

export default DashboardPage;