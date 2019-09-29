import {ModelProviderMixin} from "./mixins/forms/providers/ModelProviderMixin";
import {SchemaProviderMixin} from "./mixins/forms/providers/SchemaProviderMixin";
import {ClearablePropertyMixin} from "./mixins/forms/properties/ClearablePropertyMixin";
import {DisabledPropertyMixin} from "./mixins/forms/properties/DisabledPropertyMixin";
import {NamePropertyMixin} from "./mixins/forms/properties/NamePropertyMixin";
import {ReadonlyPropertyMixin} from "./mixins/forms/properties/ReadonlyPropertyMixin";
import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {TabIndexPropertyMixin} from "./mixins/components/properties/TabIndexPropertyMixin";
import {Size} from "./constants/size";

export declare class IInput implements ModelProviderMixin, SchemaProviderMixin, ClearablePropertyMixin, DisabledPropertyMixin, NamePropertyMixin, ReadonlyPropertyMixin, SizePropertyMixin, TabIndexPropertyMixin {
    clearable: boolean;
    disabled: boolean;
    name: string;
    parentForm: any;
    readonly: boolean;
    schema: any;
    size: Size;
    tabindex: number | string;
    value: string;
}
