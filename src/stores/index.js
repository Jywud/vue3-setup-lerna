import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    count: 1
  }),
  getters: {
    count2: state => state.count * 2
  },
  actions: {
    increment() {
      this.count++;
    }
  }
});
