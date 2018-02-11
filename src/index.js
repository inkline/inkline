import Column from './components/column/Column';
import Container from './components/container/Container';
import Row from './components/row/Row';

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
