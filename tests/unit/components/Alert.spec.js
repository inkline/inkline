import { mount } from '@vue/test-utils';
import Alert from 'inkline/components/Alert';

describe('Components', () => {
    describe('Alert', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(Alert, {
                methods: {
                    mounted: Alert.mounted,
                    created: Alert.created
                }
            });
        });

        it('should render correctly', () => {
            expect(wrapper.$el).toMatchSnapshot();
        });

        describe('props', () => {
           describe('show', () => {
               it('should be defined', () => {
                   expect(wrapper.vm.show).toBeDefined();
                   expect(wrapper.vm.show).toEqual(true);
               });
           });

            describe('dismissible', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.dismissible).toBeDefined();
                    expect(wrapper.vm.dismissible).toEqual(false);
                });
            });

            describe('dismissLabel', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.dismissLabel).toBeDefined();
                    expect(wrapper.vm.dismissLabel).toEqual('×');
                });
            });
        });

        describe('methods', () => {
            describe('dismiss()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.dismiss).toBeDefined();
                });

                it('should set dismissed to true', () => {
                    expect(wrapper.vm.dismissed).toEqual(false);

                    wrapper.vm.dismiss();

                    expect(wrapper.vm.dismissed).toEqual(true);
                });

                it('should emit "dismiss" event', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.vm.dismiss();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('dismiss');
                });

                it('should emit "input" event', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.vm.dismiss();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('input', false);
                });
            });

            describe('onShowChange()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.dismiss).toBeDefined();
                });

                it('should set dismissed to false', () => {
                    wrapper.setData({ dismissed: true });
                    wrapper.vm.onShowChange();

                    expect(wrapper.vm.dismissed).toEqual(false);
                });
            });
        });

        describe('watch', () => {
            describe('show', () => {
                it('should call onShowChange() when it changes', () => {
                    const spy = jest.spyOn(wrapper.vm, 'onShowChange');

                    wrapper.setProps({ show: 'newvalue' });

                    expect(spy).toHaveBeenCalled();
                });
            });
        });

        describe('mounted', () => {
            it('should be defined', () => {
                expect(Alert.mounted).toBeDefined();
            });

            it('should call onShowChange() when mounted', () => {
                const spy = jest.spyOn(wrapper.vm, 'onShowChange');

                wrapper.vm.mounted();

                expect(spy).toHaveBeenCalled();
            });
        });

        describe('created', () => {
            it('should be defined', () => {
                expect(Alert.created).toBeDefined();
            });

            // it('should add class rules to classes provider', () => {
            //     const spy = jest.spyOn(wrapper.vm.classesProvider, 'add');
            //     const classRulesLength = wrapper.vm.classesProvider.length;
            //
            //     wrapper.vm.created();
            //
            //     expect(spy).toHaveBeenCalled();
            //     expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 1);
            // });
            //
            // it('should add "-dismissible" class if "dismissible"', () => {
            //     const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length  - 1];
            //
            //     expect(rule()).toEqual(expect.objectContaining({
            //         '-dismissible': false
            //     }));
            //
            //     wrapper.setProps({
            //         dismissible: true
            //     });
            //
            //     expect(rule()).toEqual(expect.objectContaining({
            //         '-dismissible': true
            //     }));
            // });
            //
            // it('should add "-with-icon" class if has icon slot', () => {
            //     const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length  - 1];
            //
            //     expect(rule()).toEqual(expect.objectContaining({
            //         '-with-icon': undefined
            //     }));
            // });
        });
    });
});
