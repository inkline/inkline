import {ClassesProviderMixin} from "./mixins/components/providers/ClassesProviderMixin";
import {VariantPropertyMixin} from "./mixins/components/properties/VariantPropertyMixin";
import {Size} from "./constants/size";
import {BrandVariants, MonochromeVariants, StateVariants} from "./constants/variants";

export declare class IProgressBar implements ClassesProviderMixin, VariantPropertyMixin {
    size: Size;
    variant: BrandVariants | MonochromeVariants | StateVariants;
    min: number;
    max: number;
    value: number;
    progress: number;
    style: string;

    classes(): Array<{ [p: string]: boolean }>;
}