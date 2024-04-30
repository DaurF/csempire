<template>
  <DefaultLayout>
    <template #header>
      <Header/>
    </template>

    <template #chat>
      <Chat :class="{'chat--open': showChat, 'chat--closed': !showChat}"/>
      <div class="fixed z-50 left-0 bottom-8 hover:text-[#E9B10E] transition-all duration-500 ease-out"
           :class="{'close-chat-wrapper--close': showChat, 'close-chat-wrapper--open': !showChat}">
        <button @click="handleOpenChat" class="btn-close-chat bg-[#1F2029] p-5 rounded">
        <span>
          <ChatIcon class="h-4 w-4"/>
        </span>
        </button>
      </div>
    </template>


    <template #default>
      <router-view/>
    </template>

    <template #footer>
      <Footer/>
    </template>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/shared/ui/layouts/default-layout/DefaultLayout.vue";
import Header from "@/widgets/header";
import Footer from "@/widgets/footer";
import Chat from "@/widgets/chat/ui/TheChat.vue";
import {computed} from 'vue';
import {useUserStore, useChatStore, useRouletteStore} from "@/app/providers/store";
import {socket} from "@/shared/api";
import ChatIcon from "@/shared/ui/icons/chat/AppChat.vue";


const userStore = useUserStore();
const chatStore = useChatStore()
const rouletteStore = useRouletteStore()

socket.once('init', (data: any) => {
  console.log(data)
  userStore.setUser(data.user)
  chatStore.setMessages(data.messages)
  rouletteStore.setRolls(data.rolls)
  rouletteStore.setRolling(data.rolling)
})

const showChat = computed(() => chatStore.showChat)

function handleOpenChat() {
  chatStore.chatOn()
}
</script>

<style>
@import 'index.css';

.chat--open {
  transform: translateX(0)
}

.chat--closed {
  transform: translateX(calc(-1 * (var(--left-width) - 0px)));
}

.close-chat-wrapper--open {
  transform: translateX(0);
}

.close-chat-wrapper--close {
  transform: translateX(-60px);
}

.btn-close-chat {
  box-shadow: 2px 1px 3px 1px rgba(14, 14, 14, 0.6);
}
</style>
