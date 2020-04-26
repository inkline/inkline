"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
require("@inkline/inkline/dist/inkline.css");
var inkline_1 = require("@inkline/inkline");
vue_1["default"].use(inkline_1["default"]);
vue_1["default"].config.productionTip = false;
new vue_1["default"]({
    render: function (h) { return h(App_vue_1["default"]); }
}).$mount('#app');
