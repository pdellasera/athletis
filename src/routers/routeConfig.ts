// Configuración centralizada de rutas
export const ROUTES = {
  // Rutas públicas
  HOME: '/',
  
  // Rutas de autenticación
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  
  // Rutas protegidas
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  
  // Rutas de deportes
  SPORTS: {
    LIST: '/sports',
    DETAIL: '/sports/:id',
    CREATE: '/sports/create',
    EDIT: '/sports/:id/edit',
  },
  
  // Rutas de eventos
  EVENTS: {
    LIST: '/events',
    DETAIL: '/events/:id',
    CREATE: '/events/create',
    EDIT: '/events/:id/edit',
    MY_EVENTS: '/events/my-events',
  },
  
  // Rutas de equipos
  TEAMS: {
    LIST: '/teams',
    DETAIL: '/teams/:id',
    CREATE: '/teams/create',
    EDIT: '/teams/:id/edit',
    MY_TEAMS: '/teams/my-teams',
  },
  
  // Rutas de administración
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    SPORTS: '/admin/sports',
    EVENTS: '/admin/events',
    TEAMS: '/admin/teams',
    SETTINGS: '/admin/settings',
  },
} as const;

// Función helper para generar rutas dinámicas
export const generateRoute = (route: string, params: Record<string, string | number>) => {
  let generatedRoute = route;
  Object.entries(params).forEach(([key, value]) => {
    generatedRoute = generatedRoute.replace(`:${key}`, String(value));
  });
  return generatedRoute;
};

// Función para verificar si una ruta es activa
export const isActiveRoute = (currentPath: string, routePath: string): boolean => {
  if (routePath === '/') {
    return currentPath === '/';
  }
  return currentPath.startsWith(routePath);
};