import {VariantPropertyMixin} from "./mixins/components/properties/VariantPropertyMixin";
import {BrandVariants, MonochromeVariants, StateVariants} from "./constants/variants";

export declare class IProgressBar implements VariantPropertyMixin {
    variant?: BrandVariants | MonochromeVariants | StateVariants;
    min?: number;
    max?: number;
    value: number;
}
