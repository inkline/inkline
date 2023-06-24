import { render } from '@testing-library/vue';
import { IRenderResolver } from '@inkline/inkline/components/utils/IRenderResolver';
import { h } from 'vue';

describe('Components', () => {
    describe('IRenderResolver', () => {
        it('should render component render function', () => {
            const props = {
                data: () => h('div', 'example')
            };

            const wrapper = render(IRenderResolver, {
                props
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        it('should render string', () => {
            const props = {
                data: 'example'
            };

            const wrapper = render(IRenderResolver, {
                props
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        it('should render string using specified tag', () => {
            const props = {
                data: 'example',
                tag: 'strong'
            };

            const wrapper = render(IRenderResolver, {
                props
            });

            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
