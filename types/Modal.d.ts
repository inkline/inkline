import {AttributesProviderMixin} from "./mixins/components/providers/AttributesProviderMixin";
import {ClassesProviderMixin} from "./mixins/components/providers/ClassesProviderMixin";
import {EmitFocusMethodMixin} from "./mixins/components/methods/EmitFocusMethodMixin";
import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {VariantPropertyMixin} from "./mixins/components/properties/VariantPropertyMixin";
import {DisabledPropertyMixin} from "./mixins/components/properties/DisabledPropertyMixin";
import {BrandVariants, MonochromeVariants, StateVariants} from "./constants/variants";
import {Size} from "./constants/size";

export declare class IModal implements AttributesProviderMixin, ClassesProviderMixin, EmitFocusMethodMixin, SizePropertyMixin, VariantPropertyMixin, DisabledPropertyMixin {
    transition: string;
    closeOnPressEscape: boolean;
    showClose: boolean;
    value: boolean;
    show(): void;
    hide(): void;
    visible(): boolean;

    disabled: boolean;
    size: Size;
    variant: BrandVariants | MonochromeVariants | StateVariants;
    attributes(): { [p: string]: string };
    classes(): Array<{ [p: string]: boolean }>;
    emitBlur(event: Event): void;
    emitFocus(event: Event): void;
    isDisabled(): boolean;
}