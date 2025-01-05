import "./chunk-BUSYA2B4.js";

// ../node_modules/.pnpm/micromustache@8.0.3/node_modules/micromustache/dist/micromustache.mjs
var numberConstructor = 0 .constructor;
var isFinite = numberConstructor.isFinite;
var isInteger = numberConstructor.isInteger;
var isArray = [].constructor.isArray;
function isObj(x) {
  return x !== null && typeof x === "object";
}
function isFn(x) {
  return typeof x === "function";
}
function isStr(x, minLength) {
  if (minLength === void 0) {
    minLength = 0;
  }
  return typeof x === "string" && x.length >= minLength;
}
function isNum(x) {
  return isFinite(x);
}
function isArr(x) {
  return isArray(x);
}
function isProp(x, propName) {
  return isObj(x) && propName in x;
}
var cacheSize = 1e3;
var quoteChars = "'\"`";
var Cache = (
  /** @class */
  function() {
    function Cache2(size) {
      this.size = size;
      this.reset();
    }
    Cache2.prototype.reset = function() {
      this.oldestIndex = 0;
      this.map = {};
      this.cachedKeys = new Array(this.size);
    };
    Cache2.prototype.get = function(key) {
      return this.map[key];
    };
    Cache2.prototype.set = function(key, value) {
      this.map[key] = value;
      var oldestKey = this.cachedKeys[this.oldestIndex];
      if (oldestKey !== void 0) {
        delete this.map[oldestKey];
      }
      this.cachedKeys[this.oldestIndex] = key;
      this.oldestIndex++;
      this.oldestIndex %= this.size;
    };
    return Cache2;
  }()
);
var cache = new Cache(cacheSize);
function propBetweenBrackets(propName) {
  var firstChar = propName.charAt(0);
  var lastChar = propName.substr(-1);
  if (quoteChars.includes(firstChar) || quoteChars.includes(lastChar)) {
    if (propName.length < 2 || firstChar !== lastChar) {
      throw new SyntaxError('Mismatching string quotation: "' + propName + '"');
    }
    return propName.substring(1, propName.length - 1);
  }
  if (propName.includes("[")) {
    throw new SyntaxError('Missing ] in varName "' + propName + '"');
  }
  if (firstChar === "+") {
    return propName.substr(1);
  }
  return propName;
}
function pushPropName(propNames, propName, preDot) {
  var pName = propName.trim();
  if (pName === "") {
    return propNames;
  }
  if (pName.startsWith(".")) {
    if (preDot) {
      pName = pName.substr(1).trim();
      if (pName === "") {
        return propNames;
      }
    } else {
      throw new SyntaxError('Unexpected . at the start of "' + propName + '"');
    }
  } else if (preDot) {
    throw new SyntaxError('Missing . at the start of "' + propName + '"');
  }
  if (pName.endsWith(".")) {
    throw new SyntaxError('Unexpected "." at the end of "' + propName + '"');
  }
  var propNameParts = pName.split(".");
  for (var _i = 0, propNameParts_1 = propNameParts; _i < propNameParts_1.length; _i++) {
    var propNamePart = propNameParts_1[_i];
    var trimmedPropName = propNamePart.trim();
    if (trimmedPropName === "") {
      throw new SyntaxError('Empty prop name when parsing "' + propName + '"');
    }
    propNames.push(trimmedPropName);
  }
  return propNames;
}
function toPath(varName) {
  if (!isStr(varName)) {
    throw new TypeError("Cannot parse path. Expected string. Got a " + typeof varName);
  }
  var openBracketIndex;
  var closeBracketIndex = 0;
  var beforeBracket;
  var propName;
  var preDot = false;
  var propNames = new Array(0);
  for (var currentIndex = 0; currentIndex < varName.length; currentIndex = closeBracketIndex) {
    openBracketIndex = varName.indexOf("[", currentIndex);
    if (openBracketIndex === -1) {
      break;
    }
    closeBracketIndex = varName.indexOf("]", openBracketIndex);
    if (closeBracketIndex === -1) {
      throw new SyntaxError('Missing ] in varName "' + varName + '"');
    }
    propName = varName.substring(openBracketIndex + 1, closeBracketIndex).trim();
    if (propName.length === 0) {
      throw new SyntaxError("Unexpected token ]");
    }
    closeBracketIndex++;
    beforeBracket = varName.substring(currentIndex, openBracketIndex);
    pushPropName(propNames, beforeBracket, preDot);
    propNames.push(propBetweenBrackets(propName));
    preDot = true;
  }
  var rest = varName.substring(closeBracketIndex);
  return pushPropName(propNames, rest, preDot);
}
function toPathCached(varName) {
  var result = cache.get(varName);
  if (result === void 0) {
    result = toPath(varName);
    cache.set(varName, result);
  }
  return result;
}
toPath.cached = toPathCached;
function get(scope, varNameOrPropNames, options) {
  if (options === void 0) {
    options = {};
  }
  if (!isObj(options)) {
    throw new TypeError("get expects an object option. Got " + typeof options);
  }
  var _a = options.depth, depth = _a === void 0 ? 10 : _a;
  if (!isNum(depth) || depth <= 0) {
    throw new RangeError("Expected a positive number for depth. Got " + depth);
  }
  var propNames = Array.isArray(varNameOrPropNames) ? varNameOrPropNames : toPath.cached(varNameOrPropNames);
  var propNamesAsStr = function() {
    return propNames.join(" > ");
  };
  if (propNames.length > depth) {
    throw new ReferenceError("The path cannot be deeper than " + depth + ' levels. Got "' + propNamesAsStr() + '"');
  }
  var currentScope = scope;
  for (var _i = 0, propNames_1 = propNames; _i < propNames_1.length; _i++) {
    var propName = propNames_1[_i];
    if (isProp(currentScope, propName)) {
      currentScope = currentScope[propName];
    } else if (options.propsExist) {
      throw new ReferenceError(propName + ' is not defined in the scope at path: "' + propNamesAsStr() + '"');
    } else {
      return;
    }
  }
  return currentScope;
}
var Renderer = (
  /** @class */
  function() {
    function Renderer2(tokens, options) {
      var _this = this;
      if (options === void 0) {
        options = {};
      }
      this.tokens = tokens;
      this.options = options;
      this.render = function(scope) {
        if (scope === void 0) {
          scope = {};
        }
        var varNames = _this.tokens.varNames;
        var length = varNames.length;
        _this.cacheParsedPaths();
        var values = new Array(length);
        for (var i = 0; i < length; i++) {
          values[i] = get(scope, _this.toPathCache[i], _this.options);
        }
        return _this.stringify(values);
      };
      this.renderFn = function(resolveFn, scope) {
        if (scope === void 0) {
          scope = {};
        }
        var values = _this.resolveVarNames(resolveFn, scope);
        return _this.stringify(values);
      };
      this.renderFnAsync = function(resolveFnAsync, scope) {
        if (scope === void 0) {
          scope = {};
        }
        return Promise.all(_this.resolveVarNames(resolveFnAsync, scope)).then(function(values) {
          return _this.stringify(values);
        });
      };
      if (!isObj(tokens) || !isArr(tokens.strings) || !isArr(tokens.varNames) || tokens.strings.length !== tokens.varNames.length + 1) {
        throw new TypeError("Invalid tokens object");
      }
      if (!isObj(options)) {
        throw new TypeError("Options should be an object. Got a " + typeof options);
      }
      if (options.validateVarNames) {
        this.cacheParsedPaths();
      }
    }
    Renderer2.prototype.cacheParsedPaths = function() {
      var varNames = this.tokens.varNames;
      if (this.toPathCache === void 0) {
        this.toPathCache = new Array(varNames.length);
        for (var i = 0; i < varNames.length; i++) {
          this.toPathCache[i] = toPath.cached(varNames[i]);
        }
      }
    };
    Renderer2.prototype.resolveVarNames = function(resolveFn, scope) {
      if (scope === void 0) {
        scope = {};
      }
      var varNames = this.tokens.varNames;
      if (!isFn(resolveFn)) {
        throw new TypeError("Expected a resolver function. Got " + String(resolveFn));
      }
      var length = varNames.length;
      var values = new Array(length);
      for (var i = 0; i < length; i++) {
        values[i] = resolveFn.call(null, varNames[i], scope);
      }
      return values;
    };
    Renderer2.prototype.stringify = function(values) {
      var strings = this.tokens.strings;
      var explicit = this.options.explicit;
      var length = values.length;
      var ret = "";
      for (var i = 0; i < length; i++) {
        ret += strings[i];
        var value = values[i];
        if (explicit || value !== null && value !== void 0) {
          ret += value;
        }
      }
      ret += strings[length];
      return ret;
    };
    return Renderer2;
  }()
);
function tokenize(template, options) {
  if (options === void 0) {
    options = {};
  }
  if (!isStr(template)) {
    throw new TypeError("The template parameter must be a string. Got a " + typeof template);
  }
  if (!isObj(options)) {
    throw new TypeError("Options should be an object. Got a " + typeof options);
  }
  var _a = options.tags, tags = _a === void 0 ? ["{{", "}}"] : _a, _b = options.maxVarNameLength, maxVarNameLength = _b === void 0 ? 1e3 : _b;
  if (!isArr(tags) || tags.length !== 2) {
    throw TypeError("tags should be an array of two elements. Got " + String(tags));
  }
  var openSym = tags[0], closeSym = tags[1];
  if (!isStr(openSym, 1) || !isStr(closeSym, 1) || openSym === closeSym) {
    throw new TypeError('The open and close symbols should be two distinct non-empty strings. Got "' + openSym + '" and "' + closeSym + '"');
  }
  if (!isNum(maxVarNameLength) || maxVarNameLength <= 0) {
    throw new Error("Expected a positive number for maxVarNameLength. Got " + maxVarNameLength);
  }
  var openSymLen = openSym.length;
  var closeSymLen = closeSym.length;
  var openIndex;
  var closeIndex = 0;
  var varName;
  var strings = [];
  var varNames = [];
  var currentIndex = 0;
  while (currentIndex < template.length) {
    openIndex = template.indexOf(openSym, currentIndex);
    if (openIndex === -1) {
      break;
    }
    var varNameStartIndex = openIndex + openSymLen;
    closeIndex = template.substr(varNameStartIndex, maxVarNameLength + closeSymLen).indexOf(closeSym);
    if (closeIndex === -1) {
      throw new SyntaxError('Missing "' + closeSym + '" in the template for the "' + openSym + '" at position ' + openIndex + " within " + maxVarNameLength + " characters");
    }
    closeIndex += varNameStartIndex;
    varName = template.substring(varNameStartIndex, closeIndex).trim();
    if (varName.length === 0) {
      throw new SyntaxError('Unexpected "' + closeSym + '" tag found at position ' + openIndex);
    }
    if (varName.includes(openSym)) {
      throw new SyntaxError('Variable names cannot have "' + openSym + '". But at position ' + openIndex + '. Got "' + varName + '"');
    }
    varNames.push(varName);
    closeIndex += closeSymLen;
    strings.push(template.substring(currentIndex, openIndex));
    currentIndex = closeIndex;
  }
  strings.push(template.substring(closeIndex));
  return { strings, varNames };
}
function compile(template, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = tokenize(template, options);
  return new Renderer(tokens, options);
}
function render(template, scope, options) {
  var renderer = compile(template, options);
  return renderer.render(scope);
}
function renderFn(template, resolveFn, scope, options) {
  var renderer = compile(template, options);
  return renderer.renderFn(resolveFn, scope);
}
function renderFnAsync(template, resolveFnAsync, scope, options) {
  var renderer = compile(template, options);
  return renderer.renderFnAsync(resolveFnAsync, scope);
}
export {
  Renderer,
  compile,
  get,
  render,
  renderFn,
  renderFnAsync,
  tokenize
};
//# sourceMappingURL=micromustache.js.map
