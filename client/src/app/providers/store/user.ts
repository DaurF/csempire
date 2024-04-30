import {defineStore} from "pinia";

export const useUserStore = defineStore('user', {
  state: () => ({user: {} as any, balance: 0}),
  actions: {
    setUser(user: any) {
      this.user = user;
      this.balance = user.balance;
    },
    changeBalance(change: number) {
      this.balance += change
    },
  },
  getters: {
    getBalance(state) {
      return state.balance;
    }
  }
})
