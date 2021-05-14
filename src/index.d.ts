import { IPrototype } from './plugin';

export * from './plugin';
export * from './components';
export * from './composition-api';
export * from './i18n';
export * from './validation';

declare module 'vue/types/vue' {
    interface Vue {
        $inkline: IPrototype
    }
}
