import Vue from 'vue';
import { IPrototype } from '@inkline/inkline/src/plugin';

declare module 'vue/types/vue' {
    interface Vue {
        $inkline: IPrototype
    }
}
