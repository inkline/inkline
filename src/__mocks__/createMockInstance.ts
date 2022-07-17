interface MockInstanceOptions {
    data?: Record<string, any>;
    props?: Record<string, any>;
    computed?: Record<string, any>;
    methods?: Record<string, any>;
    inject?: Record<string, any>;
    mocks?: Record<string, any>;
    $el?: HTMLElement;
    $refs?: Record<string, HTMLElement>;
}

/**
 * Simulates a Vue instance with props, methods, data and computed properties
 * for scenarios that cannot be tested using testing-library.
 *
 * @param component
 * @param options
 */
export const createMockInstance = (component: any, { inject = {}, data = {}, props = {}, computed = {}, methods = {}, mocks = {}, $el = document.createElement('div'), $refs = {} }: MockInstanceOptions = {}) => {
    const instance: any = {
        $emit: vi.fn(),
        $nextTick: vi.fn(() => Promise.resolve()),
        $el,
        $refs
    };

    if (component.props) {
        Object.entries(component.props).forEach(([key, prop]) => {
            instance[key] = props[key] ??
                (typeof (prop as any).default === 'function'
                    ? (prop as any).default()
                    : (prop as any).default
                );
        });
    }

    if (component.methods) {
        Object.entries(component.methods).forEach(([key, fn]) => {
            instance[key] = vi.fn().mockImplementation(methods[key] || fn);
        });
    }

    if (component.data) {
        Object.entries(component.data.call(instance)).forEach(([key, value]) => {
            instance[key] = data[key] || value;
        });
    }

    if (component.inject) {
        Object.entries(component.inject).forEach(([key, value]) => {
            instance[key] = inject[key] || (value as any)?.default();
        });
    }

    if (component.computed) {
        Object.entries(component.computed).forEach(([key, fn]) => {
            Object.defineProperty(instance, key, {
                get: computed[key] || fn as any
            });
        });
    }

    Object.entries(mocks).forEach(([key, mock]) => {
        instance[key] = mock;
    });

    if (component.created) {
        component.created.call(instance);
    }

    if (component.mounted) {
        component.mounted.call(instance);
    }

    return instance;
};
