import { ILayout } from '@inkline/inkline/components';
import {
    ILayoutBasicExample,
    ILayoutContentHeaderExample,
    ILayoutContentHeaderFooterExample,
    ILayoutContentWithLeftAsideHeaderFooterExample,
    ILayoutContentWithLeftAndRightAsidesHeaderFooterExample,
    ILayoutContentWithRightAsideHeaderFooterExample,
    ILayoutLeftAndRightAsidesWithContentHeaderFooterExample,
    ILayoutLeftAsideWithContentHeaderFooterExample,
    ILayoutRightAsideWithContentHeaderFooterExample
} from './index';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: ILayout,
    title: 'Layout/Layout'
};

export const Basic = createStory(ILayoutBasicExample);
export const ContentHeader = createStory(ILayoutContentHeaderExample);
export const ContentHeaderFooter = createStory(ILayoutContentHeaderFooterExample);
export const ContentWithLeftAsideHeaderFooter = createStory(ILayoutContentWithLeftAsideHeaderFooterExample);
export const ContentWithLeftAndRightAsidesHeaderFooter = createStory(ILayoutContentWithLeftAndRightAsidesHeaderFooterExample);
export const ContentWithRightAsideHeaderFooter = createStory(ILayoutContentWithRightAsideHeaderFooterExample);
export const LeftAndRightAsidesWithContentHeaderFooter = createStory(ILayoutLeftAndRightAsidesWithContentHeaderFooterExample);
export const LeftAsideWithContentHeaderFooter = createStory(ILayoutLeftAsideWithContentHeaderFooterExample);
export const RightAsideWithContentHeaderFooter = createStory(ILayoutRightAsideWithContentHeaderFooterExample);
