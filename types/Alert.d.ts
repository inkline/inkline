import { BrandVariants, StateVariants } from "./constants/variants";
import { SizePropertyMixin } from "./mixins/components/properties/SizePropertyMixin";
import { Size } from "./constants/size";
import { AttributesProviderMixin } from "./mixins/components/providers/AttributesProviderMixin";
import { ClassesProviderMixin } from "./mixins/components/providers/ClassesProviderMixin";
import { VariantPropertyMixin } from "./mixins/components/properties/VariantPropertyMixin";

export declare class IAlert implements AttributesProviderMixin, ClassesProviderMixin, SizePropertyMixin, VariantPropertyMixin {
    show: boolean;
    dismissible: boolean;
    dismissLabel: string;
    dismiss (): void;
    onShowChange (): void;

    size: Size;
    variant: BrandVariants | StateVariants;
    attributes(): { [p: string]: string };
    classes(): Array<{ [p: string]: boolean }>;
}