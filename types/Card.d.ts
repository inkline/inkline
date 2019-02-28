import { BasicVariants, BrandVariants, MonochromeVariants, NeutralVariants, StateVariants } from "./constants/variants";
import { AttributesProviderMixin } from "./mixins/components/providers/AttributesProviderMixin";
import { ClassesProviderMixin } from "./mixins/components/providers/ClassesProviderMixin";
import { SizePropertyMixin } from "./mixins/components/properties/SizePropertyMixin";
import { VariantPropertyMixin } from "./mixins/components/properties/VariantPropertyMixin";
import { Size } from "./constants/size";

export declare class ICard implements AttributesProviderMixin,  ClassesProviderMixin, SizePropertyMixin, VariantPropertyMixin {
    variant: BasicVariants | BrandVariants | MonochromeVariants | NeutralVariants | StateVariants;
    size: Size;
    attributes(): { [p: string]: string };
    classes(): Array<{ [p: string]: boolean }>;
}