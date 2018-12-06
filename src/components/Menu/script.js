import Emitter from 'inkline/mixins/components/providers/EmitProviderMixin';

import { addClass, hasClass, removeClass, triggerEvent, isKey } from 'inkline/helpers';

class Menu {
    constructor (domNode) {
        this.domNode = domNode;
        this.init();
    }

    init () {
        let menuChildren = this.domNode.childNodes;
        [].filter.call(menuChildren, child => child.nodeType === 1).forEach(child => {
            new MenuItem(child); // eslint-disable-line
        });
    }
}

class MenuItem {
    constructor (domNode) {
        this.domNode = domNode;
        this.submenu = null;

        this.init();
    }

    init () {
        this.domNode.setAttribute('tabindex', '0');

        let menuChild = this.domNode.querySelector('.menu');
        if (menuChild) {
            this.submenu = new SubMenu(this, menuChild);
        }

        this.addListeners();
    }

    addListeners () {
        this.domNode.addEventListener('keydown', event => {
            let prevDef = false;
            switch (true) {
            case isKey('down', event):
                triggerEvent(event.currentTarget, 'mouseenter');
                this.submenu.goToSubIndex(0);
                prevDef = true;
                break;
            case isKey('up', event):
                triggerEvent(event.currentTarget, 'mouseenter');
                this.submenu.goToSubIndex(this.submenu.subMenuItems.length - 1);
                prevDef = true;
                break;
            case isKey('tab', event):
                triggerEvent(event.currentTarget, 'mouseleave');
                break;
            case isKey('enter', event):
            case isKey('space', event):
                prevDef = true;
                event.currentTarget.click();
                break;
            }

            if (prevDef) {
                event.preventDefault();
            }
        });
    }
}

class SubMenu {
    constructor (parent, domNode) {
        this.domNode = domNode;
        this.parent = parent;
        this.subMenuItems = [];
        this.subIndex = 0;

        this.init();
    }

    init () {
        this.subMenuItems = this.domNode.querySelectorAll('li');
        this.addListeners();
    }

    goToSubIndex (idx) {
        if (idx === this.subMenuItems.length) {
            idx = 0;
        } else if (idx < 0) {
            idx = this.subMenuItems.length - 1;
        }

        this.subMenuItems[idx].focus();
        this.subIndex = idx;
    }

    addListeners () {
        const parentNode = this.parent.domNode;
        Array.prototype.forEach.call(this.subMenuItems, el => {
            el.addEventListener('keydown', event => {
                let prevDef = false;

                switch (event.keyCode) {
                case isKey('down', event):
                    this.goToSubIndex(this.subIndex + 1);
                    prevDef = true;
                    break;
                case isKey('up', event):
                    this.goToSubIndex(this.subIndex - 1);
                    prevDef = true;
                    break;
                case isKey('tab', event):
                    triggerEvent(parentNode, 'mouseleave');
                    break;
                case isKey('enter', event):
                case isKey('space', event):
                    prevDef = true;
                    event.currentTarget.click();
                    break;
                }

                if (prevDef) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                return false;
            });
        });
    }
}

const MenuTransitionHandler = {
    functional: true,
    render (createElement, context) {
        const data = {
            props: {
                mode: 'out-in'
            },
            on: {
                beforeEnter(el) {
                    el.style.opacity = 0.2;
                },
                enter(el) {
                    addClass(el, 'el-opacity-transition');
                    el.style.opacity = 1;
                },
                afterEnter(el) {
                    removeClass(el, 'el-opacity-transition');
                    el.style.opacity = '';
                },
                beforeLeave(el) {
                    if (!el.dataset) el.dataset = {};
                    if (hasClass(el, 'el-menu--collapse')) {
                        removeClass(el, 'el-menu--collapse');
                        el.dataset.oldOverflow = el.style.overflow;
                        el.dataset.scrollWidth = el.clientWidth;
                        addClass(el, 'el-menu--collapse');
                    } else {
                        addClass(el, 'el-menu--collapse');
                        el.dataset.oldOverflow = el.style.overflow;
                        el.dataset.scrollWidth = el.clientWidth;
                        removeClass(el, 'el-menu--collapse');
                    }
                    el.style.width = el.scrollWidth + 'px';
                    el.style.overflow = 'hidden';
                },
                leave(el) {
                    addClass(el, 'horizontal-collapse-transition');
                    el.style.width = el.dataset.scrollWidth + 'px';
                }
            }
        };

        return createElement('transition', data, context.children);
    }
};


