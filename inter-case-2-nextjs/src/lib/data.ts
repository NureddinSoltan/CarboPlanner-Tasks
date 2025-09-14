import { ItemsData } from '@/types';

export async function loadItemsData(): Promise<ItemsData> {
  try {
    const response = await fetch('/data/intern-case-2.json');
    if (!response.ok) {
      throw new Error(`Failed to load data: ${response.statusText}`);
    }
    const data: ItemsData = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading items data:', error);
    throw error;
  }
}
