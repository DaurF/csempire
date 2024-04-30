<template>
  <header class="flex fixed top-0 left-0 right-0 z-50">
    <div class="bg-[#24252f] h-20 logo-wrapper flex items-center justify-center shrink-0">
      <router-link :to="{name: 'roulette'}">
        <Logo class="h-9.5"/>
      </router-link>
    </div>
    <div class="flex flex-col w-full">
      <ul class="flex gap-4 px-5 pb-1 pt-0.5 bg-[#16181F]">
        <li>
          <button class="btn-link">
            <div class="flex gap-2 items-center">
              <span class="text-nowrap">Free Case</span>
              <Gift/>
            </div>
          </button>
        </li>
        <li>
          <router-link to="/fairness" class="btn-link">Fairness</router-link>
        </li>
        <li>
          <router-link to="/profile/cases" class="btn-link">Bonus Cases</router-link>
        </li>
        <li>
          <router-link to="/referrals" class="btn-link">Referrals</router-link>
        </li>
        <li>
          <router-link to="/faq" class="btn-link">About</router-link>
        </li>
        <li>
          <button class="btn-link">
            <div class="flex gap-2 items-center">
              <span class="text-nowrap">Daily Coins</span>
              <Coins/>
            </div>
          </button>
        </li>
      </ul>
      <div class="bg-[#24252f] flex h-full justify-between pl-1 pr-3">
        <nav>
          <ul class="flex items-stretch gap-4 h-full">
            <li>
              <router-link
                  class="nav-link"
                  to="/roulette">
                <div class="flex items-center gap-2">
                  <Games/>
                  <span>Games</span>
                  <DropdownIcon/>
                </div>
              </router-link>
            </li>
            <li>
              <router-link
                  class="nav-link"
                  :to="{name: 'match-betting'}">
                <div class="flex items-center gap-2">
                  <Football/>
                  <span class="text-nowrap">Match Betting</span>
                </div>
              </router-link>
            </li>
            <li>
              <router-link
                  class="nav-link"
                  to="/roulette">
                <div class="flex items-center gap-2">
                  <Duel/>
                  <span class="text-nowrap">Case Battles</span>
                  <NewTag/>
                </div>
              </router-link>
            </li>
          </ul>
        </nav>
        <ul class="flex items-center gap-3.5">
          <li class="flex items-center">
            <router-link
                class="flex items-center text-sm tracking-wide hover:bg-[#333541] px-3.5 py-2 rounded"
                to="/roulette">
              <span>Withdraw</span>
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link
                class="flex items-center text-sm tracking-wide bg-[#E9B10E] text-black hover:bg-[#FFCF42] px-6 py-2 rounded shadow-dep"
                to="/roulette">
              <span>Deposit</span>
            </router-link>
          </li>
          <li class="flex items-center" v-if="false">
            <router-link
                class="flex items-center text-sm tracking-wide bg-[#01BF4D] text-black hover:bg-[#00E359] px-5 py-2 rounded shadow-sign"
                to="/roulette">
              <div class="flex items-center gap-1">
                <Steam/>
                <span class="text-nowrap">Sign in</span>
              </div>
            </router-link>
          </li>
          <li>
            <button
                class="bg-[#141419] px-2.5 py-2.5 text-xs font-semibold border border-[#333541] rounded text-[#E9B10E]">
              <div class="flex items-center gap-2">
                <CoinsBet class="h-[14px] w-[14px]"/>
                <div class="flex gap-1.5 items-end">
                  <span class="tracking-wider">{{ showBalance }}</span>
                  <span>
                  <ArrowDown class="h-3 w-3"/>
                </span>
                </div>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Logo from "@/shared/ui/icons/logo/AppLogo.vue";
import Gift from "@/shared/ui/icons/gift/AppGift.vue";
import Coins from "@/shared/ui/icons/coins/AppCoins.vue";
import Games from "@/shared/ui/icons/games/AppGames.vue";
import Football from "@/shared/ui/icons/football/AppFootball.vue";
import Duel from "@/shared/ui/icons/duel/AppDuel.vue";
import Steam from "@/shared/ui/icons/steam/AppSteam.vue";
import DropdownIcon from "@/shared/ui/icons/dropdown/AppDropdown.vue";
import NewTag from "@/shared/ui/new-tag/NewTag.vue";
import CoinsBet from "@/shared/ui/icons/coins-bet/CoinsBet.vue";
import ArrowDown from "@/shared/ui/icons/arrow-down/ArrowDown.vue";
import {useUserStore} from "@/app/providers/store";

import {computed} from "vue";


const store = useUserStore()

const showBalance = computed(() => store.getBalance.toFixed(2).replace('.', ','))
</script>

<style>
.btn-link {
  @apply font-serif text-[11px] hover:text-[#E9B10E];
}

.nav-link {
  @apply flex items-center h-full uppercase text-xs font-bold tracking-wide pl-4 hover:text-[#E9B10E];
}

.logo-wrapper {
  width: var(--left-width);
}
</style>
