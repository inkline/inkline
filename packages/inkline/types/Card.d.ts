import { BasicVariants, BrandVariants, MonochromeVariants, NeutralVariants, StateVariants } from "./constants/variants";
import { SizePropertyMixin } from "./mixins/components/properties/SizePropertyMixin";
import { VariantPropertyMixin } from "./mixins/components/properties/VariantPropertyMixin";
import { Size } from "./constants/size";

export declare class ICard implements SizePropertyMixin, VariantPropertyMixin {
    variant?: BasicVariants | BrandVariants | MonochromeVariants | NeutralVariants | StateVariants;
    size?: Size;
}
