export type ItemType = 'meal' | 'training';

export interface Item {
  id: number;
  type: ItemType;
  title: string;
  kcal: number;
  tags: string[];
}

export interface ItemsData {
  items: Item[];
}

export type SortField = 'title' | 'kcal' | 'type';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface FilterConfig {
  searchText: string;
  typeFilter: ItemType | 'all';
}

export interface TableState {
  items: Item[];
  filteredItems: Item[];
  sortConfig: SortConfig;
  filterConfig: FilterConfig;
  selectedItem: Item | null;
}
