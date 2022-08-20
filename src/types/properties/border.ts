import * as CSS from 'csstype';
import { SidesProperty } from './sides';

export interface Border {
    width: CSS.Property.BorderWidth;
    style: CSS.Property.BorderStyle;
    color: CSS.Property.BorderColor;
    [key: string]: CSS.Property.BorderWidth | CSS.Property.BorderStyle | CSS.Property.BorderColor;
}

export type BorderProperty = CSS.Property.Border | Border | Partial<SidesProperty<Border>>

export type ResolvedBorderProperty = SidesProperty<Border>;
