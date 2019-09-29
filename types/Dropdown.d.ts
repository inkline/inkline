import {PopupControlsProviderMixin} from "./mixins/components/providers/PopupControlsProviderMixin";
import {VariantPropertyMixin} from "./mixins/components/properties/VariantPropertyMixin";
import {DisabledPropertyMixin} from "./mixins/components/properties/DisabledPropertyMixin";
import {MonochromeVariants} from "./constants/variants";

export declare class IDropdown implements PopupControlsProviderMixin, VariantPropertyMixin, DisabledPropertyMixin {
    hideOnClick: boolean;
    placement: string;
    keymap: { [key: string]: string[] };
    disabled: boolean;
    hideTimeout: number;
    showTimeout: number;
    trigger: string;
    variant: MonochromeVariants;
    value: boolean;
}
