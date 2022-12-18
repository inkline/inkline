import { OverlayBasicExample, OverlayLinkExample } from './index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    title: 'Utilities/Overlay'
};

export const Basic = createStory(OverlayBasicExample);
export const Link = createStory(OverlayLinkExample);
