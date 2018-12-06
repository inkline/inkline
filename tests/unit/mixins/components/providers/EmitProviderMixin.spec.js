import { mount } from '@vue/test-utils'

import EmitProviderMixin from 'inkline/mixins/components/providers/EmitProviderMixin';

describe('Mixins', () => {
    describe('EmitProviderMixin', () => {
        describe('methods', () => {
            let wrapper;

            beforeEach(() => {
                const ChildComponent = {
                    name: 'Child',
                    mixins: [
                        EmitProviderMixin,
                    ],
                    template: `
                        <div class="child"></div>
                    `
                };

                const ParentComponent = {
                    name: 'Parent',
                    mixins: [
                        EmitProviderMixin,
                    ],
                    template: `
                        <div class="parent">
                            <slot></slot>
                            <div class="nested">
                                <slot name="nested"></slot>
                            </div>
                        </div>
                    `
                };

                wrapper = mount(ParentComponent, {
                    slots: {
                        default: [ ChildComponent ],
                        nested: [ ChildComponent ],
                    }
                });
            });

            describe('broadcast()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.broadcast).toBeDefined();
                });

                it('should call $emit for every child', () => {
                    const spy = jest.spyOn(wrapper.vm.$children[0], '$emit');

                    wrapper.vm.broadcast('Child', 'eventName', true);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('eventName', true);
                });

                it('should call broadcast recursively and work with any nesting level', () => {
                    const spy = jest.spyOn(wrapper.vm.$children[1], '$emit');

                    wrapper.vm.broadcast('Child', 'eventName', true);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('eventName', true);
                });
            });

            describe('dispatch()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.$children[0].dispatch).toBeDefined();
                });

                it('should call $emit on parent', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.vm.$children[0].dispatch('Parent', 'eventName', true);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('eventName', true);
                });

                it('should work with any nesting level', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.vm.$children[1].dispatch('Parent', 'eventName', true);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('eventName', true);
                });
            });
        });
    });
});
