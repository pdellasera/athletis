export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
  protected?: boolean;
  adminOnly?: boolean;
  title?: string;
  description?: string;
}

export interface NavigationItem {
  label: string;
  path: string;
  icon?: React.ComponentType<any>;
  children?: NavigationItem[];
  protected?: boolean;
  adminOnly?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
  active?: boolean;
}

export interface RouteParams {
  [key: string]: string | undefined;
}

export interface LocationState {
  from?: string;
  [key: string]: any;
}