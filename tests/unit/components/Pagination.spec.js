import { shallowMount } from '@vue/test-utils';
import Pagination from 'inkline/components/Pagination';

describe('Components', () => {
    describe('Pagination', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Pagination);
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
                    expect(wrapper.vm.limit).toEqual(7);
                });
            });

            describe('value', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.value).toBeDefined();
                    expect(wrapper.vm.value).toEqual(1);
                });
            });
        });

        describe('computed()', () => {
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
            });
        });
    });
});
