import {ClassesProviderMixin} from "./mixins/components/providers/ClassesProviderMixin";
import {AttributesProviderMixin} from "./mixins/components/providers/AttributesProviderMixin";
import {EmitProviderMixin} from "./mixins/components/providers/EmitProviderMixin";
import {PopupControlsProviderMixin} from "./mixins/components/providers/PopupControlsProviderMixin";
import {EmitFocusMethodMixin} from "./mixins/components/methods/EmitFocusMethodMixin";
import {VariantPropertyMixin} from "./mixins/components/properties/VariantPropertyMixin";
import {DisabledPropertyMixin} from "./mixins/components/properties/DisabledPropertyMixin";
import {MonochromeVariants} from "./constants/variants";

export declare class IDropdown implements AttributesProviderMixin, ClassesProviderMixin, EmitProviderMixin, PopupControlsProviderMixin, EmitFocusMethodMixin, VariantPropertyMixin, DisabledPropertyMixin {
    hideOnClick: boolean;
    placement: string;
    keymap: { [key: string]: string[] };
    onTriggerKeyDown(e: Event): void;
    onItemKeyDown(e: Event): void;
    onItemClick(action: any, instance: any): void;

    disabled: boolean;
    hideTimeout: number;
    showTimeout: number;
    trigger: string;
    variant: MonochromeVariants;
    addEvents(): void;
    classes(): Array<{ [p: string]: boolean }>;
    attributes(): { [p: string]: string };
    broadcast(parentComponentName: string, eventName: string, params: any): void;
    dispatch(childComponentName: string, eventName: string, params: any): void;
    emitBlur(event: Event): void;
    emitFocus(event: Event): void;
    hide(): void;
    initAriaAttributes(): void;
    initElements(): void;
    isDisabled(): boolean;
    onClick(): void;
    removeEvents(): void;
    show(): void;
}