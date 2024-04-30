import {ref} from 'vue'

export function useTimer(initialValue: number) {
  let val = initialValue;
  const timer = ref(val)

  const startTimer = () => {
    const initialTime = new Date().getTime()
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const time = Math.floor((now - initialTime) / 10) * 10
      timer.value = val - time / 1000
      if (timer.value <= 0) {
        clearInterval(interval)
      }
    }, 10)
    val = timer.value = 14.5
  }

  return {timer, startTimer}
}


