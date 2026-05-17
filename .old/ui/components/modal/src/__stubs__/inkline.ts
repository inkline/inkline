export * from '../index';

export function useModal() {
    return {
        show(..._args: unknown[]) {},
        hide(..._args: unknown[]) {},
        alert(..._args: unknown[]) {},
        confirm(..._args: unknown[]) {
            return Promise.resolve(true);
        },
        prompt<T>(..._args: unknown[]): T {
            return {} as T;
        }
    };
}

export function useToast() {
    return {
        show(..._args: unknown[]) {},
        hide(..._args: unknown[]) {}
    };
}

export const Icon = 'i';
export const FormGroup = '<div/>';
export const Button = '<button/>';
