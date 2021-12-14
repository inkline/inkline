import ILayout from '../index.vue';
import ILayoutBasicExample from './basic.vue';
import ILayoutContentHeaderExample from './content-header.vue';
import ILayoutContentHeaderFooterExample from './content-header-footer.vue';
import ILayoutContentWithLeftAsideHeaderFooterExample from './content-with-left-aside-header-footer.vue';
import ILayoutContentWithLeftAndRightAsidesHeaderFooterExample from './content-with-left-and-right-asides-header-footer.vue';
import ILayoutContentWithRightAsideHeaderFooterExample from './content-with-right-aside-header-footer.vue';
import ILayoutLeftAndRightAsidesWithContentHeaderFooterExample from './left-and-right-asides-with-content-header-footer.vue';
import ILayoutLeftAsideWithContentHeaderFooterExample from './left-aside-with-content-header-footer.vue';
import ILayoutRightAsideWithContentHeaderFooterExample from './right-aside-with-content-header-footer.vue';
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
