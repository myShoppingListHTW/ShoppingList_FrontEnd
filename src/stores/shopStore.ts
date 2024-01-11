import { defineStore } from 'pinia';
import axios from 'axios';
import { API_BASE_URL } from '@/config/config';

interface shopState {
  items: any[]; // Der genaue Typ sollte deinen Anforderungen entsprechen
  allItems: any[]; // Der genaue Typ sollte deinen Anforderungen entsprechen
  selectedFilterCategory: string;
}

export const useShopStore = defineStore('shopStore', {
  state: (): shopState => ({
    items: [],
    allItems: [],
    selectedFilterCategory: '',
  }),
  actions: {
    applyFilter(): {      if (this.selectedFilterCategory) {
      this.items = this.allItems.filter((item) => item.category === this.selectedFilterCategory);
    } else {
      this.items = [...this.allItems];
    }
    this.sortItems();
  },
  sortItems(): void {
    this.items.sort((a, b) => a.price - b.price);
  },
  async fetchItems(): Promise<void> {
    const response = await axios.get(`${API_BASE_URL}/products`);
    this.items = response.data;
    this.allItems = [...this.items];
  },
  setSelectedFilterCategory(category: string): void {
    this.selectedFilterCategory = category;
  },
  },
});
// Path: src/components/Shop.vue
// Compare this snippet from src/components/Shop.vue:

