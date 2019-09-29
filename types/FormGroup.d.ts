import {DisabledPropertyMixin} from "./mixins/forms/properties/DisabledPropertyMixin";
import {LoadingPropertyMixin} from "./mixins/components/properties/LoadingPropertyMixin";
import {NamePropertyMixin} from "./mixins/forms/properties/NamePropertyMixin";
import {ReadonlyPropertyMixin} from "./mixins/forms/properties/ReadonlyPropertyMixin";
import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {TabIndexPropertyMixin} from "./mixins/components/properties/TabIndexPropertyMixin";
import {Size} from "./constants/size";

export declare class IFormGroup implements DisabledPropertyMixin, LoadingPropertyMixin, NamePropertyMixin, ReadonlyPropertyMixin, SizePropertyMixin, TabIndexPropertyMixin {
    inline: boolean;
    validate: boolean;
    disabled: boolean;
    loading: boolean;
    name: string;
    parentForm: any;
    readonly: boolean;
    size: Size;
    tabindex: number | string;
}
