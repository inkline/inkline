import Column from './components/Column';
import Container from './components/Container';
import Row from './components/Row';

const components = [
    Column,
    Container,
    Row
];

class Inkline {
    constructor () {
        if (typeof window !== 'undefined' && window.Vue) {
            this.install(window.Vue);
        }
    }

    install (Vue, opts = {}) {
        components.map(component => {
            Vue.component(component.name, component);
        });
    };
}

export {
    Column,
    Container,
    Row,
    Inkline
};

export default Inkline;
