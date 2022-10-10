import { mount } from '@vue/test-utils';
import { IBreadcrumb } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IBreadcrumb', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        const wrapper = mount(IBreadcrumb, {
            props
        });

        it('should be named correctly', () => {
            expect(IBreadcrumb.__name).toEqual('IBreadcrumb');
        });

        it('should render correctly', () => {
            expect(wrapper.exists()).toBeTruthy();
            expect(wrapper.element).toMatchSnapshot();
        });

        // describe('styling', () => {
        //     it('should add classes based on props', () => {
        //         expect(wrapper.element).toHaveClass(`-${props.color}`, `-${props.size}`);
        //     });
        // });

        // describe('computed', () => {
        //     describe('classes', () => {
        //         it('should add classes based on props', () => {
        //             expect(wrapper.element).toHaveClass(`-${props.color}`, `-${props.size}`);
        //         });
        //     });
        // });
    });
});
