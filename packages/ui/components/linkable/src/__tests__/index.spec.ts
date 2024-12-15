import { render } from '@testing-library/vue';
import Linkable from '../Linkable.vue';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Linkable', () => {
        const stubs = {
            RouterLink: true
        };

        const props = {
            href: 'https://example.com',
            tag: 'div',
            to: '/home'
        };

        it('should be named correctly', () => {
            expect(Linkable.name).toEqual('Linkable');
        });

        it('should render correctly', () => {
            const wrapper = render(Linkable, {
                props,
                global: {
                    stubs,
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });
            expect(wrapper.html()).toMatchSnapshot();
        });

        it('should render as a router link when "to" prop is provided', () => {
            const wrapper = render(Linkable, {
                props: {
                    to: '/home'
                },
                global: {
                    stubs,
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });
            expect(wrapper.container.firstChild).toHaveAttribute('role', 'link');
        });

        it('should render as an anchor link when "href" prop is provided', () => {
            const wrapper = render(Linkable, {
                props: {
                    href: 'https://example.com'
                },
                global: {
                    stubs,
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });
            expect(wrapper.container.firstChild).toHaveAttribute('href', 'https://example.com');
        });

        it('should render as a button when "tag" prop is "button"', () => {
            const wrapper = render(Linkable, {
                props: {
                    tag: 'button'
                },
                global: {
                    stubs,
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });
            expect(wrapper.container.firstChild).toHaveAttribute('role', 'link');
        });

        it('should render as a custom tag when "tag" prop is provided', () => {
            const wrapper = render(Linkable, {
                props: {
                    tag: 'div'
                },
                global: {
                    stubs,
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });
            expect(wrapper.container.firstChild!.nodeName).toBe('DIV');
        });
    });
});
