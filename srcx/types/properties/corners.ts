import { NumberPropertyVariant } from './number';

export interface CornersProperty<T> {
    topLeft: T;
    topRight: T;
    bottomRight: T;
    bottomLeft: T;
    [key: string]: T;
}

export interface CornersPropertyVariant extends NumberPropertyVariant {
    topLeft?: NumberPropertyVariant | string;
    topRight?: NumberPropertyVariant | string;
    bottomRight?: NumberPropertyVariant | string;
    bottomLeft?: NumberPropertyVariant | string;

    [key: string]: NumberPropertyVariant | number | string | undefined;
}
