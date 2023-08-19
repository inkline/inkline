import {
    useAlert,
    useConfirm,
    useModalBuilder,
    usePrompt
} from '@inkline/inkline/composables/modals';

export function useModal() {
    const builder = useModalBuilder();
    const alert = useAlert();
    const confirm = useConfirm();
    const prompt = usePrompt();

    return {
        ...builder,
        alert,
        confirm,
        prompt
    };
}
