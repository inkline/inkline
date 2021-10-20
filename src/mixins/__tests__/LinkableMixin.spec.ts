import { LinkableMixin } from '@inkline/inkline/mixins';
import { render } from '@testing-library/vue';
import { $inkline } from '@inkline/inkline/__mocks__/globalProperties';

describe('mixins', () => {
    describe('LinkableMixin', () => {
        const Component = {
            name: 'Linkable',
            mixins: [LinkableMixin],
            template: '<a :is="isTag" />'
        };

        const mocks = {
            $inkline
        };

        it('should render correctly', () => {
            const wrapper = render(Component);

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('isTag', () => {
                it('should be <router-link> if to attribute', () => {
                    const wrapper = render(Component, {
                        global: {
                            mocks
                        },
                        props: { to: 'https://inkline.io' }
                    });

                    expect(wrapper.html()).toMatchSnapshot();
                    expect(wrapper.container.querySelector('[is="router-link"]')).toBeDefined();
                });

                it('should be <a> if href attribute', () => {
                    const wrapper = render(Component, {
                        global: {
                            mocks
                        },
                        props: { href: 'https://inkline.io' }
                    });

                    expect(wrapper.html()).toMatchSnapshot();
                    expect(wrapper.container.querySelector('[is="a"]')).toBeDefined();
                });

                it('should be <tag> if not href attribute', () => {
                    const wrapper = render(Component, {
                        global: {
                            mocks
                        },
                        props: {
                            tag: 'div',
                            href: 'https://inkline.io'
                        }
                    });

                    expect(wrapper.html()).toMatchSnapshot();
                    expect(wrapper.container.querySelector('[is="div"]')).toBeDefined();
                });
            });
        });
    });
});
