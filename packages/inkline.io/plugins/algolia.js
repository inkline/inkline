import Vue from 'vue';
import InstantSearch from 'vue-instantsearch';

Vue.use(InstantSearch);


// import algoliasearch from 'algoliasearch/dist/algoliasearchLite';
//
// const client = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_API_KEY, {
//     timeout: 4000,
// });
//
// console.log(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_API_KEY)
//
// const index = client.initIndex('dev_inkline');
//
// (async () => {
//     try {
//         const content = await index.search({ query: 'forms' });
//         console.log(content);
//     } catch (err) {
//         console.log(err);
//         console.log(err.debugData);
//     }
// })();
