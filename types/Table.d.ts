import {BrandVariants, MonochromeVariants, StateVariants} from "./constants/variants";
import { SizePropertyMixin } from "./mixins/components/properties/SizePropertyMixin";
import { Size } from "./constants/size";
import { AttributesProviderMixin } from "./mixins/components/providers/AttributesProviderMixin";
import { ClassesProviderMixin } from "./mixins/components/providers/ClassesProviderMixin";
import { VariantPropertyMixin } from "./mixins/components/properties/VariantPropertyMixin";

export declare class ITable implements ClassesProviderMixin, VariantPropertyMixin {
    bordered: boolean;
    striped: boolean;
    hover: boolean;
    responsive: boolean | string;
    variant: BrandVariants | StateVariants | MonochromeVariants;

    classes(): Array<{ [p: string]: boolean }>;
}
