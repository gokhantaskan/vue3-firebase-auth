import "./assets/styles/main.css";

import { createPinia } from "pinia";
import { createApp } from "vue";
import { VueFire, VueFireAuth } from "vuefire";

import { firebaseApp } from "./packages/firebase";
import Root from "./Root.vue";
import router from "./router";

const app = createApp(Root);

app.use(createPinia());
app.use(router);
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});

app.mount("#app");
