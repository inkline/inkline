import { createMockInstance } from '@inkline/inkline/__mocks__/createMockInstance';
import { IExpandTransition } from '@inkline/inkline/transitions';

describe('transitions', () => {
    describe('IExpandTransition', () => {
        describe('methods', () => {
            describe('onEnter()', () => {
                it('should set element width, position, visibility, and height', () => {
                    const wrapper = createMockInstance(IExpandTransition, {});
                    const element = document.createElement('div');

                    wrapper.onEnter(element);

                    expect(element.style.width).toEqual('');
                    expect(element.style.position).toEqual('');
                    expect(element.style.visibility).toEqual('');
                    expect(element.style.height).toEqual('0px');
                });

                it('should set element height after timeout', (done) => {
                    const wrapper = createMockInstance(IExpandTransition, {});
                    const element = document.createElement('div');

                    element.style.width = '1080px';
                    element.style.height = '256px';

                    wrapper.onEnter(element);

                    setTimeout(() => {
                        expect(element.style.height).toEqual('auto');
                        done();
                    }, 1);
                });
            });

            describe('onAfterEnter()', () => {
                it('should set element height to auto', () => {
                    const wrapper = createMockInstance(IExpandTransition, {});
                    const element = document.createElement('div');

                    wrapper.onAfterEnter(element);

                    expect(element.style.height).toEqual('auto');
                });
            });

            describe('onLeave()', () => {
                it('should set height before timeout', () => {
                    const wrapper = createMockInstance(IExpandTransition, {});
                    const element = document.createElement('div');

                    element.style.width = '1080px';
                    element.style.height = '256px';

                    wrapper.onLeave(element);

                    expect(element.style.height).toEqual('256px');
                });

                it('should set height to 0 after timeout', (done) => {
                    const wrapper = createMockInstance(IExpandTransition, {});
                    const element = document.createElement('div');

                    element.style.width = '1080px';
                    element.style.height = '256px';

                    wrapper.onLeave(element);

                    setTimeout(() => {
                        expect(element.style.height).toEqual('0px');
                        done();
                    }, 1);
                });
            });
        });
    });
});
