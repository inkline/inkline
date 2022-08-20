import * as CSS from 'csstype';
import { SidesProperty, SidesPropertyVariant } from './sides';
import { NumberPropertyVariant } from './number';

export type PaddingProperty = CSS.Property.Padding | CSS.Property.Padding[] | Partial<SidesProperty<CSS.Property.Padding>>;

export type PaddingPropertyVariant = SidesPropertyVariant | NumberPropertyVariant | CSS.Property.Padding;

export interface ResolvedPaddingProperty {
    top: CSS.Property.PaddingTop;
    right: CSS.Property.PaddingRight;
    bottom: CSS.Property.PaddingBottom;
    left: CSS.Property.PaddingLeft;
    [key: string]: CSS.Property.Padding;
}
