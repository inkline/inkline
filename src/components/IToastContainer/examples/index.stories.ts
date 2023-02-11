import { Meta } from '@storybook/vue3';
import IToastContainer from '@inkline/inkline/components/IToastContainer/IToastContainer.vue';
import {
    IToastContainerBasicExample,
    IToastContainerVNodeExample
} from '@inkline/inkline/components/IToastContainer/examples/index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    component: IToastContainer,
    title: 'Services/Toast'
} as Meta<typeof IToastContainer>;

export const Basic = createStory(IToastContainerBasicExample);
export const Vnode = createStory(IToastContainerVNodeExample);
