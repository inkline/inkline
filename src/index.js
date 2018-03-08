import Column from './components/Column';
import Container from './components/Container';
import Layout from './components/Layout';
import LayoutAside from './components/LayoutAside';
import LayoutContent from './components/LayoutContent';
import LayoutFooter from './components/LayoutFooter';
import LayoutHeader from './components/LayoutHeader';
import Row from './components/Row';
import Radio from './components/Radio';

const components = {
    Column,
    Container,
    Layout,
    LayoutAside,
    LayoutContent,
    LayoutFooter,
    LayoutHeader,
    Row,
    Radio
};

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
    Layout,
    LayoutAside,
    LayoutContent,
    LayoutFooter,
    LayoutHeader,
    Row,
    Radio,
    Inkline
};

export default Inkline;
