import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';

// Importar componentes de páginas adaptativos
import { 
  AdaptiveLoginPage, 
  AdaptiveDashboardPage, 
  AdaptiveWelcomePage,
  NotFoundPage 
} from './components';
import PageLoader from '../components/PageLoader';

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

// Configuración del router con componentes adaptativos
const router = createBrowserRouter([
  {
    path: '/',
    element: <SuspenseWrapper><AdaptiveWelcomePage /></SuspenseWrapper>,
  },
  {
    path: '/auth/login',
    element: <SuspenseWrapper><AdaptiveLoginPage /></SuspenseWrapper>,
  },
  {
    path: '/dashboard',
    element: (
      <SuspenseWrapper>
        <ProtectedRoute>
          <AdaptiveDashboardPage />
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