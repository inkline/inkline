import Vue from 'vue';
import { mount } from '@vue/test-utils'

import CollapsibleProviderMixin from '@inkline/inkline/src/mixins/components/providers/CollapsibleProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

describe('Mixins', () => {
    describe('CollapsibleProviderMixin', () => {
        let wrapper;
        const createWrapper = () => mount({
            render () {},
            mixins: [
                ClassesProviderMixin,
                CollapsibleProviderMixin,
            ]
        });

        beforeEach(() => {
            wrapper = createWrapper();
        });

        describe('data', () => {
            describe('collapsed', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.collapsed).toBeDefined();
                    expect(wrapper.vm.collapsed).toEqual(false);
                });
            });

            describe('collapsible', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.collapsible).toBeDefined();
                    expect(wrapper.vm.collapsible).toEqual(false);
                });
            });

            describe('windowWidth', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.windowWidth).toBeDefined();
                });

                it('should equal window width', () => {
                    expect(wrapper.vm.windowWidth).toEqual(window.innerWidth);
                });

                it('should equal 0 if window is not defined', () => {
                    Vue.$isServer = true;
                    expect(createWrapper().vm.windowWidth).toEqual(0);
                    Vue.$isServer = false;
                });
            });
        });

        describe('watch', () => {
            describe('value()', () => {
                it('should keep value and collapsed synchronised', () => {
                    expect(wrapper.vm.collapsed).toEqual(false);
                    wrapper.setProps({ value: true });
                    expect(wrapper.vm.collapsed).toEqual(true);
                    wrapper.setProps({ value: false });
                    expect(wrapper.vm.collapsed).toEqual(false);
                });
            });
        });


    });
});
