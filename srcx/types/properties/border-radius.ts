import * as CSS from 'csstype';
import { CornersProperty, CornersPropertyVariant } from './corners';
import { NumberPropertyVariant } from './number';

export type BorderRadiusProperty =
    | CSS.Property.BorderRadius
    | Partial<CornersProperty<CSS.Property.BorderRadius>>;

export type BorderRadiusPropertyVariant =
    | CornersPropertyVariant
    | NumberPropertyVariant
    | CSS.Property.BorderRadius;

export type ResolvedBorderRadiusProperty = CornersProperty<CSS.Property.BorderRadius>;
