import { ToastPlugin } from '@inkline/inkline/plugins';
import { createInklineService, defaultOptions } from '@inkline/inkline/plugin';

describe('ToastPlugin', () => {
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
            const container = document.querySelector('#inkline-toast-container');
            if (container) {
                container.remove();
            }
        });

        it('should add toast container', () => {
            const app = createApp();
            const inkline = createInklineService({ ...defaultOptions, colorMode: 'dark' });
            ToastPlugin.install!(app as any, { inkline });

            const toastContainer = document.body.querySelector('#inkline-toast-container');
            expect(toastContainer).toBeVisible();
            expect(toastContainer).toHaveAttribute('data-inkline-toast-container');
        });

        it('should not add toast container if existing', () => {
            const container = document.createElement('div');
            container.id = 'inkline-toast-container';
            document.body.appendChild(container);

            const app = createApp();
            const inkline = createInklineService({ ...defaultOptions, colorMode: 'dark' });
            ToastPlugin.install!(app as any, { inkline });

            expect(document.body.querySelectorAll('#inkline-toast-container')).toHaveLength(1);
        });
    });
});
