import { defineNuxtPlugin } from "#app";
import { Inkline } from "@inkline/inkline";
import { NuxtLink } from "#app/../components";

export default defineNuxtPlugin((nuxtApp) => {
    console.log("INSTALLED");
    nuxtApp.vueApp.use(Inkline, {
        routerComponent: NuxtLink,
    });
});
