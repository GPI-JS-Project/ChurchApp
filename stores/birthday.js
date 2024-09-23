// stores/bithday.js
import { defineStore } from 'pinia';

export const birthdateStorage = defineStore('birthdateStorage', {
  state: () => ({
    today: [],
    tomorrow: [],
    thisWeek: [],
    thisMonth:[]
  }),
  actions: {
    setBirthday(today, tomorrow, thisWeek, thisMonth) {
        this.today = today;
        this.tomorrow = tomorrow;
        this.thisWeek = thisWeek;
        this.thisMonth =thisMonth;
    },
    clearBirthday() {
        this.today = [];
        this.tomorrow = [];
        this.thisWeek = [];
        this.thisMonth =[];
    },
  },
  getters: {
    getData: (state) => state.thisMonth,
  },
});
