import { render } from '@testing-library/vue';
import { BaseComponent } from '../index';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('BaseComponent', () => {
        const props = {
            variant: 'default',
        };

        it('should be named correctly', () => {
            expect(BaseComponent.name).toEqual('BaseComponent');
        });

        it('should render correctly', () => {
            const wrapper = render(BaseComponent, {
                props,
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('tag', () => {
            it('should render card using article tag', () => {
                const wrapper = render(BaseComponent, {
                    props: {
                        ...props,
                        tag: 'article'
                    },
                    global: {
                        provide: {
                            ...createTestingInklineOptionsProvide()
                        }
                    }
                });

                expect(wrapper.container.firstChild!.nodeName).toBe('ARTICLE');
            });
        });
    });
});
