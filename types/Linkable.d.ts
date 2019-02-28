import {ActivePropertyMixin} from "./mixins/components/properties/ActivePropertyMixin";
import {AttributesProviderMixin} from "./mixins/components/providers/AttributesProviderMixin";
import {ClassesProviderMixin} from "./mixins/components/providers/ClassesProviderMixin";

export declare class ILinkable implements ActivePropertyMixin, AttributesProviderMixin, ClassesProviderMixin {
    active: boolean;
    activeClass: string;
    tag: 'string';
    isTag (): string;
    attributes(): { [p: string]: string };
    classes(): Array<{ [p: string]: boolean }>;
}