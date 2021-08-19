export interface ElementEvent extends Event {
    target: HTMLElement;
    relatedTarget: HTMLElement;
}

export interface InputElementEvent extends Event {
    target: HTMLInputElement;
    relatedTarget: HTMLInputElement;
}
