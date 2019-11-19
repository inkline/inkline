import Vue from 'vue';

export function isServer(enabled, vm = Vue) {
    if (!vm._prototype) {
        vm._prototype = vm === Vue ? vm.prototype : Object.getPrototypeOf(vm);
    }

    if (vm === Vue) {
        vm.prototype = Object.assign({}, vm._prototype, {
            get $isServer() {
                return enabled;
            }
        });

        return vm;
    }

    return Object.setPrototypeOf(vm, new Proxy(vm._prototype, {
        get: (target, key, receiver) => key === '$isServer'
            ? enabled
            : Reflect.get(target, key, receiver)
    }));
}
