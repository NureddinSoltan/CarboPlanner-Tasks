import { Item, FilterConfig, SortConfig, SortField, SortDirection } from '@/types';

/**
 * Filters items based on search text and type filter
 */
export function filterItems(items: Item[], filterConfig: FilterConfig): Item[] {
  return items.filter(item => {
    // Text search - case insensitive search in title and tags
    const searchText = filterConfig.searchText.toLowerCase();
    const matchesSearch = searchText === '' ||
      item.title.toLowerCase().includes(searchText) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchText));

    // Type filter
    const matchesType = filterConfig.typeFilter === 'all' || item.type === filterConfig.typeFilter;

    return matchesSearch && matchesType;
  });
}

/**
 * Sorts items based on the provided sort configuration
 */
export function sortItems(items: Item[], sortConfig: SortConfig): Item[] {
  return [...items].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortConfig.field) {
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'kcal':
        aValue = a.kcal;
        bValue = b.kcal;
        break;
      case 'type':
        aValue = a.type.toLowerCase();
        bValue = b.type.toLowerCase();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

/**
 * Gets the next sort direction for a field
 */
export function getNextSortDirection(currentField: SortField, currentDirection: SortDirection, newField: SortField): SortDirection {
  if (currentField === newField) {
    return currentDirection === 'asc' ? 'desc' : 'asc';
  }
  return 'asc';
}

/**
 * Formats kcal value for display
 */
export function formatKcal(kcal: number): string {
  return `${kcal} kcal`;
}

/**
 * Formats tags for display
 */
export function formatTags(tags: string[]): string {
  return tags.join(', ');
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
