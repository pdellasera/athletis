import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  path?: string;
  active?: boolean;
}

const Breadcrumbs = () => {
  const location = useLocation();
  
  // Generar breadcrumbs basado en la ruta actual
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Inicio', path: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Mapear segmentos a etiquetas legibles
      const labelMap: Record<string, string> = {
        'dashboard': 'Panel',
        'profile': 'Perfil',
        'sports': 'Deportes',
        'events': 'Eventos',
        'teams': 'Equipos',
        'auth': 'Autenticación',
        'login': 'Iniciar Sesión',
        'register': 'Registrarse',
        'admin': 'Administración',
        'users': 'Usuarios',
        'settings': 'Configuración',
      };

      const label = labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      
      breadcrumbs.push({
        label,
        path: isLast ? undefined : currentPath,
        active: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center space-x-2 text-sm text-gray-300 mb-6"
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index === 0 && <Home className="w-4 h-4" />}
          
          {breadcrumb.path ? (
            <Link
              to={breadcrumb.path}
              className="hover:text-white transition-colors duration-200"
            >
              {breadcrumb.label}
            </Link>
          ) : (
            <span className="text-white font-medium">
              {breadcrumb.label}
            </span>
          )}
          
          {index < breadcrumbs.length - 1 && (
            <ChevronRight className="w-4 h-4 text-gray-500" />
          )}
        </div>
      ))}
    </motion.nav>
  );
};

export default Breadcrumbs;