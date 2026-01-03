import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "virtual:windi.css";
import { router } from "@/router";
import store from "@/store";
import "@/permission";
import "nprogress/nprogress.css";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);

for (const iconName in ElementPlusIconsVue) {
    app.component(iconName, ElementPlusIconsVue[iconName])
  }
app.use(router);
app.use(ElementPlus);
app.use(store);
app.mount("#app");
