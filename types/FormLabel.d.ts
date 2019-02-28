import {ClassesProviderMixin} from "./mixins/components/providers/ClassesProviderMixin";
import {InjectParentFormProviderMixin} from "./mixins/forms/providers/InjectParentFormProviderMixin";
import {SizePropertyMixin} from "./mixins/components/properties/SizePropertyMixin";
import {Size} from "./constants/size";

export declare class IFormLabel implements ClassesProviderMixin, InjectParentFormProviderMixin, SizePropertyMixin{
    placement: string;
    focusInput(): void;

    parentForm: any;
    size: Size;
    classes(): Array<{ [p: string]: boolean }>;
}