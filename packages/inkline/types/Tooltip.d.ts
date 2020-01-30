import {PopupProviderMixin} from "./mixins/components/providers/PopupProviderMixin";
import {PopupControlsProviderMixin} from "./mixins/components/providers/PopupControlsProviderMixin";
import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {VariantPropertyMixin} from "./mixins/components/properties/VariantPropertyMixin";
import {DisabledPropertyMixin} from "./mixins/components/properties/DisabledPropertyMixin";
import {Size} from "./constants/size";
import {MonochromeVariants} from "./constants/variants";

export declare class ITooltip implements PopupProviderMixin, PopupControlsProviderMixin, SizePropertyMixin, VariantPropertyMixin, DisabledPropertyMixin {
    appendToBody: boolean;
    arrow: boolean;
    arrowOffset: number;
    disabled: boolean;
    hideTimeout: number;
    offset: number;
    placement: string;
    popperOptions: any;
    popup: any;
    reference: any;
    showTimeout: number;
    size: Size;
    transformOrigin: boolean | string;
    trigger: string | string[];
    value: boolean;
    variant: MonochromeVariants;
}
