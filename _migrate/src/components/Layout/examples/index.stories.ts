import { Layout } from '@inkline/inkline/components/Layout/index';
import {
    LayoutBasicExample,
    LayoutContentHeaderExample,
    LayoutContentHeaderFooterExample,
    LayoutContentWithLeftAsideHeaderFooterExample,
    LayoutContentWithLeftAndRightAsidesHeaderFooterExample,
    LayoutContentWithRightAsideHeaderFooterExample,
    LayoutLeftAndRightAsidesWithContentHeaderFooterExample,
    LayoutLeftAsideWithContentHeaderFooterExample,
    LayoutRightAsideWithContentHeaderFooterExample
} from '@inkline/inkline/components/Layout/examples/index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    component: Layout,
    title: 'Layout/Layout'
};

export const Basic = createStory(LayoutBasicExample);
export const ContentHeader = createStory(LayoutContentHeaderExample);
export const ContentHeaderFooter = createStory(LayoutContentHeaderFooterExample);
export const ContentWithLeftAsideHeaderFooter = createStory(
    LayoutContentWithLeftAsideHeaderFooterExample
);
export const ContentWithLeftAndRightAsidesHeaderFooter = createStory(
    LayoutContentWithLeftAndRightAsidesHeaderFooterExample
);
export const ContentWithRightAsideHeaderFooter = createStory(
    LayoutContentWithRightAsideHeaderFooterExample
);
export const LeftAndRightAsidesWithContentHeaderFooter = createStory(
    LayoutLeftAndRightAsidesWithContentHeaderFooterExample
);
export const LeftAsideWithContentHeaderFooter = createStory(
    LayoutLeftAsideWithContentHeaderFooterExample
);
export const RightAsideWithContentHeaderFooter = createStory(
    LayoutRightAsideWithContentHeaderFooterExample
);
