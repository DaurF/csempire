<template>
  <div class="roulette-wrapper pt-2 pb-12 px-22" :class="{'mx-auto': !showChat, 'right': showChat}">
    <div class="sound-wrapper text-sm flex justify-end">
      <button @click="isSoundOn = !isSoundOn" class="px-3 py-2 rounded hover:bg-[#333541]">
        <div class="flex items-center gap-1">
          <SoundOff v-if="isSoundOn"/>
          <SoundOn v-if="!isSoundOn"/>
          <span class="font-medium text-nowrap">Sound {{ isSoundOn ? 'off' : 'on' }}</span>
        </div>
      </button>
    </div>

    <div class="relative wheel mt-4 h-24 roulette">
      <div class="wheel__mask" :class="{'opacity-0': showMarker, 'opacity-1': !showMarker}"/>
      <div v-show="showMarker" class="wheel__marker"/>
      <div class="wheel__item" :class="{'opacity-0': rolling, 'opacity-1': !rolling }">
        <span class="block uppercase font-light mt-5 text-xs tracking-widest">Rolling</span>
        <span class="block font-bold text-2xl mt-3">{{ showTimer }}</span>
      </div>
    </div>

    <div class="mt-8 h-6 previous-rolls flex items-center gap-4">
      <div class="flex items-center gap-2.5">
        <span class="text-nowrap uppercase text-xs">Previous rolls</span>
        <TransitionGroup name="previous-rolls" tag="ul"
                         class="w-[298px] overflow-hidden flex items-center gap-1.5 justify-end">
          <li v-for="roll in rolls" :key="roll.id" class="previous-item-roll">
            <div :class="`coin--${roll.side} w-6 h-6 rounded-full`"/>
          </li>
        </TransitionGroup>
      </div>

      <div class="flex items-center gap-2.5">
        <span class="uppercase text-xs text-nowrap">Last 100</span>
        <div class="flex items-center gap-2 text-xs font-bold text-white">
          <div class="coin--ct w-4 h-4 rounded-full"/>
          <span>{{ ctRollsAmount }}</span>
          <div class="coin--bonus w-4 h-4 rounded-full"/>
          <span>{{ bonusRollsAmount }}</span>
          <div class="coin--t w-4 h-4 rounded-full"/>
          <span>{{ tRollsAmount }}</span>
        </div>
      </div>
    </div>

    <div class="bet-input-wrapper bg-[#141419] flex">
      <CoinsBet class="coin text-[#E9B10E]"/>
      <input type="text"
             v-model.number="betAmount"
             class="bg-[#141419] rounded-l border border-[#333541] pl-8 pr-4 outline-0 placeholder-[#727282] focus:border-[#9293A6] focus:placeholder-[#53545F] transition-all"
             placeholder="Enter bet amount...">
      <div class="flex items-center w-full border border-[#333541] border-l-0 rounded-r text-[11px] px-2 gap-2">
        <button @click="betAmount = ''" class="btn-bet" style="padding: 2px 5px;">clear</button>
        <button @click="setAmount('+', 0.01)" class="btn-bet" style="padding: 2px 7px;">+ 0.01</button>
        <button @click="setAmount('+', 0.1)" class="btn-bet" style="padding: 2px 10px;">+ 0.1</button>
        <button @click="setAmount('+', 1)" class="btn-bet" style="padding: 2px 14px;">+ 1</button>
        <button @click="setAmount('+', 10)" class="btn-bet" style="padding: 2px 12px;">+ 10</button>
        <button @click="setAmount('+', 100)" class="btn-bet" style="padding: 2px 8px;">+ 100</button>
        <button @click="setAmount('/', 2)" class="btn-bet" style="padding: 2px 11px;">1/ 2</button>
        <button @click="setAmount('*', 2)" class="btn-bet" style="padding: 2px 14px;">X 2</button>
        <button @click="betAmount = 999999" class="btn-bet" style="padding: 2px 12px;">max</button>
      </div>
    </div>

    <div class="place-bet-wrapper mt-10.5 flex gap-6">
      <div class="basis-1/3">
        <button
            @click="makeBet('ct')"
            class="w-full pl-4 py-2 rounded gap-3 tracking-wide items-center flex uppercase text-[#DCDCDC] bg-[#333541] hover:bg-[#373A47] transition-all shadow-pl-bet"
            :class="{'disabled cursor-not-allowed': rolling, 'op-50': rolling && winside !== 'ct', 'bg-[#333541]': !rolling}">
          <img class="w-9 h-9" src="@/shared/ui/assets/images/ct-side.webp" alt="Counter-Terrorist Side">
          <span>Place bet</span>
        </button>

        <div class="mt-3 text-xs text-[#C0C0C0]" :class="{'bg-[#181A20] op-50': rolling, 'bg-[#16171C]': !rolling}">
          <div
              class="flex justify-between px-4 py-3 border border-[#0C0D0F]"
              :class="[ctBets.length > 0 ? 'rounded-t' : 'rounded-md']">
            <span>{{ ctBets.length }} Bets Total</span>
            <div class="flex items-center gap-1">
              <CoinsBet class="text-[#E9B10E] w-3 h-3"/>
              <span>{{ totalCtBetsAmount }}</span>
            </div>
          </div>
          <div class="h-92 bg-[#1A1C24]">
            <div v-if="ctBets.length > 0"
                 class="border-x border-b border-[#0C0D0F] rounded-b px-4 py-2 max-h-92 overflow-hidden"
                 :class="{'shadow-b': ctBets.length > 10}">
              <TransitionGroup name="list" tag="ul" class="flex flex-col gap-3">
                <li v-for="bet in sortedCtBets" :key="bet.user.username" class="flex justify-between items-center">
                  <div class="flex items-center gap-3">
                    <img
                        class="w-6 h-6 rounded-full object-cover"
                        src="https://dthezntil550i.cloudfront.net/rj/latest/rj1803311338471190005439374/1280_960/0d505b63-3e67-44dd-a510-862c245ee1b9.png"
                        alt="User avatar">
                    <div class="bg-[#122631] flex items-center px-1.5 py-1 gap-2 rounded">
                      <img src="@/shared/ui/assets/images/rank-diamoin.webp" class="w-4 h-4" alt="Rank Diamond">
                      <span class="text-[#0EC2F4] font-semibold tracking-wide relative bottom-0.5">{{
                          bet.user.level
                        }}</span>
                    </div>
                    <span>{{ bet.user.username }}</span>
                  </div>
                  <span>{{ bet.amount }}</span>
                </li>
              </TransitionGroup>
            </div>
          </div>

        </div>
      </div>

      <div class="basis-1/3">
        <button
            @click="makeBet('bonus')"
            class="w-full pl-4 py-2 rounded gap-3 tracking-wide items-center flex uppercase text-[#DCDCDC] bg-[#333541] hover:bg-[#373A47] transition-all shadow-pl-bet"
            :class="{'disabled cursor-not-allowed': rolling, 'op-50': rolling && winside !== 'bonus','bg-[#333541]': !rolling}">
          <img class="w-9 h-9" src="../../../shared/ui/assets/images/bonus-side.webp" alt="Bonus Side">
          <span>Place bet</span>
        </button>

        <div class="mt-3 text-xs text-[#C0C0C0]"
             :class="{'bg-[#181A20] op-50': rolling, 'bg-[#16171C]': !rolling}">
          <div
              class="flex justify-between px-4 py-3 border border-[#0C0D0F]"
              :class="[bonusBets.length > 0 ? 'rounded-t' : 'rounded-md']">
            <span>{{ bonusBets.length }} Bets Total</span>
            <div class="flex items-center gap-1">
              <CoinsBet class="text-[#E9B10E] w-3 h-3"/>
              <span>{{ totalBonusBetsAmount }}</span>
            </div>
          </div>

          <div class="h-92 bg-[#1A1C24]">
            <div v-if="bonusBets.length > 0"
                 class="border-x border-b border-[#0C0D0F] rounded-b px-4 py-2 max-h-92 overflow-hidden"
                 :class="{'shadow-b': bonusBets.length > 10}">
              <TransitionGroup name="list" tag="ul" class="flex flex-col gap-3">
                <li v-for="bet in sortedBonusBets" :key="bet.user.username" class="flex justify-between items-center">
                  <div class="flex items-center gap-3">
                    <img
                        class="w-6 h-6 rounded-full object-cover"
                        src="https://dthezntil550i.cloudfront.net/rj/latest/rj1803311338471190005439374/1280_960/0d505b63-3e67-44dd-a510-862c245ee1b9.png"
                        alt="User avatar">
                    <div class="bg-[#122631] flex items-center px-1.5 py-1 gap-2 rounded">
                      <img src="@/shared/ui/assets/images/rank-diamoin.webp" class="w-4 h-4" alt="Rank Diamond">
                      <span class="text-[#0EC2F4] font-semibold tracking-wide relative bottom-0.5">{{
                          bet.user.level
                        }}</span>
                    </div>
                    <span>{{ bet.user.username }}</span>
                  </div>
                  <span>{{ bet.amount }}</span>
                </li>
              </TransitionGroup>
            </div>
          </div>
        </div>


      </div>

      <div class="basis-1/3">
        <button
            @click="makeBet('t')"
            class="w-full pl-4 py-2 rounded gap-3 tracking-wide items-center flex uppercase text-[#DCDCDC] bg-[#333541] hover:bg-[#373A47] transition-all shadow-pl-bet"
            :class="{'disabled cursor-not-allowed': rolling,'op-50': rolling && winside !== 't', 'bg-[#333541]': !rolling}">
          <img class="w-9 h-9" src="../../../shared/ui/assets/images/t-side.webp" alt="Terrorist Side">
          <span>Place bet</span>
        </button>

        <div class="mt-3 text-xs text-[#C0C0C0]"
             :class="{'bg-[#181A20] op-50': rolling, 'bg-[#16171C]': !rolling}">
          <div
              class="flex justify-between px-4 py-3 border border-[#0C0D0F]"
              :class="[tBets.length > 0 ? 'rounded-t' : 'rounded-md']">
            <span>{{ tBets.length }} Bets Total</span>
            <div class="flex items-center gap-1">
              <CoinsBet class="text-[#E9B10E] w-3 h-3"/>
              <span>{{ totalTBetsAmount }}</span>
            </div>
          </div>
          <div class="h-92 bg-[#1A1C24]">
            <div v-if="tBets.length > 0"
                 class="border-x border-b border-[#0C0D0F] rounded-b px-4 py-2 max-h-92 overflow-hidden"
                 :class="{'shadow-b': tBets.length > 10}">
              <TransitionGroup name="list" tag="ul" class="flex flex-col gap-3">
                <li v-for="bet in sortedTBets" :key="bet.user.username" class="flex justify-between items-center">
                  <div class="flex items-center gap-3">
                    <img
                        class="w-6 h-6 rounded-full object-cover"
                        src="https://dthezntil550i.cloudfront.net/rj/latest/rj1803311338471190005439374/1280_960/0d505b63-3e67-44dd-a510-862c245ee1b9.png"
                        alt="User avatar">
                    <div class="bg-[#122631] flex items-center px-1.5 py-1 gap-2 rounded">
                      <img src="@/shared/ui/assets/images/rank-diamoin.webp" class="w-4 h-4" alt="Rank Diamond">
                      <span class="text-[#0EC2F4] font-semibold tracking-wide relative bottom-0.5">{{
                          bet.user.level
                        }}</span>
                    </div>
                    <span>{{ bet.user.username }}</span>
                  </div>
                  <span>{{ bet.amount }}</span>
                </li>
              </TransitionGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import SoundOff from "@/shared/ui/icons/sound-off/SoundOff.vue";
