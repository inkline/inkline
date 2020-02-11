import {BrandVariants, MonochromeVariants, StateVariants} from "./constants/variants";
import { ClassesProviderMixin } from "./mixins/components/providers/ClassesProviderMixin";
import { VariantPropertyMixin } from "./mixins/components/properties/VariantPropertyMixin";

export declare class ITable implements VariantPropertyMixin {
    bordered?: boolean;
    striped?: boolean;
    hover?: boolean;
    responsive?: boolean | string;
    variant?: BrandVariants | StateVariants | MonochromeVariants;
}
