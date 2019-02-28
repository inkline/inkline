import {AttributesProviderMixin} from "./mixins/components/providers/AttributesProviderMixin";
import {ClassesProviderMixin} from "./mixins/components/providers/ClassesProviderMixin";
import {VariantPropertyMixin} from "./mixins/components/properties/VariantPropertyMixin";
import {MonochromeVariants} from "./constants/variants";
import {EmitProviderMixin} from "./mixins/components/providers/EmitProviderMixin";
import {ActiveClassPropertyMixin} from "./mixins/components/properties/ActiveClassPropertyMixin";

export declare class ICollapsibleItem implements AttributesProviderMixin, ClassesProviderMixin, EmitProviderMixin, ActiveClassPropertyMixin {
    title: string;
    id: string;
    active (): boolean;
    onClick (): void;

    activeClass: string;
    attributes(): { [p: string]: string };
    broadcast(parentComponentName: string, eventName: string, params: any): void;
    classes(): Array<{ [p: string]: boolean }>;
    dispatch(childComponentName: string, eventName: string, params: any): void;
}