import { shallowMount } from '@vue/test-utils';
import { ITextarea } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('ITextarea', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(ITextarea);
        });

        it('should be named correctly', () => {
            expect(ITextarea.name).toEqual('ITextarea');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
