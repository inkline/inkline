import { createModalService } from '../createModalService';
import { createEventBus } from '@inkline/utils';

describe('Services', () => {
    describe('createModalService()', () => {
        it('should emit "show" event with correct options when show is called', () => {
            const eventBus = createEventBus();
            const eventBusEmitSpy = vi.spyOn(eventBus, 'emit');
            const modalService = createModalService(eventBus);
            const options = { id: 'test' };

            modalService.show(options);
            expect(eventBusEmitSpy).toHaveBeenCalledWith('show', options);
        });

        it('should emit "hide" event with correct options when hide is called', () => {
            const eventBus = createEventBus();
            const eventBusEmitSpy = vi.spyOn(eventBus, 'emit');
            const modalService = createModalService(eventBus);
            const options = { id: 'test' };

            modalService.hide(options);
            expect(eventBusEmitSpy).toHaveBeenCalledWith('hide', options);
        });

        it('should emit "hideAll" event with empty object when hideAll is called', () => {
            const eventBus = createEventBus();
            const eventBusEmitSpy = vi.spyOn(eventBus, 'emit');
            const modalService = createModalService(eventBus);

            modalService.hideAll();
            expect(eventBusEmitSpy).toHaveBeenCalledWith('hideAll', {});
        });
    });
});
