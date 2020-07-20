import { sidebar } from '../sidebar.config';

const state = () => ({
    pages: {
        byId: {},
        allIds: []
    },
    sidebar: {
        items: [],
        allIds: []
    }
});

const getters = {
    pages(state) {
        return state.pages;
    },
    sidebar(state) {
        return state.sidebar;
    }
};

const mutations = {
    setPages(state, { pages }) {
        const processPath = (path) => path.replace(/(.+)\/index$/, '$1');

        state.pages = {
            byId: pages.reduce((acc, page) => {
                if (Array.isArray(page)) {
                    page.forEach((subPage) => {
                        acc[processPath(subPage.path)] = subPage;
                    });
                } else {
                    acc[processPath(page.path)] = page;
                }

                return acc;
            }, {}),
            allIds: pages.map((page) => processPath(page.path))
        };
    },
    setSidebar(state, { sidebar }) {
        state.sidebar = {
            items: sidebar,
            allIds: sidebar.reduce((acc, category) => {
                category.children.forEach((page) => {
                    if (page.children) {
                        page.children.forEach((subPage) => {
                            acc.push(subPage.path);
                        });
                    } else {
                        acc.push(page.path);
                    }
                });

                return acc;
            }, [])
        };
    }
};

const actions = {
    async nuxtServerInit ({ commit }, { app }) {
        const pages = await app.$content({ deep: true })
            .only(['title', 'description', 'path'])
            .fetch();

        commit('setPages', { pages });
        commit('setSidebar', { sidebar });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
