import { $form } from '@inkline/inkline/src/prototypes/form';

class InklineValidation {
    static install (Vue) {
        Vue.prototype.$form = $form;
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(InklineValidation);
}

export {
    InklineValidation
};

export default InklineValidation;
