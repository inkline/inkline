import { IconController } from '@inkline/inkline/controllers';
import { SvgNode } from '@inkline/inkline/types';

describe('Controllers', () => {
    describe('IconController', () => {
        const iconName = 'ink-circle';
        const iconMarkup: SvgNode = {
            name: 'svg',
            type: '',
            value: '',
            attributes: {},
            children: [
                {
                    name: 'g',
                    type: '',
                    value: '',
                    attributes: {
                        width: '10',
                        height: '10'
                    },
                    children: [
                        {
                            name: 'path',
                            type: '',
                            value: '',
                            attributes: {
                                d: 'M0 0'
                            },
                            children: []
                        }
                    ]
                }
            ]
        };

        beforeEach(() => {
            IconController.icons = {};
        });

        describe('add()', () => {
            it('should register icon', () => {
                IconController.add(iconName, iconMarkup);

                expect(IconController.icons).toHaveProperty(iconName);
                expect(IconController.icons[iconName]).toEqual(iconMarkup);
            });
        });

        describe('addMultiple()', () => {
            it('should register multiple icons', () => {
                IconController.addMultiple({
                    'ink-circle': iconMarkup,
                    'ink-square': iconMarkup
                });

                expect(IconController.icons).toHaveProperty('ink-circle');
                expect(IconController.icons['ink-circle']).toEqual(iconMarkup);

                expect(IconController.icons).toHaveProperty('ink-square');
                expect(IconController.icons['ink-square']).toEqual(iconMarkup);
            });
        });
    });
});
