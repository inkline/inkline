import { mount } from '@vue/test-utils'

import TransitionExpand from '@inkline/inkline/src/transitions/TransitionExpand';

describe('Transitions', () => {
    describe('TransitionExpand', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(TransitionExpand);
        });

        it('should be named correctly', () => {
           expect(TransitionExpand.name).toEqual('ITransitionExpand')
        });

        it('should render correctly', () => {
           expect(TransitionExpand.name).toEqual('ITransitionExpand')
        });

        it('should be functional', () => {
           expect(wrapper.html()).toMatchSnapshot()
        });

        describe('render()', () => {
            let rendered;
            let renderedData;
            let element;

            beforeEach(() => {
                const h = (name, data) => renderedData = data;
                const context = { children: [] };

                rendered = TransitionExpand.render(h, context);
                element = document.createElement('div');
            });

            it('should call hoist function h()', () => {
                const spyHelper = { h: () => {} };
                const spy = jest.spyOn(spyHelper, 'h');

                rendered = TransitionExpand.render(spyHelper.h, {});

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('transition', expect.any(Object), undefined);
            });

            describe('name', () => {
                it('should be defined', () => {
                    expect(renderedData.props.name).toBeDefined();
                    expect(renderedData.props.name).toEqual('expand');
                });
            });

            describe('on', () => {
                describe('enter()', () => {
                    it('should be defined', () => {
                        expect(renderedData.on.enter).toBeDefined();
                    });

                    it('should change element position, visibility and height', () => {
                        renderedData.on.enter(element);

                        expect(element.style.position).toEqual('');
                        expect(element.style.visibility).toEqual('');
                        expect(element.style.height).toEqual('0px');
                    });
                });

                describe('afterEnter()', () => {
                    it('should be defined', () => {
                        expect(renderedData.on.afterEnter).toBeDefined();
                    });

                    it('should change element height to auto', () => {
                        renderedData.on.afterEnter(element);

                        expect(element.style.height).toEqual('auto');
                    });
                });

                describe('leave()', () => {
                    it('should be defined', () => {
                        expect(renderedData.on.leave).toBeDefined();
                    });

                    it('should change element height', () => {
                        element.style.height = '100px';

                        renderedData.on.leave(element);

                        expect(element.style.height).toEqual('100px');
                    });

                    it('should change element height to 0 after timeout', (done) => {
                        element.style.height = '100px';

                        renderedData.on.leave(element);

                        setTimeout(() => {
                            expect(element.style.height).toEqual('0px');
                            done();
                        });
                    });
                });
            });
        });
    });
});
