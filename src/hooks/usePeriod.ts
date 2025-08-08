import { useState, useEffect } from 'react';
import { 
  getActivePeriod, 
  setActivePeriod, 
  clearActivePeriod, 
  hasValidActivePeriod,
  getAvailablePeriods 
} from '../utils/periodUtils';
import type { 
  Period
} from '../utils/periodUtils';

export const usePeriod = () => {
  const [activePeriod, setActivePeriodState] = useState<Period | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [availablePeriods, setAvailablePeriods] = useState<Period[]>([]);

  useEffect(() => {
    loadActivePeriod();
    loadAvailablePeriods();
  }, []);

  const loadActivePeriod = () => {
    try {
      const period = getActivePeriod();
      setActivePeriodState(period);
    } catch (error) {
      console.error('Error loading active period:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAvailablePeriods = () => {
    try {
      const periods = getAvailablePeriods();
      setAvailablePeriods(periods);
    } catch (error) {
      console.error('Error loading available periods:', error);
    }
  };

  const updateActivePeriod = (period: Period) => {
    try {
      setActivePeriod(period);
      setActivePeriodState(period);
      return true;
    } catch (error) {
      console.error('Error updating active period:', error);
      return false;
    }
  };

  const removeActivePeriod = () => {
    try {
      clearActivePeriod();
      setActivePeriodState(null);
      return true;
    } catch (error) {
      console.error('Error removing active period:', error);
      return false;
    }
  };

  const isValidPeriod = () => {
    return hasValidActivePeriod();
  };

  return {
    activePeriod,
    availablePeriods,
    isLoading,
    updateActivePeriod,
    removeActivePeriod,
    isValidPeriod,
    refreshPeriods: loadAvailablePeriods
  };
};