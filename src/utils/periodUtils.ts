// Tipos para el sistema de períodos
export interface Period {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  sport: string;
  isActive: boolean;
  description?: string;
}

export interface PeriodStorage {
  activePeriod: Period | null;
  availablePeriods: Period[];
}

// Deportes disponibles
export const AVAILABLE_SPORTS = [
  'Fútbol',
  'Baloncesto', 
  'Voleibol',
  'Atletismo',
  'Natación',
  'Tenis',
  'Béisbol',
  'Ciclismo'
] as const;

export type SportType = typeof AVAILABLE_SPORTS[number];

// Utilidades para fechas
export const getCurrentMonth = (): { start: Date; end: Date } => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { start, end };
};

export const formatDateRange = (startDate: Date, endDate: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return `${startDate.toLocaleDateString('es-ES', options)} - ${endDate.toLocaleDateString('es-ES', options)}`;
};

// Generar período del mes actual
export const generateCurrentMonthPeriod = (sport: SportType): Period => {
  const { start, end } = getCurrentMonth();
  const monthName = start.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  
  return {
    id: `${sport.toLowerCase()}-${start.getFullYear()}-${start.getMonth() + 1}`,
    name: `${sport} - ${monthName}`,
    startDate: start,
    endDate: end,
    sport,
    isActive: true,
    description: `Período de entrenamiento de ${sport} para ${monthName}`
  };
};

// Funciones para localStorage
export const getActivePeriod = (): Period | null => {
  try {
    const stored = localStorage.getItem('activePeriod');
    if (!stored) return null;
    
    const period = JSON.parse(stored);
    // Convertir strings de fecha a objetos Date
    period.startDate = new Date(period.startDate);
    period.endDate = new Date(period.endDate);
    
    return period;
  } catch (error) {
    console.error('Error al obtener período activo:', error);
    return null;
  }
};

export const setActivePeriod = (period: Period): void => {
  try {
    localStorage.setItem('activePeriod', JSON.stringify(period));
  } catch (error) {
    console.error('Error al guardar período activo:', error);
  }
};

export const clearActivePeriod = (): void => {
  try {
    localStorage.removeItem('activePeriod');
  } catch (error) {
    console.error('Error al limpiar período activo:', error);
  }
};

// Validar si un período está vigente
export const isPeriodValid = (period: Period): boolean => {
  const now = new Date();
  return now >= period.startDate && now <= period.endDate;
};

// Obtener períodos disponibles (simulación - en producción vendría de API)
export const getAvailablePeriods = (sport?: SportType): Period[] => {
  const periods: Period[] = [];
  
  // Si se especifica un deporte, generar solo para ese deporte
  if (sport) {
    periods.push(generateCurrentMonthPeriod(sport));
  } else {
    // Generar períodos para todos los deportes
    AVAILABLE_SPORTS.forEach(sportType => {
      periods.push(generateCurrentMonthPeriod(sportType));
    });
  }
  
  return periods;
};

// Verificar si hay un período activo válido
export const hasValidActivePeriod = (): boolean => {
  const activePeriod = getActivePeriod();
  return activePeriod !== null && isPeriodValid(activePeriod);
};