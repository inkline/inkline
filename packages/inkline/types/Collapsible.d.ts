import {VariantPropertyMixin} from "./mixins/components/properties/VariantPropertyMixin";
import {MonochromeVariants} from "./constants/variants";

export declare class ICollapsible implements VariantPropertyMixin {
    accordion: boolean;
    active: number[] | string[] | string | number;
    variant: MonochromeVariants;
}
