import {ClassesProviderMixin} from "./mixins/components/providers/ClassesProviderMixin";
import {AttributesProviderMixin} from "./mixins/components/providers/AttributesProviderMixin";
import {DisabledPropertyMixin} from "./mixins/components/properties/DisabledPropertyMixin";

export declare class IListGroupItem implements AttributesProviderMixin, ClassesProviderMixin, DisabledPropertyMixin {
    disabled: boolean;
    classes(): Array<{ [p: string]: boolean }>;
    attributes(): { [p: string]: string };
    isDisabled(): boolean;
}