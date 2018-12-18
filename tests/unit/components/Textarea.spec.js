import { shallowMount } from '@vue/test-utils';
import Textarea from 'inkline/components/Textarea';

describe('Components', () => {
    describe('Textarea', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Textarea);
        });

        it('should be named correctly', () => {
            expect(Textarea.name).toEqual('ITextarea');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
