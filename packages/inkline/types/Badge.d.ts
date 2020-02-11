import { BrandVariants, MonochromeVariants, StateVariants } from "./constants/variants";
import { SizePropertyMixin } from "./mixins/components/properties/SizePropertyMixin";
import { Size } from "./constants/size";
import { VariantPropertyMixin } from "./mixins/components/properties/VariantPropertyMixin";

export declare class IBadge implements SizePropertyMixin, VariantPropertyMixin {
    size?: Size;
    variant?: BrandVariants | MonochromeVariants | StateVariants;
}
