import Vue from 'vue';

export function isServer(enabled, vm = Vue) {
    if (!vm._prototype) {
        vm._prototype = vm === Vue ? vm.prototype : Object.getPrototypeOf(vm);
    }

    if (enabled) {
        if (vm === Vue) {
            return vm.prototype = Object.assign({}, vm._prototype, {
                get $isServer() {
                    return enabled;
                }
            });
        }

        return Object.setPrototypeOf(vm, new Proxy(vm._prototype, {
            get: (target, key, receiver) => key === '$isServer'
                ? true
                : Reflect.get(target, key, receiver)
        }));
    } else {
        if (vm === Vue) {
            return vm.prototype = vm._prototype;
        }

        return Object.setPrototypeOf(vm, vm._prototype);
    }
}
