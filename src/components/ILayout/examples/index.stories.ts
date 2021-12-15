import ILayout from '../index.vue';
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
import { createStory } from '@inkline/inkline/__storybook__';

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
