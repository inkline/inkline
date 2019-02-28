import {ClassesProviderMixin} from "./mixins/components/providers/ClassesProviderMixin";
import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {VariantPropertyMixin} from "./mixins/components/properties/VariantPropertyMixin";
import {MonochromeVariants} from "./constants/variants";
import {Size} from "./constants/size";

export declare class IPagination implements ClassesProviderMixin, SizePropertyMixin, VariantPropertyMixin {
    itemsPerPage: number;
    items: number;
    limit: number;
    value: number;
    pageCount(): number;
    showQuickPrevious(): boolean;
    showQuickNext(): boolean;
    pages(): number[];
    next(): void;
    quickNext(): void;
    previous(): void;
    quickPrevious(): void;
    onClick(): void;

    size: Size;
    variant: MonochromeVariants;
    classes(): Array<{ [p: string]: boolean }>;
}