import { IProgress } from '@inkline/inkline/components';
import {
    IProgressBasicExample,
    IProgressBarColorVariantsExample,
    IProgressColorVariantsExample,
    IProgressSizeVariantsExample,
    IProgressStackedExample,
    IProgressValueExample
} from './index';
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: IProgress,
    title: 'Components/Progress',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IProgressBasicExample);
export const BarColorVariants = createStory(IProgressBarColorVariantsExample);
export const ColorVariants = createStory(IProgressColorVariantsExample);
export const SizeVariants = createStory(IProgressSizeVariantsExample);
export const Stacked = createStory(IProgressStackedExample);
export const Value = createStory(IProgressValueExample);
