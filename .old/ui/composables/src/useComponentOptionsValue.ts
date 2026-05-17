import { computed, unref } from 'vue';
import type { MaybeRef } from 'vue';
import { useOptions } from './useOptions';
import type { ComponentProps, ColorModePropValue } from '@inkline/types';
import { isArray } from '@inkline/utils';

export function getComponentOptionsValue<T extends keyof ComponentProps>(
    options: ReturnType<typeof useOptions>['options'],
    componentName: string,
    propertyName: T,
    valueRef: MaybeRef<ComponentProps[T]>,
    fallbackValue: ComponentProps[T] = undefined
) {
    const value = unref(valueRef);
    if (!value) {
        if (options.value.propsByComponentName[componentName]?.[propertyName]) {
            return options.value.propsByComponentName[componentName][propertyName];
        } else if (options.value.props?.[propertyName]) {
            return options.value.props[propertyName];
        }
    }

    return value ?? fallbackValue;
}

export function getComponentOptionsColorModeValue<T extends keyof ComponentProps>(
    options: ReturnType<typeof useOptions>['options'],
    componentName: string,
    propertyName: T,
    valueRef: MaybeRef<ComponentProps[T]>,
    fallbackValue: ComponentProps[T] = undefined
) {
    const value = getComponentOptionsValue(
        options,
        componentName,
        propertyName,
        valueRef,
        fallbackValue
    );
    if (typeof value === 'undefined') {
        return value;
    } else if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        isArray(value)
    ) {
        return value;
    } else if (options.value.colorMode.preference === 'system') {
        return typeof window !== 'undefined' &&
            window.matchMedia?.('(prefers-color-scheme: dark)').matches
            ? value.dark
            : value.light;
    } else if (options.value.colorMode.preference) {
        return value[options.value.colorMode.preference as keyof ColorModePropValue];
    }

    return value;
}

export function useComponentOptionsValue(
    componentName: string,
    propertyName: keyof ComponentProps,
    valueRef: MaybeRef<ComponentProps[keyof ComponentProps]>,
    fallbackValue: ComponentProps[keyof ComponentProps] = undefined
) {
    const { options } = useOptions();
    return computed(() =>
        getComponentOptionsValue(options, componentName, propertyName, valueRef, fallbackValue)
    );
}

export function useComponentOptionsColorModeValue(
    componentName: string,
    propertyName: keyof ComponentProps,
    valueRef: MaybeRef<ComponentProps[keyof ComponentProps]>,
    fallbackValue: ComponentProps[keyof ComponentProps] = undefined
) {
    const { options } = useOptions();
    return computed(() =>
        getComponentOptionsColorModeValue(
            options,
            componentName,
            propertyName,
            valueRef,
            fallbackValue
        )
    );
}
