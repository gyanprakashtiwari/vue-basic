import { createApp } from "vue";

import Toast from "vue-toastification";
// import router from "./router/router";
import "vue-toastification/dist/index.css";
import "./assets/style.css";
import App from "./App.vue";


const app = createApp(App);
app.use(Toast);
// app.use(router);
app.mount("#app");