import SoundOn from "@/shared/ui/icons/sound-on/SoundOn.vue";
import CoinsBet from "@/shared/ui/icons/coins-bet/CoinsBet.vue";
import {socket} from "@/shared/api";
import {useUserStore, useChatStore, useRouletteStore} from "@/app/providers/store";
import type {IRolling} from "@/app/providers/store/roulette";


const userStore = useUserStore()
const chatStore = useChatStore()
const rouletteStore = useRouletteStore()

const rolls = computed(() => rouletteStore.getRolls)

const showChat = computed(() => chatStore.showChat)

const isSoundOn = ref(true)

const rolling = ref(false);
const showMarker = ref(rolling.value)

const ctBets = ref<any[]>([])
const tBets = ref<any[]>([])
const bonusBets = ref<any[]>([])

const winside = ref('')

const showTimer = computed(() => timer.value.toFixed(2).replace('.', ','))

const sortedCtBets = computed(() => ctBets.value.slice().sort((a, b) => b.amount - a.amount).map(bet => ({
  ...bet,
  amount: bet.amount.toFixed(2).replace('.', ',')
})))
const sortedTBets = computed(() => tBets.value.slice().sort((a, b) => b.amount - a.amount).map(bet => ({
  ...bet,
  amount: bet.amount.toFixed(2).replace('.', ',')
})))
const sortedBonusBets = computed(() => bonusBets.value.slice().sort((a, b) => b.amount - a.amount).map(bet => ({
  ...bet,
  amount: bet.amount.toFixed(2).replace('.', ',')
})))

