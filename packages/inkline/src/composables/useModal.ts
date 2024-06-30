import {
    useAlert,
    useConfirm,
    useModalBuilder,
    usePrompt
} from '@inkline/inkline/composables/modals';
import type { ModalService } from '@inkline/inkline/types';

export function useModal(): ModalService & {
    alert: ReturnType<typeof useAlert>;
    confirm: ReturnType<typeof useConfirm>;
    prompt: ReturnType<typeof usePrompt>;
} {
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
