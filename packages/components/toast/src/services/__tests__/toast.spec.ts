import { createToastService } from '../createToastService';
import { createEventBus } from '@inkline/utils';

describe('Services', () => {
    describe('createToastService()', () => {
        it('should emit "show" event with correct options when show is called', () => {
            const eventBus = createEventBus();
            const eventBusEmitSpy = vi.spyOn(eventBus, 'emit');
            const toastService = createToastService(eventBus);
            const options = { id: 'test' };

            toastService.show(options);
            expect(eventBusEmitSpy).toHaveBeenCalledWith('show', options);
        });

        it('should emit "hide" event with correct options when hide is called', () => {
            const eventBus = createEventBus();
            const eventBusEmitSpy = vi.spyOn(eventBus, 'emit');
            const toastService = createToastService(eventBus);
            const options = { id: 'test' };

            toastService.hide(options);
            expect(eventBusEmitSpy).toHaveBeenCalledWith('hide', options);
        });

        it('should emit "hideAll" event with empty object when hideAll is called', () => {
            const eventBus = createEventBus();
            const eventBusEmitSpy = vi.spyOn(eventBus, 'emit');
            const toastService = createToastService(eventBus);

            toastService.hideAll();
            expect(eventBusEmitSpy).toHaveBeenCalledWith('hideAll', {});
        });
    });
});
