import {createApp} from 'vue';
import {createPinia} from "pinia";
import App from './App.vue';
import {router} from "@/app/providers/router";


export const app = createApp(App).use(createPinia()).use(router)
