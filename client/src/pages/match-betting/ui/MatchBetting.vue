<template>
  <main class="mb-wrapper mx-auto px-14 py-8">
    <h2 class="text-white text-xl">Match Betting</h2>
    <div class="flex items-center text-sm mt-3.5 gap-2">
      <button class="btn"
              :class="{'btn--default':selMode !== 'esports', 'btn--active': selMode === 'esports'}"
              @click="selMode = 'esports'">
          <span class="flex items-center gap-1">
          <span>
            <Games/>
          </span>
          <span>Esports</span>
          </span>
      </button>
      <button class="btn"
              :class="{'btn--default':selMode !== 'sports', 'btn--active': selMode === 'sports'}"
              @click="selMode = 'sports'">
          <span class="flex items-center gap-1">
          <span>
            <Sports/>
          </span>
          <span>Sports</span>
          </span>
      </button>
      <button class="btn"
              :class="{'btn--default':selMode !== 'history', 'btn--active': selMode === 'history'}"
              @click="selMode = 'history'">
        History
      </button>
      <button class="btn"
              :class="{'btn--default':selMode !== 'rules', 'btn--active': selMode === 'rules'}"
              @click="selMode = 'rules'">
        Rules
      </button>
    </div>
    <div class="mt-6">
      <div class="flex items-center gap-2">
        <span>
          <Games class="text-[#E9B10E] h-6 w-6"/>
        </span>
        <h3 class="text-[#DCDCDC] font-semibold">All Esports</h3>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import Games from "@/shared/ui/icons/games/AppGames.vue";
import Sports from "@/shared/ui/icons/sports/AppSports.vue";
import {ref} from "vue";

const selMode = ref('esports')
</script>

<style scoped>

.mb-wrapper {
  max-width: var(--mb-wrapper-w);
}

.btn {
  @apply px-3 py-2 rounded-full;
  transition: all 0.1s;
}

.btn:hover {
  background: #333541;
  color: #DCDCDC;
}

.btn--default {
  background: #24252F;
  color: #9293A6;
}

.btn--active {
  background: #333541;
  color: #DCDCDC;
}

</style>

