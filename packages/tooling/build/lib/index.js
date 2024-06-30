"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _generate = require("./generate");
Object.keys(_generate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _generate[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _generate[key];
    }
  });
});
var _resolve = require("./resolve");
Object.keys(_resolve).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _resolve[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _resolve[key];
    }
  });
});
var _postbuild = require("./postbuild");
Object.keys(_postbuild).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _postbuild[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _postbuild[key];
    }
  });
});
var _watch = require("./watch");
Object.keys(_watch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _watch[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _watch[key];
    }
  });
});