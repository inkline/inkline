import Vue from 'vue';
import { IPrototype } from '../src/plugin';

declare module 'vue/types/vue' {
    interface Vue {
        $inkline: IPrototype
    }
}
