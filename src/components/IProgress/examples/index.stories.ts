import IProgress from '../index.vue';
import IProgressBasicExample from './basic.vue';
import IProgressBarColorVariantsExample from './bar-color-variants.vue';
import IProgressColorVariantsExample from './color-variants.vue';
import IProgressSizeVariantsExample from './size-variants.vue';
import IProgressStackedExample from './stacked.vue';
import IProgressValueExample from './value.vue';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IProgress,
    title: 'Components/Progress',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IProgressBasicExample);
export const BarColorVariants = () => IProgressBarColorVariantsExample;
export const ColorVariants = () => IProgressColorVariantsExample;
export const SizeVariants = () => IProgressSizeVariantsExample;
export const Stacked = () => IProgressStackedExample;
export const Value = () => IProgressValueExample;
