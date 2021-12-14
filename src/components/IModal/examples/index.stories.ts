import IModal from '../index.vue';
import IModalBasicExample from './basic.vue';
import IModalColorVariantsExample from './color-variants.vue';
import IModalSizeVariantsExample from './size-variants.vue';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IModal,
    title: 'Components/Modal',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

export const Basic = createStory(IModalBasicExample);
export const ColorVariants = () => IModalColorVariantsExample;
export const SizeVariants = () => IModalSizeVariantsExample;
