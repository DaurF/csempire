import {defineStore} from "pinia";

export interface IRolling {
  side: string,
  secondsLeft: number
}

type Rolling = boolean | IRolling

export const useRouletteStore = defineStore('roulette', {
  state: () => ({rolls: {} as any, rolling: false as Rolling, rolltime: 14.5}),
  actions: {
    setRolls(rollList: any[]) {
      console.log('rollList: ', rollList)
      for (const roll of rollList) {
        this.rolls[roll.id] = {
          side: roll.side,
          num: roll.num
        }
      }
    },
    setRoll(id: number, num: number, side: string) {
      this.rolls[id] = {side, num}
    },
    setRolling(rolling: Rolling) {
      this.rolling = rolling;
    },
    setRolltime(seconds: number) {
      this.rolltime = seconds;
    }
  },
  getters: {
    getRolls(state) {
      const rollsLen = Object.keys(state.rolls).length

      return Object.keys(state.rolls).map(id => Number(id)).sort((a, b) => a - b).slice(rollsLen - 100, rollsLen + 1).map(id => ({
        id,
        side: state.rolls[id].side,
        num: state.rolls[id].num
      }))
    },
    getRolling(state) {
      return state.rolling;
    },
    getRolltime(state) {
      return state.rolltime
    }
  }
})
