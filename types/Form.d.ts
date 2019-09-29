import {DisabledPropertyMixin} from "./mixins/forms/properties/DisabledPropertyMixin";
import {LoadingPropertyMixin} from "./mixins/components/properties/LoadingPropertyMixin";
import {ReadonlyPropertyMixin} from "./mixins/forms/properties/ReadonlyPropertyMixin";
import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {NamePropertyMixin} from "./mixins/forms/properties/NamePropertyMixin";
import {Size} from "./constants/size";

export declare class IForm implements DisabledPropertyMixin, LoadingPropertyMixin, ReadonlyPropertyMixin, SizePropertyMixin, NamePropertyMixin {
    inline: boolean;
    schema: any;
    disabled: boolean;
    loading: boolean;
    name: string;
    readonly: boolean;
    size: Size;
}
