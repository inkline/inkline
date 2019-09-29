import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {VariantPropertyMixin} from "./mixins/components/properties/VariantPropertyMixin";
import {PopupProviderMixin} from "./mixins/components/providers/PopupProviderMixin";
import {MonochromeVariants} from "./constants/variants";
import {Size} from "./constants/size";

export declare class IDropdownMenu implements SizePropertyMixin, VariantPropertyMixin, PopupProviderMixin {
    appendToBody: boolean;
    arrow: boolean;
    arrowOffset: number;
    offset: number;
    placement: string;
    popperOptions: any;
    popup: any;
    reference: any;
    size: Size;
    transformOrigin: boolean | string;
    variant: MonochromeVariants;
    value: boolean;
}
