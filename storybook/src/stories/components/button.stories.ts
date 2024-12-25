import './button.preview.css';
import { Button } from '@inkline/component-button';
import {
    ButtonBasicExample,
    ButtonBlockExample,
    ButtonTagExample,
    ButtonTypeExample,
    ButtonCircleExample,
    ButtonColorVariantsExample,
    ButtonIconExample,
    ButtonLinkExample,
    ButtonOutlineExample,
    ButtonRoutingExample,
    ButtonSizeVariantsExample,
    ButtonSquareExample,
    ButtonStateActiveExample,
    ButtonStateDisabledExample,
    ButtonStateLoadingExample
} from '@inkline/component-button/examples';
import { Meta, StoryFn } from '@storybook/vue3';
import { markRaw } from 'vue';

const meta: Meta<typeof Button> = {
    component: markRaw(Button),
    title: 'Components/Button'
};

export default meta;

export const Basic: StoryFn = () => ButtonBasicExample;
export const Block: StoryFn = () => ButtonBlockExample;
export const Type: StoryFn = () => ButtonTypeExample;
export const Tag: StoryFn = () => ButtonTagExample;
export const Icon: StoryFn = () => ButtonIconExample;
export const Link: StoryFn = () => ButtonLinkExample;
export const Outline: StoryFn = () => ButtonOutlineExample;
export const Circle: StoryFn = () => ButtonCircleExample;
export const Square: StoryFn = () => ButtonSquareExample;
export const StateActive: StoryFn = () => ButtonStateActiveExample;
export const StateDisabled: StoryFn = () => ButtonStateDisabledExample;
export const StateLoading: StoryFn = () => ButtonStateLoadingExample;
export const ColorVariants: StoryFn = () => ButtonColorVariantsExample;
export const SizeVariants: StoryFn = () => ButtonSizeVariantsExample;
export const Routing: StoryFn = () => ButtonRoutingExample;
