import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES, generateRoute } from '../routeConfig';

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (path: string, options?: { replace?: boolean; state?: any }) => {
    navigate(path, options);
  };

  const goBack = () => {
    navigate(-1);
  };

  const goToSport = (sportId: string | number) => {
    const route = generateRoute(ROUTES.SPORTS.DETAIL, { id: sportId });
    navigate(route);
  };

  const goToEvent = (eventId: string | number) => {
    const route = generateRoute(ROUTES.EVENTS.DETAIL, { id: eventId });
    navigate(route);
  };

  const goToTeam = (teamId: string | number) => {
    const route = generateRoute(ROUTES.TEAMS.DETAIL, { id: teamId });
    navigate(route);
  };

  const goToLogin = (redirectTo?: string) => {
    navigate(ROUTES.AUTH.LOGIN, {
      state: { from: redirectTo || location.pathname }
    });
  };

  const goToDashboard = () => {
    navigate(ROUTES.DASHBOARD);
  };

  const goToProfile = () => {
    navigate(ROUTES.PROFILE);
  };

  return {
    // Navegación básica
    goTo,
    goBack,
    
    // Navegación específica
    goToSport,
    goToEvent,
    goToTeam,
    goToLogin,
    goToDashboard,
    goToProfile,
    
    // Estado actual
    currentPath: location.pathname,
    currentState: location.state,
    
    // Rutas constantes
    ROUTES,
  };
};