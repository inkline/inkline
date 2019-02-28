import {AttributesProviderMixin} from "./mixins/components/providers/AttributesProviderMixin";
import {ClassesProviderMixin} from "./mixins/components/providers/ClassesProviderMixin";
import {VariantPropertyMixin} from "./mixins/components/properties/VariantPropertyMixin";
import {MonochromeVariants} from "./constants/variants";

export declare class ICollapsible implements AttributesProviderMixin, ClassesProviderMixin, VariantPropertyMixin {
    accordion: boolean;
    active: number[] | string[] | string | number;
    variant: MonochromeVariants;
    onItemClick (item: any): void;
    attributes(): { [p: string]: string };
    classes(): Array<{ [p: string]: boolean }>;
}