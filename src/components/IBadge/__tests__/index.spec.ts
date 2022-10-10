import { mount } from '@vue/test-utils';
import { IBadge } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IBadge', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        const wrapper = mount(IBadge, {
            props
        });

        it('should be named correctly', () => {
            expect(IBadge.__name).toEqual('IBadge');
        });

        it('should render correctly', () => {
            expect(wrapper.exists()).toBeTruthy();
            expect(wrapper.element).toMatchSnapshot();
        });

        describe('styling', () => {
            it('should add classes based on props', () => {
                expect(wrapper.element).toHaveClass(`-${props.color}`, `-${props.size}`);
            });
        });
    });
});
