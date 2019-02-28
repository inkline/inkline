import { BrandVariants, MonochromeVariants, StateVariants } from "./constants/variants";
import { SizePropertyMixin } from "./mixins/components/properties/SizePropertyMixin";
import { Size } from "./constants/size";
import { VariantPropertyMixin } from "./mixins/components/properties/VariantPropertyMixin";
import { AttributesProviderMixin } from "./mixins/components/providers/AttributesProviderMixin";
import { ClassesProviderMixin } from "./mixins/components/providers/ClassesProviderMixin";

export declare class IBadge implements AttributesProviderMixin, ClassesProviderMixin, SizePropertyMixin, VariantPropertyMixin {
    size: Size;
    variant: BrandVariants | MonochromeVariants | StateVariants;
    attributes(): { [p: string]: string };
    classes(): Array<{ [p: string]: boolean }>;
}