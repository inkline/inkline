import Vue from 'vue'

export interface Component {}

export class Inkline {
    static components: Component[];
    static install (vue: typeof Vue, options: {}): void;
}

export default Inkline;
