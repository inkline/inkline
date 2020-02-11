import {ModelGroupProviderMixin} from "./mixins/forms/providers/ModelGroupProviderMixin";
import {CustomPropertyMixin} from "./mixins/components/properties/CustomPropertyMixin";
import {ReadonlyPropertyMixin} from "./mixins/forms/properties/ReadonlyPropertyMixin";
import {DisabledPropertyMixin} from "./mixins/forms/properties/DisabledPropertyMixin";
import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {TabIndexPropertyMixin} from "./mixins/components/properties/TabIndexPropertyMixin";
import {Size} from "./constants/size";

export declare class ICheckable implements ModelGroupProviderMixin, CustomPropertyMixin, DisabledPropertyMixin, ReadonlyPropertyMixin, SizePropertyMixin, TabIndexPropertyMixin {
    custom?: boolean;
    disabled?: boolean;
    parentForm?: any;
    readonly?: boolean;
    size?: Size;
    tabindex?: number | string;
    value: Array<string | boolean> | boolean | string;
}
