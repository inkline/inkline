export interface IKeymap {
    [key: string]: Array<number | string>
}

declare const keymap: IKeymap;

export { keymap };
