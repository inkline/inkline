import { Progress } from '@inkline/inkline/components/Progress/index';
import {
    ProgressBasicExample,
    ProgressBarColorVariantsExample,
    ProgressColorVariantsExample,
    ProgressSizeVariantsExample,
    ProgressStackedExample,
    ProgressValueExample
} from '@inkline/inkline/components/Progress/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: Progress,
    title: 'Components/Progress',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(ProgressBasicExample);
export const BarColorVariants = () => ProgressBarColorVariantsExample;
export const ColorVariants = () => ProgressColorVariantsExample;
export const SizeVariants = () => ProgressSizeVariantsExample;
export const Stacked = () => ProgressStackedExample;
export const Value = () => ProgressValueExample;
