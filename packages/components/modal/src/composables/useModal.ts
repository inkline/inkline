import { ModalService } from '../types';
import { useModalBuilder } from './useModalBuilder';
import { useConfirm } from './useConfirm';
import { useAlert } from './useAlert';
import { usePrompt } from './usePrompt';

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
