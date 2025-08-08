import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, useState, useEffect } from 'react';

// Importaciones
import LoginForm from '../modules/auth/LoginForm';
import HomePage from '../modules/home';
import PageLoader from '../components/PageLoader';
import PageWrapper from '../components/PageWrapper';
import PeriodSelector from '../components/PeriodSelector';
import { hasValidActivePeriod } from '../utils/periodUtils';
import type { Period } from '../utils/periodUtils';
import pandeporteLogo from '../assets/pandeporte_logo.png';

// Componente de carga mejorado para Suspense
const SuspenseLoader = () => (
  <PageLoader 
    message="Cargando aplicación..."
    size="large"
    variant="default"
    showLogo={true}
  />
);

// Componente de carga suspense
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<SuspenseLoader />}>
    {children}
  </Suspense>
);

// Página de login CON verificación de período para entrenadores
const LoginPage = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [showPeriodSelector, setShowPeriodSelector] = useState(false);
  const [userRole, setUserRole] = useState<string>('');

  const handleLogin = async (email: string, password: string) => {
    console.log('Login attempt:', { email, password });
    
    // Simulación de autenticación
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (email && password) {
      // Determinar el rol del usuario basado en el email
      const role = email.includes('entrenador') ? 'entrenador' : 'admin';
      setUserRole(role);
      
      // Guardar datos de autenticación
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRole', role);
      
      // Si es entrenador, verificar período activo
      if (role === 'entrenador') {
        const hasValidPeriod = hasValidActivePeriod();
        
        if (!hasValidPeriod) {
          // Mostrar selector de período
          setShowPeriodSelector(true);
          return; // No redirigir aún
        }
      }
      
      // Activar loading de página para la transición
      setPageLoading(true);
      
      // Pequeño delay para mostrar "Redirigiendo..."
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 500);
    }
  };

  const handlePeriodSelected = (period: Period) => {
    console.log('Período seleccionado:', period);
    
    // Activar loading de página para la transición
    setPageLoading(true);
    setShowPeriodSelector(false);
    
    // Redirigir al dashboard
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 500);
  };

  return (
    <PageWrapper 
      loading={pageLoading} 
      loadingMessage="Redirigiendo al dashboard..."
      loadingVariant="default"
    >
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2a2a2a 100%)' }}
      >
        <div className="w-full max-w-lg relative">
          <LoginForm onSubmit={handleLogin} />
        </div>
        
        {/* Modal de selección de período */}
        <PeriodSelector
          isOpen={showPeriodSelector}
          onClose={() => setShowPeriodSelector(false)}
          onPeriodSelected={handlePeriodSelected}
          userRole={userRole}
        />
      </div>
    </PageWrapper>
  );
};

// Página de bienvenida con loading
const WelcomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageWrapper 
      loading={isLoading} 
      loadingMessage="Cargando página de bienvenida..."
      loadingVariant="sport"
    >
      <div 
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2a2a2a 100%)' }}
      >
        <div className="text-center text-white max-w-4xl mx-auto">
          {/* Logo/Título Principal */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-green-500 bg-clip-text text-transparent">
              Athletis
            </h1>
            <div className="text-xl md:text-2xl text-gray-300 mb-2">
              Sistema Integral para la Formación Deportiva
            </div>
            <div className="text-lg text-gray-400 font-medium flex items-center justify-center gap-2">
              by 
              <img 
                src={pandeporteLogo} 
                alt="Pandeporte Logo" 
                className="w-42 object-contain"
              />
              {/* <span className="text-blue-600">Pandeporte</span> */}
            </div>
          </div>

          {/* Descripción */}
          <p className="text-lg md:text-xl mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Plataforma completa para la gestión, seguimiento y desarrollo de programas deportivos. 
            Conecta atletas, entrenadores y organizaciones en un solo lugar.
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/auth/login" 
              className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg border border-blue-500/30"
            >
              Iniciar Sesión
            </a>
            <a 
              href="/auth/register" 
              className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 backdrop-blur-xl"
              style={{ backdropFilter: 'blur(12px)' }}
            >
              Registrarse
            </a>
          </div>

          {/* Características destacadas */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div 
              className="bg-gray-800/50 backdrop-blur-xl rounded-lg p-6 border border-gray-600/50 hover:bg-gray-700/50 transition-all duration-200 hover:scale-105"
              style={{ backdropFilter: 'blur(12px)' }}
            >
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="text-lg font-semibold mb-2 text-green-500">Gestión de Competencias</h3>
              <p className="text-gray-400 text-sm">Organiza y administra eventos deportivos de manera eficiente</p>
            </div>
            <div 
              className="bg-gray-800/50 backdrop-blur-xl rounded-lg p-6 border border-gray-600/50 hover:bg-gray-700/50 transition-all duration-200 hover:scale-105"
              style={{ backdropFilter: 'blur(12px)' }}
            >
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-semibold mb-2 text-blue-600">Seguimiento de Rendimiento</h3>
              <p className="text-gray-400 text-sm">Monitorea el progreso y desarrollo de cada atleta</p>
            </div>
            <div 
              className="bg-gray-800/50 backdrop-blur-xl rounded-lg p-6 border border-gray-600/50 hover:bg-gray-700/50 transition-all duration-200 hover:scale-105"
              style={{ backdropFilter: 'blur(12px)' }}
            >
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-lg font-semibold mb-2 text-purple-500">Comunidad Deportiva</h3>
              <p className="text-gray-400 text-sm">Conecta atletas, entrenadores y organizaciones</p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

// Página de Dashboard con loading funcional y verificación de período
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

// Componente de protección de rutas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    // Redirigir al login si no está autenticado
    window.location.href = '/auth/login';
    return null;
  }
  
  return <>{children}</>;
};

// Página 404 con loading
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
      loadingMessage="Verificando página..."
      loadingVariant="minimal"
    >
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2a2a2a 100%)' }}
      >
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">404</h1>
          <p className="text-xl mb-8 text-gray-300">Página no encontrada</p>
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

// Configuración del router
const router = createBrowserRouter([
  {
    path: '/',
    element: <SuspenseWrapper><WelcomePage /></SuspenseWrapper>,
  },
  {
    path: '/auth/login',
    element: <SuspenseWrapper><LoginPage /></SuspenseWrapper>,
  },
  {
    path: '/dashboard',
    element: (
      <SuspenseWrapper>
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      </SuspenseWrapper>
    ),
  },
  {
    path: '*',
    element: <SuspenseWrapper><NotFoundPage /></SuspenseWrapper>,
  },
]);

// Componente principal del router
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;