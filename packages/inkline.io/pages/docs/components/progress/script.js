import View from '@components/View';
import { IProgress, IProgressBar } from '@inkline/inkline';

export default {
    name: 'ProgressView',
    layout: 'documentation',
    extends: View,
    head: {
        title: 'Progress'
    },
    components: {
        IProgress,
        IProgressBar,
    }
};