const totalCtBetsAmount = computed<string>(() => {
  const total = ctBets.value.reduce((acc, bet) => acc + bet.amount, 0);
  return total.toFixed(2).replace('.', ',');
})
const totalTBetsAmount = computed<string>(() => {
  const total = tBets.value.reduce((acc, bet) => acc + bet.amount, 0);
  return total.toFixed(2).replace('.', ',');
})
const totalBonusBetsAmount = computed<string>(() => {
  const total = bonusBets.value.reduce((acc, bet) => acc + bet.amount, 0);
  return total.toFixed(2).replace('.', ',');
})


const tRollsAmount = computed(() => rouletteStore.getRolls.filter(roll => roll.side === 't').length)
const ctRollsAmount = computed(() => rouletteStore.getRolls.filter(roll => roll.side === 'ct').length)
const bonusRollsAmount = computed(() => rouletteStore.getRolls.filter(roll => roll.side === 'bonus').length)

const betAmount = ref<string | number>('')

socket.on('made-bet', betInfo => {
  userStore.changeBalance(-betInfo.amount)

  switch (betInfo.side) {
    case 'ct':
      ctBets.value.push(betInfo);
      break;
    case 'bonus':
      bonusBets.value.push(betInfo)
      break;
    case 't':
      tBets.value.push(betInfo)
      break
  }
})


