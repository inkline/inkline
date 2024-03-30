import { NumberPropertyVariant } from './number';

export interface SidesProperty<T> {
    top: T;
    right: T;
    bottom: T;
    left: T;
    [key: string]: T;
}

export interface SidesPropertyVariant extends NumberPropertyVariant {
    top?: NumberPropertyVariant | string;
    right?: NumberPropertyVariant | string;
    bottom?: NumberPropertyVariant | string;
    left?: NumberPropertyVariant | string;

    [key: string]: NumberPropertyVariant | number | string | undefined;
}
