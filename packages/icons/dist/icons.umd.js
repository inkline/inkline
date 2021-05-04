var __defProp = Object.defineProperty, __hasOwnProp = Object.prototype.hasOwnProperty,
    __getOwnPropSymbols = Object.getOwnPropertySymbols, __propIsEnum = Object.prototype.propertyIsEnumerable,
    __defNormalProp = (e, o, n) => o in e ? __defProp(e, o, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[o] = n, __assign = (e, o) => {
        for (var n in o || (o = {})) __hasOwnProp.call(o, n) && __defNormalProp(e, n, o[n]);
        if (__getOwnPropSymbols) for (var n of __getOwnPropSymbols(o)) __propIsEnum.call(o, n) && __defNormalProp(e, n, o[n]);
        return e
    };
!function (e, o) {
    "object" == typeof exports && "undefined" != typeof module ? o(exports, require("vue")) : "function" == typeof define && define.amd ? define(["exports", "vue"], o) : o((e = "undefined" != typeof globalThis ? globalThis : e || self).InklineIcons = {}, e.Vue)
}(this, (function (e, o) {
    "use strict";

    console.log(e, o);
    const n = class {
        static add(e, o) {
            n.icons[e] = o
        }

        static addMultiple(e) {
            Object.keys(e).forEach((o => {
                n.icons[o] = e[o]
            }))
        }
    };
    let t = n;
    t.icons = {};
    const r = e => e.map((e => "element" === e.type ? o.h(e.name, e.attributes, r(e.children || [])) : e.value));
    var a = o.defineComponent({
        name: "IIcon",
        props: {name: {type: String, default: ""}, size: {type: String, default: ""}},
        setup(e) {
            const n = o.computed((() => e.name.replace(/[-_]([a-z0-9])/g, ((e, o) => o.toUpperCase())))),
                a = o.computed((() => t.icons[n.value])),
                l = o.computed((() => ({"inkline-icon": !0, [`-${e.size}`]: Boolean(e.size)})));
            return o.onMounted((() => {
                if (!t.icons[n.value]) throw new Error(`The icon ${n.value} is not registered.`)
            })), () => {
                var e, n;
                return o.h("svg", __assign({class: l.value}, null == (e = a.value) ? void 0 : e.attributes), r((null == (n = a.value) ? void 0 : n.children) || []))
            }
        }
    });
    const l = {
        install(e, o = {}) {
            e.component(a.name, a), Object.keys(o).forEach((e => {
                t.add(e, o[e])
            }))
        }
    };
    e.InklineIcons = l, e.default = l, Object.defineProperty(e, "__esModule", {value: !0}), e[Symbol.toStringTag] = "Module"
}));
