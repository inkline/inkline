import ImagesAlignmentCenterExample from './alignment-center.vue';
import ImagesAlignmentLeftExample from './alignment-left.vue';
import ImagesAlignmentMarginAutoExample from './alignment-margin-auto.vue';
import ImagesAlignmentRightExample from './alignment-right.vue';
import ImagesFluidExample from './fluid.vue';
import ImagesPictureExample from './picture.vue';
import ImagesPolaroidExample from './polaroid.vue';
import ImagesResponsiveExample from './responsive.vue';
import ImagesThumbnailExample from './thumbnail.vue';

export default {
    title: 'Core/Images'
};

export const AlignmentCenter = () => ImagesAlignmentCenterExample;
export const AlignmentLeft = () => ImagesAlignmentLeftExample;
export const AlignmentMarginAuto = () => ImagesAlignmentMarginAutoExample;
export const AlignmentRight = () => ImagesAlignmentRightExample;
export const Fluid = () => ImagesFluidExample;
export const Picture = () => ImagesPictureExample;
export const Polaroid = () => ImagesPolaroidExample;
export const Responsive = () => ImagesResponsiveExample;
export const Thumbnail = () => ImagesThumbnailExample;
