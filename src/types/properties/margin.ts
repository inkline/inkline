import * as CSS from 'csstype';
import { SidesProperty, SidesPropertyVariant } from './sides';
import { NumberPropertyVariant } from './number';

export type MarginProperty =
    | CSS.Property.Margin
    | CSS.Property.Margin[]
    | Partial<SidesProperty<CSS.Property.Margin>>;

export type MarginPropertyVariant =
    | SidesPropertyVariant
    | NumberPropertyVariant
    | CSS.Property.Margin;

export interface ResolvedMarginProperty {
    top: CSS.Property.MarginTop;
    right: CSS.Property.MarginRight;
    bottom: CSS.Property.MarginBottom;
    left: CSS.Property.MarginLeft;
    [key: string]: CSS.Property.Margin;
}
