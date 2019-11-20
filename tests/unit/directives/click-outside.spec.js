import ClickOutside from '@inkline/inkline/src/directives/click-outside';
import { clickOutsideHandler, createDocumentHandler, bindClickOutsideHandler } from '@inkline/inkline/src/directives/click-outside';
import { isServer } from "@inkline/inkline/tests/unit/utilities/isServer";

describe('Directives', () => {
    describe('v-click-outside', () => {
        let element;
        let binding;
        let vnode;

        beforeEach(() => {
            element = { getClientRects: () => [1], parentElement: null, contains: () => {} };
            binding = { expression: 'fn', value: () => {} };
            vnode = { context: { fn: () => {} } };
        });

        describe('onMouseDown()', () => {
            it('should set startClick to current event', () => {
                clickOutsideHandler.onMouseDown(true);

                expect(clickOutsideHandler.startClick).toEqual(true);
            });
        });

        describe('onMouseUp()', () => {
            it('should call context documentHandler for each node in nodeList', () => {
                const node = {
                    '@@clickOutsideContext': {
                        documentHandler: () => {}
                    }
                };
                const spy = jest.spyOn(node['@@clickOutsideContext'], 'documentHandler');

                clickOutsideHandler.nodeList = [ node, node ];
                clickOutsideHandler.onMouseUp(true);

                expect(spy).toHaveBeenCalled();
            });
        });

        describe('bindClickOutsideHandler()', () => {
            it('should bind mousedown and mouseup events on window.document', () => {
                const spy = jest.spyOn(window.document, 'addEventListener');

                bindClickOutsideHandler();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenNthCalledWith(1, 'mousedown', clickOutsideHandler.onMouseDown, false);
                expect(spy).toHaveBeenNthCalledWith(2, 'mouseup', clickOutsideHandler.onMouseUp, false);
            });

            it('should not bind mousedown and mouseup events if Vue.$isServer', () => {
                isServer(true);

                const spy = jest.spyOn(window.document, 'addEventListener');

                bindClickOutsideHandler();

                expect(spy).not.toHaveBeenCalledTimes(5);

                isServer(false);
            });
        });

        describe('createDocumentHandler()', () => {
            it('should return if vnode not provided', () => {
                const spy = jest.spyOn(vnode.context, 'fn');

                ClickOutside.bind(element, binding, undefined);
                element['@@clickOutsideContext'].documentHandler();

                expect(spy).not.toHaveBeenCalled();
            });

            it('should return if vnode.context not provided', () => {
                const spy = jest.spyOn(vnode.context, 'fn');

                ClickOutside.bind(element, binding, {});
                element['@@clickOutsideContext'].documentHandler();

                expect(spy).not.toHaveBeenCalled();
            });

            it('should return if mousedown not defined', () => {
                const spy = jest.spyOn(vnode.context, 'fn');

                ClickOutside.bind(element, binding, {});
                element['@@clickOutsideContext'].documentHandler(undefined, true);

                expect(spy).not.toHaveBeenCalled();
            });

            it('should return if mouseup not defined', () => {
                const spy = jest.spyOn(vnode.context, 'fn');

                ClickOutside.bind(element, binding, {});
                element['@@clickOutsideContext'].documentHandler(true, undefined);

                expect(spy).not.toHaveBeenCalled();
            });

            it('should return if mousedown target is element', () => {
                const spy = jest.spyOn(vnode.context, 'fn');

                ClickOutside.bind(element, binding, {});
                element['@@clickOutsideContext'].documentHandler({ target: element }, {});

                expect(spy).not.toHaveBeenCalled();
            });

            it('should return if mouse target is element', () => {
                const spy = jest.spyOn(vnode.context, 'fn');

                ClickOutside.bind(element, binding, {});
                element['@@clickOutsideContext'].documentHandler({}, { target: element });

                expect(spy).not.toHaveBeenCalled();
            });

            it('should call binding fn from vnode', () => {
                ClickOutside.bind(element, binding, vnode);
                const spy = jest.spyOn(vnode.context, 'fn');

                element['@@clickOutsideContext'].documentHandler({ target: {} }, { target: {} });
                expect(spy).toHaveBeenCalled();
            });

            it('should call binding fn from from element', () => {
                vnode.context.fn = false;

                ClickOutside.bind(element, binding, vnode);
                const spy = jest.spyOn(element['@@clickOutsideContext'], 'bindingFn');

                element['@@clickOutsideContext'].documentHandler({ target: {} }, { target: {} });
                expect(spy).toHaveBeenCalled();
            });

            it('should return if element is same as event target', () => {
                const handlerFn = createDocumentHandler(element, binding, vnode);

                expect(handlerFn({ target: element }, { target: element })).toEqual(undefined);
            });
        });

        describe('bind()', () => {
            it('should add element click-outside handler', () => {
                ClickOutside.bind(element, binding, vnode);

                expect(element['@@clickOutsideContext'].id).toEqual(expect.any(Number));
                expect(element['@@clickOutsideContext'].documentHandler).toEqual(expect.any(Function));
                expect(element['@@clickOutsideContext'].methodName).toEqual(binding.expression);
                expect(element['@@clickOutsideContext'].bindingFn).toEqual(binding.value);
            });
        });

        describe('update()', () => {
            it('should update element click-outside handler', () => {
                ClickOutside.bind(element, binding, vnode);

                binding.expression = 'new';
                binding.value = false;

                ClickOutside.update(element, binding, vnode);

                expect(element['@@clickOutsideContext'].documentHandler).toEqual(expect.any(Function));
                expect(element['@@clickOutsideContext'].methodName).toEqual(binding.expression);
                expect(element['@@clickOutsideContext'].bindingFn).toEqual(binding.value);
            });
        });

        describe('unbind()', () => {
            it('should delete element click-outside handler', () => {
                ClickOutside.bind(element, binding, vnode);
                ClickOutside.unbind(element);

                expect(element['@@clickOutsideContext']).not.toBeDefined();
            });
        });
    });
});
