import {defineStore} from "pinia";

export const useChatStore = defineStore('chat', {
  state: () => ({
    chatVisible: false,
    messages: {
      en: [],
      de: [],
      pt: [],
      fi: [],
      tr: [],
      ru: [],
      se: [],
      pl: []
    }
  }),
  actions: {
    setMessages(messages: any[]) {
      messages.forEach(msg => {
        this.messages[msg.locale].push(msg)
      })
    },
    chatOn() {
      this.chatVisible = true;
    },
    chatOff() {
      this.chatVisible = false;
    }
  },
  getters: {
    getMessages(state) {
      return state.messages;
    },
    showChat(state) {
      return state.chatVisible;
    }
  }
})