onMounted(() => {
  if (rouletteStore.getRolling) {
    const lastRoll = rouletteStore.getRolls.at(-1);
    const secondsLeft = (rouletteStore.getRolling as IRolling).secondsLeft
    console.log('getRolls: ', secondsLeft)
    rolling.value = true;
    showMarker.value = true;

    const wheel = document.querySelector('.wheel') as HTMLElement;
    wheel.style.transition = ``
    const nextPosition = 2100 - lastRoll?.num * 100;
    const startPosition = 5100 - (5100 - 2100) * ((5000 - secondsLeft) / 5000)
    console.log('startPosition: ', startPosition)
    console.log(secondsLeft, 2100 - nextPosition)
    wheel.style.backgroundPosition = `${startPosition}px`
    wheel.style.transition = `all ${secondsLeft / 1000}s ease-out`
    setTimeout(() => {
      wheel.style.backgroundPosition = `${2100 - nextPosition}px`
    }, 20)

    setTimeout(() => {
      winside.value = lastRoll?.side
      setTimeout(() => {
        showMarker.value = false;
        winside.value = ''

        wheel.style.transition = 'background-position 1s ease'
        wheel.style.backgroundPosition = '600px';
        setTimeout(() => {
          wheel.style.transition = ''
          wheel.style.backgroundPosition = '5100px'

          // startTimer()
          rolling.value = false
          tBets.value = []
          ctBets.value = []
          bonusBets.value = []

          // if ((socket.id as string) in results) {
          //   userStore.balance += results[socket.id as string]
          // }
        }, 1000)
      }, 3000)
    }, secondsLeft + 20)
  }
})


function startTimer() {
  const initialTime = new Date().getTime()
  const interval = setInterval(() => {
    const now = new Date().getTime();
    const time = Math.floor((now - initialTime) / 10) * 10
    timer.value = 14.5 - time / 1000
    if (timer.value <= 0) {
      clearInterval(interval)
    }
  }, 10)
}

