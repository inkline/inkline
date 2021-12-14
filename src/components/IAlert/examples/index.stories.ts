import IAlert from '../index.vue';
import IAlertBasicExample from './basic.vue';
import IAlertColorVariantsExample from './color-variants.vue';
import IAlertDismissibleExample from './dismissible.vue';
import IAlertContentExample from './content.vue';
import IAlertIconExample from './icon.vue';
import IAlertSizeVariantsExample from './size-variants.vue';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IAlert,
    title: 'Components/Alert',
    argTypes: {
        ...colorArgType(['info', 'success', 'warning', 'danger']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IAlertBasicExample);
export const ColorVariants = () => IAlertColorVariantsExample;
export const Dismissible = () => IAlertDismissibleExample;
export const Content = () => IAlertContentExample;
export const Icon = () => IAlertIconExample;
export const SizeVariants = () => IAlertSizeVariantsExample;
