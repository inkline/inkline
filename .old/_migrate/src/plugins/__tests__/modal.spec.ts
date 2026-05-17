import { ModalPlugin } from '@inkline/inkline/plugins';
import { createInklineService, defaultOptions } from '@inkline/inkline/plugin';

describe('ModalPlugin', () => {
    describe('install()', () => {
        const createApp = () => ({
            add: vi.fn(),
            use: vi.fn(),
            provide: vi.fn(),
            component: vi.fn(),
            config: {
                globalProperties: {}
            }
        });

        afterEach(() => {
            const container = document.querySelector('#inkline-modal-container');
            if (container) {
                container.remove();
            }
        });

        it('should add modal container', () => {
            const app = createApp();
            const inkline = createInklineService({ ...defaultOptions, colorMode: 'dark' });
            ModalPlugin.install!(app as any, { inkline });

            const modalContainer = document.body.querySelector('#inkline-modal-container');
            expect(modalContainer).toBeVisible();
            expect(modalContainer).toHaveAttribute('data-inkline-modal-container');
        });

        it('should not add modal container if existing', () => {
            const container = document.createElement('div');
            container.id = 'inkline-modal-container';
            document.body.appendChild(container);

            const app = createApp();
            const inkline = createInklineService({ ...defaultOptions, colorMode: 'dark' });
            ModalPlugin.install!(app as any, { inkline });

            expect(document.body.querySelectorAll('#inkline-modal-container')).toHaveLength(1);
        });
    });
});
