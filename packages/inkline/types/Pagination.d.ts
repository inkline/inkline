import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {VariantPropertyMixin} from "./mixins/components/properties/VariantPropertyMixin";
import {MonochromeVariants} from "./constants/variants";
import {Size} from "./constants/size";

export declare class IPagination implements SizePropertyMixin, VariantPropertyMixin {
    itemsPerPage: number;
    items: number;
    limit: number | { [key: string]: number };
    value: number;
    quickLink: boolean;
    size: Size;
    variant: MonochromeVariants;
}
