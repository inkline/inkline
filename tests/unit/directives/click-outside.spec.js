import ClickOutside from '@inkline/inkline/directives/click-outside';

describe('Directives', () => {
    describe('v-click-outside', () => {
        let element;
        let binding;
        let vnode;

        beforeEach(() => {
            element = { getClientRects: () => [1], parentElement: null };
            binding = { expression: 'fn', value: () => {} };
            vnode = { context: { fn: () => {} } };
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