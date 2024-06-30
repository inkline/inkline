import "./css/index.scss";
import "../css/index.scss";
import "@inkline/inkline/lib/inkline.scss";

import { createApp } from "vue";
import { Inkline, components } from "@inkline/inkline";
import App from "./app.vue";

const app = createApp(App);

app.use(Inkline, { components });

app.mount("#app");
