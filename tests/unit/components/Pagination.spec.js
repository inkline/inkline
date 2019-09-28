import Vue from 'vue';

import { shallowMount } from '@vue/test-utils';
import Pagination from '@inkline/inkline/src/components/Pagination';

describe('Components', () => {
    describe('Pagination', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Pagination, {
                methods: {
                    created: Pagination.created,
                    destroyed: Pagination.destroyed
                }
            });
        });

        it('should be named correctly', () => {
            expect(Pagination.name).toEqual('IPagination');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('itemsPerPage', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.itemsPerPage).toBeDefined();
                    expect(wrapper.vm.itemsPerPage).toEqual(20);
                });
            });

            describe('items', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.items).toBeDefined();
                    expect(wrapper.vm.items).toEqual(0);
                });
            });

            describe('limit', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.limit).toBeDefined();
                    expect(wrapper.vm.limit).toEqual({ xs: 3, sm: 5 });
                });
            });

            describe('quickLink', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.quickLink).toBeDefined();
                    expect(wrapper.vm.quickLink).toEqual(false);
                });
            });

            describe('value', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.value).toBeDefined();
                    expect(wrapper.vm.value).toEqual(1);
                });
            });
        });

        describe('computed', () => {
            describe('pageCount()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.pageCount).toBeDefined();
                });

                it('should return number of pages based on items and items per page', () => {
                    wrapper.setProps({ items: 100, itemsPerPage: 10 });

                    expect(wrapper.vm.pageCount).toEqual(10);
                });

                it('should return number of pages, rounded up', () => {
                    wrapper.setProps({ items: 95, itemsPerPage: 10 });

                    expect(wrapper.vm.pageCount).toEqual(10);
                });
            });

            describe('showQuickPrevious()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.showQuickPrevious).toBeDefined();
                });

                it('should return false if page count is less than limit', () => {
                    wrapper.setProps({ items: 10, itemsPerPage: 10, limit: 5 });

                    expect(wrapper.vm.showQuickPrevious).toEqual(false);
                });

                it('should return false if current page is less than limit - (limit - 1) / 2', () => {
                    wrapper.setProps({ value: 1, items: 100, itemsPerPage: 10, limit: 5 });

                    expect(wrapper.vm.showQuickPrevious).toEqual(false);
                });

                it('should return true if current page is more than limit - (limit - 1) / 2', () => {
                    wrapper.setProps({ value: 4, items: 100, itemsPerPage: 10, limit: 5 });

                    expect(wrapper.vm.showQuickPrevious).toEqual(true);
                });
            });

            describe('showQuickNext()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.showQuickNext).toBeDefined();
                });

                it('should return false if page count is less than limit', () => {
                    wrapper.setProps({ items: 10, itemsPerPage: 10, limit: 5 });

                    expect(wrapper.vm.showQuickNext).toEqual(false);
                });

                it('should return false if current page is more than pageCount - (limit - 1) / 2', () => {
                    wrapper.setProps({ value: 8, items: 100, itemsPerPage: 10, limit: 5 });

                    expect(wrapper.vm.showQuickNext).toEqual(false);
                });

                it('should return true if current page less than pageCount - (limit - 1) / 2', () => {
                    wrapper.setProps({ value: 1, items: 100, itemsPerPage: 10, limit: 5 });

                    expect(wrapper.vm.showQuickNext).toEqual(true);
                });
            });

            describe('pages()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.pages).toBeDefined();
                });

                it('should add pages from 2 to pageCount if not quick previous and not quick next', () => {
                    wrapper.setProps({ value: 1, items: 50, itemsPerPage: 10, limit: 5 });

                    expect(wrapper.vm.pages).toEqual([2, 3, 4]);
                });

                it('should add pages from custom start to end if quick previous and not quick next', () => {
                    wrapper.setProps({ value: 9, items: 100, itemsPerPage: 10, limit: 5 });

                    expect(wrapper.vm.pages).toEqual([7, 8, 9]);
                });

                it('should add pages from start to custom end if not quick previous and quick next', () => {
                    wrapper.setProps({ value: 3, items: 100, itemsPerPage: 10, limit: 5 });

                    expect(wrapper.vm.pages).toEqual([2, 3, 4]);
                });

                it('should add pages from custom start to custom end if quick previous and quick next', () => {
                    wrapper.setProps({ value: 6, items: 100, itemsPerPage: 10, limit: 5 });

                    expect(wrapper.vm.pages).toEqual([5, 6, 7]);
                });
            });
        });

        describe('methods', () => {
            describe('next()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.next).toBeDefined();
                });

                it('should call onClick with next page index', () => {
                    const spy = jest.spyOn(wrapper.vm, 'onClick');

                    wrapper.setProps({ value: 1, items: 100, itemsPerPage: 10 });
                    wrapper.vm.next();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith(2);
                });

                it('should not call onClick if currentPage is page count', () => {
                    const spy = jest.spyOn(wrapper.vm, 'onClick');

                    wrapper.setProps({ value: 10, items: 100, itemsPerPage: 10 });
                    wrapper.vm.next();

                    expect(spy).not.toHaveBeenCalled();
                });
            });

            describe('quickNext()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.quickNext).toBeDefined();
                });

                it('should not call onClick if quickLink not enabled', () => {
                    const spy = jest.spyOn(wrapper.vm, 'onClick');

                    wrapper.setProps({ quickLink: false });
                    wrapper.vm.quickNext();

                    expect(spy).not.toHaveBeenCalled();
                });

                it('should call onClick jumping to currentPage + (limit - 2)', () => {
                    const spy = jest.spyOn(wrapper.vm, 'onClick');

                    wrapper.setProps({ quickLink: true, value: 1, items: 100, itemsPerPage: 10, limit: 5 });
                    wrapper.vm.quickNext();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith(4);
                });

                it('should call onClick jumping to last page', () => {
                    const spy = jest.spyOn(wrapper.vm, 'onClick');

                    wrapper.setProps({ quickLink: true, value: 8, items: 100, itemsPerPage: 10, limit: 5 });
                    wrapper.vm.quickNext();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith(10);
                });
            });

            describe('previous()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.previous).toBeDefined();
                });

                it('should call onClick with previous page index', () => {
                    const spy = jest.spyOn(wrapper.vm, 'onClick');

                    wrapper.setProps({ value: 2, items: 100, itemsPerPage: 10 });
                    wrapper.vm.previous();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith(1);
                });

                it('should not call onClick if page index is 1', () => {
                    const spy = jest.spyOn(wrapper.vm, 'onClick');

                    wrapper.setProps({ value: 1, items: 100, itemsPerPage: 10 });
                    wrapper.vm.previous();

                    expect(spy).not.toHaveBeenCalled();
                });
            });

            describe('quickPrevious()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.quickPrevious).toBeDefined();
                });

                it('should not call onClick if quickLink not enabled', () => {
                    const spy = jest.spyOn(wrapper.vm, 'onClick');

                    wrapper.setProps({ quickLink: false });
                    wrapper.vm.quickPrevious();

                    expect(spy).not.toHaveBeenCalled();
                });

                it('should call onClick jumping to currentPage - (limit - 2)', () => {
                    const spy = jest.spyOn(wrapper.vm, 'onClick');

                    wrapper.setProps({ quickLink: true, value: 5, items: 100, itemsPerPage: 10, limit: 5 });
                    wrapper.vm.quickPrevious();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith(2);
                });

                it('should call onClick jumping to last page', () => {
                    const spy = jest.spyOn(wrapper.vm, 'onClick');

                    wrapper.setProps({ quickLink: true, value: 2, items: 100, itemsPerPage: 10, limit: 5 });
                    wrapper.vm.quickPrevious();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith(1);
                });
            });

            describe('onClick()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.onClick).toBeDefined();
                });

                it('should emit input and change events', () => {
                    const item = 1;

                    wrapper.vm.onClick(item);

                    expect(wrapper.emitted().input[0]).toEqual([item]);
                    expect(wrapper.emitted().change[0]).toEqual([item]);
                });
            });

            describe('onWindowResize()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.onWindowResize).toBeDefined();
                });

                it('should set pageLimit as limit if limit is number', () => {
                    wrapper.setProps({ limit: 5 });

                    wrapper.vm.onWindowResize();

                    expect(wrapper.vm.pageLimit).toEqual(5);
                });

                it('should set pageLimit as last limit[breakpoint] if $isServer', () => {
                    Vue.$isServer = true;

                    wrapper.setProps({ limit: { xs: 10, sm: 10 } });
                    wrapper.vm.onWindowResize();

                    expect(wrapper.vm.pageLimit).toEqual(10);

                    Vue.$isServer = false;
                });


                it('should set pageLimit as last limit[breakpoint]', () => {
                    global.innerWidth = 1280;
                    wrapper.setProps({ limit: { xs: 10, sm: 10 } });

                    wrapper.vm.onWindowResize();

                    expect(wrapper.vm.pageLimit).toEqual(10);
                });

                it('should set pageLimit as first limit[breakpoint]', () => {
                    global.innerWidth = 320;
                    wrapper.setProps({ limit: { xs: 5, sm: 10 } });
                    wrapper.vm.onWindowResize();

                    expect(wrapper.vm.pageLimit).toEqual(5);

                    document.window = undefined;
                });
            });
        });

        describe('created()', () => {
            it('should be defined', () => {
                expect(Pagination.created).toBeDefined();
            });

            it('should add window resize event listener', () => {
                const spy = jest.spyOn(window, 'addEventListener');

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('resize', wrapper.vm.debouncedOnWindowResize);
            });

            it('should call initial onWindowResize', () => {
                const spy = jest.spyOn(wrapper.vm, 'onWindowResize');

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
            });
        });

        describe('destroyed()', () => {
            it('should remove window resize event listener', () => {
                const spy = jest.spyOn(window, 'removeEventListener');

                wrapper.vm.destroyed();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('resize', wrapper.vm.debouncedOnWindowResize);
            });
        });
    });
});
