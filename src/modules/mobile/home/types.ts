export interface MobileSport {
  name: string;
  participants: number;
  progress: number;
  color: string;
  icon: React.ReactNode;
}

export interface MobileMetric {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

export interface MobileQuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

export interface MobileNavigationTab {
  id: string;
  label: string;
  icon: React.ReactNode;
}