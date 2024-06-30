import { IconsPlugin } from '@inkline/inkline/plugins';
import { InklineIconsKey } from '@inkline/inkline/constants';
import * as inklineIcons from '@inkline/inkline/icons';

describe('IconsPlugin', () => {
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

        it('should register default inkline icons', () => {
            const app = createApp();

            IconsPlugin.install!(app as any, {
                icons: {
                    Icon: true
                }
            });

            expect(app.provide).toHaveBeenCalledWith(InklineIconsKey, {
                Icon: true,
                ...inklineIcons
            });
        });
    });
});
