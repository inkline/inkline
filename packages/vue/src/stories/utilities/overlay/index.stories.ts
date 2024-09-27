import {
    OverlayBasicExample,
    OverlayLinkExample
} from '@inkline/inkline/stories/utilities/overlay/index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    title: 'Utilities/Overlay'
};

export const Basic = createStory(OverlayBasicExample);
export const Link = createStory(OverlayLinkExample);
