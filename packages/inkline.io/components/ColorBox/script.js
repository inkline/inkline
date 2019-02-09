import GridBox from '@components/GridBox';

export default {
    name: 'ColorBox',
    extends: GridBox,
    props: {
        title: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        }
    }
};
