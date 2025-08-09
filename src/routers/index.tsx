import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';

// Importar componentes de páginas
import { LoginPage, WelcomePage, DashboardPage, NotFoundPage } from './components';
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