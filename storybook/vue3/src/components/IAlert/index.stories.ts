import { IAlert } from '@inkline/inkline/components';
import {
    IAlertBasicExample,
    IAlertColorVariantsExample,
    IAlertDismissibleExample,
    IAlertContentExample,
    IAlertIconExample,
    IAlertSizeVariantsExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: IAlert,
    title: 'Components/Alert',
    argTypes: {
        ...colorArgType(['info', 'success', 'warning', 'danger']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IAlertBasicExample);
export const ColorVariants = createStory(IAlertColorVariantsExample);
export const Dismissible = createStory(IAlertDismissibleExample);
export const Content = createStory(IAlertContentExample);
export const Icon = createStory(IAlertIconExample);
export const SizeVariants = createStory(IAlertSizeVariantsExample);