export default {
    name: 'Menu',
    props: {
        orientation: {
            type: String,
            default: 'horizontal'
        },
        collapse: {
            type: Boolean,
            default: true
        },
        defaultActive: {
            type: String,
            default: ''
        },
        defaultOpeneds: Array,
        uniqueOpened: Boolean,
        router: Boolean,
        menuTrigger: {
            type: String,
            default: 'hover'
        },
        backgroundColor: String,
        textColor: String,
        activeTextColor: String
    },
    computed: {
        classes () {
            return [
                this.orientation === 'horizontal' ? '-horizontal' : '-vertical',
                this.collapse ? '-collapse' : ''
            ];
        },
        hoverBackground () {
            return this.backgroundColor ? this.mixColor(this.backgroundColor, 0.2) : '';
        },
        isMenuPopup () {
            return this.orientation === 'horizontal' || (this.orientation === 'vertical' && this.collapse);
        }
    },
    mixins: [Emitter],
    provide () {
        return {
            rootMenu: this
        };
    },
    components: {
        MenuTransitionHandler
    },
    data () {
        return {
            activeIndex: this.defaultActive,
            openedMenus: (this.defaultOpeneds && !this.collapse) ? this.defaultOpeneds.slice(0) : [],
            items: {},
            submenus: {}
        };
    },
    watch: {
        defaultActive: 'updateActiveIndex',
        defaultOpeneds (value) {
            if (!this.collapse) {
                this.openedMenus = value;
            }
        },
        collapse(value) {
            if (value) this.openedMenus = [];
            this.broadcast('ElSubmenu', 'toggle-collapse', value);
        }
    },
    methods: {
        updateActiveIndex () {
            const item = this.items[this.defaultActive];
            if (item) {
                this.activeIndex = item.index;
                this.initOpenedMenu();
            } else {
                this.activeIndex = null;
            }
        },
        getColorChannels (color) {
            color = color.replace('#', '');
            if (/^[0-9a-fA-F]{3}$/.test(color)) {
                color = color.split('');
                for (let i = 2; i >= 0; i--) {
                    color.splice(i, 0, color[i]);
                }
                color = color.join('');
            }
            if (/^[0-9a-fA-F]{6}$/.test(color)) {
                return {
                    red: parseInt(color.slice(0, 2), 16),
                    green: parseInt(color.slice(2, 4), 16),
                    blue: parseInt(color.slice(4, 6), 16)
                };
            } else {
                return {
                    red: 255,
                    green: 255,
                    blue: 255
                };
            }
        },
        mixColor(color, percent) {
            let { red, green, blue } = this.getColorChannels(color);
            if (percent > 0) { // shade given color
                red *= 1 - percent;
                green *= 1 - percent;
                blue *= 1 - percent;
            } else { // tint given color
                red += (255 - red) * percent;
                green += (255 - green) * percent;
                blue += (255 - blue) * percent;
            }
            return `rgb(${ Math.round(red) }, ${ Math.round(green) }, ${ Math.round(blue) })`;
        },
        addItem (item) {
            this.$set(this.items, item.index, item);
        },
        removeItem (item) {
            delete this.items[item.index];
        },
        addSubmenu (item) {
            this.$set(this.submenus, item.index, item);
        },
        removeSubmenu (item) {
            delete this.submenus[item.index];
        },
        openMenu (index, indexPath) {
            let openedMenus = this.openedMenus;
            if (openedMenus.indexOf(index) !== -1) return;

            // Collapse all menus that are not under current menu item
            if (this.uniqueOpened) {
                this.openedMenus = openedMenus.filter(index => {
                    return indexPath.indexOf(index) !== -1;
                });
            }
            this.openedMenus.push(index);
        },
        closeMenu (index) {
            const i = this.openedMenus.indexOf(index);
            if (i !== -1) {
                this.openedMenus.splice(i, 1);
            }
        },
        handleSubmenuClick (submenu) {
            const { index, indexPath } = submenu;
            let isOpened = this.openedMenus.indexOf(index) !== -1;
            if (isOpened) {
                this.closeMenu(index);
                this.$emit('close', index, indexPath);
            } else {
                this.openMenu(index, indexPath);
                this.$emit('open', index, indexPath);
            }
        },
        handleItemClick (item) {
            const { index, indexPath } = item;
            const oldActiveIndex = this.activeIndex;
            this.activeIndex = item.index;
            this.$emit('select', index, indexPath, item);
            if (this.orientation === 'horizontal' || this.collapse) {
                this.openedMenus = [];
            }
            if (this.router) {
                this.routeToItem(item, (error) => {
                    this.activeIndex = oldActiveIndex;
                    if (error) console.error(error);
                });
            }
        },

        // initialize opened menu
        initOpenedMenu () {
            const index = this.activeIndex;
            const activeItem = this.items[index];
            if (!activeItem || this.orientation === 'horizontal' || this.collapse) return;
            let indexPath = activeItem.indexPath;

            // expand all submenus of the menu item
            indexPath.forEach(index => {
                let submenu = this.submenus[index];
                submenu && this.openMenu(index, submenu.indexPath);
            });
        },
        routeToItem (item, onError) {
            let route = item.route || item.index;
            try {
                this.$router.push(route, () => {}, onError);
            } catch (e) {
                console.error(e);
            }
        },
        open (index) {
            const { indexPath } = this.submenus[index.toString()];
            indexPath.forEach(i => this.openMenu(i, indexPath));
        },
        close (index) {
            this.closeMenu(index);
        }
    },
    mounted () {
        this.initOpenedMenu();
        this.$on('item-click', this.handleItemClick);
        this.$on('submenu-click', this.handleSubmenuClick);

        if (this.orientation === 'horizontal') {
            new Menu(this); // eslint-disable-line
        }

        this.$watch('items', this.updateActiveIndex);
    }
};
