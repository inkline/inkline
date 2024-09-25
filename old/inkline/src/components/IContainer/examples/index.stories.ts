import { IContainer } from '@inkline/inkline/components/IContainer/index';
import {
    IContainerBasicExample,
    IContainerFluidExample
} from '@inkline/inkline/components/IContainer/examples/index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    component: IContainer,
    title: 'Layout/Container'
};

export const Basic = createStory(IContainerBasicExample);
export const Fluid = createStory(IContainerFluidExample);
