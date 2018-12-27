import { mount } from '@vue/test-utils'

import TransitionExpand from 'inkline/transitions/TransitionExpand';

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

        // describe('data', () => {
        //     describe('attributesProvider', () => {
        //         it('should be defined', () => {
        //             expect(wrapper.vm.attributesProvider).toBeDefined();
        //             expect(wrapper.vm.attributesProvider.constructor).toEqual(Array);
        //         });
        //     });
        // });
    });
});
