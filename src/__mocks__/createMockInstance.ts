interface MockInstanceOptions {
    props?: Record<string, any>;
    computed?: Record<string, any>;
    methods?: Record<string, any>;
    mocks?: Record<string, any>;
}

/**
 * Simulates a Vue instance with props, methods, data and computed properties
 * for scenarios that cannot be tested using testing-library.
 *
 * @param component
 * @param options
 */
export const createMockInstance = (component: any, { props = {}, computed = {}, methods = {}, mocks = {} }: MockInstanceOptions) => {
    const instance: any = {
        $emit: jest.fn(),
        $el: document.createElement('div')
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
            instance[key] = jest.fn().mockImplementation(methods[key] || fn);
        });
    }

    if (component.data) {
        Object.entries(component.data.call(instance)).forEach(([key, value]) => {
            instance[key] = value;
        });
    }

    if (component.computed) {
        Object.entries(component.computed).forEach(([key, fn]) => {
            Object.defineProperty(instance, key, {
                get: computed[key] || fn as any,
            });
        });
    }

    Object.entries(mocks).forEach(([key, mock]) => {
        instance[key] = mock;
    });

    if (component.mounted) {
        component.mounted.call(instance);
    }

    return instance;
};
