import { ILinkable } from "./Linkable";
import { Variants } from "./constants/variants";
import { AttributesProviderMixin } from "./mixins/components/providers/AttributesProviderMixin";
import { ClassesProviderMixin } from "./mixins/components/providers/ClassesProviderMixin";
import { InjectParentFormProviderMixin } from "./mixins/forms/providers/InjectParentFormProviderMixin";
import { EmitClickMethodMixin } from "./mixins/components/methods/EmitClickMethodMixin";
import { EmitFocusMethodMixin } from "./mixins/components/methods/EmitFocusMethodMixin";
import { EmitHoverMethodMixin } from "./mixins/components/methods/EmitHoverMethodMixin";
import { LoadingPropertyMixin } from "./mixins/components/properties/LoadingPropertyMixin";
import { SizePropertyMixin } from "./mixins/components/properties/SizePropertyMixin";
import { TabIndexPropertyMixin } from "./mixins/components/properties/TabIndexPropertyMixin";
import { VariantPropertyMixin } from "./mixins/components/properties/VariantPropertyMixin";
import { DisabledPropertyMixin } from "./mixins/forms/properties/DisabledPropertyMixin";
import { Size } from "./constants/size";

export declare class IButton extends ILinkable implements AttributesProviderMixin, ClassesProviderMixin, InjectParentFormProviderMixin, EmitClickMethodMixin, EmitFocusMethodMixin, EmitHoverMethodMixin, DisabledPropertyMixin, LoadingPropertyMixin, SizePropertyMixin, TabIndexPropertyMixin, VariantPropertyMixin {
    block: boolean;
    circle: boolean;
    link: boolean;
    outline: boolean;

    disabled: boolean;
    loading: boolean;
    parentForm: any;
    size: Size;
    tabindex: number | string;
    variant: Variants;
    attributes(): { [p: string]: string };
    classes(): Array<{ [p: string]: boolean }>;
    emitBlur(event: Event): void;
    emitClick(event: Event): void;
    emitFocus(event: Event): void;
    emitMouseEnter(event: Event): void;
    emitMouseLeave(event: Event): void;
    isDisabled(): boolean;
    tabIndex(): number | string;
}