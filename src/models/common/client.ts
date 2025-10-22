// Client-side common models

export interface SelectOption {
  value: string;
  label: string;
}

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
}

export interface StatCard {
  title: string;
  value: string | number;
  icon: string;
  color: 'primary' | 'success' | 'danger' | 'warning' | 'info';
}
