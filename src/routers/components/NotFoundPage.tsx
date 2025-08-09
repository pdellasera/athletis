import { useState, useEffect } from 'react';
import PageWrapper from '../../components/PageWrapper';

const NotFoundPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageWrapper 
      loading={isLoading} 
      loadingMessage="Verificando componente..."
      loadingVariant="minimal"
    >
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2a2a2a 100%)' }}
      >
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">404</h1>
          <p className="text-xl mb-8 text-gray-300">Componente no encontrado</p>
          <a 
            href="/" 
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg border border-blue-500/30"
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    </PageWrapper>
  );
};

export default NotFoundPage;