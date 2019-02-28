import { AttributesProviderMixin } from "./mixins/components/providers/AttributesProviderMixin";
import { ClassesProviderMixin } from "./mixins/components/providers/ClassesProviderMixin";
import { InjectParentFormProviderMixin } from "./mixins/forms/providers/InjectParentFormProviderMixin";
import { DisabledPropertyMixin } from "./mixins/forms/properties/DisabledPropertyMixin";
import { SizePropertyMixin } from "./mixins/components/properties/SizePropertyMixin";
import { TabIndexPropertyMixin } from "./mixins/components/properties/TabIndexPropertyMixin";
import { Size } from "./constants/size";

export declare class IButtonGroup implements AttributesProviderMixin, ClassesProviderMixin, InjectParentFormProviderMixin, DisabledPropertyMixin, SizePropertyMixin, TabIndexPropertyMixin {
    vertical: boolean;

    disabled: boolean;
    parentForm: any;
    size: Size;
    tabindex: number | string;
    attributes(): { [p: string]: string };
    classes(): Array<{ [p: string]: boolean }>;
    isDisabled(): boolean;
    tabIndex(): number | string;
}