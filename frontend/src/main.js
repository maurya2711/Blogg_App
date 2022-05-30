import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Bootstrap from "bootstrap";

createApp(App).use(store).use(router).use(Bootstrap).mount("#app");
