import { mount } from '@vue/test-utils';
import CheckableGroup from 'inkline/components/CheckableGroup';

describe('Components', () => {
    describe('CheckableGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(CheckableGroup, {
                methods: {
                    created: CheckableGroup.created
                }
            });
        });

        it('should be named correctly', () => {
            expect(CheckableGroup.name).toEqual('ICheckableGroup');
        });

        describe('props', () => {
            describe('value', () => {
               it('should be defined', () => {
                   expect(wrapper.vm).toHaveProperty('value');
               });
            });
        });

        describe('created()', () => {
           it('should add "change" listener', () => {
               const spy = jest.spyOn(wrapper.vm, '$on');

               wrapper.vm.created();

               expect(spy).toHaveBeenCalled();
               expect(spy).toHaveBeenCalledWith('change', expect.any(Function));
           });

           it('should emit "input" on "change"', () => {
               const spy = jest.spyOn(wrapper.vm, 'emitInput');

               wrapper.vm.$emit('change', true);

               expect(spy).toHaveBeenCalled();
               expect(spy).toHaveBeenCalledWith(true);
           });
        });
    });
});
