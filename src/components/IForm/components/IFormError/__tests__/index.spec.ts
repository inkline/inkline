import { render } from '@testing-library/vue';
import { IFormError } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IFormError', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(IFormError.name).toEqual('IFormError');
        });

        it('should render correctly', () => {
            const wrapper = render(IFormError, { props });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
            });
        });
    });
});