socket.on('roll-end', (roll: { id: number, side: string }, num: number, results: any) => {
  rolling.value = true;
  showMarker.value = true;

  const wheel = document.querySelector('.wheel') as HTMLElement;
  wheel.style.transition = 'background-position 5s ease-out'
  wheel.style.backgroundPosition = `${2100 - num * 100}px`

  setTimeout(() => {
    winside.value = roll.side
    rouletteStore.setRoll(roll.id, num, roll.side)
    setTimeout(() => {
      showMarker.value = false;
      winside.value = ''

      wheel.style.transition = 'background-position 1s ease'
      wheel.style.backgroundPosition = '600px';
      setTimeout(() => {
        wheel.style.transition = ''
        wheel.style.backgroundPosition = '5100px'

        startTimer()
        rolling.value = false
        tBets.value = []
        ctBets.value = []
        bonusBets.value = []

        if ((socket.id as string) in results) {
          userStore.balance += results[socket.id as string]
        }
      }, 1000)
    }, 3000)
  }, 5000)
})

const timer = ref(14.5)


// socket.on('rolling', (side, num, results) => {


// })

function setAmount(op: string, amount: number) {
  if (typeof betAmount.value === 'string') {
    if (op === '+') {
      betAmount.value = amount;
    }
  } else {
    if (op === '+') {
      betAmount.value += amount;
    }

    if (op === '*') {
      betAmount.value *= amount;
    }

    if (op === '/') {
      betAmount.value /= amount;
    }

    betAmount.value = Number(betAmount.value.toFixed(2))
  }
}

function makeBet(side: string) {
  if (rolling.value) {
    return
  }

  if (typeof betAmount.value === 'string' || betAmount.value <= 0) {
    return;
  }

  if (betAmount.value > userStore.getBalance) {
    return alert("Not enough balance for the bet")
  }

  socket.emit('bet', userStore.user, {side, amount: betAmount.value})

  betAmount.value = ''
}

</script>

<style scoped>
.roulette-wrapper {
  max-width: var(--roulette-wrapper-w)
}

.previous-rolls {
  max-width: calc(var(--roulette-wrapper-w) - 710px);
  margin: 48px auto 0 auto;
}

.bet-input-wrapper {
  position: relative;
  max-width: calc(var(--roulette-wrapper-w) - 614px);
  margin: 24px auto 0 auto;
  height: 40px;
}

.coin {
  position: absolute;
  top: 14px;
  left: 12px;
  height: 14px;
  width: 14px;
}

.btn-bet {
  border-radius: 3px;

  @apply uppercase bg-[#333541] py-0.5 hover:text-[#C0C0C0] transition-all;
}


.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.shadow-b {
  box-shadow: inset 0px -10px 30px #151515;
}

.op-50 {
  opacity: 0.5;
}

.wheel {
  background-image: url("@/shared/ui/assets/images/coins-empire.png");
  height: 100px;
  max-width: 1100px;
  background-size: auto 100px;
  background-repeat: repeat-x;
  background-position: 5100px center;
  margin: 16px auto 0 auto;
  position: relative;
}

.wheel::before {
  position: absolute;
  content: '';
  background: linear-gradient(90deg, rgba(26, 28, 36, .9) 0%, transparent 100%);
  left: 0;
  top: 0;
  bottom: 0;
  width: 25%;
  height: 100%;
}

.wheel::after {
  position: absolute;
  content: '';
  background: linear-gradient(270deg, rgba(26, 28, 36, .9) 0%, transparent 100%);
  right: 0;
  top: 0;
  bottom: 0;
  width: 25%;
  height: 100%;
}

.wheel__marker {
  background-color: #D0021B;
  position: absolute;
  height: 120px;
  width: 4px;
  top: -10px;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.wheel__mask {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: #1a1c24bf;
  top: 0;
  left: 0;
  transition: opacity 0.25s;
}

.wheel__item {
  color: #fff;
  left: 50%;
  transform: translateX(-50%);

  @apply w-full h-full text-center absolute z-20;
}

.previous-roll-item {
  transition: all 1s;
}

.coin--t {
  background: url('@/shared/ui/assets/images/t-side.webp') center center/100% auto no-repeat;
}

.coin--ct {
  background: url('@/shared/ui/assets/images/ct-side.webp') center center/100% auto no-repeat;
}

.coin--bonus {
  background: url('@/shared/ui/assets/images/bonus-side.webp') center center/100% auto no-repeat;
}

.previous-rolls-enter-active,
.previous-rolls-leave-active {
  transition: all 0.5s ease-in;
}

.previous-rolls-enter-from,
.previous-rolls-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.right {
  margin-left: calc(var(--left-width) + 8%);
}
</style>

