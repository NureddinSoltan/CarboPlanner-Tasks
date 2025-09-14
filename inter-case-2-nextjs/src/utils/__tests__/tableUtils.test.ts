import { Item, FilterConfig, SortConfig } from '@/types';
import {
  filterItems,
  sortItems,
  getNextSortDirection,
  formatKcal,
  formatTags,
  capitalize
} from '../tableUtils';

const mockItems: Item[] = [
  {
    id: 1,
    type: 'meal',
    title: 'Chicken & Rice',
    kcal: 650,
    tags: ['high-protein', 'simple']
  },
  {
    id: 2,
    type: 'training',
    title: 'Intervals 6x400m',
    kcal: 450,
    tags: ['running', 'track']
  },
  {
    id: 3,
    type: 'meal',
    title: 'Oats & Berries',
    kcal: 420,
    tags: ['breakfast', 'fiber']
  },
  {
    id: 4,
    type: 'training',
    title: 'Tempo 30 min',
    kcal: 500,
    tags: ['running', 'tempo']
  }
];

describe('filterItems', () => {
  it('should return all items when no filters are applied', () => {
    const filterConfig: FilterConfig = { searchText: '', typeFilter: 'all' };
    const result = filterItems(mockItems, filterConfig);
    expect(result).toEqual(mockItems);
  });

  it('should filter by search text in title', () => {
    const filterConfig: FilterConfig = { searchText: 'chicken', typeFilter: 'all' };
    const result = filterItems(mockItems, filterConfig);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Chicken & Rice');
  });

  it('should filter by search text in tags', () => {
    const filterConfig: FilterConfig = { searchText: 'running', typeFilter: 'all' };
    const result = filterItems(mockItems, filterConfig);
    expect(result).toHaveLength(2);
    expect(result.every(item => item.tags.includes('running'))).toBe(true);
  });

  it('should filter by type', () => {
    const filterConfig: FilterConfig = { searchText: '', typeFilter: 'meal' };
    const result = filterItems(mockItems, filterConfig);
    expect(result).toHaveLength(2);
    expect(result.every(item => item.type === 'meal')).toBe(true);
  });

  it('should combine search text and type filters', () => {
    const filterConfig: FilterConfig = { searchText: 'oats', typeFilter: 'meal' };
    const result = filterItems(mockItems, filterConfig);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Oats & Berries');
  });

  it('should be case insensitive', () => {
    const filterConfig: FilterConfig = { searchText: 'CHICKEN', typeFilter: 'all' };
    const result = filterItems(mockItems, filterConfig);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Chicken & Rice');
  });
});

describe('sortItems', () => {
  it('should sort by title ascending', () => {
    const sortConfig: SortConfig = { field: 'title', direction: 'asc' };
    const result = sortItems(mockItems, sortConfig);
    expect(result[0].title).toBe('Chicken & Rice');
    expect(result[1].title).toBe('Intervals 6x400m');
    expect(result[2].title).toBe('Oats & Berries');
    expect(result[3].title).toBe('Tempo 30 min');
  });

  it('should sort by title descending', () => {
    const sortConfig: SortConfig = { field: 'title', direction: 'desc' };
    const result = sortItems(mockItems, sortConfig);
    expect(result[0].title).toBe('Tempo 30 min');
    expect(result[3].title).toBe('Chicken & Rice');
  });

  it('should sort by kcal ascending', () => {
    const sortConfig: SortConfig = { field: 'kcal', direction: 'asc' };
    const result = sortItems(mockItems, sortConfig);
    expect(result[0].kcal).toBe(420);
    expect(result[1].kcal).toBe(450);
    expect(result[2].kcal).toBe(500);
    expect(result[3].kcal).toBe(650);
  });

  it('should sort by kcal descending', () => {
    const sortConfig: SortConfig = { field: 'kcal', direction: 'desc' };
    const result = sortItems(mockItems, sortConfig);
    expect(result[0].kcal).toBe(650);
    expect(result[3].kcal).toBe(420);
  });

  it('should sort by type ascending', () => {
    const sortConfig: SortConfig = { field: 'type', direction: 'asc' };
    const result = sortItems(mockItems, sortConfig);
    expect(result[0].type).toBe('meal');
    expect(result[1].type).toBe('meal');
    expect(result[2].type).toBe('training');
    expect(result[3].type).toBe('training');
  });

  it('should not mutate original array', () => {
    const sortConfig: SortConfig = { field: 'title', direction: 'asc' };
    const original = [...mockItems];
    sortItems(mockItems, sortConfig);
    expect(mockItems).toEqual(original);
  });
});

describe('getNextSortDirection', () => {
  it('should toggle direction when field is the same', () => {
    expect(getNextSortDirection('title', 'asc', 'title')).toBe('desc');
    expect(getNextSortDirection('title', 'desc', 'title')).toBe('asc');
  });

  it('should return asc when field changes', () => {
    expect(getNextSortDirection('title', 'desc', 'kcal')).toBe('asc');
    expect(getNextSortDirection('kcal', 'desc', 'type')).toBe('asc');
  });
});

describe('formatKcal', () => {
  it('should format kcal with proper suffix', () => {
    expect(formatKcal(650)).toBe('650 kcal');
    expect(formatKcal(0)).toBe('0 kcal');
  });
});

describe('formatTags', () => {
  it('should join tags with comma and space', () => {
    expect(formatTags(['high-protein', 'simple'])).toBe('high-protein, simple');
    expect(formatTags(['running'])).toBe('running');
    expect(formatTags([])).toBe('');
  });
});

describe('capitalize', () => {
  it('should capitalize first letter', () => {
    expect(capitalize('meal')).toBe('Meal');
    expect(capitalize('training')).toBe('Training');
    expect(capitalize('')).toBe('');
  });
});
