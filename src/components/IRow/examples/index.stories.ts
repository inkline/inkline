import IRow from '../index.vue';
import {
    IRowDistributionAroundExample,
    IRowDistributionBetweenExample,
    IRowHorizontalAlignmentStartExample,
    IRowHorizontalAlignmentCenterExample,
    IRowHorizontalAlignmentEndExample,
    IRowReorderingReverseExample,
    IRowVerticalAlignmentTopExample,
    IRowVerticalAlignmentMiddleExample,
    IRowVerticalAlignmentBottomExample,
} from './index';

export default {
    component: IRow,
    title: 'Components/Row'
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-row v-bind="args">
        Row
    </i-row>`,
});

export const Component = Template.bind({});

export const DistributionAround = () => IRowDistributionAroundExample;
export const DistributionBetween = () => IRowDistributionBetweenExample;
export const HorizontalAlignmentStart = () => IRowHorizontalAlignmentStartExample;
export const HorizontalAlignmentCenter = () => IRowHorizontalAlignmentCenterExample;
export const HorizontalAlignmentEnd = () => IRowHorizontalAlignmentEndExample;
export const ReorderingReverse = () => IRowReorderingReverseExample;
export const VerticalAlignmentTop = () => IRowVerticalAlignmentTopExample;
export const VerticalAlignmentMiddle = () => IRowVerticalAlignmentMiddleExample;
export const VerticalAlignmentBottom = () => IRowVerticalAlignmentBottomExample;
