import { BrandVariants, StateVariants } from "./constants/variants";
import { SizePropertyMixin } from "./mixins/components/properties/SizePropertyMixin";
import { Size } from "./constants/size";
import { VariantPropertyMixin } from "./mixins/components/properties/VariantPropertyMixin";

export declare class IAlert implements SizePropertyMixin, VariantPropertyMixin {
    dismissible: boolean;
    dismissLabel: string;
    show: boolean;
    size: Size;
    variant: BrandVariants | StateVariants;
}
