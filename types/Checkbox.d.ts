import {ICheckable} from "./Checkable";

export declare class ICheckbox extends ICheckable {
    value: boolean | string;
    indeterminate: boolean;
    checked (): boolean;
}