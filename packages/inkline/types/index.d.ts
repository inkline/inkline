import { IInkline, IPrototype } from '../src/plugin';

declare const Inkline: IInkline;

declare module 'vue/types/vue' {
    export interface Vue {
        $inkline: IPrototype
    }
}

export default Inkline;
