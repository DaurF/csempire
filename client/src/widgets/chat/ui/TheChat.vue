<template>
  <div class="chat-wrapper bg-[#1F2029] px-2.5 py-2.5 fixed top-20 z-40 bottom-0 flex flex-col">
    <div class="relative">
      <button @click="dropdownOpen = !dropdownOpen"
              class="bg-[#24252F] w-full rounded text-sm font-medium px-4 py-2.5 shadow shadow-gray-900">
        <div class="flex justify-between items-center">
          <span class="font-semibold">{{ currentChatLocaleLabel }} Room</span>
          <div class="flex items-center gap-1">
            <div class="w-2 h-2 bg-[#00E359] rounded-full"></div>
            <span class="text-nowrap">754 / 1278</span>
            <span>
          <ArrowDown/>
          </span>
          </div>
        </div>
      </button>
      <div v-if="dropdownOpen" class="z-40 w-full bg-[#24252F] absolute top-12 rounded border border-[#333541] p-1">
        <ul class="flex flex-col">
          <li v-for="(obj, label) in chatLocaleLabels" :key="label">
            <button @click="handleSelectLocaleLabel(label)"
                    class="w-full text-start px-3 py-2 text-[13px] font-semibold hover:bg-[#333541] transition-all rounded">
              <div class="flex items-center gap-2">
                <img class="h-2.5" :src="`/src/shared/ui/assets/images/flags/${obj.flag}.png`" alt="">
                <span>{{ obj.name }} Room</span>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>


    <div class="chat mt-3 px-2 grow">
      <ul class="text-xs flex flex-col gap-3.5 overflow-y-auto">
        <li v-for="msg in showMessages[currentChatLocale]" :key="msg.id">
          <div class="flex items-center gap-1">
            <img
                class="inline-block w-5 h-5 rounded-full object-cover"
                :src="msg.user.avatar"
                alt="User avatar">
            <div class="inline-flex bg-[#122631] items-center px-1 py-0.5 gap-1 rounded">
              <img src="@/shared/ui/assets/images/rank-diamoin.webp" class="w-4 h-4" alt="Rank Diamond">
              <span class="text-[#0EC2F4] font-semibold tracking-wide relative">{{ msg.user.level }}</span>
            </div>
            <a href="" class="text-white font-semibold inline-block mr-2">{{ msg.user.username }}</a>
          </div>
          <div class="mt-1 w-full overflow-hidden break-words break-all leading-5">
            <p>
              {{ msg.content }}
            </p>
          </div>
        </li>
      </ul>
    </div>

    <form class="relative mt-2 message-input-wrapper flex w-full" @submit.prevent="addMessage">
      <input type="text"
             v-model="messageInput"
             class="bg-[#141419] text-sm px-3.5 py-2.5 rounded w-full border border-[#333541] outline-0 placeholder-[#727282] focus:border-[#9293A6] focus:placeholder-[#53545F] transition-all"
             placeholder="Type Message...">
      <button @click="chatDropdownOpen = !chatDropdownOpen" class="three-dots">
        <ThreeDots/>
      </button>

      <div v-if="chatDropdownOpen"
           class="chat-dropdown z-30 w-full bg-[#24252F] rounded border border-[#333541] p-1 top-">
        <ul class="flex flex-col">
          <li>
            <button
                @click="handleCloseChat"
                class="w-full px-3.5 py-2 text-start text-xs font-semibold hover:bg-[#333541] transition-all rounded tracking-wide">
              <div class="flex items-center gap-2.5">
                <span class="h-3 w-3">
                  <Minus/>
                </span>
                <span>
                Close Chat
                </span>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </form>


  </div>
</template>

<script setup lang="ts">
import ArrowDown from "@/shared/ui/icons/arrow-down/ArrowDown.vue";
import {computed, ref} from 'vue';
import {socket} from "@/shared/api";
import {useChatStore, useUserStore} from "@/app/providers/store";
import ThreeDots from "@/shared/ui/icons/three-dots/ThreeDots.vue";
import Minus from "@/shared/ui/icons/minus/AppMinus.vue";
import ChatIcon from "@/shared/ui/icons/chat/AppChat.vue";

// import ThreeDots from "@/shared/ui/icons/three-dots/ThreeDots.vue";

const userStore = useUserStore()
const chatStore = useChatStore()


const chatLocaleLabels = {
  en: {
    name: 'English',
    flag: 'en',
  },
  de: {
    name: 'German',
    flag: 'de',
  },
  pt: {
    name: 'Portuguese',
    flag: 'pt',
  },
  fi: {
    name: 'Finnish',
    flag: 'fi',
  },
  tr: {
    name: 'Turkish',
    flag: 'tr',
  },
  ru: {
    name: 'Russian',
    flag: 'ru',
  },
  se: {
    name: 'Swedish',
    flag: 'se',
  },
  pl: {
    name: 'Polish',
    flag: 'pl',
  },
}

const dropdownOpen = ref(false);
const chatDropdownOpen = ref(false);

const messageInput = ref('');
const currentChatLocale = ref('en');

const currentChatLocaleLabel = computed(() => chatLocaleLabels[currentChatLocale.value].name)


const showMessages = computed(() => chatStore.getMessages)

// messages.value = chatStore.messages

socket.on('receive-message', (message: any) => {
  chatStore.messages[message.locale].push(message)
})

function handleSelectLocaleLabel(local: string) {
  currentChatLocale.value = local
  dropdownOpen.value = false
}

function handleCloseChat() {
  chatDropdownOpen.value = false;
  chatStore.chatOff()
}

function addMessage() {
  if (messageInput.value.length === 0) {
    return
  }

  socket.emit('send-message', {
    username: userStore.user.username,
    level: 90,
    avatar: 'https://dthezntil550i.cloudfront.net/rj/latest/rj1803311338471190005439374/1280_960/0d505b63-3e67-44dd-a510-862c245ee1b9.png'
  }, messageInput.value, currentChatLocale.value)

  messageInput.value = ''
}

</script>

<style scoped>
.chat-wrapper {
  width: calc(var(--left-width));
  transition: all .3s;
}

.message-input-wrapper {
  position: relative;
}

.chat {
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  scrollbar-color: #333541 transparent;
  scrollbar-width: thin;
}

.three-dots {
  position: absolute;
  padding: 0 2px;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
}

.three-dots:hover {
  color: #E9B10E;
}

.chat-dropdown {
  position: absolute;
  top: -120%;
}
</style>
