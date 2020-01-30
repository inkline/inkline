import Vue from 'vue'

import {
  getMatchedComponentsInstances,
  promisify,
  globalHandleError
} from './utils'

import NuxtLoading from './components/nuxt-loading.vue'

import '../css/index.scss'

import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css'

import _6f6c098b from '../layouts/default.vue'
import _8f5e12f8 from '../layouts/documentation.vue'

const layouts = { "_default": _6f6c098b,"_documentation": _8f5e12f8 }

export default {
  head: {"title":"%s - Inkline","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1, shrink-to-fit=no"},{"name":"keywords","content":"inkline, vue, vue 2, vue.js, vue components, framework, ui, ux"},{"hid":"description","name":"description","content":"Inkline is a modern UI\u002FUX framework for Vue.js, designed for creating flawless content-rich responsive web applications."},{"name":"msapplication-TileColor","content":"#ffffff"},{"name":"msapplication-TileImage","content":"\u002Ffavicon\u002Fms-icon-144x144.png"},{"name":"theme-color","content":"#ffffff"},{"hid":"og:site_name","property":"og:site_name","content":"Inkline"},{"hid":"og:type","property":"og:type","content":"website"},{"hid":"og:image","property":"og:image","content":"https:\u002F\u002Finkline.io\u002Fimages\u002Fpages\u002Findex.og.jpg"},{"hid":"mobile-web-app-capable","name":"mobile-web-app-capable","content":"yes"},{"hid":"apple-mobile-web-app-title","name":"apple-mobile-web-app-title","content":"Inkline"},{"hid":"author","name":"author","content":"Alex Grozav"},{"hid":"og:title","name":"og:title","property":"og:title","content":"Inkline"},{"hid":"og:description","name":"og:description","property":"og:description","content":"Inkline's documentation and homepage is built with Nuxt and publicly hosted on Netlify. Inkline is a modern Vue.js UI\u002FUX framework, written and maintained by @alexgrozav."}],"link":[{"rel":"apple-touch-icon","sizes":"57x57","href":"\u002Ffavicon\u002Fapple-icon-57x57.png"},{"rel":"apple-touch-icon","sizes":"60x60","href":"\u002Ffavicon\u002Fapple-icon-60x60.png"},{"rel":"apple-touch-icon","sizes":"72x72","href":"\u002Ffavicon\u002Fapple-icon-72x72.png"},{"rel":"apple-touch-icon","sizes":"76x76","href":"\u002Ffavicon\u002Fapple-icon-76x76.png"},{"rel":"apple-touch-icon","sizes":"114x114","href":"\u002Ffavicon\u002Fapple-icon-114x114.png"},{"rel":"apple-touch-icon","sizes":"120x120","href":"\u002Ffavicon\u002Fapple-icon-120x120.png"},{"rel":"apple-touch-icon","sizes":"144x144","href":"\u002Ffavicon\u002Fapple-icon-144x144.png"},{"rel":"apple-touch-icon","sizes":"152x152","href":"\u002Ffavicon\u002Fapple-icon-152x152.png"},{"rel":"apple-touch-icon","sizes":"180x180","href":"\u002Ffavicon\u002Fapple-icon-180x180.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"192x192","href":"\u002Ffavicon\u002Fandroid-icon-192x192.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"16x16","href":"\u002Ffavicon\u002Ffavicon-16x16.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"32x32","href":"\u002Ffavicon\u002Ffavicon-32x32.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"96x96","href":"\u002Ffavicon\u002Ffavicon-96x96.png"},{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon\u002Ffavicon.ico"},{"rel":"manifest","href":"\u002F_nuxt\u002Fmanifest.8f5593c4.json"}],"htmlAttrs":{"lang":"en"},"style":[],"script":[{"src":"\u002F\u002Fwww.googletagmanager.com\u002Fgtm.js?id=GTM-KD44VC3&l=dataLayer","async":true}],"noscript":[{"hid":"gtm-noscript","innerHTML":"\u003Ciframe src=\"\u002F\u002Fwww.googletagmanager.com\u002Fns.html?id=GTM-KD44VC3&l=dataLayer\" height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"\u003E\u003C\u002Fiframe\u003E","pbody":true}],"__dangerouslyDisableSanitizersByTagID":{"gtm-noscript":["innerHTML"]}},

  render (h, props) {
    const loadingEl = h('NuxtLoading', { ref: 'loading' })

    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [layoutEl])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter (el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [templateEl])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,

      transitionEl
    ])
  },

  data: () => ({
    isOnline: true,

    layout: null,
    layoutName: ''
  }),

  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (process.client) {
      window.$nuxt = this

      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
    // Add $nuxt.context
    this.context = this.$options.context
  },

  mounted () {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  computed: {
    isOffline () {
      return !this.isOnline
    }
  },

  methods: {
    refreshOnlineStatus () {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    async refresh () {
      const pages = getMatchedComponentsInstances(this.$route)

      if (!pages.length) {
        return
      }
      this.$loading.start()

      const promises = pages.map((page) => {
        const p = []

        if (page.$options.fetch) {
          p.push(promisify(page.$options.fetch, this.context))
        }

        if (page.$options.asyncData) {
          p.push(
            promisify(page.$options.asyncData, this.context)
              .then((newData) => {
                for (const key in newData) {
                  Vue.set(page.$data, key, newData[key])
                }
              })
          )
        }

        return Promise.all(p)
      })
      try {
        await Promise.all(promises)
      } catch (error) {
        this.$loading.fail()
        globalHandleError(error)
        this.error(error)
      }
      this.$loading.finish()
    },

    errorChanged () {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) {
          this.$loading.fail()
        }
        if (this.$loading.finish) {
          this.$loading.finish()
        }
      }
    },

    setLayout (layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },

  components: {
    NuxtLoading
  }
}
