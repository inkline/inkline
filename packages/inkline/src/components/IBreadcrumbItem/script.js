import Linkable from '@inkline/inkline/src/components/ILinkable';
import {
    SizePropertyMixin
} from '@inkline/inkline/src/mixins';

export default {
    name: 'IBreadcrumbItem',
    extends: Linkable,
    mixins: [
        SizePropertyMixin
    ]
};
