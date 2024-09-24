// stores/bithday.js
import { defineStore } from 'pinia';

export const birthdateStorage = defineStore('birthdateStorage', {
  state: () => ({
    today: [],
    tomorrow: [],
    thisWeek: [],
    thisMonth:[],
    expiredAt : new Date
  }),
  actions: {
    setBirthday(today, tomorrow, thisWeek, thisMonth, expiredAt) {
        this.today = today;
        this.tomorrow = tomorrow;
        this.thisWeek = thisWeek;
        this.thisMonth =thisMonth;
        this.expiredAt = expiredAt;
    },
    clearBirthday() {
        this.today = [];
        this.tomorrow = [];
        this.thisWeek = [];
        this.thisMonth =[];
        this.expiredAt = null;
    },
  },
  getters: {
    getData: (state) => state.thisMonth,
  },
});
