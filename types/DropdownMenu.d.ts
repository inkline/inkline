import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {VariantPropertyMixin} from "./mixins/components/properties/VariantPropertyMixin";
import {ClassesProviderMixin} from "./mixins/components/providers/ClassesProviderMixin";
import {PopupProviderMixin} from "./mixins/components/providers/PopupProviderMixin";
import {MonochromeVariants} from "./constants/variants";
import {Size} from "./constants/size";

export declare class IDropdownMenu implements SizePropertyMixin, VariantPropertyMixin, ClassesProviderMixin, PopupProviderMixin {
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

    beforeDestroy(): void;
    classes(): Array<{ [p: string]: boolean }>;
    createPopper(): void;
    deactivated(): void;
    destroyPopper(): void;
    doDestroy(): void;
    resetTransformOrigin(): void;
    updatePopper(): void;

}