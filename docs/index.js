
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (React, require$$0, fabric) {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var createRoot;
	var m = require$$0;
	{
	  createRoot = m.createRoot;
	  m.hydrateRoot;
	}

	var classnames$1 = {exports: {}};

	/*!
		Copyright (c) 2018 Jed Watson.
		Licensed under the MIT License (MIT), see
		http://jedwatson.github.io/classnames
	*/
	(function (module) {
	  /* global define */

	  (function () {

	    var hasOwn = {}.hasOwnProperty;
	    function classNames() {
	      var classes = '';
	      for (var i = 0; i < arguments.length; i++) {
	        var arg = arguments[i];
	        if (arg) {
	          classes = appendClass(classes, parseValue(arg));
	        }
	      }
	      return classes;
	    }
	    function parseValue(arg) {
	      if (typeof arg === 'string' || typeof arg === 'number') {
	        return arg;
	      }
	      if (typeof arg !== 'object') {
	        return '';
	      }
	      if (Array.isArray(arg)) {
	        return classNames.apply(null, arg);
	      }
	      if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
	        return arg.toString();
	      }
	      var classes = '';
	      for (var key in arg) {
	        if (hasOwn.call(arg, key) && arg[key]) {
	          classes = appendClass(classes, key);
	        }
	      }
	      return classes;
	    }
	    function appendClass(value, newClass) {
	      if (!newClass) {
	        return value;
	      }
	      if (value) {
	        return value + ' ' + newClass;
	      }
	      return value + newClass;
	    }
	    if (module.exports) {
	      classNames.default = classNames;
	      module.exports = classNames;
	    } else {
	      window.classNames = classNames;
	    }
	  })();
	})(classnames$1);
	var classnamesExports = classnames$1.exports;
	var classnames = /*@__PURE__*/getDefaultExportFromCjs(classnamesExports);

	function _arrayLikeToArray(r, a) {
	  (null == a || a > r.length) && (a = r.length);
	  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	  return n;
	}
	function _arrayWithHoles(r) {
	  if (Array.isArray(r)) return r;
	}
	function _arrayWithoutHoles(r) {
	  if (Array.isArray(r)) return _arrayLikeToArray(r);
	}
	function _assertThisInitialized(e) {
	  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  return e;
	}
	function asyncGeneratorStep(n, t, e, r, o, a, c) {
	  try {
	    var i = n[a](c),
	      u = i.value;
	  } catch (n) {
	    return void e(n);
	  }
	  i.done ? t(u) : Promise.resolve(u).then(r, o);
	}
	function _asyncToGenerator(n) {
	  return function () {
	    var t = this,
	      e = arguments;
	    return new Promise(function (r, o) {
	      var a = n.apply(t, e);
	      function _next(n) {
	        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
	      }
	      function _throw(n) {
	        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
	      }
	      _next(void 0);
	    });
	  };
	}
	function _callSuper(t, o, e) {
	  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
	}
	function _classCallCheck(a, n) {
	  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
	}
	function _defineProperties(e, r) {
	  for (var t = 0; t < r.length; t++) {
	    var o = r[t];
	    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
	  }
	}
	function _createClass(e, r, t) {
	  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
	    writable: !1
	  }), e;
	}
	function _createForOfIteratorHelper(r, e) {
	  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	  if (!t) {
	    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
	      t && (r = t);
	      var n = 0,
	        F = function () {};
	      return {
	        s: F,
	        n: function () {
	          return n >= r.length ? {
	            done: !0
	          } : {
	            done: !1,
	            value: r[n++]
	          };
	        },
	        e: function (r) {
	          throw r;
	        },
	        f: F
	      };
	    }
	    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	  }
	  var o,
	    a = !0,
	    u = !1;
	  return {
	    s: function () {
	      t = t.call(r);
	    },
	    n: function () {
	      var r = t.next();
	      return a = r.done, r;
	    },
	    e: function (r) {
	      u = !0, o = r;
	    },
	    f: function () {
	      try {
	        a || null == t.return || t.return();
	      } finally {
	        if (u) throw o;
	      }
	    }
	  };
	}
	function _defineProperty(e, r, t) {
	  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
	    value: t,
	    enumerable: !0,
	    configurable: !0,
	    writable: !0
	  }) : e[r] = t, e;
	}
	function _get() {
	  return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
	    var p = _superPropBase(e, t);
	    if (p) {
	      var n = Object.getOwnPropertyDescriptor(p, t);
	      return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
	    }
	  }, _get.apply(null, arguments);
	}
	function _getPrototypeOf(t) {
	  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
	    return t.__proto__ || Object.getPrototypeOf(t);
	  }, _getPrototypeOf(t);
	}
	function _inherits(t, e) {
	  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
	  t.prototype = Object.create(e && e.prototype, {
	    constructor: {
	      value: t,
	      writable: !0,
	      configurable: !0
	    }
	  }), Object.defineProperty(t, "prototype", {
	    writable: !1
	  }), e && _setPrototypeOf(t, e);
	}
	function _isNativeReflectConstruct() {
	  try {
	    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
	  } catch (t) {}
	  return (_isNativeReflectConstruct = function () {
	    return !!t;
	  })();
	}
	function _iterableToArray(r) {
	  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
	}
	function _iterableToArrayLimit(r, l) {
	  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	  if (null != t) {
	    var e,
	      n,
	      i,
	      u,
	      a = [],
	      f = !0,
	      o = !1;
	    try {
	      if (i = (t = t.call(r)).next, 0 === l) {
	        if (Object(t) !== t) return;
	        f = !1;
	      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
	    } catch (r) {
	      o = !0, n = r;
	    } finally {
	      try {
	        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
	      } finally {
	        if (o) throw n;
	      }
	    }
	    return a;
	  }
	}
	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function _possibleConstructorReturn(t, e) {
	  if (e && ("object" == typeof e || "function" == typeof e)) return e;
	  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
	  return _assertThisInitialized(t);
	}
	function _regeneratorRuntime() {
	  _regeneratorRuntime = function () {
	    return e;
	  };
	  var t,
	    e = {},
	    r = Object.prototype,
	    n = r.hasOwnProperty,
	    o = Object.defineProperty || function (t, e, r) {
	      t[e] = r.value;
	    },
	    i = "function" == typeof Symbol ? Symbol : {},
	    a = i.iterator || "@@iterator",
	    c = i.asyncIterator || "@@asyncIterator",
	    u = i.toStringTag || "@@toStringTag";
	  function define(t, e, r) {
	    return Object.defineProperty(t, e, {
	      value: r,
	      enumerable: !0,
	      configurable: !0,
	      writable: !0
	    }), t[e];
	  }
	  try {
	    define({}, "");
	  } catch (t) {
	    define = function (t, e, r) {
	      return t[e] = r;
	    };
	  }
	  function wrap(t, e, r, n) {
	    var i = e && e.prototype instanceof Generator ? e : Generator,
	      a = Object.create(i.prototype),
	      c = new Context(n || []);
	    return o(a, "_invoke", {
	      value: makeInvokeMethod(t, r, c)
	    }), a;
	  }
	  function tryCatch(t, e, r) {
	    try {
	      return {
	        type: "normal",
	        arg: t.call(e, r)
	      };
	    } catch (t) {
	      return {
	        type: "throw",
	        arg: t
	      };
	    }
	  }
	  e.wrap = wrap;
	  var h = "suspendedStart",
	    l = "suspendedYield",
	    f = "executing",
	    s = "completed",
	    y = {};
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	  var p = {};
	  define(p, a, function () {
	    return this;
	  });
	  var d = Object.getPrototypeOf,
	    v = d && d(d(values([])));
	  v && v !== r && n.call(v, a) && (p = v);
	  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
	  function defineIteratorMethods(t) {
	    ["next", "throw", "return"].forEach(function (e) {
	      define(t, e, function (t) {
	        return this._invoke(e, t);
	      });
	    });
	  }
	  function AsyncIterator(t, e) {
	    function invoke(r, o, i, a) {
	      var c = tryCatch(t[r], t, o);
	      if ("throw" !== c.type) {
	        var u = c.arg,
	          h = u.value;
	        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
	          invoke("next", t, i, a);
	        }, function (t) {
	          invoke("throw", t, i, a);
	        }) : e.resolve(h).then(function (t) {
	          u.value = t, i(u);
	        }, function (t) {
	          return invoke("throw", t, i, a);
	        });
	      }
	      a(c.arg);
	    }
	    var r;
	    o(this, "_invoke", {
	      value: function (t, n) {
	        function callInvokeWithMethodAndArg() {
	          return new e(function (e, r) {
	            invoke(t, n, e, r);
	          });
	        }
	        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	      }
	    });
	  }
	  function makeInvokeMethod(e, r, n) {
	    var o = h;
	    return function (i, a) {
	      if (o === f) throw Error("Generator is already running");
	      if (o === s) {
	        if ("throw" === i) throw a;
	        return {
	          value: t,
	          done: !0
	        };
	      }
	      for (n.method = i, n.arg = a;;) {
	        var c = n.delegate;
	        if (c) {
	          var u = maybeInvokeDelegate(c, n);
	          if (u) {
	            if (u === y) continue;
	            return u;
	          }
	        }
	        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
	          if (o === h) throw o = s, n.arg;
	          n.dispatchException(n.arg);
	        } else "return" === n.method && n.abrupt("return", n.arg);
	        o = f;
	        var p = tryCatch(e, r, n);
	        if ("normal" === p.type) {
	          if (o = n.done ? s : l, p.arg === y) continue;
	          return {
	            value: p.arg,
	            done: n.done
	          };
	        }
	        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
	      }
	    };
	  }
	  function maybeInvokeDelegate(e, r) {
	    var n = r.method,
	      o = e.iterator[n];
	    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
	    var i = tryCatch(o, e.iterator, r.arg);
	    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
	    var a = i.arg;
	    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
	  }
	  function pushTryEntry(t) {
	    var e = {
	      tryLoc: t[0]
	    };
	    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
	  }
	  function resetTryEntry(t) {
	    var e = t.completion || {};
	    e.type = "normal", delete e.arg, t.completion = e;
	  }
	  function Context(t) {
	    this.tryEntries = [{
	      tryLoc: "root"
	    }], t.forEach(pushTryEntry, this), this.reset(!0);
	  }
	  function values(e) {
	    if (e || "" === e) {
	      var r = e[a];
	      if (r) return r.call(e);
	      if ("function" == typeof e.next) return e;
	      if (!isNaN(e.length)) {
	        var o = -1,
	          i = function next() {
	            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
	            return next.value = t, next.done = !0, next;
	          };
	        return i.next = i;
	      }
	    }
	    throw new TypeError(typeof e + " is not iterable");
	  }
	  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
	    value: GeneratorFunctionPrototype,
	    configurable: !0
	  }), o(GeneratorFunctionPrototype, "constructor", {
	    value: GeneratorFunction,
	    configurable: !0
	  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
	    var e = "function" == typeof t && t.constructor;
	    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
	  }, e.mark = function (t) {
	    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
	  }, e.awrap = function (t) {
	    return {
	      __await: t
	    };
	  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
	    return this;
	  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
	    void 0 === i && (i = Promise);
	    var a = new AsyncIterator(wrap(t, r, n, o), i);
	    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
	      return t.done ? t.value : a.next();
	    });
	  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
	    return this;
	  }), define(g, "toString", function () {
	    return "[object Generator]";
	  }), e.keys = function (t) {
	    var e = Object(t),
	      r = [];
	    for (var n in e) r.push(n);
	    return r.reverse(), function next() {
	      for (; r.length;) {
	        var t = r.pop();
	        if (t in e) return next.value = t, next.done = !1, next;
	      }
	      return next.done = !0, next;
	    };
	  }, e.values = values, Context.prototype = {
	    constructor: Context,
	    reset: function (e) {
	      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
	    },
	    stop: function () {
	      this.done = !0;
	      var t = this.tryEntries[0].completion;
	      if ("throw" === t.type) throw t.arg;
	      return this.rval;
	    },
	    dispatchException: function (e) {
	      if (this.done) throw e;
	      var r = this;
	      function handle(n, o) {
	        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
	      }
	      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
	        var i = this.tryEntries[o],
	          a = i.completion;
	        if ("root" === i.tryLoc) return handle("end");
	        if (i.tryLoc <= this.prev) {
	          var c = n.call(i, "catchLoc"),
	            u = n.call(i, "finallyLoc");
	          if (c && u) {
	            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
	            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
	          } else if (c) {
	            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
	          } else {
	            if (!u) throw Error("try statement without catch or finally");
	            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
	          }
	        }
	      }
	    },
	    abrupt: function (t, e) {
	      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
	        var o = this.tryEntries[r];
	        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
	          var i = o;
	          break;
	        }
	      }
	      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
	      var a = i ? i.completion : {};
	      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
	    },
	    complete: function (t, e) {
	      if ("throw" === t.type) throw t.arg;
	      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
	    },
	    finish: function (t) {
	      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
	        var r = this.tryEntries[e];
	        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
	      }
	    },
	    catch: function (t) {
	      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
	        var r = this.tryEntries[e];
	        if (r.tryLoc === t) {
	          var n = r.completion;
	          if ("throw" === n.type) {
	            var o = n.arg;
	            resetTryEntry(r);
	          }
	          return o;
	        }
	      }
	      throw Error("illegal catch attempt");
	    },
	    delegateYield: function (e, r, n) {
	      return this.delegate = {
	        iterator: values(e),
	        resultName: r,
	        nextLoc: n
	      }, "next" === this.method && (this.arg = t), y;
	    }
	  }, e;
	}
	function _setPrototypeOf(t, e) {
	  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
	    return t.__proto__ = e, t;
	  }, _setPrototypeOf(t, e);
	}
	function _slicedToArray(r, e) {
	  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
	}
	function _superPropBase(t, o) {
	  for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)););
	  return t;
	}
	function _toArray(r) {
	  return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest();
	}
	function _toConsumableArray(r) {
	  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
	}
	function _toPrimitive(t, r) {
	  if ("object" != typeof t || !t) return t;
	  var e = t[Symbol.toPrimitive];
	  if (void 0 !== e) {
	    var i = e.call(t, r || "default");
	    if ("object" != typeof i) return i;
	    throw new TypeError("@@toPrimitive must return a primitive value.");
	  }
	  return ("string" === r ? String : Number)(t);
	}
	function _toPropertyKey(t) {
	  var i = _toPrimitive(t, "string");
	  return "symbol" == typeof i ? i : i + "";
	}
	function _typeof(o) {
	  "@babel/helpers - typeof";

	  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
	    return typeof o;
	  } : function (o) {
	    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	  }, _typeof(o);
	}
	function _unsupportedIterableToArray(r, a) {
	  if (r) {
	    if ("string" == typeof r) return _arrayLikeToArray(r, a);
	    var t = {}.toString.call(r).slice(8, -1);
	    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
	  }
	}

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || value !== value && other !== other;
	}

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	    index = assocIndexOf(data, key);
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	    index = assocIndexOf(data, key);
	  return index < 0 ? undefined : data[index][1];
	}

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	    index = assocIndexOf(data, key);
	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	    length = entries == null ? 0 : entries.length;
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache();
	  this.size = 0;
	}

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	    result = data['delete'](key);
	  this.size = data.size;
	  return result;
	}

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global && global.Object === Object && global;

	/** Detect free variable `self`. */
	var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root$1 = freeGlobal || freeSelf || Function('return this')();

	/** Built-in value references. */
	var Symbol$1 = root$1.Symbol;

	/** Used for built-in method references. */
	var objectProto$f = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$c = objectProto$f.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString$1 = objectProto$f.toString;

	/** Built-in value references. */
	var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty$c.call(value, symToStringTag$1),
	    tag = value[symToStringTag$1];
	  try {
	    value[symToStringTag$1] = undefined;
	    var unmasked = true;
	  } catch (e) {}
	  var result = nativeObjectToString$1.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag$1] = tag;
	    } else {
	      delete value[symToStringTag$1];
	    }
	  }
	  return result;
	}

	/** Used for built-in method references. */
	var objectProto$e = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto$e.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	  undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject$1(value) {
	  var type = _typeof(value);
	  return value != null && (type == 'object' || type == 'function');
	}

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	  funcTag$2 = '[object Function]',
	  genTag$1 = '[object GeneratorFunction]',
	  proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction$1(value) {
	  if (!isObject$1(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
	}

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root$1['__core-js_shared__'];

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = function () {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? 'Symbol(src)_1.' + uid : '';
	}();

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && maskSrcKey in func;
	}

	/** Used for built-in method references. */
	var funcProto$2 = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString$2 = funcProto$2.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString$2.call(func);
	    } catch (e) {}
	    try {
	      return func + '';
	    } catch (e) {}
	  }
	  return '';
	}

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto$1 = Function.prototype,
	  objectProto$d = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString$1 = funcProto$1.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty$b = objectProto$d.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + funcToString$1.call(hasOwnProperty$b).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject$1(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	/* Built-in method references that are verified to be native. */
	var Map$1 = getNative(root$1, 'Map');

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto$c = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$a = objectProto$c.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED$2 ? undefined : result;
	  }
	  return hasOwnProperty$a.call(data, key) ? data[key] : undefined;
	}

	/** Used for built-in method references. */
	var objectProto$b = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty$9.call(data, key);
	}

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED$1 : value;
	  return this;
	}

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	    length = entries == null ? 0 : entries.length;
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash(),
	    'map': new (Map$1 || ListCache)(),
	    'string': new Hash()
	  };
	}

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = _typeof(value);
	  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
	}

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
	}

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	    size = data.size;
	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	    length = entries == null ? 0 : entries.length;
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	    length = array == null ? 0 : array.length;
	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}
	var defineProperty = function () {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}();

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	/** Used for built-in method references. */
	var objectProto$a = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty$8.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
	    baseAssignValue(object, key, value);
	  }
	}

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});
	  var index = -1,
	    length = props.length;
	  while (++index < length) {
	    var key = props[index];
	    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	    result = Array(n);
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && _typeof(value) == 'object';
	}

	/** `Object#toString` result references. */
	var argsTag$3 = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag$3;
	}

	/** Used for built-in method references. */
	var objectProto$9 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable$1 = objectProto$9.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function () {
	  return arguments;
	}()) ? baseIsArguments : function (value) {
	  return isObjectLike(value) && hasOwnProperty$7.call(value, 'callee') && !propertyIsEnumerable$1.call(value, 'callee');
	};

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	/** Detect free variable `exports`. */
	var freeExports$2 = (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule$2 = freeExports$2 && (typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

	/** Built-in value references. */
	var Buffer$1 = moduleExports$2 ? root$1.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER$1 = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  var type = _typeof(value);
	  length = length == null ? MAX_SAFE_INTEGER$1 : length;
	  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
	}

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/** `Object#toString` result references. */
	var argsTag$2 = '[object Arguments]',
	  arrayTag$2 = '[object Array]',
	  boolTag$3 = '[object Boolean]',
	  dateTag$3 = '[object Date]',
	  errorTag$2 = '[object Error]',
	  funcTag$1 = '[object Function]',
	  mapTag$5 = '[object Map]',
	  numberTag$3 = '[object Number]',
	  objectTag$4 = '[object Object]',
	  regexpTag$3 = '[object RegExp]',
	  setTag$5 = '[object Set]',
	  stringTag$3 = '[object String]',
	  weakMapTag$2 = '[object WeakMap]';
	var arrayBufferTag$3 = '[object ArrayBuffer]',
	  dataViewTag$4 = '[object DataView]',
	  float32Tag$2 = '[object Float32Array]',
	  float64Tag$2 = '[object Float64Array]',
	  int8Tag$2 = '[object Int8Array]',
	  int16Tag$2 = '[object Int16Array]',
	  int32Tag$2 = '[object Int32Array]',
	  uint8Tag$2 = '[object Uint8Array]',
	  uint8ClampedTag$2 = '[object Uint8ClampedArray]',
	  uint16Tag$2 = '[object Uint16Array]',
	  uint32Tag$2 = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
	typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] = typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] = typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] = typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$5] = typedArrayTags[numberTag$3] = typedArrayTags[objectTag$4] = typedArrayTags[regexpTag$3] = typedArrayTags[setTag$5] = typedArrayTags[stringTag$3] = typedArrayTags[weakMapTag$2] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function (value) {
	    return func(value);
	  };
	}

	/** Detect free variable `exports`. */
	var freeExports$1 = (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule$1 = freeExports$1 && (typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports$1 && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = function () {
	  try {
	    // Use `util.types` for Node.js 10+.
	    var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;
	    if (types) {
	      return types;
	    }

	    // Legacy `process.binding('util')` for Node.js < 10.
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}();

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	/** Used for built-in method references. */
	var objectProto$8 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	    isArg = !isArr && isArguments(value),
	    isBuff = !isArr && !isArg && isBuffer(value),
	    isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	    skipIndexes = isArr || isArg || isBuff || isType,
	    result = skipIndexes ? baseTimes(value.length, String) : [],
	    length = result.length;
	  for (var key in value) {
	    if ((inherited || hasOwnProperty$6.call(value, key)) && !(skipIndexes && (
	    // Safari 9 has enumerable `arguments.length` in strict mode.
	    key == 'length' ||
	    // Node.js 0.10 has enumerable non-index properties on buffers.
	    isBuff && (key == 'offset' || key == 'parent') ||
	    // PhantomJS 2 has enumerable non-index properties on typed arrays.
	    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') ||
	    // Skip index properties.
	    isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/** Used for built-in method references. */
	var objectProto$7 = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	    proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$7;
	  return value === proto;
	}

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function (arg) {
	    return func(transform(arg));
	  };
	}

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	/** Used for built-in method references. */
	var objectProto$6 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty$5.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction$1(value);
	}

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/** Used for built-in method references. */
	var objectProto$5 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject$1(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	    result = [];
	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty$4.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	/**
	 * The base implementation of `_.assignIn` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssignIn(object, source) {
	  return object && copyObject(source, keysIn(source), object);
	}

	/** Detect free variable `exports`. */
	var freeExports = (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && (typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root$1.Buffer : undefined,
	  allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	    result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
	  buffer.copy(result);
	  return result;
	}

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	    length = source.length;
	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	    length = array == null ? 0 : array.length,
	    resIndex = 0,
	    result = [];
	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	/** Used for built-in method references. */
	var objectProto$4 = Object.prototype;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto$4.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = !nativeGetSymbols$1 ? stubArray : function (object) {
	  if (object == null) {
	    return [];
	  }
	  object = Object(object);
	  return arrayFilter(nativeGetSymbols$1(object), function (symbol) {
	    return propertyIsEnumerable.call(object, symbol);
	  });
	};

	/**
	 * Copies own symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	    length = values.length,
	    offset = array.length;
	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);
	var getPrototype$1 = getPrototype;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own and inherited enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbolsIn = !nativeGetSymbols ? stubArray : function (object) {
	  var result = [];
	  while (object) {
	    arrayPush(result, getSymbols(object));
	    object = getPrototype$1(object);
	  }
	  return result;
	};

	/**
	 * Copies own and inherited symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbolsIn(source, object) {
	  return copyObject(source, getSymbolsIn(source), object);
	}

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}

	/**
	 * Creates an array of own and inherited enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeysIn(object) {
	  return baseGetAllKeys(object, keysIn, getSymbolsIn);
	}

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root$1, 'DataView');

	/* Built-in method references that are verified to be native. */
	var Promise$1 = getNative(root$1, 'Promise');

	/* Built-in method references that are verified to be native. */
	var Set$1 = getNative(root$1, 'Set');

	/* Built-in method references that are verified to be native. */
	var WeakMap$1 = getNative(root$1, 'WeakMap');

	/** `Object#toString` result references. */
	var mapTag$4 = '[object Map]',
	  objectTag$3 = '[object Object]',
	  promiseTag = '[object Promise]',
	  setTag$4 = '[object Set]',
	  weakMapTag$1 = '[object WeakMap]';
	var dataViewTag$3 = '[object DataView]';

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	  mapCtorString = toSource(Map$1),
	  promiseCtorString = toSource(Promise$1),
	  setCtorString = toSource(Set$1),
	  weakMapCtorString = toSource(WeakMap$1);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$3 || Map$1 && getTag(new Map$1()) != mapTag$4 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$4 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag$1) {
	  getTag = function getTag(value) {
	    var result = baseGetTag(value),
	      Ctor = result == objectTag$3 ? value.constructor : undefined,
	      ctorString = Ctor ? toSource(Ctor) : '';
	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString:
	          return dataViewTag$3;
	        case mapCtorString:
	          return mapTag$4;
	        case promiseCtorString:
	          return promiseTag;
	        case setCtorString:
	          return setTag$4;
	        case weakMapCtorString:
	          return weakMapTag$1;
	      }
	    }
	    return result;
	  };
	}
	var getTag$1 = getTag;

	/** Used for built-in method references. */
	var objectProto$3 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	    result = new array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty$3.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	/** Built-in value references. */
	var Uint8Array = root$1.Uint8Array;

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	/** Used to convert symbols to primitives and strings. */
	var symbolProto$2 = Symbol$1 ? Symbol$1.prototype : undefined,
	  symbolValueOf$1 = symbolProto$2 ? symbolProto$2.valueOf : undefined;

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
	}

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	/** `Object#toString` result references. */
	var boolTag$2 = '[object Boolean]',
	  dateTag$2 = '[object Date]',
	  mapTag$3 = '[object Map]',
	  numberTag$2 = '[object Number]',
	  regexpTag$2 = '[object RegExp]',
	  setTag$3 = '[object Set]',
	  stringTag$2 = '[object String]',
	  symbolTag$3 = '[object Symbol]';
	var arrayBufferTag$2 = '[object ArrayBuffer]',
	  dataViewTag$2 = '[object DataView]',
	  float32Tag$1 = '[object Float32Array]',
	  float64Tag$1 = '[object Float64Array]',
	  int8Tag$1 = '[object Int8Array]',
	  int16Tag$1 = '[object Int16Array]',
	  int32Tag$1 = '[object Int32Array]',
	  uint8Tag$1 = '[object Uint8Array]',
	  uint8ClampedTag$1 = '[object Uint8ClampedArray]',
	  uint16Tag$1 = '[object Uint16Array]',
	  uint32Tag$1 = '[object Uint32Array]';

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag$2:
	      return cloneArrayBuffer(object);
	    case boolTag$2:
	    case dateTag$2:
	      return new Ctor(+object);
	    case dataViewTag$2:
	      return cloneDataView(object, isDeep);
	    case float32Tag$1:
	    case float64Tag$1:
	    case int8Tag$1:
	    case int16Tag$1:
	    case int32Tag$1:
	    case uint8Tag$1:
	    case uint8ClampedTag$1:
	    case uint16Tag$1:
	    case uint32Tag$1:
	      return cloneTypedArray(object, isDeep);
	    case mapTag$3:
	      return new Ctor();
	    case numberTag$2:
	    case stringTag$2:
	      return new Ctor(object);
	    case regexpTag$2:
	      return cloneRegExp(object);
	    case setTag$3:
	      return new Ctor();
	    case symbolTag$3:
	      return cloneSymbol(object);
	  }
	}

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = function () {
	  function object() {}
	  return function (proto) {
	    if (!isObject$1(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object();
	    object.prototype = undefined;
	    return result;
	  };
	}();

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype$1(object)) : {};
	}

	/** `Object#toString` result references. */
	var mapTag$2 = '[object Map]';

	/**
	 * The base implementation of `_.isMap` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	 */
	function baseIsMap(value) {
	  return isObjectLike(value) && getTag$1(value) == mapTag$2;
	}

	/* Node.js helper references. */
	var nodeIsMap = nodeUtil && nodeUtil.isMap;

	/**
	 * Checks if `value` is classified as a `Map` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	 * @example
	 *
	 * _.isMap(new Map);
	 * // => true
	 *
	 * _.isMap(new WeakMap);
	 * // => false
	 */
	var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

	/** `Object#toString` result references. */
	var setTag$2 = '[object Set]';

	/**
	 * The base implementation of `_.isSet` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	 */
	function baseIsSet(value) {
	  return isObjectLike(value) && getTag$1(value) == setTag$2;
	}

	/* Node.js helper references. */
	var nodeIsSet = nodeUtil && nodeUtil.isSet;

	/**
	 * Checks if `value` is classified as a `Set` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	 * @example
	 *
	 * _.isSet(new Set);
	 * // => true
	 *
	 * _.isSet(new WeakSet);
	 * // => false
	 */
	var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG$1 = 1,
	  CLONE_FLAT_FLAG = 2,
	  CLONE_SYMBOLS_FLAG$1 = 4;

	/** `Object#toString` result references. */
	var argsTag$1 = '[object Arguments]',
	  arrayTag$1 = '[object Array]',
	  boolTag$1 = '[object Boolean]',
	  dateTag$1 = '[object Date]',
	  errorTag$1 = '[object Error]',
	  funcTag = '[object Function]',
	  genTag = '[object GeneratorFunction]',
	  mapTag$1 = '[object Map]',
	  numberTag$1 = '[object Number]',
	  objectTag$2 = '[object Object]',
	  regexpTag$1 = '[object RegExp]',
	  setTag$1 = '[object Set]',
	  stringTag$1 = '[object String]',
	  symbolTag$2 = '[object Symbol]',
	  weakMapTag = '[object WeakMap]';
	var arrayBufferTag$1 = '[object ArrayBuffer]',
	  dataViewTag$1 = '[object DataView]',
	  float32Tag = '[object Float32Array]',
	  float64Tag = '[object Float64Array]',
	  int8Tag = '[object Int8Array]',
	  int16Tag = '[object Int16Array]',
	  int32Tag = '[object Int32Array]',
	  uint8Tag = '[object Uint8Array]',
	  uint8ClampedTag = '[object Uint8ClampedArray]',
	  uint16Tag = '[object Uint16Array]',
	  uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] = cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$1] = cloneableTags[boolTag$1] = cloneableTags[dateTag$1] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag$1] = cloneableTags[numberTag$1] = cloneableTags[objectTag$2] = cloneableTags[regexpTag$1] = cloneableTags[setTag$1] = cloneableTags[stringTag$1] = cloneableTags[symbolTag$2] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag$1] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Deep clone
	 *  2 - Flatten inherited properties
	 *  4 - Clone symbols
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, bitmask, customizer, key, object, stack) {
	  var result,
	    isDeep = bitmask & CLONE_DEEP_FLAG$1,
	    isFlat = bitmask & CLONE_FLAT_FLAG,
	    isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject$1(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag$1(value),
	      isFunc = tag == funcTag || tag == genTag;
	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag$2 || tag == argsTag$1 || isFunc && !object) {
	      result = isFlat || isFunc ? {} : initCloneObject(value);
	      if (!isDeep) {
	        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack());
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);
	  if (isSet(value)) {
	    value.forEach(function (subValue) {
	      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
	    });
	  } else if (isMap(value)) {
	    value.forEach(function (subValue, key) {
	      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
	    });
	  }
	  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
	  var props = isArr ? undefined : keysFunc(value);
	  arrayEach(props || value, function (subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
	  });
	  return result;
	}

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	  CLONE_SYMBOLS_FLAG = 4;

	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.0.0
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @see _.clone
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var deep = _.cloneDeep(objects);
	 * console.log(deep[0] === objects[0]);
	 * // => false
	 */
	function cloneDeep(value) {
	  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
	}

	/** Used to match a single whitespace character. */
	var reWhitespace = /\s/;

	/**
	 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
	 * character of `string`.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {number} Returns the index of the last non-whitespace character.
	 */
	function trimmedEndIndex(string) {
	  var index = string.length;
	  while (index-- && reWhitespace.test(string.charAt(index))) {}
	  return index;
	}

	/** Used to match leading whitespace. */
	var reTrimStart = /^\s+/;

	/**
	 * The base implementation of `_.trim`.
	 *
	 * @private
	 * @param {string} string The string to trim.
	 * @returns {string} Returns the trimmed string.
	 */
	function baseTrim(string) {
	  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '') : string;
	}

	/** `Object#toString` result references. */
	var symbolTag$1 = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return _typeof(value) == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag$1;
	}

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject$1(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject$1(other) ? other + '' : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = baseTrim(value);
	  var isBinary = reIsBinary.test(value);
	  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
	}

	/** Used as references for various `Number` constants. */
	var INFINITY$1 = 1 / 0,
	  MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY$1 || value === -INFINITY$1) {
	    var sign = value < 0 ? -1 : 1;
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	    remainder = result % 1;
	  return result === result ? remainder ? result - remainder : result : 0;
	}

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	    length = array == null ? 0 : array.length,
	    result = Array(length);
	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : undefined,
	  symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = value + '';
	  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
	}

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsFinite = root$1.isFinite,
	  nativeMin$1 = Math.min;

	/**
	 * Creates a function like `_.round`.
	 *
	 * @private
	 * @param {string} methodName The name of the `Math` method to use when rounding.
	 * @returns {Function} Returns the new round function.
	 */
	function createRound(methodName) {
	  var func = Math[methodName];
	  return function (number, precision) {
	    number = toNumber(number);
	    precision = precision == null ? 0 : nativeMin$1(toInteger(precision), 292);
	    if (precision && nativeIsFinite(number)) {
	      // Shift with exponential notation to avoid floating-point issues.
	      // See [MDN](https://mdn.io/round#Examples) for more details.
	      var pair = (toString(number) + 'e').split('e'),
	        value = func(pair[0] + 'e' + (+pair[1] + precision));
	      pair = (toString(value) + 'e').split('e');
	      return +(pair[0] + 'e' + (+pair[1] - precision));
	    }
	    return func(number);
	  };
	}

	/**
	 * Computes `number` rounded to `precision`.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.10.0
	 * @category Math
	 * @param {number} number The number to round.
	 * @param {number} [precision=0] The precision to round to.
	 * @returns {number} Returns the rounded number.
	 * @example
	 *
	 * _.round(4.006);
	 * // => 4
	 *
	 * _.round(4.006, 2);
	 * // => 4.01
	 *
	 * _.round(4060, -2);
	 * // => 4100
	 */
	var round = createRound('round');

	/**
	 * 计算相乘矩阵
	 */
	var calcMultiplyMatrix = function calcMultiplyMatrix(a, b) {
	  return [a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1], a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3], a[0] * b[4] + a[2] * b[5] + a[4], a[1] * b[4] + a[3] * b[5] + a[5]];
	};

	/**
	 * 变换
	 * @param coord 路径
	 * @param transformQueue 变换流程
	 */
	var calcTransformMatrix = function calcTransformMatrix(transformQueue) {
	  return transformQueue.reduce(function (matrix, transfrom) {
	    var translate = transfrom.translate,
	      scale = transfrom.scale,
	      rotate = transfrom.rotate,
	      flip = transfrom.flip,
	      skew = transfrom.skew;
	    if (scale !== undefined) {
	      return calcMultiplyMatrix(matrix, [typeof scale === 'number' ? scale : scale.x, 0, 0, typeof scale === 'number' ? scale : scale.y, 0, 0]);
	    }
	    if (rotate !== undefined) {
	      var radians = rotate * Math.PI / 180;
	      var cosAngle = Math.cos(radians);
	      var sinAngle = Math.sin(radians);
	      return calcMultiplyMatrix(matrix, [cosAngle, sinAngle, -sinAngle, cosAngle, 0, 0]);
	    }
	    if (skew !== undefined) {
	      var skewX = Math.tan(skew.x * (Math.PI / 180));
	      var skewY = Math.tan(skew.y * (Math.PI / 180));
	      return calcMultiplyMatrix(matrix, [1, skewX, skewY, 1, 0, 0]);
	    }
	    if (translate !== undefined) {
	      return calcMultiplyMatrix(matrix, [1, 0, 0, 1, translate.x, translate.y]);
	    }
	    if (flip !== undefined) {
	      return calcMultiplyMatrix(matrix, [(flip === null || flip === void 0 ? void 0 : flip.x) ? -1 : 1, 0, 0, (flip === null || flip === void 0 ? void 0 : flip.y) ? -1 : 1, 0, 0]);
	    }
	    return matrix;
	  }, [1, 0, 0, 1, 0, 0]);
	};

	/**
	 * 变换
	 * @param coord 路径
	 * @param process 变换流程
	 */
	var _transform2 = function transform(coord, process) {
	  var x = coord.x,
	    y = coord.y;
	  var _calcTransformMatrix = calcTransformMatrix(process),
	    _calcTransformMatrix2 = _slicedToArray(_calcTransformMatrix, 6),
	    a = _calcTransformMatrix2[0],
	    b = _calcTransformMatrix2[1],
	    c = _calcTransformMatrix2[2],
	    d = _calcTransformMatrix2[3],
	    e = _calcTransformMatrix2[4],
	    f = _calcTransformMatrix2[5];
	  return {
	    x: a * x + c * y + e,
	    y: b * x + d * y + f
	  };
	};

	/**
	 * 注册响应式
	 */
	var observe = function observe(target, keys, callback) {
	  var immediate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	  var data = {};
	  var properties = {};
	  keys.forEach(function (key) {
	    data[key] = target[key];
	    properties[key] = {
	      enumerable: true,
	      configurable: true,
	      get: function get() {
	        return data[key];
	      },
	      set: function set(value) {
	        if (data[key] === value) return;
	        var oldValue = cloneDeep(data);
	        data[key] = value;
	        callback(data, oldValue);
	      }
	    };
	  });
	  Object.defineProperties(target, properties);
	  if (immediate) callback(data);
	  var unobserve = function unobserve() {
	    keys.forEach(function (key) {
	      if (key in target) {
	        delete target[key];
	        target[key] = data[key];
	      }
	    });
	  };
	  return unobserve;
	};

	/**
	 * 深度遍历对象
	 */
	var deepIterateGroup = function deepIterateGroup(target, callback) {
	  callback(target);
	  if (target.type === 'group') {
	    target.forEachObject(function (object) {
	      deepIterateGroup(object, callback);
	    });
	  }
	};

	/**
	 * 控制fabric画布只渲染一次，在多次添加或删除画布对象时，如果不设置renderOnAddRemove配置，每次添加和移除都会渲染一次画布，设置为false后可以控制为1次渲染
	 * @param canvas 画布对象
	 * @param callback 执行回调
	 */
	var fabricOnceRender = function fabricOnceRender(canvas, callback) {
	  canvas.renderOnAddRemove = false;
	  callback(canvas);
	  canvas.renderOnAddRemove = true;
	  canvas.requestRenderAll();
	};

	/**
	 * 手动模拟触发fabric Canvas的鼠标mouse:down
	 *
	 * @note 注意: 会触发画布mouse:down相关画布监听事件
	 */
	var fireFabricMouseDown = function fireFabricMouseDown(canvas, offset) {
	  var canvasElement = canvas.getSelectionElement();
	  if (!canvasElement) return;
	  var canvasElementBoundRect = canvasElement.getBoundingClientRect();
	  var event = new MouseEvent('mousedown', {
	    clientX: canvasElementBoundRect.left + offset.x,
	    clientY: canvasElementBoundRect.top + offset.y
	  });
	  canvasElement.dispatchEvent(event);
	};

	/**
	 * 手动模拟触发fabric Canvas的鼠标mouse:up事件
	 *
	 * @note 注意: 会触发画布mouse:up相关画布监听事件
	 */
	var fireFabricMouseUp = function fireFabricMouseUp(canvas) {
	  var canvasElement = canvas.getSelectionElement();
	  if (!canvasElement) return;
	  var event = new MouseEvent('mouseup', {
	    view: window,
	    bubbles: true,
	    cancelable: true
	  });
	  canvasElement.dispatchEvent(event);
	};

	/**
	 * 手动模拟触发fabric Canvas的鼠标选择事件，以实现在选中操作对象时更改操作对象
	 *
	 * @note 请注意这会触发画布mouse:up/mouse:down等画布事件
	 */
	var fireMouseUpAndSelect = function fireMouseUpAndSelect(object) {
	  var canvas = object.canvas;
	  if (!canvas) return;
	  var objectBoundRect = object.getBoundingRect();
	  fireFabricMouseUp(canvas);
	  fireFabricMouseDown(canvas, {
	    x: objectBoundRect.left + objectBoundRect.width / 2,
	    y: objectBoundRect.top + objectBoundRect.height / 2
	  });
	};

	/**
	 * 计算三点间的夹角，b为相交点
	 */
	var calcCoordsAngle = function calcCoordsAngle(a, b, c) {
	  var angleA = Math.atan2(b.y - a.y, b.x - a.x);
	  var angleC = Math.atan2(b.y - c.y, b.x - c.x);
	  var angle = Math.abs(angleA - angleC) * (180 / Math.PI);
	  if (angle > 180) {
	    angle = 360 - angle;
	  }
	  return angle;
	};

	/**
	 * 计算两点间的距离
	 */
	var calcCoordsDistance = function calcCoordsDistance(a, b) {
	  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
	};

	/**
	 * 画布真实坐标转变换后坐标
	 */
	var calcCanvasCoord = function calcCanvasCoord(canvas, point) {
	  var _a;
	  var matrix = (_a = canvas.viewportTransform) !== null && _a !== void 0 ? _a : [1, 0, 0, 1, 0, 0];
	  return fabric.fabric.util.transformPoint(point, fabric.fabric.util.invertTransform(matrix));
	};

	/******************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
	/* global Reflect, Promise, SuppressedError, Symbol */

	function __rest$1(s, e) {
	  var t = {};
	  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
	  }
	  return t;
	}
	typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
	  var e = new Error(message);
	  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
	};

	/**
	 * 加载svg文件并将内部基础形状转化为纯路径
	 */
	var loadSVGToPathFromURL = /*#__PURE__*/function () {
	  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url) {
	    var shapeToPath, storeShapeSourceData, svgPromise, svg;
	    return _regeneratorRuntime().wrap(function _callee$(_context) {
	      while (1) switch (_context.prev = _context.next) {
	        case 0:
	          /**
	           * 将svg基本图像转为路径
	           */
	          shapeToPath = function shapeToPath(svg) {
	            var path = new fabric.fabric.Path();
	            var type = svg.type;
	            /** 如果是多形状组成,拼接路径 */
	            if (type === 'group') {
	              var group = svg;
	              group.forEachObject(function (child, index) {
	                var childPath = shapeToPath(child);
	                group.insertAt(childPath, index, true);
	              });
	              return group;
	            }
	            /** 转化矩形形状 */
	            var convertRectPath = function convertRectPath(params) {
	              var w = params.w,
	                h = params.h,
	                x = params.x,
	                y = params.y;
	              var _params$rx = params.rx,
	                rx = _params$rx === void 0 ? 0 : _params$rx,
	                _params$ry = params.ry,
	                ry = _params$ry === void 0 ? 0 : _params$ry;
	              // normalise radius values, just like the original does it (or should do)
	              if (rx < 0) rx = 0;
	              if (ry < 0) ry = 0;
	              rx = rx || ry;
	              ry = ry || rx;
	              if (rx > w / 2) rx = w / 2;
	              if (ry > h / 2) ry = h / 2;
	              var d = rx && ry ? [['M', rx + x, y], ['h', w - 2 * rx], ['a', rx, ry, 0, 0, 1, rx, ry], ['v', h - 2 * ry], ['a', rx, ry, 0, 0, 1, -rx, ry], ['h', -w + 2 * rx], ['a', rx, ry, 0, 0, 1, -rx, -ry], ['v', -h + 2 * ry], ['a', rx, ry, 0, 0, 1, rx, -ry], ['Z']] : [['M', x, y], ['h', w], ['v', h], ['h', -w], ['v', -h], ['Z']];
	              return new fabric.fabric.Path(d);
	            };
	            /** 转化类椭圆形形状 */
	            var convertEllipsePath = function convertEllipsePath(_ref2) {
	              var x = _ref2.x,
	                y = _ref2.y,
	                _ref2$rx = _ref2.rx,
	                rx = _ref2$rx === void 0 ? 0 : _ref2$rx,
	                _ref2$ry = _ref2.ry,
	                ry = _ref2$ry === void 0 ? 0 : _ref2$ry;
	              var d = [['M', x - rx, y], ['A', rx, ry, 0, 0, 0, x + rx, y], ['A', rx, ry, 0, 0, 0, x - rx, y], ['Z']];
	              return new fabric.fabric.Path(d);
	            };
	            /** 转化类多边形形状 */
	            var convertPolygonPath = function convertPolygonPath(points) {
	              var d = points.map(function (point) {
	                return ['L', point.x, point.y];
	              });
	              d[0][0] = 'M';
	              if (type === 'polygon') {
	                d.push(['Z']);
	              }
	              return new fabric.fabric.Path(d);
	            };
	            /** 根据fabric元素类型进行转化 */
	            switch (type) {
	              case 'rect':
	                {
	                  var _a = svg.toJSON();
	                    _a.type;
	                    _a.visible;
	                    var _a$width = _a.width,
	                    width = _a$width === void 0 ? 0 : _a$width,
	                    _a$height = _a.height,
	                    height = _a$height === void 0 ? 0 : _a$height,
	                    _a$x = _a.x,
	                    x = _a$x === void 0 ? 0 : _a$x,
	                    _a$y = _a.y,
	                    y = _a$y === void 0 ? 0 : _a$y,
	                    _a$rx = _a.rx,
	                    rx = _a$rx === void 0 ? 0 : _a$rx,
	                    _a$ry = _a.ry,
	                    ry = _a$ry === void 0 ? 0 : _a$ry,
	                    rest = __rest$1(_a, ["type", "visible", "width", "height", "x", "y", "rx", "ry"]);
	                  path = convertRectPath({
	                    w: width,
	                    h: height,
	                    x: x,
	                    y: y,
	                    rx: rx,
	                    ry: ry
	                  });
	                  path.set(rest);
	                  break;
	                }
	              case 'circle':
	                {
	                  var _b = svg;
	                    _b.type;
	                    _b.visible;
	                    var _b$x = _b.x,
	                    _x2 = _b$x === void 0 ? 0 : _b$x,
	                    _b$y = _b.y,
	                    _y = _b$y === void 0 ? 0 : _b$y,
	                    _b$radius = _b.radius,
	                    r = _b$radius === void 0 ? 0 : _b$radius,
	                    _rest = __rest$1(_b, ["type", "visible", "x", "y", "radius"]);
	                  path = convertEllipsePath({
	                    x: _x2,
	                    y: _y,
	                    rx: r,
	                    ry: r
	                  });
	                  path.set(_rest);
	                  break;
	                }
	              case 'ellipse':
	                {
	                  var _c = svg;
	                    _c.type;
	                    _c.visible;
	                    var _c$x = _c.x,
	                    _x3 = _c$x === void 0 ? 0 : _c$x,
	                    _c$y = _c.y,
	                    _y2 = _c$y === void 0 ? 0 : _c$y,
	                    _c$rx = _c.rx,
	                    _rx = _c$rx === void 0 ? 0 : _c$rx,
	                    _c$ry = _c.ry,
	                    _ry = _c$ry === void 0 ? 0 : _c$ry,
	                    _rest2 = __rest$1(_c, ["type", "visible", "x", "y", "rx", "ry"]);
	                  path = convertEllipsePath({
	                    x: _x3,
	                    y: _y2,
	                    rx: _rx,
	                    ry: _ry
	                  });
	                  path.set(_rest2);
	                  break;
	                }
	              case 'line':
	                {
	                  var _d = svg;
	                    _d.type;
	                    _d.visible;
	                    var _d$x = _d.x1,
	                    x1 = _d$x === void 0 ? 0 : _d$x,
	                    _d$x2 = _d.x2,
	                    x2 = _d$x2 === void 0 ? 0 : _d$x2,
	                    _d$y = _d.y1,
	                    y1 = _d$y === void 0 ? 0 : _d$y,
	                    _d$y2 = _d.y2,
	                    y2 = _d$y2 === void 0 ? 0 : _d$y2,
	                    _rest3 = __rest$1(_d, ["type", "visible", "x1", "x2", "y1", "y2"]);
	                  path = convertPolygonPath([new fabric.fabric.Point(x1, y1), new fabric.fabric.Point(x2, y2)]);
	                  path.set(_rest3);
	                  break;
	                }
	              case 'polygon':
	              case 'polyline':
	                {
	                  var _e = svg;
	                    _e.type;
	                    _e.visible;
	                    var _e$points = _e.points,
	                    points = _e$points === void 0 ? [] : _e$points,
	                    _rest4 = __rest$1(_e, ["type", "visible", "points"]);
	                  path = convertPolygonPath(points);
	                  path.set(_rest4);
	                  break;
	                }
	              case 'path':
	                {
	                  path = svg;
	                  break;
	                }
	            }
	            return path;
	          };
	          _context.prev = 1;
	          /** 保存部分形状的偏移属性值,直接生成的fabric对象不会记录相关信息 */
	          storeShapeSourceData = function storeShapeSourceData(element, object) {
	            if (object.type === 'circle' || object.type === 'ellipse') {
	              object.set({
	                x: Number(element.getAttribute('cx')),
	                y: Number(element.getAttribute('cy'))
	              });
	            } else if (object.type === 'rect') {
	              object.set({
	                x: Number(element.getAttribute('x')),
	                y: Number(element.getAttribute('y'))
	              });
	            }
	          };
	          svgPromise = new Promise(function (resolve) {
	            fabric.fabric.loadSVGFromURL(url, function (objects) {
	              resolve(fabric.fabric.util.groupSVGElements(objects));
	            }, storeShapeSourceData);
	          });
	          _context.next = 6;
	          return svgPromise;
	        case 6:
	          svg = _context.sent;
	          return _context.abrupt("return", shapeToPath(svg));
	        case 10:
	          _context.prev = 10;
	          _context.t0 = _context["catch"](1);
	          console.log(_context.t0);
	        case 13:
	        case "end":
	          return _context.stop();
	      }
	    }, _callee, null, [[1, 10]]);
	  }));
	  return function loadSVGToPathFromURL(_x) {
	    return _ref.apply(this, arguments);
	  };
	}();

	/**
	 * 解析fabric.Path对象toJSON返回对象
	 * @param path fabric.Path对象
	 */
	var parsePathJSON = function parsePathJSON(path) {
	  var data = path.toJSON();
	  var layoutKeys = ['left', 'top', 'scaleX', 'scaleY', 'angle', 'flipX', 'flipY', 'width', 'height', 'skewX', 'skewY', 'originX', 'originY'];
	  var styleKeys = ['fill', 'stroke', 'strokeWidth', 'strokeDashArray', 'strokeLineCap', 'strokeDashOffset', 'strokeLineJoin', 'strokeUniform', 'strokeMiterLimit', 'opacity', 'shadow', 'backgroundColor', 'fillRule', 'paintFirst', 'globalCompositeOperation'];
	  var layout = layoutKeys.reduce(function (styles, key) {
	    styles[key] = data[key];
	    return styles;
	  }, {});
	  var styles = styleKeys.reduce(function (styles, key) {
	    styles[key] = data[key];
	    return styles;
	  }, {});
	  return {
	    path: data.path,
	    layout: layout,
	    styles: styles
	  };
	};

	/**
	 * 清除路径偏移
	 * @param path fabric路径对象
	 */
	var clearPathOffset = function clearPathOffset(path) {
	  var segment = path.path;
	  segment.forEach(function (item, pathIdx) {
	    var _item = _toArray(item),
	      coords = _item.slice(1);
	    for (var i = 0; i < coords.length; i += 2) {
	      var _transform = _transform2({
	          x: segment[pathIdx][i + 1],
	          y: segment[pathIdx][i + 2]
	        }, [{
	          translate: {
	            x: -path.pathOffset.x,
	            y: -path.pathOffset.y
	          }
	        }]),
	        x = _transform.x,
	        y = _transform.y;
	      segment[pathIdx][i + 1] = x;
	      segment[pathIdx][i + 2] = y;
	    }
	  });
	  path.pathOffset = new fabric.fabric.Point(0, 0);
	  return path;
	};

	/**
	 * 反转路径
	 */
	var reversePath = function reversePath(path) {
	  var _path = [];
	  var isClosedSegment = false;
	  for (var i = path.length - 1; i >= 0; i--) {
	    var instruction = path[i];
	    var preInstruction = path[i - 1];
	    var preInstructionCoord = preInstruction === null || preInstruction === void 0 ? void 0 : preInstruction.slice(preInstruction.length - 2);
	    if (i === path.length - 1) {
	      if (instruction[0] === InstructionType.CLOSE) {
	        _path.push([InstructionType.START].concat(_toConsumableArray(preInstructionCoord)));
	      } else {
	        _path.push([InstructionType.START].concat(_toConsumableArray(instruction.slice(instruction.length - 2))));
	      }
	    }
	    switch (instruction[0]) {
	      case InstructionType.START:
	        if (isClosedSegment) _path.push([InstructionType.CLOSE]);
	        break;
	      case InstructionType.LINE:
	        _path.push([InstructionType.LINE].concat(_toConsumableArray(preInstructionCoord)));
	        break;
	      case InstructionType.QUADRATIC_CURCE:
	        _path.push([InstructionType.QUADRATIC_CURCE, instruction[1], instruction[2]].concat(_toConsumableArray(preInstructionCoord)));
	        break;
	      case InstructionType.BEZIER_CURVE:
	        _path.push([InstructionType.BEZIER_CURVE, instruction[3], instruction[4], instruction[1], instruction[2]].concat(_toConsumableArray(preInstructionCoord)));
	        break;
	      case InstructionType.CLOSE:
	        isClosedSegment = true;
	        break;
	    }
	  }
	  return _path;
	};

	/** Used to generate unique IDs. */
	var idCounter = 0;

	/**
	 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {string} [prefix=''] The value to prefix the ID with.
	 * @returns {string} Returns the unique ID.
	 * @example
	 *
	 * _.uniqueId('contact_');
	 * // => 'contact_104'
	 *
	 * _.uniqueId();
	 * // => '105'
	 */
	function uniqueId(prefix) {
	  var id = ++idCounter;
	  return toString(prefix) + id;
	}

	/**
	 * 基础事件类
	 */
	var VizPathEvent = /*#__PURE__*/function () {
	  function VizPathEvent() {
	    _classCallCheck(this, VizPathEvent);
	    /**
	     * 监听事件
	     */
	    this._events = {};
	  }
	  /**
	   * 监听事件
	   * @param eventName 事件名
	   * @param callback 回调
	   */
	  return _createClass(VizPathEvent, [{
	    key: "on",
	    value: function on(eventName, callback) {
	      var _a;
	      this._events[eventName] = (_a = this._events[eventName]) !== null && _a !== void 0 ? _a : [];
	      this._events[eventName].push(callback);
	    }
	    /**
	     * 取消监听事件
	     * @param eventName 事件名
	     * @param callback 回调
	     */
	  }, {
	    key: "off",
	    value: function off(eventName, callback) {
	      if (!callback) delete this._events[eventName];
	      var handlers = this._events[eventName];
	      if (!handlers) return;
	      var index = handlers.indexOf(callback);
	      if (index !== -1) handlers.splice(index, 1);
	    }
	    /**
	     * 仅监听1次后取消监听
	     * @param eventName 事件名
	     * @param callback 回调
	     */
	  }, {
	    key: "once",
	    value: function once(eventName, callback) {
	      var _this3 = this;
	      var _a;
	      this._events[eventName] = (_a = this._events[eventName]) !== null && _a !== void 0 ? _a : [];
	      var _onceHandler = function _onceHandler() {
	        var result = callback.apply(void 0, arguments);
	        _this3.off(eventName, _onceHandler);
	        return result;
	      };
	      this._events[eventName].push(_onceHandler);
	    }
	    /**
	     * 触发编辑器事件
	     */
	  }, {
	    key: "fire",
	    value: function fire(eventName) {
	      var handlers = this._events[eventName];
	      if (!handlers) return;
	      for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        data[_key - 1] = arguments[_key];
	      }
	      var _iterator = _createForOfIteratorHelper(handlers),
	        _step;
	      try {
	        for (_iterator.s(); !(_step = _iterator.n()).done;) {
	          var callback = _step.value;
	          callback.apply(void 0, data);
	        }
	      } catch (err) {
	        _iterator.e(err);
	      } finally {
	        _iterator.f();
	      }
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      this._events = {};
	    }
	  }]);
	}();
	/**
	 * 元素事件类
	 */
	var VizPathDOMEvent = /*#__PURE__*/function (_VizPathEvent) {
	  function VizPathDOMEvent() {
	    var _this4;
	    _classCallCheck(this, VizPathDOMEvent);
	    _this4 = _callSuper(this, VizPathDOMEvent, arguments);
	    _this4._canvas = null;
	    _this4._DOMEvents = [];
	    _this4.canvas = {
	      on: function on(eventName, handler) {
	        var canvas = _this4._canvas;
	        if (!canvas) return;
	        canvas.on(eventName, handler);
	        _this4._DOMEvents.push({
	          target: 'canvas',
	          eventName: eventName,
	          handler: handler
	        });
	      },
	      off: function off(eventName, handler) {
	        var canvas = _this4._canvas;
	        if (!canvas) return;
	        _this4._DOMEvents = _this4._DOMEvents.filter(function (listener) {
	          if (handler && handler !== listener.handler) return true;
	          if (eventName === listener.eventName) {
	            canvas.off(listener.eventName, listener.handler);
	            return false;
	          }
	          return true;
	        });
	      }
	    };
	    _this4.global = {
	      on: function on(eventName, handler) {
	        window.addEventListener(eventName, handler);
	        _this4._DOMEvents.push({
	          target: 'global',
	          eventName: eventName,
	          handler: handler
	        });
	      },
	      off: function off(eventName, handler) {
	        _this4._DOMEvents = _this4._DOMEvents.filter(function (listener) {
	          if (handler && handler !== listener.handler) return true;
	          if (eventName === listener.eventName) {
	            window.removeEventListener(listener.eventName, listener.handler);
	            return false;
	          }
	          return true;
	        });
	      }
	    };
	    return _this4;
	  }
	  _inherits(VizPathDOMEvent, _VizPathEvent);
	  return _createClass(VizPathDOMEvent, [{
	    key: "mount",
	    value: function mount(canvas) {
	      this._canvas = canvas;
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      var _this5 = this;
	      _get(_getPrototypeOf(VizPathDOMEvent.prototype), "clear", this).call(this);
	      this._DOMEvents.forEach(function (_ref3) {
	        var target = _ref3.target,
	          eventName = _ref3.eventName,
	          handler = _ref3.handler;
	        _this5[target].off(eventName, handler);
	      });
	      this._DOMEvents.length = 0;
	      this._canvas = null;
	    }
	  }]);
	}(VizPathEvent);
	var VizPathTheme = /*#__PURE__*/function () {
	  function VizPathTheme(defaultTheme) {
	    _classCallCheck(this, VizPathTheme);
	    this.__themes = defaultTheme;
	  }
	  return _createClass(VizPathTheme, [{
	    key: "create",
	    value: function create(type) {
	      return this.__themes[type];
	    }
	  }]);
	}();
	var EditorObjectID;
	(function (EditorObjectID) {
	  EditorObjectID["PATH"] = "path";
	  EditorObjectID["NODE"] = "node";
	  EditorObjectID["CURVE_DOT"] = "curve-dot";
	  EditorObjectID["CURVE_BAR"] = "curve-bar";
	  EditorObjectID["OTHER"] = "other";
	})(EditorObjectID || (EditorObjectID = {}));
	var Mode;
	(function (Mode) {
	  Mode["MOVE"] = "move";
	  Mode["ADD"] = "add";
	  Mode["DELETE"] = "delete";
	  Mode["CONVERT"] = "convert";
	})(Mode || (Mode = {}));
	/**
	 * 可视路径编辑器
	 */
	var VizPathEditor = /*#__PURE__*/function () {
	  function VizPathEditor() {
	    _classCallCheck(this, VizPathEditor);
	    /**
	     * 内置配置，配置的更改会影响编辑器的交互效果，配置以栈的形式储存，每次拿配置会从后往前拿
	     *
	     * @note 通过 set 方法更改会触发 set 钩子，避免直接修改该字段以导致 set 钩子未执行
	     */
	    this._settings = [{
	      mode: Mode.MOVE,
	      dotSymmetricMode: 'auto'
	    }];
	    /** 内部用于比较值的误差值 */
	    this.deviation = Math.pow(0.1, 8);
	    /** 挂载的画布 */
	    this.canvas = null;
	    /**
	     * 增强模块列表
	     */
	    this.modules = [];
	    this.events = new VizPathDOMEvent();
	    this.themes = new VizPathTheme(VizPathEditor.defaultTheme);
	    /* ---------------------------- 操作对象相关 ---------------------------- */
	    /** 当前编辑路径 */
	    this.vizpath = null;
	    /** 路径节点对象 */
	    this.nodes = [];
	    /** 路径曲线变换器列表 */
	    this.deformers = [];
	    /** 元素画布对象 与 路径节点对象 映射 */
	    this.objectNodeMap = new Map([]);
	    /** 路径节点对象 与 元素画布对象 映射 */
	    this.nodeObjectMap = new Map([]);
	    /** 当前活跃的路径节点画布对象列表 */
	    this.activeNodes = [];
	    /** 当前活跃的曲线变换器画布对象 */
	    this.activePoint = null;
	    /** dotSymmetricMode为auto的情况下，会采用以下变换模式 */
	    this.dotSymmetricAutoMode = 'none';
	    /** 当前转换的路径节点 */
	    this.currentConvertNodeObject = null;
	    /** 记录原路径对象配置，在退出编辑时重置路径对象配置 */
	    this._originPathOptions = null;
	    /** 废弃的画布对象池，可用于复用减少创建消耗 */
	    this._abandonedPool = {
	      nodes: [],
	      points: [],
	      lines: []
	    };
	    /* ---------------------------- 其他内部属性 ---------------------------- */
	    /** 由于focus方法内部也有对元素聚焦失焦的操作，锁定避免循环执行事件监听造成死循环 */
	    this._lockFocus = false;
	    /** 记录当前活跃对象观察者 */
	    this._observer = null;
	  }
	  /**
	   * 获取编辑器配置
	   * @param key
	   * @returns
	   */
	  return _createClass(VizPathEditor, [{
	    key: "get",
	    value: function get(key) {
	      for (var i = this._settings.length - 1; i >= 0; i--) {
	        if (key in this._settings[i]) return this._settings[i][key];
	      }
	      // 一定存在一个默认配置
	      return this._settings[0][key];
	    }
	  }, {
	    key: "set",
	    value: function set(key, value) {
	      var _this6 = this;
	      var setting = {};
	      if (typeof key === 'string') {
	        setting = _defineProperty({}, key, value);
	      }
	      if (_typeof(key) === 'object') {
	        setting = key;
	      }
	      if (Object.keys(setting).length === 0) {
	        throw Error("(VizPath Error) Please set valid editor's setting.");
	      }
	      this._settings.push(setting);
	      this.events.fire('set', setting);
	      var reset = function reset() {
	        var index = _this6._settings.indexOf(setting);
	        if (index > 0) {
	          _this6._settings.splice(index, 1);
	          _this6.events.fire('set', Object.keys(setting).reduce(function (result, key) {
	            result[key] = _this6.get(key);
	            return result;
	          }, {}));
	        }
	      };
	      return reset;
	    }
	    /**
	     * 进入路径编辑
	     */
	  }, {
	    key: "enterEditing",
	    value: (function () {
	      var _enterEditing = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(vizpath) {
	        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
	          while (1) switch (_context2.prev = _context2.next) {
	            case 0:
	              if (!(!this.canvas && !vizpath.path.canvas)) {
	                _context2.next = 4;
	                break;
	              }
	              throw Error('(VizPath Error) You must mount the canvas or add a path to fabric.canvas before continuing!');
	            case 4:
	              if (!(this.canvas && vizpath.path.canvas && this.canvas !== vizpath.path.canvas)) {
	                _context2.next = 8;
	                break;
	              }
	              throw Error('(VizPath Error) The fabric.canvas editor must be mounted in an identical manner to the canvas where the path was added!');
	            case 8:
	              if (this.canvas) {
	                _context2.next = 13;
	                break;
	              }
	              _context2.next = 11;
	              return this.mount(vizpath.path.canvas);
	            case 11:
	              _context2.next = 14;
	              break;
	            case 13:
	              if (!vizpath.path.canvas) this.canvas.add(vizpath.path);
	            case 14:
	              _context2.next = 16;
	              return this.leaveEditing();
	            case 16:
	              this.vizpath = vizpath;
	              // 初始路径对象事件
	              // this._initVizpathEvents();
	              // 绘制路径
	              this._renderVizPath();
	              // 绘制节点操作对象
	              this._renderPathNodes();
	              // 绘制全部变换器
	              // this._renderAllDeformers();
	            case 19:
	            case "end":
	              return _context2.stop();
	          }
	        }, _callee2, this);
	      }));
	      function enterEditing(_x4) {
	        return _enterEditing.apply(this, arguments);
	      }
	      return enterEditing;
	    }()
	    /**
	     * 退出路径编辑
	     */
	    )
	  }, {
	    key: "leaveEditing",
	    value: (function () {
	      var _leaveEditing = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
	        var _this7 = this;
	        var _a, canvas, path, centerPoint;
	        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
	          while (1) switch (_context3.prev = _context3.next) {
	            case 0:
	              if (this.vizpath) {
	                _context3.next = 2;
	                break;
	              }
	              return _context3.abrupt("return");
	            case 2:
	              canvas = this.canvas;
	              if (canvas) {
	                _context3.next = 5;
	                break;
	              }
	              return _context3.abrupt("return");
	            case 5:
	              fabricOnceRender(canvas, function () {
	                _this7.nodes.forEach(function (node) {
	                  delete node[VizPathEditor.symbol];
	                  canvas.remove(node);
	                });
	                _this7.deformers.forEach(function (deformer) {
	                  delete deformer.curveDot[VizPathEditor.symbol];
	                  delete deformer.curveBar[VizPathEditor.symbol];
	                  canvas.remove(deformer.curveDot, deformer.curveBar);
	                });
	              });
	              this.nodes.length = 0;
	              this.deformers.length = 0;
	              this.activeNodes.length = 0;
	              this.activePoint = null;
	              this.nodeObjectMap.clear();
	              this.objectNodeMap.clear();
	              this.dotSymmetricAutoMode = 'none';
	              this.currentConvertNodeObject = null;
	              this._lockFocus = false;
	              this._abandonedPool = {
	                nodes: [],
	                points: [],
	                lines: []
	              };
	              path = this.vizpath.path;
	              delete path[VizPathEditor.symbol];
	              centerPoint = path.getCenterPoint();
	              path.set((_a = this._originPathOptions) !== null && _a !== void 0 ? _a : {});
	              path.setPositionByOrigin(centerPoint, 'center', 'center');
	              path.setCoords();
	              this._originPathOptions = null;
	              this.vizpath = null;
	            case 24:
	            case "end":
	              return _context3.stop();
	          }
	        }, _callee3, this);
	      }));
	      function leaveEditing() {
	        return _leaveEditing.apply(this, arguments);
	      }
	      return leaveEditing;
	    }()
	    /**
	     * 初始路径对象事件
	     */
	    )
	  }, {
	    key: "rerender",
	    value: function rerender(callback) {
	      var _this8 = this;
	      var storeActiveNodes = this.activeNodes;
	      var storeActivePoint = this.activePoint;
	      this.blur();
	      var result = callback(storeActiveNodes, storeActivePoint);
	      this._renderPathNodes();
	      this._renderDeformers();
	      if ((storeActivePoint === null || storeActivePoint === void 0 ? void 0 : storeActivePoint.canvas) === this.canvas) this.focus(storeActivePoint);else if (storeActiveNodes.every(function (object) {
	        return object.canvas === _this8.canvas;
	      })) {
	        this.focus.apply(this, _toConsumableArray(storeActiveNodes));
	      }
	      return result;
	    }
	    /**
	     * 初始路径
	     */
	  }, {
	    key: "_renderVizPath",
	    value: function _renderVizPath() {
	      var canvas = this.canvas;
	      if (!canvas) return;
	      var vizpath = this.vizpath;
	      if (!vizpath) return;
	      // 如果已经带有标志则是已经添加进画布的路径
	      if (vizpath[VizPathEditor.symbol]) return;
	      // 记录原始配置便于结束后恢复配置
	      var _parsePathJSON = parsePathJSON(vizpath.path),
	        styles = _parsePathJSON.styles;
	      this._originPathOptions = Object.assign(Object.assign({}, styles), {
	        selectable: vizpath.path.selectable,
	        evented: vizpath.path.evented,
	        objectCaching: vizpath.path.objectCaching
	      });
	      var originCenterPoint = vizpath.path.getCenterPoint();
	      var decorator = function decorator(customPath) {
	        customPath.set({
	          // 路径本身不允许选中，后续通过操纵点和线条来更改路径
	          selectable: false,
	          // 不触发事件
	          evented: false,
	          // 防止因为缓存没有显示正确的路径
	          objectCaching: false
	        });
	        // 重置回原路径中心，避免轮廓宽度使路径发生偏移
	        customPath.setPositionByOrigin(originCenterPoint, 'center', 'center');
	        // 添加标志
	        customPath[VizPathEditor.symbol] = EditorObjectID.PATH;
	        return customPath;
	      };
	      this.themes.create('path')(decorator, vizpath.path);
	      if (!vizpath.path[VizPathEditor.symbol]) decorator(vizpath.path);
	      canvas.requestRenderAll();
	    }
	    /**
	     * 创建路径节点对应的fabric对象
	     * @param reuseObject 重用对象
	     */
	  }, {
	    key: "_createNodeObject",
	    value: function _createNodeObject(reuseObject) {
	      var decorator = function decorator(customObject) {
	        customObject.set({
	          // 选中时不出现选中框
	          hasBorders: false,
	          hasControls: false,
	          // 保持居中
	          originX: 'center',
	          originY: 'center'
	        });
	        // 内部元素都不做另外的画布缓存
	        deepIterateGroup(customObject, function (object) {
	          object.set({
	            objectCaching: false
	          });
	        });
	        customObject[VizPathEditor.symbol] = EditorObjectID.NODE;
	        return customObject;
	      };
	      var object = reuseObject !== null && reuseObject !== void 0 ? reuseObject : this.themes.create('node')(decorator);
	      if (!object[VizPathEditor.symbol]) object = decorator(object);
	      // 加入画布时添加自动响应
	      // const onAddedNode = () => {
	      //   const position = vizpath.calcAbsolutePosition(node, vizpath.coordNodeMap.get(node)!.path);
	      //   if (object.group) {
	      //     const relativePosition = vizpath.calcRelativeCoord(position, object.group);
	      //     object
	      //       .set({
	      //         left: relativePosition.x,
	      //         top: relativePosition.y,
	      //       })
	      //       .setCoords();
	      //     object.group.addWithUpdate();
	      //   } else {
	      //     object.set(position).setCoords();
	      //   }
	      // };
	      // // 移除时结束自动响应
	      // const onRemovedNode = () => {
	      //   object.off('added', onAddedNode);
	      //   object.off('removed', onRemovedNode);
	      //   this._abandonedPool.nodes.push(object);
	      // };
	      // object.on('added', onAddedNode);
	      // object.on('removed', onRemovedNode);
	      return object;
	    }
	    /**
	     * 创建变换器变换点对象
	     */
	  }, {
	    key: "_createCurveDotObject",
	    value: function _createCurveDotObject(reuseObject) {
	      var decorator = function decorator(customObject) {
	        customObject.set({
	          // 选中时不出现选中框
	          hasBorders: false,
	          hasControls: false,
	          // 保持居中
	          originX: 'center',
	          originY: 'center'
	        });
	        // 不做另外的画布缓存
	        deepIterateGroup(customObject, function (object) {
	          object.set({
	            objectCaching: false
	          });
	        });
	        customObject[VizPathEditor.symbol] = EditorObjectID.CURVE_DOT;
	        return customObject;
	      };
	      var object = reuseObject !== null && reuseObject !== void 0 ? reuseObject : this.themes.create('dot')(decorator);
	      if (!object[VizPathEditor.symbol]) object = decorator(object);
	      return object;
	    }
	    /**
	     * 创建变换器连接线对象
	     */
	  }, {
	    key: "_createCurveBarLine",
	    value: function _createCurveBarLine(reuseLine) {
	      var lineDecorator = function lineDecorator(customObject) {
	        customObject.set({
	          // 保持比例
	          strokeUniform: true,
	          // 不允许选中
	          selectable: false,
	          evented: false,
	          // 保持居中
	          originX: 'center',
	          originY: 'center',
	          // 不做另外的画布缓存
	          objectCaching: false
	        });
	        customObject[VizPathEditor.symbol] = EditorObjectID.CURVE_BAR;
	        return customObject;
	      };
	      var line = reuseLine !== null && reuseLine !== void 0 ? reuseLine : this.themes.create('line')(lineDecorator);
	      if (!line[VizPathEditor.symbol]) line = lineDecorator(line);
	      return line;
	    }
	    /**
	     * 更新变换器连接线及其控制点的坐标和位置
	     * @param deformer 控制点配置
	     * @param skipSelfDot 跳过控制点自身的配置，响应式更改中需设置为true，避免死循环
	     */
	  }, {
	    key: "_setDeformerObjectsCoords",
	    value: function _setDeformerObjectsCoords(deformer) {
	      var skipSelfDot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	      var _a, _b;
	      var vizpath = this.vizpath;
	      if (!vizpath) return;
	      var dot = deformer.dot,
	        nodeObject = deformer.nodeObject,
	        curveDot = deformer.curveDot,
	        curveBar = deformer.curveBar;
	      // 设置变换器位置
	      if (!skipSelfDot) curveDot.set(vizpath.calcAbsolutePosition(dot)).setCoords();
	      // 变换器与中心点相对角度固定
	      var groupMatrix = (_b = (_a = nodeObject.group) === null || _a === void 0 ? void 0 : _a.calcOwnMatrix()) !== null && _b !== void 0 ? _b : [1, 0, 0, 1, 0, 0];
	      var nodeCenter = fabric.fabric.util.transformPoint(nodeObject.getCenterPoint(), groupMatrix);
	      var pointCenter = curveDot.getCenterPoint();
	      // 角度保持和路径节点相向
	      curveDot.set({
	        angle: 90 + Math.atan2(pointCenter.y - nodeCenter.y, pointCenter.x - nodeCenter.x) * 180 / Math.PI
	      });
	      // 更新连接线连线位置
	      curveBar.set({
	        x1: nodeCenter.x,
	        y1: nodeCenter.y
	      });
	      curveBar.set({
	        x2: curveDot.left,
	        y2: curveDot.top
	      });
	      curveBar.setCoords();
	    }
	    /**
	     * 初始路径节点
	     */
	  }, {
	    key: "_renderPathNodes",
	    value: function _renderPathNodes() {
	      var _this9 = this;
	      var canvas = this.canvas;
	      if (!canvas) return;
	      var path = this.vizpath;
	      if (!path) return;
	      // 初始路径路径节点
	      var objects = [];
	      var objectNodeMap = new Map();
	      var nodeObjectMap = new Map();
	      var vizpath = this.vizpath;
	      if (!vizpath) return {
	        objects: objects,
	        objectNodeMap: objectNodeMap,
	        nodeObjectMap: nodeObjectMap
	      };
	      vizpath.segments.forEach(function (segment) {
	        segment.forEach(function (item) {
	          var node = item.node;
	          if (!node) return;
	          if (nodeObjectMap.has(item)) return;
	          var reuseObject = _this9.nodeObjectMap.get(item);
	          var object = _this9._createNodeObject(reuseObject);
	          object.set(vizpath.calcAbsolutePosition(node)).setCoords();
	          objects.push(object);
	          objectNodeMap.set(object, item);
	          nodeObjectMap.set(item, object);
	        });
	      });
	      fabricOnceRender(canvas, function () {
	        var oldObjectSet = new Set(_this9.nodes);
	        var baseIndex = canvas._objects.indexOf(vizpath.path) + 1;
	        // 添加新对象并重新建立映射关系
	        objects.forEach(function (object, idx) {
	          if (canvas.contains(object)) {
	            canvas.moveTo(object, baseIndex + idx);
	            oldObjectSet["delete"](object);
	          } else {
	            canvas.insertAt(object, baseIndex + idx, false);
	          }
	        });
	        // 移除旧的无用对象
	        canvas.remove.apply(canvas, _toConsumableArray(oldObjectSet.values()));
	        _this9.nodes = objects;
	        _this9.objectNodeMap.clear();
	        _this9.objectNodeMap = objectNodeMap;
	        _this9.nodeObjectMap.clear();
	        _this9.nodeObjectMap = nodeObjectMap;
	      });
	    }
	    /**
	     * 绘制曲线变换器及其连接线
	     */
	  }, {
	    key: "_renderDeformers",
	    value: function _renderDeformers() {
	      var _this10 = this;
	      var vizpath = this.vizpath;
	      if (!vizpath) return;
	      var canvas = this.canvas;
	      if (!canvas) return;
	      // 当前的活跃节点
	      var curPathNode = this.activeNodes.length === 1 ? this.objectNodeMap.get(this.activeNodes[0]) : undefined;
	      // 创建新的路径曲线变换器
	      var deformers = [];
	      if (curPathNode) {
	        var _vizpath$getNeighbori = vizpath.getNeighboringNodes(curPathNode),
	          pre = _vizpath$getNeighbori.pre,
	          next = _vizpath$getNeighbori.next;
	        [pre, curPathNode, next].forEach(function (node) {
	          var _a;
	          if (!node) return;
	          Object.entries((_a = node.deformers) !== null && _a !== void 0 ? _a : {}).forEach(function (_ref4) {
	            var _ref5 = _slicedToArray(_ref4, 2),
	              direction = _ref5[0],
	              dot = _ref5[1];
	            var reuseDeformer = _this10.deformers.find(function (i) {
	              return i.type === direction && i.node === node;
	            });
	            var _curveDot = {
	              type: direction,
	              dot: dot,
	              node: node,
	              nodeObject: _this10.nodeObjectMap.get(node),
	              curveDot: _this10._createCurveDotObject(reuseDeformer === null || reuseDeformer === void 0 ? void 0 : reuseDeformer.curveDot),
	              curveBar: _this10._createCurveBarLine(reuseDeformer === null || reuseDeformer === void 0 ? void 0 : reuseDeformer.curveBar)
	            };
	            _this10._setDeformerObjectsCoords(_curveDot);
	            deformers.push(_curveDot);
	          });
	        });
	      }
	      fabricOnceRender(canvas, function () {
	        var oldObjectSet = new Set(_this10.deformers.map(function (i) {
	          return [i.curveDot, i.curveBar];
	        }).flat(1));
	        // 添加新的画布元素
	        var baseIndex = canvas._objects.indexOf(vizpath.path) + 1;
	        deformers.forEach(function (i, idx) {
	          if (canvas.contains(i.curveBar)) {
	            canvas.moveTo(i.curveBar, baseIndex + idx);
	            oldObjectSet["delete"](i.curveBar);
	          } else {
	            canvas.insertAt(i.curveBar, baseIndex + idx, false);
	          }
	        });
	        deformers.forEach(function (i, idx) {
	          if (canvas.contains(i.curveDot)) {
	            canvas.moveTo(i.curveDot, baseIndex + deformers.length + idx);
	            oldObjectSet["delete"](i.curveDot);
	          } else {
	            canvas.insertAt(i.curveDot, baseIndex + deformers.length + idx, false);
	          }
	        });
	        // 移除旧的无用对象
	        canvas.remove.apply(canvas, _toConsumableArray(oldObjectSet.values()));
	        oldObjectSet.clear();
	      });
	      this.deformers = deformers;
	    }
	    /**
	     * 渲染全部的变换器
	     */
	  }, {
	    key: "_renderAllDeformers",
	    value: function _renderAllDeformers() {
	      var _this11 = this;
	      var vizpath = this.vizpath;
	      if (!vizpath) return;
	      var canvas = this.canvas;
	      if (!canvas) return;
	      // 创建新的路径曲线变换器
	      var deformers = [];
	      vizpath.segments.forEach(function (segment) {
	        segment.forEach(function (node) {
	          var _a;
	          Object.entries((_a = node.deformers) !== null && _a !== void 0 ? _a : {}).forEach(function (_ref6) {
	            var _ref7 = _slicedToArray(_ref6, 2),
	              direction = _ref7[0],
	              dot = _ref7[1];
	            var reuseDeformer = _this11.deformers.find(function (i) {
	              return i.type === direction && i.node === node;
	            });
	            var _curveDot = {
	              type: direction,
	              dot: dot,
	              node: node,
	              nodeObject: _this11.nodeObjectMap.get(node),
	              curveDot: _this11._createCurveDotObject(reuseDeformer === null || reuseDeformer === void 0 ? void 0 : reuseDeformer.curveDot),
	              curveBar: _this11._createCurveBarLine(reuseDeformer === null || reuseDeformer === void 0 ? void 0 : reuseDeformer.curveBar)
	            };
	            _this11._setDeformerObjectsCoords(_curveDot);
	            deformers.push(_curveDot);
	          });
	        });
	      });
	      fabricOnceRender(canvas, function () {
	        var oldObjectSet = new Set(_this11.deformers.map(function (i) {
	          return [i.curveDot, i.curveBar];
	        }).flat(1));
	        // 添加新的画布元素
	        var baseIndex = canvas._objects.indexOf(vizpath.path) + 1;
	        deformers.forEach(function (i, idx) {
	          if (canvas.contains(i.curveBar)) {
	            canvas.moveTo(i.curveBar, baseIndex + idx);
	            oldObjectSet["delete"](i.curveBar);
	          } else {
	            canvas.insertAt(i.curveBar, baseIndex + idx, false);
	          }
	        });
	        deformers.forEach(function (i, idx) {
	          if (canvas.contains(i.curveDot)) {
	            canvas.moveTo(i.curveDot, baseIndex + deformers.length + idx);
	            oldObjectSet["delete"](i.curveDot);
	          } else {
	            canvas.insertAt(i.curveDot, baseIndex + deformers.length + idx, false);
	          }
	        });
	        // 移除旧的无用对象
	        canvas.remove.apply(canvas, _toConsumableArray(oldObjectSet.values()));
	        oldObjectSet.clear();
	      });
	      this.deformers = deformers;
	    }
	    /**
	     * 初始节点选择事件
	     */
	  }, {
	    key: "_initSelectEvents",
	    value: function _initSelectEvents() {
	      var _this12 = this;
	      var canvas = this.canvas;
	      if (!canvas) return;
	      var handler = function handler(eventName) {
	        return function (e) {
	          _this12.focus.apply(_this12, _toConsumableArray(canvas.getActiveObjects()));
	        };
	      };
	      this.events.canvas.on('selection:created', handler());
	      this.events.canvas.on('selection:updated', handler());
	      this.events.canvas.on('selection:cleared', handler());
	      // 选中路径段时自动选中路线段内的所有指令路径节点
	      // this.events.canvas.on('mouse:dblclick', (e) => {
	      //   if (e.target && e.target[VizPathEditor.symbol]) return;
	      //   const paths = this.vizpath?.paths ?? [];
	      //   let focusPath: Path | undefined;
	      //   for (let i = paths.length - 1; i >= 0; i--) {
	      //     const path = paths[i];
	      //     if (path.containsPoint(e.pointer)) {
	      //       focusPath = path;
	      //       break;
	      //     }
	      //   }
	      //   if (focusPath) {
	      //     this.focus(
	      //       ...this.nodes.filter((node) => this.objectNodeMap.get(node)!.path === focusPath),
	      //     );
	      //   }
	      // });
	    }
	    /**
	     * 初始路径点添加事件
	     */
	  }, {
	    key: "_initAddEvents",
	    value: function _initAddEvents() {
	      var _this13 = this;
	      var canvas = this.canvas;
	      if (!canvas) return;
	      this.events.canvas.on('mouse:down:before', function (event) {
	        var vizpath = _this13.vizpath;
	        if (!vizpath) return;
	        if (_this13.get('mode') !== Mode.ADD) return;
	        var newNodeObject;
	        // 路径拼接
	        if (event.target && event.target[VizPathEditor.symbol]) {
	          if (_this13.activeNodes.length === 1 && event.target[VizPathEditor.symbol] === EditorObjectID.NODE) {
	            newNodeObject = _this13.link(_this13.activeNodes[0], event.target);
	          }
	        }
	        // 新增节点
	        else {
	          var pointer = calcCanvasCoord(canvas, event.pointer);
	          newNodeObject = _this13.add({
	            left: pointer.x,
	            top: pointer.y
	          });
	        }
	        // 新增成功，设置当前点为变换中
	        if (newNodeObject) {
	          _this13.currentConvertNodeObject = newNodeObject;
	        }
	      });
	    }
	    /**
	     * 初始路径节点删除事件
	     */
	  }, {
	    key: "_initDeleteEvents",
	    value: function _initDeleteEvents() {
	      var _this14 = this;
	      this.events.canvas.on('mouse:down', function (event) {
	        var _a, _b;
	        if (_this14.get('mode') !== Mode.DELETE) return;
	        if (((_a = event.target) === null || _a === void 0 ? void 0 : _a[VizPathEditor.symbol]) === EditorObjectID.NODE || ((_b = event.target) === null || _b === void 0 ? void 0 : _b[VizPathEditor.symbol]) === EditorObjectID.CURVE_DOT) {
	          _this14.remove(event.target);
	        }
	      });
	    }
	    /**
	     * 初始路径指令转换事件
	     */
	  }, {
	    key: "_initConvertEvents",
	    value: function _initConvertEvents() {
	      var _this15 = this;
	      var canvas = this.canvas;
	      if (!canvas) return;
	      this.events.canvas.on('mouse:down', function (event) {
	        var _a;
	        var vizpath = _this15.vizpath;
	        if (!vizpath) return;
	        if (!_this15.currentConvertNodeObject) {
	          if (_this15.get('mode') !== Mode.CONVERT) return;
	          if (((_a = event.target) === null || _a === void 0 ? void 0 : _a[VizPathEditor.symbol]) !== EditorObjectID.NODE) return;
	          _this15.currentConvertNodeObject = event.target;
	        }
	        if (_this15.currentConvertNodeObject) {
	          fireMouseUpAndSelect(_this15.currentConvertNodeObject);
	          _this15.currentConvertNodeObject.set({
	            lockMovementX: true,
	            lockMovementY: true
	          });
	          canvas.selection = false;
	        }
	      });
	      this.events.canvas.on('mouse:move', function (event) {
	        var vizpath = _this15.vizpath;
	        if (!vizpath) return;
	        var target = _this15.currentConvertNodeObject;
	        if (!target) return;
	        // 如果鼠标还在点上不触发控制曲线作用，当移出后才触发，避免触发敏感
	        if (target.containsPoint(event.pointer)) return;
	        var pointer = calcCanvasCoord(canvas, event.pointer);
	        var targetNode = _this15.objectNodeMap.get(target);
	        var neighboringNodes = vizpath.getNeighboringNodes(targetNode, true);
	        // 获取可转换点，如果无法转换了则先转变为直线再提取转换点
	        var convertibleNodes = vizpath.getConvertibleNodes(targetNode);
	        if (convertibleNodes.length === 0) {
	          vizpath.degrade(targetNode, 'both');
	          convertibleNodes = vizpath.getConvertibleNodes(targetNode);
	        }
	        var position = vizpath.calcRelativeCoord({
	          left: pointer.x,
	          top: pointer.y
	        });
	        var oppositePosition = vizpath.calcRelativeCoord({
	          left: target.left - (pointer.x - target.left),
	          top: target.top - (pointer.y - target.top)
	        });
	        // 根据夹角大小排序，夹角越小意味鼠标越接近
	        if (convertibleNodes.length > 1) {
	          convertibleNodes.sort(function (a, b) {
	            return calcCoordsAngle(position, targetNode.node, neighboringNodes[a[0]].node) - calcCoordsAngle(position, targetNode.node, neighboringNodes[b[0]].node);
	          });
	        }
	        _this15.rerender(function () {
	          vizpath.upgrade(targetNode, 'both', true);
	          // 非闭合路径给端点添加虚拟变换器
	          if (!vizpath.isClosedSegment(targetNode.segment) && targetNode.deformers) {
	            if (targetNode === targetNode.segment[0] && !targetNode.deformers.pre && targetNode.deformers.next) {
	              vizpath.addNodeDeformer(targetNode, 'pre', {
	                x: targetNode.node.x - (targetNode.deformers.next.x - targetNode.node.x),
	                y: targetNode.node.y - (targetNode.deformers.next.y - targetNode.node.y)
	              });
	            }
	            if (targetNode === targetNode.segment[targetNode.segment.length - 1] && !targetNode.deformers.next && targetNode.deformers.pre) {
	              vizpath.addNodeDeformer(targetNode, 'next', {
	                x: targetNode.node.x - (targetNode.deformers.pre.x - targetNode.node.x),
	                y: targetNode.node.y - (targetNode.deformers.pre.y - targetNode.node.y)
	              });
	            }
	          }
	          // 设置控制点的位置
	          if (targetNode.deformers) {
	            Object.keys(targetNode.deformers).forEach(function (direction, index) {
	              var coord = (convertibleNodes.length === 1 ? [oppositePosition, position] : [position, oppositePosition])[index];
	              targetNode.deformers[direction].set(coord.x, coord.y);
	            });
	          }
	        });
	        var targetCurveDot;
	        var nodeDeformers = _this15.deformers.filter(function (i) {
	          return i.node === targetNode;
	        });
	        if (nodeDeformers.length === 1) {
	          targetCurveDot = nodeDeformers[0];
	        } else {
	          targetCurveDot = _this15.deformers.find(function (i) {
	            var _a;
	            return i.node === targetNode && i.type !== ((_a = convertibleNodes[0]) === null || _a === void 0 ? void 0 : _a[0]);
	          });
	        }
	        if (targetCurveDot) {
	          fireMouseUpAndSelect(targetCurveDot.curveDot);
	        }
	      });
	      this.events.canvas.on('mouse:up', function () {
	        if (_this15.currentConvertNodeObject) {
	          _this15.currentConvertNodeObject.set({
	            lockMovementX: false,
	            lockMovementY: false
	          });
	          _this15.currentConvertNodeObject = null;
	          canvas.selection = true;
	        }
	      });
	    }
	    /**
	     * 变换节点
	     * @param object 路径节点
	     * @param options 变换配置
	     * @param followCurveDots 跟随变换的曲线变换器
	     * @returns
	     */
	  }, {
	    key: "_transform",
	    value: function _transform(object, options) {
	      var _this16 = this;
	      var followCurveDots = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	      var _a;
	      var vizpath = this.vizpath;
	      if (!vizpath) return;
	      var pathNode = this.objectNodeMap.get(object);
	      if (!pathNode) return;
	      var node = pathNode.node;
	      if (!node) return;
	      var left = options.left,
	        top = options.top,
	        _options$scaleX = options.scaleX,
	        scaleX = _options$scaleX === void 0 ? 1 : _options$scaleX,
	        _options$scaleY = options.scaleY,
	        scaleY = _options$scaleY === void 0 ? 1 : _options$scaleY,
	        _options$angle = options.angle,
	        angle = _options$angle === void 0 ? 0 : _options$angle;
	      // 节点位置更新
	      var oldCoord = {
	        x: node.x,
	        y: node.y
	      };
	      var newCoord = vizpath.calcRelativeCoord({
	        left: left,
	        top: top
	      });
	      node.set(newCoord.x, newCoord.y);
	      // 曲线变换器跟随变化
	      followCurveDots.forEach(function (curveDot) {
	        if (!curveDot) return;
	        var relativeDiff = _transform2({
	          x: curveDot.x - newCoord.x,
	          y: curveDot.y - newCoord.y
	        }, [{
	          translate: {
	            x: newCoord.x - oldCoord.x,
	            y: newCoord.y - oldCoord.y
	          }
	        }, {
	          scale: {
	            x: scaleX,
	            y: scaleY
	          }
	        }, {
	          rotate: angle
	        }]);
	        curveDot.set(newCoord.x + relativeDiff.x, newCoord.y + relativeDiff.y);
	        // 更新画布对象
	        var deformer = _this16.deformers.find(function (i) {
	          return i.dot === curveDot;
	        });
	        if (!deformer) return;
	        // 创建指令曲线变换器并设置位置
	        deformer.curveDot.set(vizpath.calcAbsolutePosition(curveDot)).setCoords();
	        // 创建变换器连接线并设置位置
	        var startPosition = vizpath.calcAbsolutePosition(node);
	        deformer.curveBar.set({
	          x1: startPosition.left,
	          y1: startPosition.top
	        });
	        var endPosition = vizpath.calcAbsolutePosition(curveDot);
	        deformer.curveBar.set({
	          x2: endPosition.left,
	          y2: endPosition.top
	        });
	      });
	      (_a = object.canvas) === null || _a === void 0 ? void 0 : _a.requestRenderAll();
	    }
	    /**
	     * 注册单个路径节点的响应变化监听
	     */
	  }, {
	    key: "_registerNodeObjectObserver",
	    value: function _registerNodeObjectObserver(object) {
	      var _this17 = this;
	      this._observer = {
	        target: object,
	        unobserve: observe(object, ['left', 'top'], function (_ref8) {
	          var left = _ref8.left,
	            top = _ref8.top;
	          var _a, _b;
	          var followCurveDots = [];
	          var pathNode = _this17.objectNodeMap.get(object);
	          var deformers = (_b = (_a = _this17.vizpath) === null || _a === void 0 ? void 0 : _a.getNeighboringCurveDots(pathNode)) !== null && _b !== void 0 ? _b : [];
	          deformers === null || deformers === void 0 ? void 0 : deformers.forEach(function (_ref9) {
	            var position = _ref9.position,
	              direction = _ref9.direction,
	              from = _ref9.from;
	            var _a;
	            var coord = (_a = from.deformers) === null || _a === void 0 ? void 0 : _a[direction];
	            if (position !== 'cur' || !coord) return;
	            followCurveDots.push(coord);
	          });
	          _this17._transform(object, {
	            left: left,
	            top: top
	          }, followCurveDots);
	        })
	      };
	    }
	    /**
	     * 注册多个路径节点形成的组的响应变化监听
	     */
	  }, {
	    key: "_registerNodeSelectionObserver",
	    value: function _registerNodeSelectionObserver(group) {
	      var _this18 = this;
	      var initialObjectCount = group._objects.length;
	      this._observer = {
	        target: group,
	        unobserve: observe(group, ['left', 'top', 'angle', 'scaleX', 'scaleY'], function (newValue) {
	          var oldValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : newValue;
	          var _a, _b;
	          if (!group.canvas) return;
	          if (group._objects.length !== initialObjectCount) return;
	          var hadFollowedCoords = new Set([]);
	          var _iterator2 = _createForOfIteratorHelper(group._objects),
	            _step2;
	          try {
	            var _loop = function _loop() {
	              var object = _step2.value;
	              var followCurveDots = [];
	              var pathNode = _this18.objectNodeMap.get(object);
	              var deformers = (_b = (_a = _this18.vizpath) === null || _a === void 0 ? void 0 : _a.getNeighboringCurveDots(pathNode)) !== null && _b !== void 0 ? _b : [];
	              deformers === null || deformers === void 0 ? void 0 : deformers.forEach(function (_ref10) {
	                var position = _ref10.position,
	                  direction = _ref10.direction,
	                  from = _ref10.from;
	                var _a;
	                var coord = (_a = from.deformers) === null || _a === void 0 ? void 0 : _a[direction];
	                if (position !== 'cur' || !coord) return;
	                // 避免重复的曲线变换器跟随更改
	                if (hadFollowedCoords.has(coord)) return;
	                followCurveDots.push(coord);
	                hadFollowedCoords.add(coord);
	              });
	              object.set({
	                scaleX: object.scaleX / (newValue.scaleX / oldValue.scaleX),
	                scaleY: object.scaleY / (newValue.scaleY / oldValue.scaleY),
	                angle: object.angle - (newValue.angle - oldValue.angle)
	              });
	              var decomposeMatrix = fabric.fabric.util.qrDecompose(object.calcTransformMatrix(false));
	              var left = decomposeMatrix.translateX;
	              var top = decomposeMatrix.translateY;
	              _this18._transform(object, {
	                left: left,
	                top: top,
	                scaleX: newValue.scaleX / oldValue.scaleX,
	                scaleY: newValue.scaleY / oldValue.scaleY,
	                angle: newValue.angle - oldValue.angle
	              }, followCurveDots);
	            };
	            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
	              _loop();
	            }
	          } catch (err) {
	            _iterator2.e(err);
	          } finally {
	            _iterator2.f();
	          }
	          hadFollowedCoords.clear();
	        })
	      };
	    }
	    /**
	     * 注册单个变化点的响应变化监听
	     */
	  }, {
	    key: "_registerCurveDotObjectObserver",
	    value: function _registerCurveDotObjectObserver(object) {
	      var _this19 = this;
	      var deformer = this.deformers.find(function (item) {
	        return item.curveDot === object;
	      });
	      if (!deformer) return;
	      var vizpath = this.vizpath;
	      if (!vizpath) return;
	      this._observer = {
	        target: object,
	        unobserve: observe(object, ['left', 'top'], function (_ref11) {
	          var left = _ref11.left,
	            top = _ref11.top;
	          var coord = vizpath.calcRelativeCoord({
	            left: left,
	            top: top
	          });
	          deformer.dot.set(coord.x, coord.y);
	          _this19._setDeformerObjectsCoords(deformer, /* skipSelfDot */true);
	          // 对向变换器同步操作
	          var symmetricMode = _this19.get('dotSymmetricMode') === 'auto' ? _this19.dotSymmetricAutoMode : _this19.get('dotSymmetricMode');
	          if (symmetricMode !== 'none') {
	            var opositeDeformer = _this19.getOppositeDeformer(object);
	            if (opositeDeformer) {
	              var nodeCoord = deformer.node.node;
	              // 旧镜像曲线变换器到路径节点的距离
	              var d = calcCoordsDistance(opositeDeformer.dot, nodeCoord);
	              // 新镜像曲线变换器到路径节点的距离
	              var new_d = calcCoordsDistance({
	                x: nodeCoord.x - (coord.x - nodeCoord.x),
	                y: nodeCoord.y - (coord.y - nodeCoord.y)
	              }, nodeCoord);
	              var scale = symmetricMode === 'entire' ? 1 : d / new_d;
	              opositeDeformer.dot.set(nodeCoord.x - (coord.x - nodeCoord.x) * scale, nodeCoord.y - (coord.y - nodeCoord.y) * scale);
	              _this19._setDeformerObjectsCoords(opositeDeformer);
	            }
	          }
	        })
	      };
	    }
	    /**
	     * 初始活跃对象变换观测者，当元素变换时同步响应路径变化
	     */
	  }, {
	    key: "_registerActiveObjectsObserver",
	    value: function _registerActiveObjectsObserver() {
	      var _a, _b;
	      // 重置旧的观察者
	      (_a = this._observer) === null || _a === void 0 ? void 0 : _a.unobserve();
	      this._observer = null;
	      var activeObject = (_b = this.canvas) === null || _b === void 0 ? void 0 : _b.getActiveObject();
	      if (!activeObject) return;
	      if (activeObject.type === 'activeSelection') {
	        this._registerNodeSelectionObserver(activeObject);
	      } else if (activeObject[VizPathEditor.symbol] === EditorObjectID.NODE) {
	        this._registerNodeObjectObserver(activeObject);
	      } else if (activeObject[VizPathEditor.symbol] === EditorObjectID.CURVE_DOT) {
	        this._registerCurveDotObjectObserver(activeObject);
	      }
	    }
	    /**
	     * 获取相对控制
	     */
	  }, {
	    key: "getOppositeDeformer",
	    value: function getOppositeDeformer(object) {
	      var deformer = this.deformers.find(function (dot) {
	        return dot.curveDot === object;
	      });
	      if (!deformer) return;
	      return this.deformers.find(function (dot) {
	        var opposite = {
	          pre: 'next',
	          next: 'pre'
	        }[deformer.type];
	        return dot.type === opposite && dot.node === deformer.node;
	      });
	    }
	    /**
	     * 选中路径节点或变换器对象
	     * @param selectedObjects 目标对象列表
	     */
	  }, {
	    key: "focus",
	    value: function focus() {
	      var _this20 = this;
	      var canvas = this.canvas;
	      if (!canvas) return;
	      if (this._lockFocus) return;
	      this._lockFocus = true;
	      // 提取有效活跃元素
	      var focusNodes = [];
	      var focusCurveDotPoints = [];
	      for (var _len2 = arguments.length, selectedObjects = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        selectedObjects[_key2] = arguments[_key2];
	      }
	      selectedObjects.forEach(function (object) {
	        switch (object[VizPathEditor.symbol]) {
	          case EditorObjectID.NODE:
	            if (_this20.objectNodeMap.has(object)) focusNodes.push(object);
	            break;
	          case EditorObjectID.CURVE_DOT:
	            if (_this20.deformers.find(function (i) {
	              return i.curveDot === object;
	            })) {
	              focusCurveDotPoints.push(object);
	            }
	            break;
	        }
	      });
	      // 取消当前元素选中态
	      canvas.discardActiveObject();
	      if (this.activePoint || this.activeNodes.length) {
	        this.events.fire('deselected', this.activeNodes, this.activePoint);
	      }
	      // 只要包含路径节点则只处理聚焦路径节点逻辑
	      if (focusNodes.length) {
	        this.activeNodes = focusNodes;
	        this.activePoint = null;
	        // 是否只选中单一路径节点
	        if (focusNodes.length === 1) {
	          var focusNode = focusNodes[0];
	          canvas.setActiveObject(focusNode);
	        }
	        // 多选则成组选择
	        else if (focusNodes.length > 1) {
	          var activeSelection = new fabric.fabric.ActiveSelection(focusNodes, {
	            canvas: canvas,
	            lockScalingFlip: true,
	            originX: 'center',
	            originY: 'center'
	          });
	          if (activeSelection.lockRotation) {
	            activeSelection.setControlVisible('mtr', false);
	          }
	          canvas.setActiveObject(activeSelection);
	        }
	      }
	      // 考虑是否只有一个曲线变换器聚焦情况，不允许多曲线变换器同时聚焦
	      else if (focusCurveDotPoints.length === 1) {
	        var _this$deformers$find = this.deformers.find(function (i) {
	            return i.curveDot === focusCurveDotPoints[0];
	          }),
	          nodeObject = _this$deformers$find.nodeObject;
	        this.activeNodes = [nodeObject];
	        this.activePoint = focusCurveDotPoints[0];
	        canvas.setActiveObject(this.activePoint);
	      }
	      // 如果都没选中
	      else {
	        this.activeNodes = [];
	        this.activePoint = null;
	      }
	      // 绘制曲线变换器及其连接线
	      this._renderDeformers();
	      // 注册活跃对象观测者
	      this._registerActiveObjectsObserver();
	      this.events.fire('selected', this.activeNodes, this.activePoint);
	      // 如果当前选中的是变换器需要确定其自动变换的模式
	      if (this.activePoint) {
	        var deformer = this.deformers.find(function (i) {
	          return i.curveDot === _this20.activePoint;
	        });
	        var relativeDot = this.getOppositeDeformer(this.activePoint);
	        if (relativeDot && 180 - calcCoordsAngle(deformer.dot, deformer.node.node, relativeDot.dot) <= this.deviation) {
	          this.dotSymmetricAutoMode = 'angle';
	          if (Math.abs(calcCoordsDistance(deformer.dot, deformer.node.node) - calcCoordsDistance(deformer.node.node, relativeDot.dot)) <= this.deviation) {
	            this.dotSymmetricAutoMode = 'entire';
	          }
	        } else {
	          this.dotSymmetricAutoMode = 'none';
	        }
	      } else {
	        this.dotSymmetricAutoMode = 'none';
	      }
	      this._lockFocus = false;
	    }
	    /**
	     * 取消选中当前活跃路径节点或变换器对象
	     */
	  }, {
	    key: "blur",
	    value: function blur() {
	      this.focus();
	    }
	    /**
	     * 在当前路径基础上绘制全新的路径片段
	     * @param data 路径片段数据
	     *
	     * @example
	     *
	     * draw('M 100 100 L 200 200 Z');
	     *
	     * @note
	     *
	     * 注意：绘制的路径数据会受到路径当前的变换影响
	     */
	  }, {
	    key: "draw",
	    value: function draw(data) {
	      var vizpath = this.vizpath;
	      if (vizpath) this.rerender(function () {
	        vizpath.addSegment(data);
	      });
	    }
	    /**
	     * 添加新的路径节点
	     *
	     * @note
	     *
	     * 1）在选中单一路径节点后，将在该点后添加新的路径节点
	     *
	     * 2）在未选中节点/选中多个节点时，将直接以该参数位置创建新的起始点以开启一段新的路径
	     *
	     * @param position 新节点的画布绝对位置
	     * @param autoLink 是否自动与活跃元素连接，注意：仅当活跃元素只有1个且为端点节点有效
	     */
	  }, {
	    key: "add",
	    value: function add(position) {
	      var _this21 = this;
	      var autoLink = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	      var vizpath = this.vizpath;
	      if (!vizpath) return;
	      var coord = vizpath.calcRelativeCoord(position);
	      var node = this.rerender(function (activeNodes) {
	        var _a, _b;
	        if (autoLink && activeNodes.length === 1) {
	          var _node = activeNodes[0];
	          var pathNode = _this21.objectNodeMap.get(_node);
	          if (!pathNode) return;
	          var segment = pathNode.segment;
	          // 如果当前节点已闭合或非端点，无法实现节点添加
	          if (vizpath.isClosedSegment(segment)) return;
	          // 如果是起始点
	          if (pathNode === segment[0]) {
	            var preDeformer = (_a = pathNode.deformers) === null || _a === void 0 ? void 0 : _a.pre;
	            var newNode = vizpath.insertBefore(pathNode, [InstructionType.START, coord.x, coord.y]);
	            if (preDeformer) {
	              vizpath.replace(pathNode, [InstructionType.QUADRATIC_CURCE, preDeformer.x, preDeformer.y, pathNode.node.x, pathNode.node.y]);
	            }
	            return newNode;
	          }
	          // 如果是末尾端点
	          else if (pathNode === segment[segment.length - 1]) {
	            var nextDeformer = (_b = pathNode.deformers) === null || _b === void 0 ? void 0 : _b.next;
	            if (nextDeformer) {
	              return vizpath.insertAfter(pathNode, [InstructionType.QUADRATIC_CURCE, nextDeformer.x, nextDeformer.y, coord.x, coord.y]);
	            } else {
	              return vizpath.insertAfter(pathNode, [InstructionType.LINE, coord.x, coord.y]);
	            }
	          }
	        } else {
	          return vizpath.addSegment("M ".concat(coord.x, " ").concat(coord.y))[0];
	        }
	      });
	      if (!node) return;
	      var object = this.nodeObjectMap.get(node);
	      if (!object) return;
	      return object;
	    }
	    /**
	     * 删除节点或变换器
	     *
	     * @note
	     *
	     * 只有以下两种情况是有效删除操作：
	     *
	     * 1） 删除1~n个路径节点:
	     *
	     * ① 删除单一点时，删除节点，并将存在前后邻近节点的前提下连接前后节点。
	     *
	     * ② 删除多点时，删除点与点间的连线实现拆分路径效果。
	     *
	     * ③ 删除的点包含路径上所有点时，直接删除整个路径
	     *
	     * 2）删除1个变换器，实现曲线路径降级为直线路径
	     *
	     * @param objects 点对象(路径节点、变换器)列表
	     */
	  }, {
	    key: "remove",
	    value: function remove() {
	      var _this22 = this;
	      var canvas = this.canvas;
	      if (!canvas) return;
	      var vizpath = this.vizpath;
	      if (!vizpath) return;
	      // 触发鼠标举起事件，避免后续拖动操作生效
	      fireFabricMouseUp(canvas);
	      var removeQueue = [];
	      var degradeQueue = [];
	      var collect = function collect(object) {
	        if (object[VizPathEditor.symbol] === EditorObjectID.NODE) {
	          var node = _this22.objectNodeMap.get(object);
	          if (node) removeQueue.push(node);
	        } else if (object[VizPathEditor.symbol] === EditorObjectID.CURVE_DOT) {
	          var deformer = _this22.deformers.find(function (i) {
	            return i.curveDot === object;
	          });
	          if (deformer) degradeQueue.push({
	            node: deformer.node,
	            direction: deformer.type
	          });
	        }
	      };
	      for (var _len3 = arguments.length, objects = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        objects[_key3] = arguments[_key3];
	      }
	      objects.forEach(function (object) {
	        if (!object) return;
	        if (object.type === 'activeSelection') {
	          object.forEachObject(collect);
	        } else collect(object);
	      });
	      if (degradeQueue.length) {
	        this.rerender(function () {
	          degradeQueue.forEach(function (_ref12) {
	            var node = _ref12.node,
	              direction = _ref12.direction;
	            vizpath.degrade(node, direction);
	          });
	        });
	      }
	      if (removeQueue.length) {
	        this.rerender(function () {
	          vizpath.remove.apply(vizpath, removeQueue);
	        });
	      }
	    }
	    /**
	     * 路径升级
	     *
	     * @note
	     *
	     * 直线先升级到二阶，再从二阶曲线升级到三阶曲线；
	     */
	  }, {
	    key: "upgrade",
	    value: function upgrade(object) {
	      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
	      var highest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	      var vizpath = this.vizpath;
	      if (!vizpath) return;
	      var pathNode = this.objectNodeMap.get(object);
	      if (!pathNode) return;
	      this.rerender(function () {
	        vizpath.upgrade(pathNode, direction, highest);
	      });
	    }
	    /**
	     * 路径降级
	     *
	     * @note
	     *
	     * 二阶贝塞尔曲线会降级为直线；三阶贝塞尔曲线会先降级为二阶贝塞尔曲线，再降级才会转化为直线。
	     *
	     * @param object 节点
	     * @param [direction='both'] 降级范围
	     * @param [lowest=false] 是否直接降到直线级别
	     */
	  }, {
	    key: "degrade",
	    value: function degrade(object) {
	      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
	      var lowest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	      var vizpath = this.vizpath;
	      if (!vizpath) return;
	      var pathNode = this.objectNodeMap.get(object);
	      if (!pathNode) return;
	      this.rerender(function () {
	        vizpath.degrade(pathNode, direction, lowest);
	      });
	    }
	    /**
	     * 节点连线
	     * @returns 拼接点
	     */
	  }, {
	    key: "link",
	    value: function link(object1, object2) {
	      var vizpath = this.vizpath;
	      if (!vizpath) return;
	      var startNode = this.objectNodeMap.get(object1);
	      var endNode = this.objectNodeMap.get(object2);
	      if (!startNode || !endNode) return;
	      var _this$rerender = this.rerender(function () {
	          return vizpath.joinSegment(startNode, endNode);
	        }),
	        action = _this$rerender.action,
	        node = _this$rerender.node;
	      if (!node) return;
	      var object = this.nodeObjectMap.get(node);
	      if (!object) return;
	      this.events.fire({
	        close: 'closed',
	        join: 'joined'
	      }[action], object);
	      return object;
	    }
	    /**
	     * 移动操作对象节点(路径节点/多选后的节点组/变换器)
	     * @param left 左偏移
	     * @param top 上偏移
	     * @param relative 基于当前对象的偏移值进行增量变换，默认为false
	     * @param target 操作对象，默认为选中对象，其他对象设置后将成为选中对象
	     */
	  }, {
	    key: "move",
	    value: function move(left, top, relative, target) {
	      var _a, _b, _c;
	      if (relative === void 0) {
	        relative = false;
	      }
	      if (target === void 0) {
	        target = (_a = this._observer) === null || _a === void 0 ? void 0 : _a.target;
	      }
	      if (target && target !== ((_b = this._observer) === null || _b === void 0 ? void 0 : _b.target)) this.focus(target);else if (!target) this.focus.apply(this, _toConsumableArray(this.nodes));
	      var observerTarget = (_c = this._observer) === null || _c === void 0 ? void 0 : _c.target;
	      if (!observerTarget) return;
	      if (relative) {
	        observerTarget.set({
	          left: observerTarget.left + left,
	          top: observerTarget.top + top
	        });
	      } else {
	        observerTarget.set({
	          left: left,
	          top: top
	        });
	      }
	    }
	    /**
	     * 旋转操作对象(仅对多选后的节点组有效)
	     * @param angle 旋转角度
	     * @param relative 基于当前对象的角度进行增量变换，默认为false
	     * @param target 操作对象，默认为选中对象，其他对象设置后将成为选中对象
	     */
	  }, {
	    key: "rotate",
	    value: function rotate(angle, relative, target) {
	      var _a, _b, _c;
	      if (relative === void 0) {
	        relative = false;
	      }
	      if (target === void 0) {
	        target = (_a = this._observer) === null || _a === void 0 ? void 0 : _a.target;
	      }
	      if (target && target !== ((_b = this._observer) === null || _b === void 0 ? void 0 : _b.target)) this.focus(target);else if (!target) this.focus.apply(this, _toConsumableArray(this.nodes));
	      var observerTarget = (_c = this._observer) === null || _c === void 0 ? void 0 : _c.target;
	      if (!observerTarget || observerTarget.type !== 'activeSelection') return;
	      if (relative) {
	        observerTarget.set({
	          angle: observerTarget.angle + angle
	        });
	      } else {
	        observerTarget.set({
	          angle: angle
	        });
	      }
	    }
	    /**
	     * 缩放操作对象(仅对多选后的节点组有效)
	     * @param scaleX 水平方向缩放
	     * @param scaleY 垂直方向缩放
	     * @param relative 基于当前对象的缩放进行增量变换，默认为false
	     * @param target 操作对象，默认为选中对象，其他对象设置后将成为选中对象
	     */
	  }, {
	    key: "scale",
	    value: function scale(scaleX, scaleY, relative, target) {
	      var _a, _b, _c;
	      if (relative === void 0) {
	        relative = false;
	      }
	      if (target === void 0) {
	        target = (_a = this._observer) === null || _a === void 0 ? void 0 : _a.target;
	      }
	      if (target && target !== ((_b = this._observer) === null || _b === void 0 ? void 0 : _b.target)) this.focus(target);else if (!target) this.focus.apply(this, _toConsumableArray(this.nodes));
	      var observerTarget = (_c = this._observer) === null || _c === void 0 ? void 0 : _c.target;
	      if (!observerTarget || observerTarget.type !== 'activeSelection') return;
	      if (relative) {
	        observerTarget.set({
	          scaleX: observerTarget.scaleX * scaleX,
	          scaleY: observerTarget.scaleY * scaleY
	        });
	      } else {
	        observerTarget.set({
	          scaleX: scaleX,
	          scaleY: scaleY
	        });
	      }
	    }
	    /**
	     * 添加功能增强模块
	     * @this
	     */
	  }, {
	    key: "use",
	    value: function use(module) {
	      if (this.canvas) {
	        console.warn('(VizPath Warning) Make sure to use the module before the canvas is mounted.');
	        return this;
	      }
	      var index = this.modules.findIndex(function (item) {
	        return item.constructor.ID === module.constructor.ID;
	      });
	      if (index !== -1) {
	        this.modules.splice(index, 1);
	      }
	      this.modules.push(module);
	      return this;
	    }
	    /**
	     * 挂载编辑器实现路径可视化，会一并加载增强模块
	     * @param canvas fabric.Canvas对象
	     * @this
	     */
	  }, {
	    key: "mount",
	    value: (function () {
	      var _mount = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(canvas) {
	        var _this23 = this;
	        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
	          while (1) switch (_context5.prev = _context5.next) {
	            case 0:
	              // 在画布中建立编辑器关联，让内部vizpath对象可直接找到编辑器对象并进入编辑，避免编辑器对象层层传递
	              canvas[VizPathEditor.symbol] = this;
	              // 加载默认内置模块 —— 路径编辑器
	              this.canvas = canvas;
	              this.events.mount(this.canvas);
	              // 初始节点选择事件
	              this._initSelectEvents();
	              // 初始节点添加事件
	              this._initAddEvents();
	              // 初始节点删除事件
	              this._initDeleteEvents();
	              // 初始节点变换事件
	              this._initConvertEvents();
	              // 加载其他增强模块
	              _context5.next = 9;
	              return new Promise(function (resolve) {
	                var next = 0;
	                var loadModule = /*#__PURE__*/function () {
	                  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
	                    var module;
	                    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
	                      while (1) switch (_context4.prev = _context4.next) {
	                        case 0:
	                          module = _this23.modules[next];
	                          if (module) {
	                            _context4.next = 4;
	                            break;
	                          }
	                          resolve();
	                          return _context4.abrupt("return");
	                        case 4:
	                          _context4.next = 6;
	                          return module.__load(_this23)["catch"](function (err) {
	                            console.error("(VizPath Error): An error occurred while loading the module named '".concat(module.name, "'!"));
	                            console.error(err);
	                          });
	                        case 6:
	                          next++;
	                          loadModule();
	                        case 8:
	                        case "end":
	                          return _context4.stop();
	                      }
	                    }, _callee4);
	                  }));
	                  return function loadModule() {
	                    return _ref13.apply(this, arguments);
	                  };
	                }();
	                loadModule();
	              });
	            case 9:
	              return _context5.abrupt("return", this);
	            case 10:
	            case "end":
	              return _context5.stop();
	          }
	        }, _callee5, this);
	      }));
	      function mount(_x5) {
	        return _mount.apply(this, arguments);
	      }
	      return mount;
	    }()
	    /**
	     * 取消画布挂载，但不会清空已添加的模块，可以直接保留模块重新挂载在另一画布上
	     */
	    )
	  }, {
	    key: "unmounted",
	    value: (function () {
	      var _unmounted = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
	        var _this24 = this;
	        var _a;
	        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
	          while (1) switch (_context6.prev = _context6.next) {
	            case 0:
	              if (this.vizpath) this.leaveEditing();
	              // 卸载全部增强模块
	              _context6.next = 3;
	              return Promise.all(this.modules.map(function (module) {
	                // 模块卸载失败不能影响正常流程进
	                module.__unload(_this24)["catch"](function (err) {
	                  console.error("(VizPath Error): An error occurred while unloading the module named '".concat(module.name, "'!"));
	                  console.error(err);
	                });
	              }));
	            case 3:
	              // 不清空模块，取消挂载仅销毁和画布关联，以便于挂载到另一画布，销毁（destroy）才会完全释放模块数据
	              // this.modules = [];
	              // 释放事件监听
	              this.events.clear();
	              // 释放画布
	              (_a = this.canvas) === null || _a === void 0 ? true : delete _a[VizPathEditor.symbol];
	              this.canvas = null;
	            case 6:
	            case "end":
	              return _context6.stop();
	          }
	        }, _callee6, this);
	      }));
	      function unmounted() {
	        return _unmounted.apply(this, arguments);
	      }
	      return unmounted;
	    }()
	    /**
	     * 销毁编辑器，取消挂载并释放内存
	     */
	    )
	  }, {
	    key: "destroy",
	    value: (function () {
	      var _destroy = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
	        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
	          while (1) switch (_context7.prev = _context7.next) {
	            case 0:
	              _context7.next = 2;
	              return this.unmounted();
	            case 2:
	              this.modules = [];
	            case 3:
	            case "end":
	              return _context7.stop();
	          }
	        }, _callee7, this);
	      }));
	      function destroy() {
	        return _destroy.apply(this, arguments);
	      }
	      return destroy;
	    }())
	  }]);
	}();
	VizPathEditor.symbol = Symbol('vizpath-editor');
	VizPathEditor.defaultTheme = {
	  path: function path() {},
	  node: function node() {
	    var circle = new fabric.fabric.Circle({
	      radius: 3,
	      fill: '#ffffff',
	      stroke: '#4b4b4b',
	      strokeWidth: 1
	    });
	    return circle;
	  },
	  dot: function dot() {
	    var circle = new fabric.fabric.Circle({
	      radius: 3,
	      fill: '#ffffff',
	      stroke: '#4b4b4bcc',
	      strokeWidth: 1,
	      strokeDashArray: [1, 1]
	    });
	    return circle;
	  },
	  line: function line() {
	    var line = new fabric.fabric.Line([0, 0, 0, 0], {
	      stroke: '#bebebe',
	      strokeWidth: 1
	    });
	    return line;
	  }
	};
	var InstructionType;
	(function (InstructionType) {
	  InstructionType["START"] = "M";
	  InstructionType["LINE"] = "L";
	  InstructionType["QUADRATIC_CURCE"] = "Q";
	  InstructionType["BEZIER_CURVE"] = "C";
	  InstructionType["CLOSE"] = "Z";
	})(InstructionType || (InstructionType = {}));
	var VizPath = /*#__PURE__*/function () {
	  function VizPath(path) {
	    _classCallCheck(this, VizPath);
	    this.segments = [];
	    this.instructionNodeMap = new WeakMap([]);
	    this.events = new VizPathEvent();
	    /**
	     * 响应式节点的更改监听
	     */
	    this._observers = new Map();
	    this.path = path;
	    // 清除路径起始偏移
	    clearPathOffset(path);
	    // 关闭变换缓存，避免节点变换导致路径渲染被裁切
	    path.ownMatrixCache = function () {
	      return false;
	    };
	    // 重构响应式路径
	    this.setInstructions(path.path);
	  }
	  /**
	   * 遍历路径指令节点
	   */
	  return _createClass(VizPath, [{
	    key: "_toStartInstruction",
	    value:
	    /**
	     * 转为起始指令
	     *
	     * @note 不允许将闭合指令转起始指令
	     */
	    function _toStartInstruction(instruction) {
	      instruction[0] = InstructionType.START;
	      instruction[1] = instruction[instruction.length - 2];
	      instruction[2] = instruction[instruction.length - 1];
	      instruction.length = 3;
	    }
	    /**
	     * 修复指令，缺失的坐标统统补0
	     */
	  }, {
	    key: "_repairInstruction",
	    value: function _repairInstruction(instruction) {
	      instruction.push(0, 0, 0, 0, 0, 0);
	      var length = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, InstructionType.START, 3), InstructionType.LINE, 3), InstructionType.QUADRATIC_CURCE, 5), InstructionType.BEZIER_CURVE, 7), InstructionType.CLOSE, 1)[instruction[0]];
	      if (length) instruction.length = length;else {
	        instruction[0] = InstructionType.START;
	        instruction.length = 3;
	      }
	      return instruction;
	    }
	    /**
	     * 拆分并遍历路径分段
	     * @param instructions 路径指令列表
	     * @param callbackfn 遍历回调
	     */
	  }, {
	    key: "_splitInstructions",
	    value: function _splitInstructions(instructions, callbackfn) {
	      var _a;
	      if (instructions.length === 0) return instructions;
	      var start = 0;
	      for (var i = 0; i < instructions.length; i++) {
	        var instruction = instructions[i];
	        var closed = instruction[0].toUpperCase() === InstructionType.CLOSE;
	        if (closed || ((_a = instructions[i + 1]) === null || _a === void 0 ? void 0 : _a[0]) === InstructionType.START || i + 1 === instructions.length) {
	          callbackfn(start, i, closed);
	          start = i + 1;
	        }
	      }
	    }
	    /**
	     * 拆分路径段
	     * @param instructions 路径指令列表
	     * @returns 路径分段
	     */
	  }, {
	    key: "_splitPathSegments",
	    value: function _splitPathSegments(instructions) {
	      var pathSegments = [];
	      this._splitInstructions(instructions, function (start, end, closed) {
	        var segment = instructions.slice(start, end + 1);
	        // 只有一个闭合指令的直接过滤
	        if (segment[0][0].toUpperCase() === InstructionType.CLOSE) return;
	        // 修正头指令，头指令必须是M开始指令，其他的也没效果
	        if (segment[0][0] !== InstructionType.START) {
	          segment[0] = [InstructionType.START].concat(_toConsumableArray(segment[0].slice(-2)));
	        }
	        // 如果是闭合路径
	        if (closed) {
	          // 小于两个点的闭合路径直接解除闭合
	          if (segment.length <= 2) {
	            segment.pop();
	          }
	          // 将闭合指令变大写，保持统一以避免后续错误
	          else {
	            segment[segment.length - 1][0] = InstructionType.CLOSE;
	            // 闭合的路径如果在闭合指令前没有回到起始点，补充一条回到起始点的指令
	            var startPoint = segment[0].slice(segment[0].length - 2);
	            var endPoint = segment[segment.length - 2].slice(segment[segment.length - 2].length - 2);
	            if (
	            // 如果路径只有一个起始点且闭合[M,Z]
	            segment[0] === segment[segment.length - 2] ||
	            // 或者路径闭合但是最后一个路径节点不完全等于起始点
	            endPoint[0] !== startPoint[0] || endPoint[1] !== startPoint[1]) {
	              segment.splice(segment.length - 1, 0, [InstructionType.LINE, startPoint[0], startPoint[1]]);
	            }
	          }
	        }
	        pathSegments.push(segment);
	      });
	      return pathSegments;
	    }
	    /**
	     * 获取路径指令信息
	     */
	  }, {
	    key: "getInstructions",
	    value: function getInstructions() {
	      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (segment, index) {
	        return segment.map(function (node) {
	          return node.instruction;
	        });
	      };
	      var segments = [];
	      this.segments.forEach(function (segment, index) {
	        segments.push(callback(segment, index));
	      });
	      return segments.flat(1);
	    }
	    /**
	     * 使用新的指令列表重构当前路径指令
	     * @param instructions 新的指令列表
	     */
	  }, {
	    key: "setInstructions",
	    value: function setInstructions(instructions) {
	      var _this25 = this;
	      this.events.fire('before:update');
	      // 构建新的路径段数据
	      var newSegments = [];
	      this._splitPathSegments(instructions).forEach(function (segment) {
	        var pathNodes = [];
	        segment.forEach(function (instruction) {
	          var reuseNode = _this25.instructionNodeMap.get(instruction);
	          var pathNode = reuseNode !== null && reuseNode !== void 0 ? reuseNode : {
	            id: uniqueId(),
	            path: _this25,
	            segment: pathNodes,
	            instruction: instruction
	          };
	          pathNode.path = _this25;
	          pathNode.segment = pathNodes;
	          pathNodes.push(pathNode);
	          _this25.instructionNodeMap.set(instruction, pathNode);
	        });
	        newSegments.push(pathNodes);
	      });
	      // 将路径段转为响应式
	      newSegments.forEach(function (segment) {
	        segment.forEach(function (node, index) {
	          _this25._toResponsiveNode(segment, node);
	        });
	        _this25._initSegmentDeformers(segment);
	      });
	      var oldSegments = this.segments;
	      this.segments = newSegments;
	      this.path.path = instructions;
	      this.requestRepair();
	      // 释放旧节点数据
	      this._revokeDisusedRCoords(oldSegments);
	      this.events.fire('after:update');
	    }
	    /**
	     * 获取路径的指令字符串
	     */
	  }, {
	    key: "getPathData",
	    value: function getPathData() {
	      var segment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	      var outputOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var instructions = cloneDeep((segment !== null && segment !== void 0 ? segment : this.segments.flat(1)).map(function (node) {
	        return node.instruction;
	      }));
	      var matrix = _toConsumableArray(this.path.calcOwnMatrix());
	      var offset = fabric.fabric.util.transformPoint(this.path.pathOffset, matrix, true);
	      matrix[4] -= offset.x;
	      matrix[5] -= offset.y;
	      return VizPath.toPathData(instructions, Object.assign(Object.assign({}, outputOptions), {
	        matrix: matrix
	      }));
	    }
	    /**
	     * 设置路径指令字符串
	     */
	  }, {
	    key: "setPathData",
	    value: function setPathData(data) {
	      var path = clearPathOffset(new fabric.fabric.Path(data));
	      var instructions = path.path;
	      this.setInstructions(instructions);
	    }
	    /**
	     * 重新修正路径的尺寸和位置
	     *
	     * @note
	     *
	     * fabric.Path对象直接改内部路径指令，其路径会渲染正确的，但却保持其原尺寸和偏移信息，导致对象信息错误，
	     * 该方法使用initialize重新初始化路径，使其获取正确的尺寸，但偏移是错的，该方法同时修正偏移。
	     */
	  }, {
	    key: "repair",
	    value: function repair() {
	      var _a;
	      var path = this.path;
	      // 记录旧的路径信息
	      var oldInfo = {
	        left: path.left,
	        top: path.top,
	        width: path.width,
	        height: path.height,
	        pathOffset: Object.assign({}, path.pathOffset)
	      };
	      // 持有旧的指令后恢复避免丢失引用
	      var instructions = path.path;
	      var _d = fabric.fabric.util.joinPath(instructions);
	      // 更新路径尺寸
	      path.initialize(_d);
	      path.path = instructions;
	      // 计算路径偏移差值
	      var inverse = function inverse(value) {
	        var inverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	        return value * Math.pow(-1, Number(inverse));
	      };
	      var repairOffset = fabric.fabric.util.transformPoint(new fabric.fabric.Point(path.pathOffset.x - inverse(path.width - oldInfo.width, path.flipX) / 2 - oldInfo.pathOffset.x, path.pathOffset.y - inverse(path.height - oldInfo.height, path.flipY) / 2 - oldInfo.pathOffset.y), path.calcOwnMatrix(), true);
	      // 设置回正确的偏移位置
	      path.set({
	        left: oldInfo.left + repairOffset.x,
	        top: oldInfo.top + repairOffset.y
	      });
	      path.setCoords();
	      // 更新画布
	      (_a = path.canvas) === null || _a === void 0 ? void 0 : _a.requestRenderAll();
	    }
	    /**
	     * 申请重新修正路径的尺寸和位置，跟随浏览器刷新频率
	     */
	  }, {
	    key: "requestRepair",
	    value: function requestRepair() {
	      var _this26 = this;
	      if (this._requestRepair) {
	        window.cancelAnimationFrame(this._requestRepair);
	      }
	      this._requestRepair = window.requestAnimationFrame(function () {
	        _this26.repair();
	        _this26._requestRepair = undefined;
	      });
	    }
	    /**
	     * 转化为响应式更改的点对象
	     * @param coord 点
	     * @param callback 响应式更改回调
	     * @returns
	     */
	  }, {
	    key: "_toResponsiveCoord",
	    value: function _toResponsiveCoord(coord) {
	      var _this27 = this;
	      var temporaryIgnoreIds = [];
	      var proxy = new Proxy(coord, {
	        set: function set(target, p, value, receiver) {
	          if (p === 'x' || p === 'y') {
	            var oldValue = target[p];
	            var result = Reflect.set(target, p, value, receiver);
	            if (oldValue !== value) {
	              var observers = _this27._observers.get(proxy);
	              if (observers) {
	                var x = p === 'x' ? value : target.x;
	                var y = p === 'y' ? value : target.y;
	                var _iterator3 = _createForOfIteratorHelper(observers),
	                  _step3;
	                try {
	                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
	                    var _observe = _step3.value;
	                    if (_observe.id && temporaryIgnoreIds.indexOf(_observe.id) !== -1) continue;
	                    _observe.handler(x, y);
	                  }
	                } catch (err) {
	                  _iterator3.e(err);
	                } finally {
	                  _iterator3.f();
	                }
	              }
	              _this27.requestRepair();
	            }
	            return result;
	          } else {
	            return Reflect.set(target, p, value, receiver);
	          }
	        }
	      });
	      proxy.set = function (x, y) {
	        var skipObserverIDs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	        if (Array.isArray(skipObserverIDs)) {
	          temporaryIgnoreIds = skipObserverIDs;
	        }
	        proxy.x = x;
	        proxy.y = y;
	        temporaryIgnoreIds = [];
	      };
	      proxy.observe = function (handler) {
	        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	        var _a;
	        var immediate = options.immediate,
	          id = options.id;
	        if (immediate) handler(coord.x, coord.y);
	        var observers = (_a = _this27._observers.get(proxy)) !== null && _a !== void 0 ? _a : [];
	        var index = id ? observers.findIndex(function (observer) {
	          return observer.id === id;
	        }) : -1;
	        if (index === -1) observers.push({
	          handler: handler,
	          id: id
	        });else observers.splice(index, 1, {
	          handler: handler,
	          id: id
	        });
	        _this27._observers.set(proxy, observers);
	      };
	      proxy.unobserve = function (id) {
	        var observers = _this27._observers.get(proxy);
	        if (!observers) return;
	        if (!id) {
	          _this27._observers["delete"](proxy);
	          return;
	        }
	        _this27._observers.set(proxy, observers.filter(function (i) {
	          return i.id !== id;
	        }));
	      };
	      return proxy;
	    }
	    /**
	     * 转为响应式的路径节点
	     * @param pathNodes 节点列表
	     * @param node 节点
	     * @param index 所在指令列表的索引位置
	     * @returns 响应式的路径节点
	     */
	  }, {
	    key: "_toResponsiveNode",
	    value: function _toResponsiveNode(pathNodes, node) {
	      var _a, _b;
	      var instruction = node.instruction;
	      var coord = this.getInstructionCoord(instruction);
	      if (coord) {
	        if (this.isCoincideNode(node)) {
	          (_a = pathNodes[0].node) === null || _a === void 0 ? void 0 : _a.observe(function (x, y) {
	            instruction[instruction.length - 2] = x;
	            instruction[instruction.length - 1] = y;
	          });
	        } else {
	          node.node = (_b = node.node) !== null && _b !== void 0 ? _b : this._toResponsiveCoord(coord);
	          node.node.unobserve();
	          node.node.observe(function (x, y) {
	            instruction[instruction.length - 2] = x;
	            instruction[instruction.length - 1] = y;
	          });
	          node.node.set(coord.x, coord.y);
	        }
	      }
	      return node;
	    }
	    /**
	     * 补充变换器
	     */
	  }, {
	    key: "_initSegmentDeformers",
	    value: function _initSegmentDeformers(segment) {
	      var _this28 = this;
	      var nodes = segment;
	      nodes.forEach(function (node, index) {
	        var _a, _b, _c, _e, _f, _g;
	        // 旧的变换器
	        var oldDeformers = (_a = node.deformers) !== null && _a !== void 0 ? _a : {};
	        // 指令曲线变换器
	        var deformers = {};
	        var _this28$getNeighborin = _this28.getNeighboringInstructions(node),
	          pre = _this28$getNeighborin.pre,
	          next = _this28$getNeighborin.next;
	        // 前一个节点是否已经有next变换器
	        var preNodeHadNextDeformer = index > 0 && pre && ((_b = pre.deformers) === null || _b === void 0 ? void 0 : _b.next) !== undefined;
	        // 前曲线变换器
	        if (node.instruction[0] === 'C' || node.instruction[0] === 'Q' && !preNodeHadNextDeformer) {
	          var length = node.instruction.length;
	          var coord = {
	            x: node.instruction[length - 4],
	            y: node.instruction[length - 3]
	          };
	          var curveDot = (_c = oldDeformers.pre) !== null && _c !== void 0 ? _c : _this28._toResponsiveCoord(coord);
	          curveDot.unobserve();
	          curveDot.observe(function (x, y) {
	            node.instruction[length - 4] = x;
	            node.instruction[length - 3] = y;
	          });
	          if (_this28.isCoincideNode(node)) {
	            nodes[0].deformers = (_e = nodes[0].deformers) !== null && _e !== void 0 ? _e : {};
	            nodes[0].deformers.pre = curveDot;
	          } else {
	            deformers.pre = curveDot;
	          }
	        }
	        // 后曲线变换器
	        if (next && (next.instruction[0] === 'C' || next.instruction[0] === 'Q' && !preNodeHadNextDeformer)) {
	          var _coord = {
	            x: next.instruction[1],
	            y: next.instruction[2]
	          };
	          var _curveDot2 = (_f = oldDeformers.next) !== null && _f !== void 0 ? _f : _this28._toResponsiveCoord(_coord);
	          _curveDot2.unobserve();
	          _curveDot2.observe(function (x, y) {
	            next.instruction[1] = x;
	            next.instruction[2] = y;
	          });
	          _curveDot2.set(_coord.x, _coord.y);
	          if (next.instruction[0] === 'Q' && _this28.isCoincideNode(next)) {
	            nodes[0].deformers = (_g = nodes[0].deformers) !== null && _g !== void 0 ? _g : {};
	            nodes[0].deformers.pre = _curveDot2;
	          } else {
	            deformers.next = _curveDot2;
	          }
	        }
	        if (oldDeformers.pre && !deformers.pre) oldDeformers.pre.unobserve();
	        if (oldDeformers.next && !deformers.next) oldDeformers.next.unobserve();
	        if (Object.keys(deformers).length) {
	          node.deformers = deformers;
	        } else {
	          delete node.deformers;
	        }
	      });
	    }
	    /**
	     * 添加变换器
	     */
	  }, {
	    key: "addNodeDeformer",
	    value: function addNodeDeformer(node, type, coord) {
	      var _a;
	      node.deformers = (_a = node.deformers) !== null && _a !== void 0 ? _a : {};
	      if (node.deformers[type]) {
	        node.deformers[type].set(coord.x, coord.y);
	        return;
	      }
	      node.deformers[type] = this._toResponsiveCoord(coord);
	      node.deformers[type].set(coord.x, coord.y);
	    }
	    /**
	     * 将画布坐标转化为特定路径的相对指令坐标位置
	     */
	  }, {
	    key: "calcAbsolutePosition",
	    value: function calcAbsolutePosition(coord) {
	      var object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.path;
	      var matrix = _toConsumableArray(object.calcOwnMatrix());
	      // 路径如果带有偏移则需要移除偏移带来的影响
	      if (object.type === 'path') {
	        var offset = fabric.fabric.util.transformPoint(object.pathOffset, matrix, true);
	        matrix[4] -= offset.x;
	        matrix[5] -= offset.y;
	      }
	      var point = fabric.fabric.util.transformPoint(new fabric.fabric.Point(coord.x, coord.y), matrix);
	      return {
	        left: point.x,
	        top: point.y
	      };
	    }
	    /**
	     * 将路径内的相对指令坐标位置转为所在画布的坐标位置
	     */
	  }, {
	    key: "calcRelativeCoord",
	    value: function calcRelativeCoord(position) {
	      var object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.path;
	      var matrix = _toConsumableArray(object.calcOwnMatrix());
	      if (object.type === 'path') {
	        var offset = fabric.fabric.util.transformPoint(object.pathOffset, matrix, true);
	        matrix[4] -= offset.x;
	        matrix[5] -= offset.y;
	      }
	      var point = fabric.fabric.util.transformPoint(new fabric.fabric.Point(position.left, position.top), fabric.fabric.util.invertTransform(matrix));
	      return point;
	    }
	    /**
	     * 获取指令中的路径节点
	     *
	     * @note 闭合指令无路径节点
	     */
	  }, {
	    key: "getInstructionCoord",
	    value: function getInstructionCoord(instruction) {
	      if (instruction[0] === InstructionType.CLOSE) return;
	      return {
	        x: instruction[instruction.length - 2],
	        y: instruction[instruction.length - 1]
	      };
	    }
	    /**
	     * 获取前后的指令信息
	     * @param pathNode 路径节点
	     * @param cycle 闭合路径是否开启循环查找
	     */
	  }, {
	    key: "getNeighboringInstructions",
	    value: function getNeighboringInstructions(node) {
	      var cycle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	      var segment = node.segment;
	      var index = segment.indexOf(node);
	      var pre = segment[index - 1];
	      var next = segment[index + 1];
	      // 是否循环并且是闭合路径
	      if (cycle && this.isClosedSegment(segment)) {
	        // 如果没有上一个指令，则倒数第二个指令视为上一个指令（倒数第一是闭合指令，倒数第二是起始同步指令）
	        if (!pre) {
	          pre = segment[segment.length - 2];
	        }
	        // 如果有下一个指令但下一个指令是闭合指令，则指向起始指令下一个指令
	        if (!next || next.instruction[0] === InstructionType.CLOSE) {
	          next = segment[1];
	        }
	      }
	      return {
	        pre: pre,
	        next: next
	      };
	    }
	    /**
	     * 获取前后的指令节点信息
	     * @param pathNode 路径节点
	     * @param cycle 闭合路径是否开启循环查找
	     */
	  }, {
	    key: "getNeighboringNodes",
	    value: function getNeighboringNodes(node) {
	      var cycle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	      var segment = node.segment;
	      var _cycle = cycle && this.isClosedSegment(segment);
	      var _index = segment.indexOf(node);
	      var pre;
	      var next;
	      if (_index !== -1) {
	        var i = _index;
	        while (!pre && segment[i]) {
	          if (i !== _index && segment[i]) pre = segment[i];
	          i--;
	          if (_cycle && i === -1) i = segment.length - 3;
	          if (i === _index) break;
	        }
	        i = _index;
	        while (!next && segment[i]) {
	          if (i !== _index && segment[i]) next = segment[i];
	          i++;
	          if (_cycle && i === segment.length - 2) i = 0;
	          if (i === _index) break;
	        }
	      }
	      return {
	        pre: pre,
	        next: next
	      };
	    }
	    /**
	     * 获取周围的曲线变换器信息（前、后、上一路径节点后、下一路径节点前），默认循环查找
	     */
	  }, {
	    key: "getNeighboringCurveDots",
	    value: function getNeighboringCurveDots(node) {
	      var deformers = [];
	      deformers.push({
	        position: 'cur',
	        direction: 'pre',
	        from: node
	      });
	      deformers.push({
	        position: 'cur',
	        direction: 'next',
	        from: node
	      });
	      var _this$getNeighboringN = this.getNeighboringNodes(node),
	        pre = _this$getNeighboringN.pre,
	        next = _this$getNeighboringN.next;
	      if (pre) deformers.push({
	        position: 'pre',
	        direction: 'next',
	        from: pre
	      });
	      if (next) deformers.push({
	        position: 'next',
	        direction: 'pre',
	        from: next
	      });
	      return deformers;
	    }
	    /**
	     * 获取路径节点可进行变换的前后配置
	     */
	  }, {
	    key: "getConvertibleNodes",
	    value: function getConvertibleNodes(node) {
	      var instruction = node.instruction;
	      var _this$getNeighboringI = this.getNeighboringInstructions(node),
	        pre = _this$getNeighboringI.pre,
	        next = _this$getNeighboringI.next;
	      var convertibleNodes = [];
	      switch (instruction[0]) {
	        case InstructionType.START:
	          if ((pre === null || pre === void 0 ? void 0 : pre.instruction[0]) === InstructionType.LINE || (pre === null || pre === void 0 ? void 0 : pre.instruction[0]) === InstructionType.QUADRATIC_CURCE) {
	            convertibleNodes.push(['pre', pre]);
	          }
	          if ((next === null || next === void 0 ? void 0 : next.instruction[0]) === InstructionType.LINE || (next === null || next === void 0 ? void 0 : next.instruction[0]) === InstructionType.QUADRATIC_CURCE) {
	            convertibleNodes.push(['next', next]);
	          }
	          break;
	        case InstructionType.LINE:
	          convertibleNodes.push(['pre', node]);
	          if ((next === null || next === void 0 ? void 0 : next.instruction[0]) === InstructionType.LINE || (next === null || next === void 0 ? void 0 : next.instruction[0]) === InstructionType.QUADRATIC_CURCE) {
	            convertibleNodes.push(['next', next]);
	          }
	          break;
	        case InstructionType.QUADRATIC_CURCE:
	          convertibleNodes.push(['pre', node]);
	          if ((next === null || next === void 0 ? void 0 : next.instruction[0]) === InstructionType.LINE || (next === null || next === void 0 ? void 0 : next.instruction[0]) === InstructionType.QUADRATIC_CURCE) {
	            convertibleNodes.push(['next', next]);
	          }
	          break;
	        case InstructionType.BEZIER_CURVE:
	          if ((next === null || next === void 0 ? void 0 : next.instruction[0]) === InstructionType.LINE || (next === null || next === void 0 ? void 0 : next.instruction[0]) === InstructionType.QUADRATIC_CURCE) {
	            convertibleNodes.push(['next', next]);
	          }
	          break;
	      }
	      return convertibleNodes;
	    }
	    /**
	     * 是否是闭合路径段
	     * @param segment 路径段
	     */
	  }, {
	    key: "isClosedSegment",
	    value: function isClosedSegment(segment) {
	      var _a;
	      return ((_a = segment[segment.length - 1]) === null || _a === void 0 ? void 0 : _a.instruction[0]) === InstructionType.CLOSE;
	    }
	    /**
	     * 是否是路径端点
	     */
	  }, {
	    key: "isTerminalNode",
	    value: function isTerminalNode(node) {
	      // 闭合路径必然不存在端点
	      if (this.isClosedSegment(node.segment)) return false;
	      var index = node.segment.indexOf(node);
	      return index === 0 || index === node.segment.length - 1;
	    }
	    /**
	     * 是否是起始点的闭合重叠点，其路径节点沿用起始点，而曲线变换器也会被起始点占用
	     */
	  }, {
	    key: "isCoincideNode",
	    value: function isCoincideNode(node) {
	      var _a;
	      var index = node.segment.indexOf(node);
	      return ((_a = node.segment[index + 1]) === null || _a === void 0 ? void 0 : _a.instruction[0]) === InstructionType.CLOSE;
	    }
	    /**
	     * 遍历路径节点
	     */
	  }, {
	    key: "forEachNodes",
	    value: function forEachNodes(callbackfn) {
	      this.segments.forEach(function (segment) {
	        return segment.forEach(callbackfn);
	      });
	    }
	    /**
	     * 在路径片段中插入新指令
	     * @param segment 路径片段
	     * @param index 插入位置索引
	     * @param instruction 新指令
	     */
	  }, {
	    key: "insert",
	    value: function insert(segment, index, instruction) {
	      this._executeUpdateCommands(segment, [{
	        type: 'add',
	        index: index,
	        instruction: instruction
	      }]);
	      return this.instructionNodeMap.get(instruction);
	    }
	    /**
	     * 在目标路径节点前新增指令
	     * @param node 指令对象
	     * @param instruction 新指令
	     */
	  }, {
	    key: "insertBefore",
	    value: function insertBefore(node, instruction) {
	      var segment = node.segment;
	      var index = segment.indexOf(node);
	      if (index === -1) return;
	      return this.insert(segment, index, instruction);
	    }
	    /**
	     * 在目标路径节点后新增指令
	     * @param node 指令对象
	     * @param instruction 新指令
	     */
	  }, {
	    key: "insertAfter",
	    value: function insertAfter(node, instruction) {
	      var segment = node.segment;
	      var index = segment.indexOf(node);
	      if (index === -1) return;
	      return this.insert(segment, index + 1, instruction);
	    }
	    /**
	     * 在路径片段中后添加新指令
	     * @param segment 路径片段
	     * @param instruction 新指令
	     */
	  }, {
	    key: "add",
	    value: function add(segment, instruction) {
	      this._executeUpdateCommands(segment, [{
	        type: 'add',
	        index: segment.length,
	        instruction: instruction
	      }]);
	      return this.instructionNodeMap.get(instruction);
	    }
	    /**
	     * 移除路径节点
	     *
	     * @note
	     *
	     * ① 只有一个删除节点时，删除节点前后线段，连接前后节点
	     *
	     * ② 有多个删除节点，仅删除节点间的线段，中间节点同时也会被移除，独立节点不受影响
	     */
	  }, {
	    key: "remove",
	    value: function remove() {
	      var _this29 = this;
	      for (var _len4 = arguments.length, nodes = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        nodes[_key4] = arguments[_key4];
	      }
	      // 找出需要删除的路径和指令索引映射，便于后续同路径下节点的批量操作
	      var segmentRemoveIndexsMap = nodes.reduce(function (maps, node) {
	        var _a;
	        if (!node) return maps;
	        var segment = node.segment,
	          instruction = node.instruction;
	        var indexes = (_a = maps.get(segment)) !== null && _a !== void 0 ? _a : [];
	        var index = segment.findIndex(function (i) {
	          return i.instruction === instruction;
	        });
	        indexes.push(index);
	        maps.set(segment, indexes);
	        return maps;
	      }, new Map([]));
	      var newInstructions = this.getInstructions(function (segment) {
	        var instructions = segment.map(function (i) {
	          return i.instruction;
	        });
	        if (!segmentRemoveIndexsMap.has(segment)) return instructions;
	        var indexes = segmentRemoveIndexsMap.get(segment);
	        if (!indexes.length) return instructions;
	        var isClosedSegment = segment[segment.length - 1].instruction[0] === InstructionType.CLOSE;
	        indexes.sort();
	        for (var i = 0; i < indexes.length; i++) {
	          var _index2 = indexes[i] - i;
	          if (instructions[_index2 + 1] && instructions[_index2 + 1][0] !== InstructionType.CLOSE) {
	            _this29._toStartInstruction(instructions[_index2 + 1]);
	          }
	          instructions.splice(_index2, 1);
	        }
	        // 处理闭合路径
	        if (isClosedSegment) {
	          instructions.pop();
	          var coincideNode = instructions.pop();
	          if (instructions.length) {
	            if (indexes[0] !== 0) {
	              var _instructions$;
	              (_instructions$ = instructions[0]).splice.apply(_instructions$, [0, instructions[0].length].concat(_toConsumableArray(coincideNode)));
	            }
	            while (instructions[0][0] !== InstructionType.START) {
	              instructions.push(instructions.shift());
	            }
	          }
	        }
	        return instructions;
	      });
	      this.setInstructions(newInstructions);
	    }
	    /**
	     * 替换指令
	     *
	     * @note 路径节点的引用不会发生变化
	     *
	     * @param node 指令对象
	     * @param instruction 新指令
	     */
	  }, {
	    key: "replace",
	    value: function replace(node, instruction) {
	      var segment = node.segment;
	      var isClosed = this.isClosedSegment(segment);
	      var index = segment.indexOf(node);
	      if (index === -1) return;
	      var updateCommands = [];
	      if (index === 0) {
	        updateCommands.push({
	          type: 'update',
	          index: 0,
	          instruction: instruction
	        });
	        if (isClosed) {
	          updateCommands.push({
	            type: 'update',
	            index: segment.length - 2,
	            instruction: instruction
	          });
	        }
	      } else {
	        updateCommands.push({
	          type: 'update',
	          index: index,
	          instruction: instruction
	        });
	      }
	      this._executeUpdateCommands(segment, updateCommands);
	      return this.instructionNodeMap.get(node.instruction);
	    }
	    /**
	     * 路径升级
	     *
	     * @note
	     *
	     * 直线先升级到二阶，再从二阶曲线升级到三阶曲线；
	     */
	  }, {
	    key: "upgrade",
	    value: function upgrade(node) {
	      var _this30 = this;
	      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
	      var highest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	      var instruction = node.instruction,
	        nodeCoord = node.node;
	      var _this$getNeighboringI2 = this.getNeighboringInstructions(node, true),
	        pre = _this$getNeighboringI2.pre,
	        next = _this$getNeighboringI2.next;
	      var directionNodeMap = {
	        pre: instruction[0] === InstructionType.START ? pre : node,
	        next: next
	      };
	      var targets = [];
	      if ((direction === 'both' || direction === 'pre') && directionNodeMap.pre) {
	        targets.push(['pre', directionNodeMap.pre]);
	      }
	      if ((direction === 'both' || direction === 'next') && directionNodeMap.next) {
	        targets.push(['next', directionNodeMap.next]);
	      }
	      var upgrade = function upgrade(node, direction) {
	        var instruction = node.instruction;
	        if (instruction[0] === InstructionType.BEZIER_CURVE) return;
	        var coord = _this30.getInstructionCoord(instruction);
	        instruction[0] = _defineProperty(_defineProperty({}, InstructionType.LINE, InstructionType.QUADRATIC_CURCE), InstructionType.QUADRATIC_CURCE, InstructionType.BEZIER_CURVE)[instruction[0]];
	        if (direction === 'pre') {
	          var _this30$getNeighborin = _this30.getNeighboringInstructions(node),
	            _pre = _this30$getNeighborin.pre;
	          var insertIndex = -2;
	          var insertCoord = {
	            x: (coord.x + _pre.node.x) / 2,
	            y: (coord.y + _pre.node.y) / 2
	          };
	          instruction.splice(insertIndex, 0, insertCoord.x, insertCoord.y);
	          _this30.replace(node, instruction);
	        }
	        if (direction === 'next') {
	          var _insertIndex = 1;
	          var _insertCoord = {
	            x: (coord.x + nodeCoord.x) / 2,
	            y: (coord.y + nodeCoord.y) / 2
	          };
	          instruction.splice(_insertIndex, 0, _insertCoord.x, _insertCoord.y);
	          _this30.replace(node, instruction);
	        }
	      };
	      targets.forEach(function (_ref14) {
	        var _ref15 = _slicedToArray(_ref14, 2),
	          direction = _ref15[0],
	          pathNode = _ref15[1];
	        upgrade(pathNode, direction);
	        if (highest) upgrade(pathNode, direction);
	      });
	    }
	    /**
	     * 路径降级
	     *
	     * @note
	     *
	     * 二阶贝塞尔曲线会降级为直线；三阶贝塞尔曲线会先降级为二阶贝塞尔曲线，再降级才会转化为直线。
	     */
	  }, {
	    key: "degrade",
	    value: function degrade(node) {
	      var _this31 = this;
	      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
	      var lowest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	      var _this$getNeighboringI3 = this.getNeighboringInstructions(node, true),
	        pre = _this$getNeighboringI3.pre,
	        next = _this$getNeighboringI3.next;
	      var directionNodeMap = {
	        pre: node.instruction[0] === InstructionType.START ? pre : node,
	        next: next
	      };
	      var targets = [];
	      if ((direction === 'both' || direction === 'pre') && directionNodeMap.pre) {
	        targets.push(['pre', directionNodeMap.pre]);
	      }
	      if ((direction === 'both' || direction === 'next') && directionNodeMap.next) {
	        targets.push(['next', directionNodeMap.next]);
	      }
	      targets.forEach(function (_ref16) {
	        var _ref17 = _slicedToArray(_ref16, 2),
	          direction = _ref17[0],
	          pathNode = _ref17[1];
	        var instruction = pathNode.instruction;
	        if (['M', 'L'].includes(instruction[0])) return;
	        if (lowest) {
	          instruction[0] = InstructionType.LINE;
	          instruction.splice(1, instruction.length - 3);
	        } else {
	          instruction[0] = _defineProperty(_defineProperty({}, InstructionType.QUADRATIC_CURCE, InstructionType.LINE), InstructionType.BEZIER_CURVE, InstructionType.QUADRATIC_CURCE)[instruction[0]];
	          instruction.splice({
	            pre: -4,
	            next: 1
	          }[direction], 2);
	        }
	        _this31.replace(pathNode, instruction);
	      });
	    }
	    /**
	     * 执行更新命令
	     * @param segment 路径片段
	     * @param queue 命令队列
	     */
	  }, {
	    key: "_executeUpdateCommands",
	    value: function _executeUpdateCommands(segment, queue) {
	      var _this32 = this;
	      var newInstructions = this.getInstructions(function (item) {
	        var instructions = item.map(function (node) {
	          return node.instruction;
	        });
	        if (item === segment) {
	          queue.sort(function (a, b) {
	            return b.index - a.index;
	          });
	          queue.forEach(function (_ref18) {
	            var type = _ref18.type,
	              index = _ref18.index,
	              instruction = _ref18.instruction;
	            // 如果需要修复指令
	            if (index === 0 && instruction[0] !== InstructionType.START) {
	              _this32._toStartInstruction(instruction);
	            }
	            if (index !== 0) _this32._repairInstruction(instruction);
	            // 添加指令
	            if (type === 'add') {
	              if (index === 0 && segment.length) {
	                instructions[0][0] = InstructionType.LINE;
	              }
	              instructions.splice(index, 0, instruction);
	            }
	            // 更新指令
	            if (type === 'update') {
	              var _instructions$index;
	              (_instructions$index = instructions[index]).splice.apply(_instructions$index, [0, instructions[index].length].concat(_toConsumableArray(instruction)));
	            }
	          });
	        }
	        return instructions;
	      });
	      this.setInstructions(newInstructions);
	    }
	    /**
	     * 路径片段拼接
	     */
	  }, {
	    key: "joinSegment",
	    value: function joinSegment(startNode, endNode) {
	      if (startNode === endNode || !this.isTerminalNode(startNode) || !this.isTerminalNode(endNode)) return {
	        action: 'none'
	      };
	      var startSegmentIndex = this.segments.indexOf(startNode.segment);
	      var endSegmentIndex = this.segments.indexOf(endNode.segment);
	      if (startSegmentIndex === endSegmentIndex) {
	        this.closeSegment(startNode.segment);
	        return {
	          action: 'close',
	          node: endNode
	        };
	      }
	      var segments = this.segments.map(function (segment, index) {
	        var instructions = segment.map(function (i) {
	          return i.instruction;
	        });
	        if (index === startSegmentIndex && startNode === segment[0]) {
	          instructions = reversePath(instructions);
	        }
	        if (index === endSegmentIndex && endNode === segment[segment.length - 1]) {
	          instructions = reversePath(instructions);
	        }
	        if (index === endSegmentIndex && instructions[0][0] === InstructionType.START) {
	          instructions[0][0] = InstructionType.LINE;
	        }
	        return instructions;
	      });
	      var startSegment = segments[startSegmentIndex];
	      var endSegment = segments[endSegmentIndex];
	      segments[startSegmentIndex] = startSegment.concat(endSegment);
	      segments.splice(endSegmentIndex, 1)[0];
	      this.setInstructions(segments.flat(1));
	      return {
	        action: 'join',
	        node: this.instructionNodeMap.get(endSegment[0])
	      };
	    }
	    /**
	     * 闭合路径片段
	     */
	  }, {
	    key: "closeSegment",
	    value: function closeSegment(segment) {
	      // 未闭合的路径做闭合处理
	      if (!this.isClosedSegment(segment)) {
	        var updateCommands = [];
	        var startNode = segment[0].node;
	        var endNode = segment[segment.length - 1].node;
	        // 需要考虑添加闭合重叠点
	        if (startNode.x !== endNode.x || startNode.y !== endNode.y) {
	          updateCommands.push({
	            type: 'add',
	            index: segment.length,
	            instruction: [InstructionType.LINE, startNode.x, startNode.y]
	          });
	        }
	        updateCommands.push({
	          type: 'add',
	          index: segment.length + updateCommands.length,
	          instruction: [InstructionType.CLOSE]
	        });
	        this._executeUpdateCommands(segment, updateCommands);
	      }
	      // 返回起始路径节点
	      return this.instructionNodeMap.get(segment[0].instruction);
	    }
	    /**
	     * 移除路径片段
	     */
	  }, {
	    key: "removeSegment",
	    value: function removeSegment(segment) {
	      var index = this.segments.indexOf(segment);
	      if (index === -1) return;
	      // 重新构建路径指令
	      var instructions = this.segments.reduce(function (list, item) {
	        if (item === segment) return list;
	        list.push.apply(list, _toConsumableArray(item.map(function (node) {
	          return node.instruction;
	        })));
	        return list;
	      }, []);
	      this.setInstructions(instructions);
	      return segment;
	    }
	    /**
	     * 添加路径片段
	     */
	  }, {
	    key: "addSegment",
	    value: function addSegment(source) {
	      var instructions = this.getInstructions();
	      var path = typeof source === 'string' ? new fabric.fabric.Path(source) : source;
	      var matrix = path.calcOwnMatrix();
	      var offset = fabric.fabric.util.transformPoint(path.pathOffset, matrix, true);
	      matrix[4] -= offset.x;
	      matrix[5] -= offset.y;
	      instructions.push.apply(instructions, _toConsumableArray(VizPath.transformInstructions(path.path, matrix)));
	      this.setInstructions(instructions);
	      return this.segments[this.segments.length - 1];
	    }
	    /**
	     * 反转路径片段
	     */
	  }, {
	    key: "reverseSegment",
	    value: function reverseSegment(segment) {
	      var index = this.segments.indexOf(segment);
	      if (index === -1) return;
	      // 重新构建路径指令
	      var instructions = this.segments.reduce(function (list, item) {
	        var _instructions = item.map(function (node) {
	          return node.instruction;
	        });
	        if (item === segment) _instructions = reversePath(_instructions);
	        list.push.apply(list, _toConsumableArray(_instructions));
	        return list;
	      }, []);
	      this.setInstructions(instructions);
	    }
	    /**
	     * 将路径片段拆分出来并生成独立路径
	     */
	  }, {
	    key: "splitSegment",
	    value: function splitSegment(segment) {
	      var _segment = this.removeSegment(segment);
	      if (!_segment) return null;
	      var _parsePathJSON2 = parsePathJSON(this.path),
	        layout = _parsePathJSON2.layout,
	        styles = _parsePathJSON2.styles;
	      var clonePath = new Path(this.getPathData(_segment), Object.assign(Object.assign({}, layout), styles));
	      clonePath.visualize();
	      return clonePath;
	    }
	    /**
	     * 释放所有节点的响应式
	     */
	  }, {
	    key: "_revokeDisusedRCoords",
	    value: function _revokeDisusedRCoords(oldSegments) {
	      var _this33 = this;
	      oldSegments.forEach(function (segment) {
	        segment.forEach(function (node) {
	          var _a, _b, _c, _e, _f;
	          if (!_this33.instructionNodeMap.has(node.instruction)) {
	            // @ts-ignore
	            node.path = null;
	            (_a = node.node) === null || _a === void 0 ? void 0 : _a.unobserve();
	            (_c = (_b = node.deformers) === null || _b === void 0 ? void 0 : _b.pre) === null || _c === void 0 ? void 0 : _c.unobserve();
	            (_f = (_e = node.deformers) === null || _e === void 0 ? void 0 : _e.next) === null || _f === void 0 ? void 0 : _f.unobserve();
	            delete node.node;
	            delete node.deformers;
	          }
	        });
	      });
	    }
	    /**
	     * 结束可视化
	     */
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      var oldSegments = this.segments;
	      this.path.vizpath = null;
	      this.segments = [];
	      this.instructionNodeMap = new WeakMap();
	      this._requestRepair = undefined;
	      this._revokeDisusedRCoords(oldSegments);
	    }
	  }], [{
	    key: "mapInstructionCoord",
	    value: function mapInstructionCoord(instructions, callback) {
	      return instructions.map(function (instruction) {
	        var _instruction = _toConsumableArray(instruction);
	        for (var i = 0; i < _instruction.length - 1; i += 2) {
	          var coord = callback(instruction[i + 1], instruction[i + 2], i, instruction);
	          _instruction[i + 1] = coord.x;
	          _instruction[i + 2] = coord.y;
	        }
	        return _instruction;
	      });
	    }
	    /**
	     * 将指令列表数据转为字符串形式的路径命令数据
	     *
	     * @param instructions 指令列表
	     * @param outputOptions 提取配置
	     */
	  }, {
	    key: "toPathData",
	    value: function toPathData(instructions) {
	      var outputOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var _outputOptions$precis = outputOptions.precision,
	        precision = _outputOptions$precis === void 0 ? 4 : _outputOptions$precis,
	        _outputOptions$matrix = outputOptions.matrix,
	        matrix = _outputOptions$matrix === void 0 ? [1, 0, 0, 1, 0, 0] : _outputOptions$matrix,
	        _outputOptions$withTr = outputOptions.withTransform,
	        withTransform = _outputOptions$withTr === void 0 ? false : _outputOptions$withTr,
	        _outputOptions$withTr2 = outputOptions.withTranslate,
	        withTranslate = _outputOptions$withTr2 === void 0 ? false : _outputOptions$withTr2;
	      var segment = VizPath.mapInstructionCoord(instructions, function (x, y) {
	        var point = new fabric.fabric.Point(x, y);
	        if (withTransform) {
	          point = fabric.fabric.util.transformPoint(point, matrix, !withTranslate);
	        }
	        return {
	          x: round(point.x, precision),
	          y: round(point.y, precision)
	        };
	      });
	      return fabric.fabric.util.joinPath(segment);
	    }
	    /**
	     * 将路径命令数据转为指令列表数据结构
	     */
	  }, {
	    key: "toInstructions",
	    value: function toInstructions(d) {
	      try {
	        var path = new fabric.fabric.Path(d);
	        var instructions = path.path;
	        return instructions;
	      } catch (_a) {
	        throw Error('(VizPath Error) The path data entered is not valid.');
	      }
	    }
	    /**
	     * 变换指令
	     * @param instructions 指令列表
	     * @param matrix 变换矩阵
	     */
	  }, {
	    key: "transformInstructions",
	    value: function transformInstructions(instructions, matrix) {
	      return VizPath.mapInstructionCoord(instructions, function (x, y) {
	        return fabric.fabric.util.transformPoint(new fabric.fabric.Point(x, y), matrix);
	      });
	    }
	    /**
	     * 通过svg文件链接加载并获取fabric路径对象，原文件中的基础形状也会一并转为路径对象
	     *
	     * @param url 文件链接
	     * @param options 加载SVG后整体对象配置
	     * @example
	     *
	     * const paths = loadFabricPathFromURL('http');
	     *
	     * paths.forEach(path => {
	     *   ...
	     *   vizPath.draw(path);
	     * })
	     */
	  }, {
	    key: "loadFabricPathFromURL",
	    value: (function () {
	      var _loadFabricPathFromURL = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(url) {
	        var options,
	          object,
	          pathGroup,
	          paths,
	          extract,
	          _args7 = arguments;
	        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
	          while (1) switch (_context8.prev = _context8.next) {
	            case 0:
	              options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
	              _context8.next = 3;
	              return loadSVGToPathFromURL(url);
	            case 3:
	              object = _context8.sent;
	              if (object) {
	                _context8.next = 6;
	                break;
	              }
	              return _context8.abrupt("return", []);
	            case 6:
	              pathGroup = new fabric.fabric.Group([object]);
	              if (options) pathGroup.set(Object.assign({}, options));
	              paths = [];
	              extract = function extract(group) {
	                var children = group.getObjects();
	                group.destroy();
	                children.forEach(function (child) {
	                  if (child.type === 'group') {
	                    extract(child);
	                  } else if (child.type === 'path') {
	                    paths.push(child);
	                  }
	                });
	              };
	              extract(pathGroup);
	              return _context8.abrupt("return", paths);
	            case 12:
	            case "end":
	              return _context8.stop();
	          }
	        }, _callee8);
	      }));
	      function loadFabricPathFromURL(_x6) {
	        return _loadFabricPathFromURL.apply(this, arguments);
	      }
	      return loadFabricPathFromURL;
	    }())
	  }]);
	}();
	var Path = /*#__PURE__*/function (_fabric$Path) {
	  function Path() {
	    var _this34;
	    _classCallCheck(this, Path);
	    _this34 = _callSuper(this, Path, arguments);
	    _this34.vizpath = null;
	    return _this34;
	  }
	  /**
	   * 将普通的fabric.Path对象转为可作为可视化的路径对象
	   */
	  _inherits(Path, _fabric$Path);
	  return _createClass(Path, [{
	    key: "visualize",
	    value:
	    /**
	     * 可视化路径对象
	     * @returns vizpath 可视化路径对象
	     */
	    function visualize() {
	      this.vizpath = new VizPath(this);
	      return this.vizpath;
	    }
	    /**
	     * 退出可视化
	     */
	  }, {
	    key: "exitVisualize",
	    value: function exitVisualize() {
	      var _a;
	      this.leaveEditting();
	      (_a = this.vizpath) === null || _a === void 0 ? void 0 : _a.destroy();
	    }
	    /**
	     * 从所在画布中寻找编辑器并进入编辑态
	     */
	  }, {
	    key: "enterEditting",
	    value: (function () {
	      var _enterEditting = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
	        var _a, editor;
	        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
	          while (1) switch (_context9.prev = _context9.next) {
	            case 0:
	              if (this.vizpath) {
	                _context9.next = 2;
	                break;
	              }
	              throw Error('(VizPath Error) Path object visualization is pending. Complete visualization before continuing.');
	            case 2:
	              editor = (_a = this.canvas) === null || _a === void 0 ? void 0 : _a[VizPathEditor.symbol];
	              if (!editor) {
	                _context9.next = 6;
	                break;
	              }
	              editor.enterEditing(this.vizpath);
	              return _context9.abrupt("return", editor);
	            case 6:
	              throw Error('(VizPath Error) The VizPath Editor has not been successfully mounted on this canvas!');
	            case 7:
	            case "end":
	              return _context9.stop();
	          }
	        }, _callee9, this);
	      }));
	      function enterEditting() {
	        return _enterEditting.apply(this, arguments);
	      }
	      return enterEditting;
	    }()
	    /**
	     * 退出编辑态
	     */
	    )
	  }, {
	    key: "leaveEditting",
	    value: function leaveEditting() {
	      var _a;
	      var editor = (_a = this.canvas) === null || _a === void 0 ? void 0 : _a[VizPathEditor.symbol];
	      if (editor) {
	        editor.leaveEditing();
	        return editor;
	      }
	    }
	  }], [{
	    key: "from",
	    value: function from(fabricPath) {
	      var path = fabricPath;
	      var proxyPath = new Path();
	      var proto = proxyPath.__proto__;
	      proxyPath.__proto__ = path.__proto__;
	      path.__proto__ = proto;
	      path.vizpath = null;
	      path.visualize();
	      return path;
	    }
	    /**
	     * 路径变换
	     */
	  }, {
	    key: "transform",
	    value: function transform(path, transformQueue) {
	      var instructions = new fabric.fabric.Path(path).path;
	      instructions.forEach(function (item, idx) {
	        var _item2 = _toArray(item),
	          coords = _item2.slice(1);
	        for (var i = 0; i < coords.length; i += 2) {
	          var _transform3 = _transform2({
	              x: instructions[idx][i + 1],
	              y: instructions[idx][i + 2]
	            }, transformQueue),
	            x = _transform3.x,
	            y = _transform3.y;
	          instructions[idx][i + 1] = x;
	          instructions[idx][i + 2] = y;
	        }
	      });
	      return instructions.flat(1).join(' ');
	    }
	  }]);
	}(fabric.fabric.Path);
	var VizPathModule = /*#__PURE__*/function () {
	  function VizPathModule() {
	    _classCallCheck(this, VizPathModule);
	    this.editor = null;
	    this.events = new VizPathEvent();
	    this.themes = new VizPathTheme({});
	  }
	  return _createClass(VizPathModule, [{
	    key: "name",
	    get: function get() {
	      return this.constructor.ID;
	    }
	  }, {
	    key: "__unload",
	    value: function () {
	      var _unload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(editor) {
	        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
	          while (1) switch (_context10.prev = _context10.next) {
	            case 0:
	              _context10.next = 2;
	              return Promise.resolve(this.unload(editor));
	            case 2:
	              this.editor = null;
	              this.events.clear();
	            case 4:
	            case "end":
	              return _context10.stop();
	          }
	        }, _callee10, this);
	      }));
	      function __unload(_x7) {
	        return _unload.apply(this, arguments);
	      }
	      return __unload;
	    }()
	  }, {
	    key: "__load",
	    value: function () {
	      var _load = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(editor) {
	        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
	          while (1) switch (_context11.prev = _context11.next) {
	            case 0:
	              this.editor = editor;
	              _context11.next = 3;
	              return Promise.resolve(this.load(editor));
	            case 3:
	            case "end":
	              return _context11.stop();
	          }
	        }, _callee11, this);
	      }));
	      function __load(_x8) {
	        return _load.apply(this, arguments);
	      }
	      return __load;
	    }()
	  }]);
	}();
	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0:
	      return func.call(thisArg);
	    case 1:
	      return func.call(thisArg, args[0]);
	    case 2:
	      return func.call(thisArg, args[0], args[1]);
	    case 3:
	      return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax$1 = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax$1(start === undefined ? func.length - 1 : start, 0);
	  return function () {
	    var args = arguments,
	      index = -1,
	      length = nativeMax$1(args.length - start, 0),
	      array = Array(length);
	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function () {
	    return value;
	  };
	}

	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !defineProperty ? identity : function (func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};
	var baseSetToString$1 = baseSetToString;

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 800,
	  HOT_SPAN = 16;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;

	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	    lastCalled = 0;
	  return function () {
	    var stamp = nativeNow(),
	      remaining = HOT_SPAN - (stamp - lastCalled);
	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}

	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString$1);

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	/**
	 * This function is like `assignValue` except that it doesn't assign
	 * `undefined` values.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignMergeValue(object, key, value) {
	  if (value !== undefined && !eq(object[key], value) || value === undefined && !(key in object)) {
	    baseAssignValue(object, key, value);
	  }
	}

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function (object, iteratee, keysFunc) {
	    var index = -1,
	      iterable = Object(object),
	      props = keysFunc(object),
	      length = props.length;
	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	/** `Object#toString` result references. */
	var objectTag$1 = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	  objectProto$2 = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag$1) {
	    return false;
	  }
	  var proto = getPrototype$1(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty$2.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
	}

	/**
	 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function safeGet(object, key) {
	  if (key === 'constructor' && typeof object[key] === 'function') {
	    return;
	  }
	  if (key == '__proto__') {
	    return;
	  }
	  return object[key];
	}

	/**
	 * Converts `value` to a plain object flattening inherited enumerable string
	 * keyed properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return copyObject(value, keysIn(value));
	}

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = safeGet(object, key),
	    srcValue = safeGet(source, key),
	    stacked = stack.get(srcValue);
	  if (stacked) {
	    assignMergeValue(object, key, stacked);
	    return;
	  }
	  var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;
	  var isCommon = newValue === undefined;
	  if (isCommon) {
	    var isArr = isArray(srcValue),
	      isBuff = !isArr && isBuffer(srcValue),
	      isTyped = !isArr && !isBuff && isTypedArray(srcValue);
	    newValue = srcValue;
	    if (isArr || isBuff || isTyped) {
	      if (isArray(objValue)) {
	        newValue = objValue;
	      } else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      } else if (isBuff) {
	        isCommon = false;
	        newValue = cloneBuffer(srcValue, true);
	      } else if (isTyped) {
	        isCommon = false;
	        newValue = cloneTypedArray(srcValue, true);
	      } else {
	        newValue = [];
	      }
	    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      newValue = objValue;
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      } else if (!isObject$1(objValue) || isFunction$1(objValue)) {
	        newValue = initCloneObject(srcValue);
	      }
	    } else {
	      isCommon = false;
	    }
	  }
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    stack.set(srcValue, newValue);
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	    stack['delete'](srcValue);
	  }
	  assignMergeValue(object, key, newValue);
	}

	/**
	 * The base implementation of `_.merge` without support for multiple sources.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  baseFor(source, function (srcValue, key) {
	    stack || (stack = new Stack());
	    if (isObject$1(srcValue)) {
	      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    } else {
	      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + '', object, source, stack) : undefined;
	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      assignMergeValue(object, key, newValue);
	    }
	  }, keysIn);
	}

	/**
	 * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
	 * objects into destination objects that are passed thru.
	 *
	 * @private
	 * @param {*} objValue The destination value.
	 * @param {*} srcValue The source value.
	 * @param {string} key The key of the property to merge.
	 * @param {Object} object The parent object of `objValue`.
	 * @param {Object} source The parent object of `srcValue`.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 * @returns {*} Returns the value to assign.
	 */
	function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
	  if (isObject$1(objValue) && isObject$1(srcValue)) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    stack.set(srcValue, objValue);
	    baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
	    stack['delete'](srcValue);
	  }
	  return objValue;
	}

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject$1(object)) {
	    return false;
	  }
	  var type = _typeof(index);
	  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function (object, sources) {
	    var index = -1,
	      length = sources.length,
	      customizer = length > 1 ? sources[length - 1] : undefined,
	      guard = length > 2 ? sources[2] : undefined;
	    customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	/**
	 * This method is like `_.merge` except that it accepts `customizer` which
	 * is invoked to produce the merged values of the destination and source
	 * properties. If `customizer` returns `undefined`, merging is handled by the
	 * method instead. The `customizer` is invoked with six arguments:
	 * (objValue, srcValue, key, object, source, stack).
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} sources The source objects.
	 * @param {Function} customizer The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function customizer(objValue, srcValue) {
	 *   if (_.isArray(objValue)) {
	 *     return objValue.concat(srcValue);
	 *   }
	 * }
	 *
	 * var object = { 'a': [1], 'b': [2] };
	 * var other = { 'a': [3], 'b': [4] };
	 *
	 * _.mergeWith(object, other, customizer);
	 * // => { 'a': [1, 3], 'b': [2, 4] }
	 */
	var mergeWith = createAssigner(function (object, source, srcIndex, customizer) {
	  baseMerge(object, source, srcIndex, customizer);
	});
	var mergeWith$1 = mergeWith;

	/**
	 * This method is like `_.defaults` except that it recursively assigns
	 * default properties.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.defaults
	 * @example
	 *
	 * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
	 * // => { 'a': { 'b': 2, 'c': 3 } }
	 */
	var defaultsDeep = baseRest(function (args) {
	  args.push(undefined, customDefaultsMerge);
	  return apply(mergeWith$1, undefined, args);
	});
	var EditorBackground = /*#__PURE__*/function (_VizPathModule) {
	  function EditorBackground() {
	    var _this35;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    _classCallCheck(this, EditorBackground);
	    _this35 = _callSuper(this, EditorBackground);
	    _this35.options = {
	      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAAXNSR0IArs4c6QAAAK9JREFUaEPtljEKw0AMBOUijWv//5mpg0MK11ssyjCGq4ws5FkNdwznOQ/OLHM5zFKaklkKZlACGJIAUGQUwFYBSGYrGZQAVPPWmCkAyRT+ACpmqrmQmKgFigxqZxwmCnShCEUGJQBvzYX4Ry1QO+MwUQYKRSgyqrmQmKgFigxqZxwmCnShCEUGJQBvzYX4Ry1QO+MwUQYKRSgyqrmQmKjFl8z5O88vvGfmPv/07vUBoQcRCbiL/70AAAAASUVORK5CYII=',
	      repeat: 'repeat',
	      noScaling: false
	    };
	    _this35.options = defaultsDeep(options, _this35.options);
	    return _this35;
	  }
	  // private _initAlignEvents(editor: Editor) {
	  //   const canvas = editor.canvas;
	  //   if (!canvas) return;
	  //   editor.on("canvas", "mouse:move", (e) => {
	  //     const { gridSize } = this.options;
	  //     const globalOffset = {
	  //       x: -(canvas.getWidth() % gridSize) / 2,
	  //       y: -(canvas.getHeight() % gridSize) / 2,
	  //     };
	  //     const pointOffset = {
	  //       x: (e.pointer.x - globalOffset.x) % gridSize,
	  //       y: (e.pointer.y - globalOffset.y) % gridSize,
	  //     };
	  //     const stickyValue = 2;
	  //     if (
	  //       (pointOffset.x < stickyValue ||
	  //       pointOffset.x > gridSize - stickyValue) &&
	  //       (pointOffset.y < stickyValue ||
	  //       pointOffset.y > gridSize - stickyValue)
	  //     ) {
	  //       console.log(pointOffset);
	  //     }
	  //   });
	  // }
	  _inherits(EditorBackground, _VizPathModule);
	  return _createClass(EditorBackground, [{
	    key: "unload",
	    value: function () {
	      var _unload2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(editor) {
	        var canvas;
	        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
	          while (1) switch (_context12.prev = _context12.next) {
	            case 0:
	              canvas = editor.canvas;
	              if (canvas) {
	                _context12.next = 3;
	                break;
	              }
	              return _context12.abrupt("return");
	            case 3:
	              canvas.backgroundColor = undefined;
	              canvas.requestRenderAll();
	            case 5:
	            case "end":
	              return _context12.stop();
	          }
	        }, _callee12);
	      }));
	      function unload(_x9) {
	        return _unload2.apply(this, arguments);
	      }
	      return unload;
	    }()
	  }, {
	    key: "load",
	    value: function () {
	      var _load2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(editor) {
	        var canvas, _this$options, imageURL, repeat, noScaling;
	        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
	          while (1) switch (_context13.prev = _context13.next) {
	            case 0:
	              canvas = editor.canvas;
	              if (canvas) {
	                _context13.next = 3;
	                break;
	              }
	              return _context13.abrupt("return");
	            case 3:
	              _this$options = this.options, imageURL = _this$options.image, repeat = _this$options.repeat, noScaling = _this$options.noScaling;
	              if (!imageURL) {
	                _context13.next = 7;
	                break;
	              }
	              _context13.next = 7;
	              return new Promise(function (resolve) {
	                var image = new Image();
	                image.onload = function () {
	                  var pattern = new fabric.fabric.Pattern({
	                    source: image,
	                    repeat: repeat
	                    // offsetX: -(canvas.getWidth() % gridSize) / 2,
	                    // offsetY: -(canvas.getHeight() % gridSize) / 2,
	                  });
	                  if (noScaling) {
	                    canvas.on('before:render', function () {
	                      pattern.patternTransform = fabric.fabric.util.invertTransform(canvas.viewportTransform);
	                    });
	                  }
	                  canvas.setBackgroundColor(pattern, function () {
	                    canvas.requestRenderAll();
	                    resolve();
	                  });
	                };
	                image.src = imageURL;
	              });
	            case 7:
	            case "end":
	              return _context13.stop();
	          }
	        }, _callee13, this);
	      }));
	      function load(_x10) {
	        return _load2.apply(this, arguments);
	      }
	      return load;
	    }()
	  }]);
	}(VizPathModule);
	EditorBackground.ID = 'editor-background';

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	    length = values == null ? 0 : values.length;
	  this.__data__ = new MapCache();
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	    length = array == null ? 0 : array.length;
	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG$3 = 1,
	  COMPARE_UNORDERED_FLAG$1 = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3,
	    arrLength = array.length,
	    othLength = other.length;
	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Check that cyclic values are equal.
	  var arrStacked = stack.get(array);
	  var othStacked = stack.get(other);
	  if (arrStacked && othStacked) {
	    return arrStacked == other && othStacked == array;
	  }
	  var index = -1,
	    result = true,
	    seen = bitmask & COMPARE_UNORDERED_FLAG$1 ? new SetCache() : undefined;
	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	      othValue = other[index];
	    if (customizer) {
	      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function (othValue, othIndex) {
	        if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	          return seen.push(othIndex);
	        }
	      })) {
	        result = false;
	        break;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	    result = Array(map.size);
	  map.forEach(function (value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	    result = Array(set.size);
	  set.forEach(function (value) {
	    result[++index] = value;
	  });
	  return result;
	}

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG$2 = 1,
	  COMPARE_UNORDERED_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	  dateTag = '[object Date]',
	  errorTag = '[object Error]',
	  mapTag = '[object Map]',
	  numberTag = '[object Number]',
	  regexpTag = '[object RegExp]',
	  setTag = '[object Set]',
	  stringTag = '[object String]',
	  symbolTag = '[object Symbol]';
	var arrayBufferTag = '[object ArrayBuffer]',
	  dataViewTag = '[object DataView]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
	  symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;
	    case arrayBufferTag:
	      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;
	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);
	    case errorTag:
	      return object.name == other.name && object.message == other.message;
	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == other + '';
	    case mapTag:
	      var convert = mapToArray;
	    case setTag:
	      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2;
	      convert || (convert = setToArray);
	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= COMPARE_UNORDERED_FLAG;

	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
	      stack['delete'](object);
	      return result;
	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG$1 = 1;

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1,
	    objProps = getAllKeys(object),
	    objLength = objProps.length,
	    othProps = getAllKeys(other),
	    othLength = othProps.length;
	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) {
	      return false;
	    }
	  }
	  // Check that cyclic values are equal.
	  var objStacked = stack.get(object);
	  var othStacked = stack.get(other);
	  if (objStacked && othStacked) {
	    return objStacked == other && othStacked == object;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);
	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	      othValue = other[key];
	    if (customizer) {
	      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	      othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	  arrayTag = '[object Array]',
	  objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	  var objIsArr = isArray(object),
	    othIsArr = isArray(other),
	    objTag = objIsArr ? arrayTag : getTag$1(object),
	    othTag = othIsArr ? arrayTag : getTag$1(other);
	  objTag = objTag == argsTag ? objectTag : objTag;
	  othTag = othTag == argsTag ? objectTag : othTag;
	  var objIsObj = objTag == objectTag,
	    othIsObj = othTag == objectTag,
	    isSameTag = objTag == othTag;
	  if (isSameTag && isBuffer(object)) {
	    if (!isBuffer(other)) {
	      return false;
	    }
	    objIsArr = true;
	    objIsObj = false;
	  }
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack());
	    return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	  }
	  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	      othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	        othUnwrapped = othIsWrapped ? other.value() : other;
	      stack || (stack = new Stack());
	      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack());
	  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	}

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Unordered comparison
	 *  2 - Partial comparison
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, bitmask, customizer, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	}

	/**
	 * Performs a deep comparison between two values to determine if they are
	 * equivalent.
	 *
	 * **Note:** This method supports comparing arrays, array buffers, booleans,
	 * date objects, error objects, maps, numbers, `Object` objects, regexes,
	 * sets, strings, symbols, and typed arrays. `Object` objects are compared
	 * by their own, not inherited, enumerable properties. Functions and DOM
	 * nodes are compared by strict equality, i.e. `===`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.isEqual(object, other);
	 * // => true
	 *
	 * object === other;
	 * // => false
	 */
	function isEqual(value, other) {
	  return baseIsEqual(value, other);
	}
	var COMBINATION_KEYS = ['alt', 'ctrl', 'shift', 'meta'];
	var EditorShortcut = /*#__PURE__*/function (_VizPathModule2) {
	  /**
	   * 快捷键模块初始化
	   * @param shortcuts 快捷键配置列表
	   * @param verbose 输出每次的按键信息，默认false
	   */
	  function EditorShortcut() {
	    var _this36;
	    var shortcuts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var verbose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    _classCallCheck(this, EditorShortcut);
	    _this36 = _callSuper(this, EditorShortcut);
	    _this36.verbose = false;
	    _this36.shortcuts = [];
	    _this36.shortcutOptions = shortcuts;
	    _this36.verbose = verbose;
	    return _this36;
	  }
	  _inherits(EditorShortcut, _VizPathModule2);
	  return _createClass(EditorShortcut, [{
	    key: "_verbose",
	    value: function _verbose(e, activeShortcut, callback) {
	      var _a, _b;
	      if (!this.verbose) callback();else {
	        var isLogActivateInfo = activeShortcut && activeShortcut !== ((_a = this.activeShortcut) === null || _a === void 0 ? void 0 : _a.shortcut);
	        var activateKeys = isLogActivateInfo ? [activeShortcut.combinationKeys, activeShortcut.key] : [COMBINATION_KEYS.filter(function (i) {
	          return e["".concat(i, "Key")];
	        }), (_b = {
	          Control: 'ctrl'
	        }[e.key]) !== null && _b !== void 0 ? _b : e.key];
	        var activateInfo = _toConsumableArray(new Set(activateKeys.flat(Infinity).map(function (i) {
	          return i.toUpperCase();
	        }).filter(Boolean))).join(' + ');
	        console.groupCollapsed("%cVizPath Shortcut Event: ".concat(e.type, " > ").concat(activateInfo.toUpperCase()), "color:".concat(isLogActivateInfo ? 'lightgreen' : 'gray'));
	        console.groupCollapsed('Keyboard Event');
	        console.log(e);
	        console.groupEnd();
	        if (this.activeShortcut && this.activeShortcut.shortcut !== activeShortcut) {
	          console.groupCollapsed('Deactivate Shortcut');
	          console.log(this.activeShortcut.shortcut);
	          console.groupEnd();
	        }
	        if (isLogActivateInfo) {
	          console.groupCollapsed('Activate Shortcut');
	          console.log(activeShortcut);
	          console.groupEnd();
	        }
	        console.groupCollapsed('Other Logs');
	        callback();
	        console.groupEnd();
	        console.groupEnd();
	      }
	    }
	  }, {
	    key: "_tryGetValidShortcut",
	    value: function _tryGetValidShortcut(shortcut) {
	      if (!shortcut.onActivate && !shortcut.onDeactivate) return;
	      if (!shortcut.key && !shortcut.combinationKeys) return;
	      var _shortcut = {
	        onActivate: shortcut.onActivate,
	        onDeactivate: shortcut.onDeactivate
	      };
	      _shortcut.key = shortcut.key;
	      if (!shortcut.combinationKeys) _shortcut.combinationKeys = [];else _shortcut.combinationKeys = _toConsumableArray(shortcut.combinationKeys);
	      _shortcut.key;
	      _shortcut.combinationKeys.sort();
	      return _shortcut;
	    }
	  }, {
	    key: "_handlePageDeactivate",
	    value: function _handlePageDeactivate(e) {
	      var _a, _b;
	      if (this.activeShortcut) {
	        (_b = (_a = this.activeShortcut.shortcut).onDeactivate) === null || _b === void 0 ? void 0 : _b.call(_a, e, this.activeShortcut.returnValue);
	        this.activeShortcut = undefined;
	      }
	    }
	  }, {
	    key: "_checkIfEventSame",
	    value: function _checkIfEventSame(newEvent, oldEvent) {
	      if (newEvent.type !== oldEvent.type) return false;
	      if (newEvent.key !== oldEvent.key) return false;
	      return COMBINATION_KEYS.every(function (key) {
	        return newEvent[key] === oldEvent[key];
	      });
	    }
	  }, {
	    key: "_handleShortcutKey",
	    value: function _handleShortcutKey(e) {
	      var _this37 = this;
	      if (this._preEvent && this._checkIfEventSame(e, this._preEvent)) return;
	      var activateKeys = this.shortcuts.filter(function (shortcut) {
	        var _a;
	        var key = shortcut.key,
	          _shortcut$combination = shortcut.combinationKeys,
	          combinationKeys = _shortcut$combination === void 0 ? [] : _shortcut$combination;
	        var activateKey = !key || key.toUpperCase() === ((_a = e.key) !== null && _a !== void 0 ? _a : '').toUpperCase() || "KEY".concat(key.toUpperCase()) === e.code.toUpperCase();
	        if (
	        // 按下键的情况
	        e.type === 'keydown' &&
	        // 匹配快捷键
	        activateKey &&
	        // 匹配全部组合键
	        combinationKeys.every(function (combinationPrefix) {
	          return e["".concat(combinationPrefix, "Key")];
	        })) {
	          return true;
	        }
	        if (
	        // 松开键的情况
	        e.type === 'keyup' &&
	        // 匹配空快捷键
	        !key &&
	        // 匹配全部组合键
	        combinationKeys.every(function (combinationPrefix) {
	          return e["".concat(combinationPrefix, "Key")];
	        })) {
	          return true;
	        }
	        return false;
	      });
	      activateKeys.sort(function (a, b) {
	        var _a, _b, _c, _d;
	        if (a.key && !b.key) return -1;
	        return ((_b = (_a = b.combinationKeys) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) - ((_d = (_c = a.combinationKeys) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0);
	      });
	      var shortcut = activateKeys[0];
	      this._verbose(e, shortcut, function () {
	        var _a, _b, _c, _d;
	        if (shortcut && ((_a = _this37.activeShortcut) === null || _a === void 0 ? void 0 : _a.shortcut) === activateKeys[0]) return;
	        if ((_b = _this37.activeShortcut) === null || _b === void 0 ? void 0 : _b.shortcut) {
	          var deactivateShortcut = _this37.activeShortcut;
	          (_d = (_c = deactivateShortcut.shortcut).onDeactivate) === null || _d === void 0 ? void 0 : _d.call(_c, e, _this37.activeShortcut.returnValue);
	        }
	        if (shortcut) {
	          _this37.activeShortcut = {
	            shortcut: shortcut,
	            returnValue: shortcut.onActivate(e)
	          };
	        } else {
	          _this37.activeShortcut = undefined;
	        }
	      });
	      this._preEvent = e;
	    }
	  }, {
	    key: "add",
	    value: function add(shortcut) {
	      var _shortcut = this._tryGetValidShortcut(shortcut);
	      if (!_shortcut) return;
	      var index = this.shortcuts.findIndex(function (item) {
	        isEqual(item.key, _shortcut.key) && isEqual(item.combinationKeys, _shortcut.combinationKeys);
	      });
	      if (index !== -1) {
	        this.shortcuts.splice(index, 1, _shortcut);
	      } else {
	        this.shortcuts.push(_shortcut);
	      }
	    }
	  }, {
	    key: "remove",
	    value: function remove(key) {
	      var combinationKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	      var index = this.shortcuts.findIndex(function (item) {
	        isEqual(item.key, [key].flat(1).sort()) && isEqual(item.combinationKeys, combinationKeys.sort());
	      });
	      if (index !== -1) {
	        this.shortcuts.splice(index, 1);
	      }
	    }
	  }, {
	    key: "unload",
	    value: function unload(editor) {
	      editor.events.global.off('keydown', this._handleShortcutKey.bind(this));
	      editor.events.global.off('keyup', this._handleShortcutKey.bind(this));
	      editor.events.global.off('blur', this._handlePageDeactivate.bind(this));
	      this.shortcuts.length = 0;
	      this.activeShortcut = undefined;
	      this._preEvent = undefined;
	    }
	  }, {
	    key: "load",
	    value: function load(editor) {
	      var _a;
	      this.shortcuts = ((_a = this.shortcutOptions) !== null && _a !== void 0 ? _a : []).map(this._tryGetValidShortcut.bind(this)).filter(Boolean);
	      editor.events.global.on('keydown', this._handleShortcutKey.bind(this));
	      editor.events.global.on('keyup', this._handleShortcutKey.bind(this));
	      editor.events.global.on('blur', this._handlePageDeactivate.bind(this));
	    }
	  }]);
	}(VizPathModule);
	EditorShortcut.ID = 'editor-shortcut';

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function now() {
	  return root$1.Date.now();
	};

	/** Error message constants. */
	var FUNC_ERROR_TEXT$1 = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	  nativeMin = Math.min;

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	    lastThis,
	    maxWait,
	    result,
	    timerId,
	    lastCallTime,
	    lastInvokeTime = 0,
	    leading = false,
	    maxing = false,
	    trailing = true;
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT$1);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject$1(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  function invokeFunc(time) {
	    var args = lastArgs,
	      thisArg = lastThis;
	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }
	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }
	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	      timeSinceLastInvoke = time - lastInvokeTime,
	      timeWaiting = wait - timeSinceLastCall;
	    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
	  }
	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	      timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
	  }
	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }
	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }
	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }
	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }
	  function debounced() {
	    var time = now(),
	      isInvoking = shouldInvoke(time);
	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;
	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        clearTimeout(timerId);
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide `options` to indicate whether `func`
	 * should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the throttled function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=true]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */
	function throttle(func, wait, options) {
	  var leading = true,
	    trailing = true;
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  if (isObject$1(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  return debounce(func, wait, {
	    'leading': leading,
	    'maxWait': wait,
	    'trailing': trailing
	  });
	}
	var DEFAUlT_OPTIONS$2 = {
	  interval: 60,
	  autoAdjustView: 'center'
	};
	var EditorResize = /*#__PURE__*/function (_VizPathModule3) {
	  function EditorResize() {
	    var _this38;
	    var parentNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    _classCallCheck(this, EditorResize);
	    _this38 = _callSuper(this, EditorResize);
	    _this38.events = new VizPathEvent();
	    _this38._parentNode = parentNode;
	    _this38._options = Object.assign(Object.assign({}, DEFAUlT_OPTIONS$2), options);
	    return _this38;
	  }
	  _inherits(EditorResize, _VizPathModule3);
	  return _createClass(EditorResize, [{
	    key: "unload",
	    value: function unload(editor) {
	      var _a;
	      (_a = this._observer) === null || _a === void 0 ? void 0 : _a.disconnect();
	      this._observer = undefined;
	      this._parentNode = null;
	    }
	  }, {
	    key: "resize",
	    value: function resize(canvas, width, height) {
	      var _a;
	      var oldWidth = canvas.getWidth();
	      var oldHeight = canvas.getHeight();
	      var viewportTransform = (_a = canvas.viewportTransform) !== null && _a !== void 0 ? _a : [1, 0, 0, 1, 0, 0];
	      var offset = {
	        leftTop: {
	          x: 0,
	          y: 0
	        },
	        center: {
	          x: width / 2,
	          y: height / 2
	        },
	        none: {
	          x: viewportTransform[4] + (width - oldWidth) / 2,
	          y: viewportTransform[5] + (height - oldHeight) / 2
	        }
	      }[this._options.autoAdjustView];
	      var newViewportTransfrom = [].concat(_toConsumableArray(viewportTransform.slice(0, 4)), [offset.x, offset.y]);
	      canvas.setViewportTransform(newViewportTransfrom);
	      canvas.setDimensions({
	        width: width,
	        height: height
	      });
	      this.events.fire('resize', canvas);
	    }
	    /**
	     * 流式布局尺寸变更监听
	     */
	  }, {
	    key: "load",
	    value: function load(editor) {
	      var _this39 = this;
	      var _a, _b;
	      var canvas = editor.canvas;
	      if (!canvas) return;
	      var parentNode = (_a = this._parentNode) !== null && _a !== void 0 ? _a : (_b = canvas.getElement().parentNode) === null || _b === void 0 ? void 0 : _b.parentNode;
	      if (!parentNode) return;
	      this._parentNode = parentNode;
	      // 如果不兼容，抛出警告但不报错
	      if (typeof window.ResizeObserver === 'undefined') {
	        console.warn('(VizPath Warning) The ResizeObserver API is incompatible with this browser version.');
	        return;
	      }
	      var interval = this._options.interval;
	      var observer = new ResizeObserver(throttle(function (entries) {
	        var target = entries[0].target;
	        if (!target) return;
	        var newWidth = target.clientWidth,
	          newHeight = target.clientHeight;
	        var oldWidth = canvas.getWidth();
	        var oldHeight = canvas.getHeight();
	        if (newWidth === oldWidth && newHeight === oldHeight) return;
	        _this39.resize(canvas, newWidth, newHeight);
	      }, interval, {
	        leading: true,
	        trailing: true
	      }));
	      observer.observe(this._parentNode);
	      this._observer = observer;
	      this.resize(canvas, parentNode.clientWidth, parentNode.clientHeight);
	    }
	  }]);
	}(VizPathModule);
	EditorResize.ID = 'editor-resize';

	/** 默认内容区配置 */
	var DEFAUlT_OPTIONS$1 = {
	  movable: true,
	  spaceHoverCursor: 'move',
	  moveCursor: 'move',
	  spaceLeftClickMove: true,
	  rightClickMove: true
	};
	var EditorMoveModule = /*#__PURE__*/function (_VizPathModule4) {
	  function EditorMoveModule() {
	    var _this40;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    _classCallCheck(this, EditorMoveModule);
	    _this40 = _callSuper(this, EditorMoveModule);
	    _this40.events = new VizPathEvent();
	    /**
	     * 当前光标
	     */
	    _this40._currentCursor = 'default';
	    /**
	     * 记录可操作元素，用于移动结束后重新赋于可操作
	     */
	    _this40._cacheSelectableObjects = [];
	    /**
	     * 记录原选中元素
	     */
	    _this40._cacheActiveObjects = [];
	    /**
	     * 改变画布光标
	     */
	    _this40.changeCanvasCursor = function (canvas, type) {
	      var outerType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : type;
	      canvas.defaultCursor = type;
	      // 这里设置外层画布的光标样式，必须和defaultCursor一起设置不然会相互冲突
	      canvas.setCursor(outerType);
	      _this40._currentCursor = type;
	    };
	    _this40._options = Object.assign(Object.assign({}, DEFAUlT_OPTIONS$1), options);
	    return _this40;
	  }
	  /** 偏移画布 */
	  _inherits(EditorMoveModule, _VizPathModule4);
	  return _createClass(EditorMoveModule, [{
	    key: "move",
	    value: function move(canvas, offset) {
	      canvas.absolutePan({
	        x: -offset.x,
	        y: -offset.y
	      });
	      this.events.fire('move', canvas);
	    }
	    /**
	     * 允许更改是否可以拖拽能力
	     */
	  }, {
	    key: "setMovable",
	    value: function setMovable(allow) {
	      this._options.movable = allow;
	    }
	    /**
	     * 回到画布中心
	     */
	  }, {
	    key: "backToCenter",
	    value: function backToCenter() {
	      var editor = this.editor;
	      if (!editor) return;
	      var canvas = editor.canvas;
	      if (!canvas) return;
	      this.move(canvas, {
	        x: 0,
	        y: 0
	      });
	    }
	    /**
	     * 移动监听
	     */
	  }, {
	    key: "initMoveListener",
	    value: function initMoveListener(editor) {
	      var _this41 = this;
	      var canvas = editor === null || editor === void 0 ? void 0 : editor.canvas;
	      if (!canvas) return;
	      // 是否按下空格
	      var space = false;
	      // 起始移动坐标
	      var moveInitDistance;
	      // 如果允许右键移动
	      if (this._options.rightClickMove) {
	        canvas.fireRightClick = true;
	        canvas.stopContextMenu = true;
	      }
	      // 移动相关监听方法
	      var moveHandlers = {
	        prepare: function prepare(event) {
	          var _this41$_options = _this41._options,
	            movable = _this41$_options.movable,
	            spaceHoverCursor = _this41$_options.spaceHoverCursor,
	            moveCursor = _this41$_options.moveCursor,
	            spaceLeftClickMove = _this41$_options.spaceLeftClickMove;
	          if (!movable) return;
	          if (space) {
	            event.preventDefault();
	            return;
	          }
	          space = spaceLeftClickMove && event.code === 'Space';
	          if (!space) return;else {
	            _this41._cacheActiveObjects = canvas.getActiveObjects();
	            canvas.skipTargetFind = true;
	            canvas.discardActiveObject();
	          }
	          if (_this41._currentCursor !== moveCursor) _this41.changeCanvasCursor(canvas, spaceHoverCursor);
	          event.preventDefault();
	        },
	        start: function start(event) {
	          var _a;
	          var _this41$_options2 = _this41._options,
	            movable = _this41$_options2.movable,
	            moveCursor = _this41$_options2.moveCursor;
	          if (!movable) return;
	          var leftClick = space && event.e.buttons === 1,
	            rightClick = _this41._options.rightClickMove && event.e.buttons === 2;
	          if (leftClick || rightClick) {
	            var _ref19 = (_a = canvas.viewportTransform) !== null && _a !== void 0 ? _a : [1, 0, 0, 1, 0, 0],
	              _ref20 = _slicedToArray(_ref19, 6),
	              offsetX = _ref20[4],
	              offsetY = _ref20[5];
	            var dragCursor = moveCursor;
	            // 开始移动起取消当前画布聚焦元素并将所以元素设为不可操作
	            canvas.forEachObject(function (object) {
	              if (object.selectable) _this41._cacheSelectableObjects.push(object);
	              object.set({
	                selectable: false,
	                hoverCursor: dragCursor
	              });
	            });
	            moveInitDistance = {
	              x: event.e.x - offsetX,
	              y: event.e.y - offsetY
	            };
	            _this41.changeCanvasCursor(canvas, dragCursor);
	            // 拖拽开始先禁止画布多元素框选
	            canvas.selection = false;
	          }
	        },
	        moving: function moving(event) {
	          if (moveInitDistance === undefined) return;
	          var newOffset = {
	            x: event.e.x - moveInitDistance.x,
	            y: event.e.y - moveInitDistance.y
	          };
	          _this41.move(canvas, newOffset);
	        },
	        finish: function finish(event) {
	          var _a;
	          // 如果是键盘松开且松开的是空格，取消space按下状态，否则维持原状态
	          var keyup = event.type === 'keyup';
	          if (keyup && event.code === 'Space') space = false;
	          var spaceHoverCursor = _this41._options.spaceHoverCursor;
	          if (moveInitDistance) canvas.requestRenderAll();
	          if (!space) {
	            canvas.skipTargetFind = false;
	            // 重置元素悬浮光标
	            canvas.forEachObject(function (object) {
	              var selectable = object.selectable || _this41._cacheSelectableObjects.includes(object);
	              object.set({
	                selectable: selectable,
	                hoverCursor: selectable ? 'move' : 'default'
	              });
	            });
	            _this41._cacheSelectableObjects = [];
	            if (_this41._cacheActiveObjects.length) {
	              editor.focus.apply(editor, _toConsumableArray(_this41._cacheActiveObjects));
	              _this41._cacheActiveObjects = [];
	            }
	          }
	          moveInitDistance = undefined;
	          var isHover = ((_a = canvas._hoveredTarget) === null || _a === void 0 ? void 0 : _a.selectable) === true;
	          var newCursor = space ? spaceHoverCursor : 'default';
	          _this41.changeCanvasCursor(canvas, newCursor, isHover ? 'move' : newCursor);
	          // 拖拽结束重置画布多元素框选
	          canvas.selection = true;
	        }
	      };
	      editor.events.global.on('keydown', moveHandlers.prepare);
	      editor.events.global.on('keyup', moveHandlers.finish);
	      editor.events.canvas.on('mouse:down', moveHandlers.start);
	      editor.events.canvas.on('mouse:move', moveHandlers.moving);
	      editor.events.canvas.on('mouse:up', moveHandlers.finish);
	    }
	  }, {
	    key: "unload",
	    value: function unload(editor) {}
	  }, {
	    key: "load",
	    value: function load(editor) {
	      this.initMoveListener(editor);
	    }
	  }]);
	}(VizPathModule);
	EditorMoveModule.ID = 'editor-move';
	var DEFAUlT_OPTIONS = {
	  zoomable: true,
	  zoomCenter: 'mouse',
	  zoomLimit: [0.5, 5]
	};
	var EditorZoom = /*#__PURE__*/function (_VizPathModule5) {
	  function EditorZoom() {
	    var _this42;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    _classCallCheck(this, EditorZoom);
	    _this42 = _callSuper(this, EditorZoom);
	    _this42.events = new VizPathEvent();
	    _this42._options = Object.assign(Object.assign({}, DEFAUlT_OPTIONS), options);
	    return _this42;
	  }
	  /**
	   * 允许更改是否可以缩放能力
	   */
	  _inherits(EditorZoom, _VizPathModule5);
	  return _createClass(EditorZoom, [{
	    key: "setZoomable",
	    value: function setZoomable(allow) {
	      this._options.zoomable = allow;
	    }
	    /**
	     * 缩放函数
	     * @param newZoom 新的缩放值
	     * @param zoomCenter 缩放中心点
	     */
	  }, {
	    key: "zoom",
	    value: function zoom(canvas, newZoom, zoomCenter) {
	      var width = canvas.getWidth();
	      var height = canvas.getHeight();
	      canvas.zoomToPoint(zoomCenter ? new fabric.fabric.Point(zoomCenter.x, zoomCenter.y) : new fabric.fabric.Point(width / 2, height / 2), newZoom);
	      this.events.fire('zoom', canvas);
	    }
	  }, {
	    key: "initZoomListener",
	    value: function initZoomListener(editor) {
	      var _this43 = this;
	      var canvas = editor.canvas;
	      if (!canvas) return;
	      var handler = function handler(event) {
	        var _a;
	        var _this43$_options = _this43._options,
	          zoomable = _this43$_options.zoomable,
	          zoomCenter = _this43$_options.zoomCenter;
	        if (!zoomable) return;
	        event.e.preventDefault();
	        var _ref21 = (_a = canvas.viewportTransform) !== null && _a !== void 0 ? _a : [1, 0, 0, 1, 0, 0],
	          _ref22 = _slicedToArray(_ref21, 1),
	          zoom = _ref22[0];
	        var zoomLimit = _this43._options.zoomLimit;
	        var _event$e = event.e,
	          offsetX = _event$e.offsetX,
	          offsetY = _event$e.offsetY,
	          deltaY = _event$e.deltaY;
	        var dZoom = Math.pow(0.999, deltaY / 2);
	        var newZoom = Math.min(Math.max(zoom * dZoom, zoomLimit[0]), zoomLimit[1]);
	        var canvasCenter = canvas.getCenter();
	        _this43.zoom(canvas, newZoom, {
	          canvas: {
	            x: canvasCenter.left,
	            y: canvasCenter.top
	          },
	          mouse: {
	            x: offsetX,
	            y: offsetY
	          }
	        }[zoomCenter]);
	      };
	      editor.events.canvas.on('mouse:wheel', handler);
	    }
	  }, {
	    key: "unload",
	    value: function unload(editor) {}
	  }, {
	    key: "load",
	    value: function load(editor) {
	      this.initZoomListener(editor);
	    }
	  }]);
	}(VizPathModule);
	EditorZoom.ID = 'editor-zoom';
	var EditorTheme = /*#__PURE__*/function (_VizPathModule6) {
	  function EditorTheme(editorConfigurator, initialShareState) {
	    var _this44;
	    _classCallCheck(this, EditorTheme);
	    _this44 = _callSuper(this, EditorTheme);
	    _this44.events = new VizPathEvent();
	    /**
	     * 主题配置器
	     */
	    _this44._configurators = new WeakMap();
	    /**
	     * 暂存配置器
	     */
	    _this44._stashConfigurators = [];
	    /**
	     * 临时共享状态的getter观察者
	     */
	    _this44._tempStateGetterObservers = new Set([]);
	    /**
	     * 渲染依赖
	     */
	    _this44._rerenderDependencies = new Map([]);
	    _this44.shareState = initialShareState;
	    _this44._stashConfigurators.push({
	      module: null,
	      configurator: editorConfigurator
	    });
	    return _this44;
	  }
	  /**
	   * 观测回调
	   */
	  _inherits(EditorTheme, _VizPathModule6);
	  return _createClass(EditorTheme, [{
	    key: "_observeCallback",
	    value: function _observeCallback(callback) {
	      var _this45 = this;
	      var dependencyObserver = new Set([]);
	      this._tempStateGetterObservers.add(dependencyObserver);
	      callback();
	      this._tempStateGetterObservers["delete"](dependencyObserver);
	      // 如该元素后续的更新依赖状态变化
	      if (dependencyObserver.size) {
	        dependencyObserver.forEach(function (key) {
	          var _a;
	          var dependencies = (_a = _this45._rerenderDependencies.get(key)) !== null && _a !== void 0 ? _a : new Set([]);
	          dependencies.add(callback);
	          _this45._rerenderDependencies.set(key, dependencies);
	        });
	      }
	    }
	  }, {
	    key: "configure",
	    value: function configure(module, configurator) {
	      this._stashConfigurators.push({
	        module: module,
	        configurator: configurator
	      });
	    }
	  }, {
	    key: "unload",
	    value: function unload() {
	      this.shareState = {};
	      this.events.clear();
	      this._rerenderDependencies.forEach(function (set) {
	        set.clear();
	      });
	      this._rerenderDependencies.clear();
	    }
	  }, {
	    key: "load",
	    value: function load(editor) {
	      var _this46 = this;
	      var canvas = editor.canvas;
	      if (!canvas) return;
	      this.shareState = new Proxy(this.shareState, {
	        get: function get(target, p, receiver) {
	          if (p in target) {
	            _this46._tempStateGetterObservers.forEach(function (observer) {
	              return observer.add(p);
	            });
	          }
	          return Reflect.get(target, p, receiver);
	        },
	        // 每次共享状态修改都会触发UI更新
	        set: function set(target, p, newValue, receiver) {
	          var needRerender = target[p] !== newValue;
	          var result = Reflect.set(target, p, newValue, receiver);
	          if (needRerender) {
	            _this46.events.fire('state-update', editor, _this46.shareState);
	            // 重新渲染
	            var callbackSet = _this46._rerenderDependencies.get(p);
	            if (callbackSet) {
	              var callbacks = [];
	              callbackSet.forEach(function (callback) {
	                _this46._rerenderDependencies.forEach(function (set) {
	                  set["delete"](callback);
	                });
	                callbacks.push(callback);
	              });
	              callbacks.forEach(function (callback) {
	                _this46._observeCallback(callback);
	              });
	              callbacks.length = 0;
	            }
	            canvas.requestRenderAll();
	          }
	          return result;
	        }
	      });
	      this._stashConfigurators.forEach(function (_ref23) {
	        var module = _ref23.module,
	          configurator = _ref23.configurator;
	        _this46._configurators.set(module !== null && module !== void 0 ? module : editor, function (editor, shareState) {
	          var themes = configurator(editor, shareState);
	          var _loop2 = function _loop2() {
	            var theme = themes[themeKey];
	            themes[themeKey] = function (decorator) {
	              for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	                args[_key5 - 1] = arguments[_key5];
	              }
	              return theme.apply(void 0, [function (customObject, callback) {
	                decorator(customObject);
	                if (callback) {
	                  var _added = function _added() {
	                    _this46._observeCallback(callback);
	                    customObject.canvas.requestRenderAll();
	                  };
	                  var _removed = function _removed() {
	                    _this46._rerenderDependencies.forEach(function (set) {
	                      set["delete"](callback);
	                    });
	                  };
	                  customObject.on('added', _added);
	                  customObject.on('removed', _removed);
	                }
	                return customObject;
	              }].concat(args));
	            };
	          };
	          for (var themeKey in themes) {
	            _loop2();
	          }
	          return themes;
	        });
	      });
	      this._stashConfigurators.length = 0;
	      [editor].concat(_toConsumableArray(editor.modules)).forEach(function (module) {
	        var configurator = _this46._configurators.get(module);
	        if (!configurator) return;
	        module.themes.__themes = Object.assign(Object.assign({}, module.themes.__themes), configurator(editor, _this46.shareState));
	      });
	    }
	  }]);
	}(VizPathModule);
	EditorTheme.ID = 'editor-theme';

	function styleInject(css, ref) {
	  if (ref === void 0) ref = {};
	  var insertAt = ref.insertAt;
	  if (!css || typeof document === 'undefined') {
	    return;
	  }
	  var head = document.head || document.getElementsByTagName('head')[0];
	  var style = document.createElement('style');
	  style.type = 'text/css';
	  if (insertAt === 'top') {
	    if (head.firstChild) {
	      head.insertBefore(style, head.firstChild);
	    } else {
	      head.appendChild(style);
	    }
	  } else {
	    head.appendChild(style);
	  }
	  if (style.styleSheet) {
	    style.styleSheet.cssText = css;
	  } else {
	    style.appendChild(document.createTextNode(css));
	  }
	}

	var css_248z$3 = ".style_content-card__Iuktb{position:relative}.style_content-card__Iuktb header{align-items:center;background-color:#fff;display:flex;justify-content:space-between;padding:8px 0;position:sticky;top:92px}.style_content-card__Iuktb header .style_button__a1lPw{align-items:center;background-color:unset;border:unset;color:#666;cursor:pointer;display:flex;font-size:14px;opacity:0;transition:all .1s}.style_content-card__Iuktb header .style_button__a1lPw:hover{color:#0d1117}.style_content-card__Iuktb h5{color:#2d2d2d;font-size:16px;line-height:32px}.style_content-card__Iuktb main{border-radius:8px;overflow:hidden}.style_content-card__Iuktb:hover header .style_button__a1lPw{opacity:1}@media only screen and (max-width:650px){.style_content-card__Iuktb header .style_button__a1lPw{display:none}}";
	var styles$3 = {"content-card":"style_content-card__Iuktb","button":"style_button__a1lPw","contentCard":"style_content-card__Iuktb"};
	styleInject(css_248z$3);

	/******************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
	/* global Reflect, Promise, SuppressedError, Symbol */

	function __rest(s, e) {
	  var t = {};
	  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
	  }
	  return t;
	}
	typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
	  var e = new Error(message);
	  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
	};

	const Icon = (_a) => {
	    var { className, name, size = 48, color = 'currentColor' } = _a, rest = __rest(_a, ["className", "name", "size", "color"]);
	    return (React.createElement("svg", Object.assign({}, rest, { className: classnames('icon', className), "aria-hidden": "true", fontSize: size, color: color }),
	        React.createElement("use", { xlinkHref: `#icon-${name}` })));
	};
	var Icon$1 = React.memo(Icon);

	const ContentCard = ({ className, title, children, onSelect }) => {
	    return (React.createElement("div", { className: classnames(styles$3.contentCard, className) },
	        React.createElement("header", null,
	            React.createElement("h5", null, title),
	            onSelect && (React.createElement("button", { className: styles$3.button, onClick: onSelect },
	                "Display",
	                React.createElement(Icon$1, { name: "go", size: 20 })))),
	        React.createElement("main", null, children)));
	};

	/* eslint-disable no-bitwise */

	const decodeCache = {};
	function getDecodeCache(exclude) {
	  let cache = decodeCache[exclude];
	  if (cache) {
	    return cache;
	  }
	  cache = decodeCache[exclude] = [];
	  for (let i = 0; i < 128; i++) {
	    const ch = String.fromCharCode(i);
	    cache.push(ch);
	  }
	  for (let i = 0; i < exclude.length; i++) {
	    const ch = exclude.charCodeAt(i);
	    cache[ch] = '%' + ('0' + ch.toString(16).toUpperCase()).slice(-2);
	  }
	  return cache;
	}

	// Decode percent-encoded string.
	//
	function decode$1(string, exclude) {
	  if (typeof exclude !== 'string') {
	    exclude = decode$1.defaultChars;
	  }
	  const cache = getDecodeCache(exclude);
	  return string.replace(/(%[a-f0-9]{2})+/gi, function (seq) {
	    let result = '';
	    for (let i = 0, l = seq.length; i < l; i += 3) {
	      const b1 = parseInt(seq.slice(i + 1, i + 3), 16);
	      if (b1 < 0x80) {
	        result += cache[b1];
	        continue;
	      }
	      if ((b1 & 0xE0) === 0xC0 && i + 3 < l) {
	        // 110xxxxx 10xxxxxx
	        const b2 = parseInt(seq.slice(i + 4, i + 6), 16);
	        if ((b2 & 0xC0) === 0x80) {
	          const chr = b1 << 6 & 0x7C0 | b2 & 0x3F;
	          if (chr < 0x80) {
	            result += '\ufffd\ufffd';
	          } else {
	            result += String.fromCharCode(chr);
	          }
	          i += 3;
	          continue;
	        }
	      }
	      if ((b1 & 0xF0) === 0xE0 && i + 6 < l) {
	        // 1110xxxx 10xxxxxx 10xxxxxx
	        const b2 = parseInt(seq.slice(i + 4, i + 6), 16);
	        const b3 = parseInt(seq.slice(i + 7, i + 9), 16);
	        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80) {
	          const chr = b1 << 12 & 0xF000 | b2 << 6 & 0xFC0 | b3 & 0x3F;
	          if (chr < 0x800 || chr >= 0xD800 && chr <= 0xDFFF) {
	            result += '\ufffd\ufffd\ufffd';
	          } else {
	            result += String.fromCharCode(chr);
	          }
	          i += 6;
	          continue;
	        }
	      }
	      if ((b1 & 0xF8) === 0xF0 && i + 9 < l) {
	        // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx
	        const b2 = parseInt(seq.slice(i + 4, i + 6), 16);
	        const b3 = parseInt(seq.slice(i + 7, i + 9), 16);
	        const b4 = parseInt(seq.slice(i + 10, i + 12), 16);
	        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80 && (b4 & 0xC0) === 0x80) {
	          let chr = b1 << 18 & 0x1C0000 | b2 << 12 & 0x3F000 | b3 << 6 & 0xFC0 | b4 & 0x3F;
	          if (chr < 0x10000 || chr > 0x10FFFF) {
	            result += '\ufffd\ufffd\ufffd\ufffd';
	          } else {
	            chr -= 0x10000;
	            result += String.fromCharCode(0xD800 + (chr >> 10), 0xDC00 + (chr & 0x3FF));
	          }
	          i += 9;
	          continue;
	        }
	      }
	      result += '\ufffd';
	    }
	    return result;
	  });
	}
	decode$1.defaultChars = ';/?:@&=+$,#';
	decode$1.componentChars = '';

	const encodeCache = {};

	// Create a lookup array where anything but characters in `chars` string
	// and alphanumeric chars is percent-encoded.
	//
	function getEncodeCache(exclude) {
	  let cache = encodeCache[exclude];
	  if (cache) {
	    return cache;
	  }
	  cache = encodeCache[exclude] = [];
	  for (let i = 0; i < 128; i++) {
	    const ch = String.fromCharCode(i);
	    if (/^[0-9a-z]$/i.test(ch)) {
	      // always allow unencoded alphanumeric characters
	      cache.push(ch);
	    } else {
	      cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
	    }
	  }
	  for (let i = 0; i < exclude.length; i++) {
	    cache[exclude.charCodeAt(i)] = exclude[i];
	  }
	  return cache;
	}

	// Encode unsafe characters with percent-encoding, skipping already
	// encoded sequences.
	//
	//  - string       - string to encode
	//  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
	//  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
	//
	function encode$1(string, exclude, keepEscaped) {
	  if (typeof exclude !== 'string') {
	    // encode(string, keepEscaped)
	    keepEscaped = exclude;
	    exclude = encode$1.defaultChars;
	  }
	  if (typeof keepEscaped === 'undefined') {
	    keepEscaped = true;
	  }
	  const cache = getEncodeCache(exclude);
	  let result = '';
	  for (let i = 0, l = string.length; i < l; i++) {
	    const code = string.charCodeAt(i);
	    if (keepEscaped && code === 0x25 /* % */ && i + 2 < l) {
	      if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
	        result += string.slice(i, i + 3);
	        i += 2;
	        continue;
	      }
	    }
	    if (code < 128) {
	      result += cache[code];
	      continue;
	    }
	    if (code >= 0xD800 && code <= 0xDFFF) {
	      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
	        const nextCode = string.charCodeAt(i + 1);
	        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
	          result += encodeURIComponent(string[i] + string[i + 1]);
	          i++;
	          continue;
	        }
	      }
	      result += '%EF%BF%BD';
	      continue;
	    }
	    result += encodeURIComponent(string[i]);
	  }
	  return result;
	}
	encode$1.defaultChars = ";/?:@&=+$,-_.!~*'()#";
	encode$1.componentChars = "-_.!~*'()";

	function format(url) {
	  let result = '';
	  result += url.protocol || '';
	  result += url.slashes ? '//' : '';
	  result += url.auth ? url.auth + '@' : '';
	  if (url.hostname && url.hostname.indexOf(':') !== -1) {
	    // ipv6 address
	    result += '[' + url.hostname + ']';
	  } else {
	    result += url.hostname || '';
	  }
	  result += url.port ? ':' + url.port : '';
	  result += url.pathname || '';
	  result += url.search || '';
	  result += url.hash || '';
	  return result;
	}

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	//
	// Changes from joyent/node:
	//
	// 1. No leading slash in paths,
	//    e.g. in `url.parse('http://foo?bar')` pathname is ``, not `/`
	//
	// 2. Backslashes are not replaced with slashes,
	//    so `http:\\example.org\` is treated like a relative path
	//
	// 3. Trailing colon is treated like a part of the path,
	//    i.e. in `http://example.org:foo` pathname is `:foo`
	//
	// 4. Nothing is URL-encoded in the resulting object,
	//    (in joyent/node some chars in auth and paths are encoded)
	//
	// 5. `url.parse()` does not have `parseQueryString` argument
	//
	// 6. Removed extraneous result properties: `host`, `path`, `query`, etc.,
	//    which can be constructed using other parts of the url.
	//

	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.pathname = null;
	}

	// Reference: RFC 3986, RFC 1808, RFC 2396

	// define these here so at least they only have to be
	// compiled once on the first module load.
	const protocolPattern = /^([a-z0-9.+-]+:)/i;
	const portPattern = /:[0-9]*$/;

	// Special case for a simple path URL
	/* eslint-disable-next-line no-useless-escape */
	const simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;

	// RFC 2396: characters reserved for delimiting URLs.
	// We actually just auto-escape these.
	const delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'];

	// RFC 2396: characters not allowed for various reasons.
	const unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims);

	// Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	const autoEscape = ['\''].concat(unwise);
	// Characters that are never ever allowed in a hostname.
	// Note that any invalid chars are also handled, but these
	// are the ones that are *expected* to be seen, so we fast-path
	// them.
	const nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape);
	const hostEndingChars = ['/', '?', '#'];
	const hostnameMaxLen = 255;
	const hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
	const hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
	// protocols that can allow "unsafe" and "unwise" chars.
	// protocols that never have a hostname.
	const hostlessProtocol = {
	  javascript: true,
	  'javascript:': true
	};
	// protocols that always contain a // bit.
	const slashedProtocol = {
	  http: true,
	  https: true,
	  ftp: true,
	  gopher: true,
	  file: true,
	  'http:': true,
	  'https:': true,
	  'ftp:': true,
	  'gopher:': true,
	  'file:': true
	};
	function urlParse(url, slashesDenoteHost) {
	  if (url && url instanceof Url) return url;
	  const u = new Url();
	  u.parse(url, slashesDenoteHost);
	  return u;
	}
	Url.prototype.parse = function (url, slashesDenoteHost) {
	  let lowerProto, hec, slashes;
	  let rest = url;

	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();
	  if (!slashesDenoteHost && url.split('#').length === 1) {
	    // Try fast path regexp
	    const simplePath = simplePathPattern.exec(rest);
	    if (simplePath) {
	      this.pathname = simplePath[1];
	      if (simplePath[2]) {
	        this.search = simplePath[2];
	      }
	      return this;
	    }
	  }
	  let proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    lowerProto = proto.toLowerCase();
	    this.protocol = proto;
	    rest = rest.substr(proto.length);
	  }

	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  /* eslint-disable-next-line no-useless-escape */
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }
	  if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c

	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.

	    // find the first instance of any hostEndingChars
	    let hostEnd = -1;
	    for (let i = 0; i < hostEndingChars.length; i++) {
	      hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
	        hostEnd = hec;
	      }
	    }

	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    let auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }

	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = auth;
	    }

	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (let i = 0; i < nonHostChars.length; i++) {
	      hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
	        hostEnd = hec;
	      }
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1) {
	      hostEnd = rest.length;
	    }
	    if (rest[hostEnd - 1] === ':') {
	      hostEnd--;
	    }
	    const host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);

	    // pull out port.
	    this.parseHost(host);

	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';

	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    const ipv6Hostname = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']';

	    // validate a little.
	    if (!ipv6Hostname) {
	      const hostparts = this.hostname.split(/\./);
	      for (let i = 0, l = hostparts.length; i < l; i++) {
	        const part = hostparts[i];
	        if (!part) {
	          continue;
	        }
	        if (!part.match(hostnamePartPattern)) {
	          let newpart = '';
	          for (let j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            const validParts = hostparts.slice(0, i);
	            const notHost = hostparts.slice(i + 1);
	            const bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }
	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    }

	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	    }
	  }

	  // chop off from the tail first.
	  const hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  const qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    rest = rest.slice(0, qm);
	  }
	  if (rest) {
	    this.pathname = rest;
	  }
	  if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
	    this.pathname = '';
	  }
	  return this;
	};
	Url.prototype.parseHost = function (host) {
	  let port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) {
	    this.hostname = host;
	  }
	};

	var mdurl = /*#__PURE__*/Object.freeze({
		__proto__: null,
		decode: decode$1,
		encode: encode$1,
		format: format,
		parse: urlParse
	});

	var Any = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;

	var Cc = /[\0-\x1F\x7F-\x9F]/;

	var regex$1 = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;

	var P = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;

	var regex = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/;

	var Z = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;

	var ucmicro = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Any: Any,
		Cc: Cc,
		Cf: regex$1,
		P: P,
		S: regex,
		Z: Z
	});

	// Generated using scripts/write-decode-map.ts
	var htmlDecodeTree = new Uint16Array(
	// prettier-ignore
	"\u1d41<\xd5\u0131\u028a\u049d\u057b\u05d0\u0675\u06de\u07a2\u07d6\u080f\u0a4a\u0a91\u0da1\u0e6d\u0f09\u0f26\u10ca\u1228\u12e1\u1415\u149d\u14c3\u14df\u1525\0\0\0\0\0\0\u156b\u16cd\u198d\u1c12\u1ddd\u1f7e\u2060\u21b0\u228d\u23c0\u23fb\u2442\u2824\u2912\u2d08\u2e48\u2fce\u3016\u32ba\u3639\u37ac\u38fe\u3a28\u3a71\u3ae0\u3b2e\u0800EMabcfglmnoprstu\\bfms\x7f\x84\x8b\x90\x95\x98\xa6\xb3\xb9\xc8\xcflig\u803b\xc6\u40c6P\u803b&\u4026cute\u803b\xc1\u40c1reve;\u4102\u0100iyx}rc\u803b\xc2\u40c2;\u4410r;\uc000\ud835\udd04rave\u803b\xc0\u40c0pha;\u4391acr;\u4100d;\u6a53\u0100gp\x9d\xa1on;\u4104f;\uc000\ud835\udd38plyFunction;\u6061ing\u803b\xc5\u40c5\u0100cs\xbe\xc3r;\uc000\ud835\udc9cign;\u6254ilde\u803b\xc3\u40c3ml\u803b\xc4\u40c4\u0400aceforsu\xe5\xfb\xfe\u0117\u011c\u0122\u0127\u012a\u0100cr\xea\xf2kslash;\u6216\u0176\xf6\xf8;\u6ae7ed;\u6306y;\u4411\u0180crt\u0105\u010b\u0114ause;\u6235noullis;\u612ca;\u4392r;\uc000\ud835\udd05pf;\uc000\ud835\udd39eve;\u42d8c\xf2\u0113mpeq;\u624e\u0700HOacdefhilorsu\u014d\u0151\u0156\u0180\u019e\u01a2\u01b5\u01b7\u01ba\u01dc\u0215\u0273\u0278\u027ecy;\u4427PY\u803b\xa9\u40a9\u0180cpy\u015d\u0162\u017aute;\u4106\u0100;i\u0167\u0168\u62d2talDifferentialD;\u6145leys;\u612d\u0200aeio\u0189\u018e\u0194\u0198ron;\u410cdil\u803b\xc7\u40c7rc;\u4108nint;\u6230ot;\u410a\u0100dn\u01a7\u01adilla;\u40b8terDot;\u40b7\xf2\u017fi;\u43a7rcle\u0200DMPT\u01c7\u01cb\u01d1\u01d6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01e2\u01f8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020foubleQuote;\u601duote;\u6019\u0200lnpu\u021e\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6a74\u0180git\u022f\u0236\u023aruent;\u6261nt;\u622fourIntegral;\u622e\u0100fr\u024c\u024e;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6a2fcr;\uc000\ud835\udc9ep\u0100;C\u0284\u0285\u62d3ap;\u624d\u0580DJSZacefios\u02a0\u02ac\u02b0\u02b4\u02b8\u02cb\u02d7\u02e1\u02e6\u0333\u048d\u0100;o\u0179\u02a5trahd;\u6911cy;\u4402cy;\u4405cy;\u440f\u0180grs\u02bf\u02c4\u02c7ger;\u6021r;\u61a1hv;\u6ae4\u0100ay\u02d0\u02d5ron;\u410e;\u4414l\u0100;t\u02dd\u02de\u6207a;\u4394r;\uc000\ud835\udd07\u0100af\u02eb\u0327\u0100cm\u02f0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031ccute;\u40b4o\u0174\u030b\u030d;\u42d9bleAcute;\u42ddrave;\u4060ilde;\u42dcond;\u62c4ferentialD;\u6146\u0470\u033d\0\0\0\u0342\u0354\0\u0405f;\uc000\ud835\udd3b\u0180;DE\u0348\u0349\u034d\u40a8ot;\u60dcqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03cf\u03e2\u03f8ontourIntegra\xec\u0239o\u0274\u0379\0\0\u037b\xbb\u0349nArrow;\u61d3\u0100eo\u0387\u03a4ft\u0180ART\u0390\u0396\u03a1rrow;\u61d0ightArrow;\u61d4e\xe5\u02cang\u0100LR\u03ab\u03c4eft\u0100AR\u03b3\u03b9rrow;\u67f8ightArrow;\u67faightArrow;\u67f9ight\u0100AT\u03d8\u03derrow;\u61d2ee;\u62a8p\u0241\u03e9\0\0\u03efrrow;\u61d1ownArrow;\u61d5erticalBar;\u6225n\u0300ABLRTa\u0412\u042a\u0430\u045e\u047f\u037crrow\u0180;BU\u041d\u041e\u0422\u6193ar;\u6913pArrow;\u61f5reve;\u4311eft\u02d2\u043a\0\u0446\0\u0450ightVector;\u6950eeVector;\u695eector\u0100;B\u0459\u045a\u61bdar;\u6956ight\u01d4\u0467\0\u0471eeVector;\u695fector\u0100;B\u047a\u047b\u61c1ar;\u6957ee\u0100;A\u0486\u0487\u62a4rrow;\u61a7\u0100ct\u0492\u0497r;\uc000\ud835\udc9frok;\u4110\u0800NTacdfglmopqstux\u04bd\u04c0\u04c4\u04cb\u04de\u04e2\u04e7\u04ee\u04f5\u0521\u052f\u0536\u0552\u055d\u0560\u0565G;\u414aH\u803b\xd0\u40d0cute\u803b\xc9\u40c9\u0180aiy\u04d2\u04d7\u04dcron;\u411arc\u803b\xca\u40ca;\u442dot;\u4116r;\uc000\ud835\udd08rave\u803b\xc8\u40c8ement;\u6208\u0100ap\u04fa\u04fecr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65fberySmallSquare;\u65ab\u0100gp\u0526\u052aon;\u4118f;\uc000\ud835\udd3csilon;\u4395u\u0100ai\u053c\u0549l\u0100;T\u0542\u0543\u6a75ilde;\u6242librium;\u61cc\u0100ci\u0557\u055ar;\u6130m;\u6a73a;\u4397ml\u803b\xcb\u40cb\u0100ip\u056a\u056fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058d\u05b2\u05ccy;\u4424r;\uc000\ud835\udd09lled\u0253\u0597\0\0\u05a3mallSquare;\u65fcerySmallSquare;\u65aa\u0370\u05ba\0\u05bf\0\0\u05c4f;\uc000\ud835\udd3dAll;\u6200riertrf;\u6131c\xf2\u05cb\u0600JTabcdfgorst\u05e8\u05ec\u05ef\u05fa\u0600\u0612\u0616\u061b\u061d\u0623\u066c\u0672cy;\u4403\u803b>\u403emma\u0100;d\u05f7\u05f8\u4393;\u43dcreve;\u411e\u0180eiy\u0607\u060c\u0610dil;\u4122rc;\u411c;\u4413ot;\u4120r;\uc000\ud835\udd0a;\u62d9pf;\uc000\ud835\udd3eeater\u0300EFGLST\u0635\u0644\u064e\u0656\u065b\u0666qual\u0100;L\u063e\u063f\u6265ess;\u62dbullEqual;\u6267reater;\u6aa2ess;\u6277lantEqual;\u6a7eilde;\u6273cr;\uc000\ud835\udca2;\u626b\u0400Aacfiosu\u0685\u068b\u0696\u069b\u069e\u06aa\u06be\u06caRDcy;\u442a\u0100ct\u0690\u0694ek;\u42c7;\u405eirc;\u4124r;\u610clbertSpace;\u610b\u01f0\u06af\0\u06b2f;\u610dizontalLine;\u6500\u0100ct\u06c3\u06c5\xf2\u06a9rok;\u4126mp\u0144\u06d0\u06d8ownHum\xf0\u012fqual;\u624f\u0700EJOacdfgmnostu\u06fa\u06fe\u0703\u0707\u070e\u071a\u071e\u0721\u0728\u0744\u0778\u078b\u078f\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803b\xcd\u40cd\u0100iy\u0713\u0718rc\u803b\xce\u40ce;\u4418ot;\u4130r;\u6111rave\u803b\xcc\u40cc\u0180;ap\u0720\u072f\u073f\u0100cg\u0734\u0737r;\u412ainaryI;\u6148lie\xf3\u03dd\u01f4\u0749\0\u0762\u0100;e\u074d\u074e\u622c\u0100gr\u0753\u0758ral;\u622bsection;\u62c2isible\u0100CT\u076c\u0772omma;\u6063imes;\u6062\u0180gpt\u077f\u0783\u0788on;\u412ef;\uc000\ud835\udd40a;\u4399cr;\u6110ilde;\u4128\u01eb\u079a\0\u079ecy;\u4406l\u803b\xcf\u40cf\u0280cfosu\u07ac\u07b7\u07bc\u07c2\u07d0\u0100iy\u07b1\u07b5rc;\u4134;\u4419r;\uc000\ud835\udd0dpf;\uc000\ud835\udd41\u01e3\u07c7\0\u07ccr;\uc000\ud835\udca5rcy;\u4408kcy;\u4404\u0380HJacfos\u07e4\u07e8\u07ec\u07f1\u07fd\u0802\u0808cy;\u4425cy;\u440cppa;\u439a\u0100ey\u07f6\u07fbdil;\u4136;\u441ar;\uc000\ud835\udd0epf;\uc000\ud835\udd42cr;\uc000\ud835\udca6\u0580JTaceflmost\u0825\u0829\u082c\u0850\u0863\u09b3\u09b8\u09c7\u09cd\u0a37\u0a47cy;\u4409\u803b<\u403c\u0280cmnpr\u0837\u083c\u0841\u0844\u084dute;\u4139bda;\u439bg;\u67ealacetrf;\u6112r;\u619e\u0180aey\u0857\u085c\u0861ron;\u413ddil;\u413b;\u441b\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087e\u08a9\u08b1\u08e0\u08e6\u08fc\u092f\u095b\u0390\u096a\u0100nr\u0883\u088fgleBracket;\u67e8row\u0180;BR\u0899\u089a\u089e\u6190ar;\u61e4ightArrow;\u61c6eiling;\u6308o\u01f5\u08b7\0\u08c3bleBracket;\u67e6n\u01d4\u08c8\0\u08d2eeVector;\u6961ector\u0100;B\u08db\u08dc\u61c3ar;\u6959loor;\u630aight\u0100AV\u08ef\u08f5rrow;\u6194ector;\u694e\u0100er\u0901\u0917e\u0180;AV\u0909\u090a\u0910\u62a3rrow;\u61a4ector;\u695aiangle\u0180;BE\u0924\u0925\u0929\u62b2ar;\u69cfqual;\u62b4p\u0180DTV\u0937\u0942\u094cownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61bfar;\u6958ector\u0100;B\u0965\u0966\u61bcar;\u6952ight\xe1\u039cs\u0300EFGLST\u097e\u098b\u0995\u099d\u09a2\u09adqualGreater;\u62daullEqual;\u6266reater;\u6276ess;\u6aa1lantEqual;\u6a7dilde;\u6272r;\uc000\ud835\udd0f\u0100;e\u09bd\u09be\u62d8ftarrow;\u61daidot;\u413f\u0180npw\u09d4\u0a16\u0a1bg\u0200LRlr\u09de\u09f7\u0a02\u0a10eft\u0100AR\u09e6\u09ecrrow;\u67f5ightArrow;\u67f7ightArrow;\u67f6eft\u0100ar\u03b3\u0a0aight\xe1\u03bfight\xe1\u03caf;\uc000\ud835\udd43er\u0100LR\u0a22\u0a2ceftArrow;\u6199ightArrow;\u6198\u0180cht\u0a3e\u0a40\u0a42\xf2\u084c;\u61b0rok;\u4141;\u626a\u0400acefiosu\u0a5a\u0a5d\u0a60\u0a77\u0a7c\u0a85\u0a8b\u0a8ep;\u6905y;\u441c\u0100dl\u0a65\u0a6fiumSpace;\u605flintrf;\u6133r;\uc000\ud835\udd10nusPlus;\u6213pf;\uc000\ud835\udd44c\xf2\u0a76;\u439c\u0480Jacefostu\u0aa3\u0aa7\u0aad\u0ac0\u0b14\u0b19\u0d91\u0d97\u0d9ecy;\u440acute;\u4143\u0180aey\u0ab4\u0ab9\u0aberon;\u4147dil;\u4145;\u441d\u0180gsw\u0ac7\u0af0\u0b0eative\u0180MTV\u0ad3\u0adf\u0ae8ediumSpace;\u600bhi\u0100cn\u0ae6\u0ad8\xeb\u0ad9eryThi\xee\u0ad9ted\u0100GL\u0af8\u0b06reaterGreate\xf2\u0673essLes\xf3\u0a48Line;\u400ar;\uc000\ud835\udd11\u0200Bnpt\u0b22\u0b28\u0b37\u0b3areak;\u6060BreakingSpace;\u40a0f;\u6115\u0680;CDEGHLNPRSTV\u0b55\u0b56\u0b6a\u0b7c\u0ba1\u0beb\u0c04\u0c5e\u0c84\u0ca6\u0cd8\u0d61\u0d85\u6aec\u0100ou\u0b5b\u0b64ngruent;\u6262pCap;\u626doubleVerticalBar;\u6226\u0180lqx\u0b83\u0b8a\u0b9bement;\u6209ual\u0100;T\u0b92\u0b93\u6260ilde;\uc000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0bb6\u0bb7\u0bbd\u0bc9\u0bd3\u0bd8\u0be5\u626fqual;\u6271ullEqual;\uc000\u2267\u0338reater;\uc000\u226b\u0338ess;\u6279lantEqual;\uc000\u2a7e\u0338ilde;\u6275ump\u0144\u0bf2\u0bfdownHump;\uc000\u224e\u0338qual;\uc000\u224f\u0338e\u0100fs\u0c0a\u0c27tTriangle\u0180;BE\u0c1a\u0c1b\u0c21\u62eaar;\uc000\u29cf\u0338qual;\u62ecs\u0300;EGLST\u0c35\u0c36\u0c3c\u0c44\u0c4b\u0c58\u626equal;\u6270reater;\u6278ess;\uc000\u226a\u0338lantEqual;\uc000\u2a7d\u0338ilde;\u6274ested\u0100GL\u0c68\u0c79reaterGreater;\uc000\u2aa2\u0338essLess;\uc000\u2aa1\u0338recedes\u0180;ES\u0c92\u0c93\u0c9b\u6280qual;\uc000\u2aaf\u0338lantEqual;\u62e0\u0100ei\u0cab\u0cb9verseElement;\u620cghtTriangle\u0180;BE\u0ccb\u0ccc\u0cd2\u62ebar;\uc000\u29d0\u0338qual;\u62ed\u0100qu\u0cdd\u0d0cuareSu\u0100bp\u0ce8\u0cf9set\u0100;E\u0cf0\u0cf3\uc000\u228f\u0338qual;\u62e2erset\u0100;E\u0d03\u0d06\uc000\u2290\u0338qual;\u62e3\u0180bcp\u0d13\u0d24\u0d4eset\u0100;E\u0d1b\u0d1e\uc000\u2282\u20d2qual;\u6288ceeds\u0200;EST\u0d32\u0d33\u0d3b\u0d46\u6281qual;\uc000\u2ab0\u0338lantEqual;\u62e1ilde;\uc000\u227f\u0338erset\u0100;E\u0d58\u0d5b\uc000\u2283\u20d2qual;\u6289ilde\u0200;EFT\u0d6e\u0d6f\u0d75\u0d7f\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uc000\ud835\udca9ilde\u803b\xd1\u40d1;\u439d\u0700Eacdfgmoprstuv\u0dbd\u0dc2\u0dc9\u0dd5\u0ddb\u0de0\u0de7\u0dfc\u0e02\u0e20\u0e22\u0e32\u0e3f\u0e44lig;\u4152cute\u803b\xd3\u40d3\u0100iy\u0dce\u0dd3rc\u803b\xd4\u40d4;\u441eblac;\u4150r;\uc000\ud835\udd12rave\u803b\xd2\u40d2\u0180aei\u0dee\u0df2\u0df6cr;\u414cga;\u43a9cron;\u439fpf;\uc000\ud835\udd46enCurly\u0100DQ\u0e0e\u0e1aoubleQuote;\u601cuote;\u6018;\u6a54\u0100cl\u0e27\u0e2cr;\uc000\ud835\udcaaash\u803b\xd8\u40d8i\u016c\u0e37\u0e3cde\u803b\xd5\u40d5es;\u6a37ml\u803b\xd6\u40d6er\u0100BP\u0e4b\u0e60\u0100ar\u0e50\u0e53r;\u603eac\u0100ek\u0e5a\u0e5c;\u63deet;\u63b4arenthesis;\u63dc\u0480acfhilors\u0e7f\u0e87\u0e8a\u0e8f\u0e92\u0e94\u0e9d\u0eb0\u0efcrtialD;\u6202y;\u441fr;\uc000\ud835\udd13i;\u43a6;\u43a0usMinus;\u40b1\u0100ip\u0ea2\u0eadncareplan\xe5\u069df;\u6119\u0200;eio\u0eb9\u0eba\u0ee0\u0ee4\u6abbcedes\u0200;EST\u0ec8\u0ec9\u0ecf\u0eda\u627aqual;\u6aaflantEqual;\u627cilde;\u627eme;\u6033\u0100dp\u0ee9\u0eeeuct;\u620fortion\u0100;a\u0225\u0ef9l;\u621d\u0100ci\u0f01\u0f06r;\uc000\ud835\udcab;\u43a8\u0200Ufos\u0f11\u0f16\u0f1b\u0f1fOT\u803b\"\u4022r;\uc000\ud835\udd14pf;\u611acr;\uc000\ud835\udcac\u0600BEacefhiorsu\u0f3e\u0f43\u0f47\u0f60\u0f73\u0fa7\u0faa\u0fad\u1096\u10a9\u10b4\u10bearr;\u6910G\u803b\xae\u40ae\u0180cnr\u0f4e\u0f53\u0f56ute;\u4154g;\u67ebr\u0100;t\u0f5c\u0f5d\u61a0l;\u6916\u0180aey\u0f67\u0f6c\u0f71ron;\u4158dil;\u4156;\u4420\u0100;v\u0f78\u0f79\u611cerse\u0100EU\u0f82\u0f99\u0100lq\u0f87\u0f8eement;\u620builibrium;\u61cbpEquilibrium;\u696fr\xbb\u0f79o;\u43a1ght\u0400ACDFTUVa\u0fc1\u0feb\u0ff3\u1022\u1028\u105b\u1087\u03d8\u0100nr\u0fc6\u0fd2gleBracket;\u67e9row\u0180;BL\u0fdc\u0fdd\u0fe1\u6192ar;\u61e5eftArrow;\u61c4eiling;\u6309o\u01f5\u0ff9\0\u1005bleBracket;\u67e7n\u01d4\u100a\0\u1014eeVector;\u695dector\u0100;B\u101d\u101e\u61c2ar;\u6955loor;\u630b\u0100er\u102d\u1043e\u0180;AV\u1035\u1036\u103c\u62a2rrow;\u61a6ector;\u695biangle\u0180;BE\u1050\u1051\u1055\u62b3ar;\u69d0qual;\u62b5p\u0180DTV\u1063\u106e\u1078ownVector;\u694feeVector;\u695cector\u0100;B\u1082\u1083\u61bear;\u6954ector\u0100;B\u1091\u1092\u61c0ar;\u6953\u0100pu\u109b\u109ef;\u611dndImplies;\u6970ightarrow;\u61db\u0100ch\u10b9\u10bcr;\u611b;\u61b1leDelayed;\u69f4\u0680HOacfhimoqstu\u10e4\u10f1\u10f7\u10fd\u1119\u111e\u1151\u1156\u1161\u1167\u11b5\u11bb\u11bf\u0100Cc\u10e9\u10eeHcy;\u4429y;\u4428FTcy;\u442ccute;\u415a\u0280;aeiy\u1108\u1109\u110e\u1113\u1117\u6abcron;\u4160dil;\u415erc;\u415c;\u4421r;\uc000\ud835\udd16ort\u0200DLRU\u112a\u1134\u113e\u1149ownArrow\xbb\u041eeftArrow\xbb\u089aightArrow\xbb\u0fddpArrow;\u6191gma;\u43a3allCircle;\u6218pf;\uc000\ud835\udd4a\u0272\u116d\0\0\u1170t;\u621aare\u0200;ISU\u117b\u117c\u1189\u11af\u65a1ntersection;\u6293u\u0100bp\u118f\u119eset\u0100;E\u1197\u1198\u628fqual;\u6291erset\u0100;E\u11a8\u11a9\u6290qual;\u6292nion;\u6294cr;\uc000\ud835\udcaear;\u62c6\u0200bcmp\u11c8\u11db\u1209\u120b\u0100;s\u11cd\u11ce\u62d0et\u0100;E\u11cd\u11d5qual;\u6286\u0100ch\u11e0\u1205eeds\u0200;EST\u11ed\u11ee\u11f4\u11ff\u627bqual;\u6ab0lantEqual;\u627dilde;\u627fTh\xe1\u0f8c;\u6211\u0180;es\u1212\u1213\u1223\u62d1rset\u0100;E\u121c\u121d\u6283qual;\u6287et\xbb\u1213\u0580HRSacfhiors\u123e\u1244\u1249\u1255\u125e\u1271\u1276\u129f\u12c2\u12c8\u12d1ORN\u803b\xde\u40deADE;\u6122\u0100Hc\u124e\u1252cy;\u440by;\u4426\u0100bu\u125a\u125c;\u4009;\u43a4\u0180aey\u1265\u126a\u126fron;\u4164dil;\u4162;\u4422r;\uc000\ud835\udd17\u0100ei\u127b\u1289\u01f2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128e\u1298kSpace;\uc000\u205f\u200aSpace;\u6009lde\u0200;EFT\u12ab\u12ac\u12b2\u12bc\u623cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uc000\ud835\udd4bipleDot;\u60db\u0100ct\u12d6\u12dbr;\uc000\ud835\udcafrok;\u4166\u0ae1\u12f7\u130e\u131a\u1326\0\u132c\u1331\0\0\0\0\0\u1338\u133d\u1377\u1385\0\u13ff\u1404\u140a\u1410\u0100cr\u12fb\u1301ute\u803b\xda\u40dar\u0100;o\u1307\u1308\u619fcir;\u6949r\u01e3\u1313\0\u1316y;\u440eve;\u416c\u0100iy\u131e\u1323rc\u803b\xdb\u40db;\u4423blac;\u4170r;\uc000\ud835\udd18rave\u803b\xd9\u40d9acr;\u416a\u0100di\u1341\u1369er\u0100BP\u1348\u135d\u0100ar\u134d\u1350r;\u405fac\u0100ek\u1357\u1359;\u63dfet;\u63b5arenthesis;\u63ddon\u0100;P\u1370\u1371\u62c3lus;\u628e\u0100gp\u137b\u137fon;\u4172f;\uc000\ud835\udd4c\u0400ADETadps\u1395\u13ae\u13b8\u13c4\u03e8\u13d2\u13d7\u13f3rrow\u0180;BD\u1150\u13a0\u13a4ar;\u6912ownArrow;\u61c5ownArrow;\u6195quilibrium;\u696eee\u0100;A\u13cb\u13cc\u62a5rrow;\u61a5own\xe1\u03f3er\u0100LR\u13de\u13e8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13f9\u13fa\u43d2on;\u43a5ing;\u416ecr;\uc000\ud835\udcb0ilde;\u4168ml\u803b\xdc\u40dc\u0480Dbcdefosv\u1427\u142c\u1430\u1433\u143e\u1485\u148a\u1490\u1496ash;\u62abar;\u6aeby;\u4412ash\u0100;l\u143b\u143c\u62a9;\u6ae6\u0100er\u1443\u1445;\u62c1\u0180bty\u144c\u1450\u147aar;\u6016\u0100;i\u144f\u1455cal\u0200BLST\u1461\u1465\u146a\u1474ar;\u6223ine;\u407ceparator;\u6758ilde;\u6240ThinSpace;\u600ar;\uc000\ud835\udd19pf;\uc000\ud835\udd4dcr;\uc000\ud835\udcb1dash;\u62aa\u0280cefos\u14a7\u14ac\u14b1\u14b6\u14bcirc;\u4174dge;\u62c0r;\uc000\ud835\udd1apf;\uc000\ud835\udd4ecr;\uc000\ud835\udcb2\u0200fios\u14cb\u14d0\u14d2\u14d8r;\uc000\ud835\udd1b;\u439epf;\uc000\ud835\udd4fcr;\uc000\ud835\udcb3\u0480AIUacfosu\u14f1\u14f5\u14f9\u14fd\u1504\u150f\u1514\u151a\u1520cy;\u442fcy;\u4407cy;\u442ecute\u803b\xdd\u40dd\u0100iy\u1509\u150drc;\u4176;\u442br;\uc000\ud835\udd1cpf;\uc000\ud835\udd50cr;\uc000\ud835\udcb4ml;\u4178\u0400Hacdefos\u1535\u1539\u153f\u154b\u154f\u155d\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417d;\u4417ot;\u417b\u01f2\u1554\0\u155boWidt\xe8\u0ad9a;\u4396r;\u6128pf;\u6124cr;\uc000\ud835\udcb5\u0be1\u1583\u158a\u1590\0\u15b0\u15b6\u15bf\0\0\0\0\u15c6\u15db\u15eb\u165f\u166d\0\u1695\u169b\u16b2\u16b9\0\u16becute\u803b\xe1\u40e1reve;\u4103\u0300;Ediuy\u159c\u159d\u15a1\u15a3\u15a8\u15ad\u623e;\uc000\u223e\u0333;\u623frc\u803b\xe2\u40e2te\u80bb\xb4\u0306;\u4430lig\u803b\xe6\u40e6\u0100;r\xb2\u15ba;\uc000\ud835\udd1erave\u803b\xe0\u40e0\u0100ep\u15ca\u15d6\u0100fp\u15cf\u15d4sym;\u6135\xe8\u15d3ha;\u43b1\u0100ap\u15dfc\u0100cl\u15e4\u15e7r;\u4101g;\u6a3f\u0264\u15f0\0\0\u160a\u0280;adsv\u15fa\u15fb\u15ff\u1601\u1607\u6227nd;\u6a55;\u6a5clope;\u6a58;\u6a5a\u0380;elmrsz\u1618\u1619\u161b\u161e\u163f\u164f\u1659\u6220;\u69a4e\xbb\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163a\u163c\u163e;\u69a8;\u69a9;\u69aa;\u69ab;\u69ac;\u69ad;\u69ae;\u69aft\u0100;v\u1645\u1646\u621fb\u0100;d\u164c\u164d\u62be;\u699d\u0100pt\u1654\u1657h;\u6222\xbb\xb9arr;\u637c\u0100gp\u1663\u1667on;\u4105f;\uc000\ud835\udd52\u0380;Eaeiop\u12c1\u167b\u167d\u1682\u1684\u1687\u168a;\u6a70cir;\u6a6f;\u624ad;\u624bs;\u4027rox\u0100;e\u12c1\u1692\xf1\u1683ing\u803b\xe5\u40e5\u0180cty\u16a1\u16a6\u16a8r;\uc000\ud835\udcb6;\u402amp\u0100;e\u12c1\u16af\xf1\u0288ilde\u803b\xe3\u40e3ml\u803b\xe4\u40e4\u0100ci\u16c2\u16c8onin\xf4\u0272nt;\u6a11\u0800Nabcdefiklnoprsu\u16ed\u16f1\u1730\u173c\u1743\u1748\u1778\u177d\u17e0\u17e6\u1839\u1850\u170d\u193d\u1948\u1970ot;\u6aed\u0100cr\u16f6\u171ek\u0200ceps\u1700\u1705\u170d\u1713ong;\u624cpsilon;\u43f6rime;\u6035im\u0100;e\u171a\u171b\u623dq;\u62cd\u0176\u1722\u1726ee;\u62bded\u0100;g\u172c\u172d\u6305e\xbb\u172drk\u0100;t\u135c\u1737brk;\u63b6\u0100oy\u1701\u1741;\u4431quo;\u601e\u0280cmprt\u1753\u175b\u1761\u1764\u1768aus\u0100;e\u010a\u0109ptyv;\u69b0s\xe9\u170cno\xf5\u0113\u0180ahw\u176f\u1771\u1773;\u43b2;\u6136een;\u626cr;\uc000\ud835\udd1fg\u0380costuvw\u178d\u179d\u17b3\u17c1\u17d5\u17db\u17de\u0180aiu\u1794\u1796\u179a\xf0\u0760rc;\u65efp\xbb\u1371\u0180dpt\u17a4\u17a8\u17adot;\u6a00lus;\u6a01imes;\u6a02\u0271\u17b9\0\0\u17becup;\u6a06ar;\u6605riangle\u0100du\u17cd\u17d2own;\u65bdp;\u65b3plus;\u6a04e\xe5\u1444\xe5\u14adarow;\u690d\u0180ako\u17ed\u1826\u1835\u0100cn\u17f2\u1823k\u0180lst\u17fa\u05ab\u1802ozenge;\u69ebriangle\u0200;dlr\u1812\u1813\u1818\u181d\u65b4own;\u65beeft;\u65c2ight;\u65b8k;\u6423\u01b1\u182b\0\u1833\u01b2\u182f\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183e\u184d\u0100;q\u1843\u1846\uc000=\u20e5uiv;\uc000\u2261\u20e5t;\u6310\u0200ptwx\u1859\u185e\u1867\u186cf;\uc000\ud835\udd53\u0100;t\u13cb\u1863om\xbb\u13cctie;\u62c8\u0600DHUVbdhmptuv\u1885\u1896\u18aa\u18bb\u18d7\u18db\u18ec\u18ff\u1905\u190a\u1910\u1921\u0200LRlr\u188e\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18a1\u18a2\u18a4\u18a6\u18a8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18b3\u18b5\u18b7\u18b9;\u655d;\u655a;\u655c;\u6559\u0380;HLRhlr\u18ca\u18cb\u18cd\u18cf\u18d1\u18d3\u18d5\u6551;\u656c;\u6563;\u6560;\u656b;\u6562;\u655fox;\u69c9\u0200LRlr\u18e4\u18e6\u18e8\u18ea;\u6555;\u6552;\u6510;\u650c\u0280;DUdu\u06bd\u18f7\u18f9\u18fb\u18fd;\u6565;\u6568;\u652c;\u6534inus;\u629flus;\u629eimes;\u62a0\u0200LRlr\u1919\u191b\u191d\u191f;\u655b;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193b\u6502;\u656a;\u6561;\u655e;\u653c;\u6524;\u651c\u0100ev\u0123\u1942bar\u803b\xa6\u40a6\u0200ceio\u1951\u1956\u195a\u1960r;\uc000\ud835\udcb7mi;\u604fm\u0100;e\u171a\u171cl\u0180;bh\u1968\u1969\u196b\u405c;\u69c5sub;\u67c8\u016c\u1974\u197el\u0100;e\u1979\u197a\u6022t\xbb\u197ap\u0180;Ee\u012f\u1985\u1987;\u6aae\u0100;q\u06dc\u06db\u0ce1\u19a7\0\u19e8\u1a11\u1a15\u1a32\0\u1a37\u1a50\0\0\u1ab4\0\0\u1ac1\0\0\u1b21\u1b2e\u1b4d\u1b52\0\u1bfd\0\u1c0c\u0180cpr\u19ad\u19b2\u19ddute;\u4107\u0300;abcds\u19bf\u19c0\u19c4\u19ca\u19d5\u19d9\u6229nd;\u6a44rcup;\u6a49\u0100au\u19cf\u19d2p;\u6a4bp;\u6a47ot;\u6a40;\uc000\u2229\ufe00\u0100eo\u19e2\u19e5t;\u6041\xee\u0693\u0200aeiu\u19f0\u19fb\u1a01\u1a05\u01f0\u19f5\0\u19f8s;\u6a4don;\u410ddil\u803b\xe7\u40e7rc;\u4109ps\u0100;s\u1a0c\u1a0d\u6a4cm;\u6a50ot;\u410b\u0180dmn\u1a1b\u1a20\u1a26il\u80bb\xb8\u01adptyv;\u69b2t\u8100\xa2;e\u1a2d\u1a2e\u40a2r\xe4\u01b2r;\uc000\ud835\udd20\u0180cei\u1a3d\u1a40\u1a4dy;\u4447ck\u0100;m\u1a47\u1a48\u6713ark\xbb\u1a48;\u43c7r\u0380;Ecefms\u1a5f\u1a60\u1a62\u1a6b\u1aa4\u1aaa\u1aae\u65cb;\u69c3\u0180;el\u1a69\u1a6a\u1a6d\u42c6q;\u6257e\u0261\u1a74\0\0\u1a88rrow\u0100lr\u1a7c\u1a81eft;\u61baight;\u61bb\u0280RSacd\u1a92\u1a94\u1a96\u1a9a\u1a9f\xbb\u0f47;\u64c8st;\u629birc;\u629aash;\u629dnint;\u6a10id;\u6aefcir;\u69c2ubs\u0100;u\u1abb\u1abc\u6663it\xbb\u1abc\u02ec\u1ac7\u1ad4\u1afa\0\u1b0aon\u0100;e\u1acd\u1ace\u403a\u0100;q\xc7\xc6\u026d\u1ad9\0\0\u1ae2a\u0100;t\u1ade\u1adf\u402c;\u4040\u0180;fl\u1ae8\u1ae9\u1aeb\u6201\xee\u1160e\u0100mx\u1af1\u1af6ent\xbb\u1ae9e\xf3\u024d\u01e7\u1afe\0\u1b07\u0100;d\u12bb\u1b02ot;\u6a6dn\xf4\u0246\u0180fry\u1b10\u1b14\u1b17;\uc000\ud835\udd54o\xe4\u0254\u8100\xa9;s\u0155\u1b1dr;\u6117\u0100ao\u1b25\u1b29rr;\u61b5ss;\u6717\u0100cu\u1b32\u1b37r;\uc000\ud835\udcb8\u0100bp\u1b3c\u1b44\u0100;e\u1b41\u1b42\u6acf;\u6ad1\u0100;e\u1b49\u1b4a\u6ad0;\u6ad2dot;\u62ef\u0380delprvw\u1b60\u1b6c\u1b77\u1b82\u1bac\u1bd4\u1bf9arr\u0100lr\u1b68\u1b6a;\u6938;\u6935\u0270\u1b72\0\0\u1b75r;\u62dec;\u62dfarr\u0100;p\u1b7f\u1b80\u61b6;\u693d\u0300;bcdos\u1b8f\u1b90\u1b96\u1ba1\u1ba5\u1ba8\u622arcap;\u6a48\u0100au\u1b9b\u1b9ep;\u6a46p;\u6a4aot;\u628dr;\u6a45;\uc000\u222a\ufe00\u0200alrv\u1bb5\u1bbf\u1bde\u1be3rr\u0100;m\u1bbc\u1bbd\u61b7;\u693cy\u0180evw\u1bc7\u1bd4\u1bd8q\u0270\u1bce\0\0\u1bd2re\xe3\u1b73u\xe3\u1b75ee;\u62ceedge;\u62cfen\u803b\xa4\u40a4earrow\u0100lr\u1bee\u1bf3eft\xbb\u1b80ight\xbb\u1bbde\xe4\u1bdd\u0100ci\u1c01\u1c07onin\xf4\u01f7nt;\u6231lcty;\u632d\u0980AHabcdefhijlorstuwz\u1c38\u1c3b\u1c3f\u1c5d\u1c69\u1c75\u1c8a\u1c9e\u1cac\u1cb7\u1cfb\u1cff\u1d0d\u1d7b\u1d91\u1dab\u1dbb\u1dc6\u1dcdr\xf2\u0381ar;\u6965\u0200glrs\u1c48\u1c4d\u1c52\u1c54ger;\u6020eth;\u6138\xf2\u1133h\u0100;v\u1c5a\u1c5b\u6010\xbb\u090a\u016b\u1c61\u1c67arow;\u690fa\xe3\u0315\u0100ay\u1c6e\u1c73ron;\u410f;\u4434\u0180;ao\u0332\u1c7c\u1c84\u0100gr\u02bf\u1c81r;\u61catseq;\u6a77\u0180glm\u1c91\u1c94\u1c98\u803b\xb0\u40b0ta;\u43b4ptyv;\u69b1\u0100ir\u1ca3\u1ca8sht;\u697f;\uc000\ud835\udd21ar\u0100lr\u1cb3\u1cb5\xbb\u08dc\xbb\u101e\u0280aegsv\u1cc2\u0378\u1cd6\u1cdc\u1ce0m\u0180;os\u0326\u1cca\u1cd4nd\u0100;s\u0326\u1cd1uit;\u6666amma;\u43ddin;\u62f2\u0180;io\u1ce7\u1ce8\u1cf8\u40f7de\u8100\xf7;o\u1ce7\u1cf0ntimes;\u62c7n\xf8\u1cf7cy;\u4452c\u026f\u1d06\0\0\u1d0arn;\u631eop;\u630d\u0280lptuw\u1d18\u1d1d\u1d22\u1d49\u1d55lar;\u4024f;\uc000\ud835\udd55\u0280;emps\u030b\u1d2d\u1d37\u1d3d\u1d42q\u0100;d\u0352\u1d33ot;\u6251inus;\u6238lus;\u6214quare;\u62a1blebarwedg\xe5\xfan\u0180adh\u112e\u1d5d\u1d67ownarrow\xf3\u1c83arpoon\u0100lr\u1d72\u1d76ef\xf4\u1cb4igh\xf4\u1cb6\u0162\u1d7f\u1d85karo\xf7\u0f42\u026f\u1d8a\0\0\u1d8ern;\u631fop;\u630c\u0180cot\u1d98\u1da3\u1da6\u0100ry\u1d9d\u1da1;\uc000\ud835\udcb9;\u4455l;\u69f6rok;\u4111\u0100dr\u1db0\u1db4ot;\u62f1i\u0100;f\u1dba\u1816\u65bf\u0100ah\u1dc0\u1dc3r\xf2\u0429a\xf2\u0fa6angle;\u69a6\u0100ci\u1dd2\u1dd5y;\u445fgrarr;\u67ff\u0900Dacdefglmnopqrstux\u1e01\u1e09\u1e19\u1e38\u0578\u1e3c\u1e49\u1e61\u1e7e\u1ea5\u1eaf\u1ebd\u1ee1\u1f2a\u1f37\u1f44\u1f4e\u1f5a\u0100Do\u1e06\u1d34o\xf4\u1c89\u0100cs\u1e0e\u1e14ute\u803b\xe9\u40e9ter;\u6a6e\u0200aioy\u1e22\u1e27\u1e31\u1e36ron;\u411br\u0100;c\u1e2d\u1e2e\u6256\u803b\xea\u40ealon;\u6255;\u444dot;\u4117\u0100Dr\u1e41\u1e45ot;\u6252;\uc000\ud835\udd22\u0180;rs\u1e50\u1e51\u1e57\u6a9aave\u803b\xe8\u40e8\u0100;d\u1e5c\u1e5d\u6a96ot;\u6a98\u0200;ils\u1e6a\u1e6b\u1e72\u1e74\u6a99nters;\u63e7;\u6113\u0100;d\u1e79\u1e7a\u6a95ot;\u6a97\u0180aps\u1e85\u1e89\u1e97cr;\u4113ty\u0180;sv\u1e92\u1e93\u1e95\u6205et\xbb\u1e93p\u01001;\u1e9d\u1ea4\u0133\u1ea1\u1ea3;\u6004;\u6005\u6003\u0100gs\u1eaa\u1eac;\u414bp;\u6002\u0100gp\u1eb4\u1eb8on;\u4119f;\uc000\ud835\udd56\u0180als\u1ec4\u1ece\u1ed2r\u0100;s\u1eca\u1ecb\u62d5l;\u69e3us;\u6a71i\u0180;lv\u1eda\u1edb\u1edf\u43b5on\xbb\u1edb;\u43f5\u0200csuv\u1eea\u1ef3\u1f0b\u1f23\u0100io\u1eef\u1e31rc\xbb\u1e2e\u0269\u1ef9\0\0\u1efb\xed\u0548ant\u0100gl\u1f02\u1f06tr\xbb\u1e5dess\xbb\u1e7a\u0180aei\u1f12\u1f16\u1f1als;\u403dst;\u625fv\u0100;D\u0235\u1f20D;\u6a78parsl;\u69e5\u0100Da\u1f2f\u1f33ot;\u6253rr;\u6971\u0180cdi\u1f3e\u1f41\u1ef8r;\u612fo\xf4\u0352\u0100ah\u1f49\u1f4b;\u43b7\u803b\xf0\u40f0\u0100mr\u1f53\u1f57l\u803b\xeb\u40ebo;\u60ac\u0180cip\u1f61\u1f64\u1f67l;\u4021s\xf4\u056e\u0100eo\u1f6c\u1f74ctatio\xee\u0559nential\xe5\u0579\u09e1\u1f92\0\u1f9e\0\u1fa1\u1fa7\0\0\u1fc6\u1fcc\0\u1fd3\0\u1fe6\u1fea\u2000\0\u2008\u205allingdotse\xf1\u1e44y;\u4444male;\u6640\u0180ilr\u1fad\u1fb3\u1fc1lig;\u8000\ufb03\u0269\u1fb9\0\0\u1fbdg;\u8000\ufb00ig;\u8000\ufb04;\uc000\ud835\udd23lig;\u8000\ufb01lig;\uc000fj\u0180alt\u1fd9\u1fdc\u1fe1t;\u666dig;\u8000\ufb02ns;\u65b1of;\u4192\u01f0\u1fee\0\u1ff3f;\uc000\ud835\udd57\u0100ak\u05bf\u1ff7\u0100;v\u1ffc\u1ffd\u62d4;\u6ad9artint;\u6a0d\u0100ao\u200c\u2055\u0100cs\u2011\u2052\u03b1\u201a\u2030\u2038\u2045\u2048\0\u2050\u03b2\u2022\u2025\u2027\u202a\u202c\0\u202e\u803b\xbd\u40bd;\u6153\u803b\xbc\u40bc;\u6155;\u6159;\u615b\u01b3\u2034\0\u2036;\u6154;\u6156\u02b4\u203e\u2041\0\0\u2043\u803b\xbe\u40be;\u6157;\u615c5;\u6158\u01b6\u204c\0\u204e;\u615a;\u615d8;\u615el;\u6044wn;\u6322cr;\uc000\ud835\udcbb\u0880Eabcdefgijlnorstv\u2082\u2089\u209f\u20a5\u20b0\u20b4\u20f0\u20f5\u20fa\u20ff\u2103\u2112\u2138\u0317\u213e\u2152\u219e\u0100;l\u064d\u2087;\u6a8c\u0180cmp\u2090\u2095\u209dute;\u41f5ma\u0100;d\u209c\u1cda\u43b3;\u6a86reve;\u411f\u0100iy\u20aa\u20aerc;\u411d;\u4433ot;\u4121\u0200;lqs\u063e\u0642\u20bd\u20c9\u0180;qs\u063e\u064c\u20c4lan\xf4\u0665\u0200;cdl\u0665\u20d2\u20d5\u20e5c;\u6aa9ot\u0100;o\u20dc\u20dd\u6a80\u0100;l\u20e2\u20e3\u6a82;\u6a84\u0100;e\u20ea\u20ed\uc000\u22db\ufe00s;\u6a94r;\uc000\ud835\udd24\u0100;g\u0673\u061bmel;\u6137cy;\u4453\u0200;Eaj\u065a\u210c\u210e\u2110;\u6a92;\u6aa5;\u6aa4\u0200Eaes\u211b\u211d\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6a8arox\xbb\u2124\u0100;q\u212e\u212f\u6a88\u0100;q\u212e\u211bim;\u62e7pf;\uc000\ud835\udd58\u0100ci\u2143\u2146r;\u610am\u0180;el\u066b\u214e\u2150;\u6a8e;\u6a90\u8300>;cdlqr\u05ee\u2160\u216a\u216e\u2173\u2179\u0100ci\u2165\u2167;\u6aa7r;\u6a7aot;\u62d7Par;\u6995uest;\u6a7c\u0280adels\u2184\u216a\u2190\u0656\u219b\u01f0\u2189\0\u218epro\xf8\u209er;\u6978q\u0100lq\u063f\u2196les\xf3\u2088i\xed\u066b\u0100en\u21a3\u21adrtneqq;\uc000\u2269\ufe00\xc5\u21aa\u0500Aabcefkosy\u21c4\u21c7\u21f1\u21f5\u21fa\u2218\u221d\u222f\u2268\u227dr\xf2\u03a0\u0200ilmr\u21d0\u21d4\u21d7\u21dbrs\xf0\u1484f\xbb\u2024il\xf4\u06a9\u0100dr\u21e0\u21e4cy;\u444a\u0180;cw\u08f4\u21eb\u21efir;\u6948;\u61adar;\u610firc;\u4125\u0180alr\u2201\u220e\u2213rts\u0100;u\u2209\u220a\u6665it\xbb\u220alip;\u6026con;\u62b9r;\uc000\ud835\udd25s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223a\u223e\u2243\u225e\u2263rr;\u61fftht;\u623bk\u0100lr\u2249\u2253eftarrow;\u61a9ightarrow;\u61aaf;\uc000\ud835\udd59bar;\u6015\u0180clt\u226f\u2274\u2278r;\uc000\ud835\udcbdas\xe8\u21f4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xbb\u1c5b\u0ae1\u22a3\0\u22aa\0\u22b8\u22c5\u22ce\0\u22d5\u22f3\0\0\u22f8\u2322\u2367\u2362\u237f\0\u2386\u23aa\u23b4cute\u803b\xed\u40ed\u0180;iy\u0771\u22b0\u22b5rc\u803b\xee\u40ee;\u4438\u0100cx\u22bc\u22bfy;\u4435cl\u803b\xa1\u40a1\u0100fr\u039f\u22c9;\uc000\ud835\udd26rave\u803b\xec\u40ec\u0200;ino\u073e\u22dd\u22e9\u22ee\u0100in\u22e2\u22e6nt;\u6a0ct;\u622dfin;\u69dcta;\u6129lig;\u4133\u0180aop\u22fe\u231a\u231d\u0180cgt\u2305\u2308\u2317r;\u412b\u0180elp\u071f\u230f\u2313in\xe5\u078ear\xf4\u0720h;\u4131f;\u62b7ed;\u41b5\u0280;cfot\u04f4\u232c\u2331\u233d\u2341are;\u6105in\u0100;t\u2338\u2339\u621eie;\u69dddo\xf4\u2319\u0280;celp\u0757\u234c\u2350\u235b\u2361al;\u62ba\u0100gr\u2355\u2359er\xf3\u1563\xe3\u234darhk;\u6a17rod;\u6a3c\u0200cgpt\u236f\u2372\u2376\u237by;\u4451on;\u412ff;\uc000\ud835\udd5aa;\u43b9uest\u803b\xbf\u40bf\u0100ci\u238a\u238fr;\uc000\ud835\udcben\u0280;Edsv\u04f4\u239b\u239d\u23a1\u04f3;\u62f9ot;\u62f5\u0100;v\u23a6\u23a7\u62f4;\u62f3\u0100;i\u0777\u23aelde;\u4129\u01eb\u23b8\0\u23bccy;\u4456l\u803b\xef\u40ef\u0300cfmosu\u23cc\u23d7\u23dc\u23e1\u23e7\u23f5\u0100iy\u23d1\u23d5rc;\u4135;\u4439r;\uc000\ud835\udd27ath;\u4237pf;\uc000\ud835\udd5b\u01e3\u23ec\0\u23f1r;\uc000\ud835\udcbfrcy;\u4458kcy;\u4454\u0400acfghjos\u240b\u2416\u2422\u2427\u242d\u2431\u2435\u243bppa\u0100;v\u2413\u2414\u43ba;\u43f0\u0100ey\u241b\u2420dil;\u4137;\u443ar;\uc000\ud835\udd28reen;\u4138cy;\u4445cy;\u445cpf;\uc000\ud835\udd5ccr;\uc000\ud835\udcc0\u0b80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248d\u2491\u250e\u253d\u255a\u2580\u264e\u265e\u2665\u2679\u267d\u269a\u26b2\u26d8\u275d\u2768\u278b\u27c0\u2801\u2812\u0180art\u2477\u247a\u247cr\xf2\u09c6\xf2\u0395ail;\u691barr;\u690e\u0100;g\u0994\u248b;\u6a8bar;\u6962\u0963\u24a5\0\u24aa\0\u24b1\0\0\0\0\0\u24b5\u24ba\0\u24c6\u24c8\u24cd\0\u24f9ute;\u413amptyv;\u69b4ra\xee\u084cbda;\u43bbg\u0180;dl\u088e\u24c1\u24c3;\u6991\xe5\u088e;\u6a85uo\u803b\xab\u40abr\u0400;bfhlpst\u0899\u24de\u24e6\u24e9\u24eb\u24ee\u24f1\u24f5\u0100;f\u089d\u24e3s;\u691fs;\u691d\xeb\u2252p;\u61abl;\u6939im;\u6973l;\u61a2\u0180;ae\u24ff\u2500\u2504\u6aabil;\u6919\u0100;s\u2509\u250a\u6aad;\uc000\u2aad\ufe00\u0180abr\u2515\u2519\u251drr;\u690crk;\u6772\u0100ak\u2522\u252cc\u0100ek\u2528\u252a;\u407b;\u405b\u0100es\u2531\u2533;\u698bl\u0100du\u2539\u253b;\u698f;\u698d\u0200aeuy\u2546\u254b\u2556\u2558ron;\u413e\u0100di\u2550\u2554il;\u413c\xec\u08b0\xe2\u2529;\u443b\u0200cqrs\u2563\u2566\u256d\u257da;\u6936uo\u0100;r\u0e19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694bh;\u61b2\u0280;fgqs\u258b\u258c\u0989\u25f3\u25ff\u6264t\u0280ahlrt\u2598\u25a4\u25b7\u25c2\u25e8rrow\u0100;t\u0899\u25a1a\xe9\u24f6arpoon\u0100du\u25af\u25b4own\xbb\u045ap\xbb\u0966eftarrows;\u61c7ight\u0180ahs\u25cd\u25d6\u25derrow\u0100;s\u08f4\u08a7arpoon\xf3\u0f98quigarro\xf7\u21f0hreetimes;\u62cb\u0180;qs\u258b\u0993\u25falan\xf4\u09ac\u0280;cdgs\u09ac\u260a\u260d\u261d\u2628c;\u6aa8ot\u0100;o\u2614\u2615\u6a7f\u0100;r\u261a\u261b\u6a81;\u6a83\u0100;e\u2622\u2625\uc000\u22da\ufe00s;\u6a93\u0280adegs\u2633\u2639\u263d\u2649\u264bppro\xf8\u24c6ot;\u62d6q\u0100gq\u2643\u2645\xf4\u0989gt\xf2\u248c\xf4\u099bi\xed\u09b2\u0180ilr\u2655\u08e1\u265asht;\u697c;\uc000\ud835\udd29\u0100;E\u099c\u2663;\u6a91\u0161\u2669\u2676r\u0100du\u25b2\u266e\u0100;l\u0965\u2673;\u696alk;\u6584cy;\u4459\u0280;acht\u0a48\u2688\u268b\u2691\u2696r\xf2\u25c1orne\xf2\u1d08ard;\u696bri;\u65fa\u0100io\u269f\u26a4dot;\u4140ust\u0100;a\u26ac\u26ad\u63b0che\xbb\u26ad\u0200Eaes\u26bb\u26bd\u26c9\u26d4;\u6268p\u0100;p\u26c3\u26c4\u6a89rox\xbb\u26c4\u0100;q\u26ce\u26cf\u6a87\u0100;q\u26ce\u26bbim;\u62e6\u0400abnoptwz\u26e9\u26f4\u26f7\u271a\u272f\u2741\u2747\u2750\u0100nr\u26ee\u26f1g;\u67ecr;\u61fdr\xeb\u08c1g\u0180lmr\u26ff\u270d\u2714eft\u0100ar\u09e6\u2707ight\xe1\u09f2apsto;\u67fcight\xe1\u09fdparrow\u0100lr\u2725\u2729ef\xf4\u24edight;\u61ac\u0180afl\u2736\u2739\u273dr;\u6985;\uc000\ud835\udd5dus;\u6a2dimes;\u6a34\u0161\u274b\u274fst;\u6217\xe1\u134e\u0180;ef\u2757\u2758\u1800\u65cange\xbb\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277c\u2785\u2787r\xf2\u08a8orne\xf2\u1d8car\u0100;d\u0f98\u2783;\u696d;\u600eri;\u62bf\u0300achiqt\u2798\u279d\u0a40\u27a2\u27ae\u27bbquo;\u6039r;\uc000\ud835\udcc1m\u0180;eg\u09b2\u27aa\u27ac;\u6a8d;\u6a8f\u0100bu\u252a\u27b3o\u0100;r\u0e1f\u27b9;\u601arok;\u4142\u8400<;cdhilqr\u082b\u27d2\u2639\u27dc\u27e0\u27e5\u27ea\u27f0\u0100ci\u27d7\u27d9;\u6aa6r;\u6a79re\xe5\u25f2mes;\u62c9arr;\u6976uest;\u6a7b\u0100Pi\u27f5\u27f9ar;\u6996\u0180;ef\u2800\u092d\u181b\u65c3r\u0100du\u2807\u280dshar;\u694ahar;\u6966\u0100en\u2817\u2821rtneqq;\uc000\u2268\ufe00\xc5\u281e\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288e\u2893\u28a0\u28a5\u28a8\u28da\u28e2\u28e4\u0a83\u28f3\u2902Dot;\u623a\u0200clpr\u284e\u2852\u2863\u287dr\u803b\xaf\u40af\u0100et\u2857\u2859;\u6642\u0100;e\u285e\u285f\u6720se\xbb\u285f\u0100;s\u103b\u2868to\u0200;dlu\u103b\u2873\u2877\u287bow\xee\u048cef\xf4\u090f\xf0\u13d1ker;\u65ae\u0100oy\u2887\u288cmma;\u6a29;\u443cash;\u6014asuredangle\xbb\u1626r;\uc000\ud835\udd2ao;\u6127\u0180cdn\u28af\u28b4\u28c9ro\u803b\xb5\u40b5\u0200;acd\u1464\u28bd\u28c0\u28c4s\xf4\u16a7ir;\u6af0ot\u80bb\xb7\u01b5us\u0180;bd\u28d2\u1903\u28d3\u6212\u0100;u\u1d3c\u28d8;\u6a2a\u0163\u28de\u28e1p;\u6adb\xf2\u2212\xf0\u0a81\u0100dp\u28e9\u28eeels;\u62a7f;\uc000\ud835\udd5e\u0100ct\u28f8\u28fdr;\uc000\ud835\udcc2pos\xbb\u159d\u0180;lm\u2909\u290a\u290d\u43bctimap;\u62b8\u0c00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297e\u2989\u2998\u29da\u29e9\u2a15\u2a1a\u2a58\u2a5d\u2a83\u2a95\u2aa4\u2aa8\u2b04\u2b07\u2b44\u2b7f\u2bae\u2c34\u2c67\u2c7c\u2ce9\u0100gt\u2947\u294b;\uc000\u22d9\u0338\u0100;v\u2950\u0bcf\uc000\u226b\u20d2\u0180elt\u295a\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61cdightarrow;\u61ce;\uc000\u22d8\u0338\u0100;v\u297b\u0c47\uc000\u226a\u20d2ightarrow;\u61cf\u0100Dd\u298e\u2993ash;\u62afash;\u62ae\u0280bcnpt\u29a3\u29a7\u29ac\u29b1\u29ccla\xbb\u02deute;\u4144g;\uc000\u2220\u20d2\u0280;Eiop\u0d84\u29bc\u29c0\u29c5\u29c8;\uc000\u2a70\u0338d;\uc000\u224b\u0338s;\u4149ro\xf8\u0d84ur\u0100;a\u29d3\u29d4\u666el\u0100;s\u29d3\u0b38\u01f3\u29df\0\u29e3p\u80bb\xa0\u0b37mp\u0100;e\u0bf9\u0c00\u0280aeouy\u29f4\u29fe\u2a03\u2a10\u2a13\u01f0\u29f9\0\u29fb;\u6a43on;\u4148dil;\u4146ng\u0100;d\u0d7e\u2a0aot;\uc000\u2a6d\u0338p;\u6a42;\u443dash;\u6013\u0380;Aadqsx\u0b92\u2a29\u2a2d\u2a3b\u2a41\u2a45\u2a50rr;\u61d7r\u0100hr\u2a33\u2a36k;\u6924\u0100;o\u13f2\u13f0ot;\uc000\u2250\u0338ui\xf6\u0b63\u0100ei\u2a4a\u2a4ear;\u6928\xed\u0b98ist\u0100;s\u0ba0\u0b9fr;\uc000\ud835\udd2b\u0200Eest\u0bc5\u2a66\u2a79\u2a7c\u0180;qs\u0bbc\u2a6d\u0be1\u0180;qs\u0bbc\u0bc5\u2a74lan\xf4\u0be2i\xed\u0bea\u0100;r\u0bb6\u2a81\xbb\u0bb7\u0180Aap\u2a8a\u2a8d\u2a91r\xf2\u2971rr;\u61aear;\u6af2\u0180;sv\u0f8d\u2a9c\u0f8c\u0100;d\u2aa1\u2aa2\u62fc;\u62facy;\u445a\u0380AEadest\u2ab7\u2aba\u2abe\u2ac2\u2ac5\u2af6\u2af9r\xf2\u2966;\uc000\u2266\u0338rr;\u619ar;\u6025\u0200;fqs\u0c3b\u2ace\u2ae3\u2aeft\u0100ar\u2ad4\u2ad9rro\xf7\u2ac1ightarro\xf7\u2a90\u0180;qs\u0c3b\u2aba\u2aealan\xf4\u0c55\u0100;s\u0c55\u2af4\xbb\u0c36i\xed\u0c5d\u0100;r\u0c35\u2afei\u0100;e\u0c1a\u0c25i\xe4\u0d90\u0100pt\u2b0c\u2b11f;\uc000\ud835\udd5f\u8180\xac;in\u2b19\u2b1a\u2b36\u40acn\u0200;Edv\u0b89\u2b24\u2b28\u2b2e;\uc000\u22f9\u0338ot;\uc000\u22f5\u0338\u01e1\u0b89\u2b33\u2b35;\u62f7;\u62f6i\u0100;v\u0cb8\u2b3c\u01e1\u0cb8\u2b41\u2b43;\u62fe;\u62fd\u0180aor\u2b4b\u2b63\u2b69r\u0200;ast\u0b7b\u2b55\u2b5a\u2b5flle\xec\u0b7bl;\uc000\u2afd\u20e5;\uc000\u2202\u0338lint;\u6a14\u0180;ce\u0c92\u2b70\u2b73u\xe5\u0ca5\u0100;c\u0c98\u2b78\u0100;e\u0c92\u2b7d\xf1\u0c98\u0200Aait\u2b88\u2b8b\u2b9d\u2ba7r\xf2\u2988rr\u0180;cw\u2b94\u2b95\u2b99\u619b;\uc000\u2933\u0338;\uc000\u219d\u0338ghtarrow\xbb\u2b95ri\u0100;e\u0ccb\u0cd6\u0380chimpqu\u2bbd\u2bcd\u2bd9\u2b04\u0b78\u2be4\u2bef\u0200;cer\u0d32\u2bc6\u0d37\u2bc9u\xe5\u0d45;\uc000\ud835\udcc3ort\u026d\u2b05\0\0\u2bd6ar\xe1\u2b56m\u0100;e\u0d6e\u2bdf\u0100;q\u0d74\u0d73su\u0100bp\u2beb\u2bed\xe5\u0cf8\xe5\u0d0b\u0180bcp\u2bf6\u2c11\u2c19\u0200;Ees\u2bff\u2c00\u0d22\u2c04\u6284;\uc000\u2ac5\u0338et\u0100;e\u0d1b\u2c0bq\u0100;q\u0d23\u2c00c\u0100;e\u0d32\u2c17\xf1\u0d38\u0200;Ees\u2c22\u2c23\u0d5f\u2c27\u6285;\uc000\u2ac6\u0338et\u0100;e\u0d58\u2c2eq\u0100;q\u0d60\u2c23\u0200gilr\u2c3d\u2c3f\u2c45\u2c47\xec\u0bd7lde\u803b\xf1\u40f1\xe7\u0c43iangle\u0100lr\u2c52\u2c5ceft\u0100;e\u0c1a\u2c5a\xf1\u0c26ight\u0100;e\u0ccb\u2c65\xf1\u0cd7\u0100;m\u2c6c\u2c6d\u43bd\u0180;es\u2c74\u2c75\u2c79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2c8f\u2c94\u2c99\u2c9e\u2ca3\u2cb0\u2cb6\u2cd3\u2ce3ash;\u62adarr;\u6904p;\uc000\u224d\u20d2ash;\u62ac\u0100et\u2ca8\u2cac;\uc000\u2265\u20d2;\uc000>\u20d2nfin;\u69de\u0180Aet\u2cbd\u2cc1\u2cc5rr;\u6902;\uc000\u2264\u20d2\u0100;r\u2cca\u2ccd\uc000<\u20d2ie;\uc000\u22b4\u20d2\u0100At\u2cd8\u2cdcrr;\u6903rie;\uc000\u22b5\u20d2im;\uc000\u223c\u20d2\u0180Aan\u2cf0\u2cf4\u2d02rr;\u61d6r\u0100hr\u2cfa\u2cfdk;\u6923\u0100;o\u13e7\u13e5ear;\u6927\u1253\u1a95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2d2d\0\u2d38\u2d48\u2d60\u2d65\u2d72\u2d84\u1b07\0\0\u2d8d\u2dab\0\u2dc8\u2dce\0\u2ddc\u2e19\u2e2b\u2e3e\u2e43\u0100cs\u2d31\u1a97ute\u803b\xf3\u40f3\u0100iy\u2d3c\u2d45r\u0100;c\u1a9e\u2d42\u803b\xf4\u40f4;\u443e\u0280abios\u1aa0\u2d52\u2d57\u01c8\u2d5alac;\u4151v;\u6a38old;\u69bclig;\u4153\u0100cr\u2d69\u2d6dir;\u69bf;\uc000\ud835\udd2c\u036f\u2d79\0\0\u2d7c\0\u2d82n;\u42dbave\u803b\xf2\u40f2;\u69c1\u0100bm\u2d88\u0df4ar;\u69b5\u0200acit\u2d95\u2d98\u2da5\u2da8r\xf2\u1a80\u0100ir\u2d9d\u2da0r;\u69beoss;\u69bbn\xe5\u0e52;\u69c0\u0180aei\u2db1\u2db5\u2db9cr;\u414dga;\u43c9\u0180cdn\u2dc0\u2dc5\u01cdron;\u43bf;\u69b6pf;\uc000\ud835\udd60\u0180ael\u2dd4\u2dd7\u01d2r;\u69b7rp;\u69b9\u0380;adiosv\u2dea\u2deb\u2dee\u2e08\u2e0d\u2e10\u2e16\u6228r\xf2\u1a86\u0200;efm\u2df7\u2df8\u2e02\u2e05\u6a5dr\u0100;o\u2dfe\u2dff\u6134f\xbb\u2dff\u803b\xaa\u40aa\u803b\xba\u40bagof;\u62b6r;\u6a56lope;\u6a57;\u6a5b\u0180clo\u2e1f\u2e21\u2e27\xf2\u2e01ash\u803b\xf8\u40f8l;\u6298i\u016c\u2e2f\u2e34de\u803b\xf5\u40f5es\u0100;a\u01db\u2e3as;\u6a36ml\u803b\xf6\u40f6bar;\u633d\u0ae1\u2e5e\0\u2e7d\0\u2e80\u2e9d\0\u2ea2\u2eb9\0\0\u2ecb\u0e9c\0\u2f13\0\0\u2f2b\u2fbc\0\u2fc8r\u0200;ast\u0403\u2e67\u2e72\u0e85\u8100\xb6;l\u2e6d\u2e6e\u40b6le\xec\u0403\u0269\u2e78\0\0\u2e7bm;\u6af3;\u6afdy;\u443fr\u0280cimpt\u2e8b\u2e8f\u2e93\u1865\u2e97nt;\u4025od;\u402eil;\u6030enk;\u6031r;\uc000\ud835\udd2d\u0180imo\u2ea8\u2eb0\u2eb4\u0100;v\u2ead\u2eae\u43c6;\u43d5ma\xf4\u0a76ne;\u660e\u0180;tv\u2ebf\u2ec0\u2ec8\u43c0chfork\xbb\u1ffd;\u43d6\u0100au\u2ecf\u2edfn\u0100ck\u2ed5\u2eddk\u0100;h\u21f4\u2edb;\u610e\xf6\u21f4s\u0480;abcdemst\u2ef3\u2ef4\u1908\u2ef9\u2efd\u2f04\u2f06\u2f0a\u2f0e\u402bcir;\u6a23ir;\u6a22\u0100ou\u1d40\u2f02;\u6a25;\u6a72n\u80bb\xb1\u0e9dim;\u6a26wo;\u6a27\u0180ipu\u2f19\u2f20\u2f25ntint;\u6a15f;\uc000\ud835\udd61nd\u803b\xa3\u40a3\u0500;Eaceinosu\u0ec8\u2f3f\u2f41\u2f44\u2f47\u2f81\u2f89\u2f92\u2f7e\u2fb6;\u6ab3p;\u6ab7u\xe5\u0ed9\u0100;c\u0ece\u2f4c\u0300;acens\u0ec8\u2f59\u2f5f\u2f66\u2f68\u2f7eppro\xf8\u2f43urlye\xf1\u0ed9\xf1\u0ece\u0180aes\u2f6f\u2f76\u2f7approx;\u6ab9qq;\u6ab5im;\u62e8i\xed\u0edfme\u0100;s\u2f88\u0eae\u6032\u0180Eas\u2f78\u2f90\u2f7a\xf0\u2f75\u0180dfp\u0eec\u2f99\u2faf\u0180als\u2fa0\u2fa5\u2faalar;\u632eine;\u6312urf;\u6313\u0100;t\u0efb\u2fb4\xef\u0efbrel;\u62b0\u0100ci\u2fc0\u2fc5r;\uc000\ud835\udcc5;\u43c8ncsp;\u6008\u0300fiopsu\u2fda\u22e2\u2fdf\u2fe5\u2feb\u2ff1r;\uc000\ud835\udd2epf;\uc000\ud835\udd62rime;\u6057cr;\uc000\ud835\udcc6\u0180aeo\u2ff8\u3009\u3013t\u0100ei\u2ffe\u3005rnion\xf3\u06b0nt;\u6a16st\u0100;e\u3010\u3011\u403f\xf1\u1f19\xf4\u0f14\u0a80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30e0\u310e\u312b\u3147\u3162\u3172\u318e\u3206\u3215\u3224\u3229\u3258\u326e\u3272\u3290\u32b0\u32b7\u0180art\u3047\u304a\u304cr\xf2\u10b3\xf2\u03ddail;\u691car\xf2\u1c65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307f\u308f\u3094\u30cc\u0100eu\u306d\u3071;\uc000\u223d\u0331te;\u4155i\xe3\u116emptyv;\u69b3g\u0200;del\u0fd1\u3089\u308b\u308d;\u6992;\u69a5\xe5\u0fd1uo\u803b\xbb\u40bbr\u0580;abcfhlpstw\u0fdc\u30ac\u30af\u30b7\u30b9\u30bc\u30be\u30c0\u30c3\u30c7\u30cap;\u6975\u0100;f\u0fe0\u30b4s;\u6920;\u6933s;\u691e\xeb\u225d\xf0\u272el;\u6945im;\u6974l;\u61a3;\u619d\u0100ai\u30d1\u30d5il;\u691ao\u0100;n\u30db\u30dc\u6236al\xf3\u0f1e\u0180abr\u30e7\u30ea\u30eer\xf2\u17e5rk;\u6773\u0100ak\u30f3\u30fdc\u0100ek\u30f9\u30fb;\u407d;\u405d\u0100es\u3102\u3104;\u698cl\u0100du\u310a\u310c;\u698e;\u6990\u0200aeuy\u3117\u311c\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xec\u0ff2\xe2\u30fa;\u4440\u0200clqs\u3134\u3137\u313d\u3144a;\u6937dhar;\u6969uo\u0100;r\u020e\u020dh;\u61b3\u0180acg\u314e\u315f\u0f44l\u0200;ips\u0f78\u3158\u315b\u109cn\xe5\u10bbar\xf4\u0fa9t;\u65ad\u0180ilr\u3169\u1023\u316esht;\u697d;\uc000\ud835\udd2f\u0100ao\u3177\u3186r\u0100du\u317d\u317f\xbb\u047b\u0100;l\u1091\u3184;\u696c\u0100;v\u318b\u318c\u43c1;\u43f1\u0180gns\u3195\u31f9\u31fcht\u0300ahlrst\u31a4\u31b0\u31c2\u31d8\u31e4\u31eerrow\u0100;t\u0fdc\u31ada\xe9\u30c8arpoon\u0100du\u31bb\u31bfow\xee\u317ep\xbb\u1092eft\u0100ah\u31ca\u31d0rrow\xf3\u0feaarpoon\xf3\u0551ightarrows;\u61c9quigarro\xf7\u30cbhreetimes;\u62ccg;\u42daingdotse\xf1\u1f32\u0180ahm\u320d\u3210\u3213r\xf2\u0feaa\xf2\u0551;\u600foust\u0100;a\u321e\u321f\u63b1che\xbb\u321fmid;\u6aee\u0200abpt\u3232\u323d\u3240\u3252\u0100nr\u3237\u323ag;\u67edr;\u61fer\xeb\u1003\u0180afl\u3247\u324a\u324er;\u6986;\uc000\ud835\udd63us;\u6a2eimes;\u6a35\u0100ap\u325d\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6a12ar\xf2\u31e3\u0200achq\u327b\u3280\u10bc\u3285quo;\u603ar;\uc000\ud835\udcc7\u0100bu\u30fb\u328ao\u0100;r\u0214\u0213\u0180hir\u3297\u329b\u32a0re\xe5\u31f8mes;\u62cai\u0200;efl\u32aa\u1059\u1821\u32ab\u65b9tri;\u69celuhar;\u6968;\u611e\u0d61\u32d5\u32db\u32df\u332c\u3338\u3371\0\u337a\u33a4\0\0\u33ec\u33f0\0\u3428\u3448\u345a\u34ad\u34b1\u34ca\u34f1\0\u3616\0\0\u3633cute;\u415bqu\xef\u27ba\u0500;Eaceinpsy\u11ed\u32f3\u32f5\u32ff\u3302\u330b\u330f\u331f\u3326\u3329;\u6ab4\u01f0\u32fa\0\u32fc;\u6ab8on;\u4161u\xe5\u11fe\u0100;d\u11f3\u3307il;\u415frc;\u415d\u0180Eas\u3316\u3318\u331b;\u6ab6p;\u6abaim;\u62e9olint;\u6a13i\xed\u1204;\u4441ot\u0180;be\u3334\u1d47\u3335\u62c5;\u6a66\u0380Aacmstx\u3346\u334a\u3357\u335b\u335e\u3363\u336drr;\u61d8r\u0100hr\u3350\u3352\xeb\u2228\u0100;o\u0a36\u0a34t\u803b\xa7\u40a7i;\u403bwar;\u6929m\u0100in\u3369\xf0nu\xf3\xf1t;\u6736r\u0100;o\u3376\u2055\uc000\ud835\udd30\u0200acoy\u3382\u3386\u3391\u33a0rp;\u666f\u0100hy\u338b\u338fcy;\u4449;\u4448rt\u026d\u3399\0\0\u339ci\xe4\u1464ara\xec\u2e6f\u803b\xad\u40ad\u0100gm\u33a8\u33b4ma\u0180;fv\u33b1\u33b2\u33b2\u43c3;\u43c2\u0400;deglnpr\u12ab\u33c5\u33c9\u33ce\u33d6\u33de\u33e1\u33e6ot;\u6a6a\u0100;q\u12b1\u12b0\u0100;E\u33d3\u33d4\u6a9e;\u6aa0\u0100;E\u33db\u33dc\u6a9d;\u6a9fe;\u6246lus;\u6a24arr;\u6972ar\xf2\u113d\u0200aeit\u33f8\u3408\u340f\u3417\u0100ls\u33fd\u3404lsetm\xe9\u336ahp;\u6a33parsl;\u69e4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341c\u341d\u6aaa\u0100;s\u3422\u3423\u6aac;\uc000\u2aac\ufe00\u0180flp\u342e\u3433\u3442tcy;\u444c\u0100;b\u3438\u3439\u402f\u0100;a\u343e\u343f\u69c4r;\u633ff;\uc000\ud835\udd64a\u0100dr\u344d\u0402es\u0100;u\u3454\u3455\u6660it\xbb\u3455\u0180csu\u3460\u3479\u349f\u0100au\u3465\u346fp\u0100;s\u1188\u346b;\uc000\u2293\ufe00p\u0100;s\u11b4\u3475;\uc000\u2294\ufe00u\u0100bp\u347f\u348f\u0180;es\u1197\u119c\u3486et\u0100;e\u1197\u348d\xf1\u119d\u0180;es\u11a8\u11ad\u3496et\u0100;e\u11a8\u349d\xf1\u11ae\u0180;af\u117b\u34a6\u05b0r\u0165\u34ab\u05b1\xbb\u117car\xf2\u1148\u0200cemt\u34b9\u34be\u34c2\u34c5r;\uc000\ud835\udcc8tm\xee\xf1i\xec\u3415ar\xe6\u11be\u0100ar\u34ce\u34d5r\u0100;f\u34d4\u17bf\u6606\u0100an\u34da\u34edight\u0100ep\u34e3\u34eapsilo\xee\u1ee0h\xe9\u2eafs\xbb\u2852\u0280bcmnp\u34fb\u355e\u1209\u358b\u358e\u0480;Edemnprs\u350e\u350f\u3511\u3515\u351e\u3523\u352c\u3531\u3536\u6282;\u6ac5ot;\u6abd\u0100;d\u11da\u351aot;\u6ac3ult;\u6ac1\u0100Ee\u3528\u352a;\u6acb;\u628alus;\u6abfarr;\u6979\u0180eiu\u353d\u3552\u3555t\u0180;en\u350e\u3545\u354bq\u0100;q\u11da\u350feq\u0100;q\u352b\u3528m;\u6ac7\u0100bp\u355a\u355c;\u6ad5;\u6ad3c\u0300;acens\u11ed\u356c\u3572\u3579\u357b\u3326ppro\xf8\u32faurlye\xf1\u11fe\xf1\u11f3\u0180aes\u3582\u3588\u331bppro\xf8\u331aq\xf1\u3317g;\u666a\u0680123;Edehlmnps\u35a9\u35ac\u35af\u121c\u35b2\u35b4\u35c0\u35c9\u35d5\u35da\u35df\u35e8\u35ed\u803b\xb9\u40b9\u803b\xb2\u40b2\u803b\xb3\u40b3;\u6ac6\u0100os\u35b9\u35bct;\u6abeub;\u6ad8\u0100;d\u1222\u35c5ot;\u6ac4s\u0100ou\u35cf\u35d2l;\u67c9b;\u6ad7arr;\u697bult;\u6ac2\u0100Ee\u35e4\u35e6;\u6acc;\u628blus;\u6ac0\u0180eiu\u35f4\u3609\u360ct\u0180;en\u121c\u35fc\u3602q\u0100;q\u1222\u35b2eq\u0100;q\u35e7\u35e4m;\u6ac8\u0100bp\u3611\u3613;\u6ad4;\u6ad6\u0180Aan\u361c\u3620\u362drr;\u61d9r\u0100hr\u3626\u3628\xeb\u222e\u0100;o\u0a2b\u0a29war;\u692alig\u803b\xdf\u40df\u0be1\u3651\u365d\u3660\u12ce\u3673\u3679\0\u367e\u36c2\0\0\0\0\0\u36db\u3703\0\u3709\u376c\0\0\0\u3787\u0272\u3656\0\0\u365bget;\u6316;\u43c4r\xeb\u0e5f\u0180aey\u3666\u366b\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uc000\ud835\udd31\u0200eiko\u3686\u369d\u36b5\u36bc\u01f2\u368b\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369b\u43b8ym;\u43d1\u0100cn\u36a2\u36b2k\u0100as\u36a8\u36aeppro\xf8\u12c1im\xbb\u12acs\xf0\u129e\u0100as\u36ba\u36ae\xf0\u12c1rn\u803b\xfe\u40fe\u01ec\u031f\u36c6\u22e7es\u8180\xd7;bd\u36cf\u36d0\u36d8\u40d7\u0100;a\u190f\u36d5r;\u6a31;\u6a30\u0180eps\u36e1\u36e3\u3700\xe1\u2a4d\u0200;bcf\u0486\u36ec\u36f0\u36f4ot;\u6336ir;\u6af1\u0100;o\u36f9\u36fc\uc000\ud835\udd65rk;\u6ada\xe1\u3362rime;\u6034\u0180aip\u370f\u3712\u3764d\xe5\u1248\u0380adempst\u3721\u374d\u3740\u3751\u3757\u375c\u375fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65b5own\xbb\u1dbbeft\u0100;e\u2800\u373e\xf1\u092e;\u625cight\u0100;e\u32aa\u374b\xf1\u105aot;\u65ecinus;\u6a3alus;\u6a39b;\u69cdime;\u6a3bezium;\u63e2\u0180cht\u3772\u377d\u3781\u0100ry\u3777\u377b;\uc000\ud835\udcc9;\u4446cy;\u445brok;\u4167\u0100io\u378b\u378ex\xf4\u1777head\u0100lr\u3797\u37a0eftarro\xf7\u084fightarrow\xbb\u0f5d\u0900AHabcdfghlmoprstuw\u37d0\u37d3\u37d7\u37e4\u37f0\u37fc\u380e\u381c\u3823\u3834\u3851\u385d\u386b\u38a9\u38cc\u38d2\u38ea\u38f6r\xf2\u03edar;\u6963\u0100cr\u37dc\u37e2ute\u803b\xfa\u40fa\xf2\u1150r\u01e3\u37ea\0\u37edy;\u445eve;\u416d\u0100iy\u37f5\u37farc\u803b\xfb\u40fb;\u4443\u0180abh\u3803\u3806\u380br\xf2\u13adlac;\u4171a\xf2\u13c3\u0100ir\u3813\u3818sht;\u697e;\uc000\ud835\udd32rave\u803b\xf9\u40f9\u0161\u3827\u3831r\u0100lr\u382c\u382e\xbb\u0957\xbb\u1083lk;\u6580\u0100ct\u3839\u384d\u026f\u383f\0\0\u384arn\u0100;e\u3845\u3846\u631cr\xbb\u3846op;\u630fri;\u65f8\u0100al\u3856\u385acr;\u416b\u80bb\xa8\u0349\u0100gp\u3862\u3866on;\u4173f;\uc000\ud835\udd66\u0300adhlsu\u114b\u3878\u387d\u1372\u3891\u38a0own\xe1\u13b3arpoon\u0100lr\u3888\u388cef\xf4\u382digh\xf4\u382fi\u0180;hl\u3899\u389a\u389c\u43c5\xbb\u13faon\xbb\u389aparrows;\u61c8\u0180cit\u38b0\u38c4\u38c8\u026f\u38b6\0\0\u38c1rn\u0100;e\u38bc\u38bd\u631dr\xbb\u38bdop;\u630eng;\u416fri;\u65f9cr;\uc000\ud835\udcca\u0180dir\u38d9\u38dd\u38e2ot;\u62f0lde;\u4169i\u0100;f\u3730\u38e8\xbb\u1813\u0100am\u38ef\u38f2r\xf2\u38a8l\u803b\xfc\u40fcangle;\u69a7\u0780ABDacdeflnoprsz\u391c\u391f\u3929\u392d\u39b5\u39b8\u39bd\u39df\u39e4\u39e8\u39f3\u39f9\u39fd\u3a01\u3a20r\xf2\u03f7ar\u0100;v\u3926\u3927\u6ae8;\u6ae9as\xe8\u03e1\u0100nr\u3932\u3937grt;\u699c\u0380eknprst\u34e3\u3946\u394b\u3952\u395d\u3964\u3996app\xe1\u2415othin\xe7\u1e96\u0180hir\u34eb\u2ec8\u3959op\xf4\u2fb5\u0100;h\u13b7\u3962\xef\u318d\u0100iu\u3969\u396dgm\xe1\u33b3\u0100bp\u3972\u3984setneq\u0100;q\u397d\u3980\uc000\u228a\ufe00;\uc000\u2acb\ufe00setneq\u0100;q\u398f\u3992\uc000\u228b\ufe00;\uc000\u2acc\ufe00\u0100hr\u399b\u399fet\xe1\u369ciangle\u0100lr\u39aa\u39afeft\xbb\u0925ight\xbb\u1051y;\u4432ash\xbb\u1036\u0180elr\u39c4\u39d2\u39d7\u0180;be\u2dea\u39cb\u39cfar;\u62bbq;\u625alip;\u62ee\u0100bt\u39dc\u1468a\xf2\u1469r;\uc000\ud835\udd33tr\xe9\u39aesu\u0100bp\u39ef\u39f1\xbb\u0d1c\xbb\u0d59pf;\uc000\ud835\udd67ro\xf0\u0efbtr\xe9\u39b4\u0100cu\u3a06\u3a0br;\uc000\ud835\udccb\u0100bp\u3a10\u3a18n\u0100Ee\u3980\u3a16\xbb\u397en\u0100Ee\u3992\u3a1e\xbb\u3990igzag;\u699a\u0380cefoprs\u3a36\u3a3b\u3a56\u3a5b\u3a54\u3a61\u3a6airc;\u4175\u0100di\u3a40\u3a51\u0100bg\u3a45\u3a49ar;\u6a5fe\u0100;q\u15fa\u3a4f;\u6259erp;\u6118r;\uc000\ud835\udd34pf;\uc000\ud835\udd68\u0100;e\u1479\u3a66at\xe8\u1479cr;\uc000\ud835\udccc\u0ae3\u178e\u3a87\0\u3a8b\0\u3a90\u3a9b\0\0\u3a9d\u3aa8\u3aab\u3aaf\0\0\u3ac3\u3ace\0\u3ad8\u17dc\u17dftr\xe9\u17d1r;\uc000\ud835\udd35\u0100Aa\u3a94\u3a97r\xf2\u03c3r\xf2\u09f6;\u43be\u0100Aa\u3aa1\u3aa4r\xf2\u03b8r\xf2\u09eba\xf0\u2713is;\u62fb\u0180dpt\u17a4\u3ab5\u3abe\u0100fl\u3aba\u17a9;\uc000\ud835\udd69im\xe5\u17b2\u0100Aa\u3ac7\u3acar\xf2\u03cer\xf2\u0a01\u0100cq\u3ad2\u17b8r;\uc000\ud835\udccd\u0100pt\u17d6\u3adcr\xe9\u17d4\u0400acefiosu\u3af0\u3afd\u3b08\u3b0c\u3b11\u3b15\u3b1b\u3b21c\u0100uy\u3af6\u3afbte\u803b\xfd\u40fd;\u444f\u0100iy\u3b02\u3b06rc;\u4177;\u444bn\u803b\xa5\u40a5r;\uc000\ud835\udd36cy;\u4457pf;\uc000\ud835\udd6acr;\uc000\ud835\udcce\u0100cm\u3b26\u3b29y;\u444el\u803b\xff\u40ff\u0500acdefhiosw\u3b42\u3b48\u3b54\u3b58\u3b64\u3b69\u3b6d\u3b74\u3b7a\u3b80cute;\u417a\u0100ay\u3b4d\u3b52ron;\u417e;\u4437ot;\u417c\u0100et\u3b5d\u3b61tr\xe6\u155fa;\u43b6r;\uc000\ud835\udd37cy;\u4436grarr;\u61ddpf;\uc000\ud835\udd6bcr;\uc000\ud835\udccf\u0100jn\u3b85\u3b87;\u600dj;\u600c".split("").map(c => c.charCodeAt(0)));

	// Generated using scripts/write-decode-map.ts
	var xmlDecodeTree = new Uint16Array(
	// prettier-ignore
	"\u0200aglq\t\x15\x18\x1b\u026d\x0f\0\0\x12p;\u4026os;\u4027t;\u403et;\u403cuot;\u4022".split("").map(c => c.charCodeAt(0)));

	// Adapted from https://github.com/mathiasbynens/he/blob/36afe179392226cf1b6ccdb16ebbb7a5a844d93a/src/he.js#L106-L134
	var _a;
	const decodeMap = new Map([[0, 65533],
	// C1 Unicode control character reference replacements
	[128, 8364], [130, 8218], [131, 402], [132, 8222], [133, 8230], [134, 8224], [135, 8225], [136, 710], [137, 8240], [138, 352], [139, 8249], [140, 338], [142, 381], [145, 8216], [146, 8217], [147, 8220], [148, 8221], [149, 8226], [150, 8211], [151, 8212], [152, 732], [153, 8482], [154, 353], [155, 8250], [156, 339], [158, 382], [159, 376]]);
	/**
	 * Polyfill for `String.fromCodePoint`. It is used to create a string from a Unicode code point.
	 */
	const fromCodePoint$1 =
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
	(_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function (codePoint) {
	  let output = "";
	  if (codePoint > 0xffff) {
	    codePoint -= 0x10000;
	    output += String.fromCharCode(codePoint >>> 10 & 0x3ff | 0xd800);
	    codePoint = 0xdc00 | codePoint & 0x3ff;
	  }
	  output += String.fromCharCode(codePoint);
	  return output;
	};
	/**
	 * Replace the given code point with a replacement character if it is a
	 * surrogate or is outside the valid range. Otherwise return the code
	 * point unchanged.
	 */
	function replaceCodePoint(codePoint) {
	  var _a;
	  if (codePoint >= 0xd800 && codePoint <= 0xdfff || codePoint > 0x10ffff) {
	    return 0xfffd;
	  }
	  return (_a = decodeMap.get(codePoint)) !== null && _a !== void 0 ? _a : codePoint;
	}

	var CharCodes;
	(function (CharCodes) {
	  CharCodes[CharCodes["NUM"] = 35] = "NUM";
	  CharCodes[CharCodes["SEMI"] = 59] = "SEMI";
	  CharCodes[CharCodes["EQUALS"] = 61] = "EQUALS";
	  CharCodes[CharCodes["ZERO"] = 48] = "ZERO";
	  CharCodes[CharCodes["NINE"] = 57] = "NINE";
	  CharCodes[CharCodes["LOWER_A"] = 97] = "LOWER_A";
	  CharCodes[CharCodes["LOWER_F"] = 102] = "LOWER_F";
	  CharCodes[CharCodes["LOWER_X"] = 120] = "LOWER_X";
	  CharCodes[CharCodes["LOWER_Z"] = 122] = "LOWER_Z";
	  CharCodes[CharCodes["UPPER_A"] = 65] = "UPPER_A";
	  CharCodes[CharCodes["UPPER_F"] = 70] = "UPPER_F";
	  CharCodes[CharCodes["UPPER_Z"] = 90] = "UPPER_Z";
	})(CharCodes || (CharCodes = {}));
	/** Bit that needs to be set to convert an upper case ASCII character to lower case */
	const TO_LOWER_BIT = 0b100000;
	var BinTrieFlags;
	(function (BinTrieFlags) {
	  BinTrieFlags[BinTrieFlags["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
	  BinTrieFlags[BinTrieFlags["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
	  BinTrieFlags[BinTrieFlags["JUMP_TABLE"] = 127] = "JUMP_TABLE";
	})(BinTrieFlags || (BinTrieFlags = {}));
	function isNumber(code) {
	  return code >= CharCodes.ZERO && code <= CharCodes.NINE;
	}
	function isHexadecimalCharacter(code) {
	  return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F;
	}
	function isAsciiAlphaNumeric(code) {
	  return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z || isNumber(code);
	}
	/**
	 * Checks if the given character is a valid end character for an entity in an attribute.
	 *
	 * Attribute values that aren't terminated properly aren't parsed, and shouldn't lead to a parser error.
	 * See the example in https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
	 */
	function isEntityInAttributeInvalidEnd(code) {
	  return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
	}
	var EntityDecoderState;
	(function (EntityDecoderState) {
	  EntityDecoderState[EntityDecoderState["EntityStart"] = 0] = "EntityStart";
	  EntityDecoderState[EntityDecoderState["NumericStart"] = 1] = "NumericStart";
	  EntityDecoderState[EntityDecoderState["NumericDecimal"] = 2] = "NumericDecimal";
	  EntityDecoderState[EntityDecoderState["NumericHex"] = 3] = "NumericHex";
	  EntityDecoderState[EntityDecoderState["NamedEntity"] = 4] = "NamedEntity";
	})(EntityDecoderState || (EntityDecoderState = {}));
	var DecodingMode;
	(function (DecodingMode) {
	  /** Entities in text nodes that can end with any character. */
	  DecodingMode[DecodingMode["Legacy"] = 0] = "Legacy";
	  /** Only allow entities terminated with a semicolon. */
	  DecodingMode[DecodingMode["Strict"] = 1] = "Strict";
	  /** Entities in attributes have limitations on ending characters. */
	  DecodingMode[DecodingMode["Attribute"] = 2] = "Attribute";
	})(DecodingMode || (DecodingMode = {}));
	/**
	 * Token decoder with support of writing partial entities.
	 */
	class EntityDecoder {
	  constructor( /** The tree used to decode entities. */
	  decodeTree,
	  /**
	   * The function that is called when a codepoint is decoded.
	   *
	   * For multi-byte named entities, this will be called multiple times,
	   * with the second codepoint, and the same `consumed` value.
	   *
	   * @param codepoint The decoded codepoint.
	   * @param consumed The number of bytes consumed by the decoder.
	   */
	  emitCodePoint, /** An object that is used to produce errors. */
	  errors) {
	    this.decodeTree = decodeTree;
	    this.emitCodePoint = emitCodePoint;
	    this.errors = errors;
	    /** The current state of the decoder. */
	    this.state = EntityDecoderState.EntityStart;
	    /** Characters that were consumed while parsing an entity. */
	    this.consumed = 1;
	    /**
	     * The result of the entity.
	     *
	     * Either the result index of a numeric entity, or the codepoint of a
	     * numeric entity.
	     */
	    this.result = 0;
	    /** The current index in the decode tree. */
	    this.treeIndex = 0;
	    /** The number of characters that were consumed in excess. */
	    this.excess = 1;
	    /** The mode in which the decoder is operating. */
	    this.decodeMode = DecodingMode.Strict;
	  }
	  /** Resets the instance to make it reusable. */
	  startEntity(decodeMode) {
	    this.decodeMode = decodeMode;
	    this.state = EntityDecoderState.EntityStart;
	    this.result = 0;
	    this.treeIndex = 0;
	    this.excess = 1;
	    this.consumed = 1;
	  }
	  /**
	   * Write an entity to the decoder. This can be called multiple times with partial entities.
	   * If the entity is incomplete, the decoder will return -1.
	   *
	   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
	   * entity is incomplete, and resume when the next string is written.
	   *
	   * @param string The string containing the entity (or a continuation of the entity).
	   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
	   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	   */
	  write(str, offset) {
	    switch (this.state) {
	      case EntityDecoderState.EntityStart:
	        {
	          if (str.charCodeAt(offset) === CharCodes.NUM) {
	            this.state = EntityDecoderState.NumericStart;
	            this.consumed += 1;
	            return this.stateNumericStart(str, offset + 1);
	          }
	          this.state = EntityDecoderState.NamedEntity;
	          return this.stateNamedEntity(str, offset);
	        }
	      case EntityDecoderState.NumericStart:
	        {
	          return this.stateNumericStart(str, offset);
	        }
	      case EntityDecoderState.NumericDecimal:
	        {
	          return this.stateNumericDecimal(str, offset);
	        }
	      case EntityDecoderState.NumericHex:
	        {
	          return this.stateNumericHex(str, offset);
	        }
	      case EntityDecoderState.NamedEntity:
	        {
	          return this.stateNamedEntity(str, offset);
	        }
	    }
	  }
	  /**
	   * Switches between the numeric decimal and hexadecimal states.
	   *
	   * Equivalent to the `Numeric character reference state` in the HTML spec.
	   *
	   * @param str The string containing the entity (or a continuation of the entity).
	   * @param offset The current offset.
	   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	   */
	  stateNumericStart(str, offset) {
	    if (offset >= str.length) {
	      return -1;
	    }
	    if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
	      this.state = EntityDecoderState.NumericHex;
	      this.consumed += 1;
	      return this.stateNumericHex(str, offset + 1);
	    }
	    this.state = EntityDecoderState.NumericDecimal;
	    return this.stateNumericDecimal(str, offset);
	  }
	  addToNumericResult(str, start, end, base) {
	    if (start !== end) {
	      const digitCount = end - start;
	      this.result = this.result * Math.pow(base, digitCount) + parseInt(str.substr(start, digitCount), base);
	      this.consumed += digitCount;
	    }
	  }
	  /**
	   * Parses a hexadecimal numeric entity.
	   *
	   * Equivalent to the `Hexademical character reference state` in the HTML spec.
	   *
	   * @param str The string containing the entity (or a continuation of the entity).
	   * @param offset The current offset.
	   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	   */
	  stateNumericHex(str, offset) {
	    const startIdx = offset;
	    while (offset < str.length) {
	      const char = str.charCodeAt(offset);
	      if (isNumber(char) || isHexadecimalCharacter(char)) {
	        offset += 1;
	      } else {
	        this.addToNumericResult(str, startIdx, offset, 16);
	        return this.emitNumericEntity(char, 3);
	      }
	    }
	    this.addToNumericResult(str, startIdx, offset, 16);
	    return -1;
	  }
	  /**
	   * Parses a decimal numeric entity.
	   *
	   * Equivalent to the `Decimal character reference state` in the HTML spec.
	   *
	   * @param str The string containing the entity (or a continuation of the entity).
	   * @param offset The current offset.
	   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	   */
	  stateNumericDecimal(str, offset) {
	    const startIdx = offset;
	    while (offset < str.length) {
	      const char = str.charCodeAt(offset);
	      if (isNumber(char)) {
	        offset += 1;
	      } else {
	        this.addToNumericResult(str, startIdx, offset, 10);
	        return this.emitNumericEntity(char, 2);
	      }
	    }
	    this.addToNumericResult(str, startIdx, offset, 10);
	    return -1;
	  }
	  /**
	   * Validate and emit a numeric entity.
	   *
	   * Implements the logic from the `Hexademical character reference start
	   * state` and `Numeric character reference end state` in the HTML spec.
	   *
	   * @param lastCp The last code point of the entity. Used to see if the
	   *               entity was terminated with a semicolon.
	   * @param expectedLength The minimum number of characters that should be
	   *                       consumed. Used to validate that at least one digit
	   *                       was consumed.
	   * @returns The number of characters that were consumed.
	   */
	  emitNumericEntity(lastCp, expectedLength) {
	    var _a;
	    // Ensure we consumed at least one digit.
	    if (this.consumed <= expectedLength) {
	      (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
	      return 0;
	    }
	    // Figure out if this is a legit end of the entity
	    if (lastCp === CharCodes.SEMI) {
	      this.consumed += 1;
	    } else if (this.decodeMode === DecodingMode.Strict) {
	      return 0;
	    }
	    this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
	    if (this.errors) {
	      if (lastCp !== CharCodes.SEMI) {
	        this.errors.missingSemicolonAfterCharacterReference();
	      }
	      this.errors.validateNumericCharacterReference(this.result);
	    }
	    return this.consumed;
	  }
	  /**
	   * Parses a named entity.
	   *
	   * Equivalent to the `Named character reference state` in the HTML spec.
	   *
	   * @param str The string containing the entity (or a continuation of the entity).
	   * @param offset The current offset.
	   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	   */
	  stateNamedEntity(str, offset) {
	    const {
	      decodeTree
	    } = this;
	    let current = decodeTree[this.treeIndex];
	    // The mask is the number of bytes of the value, including the current byte.
	    let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
	    for (; offset < str.length; offset++, this.excess++) {
	      const char = str.charCodeAt(offset);
	      this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
	      if (this.treeIndex < 0) {
	        return this.result === 0 ||
	        // If we are parsing an attribute
	        this.decodeMode === DecodingMode.Attribute && (
	        // We shouldn't have consumed any characters after the entity,
	        valueLength === 0 ||
	        // And there should be no invalid characters.
	        isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
	      }
	      current = decodeTree[this.treeIndex];
	      valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
	      // If the branch is a value, store it and continue
	      if (valueLength !== 0) {
	        // If the entity is terminated by a semicolon, we are done.
	        if (char === CharCodes.SEMI) {
	          return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
	        }
	        // If we encounter a non-terminated (legacy) entity while parsing strictly, then ignore it.
	        if (this.decodeMode !== DecodingMode.Strict) {
	          this.result = this.treeIndex;
	          this.consumed += this.excess;
	          this.excess = 0;
	        }
	      }
	    }
	    return -1;
	  }
	  /**
	   * Emit a named entity that was not terminated with a semicolon.
	   *
	   * @returns The number of characters consumed.
	   */
	  emitNotTerminatedNamedEntity() {
	    var _a;
	    const {
	      result,
	      decodeTree
	    } = this;
	    const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
	    this.emitNamedEntityData(result, valueLength, this.consumed);
	    (_a = this.errors) === null || _a === void 0 ? void 0 : _a.missingSemicolonAfterCharacterReference();
	    return this.consumed;
	  }
	  /**
	   * Emit a named entity.
	   *
	   * @param result The index of the entity in the decode tree.
	   * @param valueLength The number of bytes in the entity.
	   * @param consumed The number of characters consumed.
	   *
	   * @returns The number of characters consumed.
	   */
	  emitNamedEntityData(result, valueLength, consumed) {
	    const {
	      decodeTree
	    } = this;
	    this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
	    if (valueLength === 3) {
	      // For multi-byte values, we need to emit the second byte.
	      this.emitCodePoint(decodeTree[result + 2], consumed);
	    }
	    return consumed;
	  }
	  /**
	   * Signal to the parser that the end of the input was reached.
	   *
	   * Remaining data will be emitted and relevant errors will be produced.
	   *
	   * @returns The number of characters consumed.
	   */
	  end() {
	    var _a;
	    switch (this.state) {
	      case EntityDecoderState.NamedEntity:
	        {
	          // Emit a named entity if we have one.
	          return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
	        }
	      // Otherwise, emit a numeric entity if we have one.
	      case EntityDecoderState.NumericDecimal:
	        {
	          return this.emitNumericEntity(0, 2);
	        }
	      case EntityDecoderState.NumericHex:
	        {
	          return this.emitNumericEntity(0, 3);
	        }
	      case EntityDecoderState.NumericStart:
	        {
	          (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
	          return 0;
	        }
	      case EntityDecoderState.EntityStart:
	        {
	          // Return 0 if we have no entity.
	          return 0;
	        }
	    }
	  }
	}
	/**
	 * Creates a function that decodes entities in a string.
	 *
	 * @param decodeTree The decode tree.
	 * @returns A function that decodes entities in a string.
	 */
	function getDecoder(decodeTree) {
	  let ret = "";
	  const decoder = new EntityDecoder(decodeTree, str => ret += fromCodePoint$1(str));
	  return function decodeWithTrie(str, decodeMode) {
	    let lastIndex = 0;
	    let offset = 0;
	    while ((offset = str.indexOf("&", offset)) >= 0) {
	      ret += str.slice(lastIndex, offset);
	      decoder.startEntity(decodeMode);
	      const len = decoder.write(str,
	      // Skip the "&"
	      offset + 1);
	      if (len < 0) {
	        lastIndex = offset + decoder.end();
	        break;
	      }
	      lastIndex = offset + len;
	      // If `len` is 0, skip the current `&` and continue.
	      offset = len === 0 ? lastIndex + 1 : lastIndex;
	    }
	    const result = ret + str.slice(lastIndex);
	    // Make sure we don't keep a reference to the final string.
	    ret = "";
	    return result;
	  };
	}
	/**
	 * Determines the branch of the current node that is taken given the current
	 * character. This function is used to traverse the trie.
	 *
	 * @param decodeTree The trie.
	 * @param current The current node.
	 * @param nodeIdx The index right after the current node and its value.
	 * @param char The current character.
	 * @returns The index of the next node, or -1 if no branch is taken.
	 */
	function determineBranch(decodeTree, current, nodeIdx, char) {
	  const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
	  const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
	  // Case 1: Single branch encoded in jump offset
	  if (branchCount === 0) {
	    return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
	  }
	  // Case 2: Multiple branches encoded in jump table
	  if (jumpOffset) {
	    const value = char - jumpOffset;
	    return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIdx + value] - 1;
	  }
	  // Case 3: Multiple branches encoded in dictionary
	  // Binary search for the character.
	  let lo = nodeIdx;
	  let hi = lo + branchCount - 1;
	  while (lo <= hi) {
	    const mid = lo + hi >>> 1;
	    const midVal = decodeTree[mid];
	    if (midVal < char) {
	      lo = mid + 1;
	    } else if (midVal > char) {
	      hi = mid - 1;
	    } else {
	      return decodeTree[mid + branchCount];
	    }
	  }
	  return -1;
	}
	const htmlDecoder = getDecoder(htmlDecodeTree);
	getDecoder(xmlDecodeTree);
	/**
	 * Decodes an HTML string.
	 *
	 * @param str The string to decode.
	 * @param mode The decoding mode.
	 * @returns The decoded string.
	 */
	function decodeHTML(str, mode = DecodingMode.Legacy) {
	  return htmlDecoder(str, mode);
	}

	// Utilities
	//

	function _class$1(obj) {
	  return Object.prototype.toString.call(obj);
	}
	function isString$1(obj) {
	  return _class$1(obj) === '[object String]';
	}
	const _hasOwnProperty = Object.prototype.hasOwnProperty;
	function has(object, key) {
	  return _hasOwnProperty.call(object, key);
	}

	// Merge objects
	//
	function assign$1(obj /* from1, from2, from3, ... */) {
	  const sources = Array.prototype.slice.call(arguments, 1);
	  sources.forEach(function (source) {
	    if (!source) {
	      return;
	    }
	    if (typeof source !== 'object') {
	      throw new TypeError(source + 'must be object');
	    }
	    Object.keys(source).forEach(function (key) {
	      obj[key] = source[key];
	    });
	  });
	  return obj;
	}

	// Remove element from array and put another array at those position.
	// Useful for some operations with tokens
	function arrayReplaceAt(src, pos, newElements) {
	  return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
	}
	function isValidEntityCode(c) {
	  /* eslint no-bitwise:0 */
	  // broken sequence
	  if (c >= 0xD800 && c <= 0xDFFF) {
	    return false;
	  }
	  // never used
	  if (c >= 0xFDD0 && c <= 0xFDEF) {
	    return false;
	  }
	  if ((c & 0xFFFF) === 0xFFFF || (c & 0xFFFF) === 0xFFFE) {
	    return false;
	  }
	  // control codes
	  if (c >= 0x00 && c <= 0x08) {
	    return false;
	  }
	  if (c === 0x0B) {
	    return false;
	  }
	  if (c >= 0x0E && c <= 0x1F) {
	    return false;
	  }
	  if (c >= 0x7F && c <= 0x9F) {
	    return false;
	  }
	  // out of range
	  if (c > 0x10FFFF) {
	    return false;
	  }
	  return true;
	}
	function fromCodePoint(c) {
	  /* eslint no-bitwise:0 */
	  if (c > 0xffff) {
	    c -= 0x10000;
	    const surrogate1 = 0xd800 + (c >> 10);
	    const surrogate2 = 0xdc00 + (c & 0x3ff);
	    return String.fromCharCode(surrogate1, surrogate2);
	  }
	  return String.fromCharCode(c);
	}
	const UNESCAPE_MD_RE = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g;
	const ENTITY_RE = /&([a-z#][a-z0-9]{1,31});/gi;
	const UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + '|' + ENTITY_RE.source, 'gi');
	const DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
	function replaceEntityPattern(match, name) {
	  if (name.charCodeAt(0) === 0x23 /* # */ && DIGITAL_ENTITY_TEST_RE.test(name)) {
	    const code = name[1].toLowerCase() === 'x' ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
	    if (isValidEntityCode(code)) {
	      return fromCodePoint(code);
	    }
	    return match;
	  }
	  const decoded = decodeHTML(match);
	  if (decoded !== match) {
	    return decoded;
	  }
	  return match;
	}

	/* function replaceEntities(str) {
	  if (str.indexOf('&') < 0) { return str; }

	  return str.replace(ENTITY_RE, replaceEntityPattern);
	} */

	function unescapeMd(str) {
	  if (str.indexOf('\\') < 0) {
	    return str;
	  }
	  return str.replace(UNESCAPE_MD_RE, '$1');
	}
	function unescapeAll(str) {
	  if (str.indexOf('\\') < 0 && str.indexOf('&') < 0) {
	    return str;
	  }
	  return str.replace(UNESCAPE_ALL_RE, function (match, escaped, entity) {
	    if (escaped) {
	      return escaped;
	    }
	    return replaceEntityPattern(match, entity);
	  });
	}
	const HTML_ESCAPE_TEST_RE = /[&<>"]/;
	const HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
	const HTML_REPLACEMENTS = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	function replaceUnsafeChar(ch) {
	  return HTML_REPLACEMENTS[ch];
	}
	function escapeHtml(str) {
	  if (HTML_ESCAPE_TEST_RE.test(str)) {
	    return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
	  }
	  return str;
	}
	const REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;
	function escapeRE$1(str) {
	  return str.replace(REGEXP_ESCAPE_RE, '\\$&');
	}
	function isSpace(code) {
	  switch (code) {
	    case 0x09:
	    case 0x20:
	      return true;
	  }
	  return false;
	}

	// Zs (unicode class) || [\t\f\v\r\n]
	function isWhiteSpace(code) {
	  if (code >= 0x2000 && code <= 0x200A) {
	    return true;
	  }
	  switch (code) {
	    case 0x09: // \t
	    case 0x0A: // \n
	    case 0x0B: // \v
	    case 0x0C: // \f
	    case 0x0D: // \r
	    case 0x20:
	    case 0xA0:
	    case 0x1680:
	    case 0x202F:
	    case 0x205F:
	    case 0x3000:
	      return true;
	  }
	  return false;
	}

	/* eslint-disable max-len */

	// Currently without astral characters support.
	function isPunctChar(ch) {
	  return P.test(ch) || regex.test(ch);
	}

	// Markdown ASCII punctuation characters.
	//
	// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~
	// http://spec.commonmark.org/0.15/#ascii-punctuation-character
	//
	// Don't confuse with unicode punctuation !!! It lacks some chars in ascii range.
	//
	function isMdAsciiPunct(ch) {
	  switch (ch) {
	    case 0x21 /* ! */:
	    case 0x22 /* " */:
	    case 0x23 /* # */:
	    case 0x24 /* $ */:
	    case 0x25 /* % */:
	    case 0x26 /* & */:
	    case 0x27 /* ' */:
	    case 0x28 /* ( */:
	    case 0x29 /* ) */:
	    case 0x2A /* * */:
	    case 0x2B /* + */:
	    case 0x2C /* , */:
	    case 0x2D /* - */:
	    case 0x2E /* . */:
	    case 0x2F /* / */:
	    case 0x3A /* : */:
	    case 0x3B /* ; */:
	    case 0x3C /* < */:
	    case 0x3D /* = */:
	    case 0x3E /* > */:
	    case 0x3F /* ? */:
	    case 0x40 /* @ */:
	    case 0x5B /* [ */:
	    case 0x5C /* \ */:
	    case 0x5D /* ] */:
	    case 0x5E /* ^ */:
	    case 0x5F /* _ */:
	    case 0x60 /* ` */:
	    case 0x7B /* { */:
	    case 0x7C /* | */:
	    case 0x7D /* } */:
	    case 0x7E /* ~ */:
	      return true;
	    default:
	      return false;
	  }
	}

	// Hepler to unify [reference labels].
	//
	function normalizeReference(str) {
	  // Trim and collapse whitespace
	  //
	  str = str.trim().replace(/\s+/g, ' ');

	  // In node v10 'ẞ'.toLowerCase() === 'Ṿ', which is presumed to be a bug
	  // fixed in v12 (couldn't find any details).
	  //
	  // So treat this one as a special case
	  // (remove this when node v10 is no longer supported).
	  //
	  if ('ẞ'.toLowerCase() === 'Ṿ') {
	    str = str.replace(/ẞ/g, 'ß');
	  }

	  // .toLowerCase().toUpperCase() should get rid of all differences
	  // between letter variants.
	  //
	  // Simple .toLowerCase() doesn't normalize 125 code points correctly,
	  // and .toUpperCase doesn't normalize 6 of them (list of exceptions:
	  // İ, ϴ, ẞ, Ω, K, Å - those are already uppercased, but have differently
	  // uppercased versions).
	  //
	  // Here's an example showing how it happens. Lets take greek letter omega:
	  // uppercase U+0398 (Θ), U+03f4 (ϴ) and lowercase U+03b8 (θ), U+03d1 (ϑ)
	  //
	  // Unicode entries:
	  // 0398;GREEK CAPITAL LETTER THETA;Lu;0;L;;;;;N;;;;03B8;
	  // 03B8;GREEK SMALL LETTER THETA;Ll;0;L;;;;;N;;;0398;;0398
	  // 03D1;GREEK THETA SYMBOL;Ll;0;L;<compat> 03B8;;;;N;GREEK SMALL LETTER SCRIPT THETA;;0398;;0398
	  // 03F4;GREEK CAPITAL THETA SYMBOL;Lu;0;L;<compat> 0398;;;;N;;;;03B8;
	  //
	  // Case-insensitive comparison should treat all of them as equivalent.
	  //
	  // But .toLowerCase() doesn't change ϑ (it's already lowercase),
	  // and .toUpperCase() doesn't change ϴ (already uppercase).
	  //
	  // Applying first lower then upper case normalizes any character:
	  // '\u0398\u03f4\u03b8\u03d1'.toLowerCase().toUpperCase() === '\u0398\u0398\u0398\u0398'
	  //
	  // Note: this is equivalent to unicode case folding; unicode normalization
	  // is a different step that is not required here.
	  //
	  // Final result should be uppercased, because it's later stored in an object
	  // (this avoid a conflict with Object.prototype members,
	  // most notably, `__proto__`)
	  //
	  return str.toLowerCase().toUpperCase();
	}

	// Re-export libraries commonly used in both markdown-it and its plugins,
	// so plugins won't have to depend on them explicitly, which reduces their
	// bundled size (e.g. a browser build).
	//
	const lib = {
	  mdurl,
	  ucmicro
	};

	var utils = /*#__PURE__*/Object.freeze({
		__proto__: null,
		arrayReplaceAt: arrayReplaceAt,
		assign: assign$1,
		escapeHtml: escapeHtml,
		escapeRE: escapeRE$1,
		fromCodePoint: fromCodePoint,
		has: has,
		isMdAsciiPunct: isMdAsciiPunct,
		isPunctChar: isPunctChar,
		isSpace: isSpace,
		isString: isString$1,
		isValidEntityCode: isValidEntityCode,
		isWhiteSpace: isWhiteSpace,
		lib: lib,
		normalizeReference: normalizeReference,
		unescapeAll: unescapeAll,
		unescapeMd: unescapeMd
	});

	// Parse link label
	//
	// this function assumes that first character ("[") already matches;
	// returns the end of the label
	//

	function parseLinkLabel(state, start, disableNested) {
	  let level, found, marker, prevPos;
	  const max = state.posMax;
	  const oldPos = state.pos;
	  state.pos = start + 1;
	  level = 1;
	  while (state.pos < max) {
	    marker = state.src.charCodeAt(state.pos);
	    if (marker === 0x5D /* ] */) {
	      level--;
	      if (level === 0) {
	        found = true;
	        break;
	      }
	    }
	    prevPos = state.pos;
	    state.md.inline.skipToken(state);
	    if (marker === 0x5B /* [ */) {
	      if (prevPos === state.pos - 1) {
	        // increase level if we find text `[`, which is not a part of any token
	        level++;
	      } else if (disableNested) {
	        state.pos = oldPos;
	        return -1;
	      }
	    }
	  }
	  let labelEnd = -1;
	  if (found) {
	    labelEnd = state.pos;
	  }

	  // restore old state
	  state.pos = oldPos;
	  return labelEnd;
	}

	// Parse link destination
	//

	function parseLinkDestination(str, start, max) {
	  let code;
	  let pos = start;
	  const result = {
	    ok: false,
	    pos: 0,
	    str: ''
	  };
	  if (str.charCodeAt(pos) === 0x3C /* < */) {
	    pos++;
	    while (pos < max) {
	      code = str.charCodeAt(pos);
	      if (code === 0x0A /* \n */) {
	        return result;
	      }
	      if (code === 0x3C /* < */) {
	        return result;
	      }
	      if (code === 0x3E /* > */) {
	        result.pos = pos + 1;
	        result.str = unescapeAll(str.slice(start + 1, pos));
	        result.ok = true;
	        return result;
	      }
	      if (code === 0x5C /* \ */ && pos + 1 < max) {
	        pos += 2;
	        continue;
	      }
	      pos++;
	    }

	    // no closing '>'
	    return result;
	  }

	  // this should be ... } else { ... branch

	  let level = 0;
	  while (pos < max) {
	    code = str.charCodeAt(pos);
	    if (code === 0x20) {
	      break;
	    }

	    // ascii control characters
	    if (code < 0x20 || code === 0x7F) {
	      break;
	    }
	    if (code === 0x5C /* \ */ && pos + 1 < max) {
	      if (str.charCodeAt(pos + 1) === 0x20) {
	        break;
	      }
	      pos += 2;
	      continue;
	    }
	    if (code === 0x28 /* ( */) {
	      level++;
	      if (level > 32) {
	        return result;
	      }
	    }
	    if (code === 0x29 /* ) */) {
	      if (level === 0) {
	        break;
	      }
	      level--;
	    }
	    pos++;
	  }
	  if (start === pos) {
	    return result;
	  }
	  if (level !== 0) {
	    return result;
	  }
	  result.str = unescapeAll(str.slice(start, pos));
	  result.pos = pos;
	  result.ok = true;
	  return result;
	}

	// Parse link title
	//


	// Parse link title within `str` in [start, max] range,
	// or continue previous parsing if `prev_state` is defined (equal to result of last execution).
	//
	function parseLinkTitle(str, start, max, prev_state) {
	  let code;
	  let pos = start;
	  const state = {
	    // if `true`, this is a valid link title
	    ok: false,
	    // if `true`, this link can be continued on the next line
	    can_continue: false,
	    // if `ok`, it's the position of the first character after the closing marker
	    pos: 0,
	    // if `ok`, it's the unescaped title
	    str: '',
	    // expected closing marker character code
	    marker: 0
	  };
	  if (prev_state) {
	    // this is a continuation of a previous parseLinkTitle call on the next line,
	    // used in reference links only
	    state.str = prev_state.str;
	    state.marker = prev_state.marker;
	  } else {
	    if (pos >= max) {
	      return state;
	    }
	    let marker = str.charCodeAt(pos);
	    if (marker !== 0x22 /* " */ && marker !== 0x27 /* ' */ && marker !== 0x28 /* ( */) {
	      return state;
	    }
	    start++;
	    pos++;

	    // if opening marker is "(", switch it to closing marker ")"
	    if (marker === 0x28) {
	      marker = 0x29;
	    }
	    state.marker = marker;
	  }
	  while (pos < max) {
	    code = str.charCodeAt(pos);
	    if (code === state.marker) {
	      state.pos = pos + 1;
	      state.str += unescapeAll(str.slice(start, pos));
	      state.ok = true;
	      return state;
	    } else if (code === 0x28 /* ( */ && state.marker === 0x29 /* ) */) {
	      return state;
	    } else if (code === 0x5C /* \ */ && pos + 1 < max) {
	      pos++;
	    }
	    pos++;
	  }

	  // no closing marker found, but this link title may continue on the next line (for references)
	  state.can_continue = true;
	  state.str += unescapeAll(str.slice(start, pos));
	  return state;
	}

	// Just a shortcut for bulk export

	var helpers = /*#__PURE__*/Object.freeze({
		__proto__: null,
		parseLinkDestination: parseLinkDestination,
		parseLinkLabel: parseLinkLabel,
		parseLinkTitle: parseLinkTitle
	});

	/**
	 * class Renderer
	 *
	 * Generates HTML from parsed token stream. Each instance has independent
	 * copy of rules. Those can be rewritten with ease. Also, you can add new
	 * rules if you create plugin and adds new token types.
	 **/

	const default_rules = {};
	default_rules.code_inline = function (tokens, idx, options, env, slf) {
	  const token = tokens[idx];
	  return '<code' + slf.renderAttrs(token) + '>' + escapeHtml(token.content) + '</code>';
	};
	default_rules.code_block = function (tokens, idx, options, env, slf) {
	  const token = tokens[idx];
	  return '<pre' + slf.renderAttrs(token) + '><code>' + escapeHtml(tokens[idx].content) + '</code></pre>\n';
	};
	default_rules.fence = function (tokens, idx, options, env, slf) {
	  const token = tokens[idx];
	  const info = token.info ? unescapeAll(token.info).trim() : '';
	  let langName = '';
	  let langAttrs = '';
	  if (info) {
	    const arr = info.split(/(\s+)/g);
	    langName = arr[0];
	    langAttrs = arr.slice(2).join('');
	  }
	  let highlighted;
	  if (options.highlight) {
	    highlighted = options.highlight(token.content, langName, langAttrs) || escapeHtml(token.content);
	  } else {
	    highlighted = escapeHtml(token.content);
	  }
	  if (highlighted.indexOf('<pre') === 0) {
	    return highlighted + '\n';
	  }

	  // If language exists, inject class gently, without modifying original token.
	  // May be, one day we will add .deepClone() for token and simplify this part, but
	  // now we prefer to keep things local.
	  if (info) {
	    const i = token.attrIndex('class');
	    const tmpAttrs = token.attrs ? token.attrs.slice() : [];
	    if (i < 0) {
	      tmpAttrs.push(['class', options.langPrefix + langName]);
	    } else {
	      tmpAttrs[i] = tmpAttrs[i].slice();
	      tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
	    }

	    // Fake token just to render attributes
	    const tmpToken = {
	      attrs: tmpAttrs
	    };
	    return `<pre><code${slf.renderAttrs(tmpToken)}>${highlighted}</code></pre>\n`;
	  }
	  return `<pre><code${slf.renderAttrs(token)}>${highlighted}</code></pre>\n`;
	};
	default_rules.image = function (tokens, idx, options, env, slf) {
	  const token = tokens[idx];

	  // "alt" attr MUST be set, even if empty. Because it's mandatory and
	  // should be placed on proper position for tests.
	  //
	  // Replace content with actual value

	  token.attrs[token.attrIndex('alt')][1] = slf.renderInlineAsText(token.children, options, env);
	  return slf.renderToken(tokens, idx, options);
	};
	default_rules.hardbreak = function (tokens, idx, options /*, env */) {
	  return options.xhtmlOut ? '<br />\n' : '<br>\n';
	};
	default_rules.softbreak = function (tokens, idx, options /*, env */) {
	  return options.breaks ? options.xhtmlOut ? '<br />\n' : '<br>\n' : '\n';
	};
	default_rules.text = function (tokens, idx /*, options, env */) {
	  return escapeHtml(tokens[idx].content);
	};
	default_rules.html_block = function (tokens, idx /*, options, env */) {
	  return tokens[idx].content;
	};
	default_rules.html_inline = function (tokens, idx /*, options, env */) {
	  return tokens[idx].content;
	};

	/**
	 * new Renderer()
	 *
	 * Creates new [[Renderer]] instance and fill [[Renderer#rules]] with defaults.
	 **/
	function Renderer() {
	  /**
	   * Renderer#rules -> Object
	   *
	   * Contains render rules for tokens. Can be updated and extended.
	   *
	   * ##### Example
	   *
	   * ```javascript
	   * var md = require('markdown-it')();
	   *
	   * md.renderer.rules.strong_open  = function () { return '<b>'; };
	   * md.renderer.rules.strong_close = function () { return '</b>'; };
	   *
	   * var result = md.renderInline(...);
	   * ```
	   *
	   * Each rule is called as independent static function with fixed signature:
	   *
	   * ```javascript
	   * function my_token_render(tokens, idx, options, env, renderer) {
	   *   // ...
	   *   return renderedHTML;
	   * }
	   * ```
	   *
	   * See [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.mjs)
	   * for more details and examples.
	   **/
	  this.rules = assign$1({}, default_rules);
	}

	/**
	 * Renderer.renderAttrs(token) -> String
	 *
	 * Render token attributes to string.
	 **/
	Renderer.prototype.renderAttrs = function renderAttrs(token) {
	  let i, l, result;
	  if (!token.attrs) {
	    return '';
	  }
	  result = '';
	  for (i = 0, l = token.attrs.length; i < l; i++) {
	    result += ' ' + escapeHtml(token.attrs[i][0]) + '="' + escapeHtml(token.attrs[i][1]) + '"';
	  }
	  return result;
	};

	/**
	 * Renderer.renderToken(tokens, idx, options) -> String
	 * - tokens (Array): list of tokens
	 * - idx (Numbed): token index to render
	 * - options (Object): params of parser instance
	 *
	 * Default token renderer. Can be overriden by custom function
	 * in [[Renderer#rules]].
	 **/
	Renderer.prototype.renderToken = function renderToken(tokens, idx, options) {
	  const token = tokens[idx];
	  let result = '';

	  // Tight list paragraphs
	  if (token.hidden) {
	    return '';
	  }

	  // Insert a newline between hidden paragraph and subsequent opening
	  // block-level tag.
	  //
	  // For example, here we should insert a newline before blockquote:
	  //  - a
	  //    >
	  //
	  if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
	    result += '\n';
	  }

	  // Add token name, e.g. `<img`
	  result += (token.nesting === -1 ? '</' : '<') + token.tag;

	  // Encode attributes, e.g. `<img src="foo"`
	  result += this.renderAttrs(token);

	  // Add a slash for self-closing tags, e.g. `<img src="foo" /`
	  if (token.nesting === 0 && options.xhtmlOut) {
	    result += ' /';
	  }

	  // Check if we need to add a newline after this tag
	  let needLf = false;
	  if (token.block) {
	    needLf = true;
	    if (token.nesting === 1) {
	      if (idx + 1 < tokens.length) {
	        const nextToken = tokens[idx + 1];
	        if (nextToken.type === 'inline' || nextToken.hidden) {
	          // Block-level tag containing an inline tag.
	          //
	          needLf = false;
	        } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
	          // Opening tag + closing tag of the same type. E.g. `<li></li>`.
	          //
	          needLf = false;
	        }
	      }
	    }
	  }
	  result += needLf ? '>\n' : '>';
	  return result;
	};

	/**
	 * Renderer.renderInline(tokens, options, env) -> String
	 * - tokens (Array): list on block tokens to render
	 * - options (Object): params of parser instance
	 * - env (Object): additional data from parsed input (references, for example)
	 *
	 * The same as [[Renderer.render]], but for single token of `inline` type.
	 **/
	Renderer.prototype.renderInline = function (tokens, options, env) {
	  let result = '';
	  const rules = this.rules;
	  for (let i = 0, len = tokens.length; i < len; i++) {
	    const type = tokens[i].type;
	    if (typeof rules[type] !== 'undefined') {
	      result += rules[type](tokens, i, options, env, this);
	    } else {
	      result += this.renderToken(tokens, i, options);
	    }
	  }
	  return result;
	};

	/** internal
	 * Renderer.renderInlineAsText(tokens, options, env) -> String
	 * - tokens (Array): list on block tokens to render
	 * - options (Object): params of parser instance
	 * - env (Object): additional data from parsed input (references, for example)
	 *
	 * Special kludge for image `alt` attributes to conform CommonMark spec.
	 * Don't try to use it! Spec requires to show `alt` content with stripped markup,
	 * instead of simple escaping.
	 **/
	Renderer.prototype.renderInlineAsText = function (tokens, options, env) {
	  let result = '';
	  for (let i = 0, len = tokens.length; i < len; i++) {
	    switch (tokens[i].type) {
	      case 'text':
	        result += tokens[i].content;
	        break;
	      case 'image':
	        result += this.renderInlineAsText(tokens[i].children, options, env);
	        break;
	      case 'html_inline':
	      case 'html_block':
	        result += tokens[i].content;
	        break;
	      case 'softbreak':
	      case 'hardbreak':
	        result += '\n';
	        break;
	      // all other tokens are skipped
	    }
	  }
	  return result;
	};

	/**
	 * Renderer.render(tokens, options, env) -> String
	 * - tokens (Array): list on block tokens to render
	 * - options (Object): params of parser instance
	 * - env (Object): additional data from parsed input (references, for example)
	 *
	 * Takes token stream and generates HTML. Probably, you will never need to call
	 * this method directly.
	 **/
	Renderer.prototype.render = function (tokens, options, env) {
	  let result = '';
	  const rules = this.rules;
	  for (let i = 0, len = tokens.length; i < len; i++) {
	    const type = tokens[i].type;
	    if (type === 'inline') {
	      result += this.renderInline(tokens[i].children, options, env);
	    } else if (typeof rules[type] !== 'undefined') {
	      result += rules[type](tokens, i, options, env, this);
	    } else {
	      result += this.renderToken(tokens, i, options, env);
	    }
	  }
	  return result;
	};

	/**
	 * class Ruler
	 *
	 * Helper class, used by [[MarkdownIt#core]], [[MarkdownIt#block]] and
	 * [[MarkdownIt#inline]] to manage sequences of functions (rules):
	 *
	 * - keep rules in defined order
	 * - assign the name to each rule
	 * - enable/disable rules
	 * - add/replace rules
	 * - allow assign rules to additional named chains (in the same)
	 * - cacheing lists of active rules
	 *
	 * You will not need use this class directly until write plugins. For simple
	 * rules control use [[MarkdownIt.disable]], [[MarkdownIt.enable]] and
	 * [[MarkdownIt.use]].
	 **/

	/**
	 * new Ruler()
	 **/
	function Ruler() {
	  // List of added rules. Each element is:
	  //
	  // {
	  //   name: XXX,
	  //   enabled: Boolean,
	  //   fn: Function(),
	  //   alt: [ name2, name3 ]
	  // }
	  //
	  this.__rules__ = [];

	  // Cached rule chains.
	  //
	  // First level - chain name, '' for default.
	  // Second level - diginal anchor for fast filtering by charcodes.
	  //
	  this.__cache__ = null;
	}

	// Helper methods, should not be used directly

	// Find rule index by name
	//
	Ruler.prototype.__find__ = function (name) {
	  for (let i = 0; i < this.__rules__.length; i++) {
	    if (this.__rules__[i].name === name) {
	      return i;
	    }
	  }
	  return -1;
	};

	// Build rules lookup cache
	//
	Ruler.prototype.__compile__ = function () {
	  const self = this;
	  const chains = [''];

	  // collect unique names
	  self.__rules__.forEach(function (rule) {
	    if (!rule.enabled) {
	      return;
	    }
	    rule.alt.forEach(function (altName) {
	      if (chains.indexOf(altName) < 0) {
	        chains.push(altName);
	      }
	    });
	  });
	  self.__cache__ = {};
	  chains.forEach(function (chain) {
	    self.__cache__[chain] = [];
	    self.__rules__.forEach(function (rule) {
	      if (!rule.enabled) {
	        return;
	      }
	      if (chain && rule.alt.indexOf(chain) < 0) {
	        return;
	      }
	      self.__cache__[chain].push(rule.fn);
	    });
	  });
	};

	/**
	 * Ruler.at(name, fn [, options])
	 * - name (String): rule name to replace.
	 * - fn (Function): new rule function.
	 * - options (Object): new rule options (not mandatory).
	 *
	 * Replace rule by name with new function & options. Throws error if name not
	 * found.
	 *
	 * ##### Options:
	 *
	 * - __alt__ - array with names of "alternate" chains.
	 *
	 * ##### Example
	 *
	 * Replace existing typographer replacement rule with new one:
	 *
	 * ```javascript
	 * var md = require('markdown-it')();
	 *
	 * md.core.ruler.at('replacements', function replace(state) {
	 *   //...
	 * });
	 * ```
	 **/
	Ruler.prototype.at = function (name, fn, options) {
	  const index = this.__find__(name);
	  const opt = options || {};
	  if (index === -1) {
	    throw new Error('Parser rule not found: ' + name);
	  }
	  this.__rules__[index].fn = fn;
	  this.__rules__[index].alt = opt.alt || [];
	  this.__cache__ = null;
	};

	/**
	 * Ruler.before(beforeName, ruleName, fn [, options])
	 * - beforeName (String): new rule will be added before this one.
	 * - ruleName (String): name of added rule.
	 * - fn (Function): rule function.
	 * - options (Object): rule options (not mandatory).
	 *
	 * Add new rule to chain before one with given name. See also
	 * [[Ruler.after]], [[Ruler.push]].
	 *
	 * ##### Options:
	 *
	 * - __alt__ - array with names of "alternate" chains.
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * var md = require('markdown-it')();
	 *
	 * md.block.ruler.before('paragraph', 'my_rule', function replace(state) {
	 *   //...
	 * });
	 * ```
	 **/
	Ruler.prototype.before = function (beforeName, ruleName, fn, options) {
	  const index = this.__find__(beforeName);
	  const opt = options || {};
	  if (index === -1) {
	    throw new Error('Parser rule not found: ' + beforeName);
	  }
	  this.__rules__.splice(index, 0, {
	    name: ruleName,
	    enabled: true,
	    fn,
	    alt: opt.alt || []
	  });
	  this.__cache__ = null;
	};

	/**
	 * Ruler.after(afterName, ruleName, fn [, options])
	 * - afterName (String): new rule will be added after this one.
	 * - ruleName (String): name of added rule.
	 * - fn (Function): rule function.
	 * - options (Object): rule options (not mandatory).
	 *
	 * Add new rule to chain after one with given name. See also
	 * [[Ruler.before]], [[Ruler.push]].
	 *
	 * ##### Options:
	 *
	 * - __alt__ - array with names of "alternate" chains.
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * var md = require('markdown-it')();
	 *
	 * md.inline.ruler.after('text', 'my_rule', function replace(state) {
	 *   //...
	 * });
	 * ```
	 **/
	Ruler.prototype.after = function (afterName, ruleName, fn, options) {
	  const index = this.__find__(afterName);
	  const opt = options || {};
	  if (index === -1) {
	    throw new Error('Parser rule not found: ' + afterName);
	  }
	  this.__rules__.splice(index + 1, 0, {
	    name: ruleName,
	    enabled: true,
	    fn,
	    alt: opt.alt || []
	  });
	  this.__cache__ = null;
	};

	/**
	 * Ruler.push(ruleName, fn [, options])
	 * - ruleName (String): name of added rule.
	 * - fn (Function): rule function.
	 * - options (Object): rule options (not mandatory).
	 *
	 * Push new rule to the end of chain. See also
	 * [[Ruler.before]], [[Ruler.after]].
	 *
	 * ##### Options:
	 *
	 * - __alt__ - array with names of "alternate" chains.
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * var md = require('markdown-it')();
	 *
	 * md.core.ruler.push('my_rule', function replace(state) {
	 *   //...
	 * });
	 * ```
	 **/
	Ruler.prototype.push = function (ruleName, fn, options) {
	  const opt = options || {};
	  this.__rules__.push({
	    name: ruleName,
	    enabled: true,
	    fn,
	    alt: opt.alt || []
	  });
	  this.__cache__ = null;
	};

	/**
	 * Ruler.enable(list [, ignoreInvalid]) -> Array
	 * - list (String|Array): list of rule names to enable.
	 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
	 *
	 * Enable rules with given names. If any rule name not found - throw Error.
	 * Errors can be disabled by second param.
	 *
	 * Returns list of found rule names (if no exception happened).
	 *
	 * See also [[Ruler.disable]], [[Ruler.enableOnly]].
	 **/
	Ruler.prototype.enable = function (list, ignoreInvalid) {
	  if (!Array.isArray(list)) {
	    list = [list];
	  }
	  const result = [];

	  // Search by name and enable
	  list.forEach(function (name) {
	    const idx = this.__find__(name);
	    if (idx < 0) {
	      if (ignoreInvalid) {
	        return;
	      }
	      throw new Error('Rules manager: invalid rule name ' + name);
	    }
	    this.__rules__[idx].enabled = true;
	    result.push(name);
	  }, this);
	  this.__cache__ = null;
	  return result;
	};

	/**
	 * Ruler.enableOnly(list [, ignoreInvalid])
	 * - list (String|Array): list of rule names to enable (whitelist).
	 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
	 *
	 * Enable rules with given names, and disable everything else. If any rule name
	 * not found - throw Error. Errors can be disabled by second param.
	 *
	 * See also [[Ruler.disable]], [[Ruler.enable]].
	 **/
	Ruler.prototype.enableOnly = function (list, ignoreInvalid) {
	  if (!Array.isArray(list)) {
	    list = [list];
	  }
	  this.__rules__.forEach(function (rule) {
	    rule.enabled = false;
	  });
	  this.enable(list, ignoreInvalid);
	};

	/**
	 * Ruler.disable(list [, ignoreInvalid]) -> Array
	 * - list (String|Array): list of rule names to disable.
	 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
	 *
	 * Disable rules with given names. If any rule name not found - throw Error.
	 * Errors can be disabled by second param.
	 *
	 * Returns list of found rule names (if no exception happened).
	 *
	 * See also [[Ruler.enable]], [[Ruler.enableOnly]].
	 **/
	Ruler.prototype.disable = function (list, ignoreInvalid) {
	  if (!Array.isArray(list)) {
	    list = [list];
	  }
	  const result = [];

	  // Search by name and disable
	  list.forEach(function (name) {
	    const idx = this.__find__(name);
	    if (idx < 0) {
	      if (ignoreInvalid) {
	        return;
	      }
	      throw new Error('Rules manager: invalid rule name ' + name);
	    }
	    this.__rules__[idx].enabled = false;
	    result.push(name);
	  }, this);
	  this.__cache__ = null;
	  return result;
	};

	/**
	 * Ruler.getRules(chainName) -> Array
	 *
	 * Return array of active functions (rules) for given chain name. It analyzes
	 * rules configuration, compiles caches if not exists and returns result.
	 *
	 * Default chain name is `''` (empty string). It can't be skipped. That's
	 * done intentionally, to keep signature monomorphic for high speed.
	 **/
	Ruler.prototype.getRules = function (chainName) {
	  if (this.__cache__ === null) {
	    this.__compile__();
	  }

	  // Chain can be empty, if rules disabled. But we still have to return Array.
	  return this.__cache__[chainName] || [];
	};

	// Token class

	/**
	 * class Token
	 **/

	/**
	 * new Token(type, tag, nesting)
	 *
	 * Create new token and fill passed properties.
	 **/
	function Token(type, tag, nesting) {
	  /**
	   * Token#type -> String
	   *
	   * Type of the token (string, e.g. "paragraph_open")
	   **/
	  this.type = type;

	  /**
	   * Token#tag -> String
	   *
	   * html tag name, e.g. "p"
	   **/
	  this.tag = tag;

	  /**
	   * Token#attrs -> Array
	   *
	   * Html attributes. Format: `[ [ name1, value1 ], [ name2, value2 ] ]`
	   **/
	  this.attrs = null;

	  /**
	   * Token#map -> Array
	   *
	   * Source map info. Format: `[ line_begin, line_end ]`
	   **/
	  this.map = null;

	  /**
	   * Token#nesting -> Number
	   *
	   * Level change (number in {-1, 0, 1} set), where:
	   *
	   * -  `1` means the tag is opening
	   * -  `0` means the tag is self-closing
	   * - `-1` means the tag is closing
	   **/
	  this.nesting = nesting;

	  /**
	   * Token#level -> Number
	   *
	   * nesting level, the same as `state.level`
	   **/
	  this.level = 0;

	  /**
	   * Token#children -> Array
	   *
	   * An array of child nodes (inline and img tokens)
	   **/
	  this.children = null;

	  /**
	   * Token#content -> String
	   *
	   * In a case of self-closing tag (code, html, fence, etc.),
	   * it has contents of this tag.
	   **/
	  this.content = '';

	  /**
	   * Token#markup -> String
	   *
	   * '*' or '_' for emphasis, fence string for fence, etc.
	   **/
	  this.markup = '';

	  /**
	   * Token#info -> String
	   *
	   * Additional information:
	   *
	   * - Info string for "fence" tokens
	   * - The value "auto" for autolink "link_open" and "link_close" tokens
	   * - The string value of the item marker for ordered-list "list_item_open" tokens
	   **/
	  this.info = '';

	  /**
	   * Token#meta -> Object
	   *
	   * A place for plugins to store an arbitrary data
	   **/
	  this.meta = null;

	  /**
	   * Token#block -> Boolean
	   *
	   * True for block-level tokens, false for inline tokens.
	   * Used in renderer to calculate line breaks
	   **/
	  this.block = false;

	  /**
	   * Token#hidden -> Boolean
	   *
	   * If it's true, ignore this element when rendering. Used for tight lists
	   * to hide paragraphs.
	   **/
	  this.hidden = false;
	}

	/**
	 * Token.attrIndex(name) -> Number
	 *
	 * Search attribute index by name.
	 **/
	Token.prototype.attrIndex = function attrIndex(name) {
	  if (!this.attrs) {
	    return -1;
	  }
	  const attrs = this.attrs;
	  for (let i = 0, len = attrs.length; i < len; i++) {
	    if (attrs[i][0] === name) {
	      return i;
	    }
	  }
	  return -1;
	};

	/**
	 * Token.attrPush(attrData)
	 *
	 * Add `[ name, value ]` attribute to list. Init attrs if necessary
	 **/
	Token.prototype.attrPush = function attrPush(attrData) {
	  if (this.attrs) {
	    this.attrs.push(attrData);
	  } else {
	    this.attrs = [attrData];
	  }
	};

	/**
	 * Token.attrSet(name, value)
	 *
	 * Set `name` attribute to `value`. Override old value if exists.
	 **/
	Token.prototype.attrSet = function attrSet(name, value) {
	  const idx = this.attrIndex(name);
	  const attrData = [name, value];
	  if (idx < 0) {
	    this.attrPush(attrData);
	  } else {
	    this.attrs[idx] = attrData;
	  }
	};

	/**
	 * Token.attrGet(name)
	 *
	 * Get the value of attribute `name`, or null if it does not exist.
	 **/
	Token.prototype.attrGet = function attrGet(name) {
	  const idx = this.attrIndex(name);
	  let value = null;
	  if (idx >= 0) {
	    value = this.attrs[idx][1];
	  }
	  return value;
	};

	/**
	 * Token.attrJoin(name, value)
	 *
	 * Join value to existing attribute via space. Or create new attribute if not
	 * exists. Useful to operate with token classes.
	 **/
	Token.prototype.attrJoin = function attrJoin(name, value) {
	  const idx = this.attrIndex(name);
	  if (idx < 0) {
	    this.attrPush([name, value]);
	  } else {
	    this.attrs[idx][1] = this.attrs[idx][1] + ' ' + value;
	  }
	};

	// Core state object
	//

	function StateCore(src, md, env) {
	  this.src = src;
	  this.env = env;
	  this.tokens = [];
	  this.inlineMode = false;
	  this.md = md; // link to parser instance
	}

	// re-export Token class to use in core rules
	StateCore.prototype.Token = Token;

	// Normalize input string

	// https://spec.commonmark.org/0.29/#line-ending
	const NEWLINES_RE = /\r\n?|\n/g;
	const NULL_RE = /\0/g;
	function normalize(state) {
	  let str;

	  // Normalize newlines
	  str = state.src.replace(NEWLINES_RE, '\n');

	  // Replace NULL characters
	  str = str.replace(NULL_RE, '\uFFFD');
	  state.src = str;
	}

	function block(state) {
	  let token;
	  if (state.inlineMode) {
	    token = new state.Token('inline', '', 0);
	    token.content = state.src;
	    token.map = [0, 1];
	    token.children = [];
	    state.tokens.push(token);
	  } else {
	    state.md.block.parse(state.src, state.md, state.env, state.tokens);
	  }
	}

	function inline(state) {
	  const tokens = state.tokens;

	  // Parse inlines
	  for (let i = 0, l = tokens.length; i < l; i++) {
	    const tok = tokens[i];
	    if (tok.type === 'inline') {
	      state.md.inline.parse(tok.content, state.md, state.env, tok.children);
	    }
	  }
	}

	// Replace link-like texts with link nodes.
	//
	// Currently restricted by `md.validateLink()` to http/https/ftp
	//

	function isLinkOpen$1(str) {
	  return /^<a[>\s]/i.test(str);
	}
	function isLinkClose$1(str) {
	  return /^<\/a\s*>/i.test(str);
	}
	function linkify$1(state) {
	  const blockTokens = state.tokens;
	  if (!state.md.options.linkify) {
	    return;
	  }
	  for (let j = 0, l = blockTokens.length; j < l; j++) {
	    if (blockTokens[j].type !== 'inline' || !state.md.linkify.pretest(blockTokens[j].content)) {
	      continue;
	    }
	    let tokens = blockTokens[j].children;
	    let htmlLinkLevel = 0;

	    // We scan from the end, to keep position when new tags added.
	    // Use reversed logic in links start/end match
	    for (let i = tokens.length - 1; i >= 0; i--) {
	      const currentToken = tokens[i];

	      // Skip content of markdown links
	      if (currentToken.type === 'link_close') {
	        i--;
	        while (tokens[i].level !== currentToken.level && tokens[i].type !== 'link_open') {
	          i--;
	        }
	        continue;
	      }

	      // Skip content of html tag links
	      if (currentToken.type === 'html_inline') {
	        if (isLinkOpen$1(currentToken.content) && htmlLinkLevel > 0) {
	          htmlLinkLevel--;
	        }
	        if (isLinkClose$1(currentToken.content)) {
	          htmlLinkLevel++;
	        }
	      }
	      if (htmlLinkLevel > 0) {
	        continue;
	      }
	      if (currentToken.type === 'text' && state.md.linkify.test(currentToken.content)) {
	        const text = currentToken.content;
	        let links = state.md.linkify.match(text);

	        // Now split string to nodes
	        const nodes = [];
	        let level = currentToken.level;
	        let lastPos = 0;

	        // forbid escape sequence at the start of the string,
	        // this avoids http\://example.com/ from being linkified as
	        // http:<a href="//example.com/">//example.com/</a>
	        if (links.length > 0 && links[0].index === 0 && i > 0 && tokens[i - 1].type === 'text_special') {
	          links = links.slice(1);
	        }
	        for (let ln = 0; ln < links.length; ln++) {
	          const url = links[ln].url;
	          const fullUrl = state.md.normalizeLink(url);
	          if (!state.md.validateLink(fullUrl)) {
	            continue;
	          }
	          let urlText = links[ln].text;

	          // Linkifier might send raw hostnames like "example.com", where url
	          // starts with domain name. So we prepend http:// in those cases,
	          // and remove it afterwards.
	          //
	          if (!links[ln].schema) {
	            urlText = state.md.normalizeLinkText('http://' + urlText).replace(/^http:\/\//, '');
	          } else if (links[ln].schema === 'mailto:' && !/^mailto:/i.test(urlText)) {
	            urlText = state.md.normalizeLinkText('mailto:' + urlText).replace(/^mailto:/, '');
	          } else {
	            urlText = state.md.normalizeLinkText(urlText);
	          }
	          const pos = links[ln].index;
	          if (pos > lastPos) {
	            const token = new state.Token('text', '', 0);
	            token.content = text.slice(lastPos, pos);
	            token.level = level;
	            nodes.push(token);
	          }
	          const token_o = new state.Token('link_open', 'a', 1);
	          token_o.attrs = [['href', fullUrl]];
	          token_o.level = level++;
	          token_o.markup = 'linkify';
	          token_o.info = 'auto';
	          nodes.push(token_o);
	          const token_t = new state.Token('text', '', 0);
	          token_t.content = urlText;
	          token_t.level = level;
	          nodes.push(token_t);
	          const token_c = new state.Token('link_close', 'a', -1);
	          token_c.level = --level;
	          token_c.markup = 'linkify';
	          token_c.info = 'auto';
	          nodes.push(token_c);
	          lastPos = links[ln].lastIndex;
	        }
	        if (lastPos < text.length) {
	          const token = new state.Token('text', '', 0);
	          token.content = text.slice(lastPos);
	          token.level = level;
	          nodes.push(token);
	        }

	        // replace current node
	        blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
	      }
	    }
	  }
	}

	// Simple typographic replacements
	//
	// (c) (C) → ©
	// (tm) (TM) → ™
	// (r) (R) → ®
	// +- → ±
	// ... → … (also ?.... → ?.., !.... → !..)
	// ???????? → ???, !!!!! → !!!, `,,` → `,`
	// -- → &ndash;, --- → &mdash;
	//

	// TODO:
	// - fractionals 1/2, 1/4, 3/4 -> ½, ¼, ¾
	// - multiplications 2 x 4 -> 2 × 4

	const RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;

	// Workaround for phantomjs - need regex without /g flag,
	// or root check will fail every second time
	const SCOPED_ABBR_TEST_RE = /\((c|tm|r)\)/i;
	const SCOPED_ABBR_RE = /\((c|tm|r)\)/ig;
	const SCOPED_ABBR = {
	  c: '©',
	  r: '®',
	  tm: '™'
	};
	function replaceFn(match, name) {
	  return SCOPED_ABBR[name.toLowerCase()];
	}
	function replace_scoped(inlineTokens) {
	  let inside_autolink = 0;
	  for (let i = inlineTokens.length - 1; i >= 0; i--) {
	    const token = inlineTokens[i];
	    if (token.type === 'text' && !inside_autolink) {
	      token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
	    }
	    if (token.type === 'link_open' && token.info === 'auto') {
	      inside_autolink--;
	    }
	    if (token.type === 'link_close' && token.info === 'auto') {
	      inside_autolink++;
	    }
	  }
	}
	function replace_rare(inlineTokens) {
	  let inside_autolink = 0;
	  for (let i = inlineTokens.length - 1; i >= 0; i--) {
	    const token = inlineTokens[i];
	    if (token.type === 'text' && !inside_autolink) {
	      if (RARE_RE.test(token.content)) {
	        token.content = token.content.replace(/\+-/g, '±')
	        // .., ..., ....... -> …
	        // but ?..... & !..... -> ?.. & !..
	        .replace(/\.{2,}/g, '…').replace(/([?!])…/g, '$1..').replace(/([?!]){4,}/g, '$1$1$1').replace(/,{2,}/g, ',')
	        // em-dash
	        .replace(/(^|[^-])---(?=[^-]|$)/mg, '$1\u2014')
	        // en-dash
	        .replace(/(^|\s)--(?=\s|$)/mg, '$1\u2013').replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, '$1\u2013');
	      }
	    }
	    if (token.type === 'link_open' && token.info === 'auto') {
	      inside_autolink--;
	    }
	    if (token.type === 'link_close' && token.info === 'auto') {
	      inside_autolink++;
	    }
	  }
	}
	function replace(state) {
	  let blkIdx;
	  if (!state.md.options.typographer) {
	    return;
	  }
	  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
	    if (state.tokens[blkIdx].type !== 'inline') {
	      continue;
	    }
	    if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
	      replace_scoped(state.tokens[blkIdx].children);
	    }
	    if (RARE_RE.test(state.tokens[blkIdx].content)) {
	      replace_rare(state.tokens[blkIdx].children);
	    }
	  }
	}

	// Convert straight quotation marks to typographic ones
	//

	const QUOTE_TEST_RE = /['"]/;
	const QUOTE_RE = /['"]/g;
	const APOSTROPHE = '\u2019'; /* ’ */

	function replaceAt(str, index, ch) {
	  return str.slice(0, index) + ch + str.slice(index + 1);
	}
	function process_inlines(tokens, state) {
	  let j;
	  const stack = [];
	  for (let i = 0; i < tokens.length; i++) {
	    const token = tokens[i];
	    const thisLevel = tokens[i].level;
	    for (j = stack.length - 1; j >= 0; j--) {
	      if (stack[j].level <= thisLevel) {
	        break;
	      }
	    }
	    stack.length = j + 1;
	    if (token.type !== 'text') {
	      continue;
	    }
	    let text = token.content;
	    let pos = 0;
	    let max = text.length;

	    /* eslint no-labels:0,block-scoped-var:0 */
	    OUTER: while (pos < max) {
	      QUOTE_RE.lastIndex = pos;
	      const t = QUOTE_RE.exec(text);
	      if (!t) {
	        break;
	      }
	      let canOpen = true;
	      let canClose = true;
	      pos = t.index + 1;
	      const isSingle = t[0] === "'";

	      // Find previous character,
	      // default to space if it's the beginning of the line
	      //
	      let lastChar = 0x20;
	      if (t.index - 1 >= 0) {
	        lastChar = text.charCodeAt(t.index - 1);
	      } else {
	        for (j = i - 1; j >= 0; j--) {
	          if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break; // lastChar defaults to 0x20
	          if (!tokens[j].content) continue; // should skip all tokens except 'text', 'html_inline' or 'code_inline'

	          lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
	          break;
	        }
	      }

	      // Find next character,
	      // default to space if it's the end of the line
	      //
	      let nextChar = 0x20;
	      if (pos < max) {
	        nextChar = text.charCodeAt(pos);
	      } else {
	        for (j = i + 1; j < tokens.length; j++) {
	          if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break; // nextChar defaults to 0x20
	          if (!tokens[j].content) continue; // should skip all tokens except 'text', 'html_inline' or 'code_inline'

	          nextChar = tokens[j].content.charCodeAt(0);
	          break;
	        }
	      }
	      const isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
	      const isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
	      const isLastWhiteSpace = isWhiteSpace(lastChar);
	      const isNextWhiteSpace = isWhiteSpace(nextChar);
	      if (isNextWhiteSpace) {
	        canOpen = false;
	      } else if (isNextPunctChar) {
	        if (!(isLastWhiteSpace || isLastPunctChar)) {
	          canOpen = false;
	        }
	      }
	      if (isLastWhiteSpace) {
	        canClose = false;
	      } else if (isLastPunctChar) {
	        if (!(isNextWhiteSpace || isNextPunctChar)) {
	          canClose = false;
	        }
	      }
	      if (nextChar === 0x22 /* " */ && t[0] === '"') {
	        if (lastChar >= 0x30 /* 0 */ && lastChar <= 0x39 /* 9 */) {
	          // special case: 1"" - count first quote as an inch
	          canClose = canOpen = false;
	        }
	      }
	      if (canOpen && canClose) {
	        // Replace quotes in the middle of punctuation sequence, but not
	        // in the middle of the words, i.e.:
	        //
	        // 1. foo " bar " baz - not replaced
	        // 2. foo-"-bar-"-baz - replaced
	        // 3. foo"bar"baz     - not replaced
	        //
	        canOpen = isLastPunctChar;
	        canClose = isNextPunctChar;
	      }
	      if (!canOpen && !canClose) {
	        // middle of word
	        if (isSingle) {
	          token.content = replaceAt(token.content, t.index, APOSTROPHE);
	        }
	        continue;
	      }
	      if (canClose) {
	        // this could be a closing quote, rewind the stack to get a match
	        for (j = stack.length - 1; j >= 0; j--) {
	          let item = stack[j];
	          if (stack[j].level < thisLevel) {
	            break;
	          }
	          if (item.single === isSingle && stack[j].level === thisLevel) {
	            item = stack[j];
	            let openQuote;
	            let closeQuote;
	            if (isSingle) {
	              openQuote = state.md.options.quotes[2];
	              closeQuote = state.md.options.quotes[3];
	            } else {
	              openQuote = state.md.options.quotes[0];
	              closeQuote = state.md.options.quotes[1];
	            }

	            // replace token.content *before* tokens[item.token].content,
	            // because, if they are pointing at the same token, replaceAt
	            // could mess up indices when quote length != 1
	            token.content = replaceAt(token.content, t.index, closeQuote);
	            tokens[item.token].content = replaceAt(tokens[item.token].content, item.pos, openQuote);
	            pos += closeQuote.length - 1;
	            if (item.token === i) {
	              pos += openQuote.length - 1;
	            }
	            text = token.content;
	            max = text.length;
	            stack.length = j;
	            continue OUTER;
	          }
	        }
	      }
	      if (canOpen) {
	        stack.push({
	          token: i,
	          pos: t.index,
	          single: isSingle,
	          level: thisLevel
	        });
	      } else if (canClose && isSingle) {
	        token.content = replaceAt(token.content, t.index, APOSTROPHE);
	      }
	    }
	  }
	}
	function smartquotes(state) {
	  /* eslint max-depth:0 */
	  if (!state.md.options.typographer) {
	    return;
	  }
	  for (let blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
	    if (state.tokens[blkIdx].type !== 'inline' || !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
	      continue;
	    }
	    process_inlines(state.tokens[blkIdx].children, state);
	  }
	}

	// Join raw text tokens with the rest of the text
	//
	// This is set as a separate rule to provide an opportunity for plugins
	// to run text replacements after text join, but before escape join.
	//
	// For example, `\:)` shouldn't be replaced with an emoji.
	//

	function text_join(state) {
	  let curr, last;
	  const blockTokens = state.tokens;
	  const l = blockTokens.length;
	  for (let j = 0; j < l; j++) {
	    if (blockTokens[j].type !== 'inline') continue;
	    const tokens = blockTokens[j].children;
	    const max = tokens.length;
	    for (curr = 0; curr < max; curr++) {
	      if (tokens[curr].type === 'text_special') {
	        tokens[curr].type = 'text';
	      }
	    }
	    for (curr = last = 0; curr < max; curr++) {
	      if (tokens[curr].type === 'text' && curr + 1 < max && tokens[curr + 1].type === 'text') {
	        // collapse two adjacent text nodes
	        tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
	      } else {
	        if (curr !== last) {
	          tokens[last] = tokens[curr];
	        }
	        last++;
	      }
	    }
	    if (curr !== last) {
	      tokens.length = last;
	    }
	  }
	}

	/** internal
	 * class Core
	 *
	 * Top-level rules executor. Glues block/inline parsers and does intermediate
	 * transformations.
	 **/

	const _rules$2 = [['normalize', normalize], ['block', block], ['inline', inline], ['linkify', linkify$1], ['replacements', replace], ['smartquotes', smartquotes],
	// `text_join` finds `text_special` tokens (for escape sequences)
	// and joins them with the rest of the text
	['text_join', text_join]];

	/**
	 * new Core()
	 **/
	function Core() {
	  /**
	   * Core#ruler -> Ruler
	   *
	   * [[Ruler]] instance. Keep configuration of core rules.
	   **/
	  this.ruler = new Ruler();
	  for (let i = 0; i < _rules$2.length; i++) {
	    this.ruler.push(_rules$2[i][0], _rules$2[i][1]);
	  }
	}

	/**
	 * Core.process(state)
	 *
	 * Executes core chain rules.
	 **/
	Core.prototype.process = function (state) {
	  const rules = this.ruler.getRules('');
	  for (let i = 0, l = rules.length; i < l; i++) {
	    rules[i](state);
	  }
	};
	Core.prototype.State = StateCore;

	// Parser state class

	function StateBlock(src, md, env, tokens) {
	  this.src = src;

	  // link to parser instance
	  this.md = md;
	  this.env = env;

	  //
	  // Internal state vartiables
	  //

	  this.tokens = tokens;
	  this.bMarks = []; // line begin offsets for fast jumps
	  this.eMarks = []; // line end offsets for fast jumps
	  this.tShift = []; // offsets of the first non-space characters (tabs not expanded)
	  this.sCount = []; // indents for each line (tabs expanded)

	  // An amount of virtual spaces (tabs expanded) between beginning
	  // of each line (bMarks) and real beginning of that line.
	  //
	  // It exists only as a hack because blockquotes override bMarks
	  // losing information in the process.
	  //
	  // It's used only when expanding tabs, you can think about it as
	  // an initial tab length, e.g. bsCount=21 applied to string `\t123`
	  // means first tab should be expanded to 4-21%4 === 3 spaces.
	  //
	  this.bsCount = [];

	  // block parser variables

	  // required block content indent (for example, if we are
	  // inside a list, it would be positioned after list marker)
	  this.blkIndent = 0;
	  this.line = 0; // line index in src
	  this.lineMax = 0; // lines count
	  this.tight = false; // loose/tight mode for lists
	  this.ddIndent = -1; // indent of the current dd block (-1 if there isn't any)
	  this.listIndent = -1; // indent of the current list block (-1 if there isn't any)

	  // can be 'blockquote', 'list', 'root', 'paragraph' or 'reference'
	  // used in lists to determine if they interrupt a paragraph
	  this.parentType = 'root';
	  this.level = 0;

	  // Create caches
	  // Generate markers.
	  const s = this.src;
	  for (let start = 0, pos = 0, indent = 0, offset = 0, len = s.length, indent_found = false; pos < len; pos++) {
	    const ch = s.charCodeAt(pos);
	    if (!indent_found) {
	      if (isSpace(ch)) {
	        indent++;
	        if (ch === 0x09) {
	          offset += 4 - offset % 4;
	        } else {
	          offset++;
	        }
	        continue;
	      } else {
	        indent_found = true;
	      }
	    }
	    if (ch === 0x0A || pos === len - 1) {
	      if (ch !== 0x0A) {
	        pos++;
	      }
	      this.bMarks.push(start);
	      this.eMarks.push(pos);
	      this.tShift.push(indent);
	      this.sCount.push(offset);
	      this.bsCount.push(0);
	      indent_found = false;
	      indent = 0;
	      offset = 0;
	      start = pos + 1;
	    }
	  }

	  // Push fake entry to simplify cache bounds checks
	  this.bMarks.push(s.length);
	  this.eMarks.push(s.length);
	  this.tShift.push(0);
	  this.sCount.push(0);
	  this.bsCount.push(0);
	  this.lineMax = this.bMarks.length - 1; // don't count last fake line
	}

	// Push new token to "stream".
	//
	StateBlock.prototype.push = function (type, tag, nesting) {
	  const token = new Token(type, tag, nesting);
	  token.block = true;
	  if (nesting < 0) this.level--; // closing tag
	  token.level = this.level;
	  if (nesting > 0) this.level++; // opening tag

	  this.tokens.push(token);
	  return token;
	};
	StateBlock.prototype.isEmpty = function isEmpty(line) {
	  return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
	};
	StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
	  for (let max = this.lineMax; from < max; from++) {
	    if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
	      break;
	    }
	  }
	  return from;
	};

	// Skip spaces from given position.
	StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
	  for (let max = this.src.length; pos < max; pos++) {
	    const ch = this.src.charCodeAt(pos);
	    if (!isSpace(ch)) {
	      break;
	    }
	  }
	  return pos;
	};

	// Skip spaces from given position in reverse.
	StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
	  if (pos <= min) {
	    return pos;
	  }
	  while (pos > min) {
	    if (!isSpace(this.src.charCodeAt(--pos))) {
	      return pos + 1;
	    }
	  }
	  return pos;
	};

	// Skip char codes from given position
	StateBlock.prototype.skipChars = function skipChars(pos, code) {
	  for (let max = this.src.length; pos < max; pos++) {
	    if (this.src.charCodeAt(pos) !== code) {
	      break;
	    }
	  }
	  return pos;
	};

	// Skip char codes reverse from given position - 1
	StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code, min) {
	  if (pos <= min) {
	    return pos;
	  }
	  while (pos > min) {
	    if (code !== this.src.charCodeAt(--pos)) {
	      return pos + 1;
	    }
	  }
	  return pos;
	};

	// cut lines range from source.
	StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
	  if (begin >= end) {
	    return '';
	  }
	  const queue = new Array(end - begin);
	  for (let i = 0, line = begin; line < end; line++, i++) {
	    let lineIndent = 0;
	    const lineStart = this.bMarks[line];
	    let first = lineStart;
	    let last;
	    if (line + 1 < end || keepLastLF) {
	      // No need for bounds check because we have fake entry on tail.
	      last = this.eMarks[line] + 1;
	    } else {
	      last = this.eMarks[line];
	    }
	    while (first < last && lineIndent < indent) {
	      const ch = this.src.charCodeAt(first);
	      if (isSpace(ch)) {
	        if (ch === 0x09) {
	          lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
	        } else {
	          lineIndent++;
	        }
	      } else if (first - lineStart < this.tShift[line]) {
	        // patched tShift masked characters to look like spaces (blockquotes, list markers)
	        lineIndent++;
	      } else {
	        break;
	      }
	      first++;
	    }
	    if (lineIndent > indent) {
	      // partially expanding tabs in code blocks, e.g '\t\tfoobar'
	      // with indent=2 becomes '  \tfoobar'
	      queue[i] = new Array(lineIndent - indent + 1).join(' ') + this.src.slice(first, last);
	    } else {
	      queue[i] = this.src.slice(first, last);
	    }
	  }
	  return queue.join('');
	};

	// re-export Token class to use in block rules
	StateBlock.prototype.Token = Token;

	// GFM table, https://github.github.com/gfm/#tables-extension-


	// Limit the amount of empty autocompleted cells in a table,
	// see https://github.com/markdown-it/markdown-it/issues/1000,
	//
	// Both pulldown-cmark and commonmark-hs limit the number of cells this way to ~200k.
	// We set it to 65k, which can expand user input by a factor of x370
	// (256x256 square is 1.8kB expanded into 650kB).
	const MAX_AUTOCOMPLETED_CELLS = 0x10000;
	function getLine(state, line) {
	  const pos = state.bMarks[line] + state.tShift[line];
	  const max = state.eMarks[line];
	  return state.src.slice(pos, max);
	}
	function escapedSplit(str) {
	  const result = [];
	  const max = str.length;
	  let pos = 0;
	  let ch = str.charCodeAt(pos);
	  let isEscaped = false;
	  let lastPos = 0;
	  let current = '';
	  while (pos < max) {
	    if (ch === 0x7c /* | */) {
	      if (!isEscaped) {
	        // pipe separating cells, '|'
	        result.push(current + str.substring(lastPos, pos));
	        current = '';
	        lastPos = pos + 1;
	      } else {
	        // escaped pipe, '\|'
	        current += str.substring(lastPos, pos - 1);
	        lastPos = pos;
	      }
	    }
	    isEscaped = ch === 0x5c /* \ */;
	    pos++;
	    ch = str.charCodeAt(pos);
	  }
	  result.push(current + str.substring(lastPos));
	  return result;
	}
	function table(state, startLine, endLine, silent) {
	  // should have at least two lines
	  if (startLine + 2 > endLine) {
	    return false;
	  }
	  let nextLine = startLine + 1;
	  if (state.sCount[nextLine] < state.blkIndent) {
	    return false;
	  }

	  // if it's indented more than 3 spaces, it should be a code block
	  if (state.sCount[nextLine] - state.blkIndent >= 4) {
	    return false;
	  }

	  // first character of the second line should be '|', '-', ':',
	  // and no other characters are allowed but spaces;
	  // basically, this is the equivalent of /^[-:|][-:|\s]*$/ regexp

	  let pos = state.bMarks[nextLine] + state.tShift[nextLine];
	  if (pos >= state.eMarks[nextLine]) {
	    return false;
	  }
	  const firstCh = state.src.charCodeAt(pos++);
	  if (firstCh !== 0x7C /* | */ && firstCh !== 0x2D /* - */ && firstCh !== 0x3A /* : */) {
	    return false;
	  }
	  if (pos >= state.eMarks[nextLine]) {
	    return false;
	  }
	  const secondCh = state.src.charCodeAt(pos++);
	  if (secondCh !== 0x7C /* | */ && secondCh !== 0x2D /* - */ && secondCh !== 0x3A /* : */ && !isSpace(secondCh)) {
	    return false;
	  }

	  // if first character is '-', then second character must not be a space
	  // (due to parsing ambiguity with list)
	  if (firstCh === 0x2D /* - */ && isSpace(secondCh)) {
	    return false;
	  }
	  while (pos < state.eMarks[nextLine]) {
	    const ch = state.src.charCodeAt(pos);
	    if (ch !== 0x7C /* | */ && ch !== 0x2D /* - */ && ch !== 0x3A /* : */ && !isSpace(ch)) {
	      return false;
	    }
	    pos++;
	  }
	  let lineText = getLine(state, startLine + 1);
	  let columns = lineText.split('|');
	  const aligns = [];
	  for (let i = 0; i < columns.length; i++) {
	    const t = columns[i].trim();
	    if (!t) {
	      // allow empty columns before and after table, but not in between columns;
	      // e.g. allow ` |---| `, disallow ` ---||--- `
	      if (i === 0 || i === columns.length - 1) {
	        continue;
	      } else {
	        return false;
	      }
	    }
	    if (!/^:?-+:?$/.test(t)) {
	      return false;
	    }
	    if (t.charCodeAt(t.length - 1) === 0x3A /* : */) {
	      aligns.push(t.charCodeAt(0) === 0x3A /* : */ ? 'center' : 'right');
	    } else if (t.charCodeAt(0) === 0x3A /* : */) {
	      aligns.push('left');
	    } else {
	      aligns.push('');
	    }
	  }
	  lineText = getLine(state, startLine).trim();
	  if (lineText.indexOf('|') === -1) {
	    return false;
	  }
	  if (state.sCount[startLine] - state.blkIndent >= 4) {
	    return false;
	  }
	  columns = escapedSplit(lineText);
	  if (columns.length && columns[0] === '') columns.shift();
	  if (columns.length && columns[columns.length - 1] === '') columns.pop();

	  // header row will define an amount of columns in the entire table,
	  // and align row should be exactly the same (the rest of the rows can differ)
	  const columnCount = columns.length;
	  if (columnCount === 0 || columnCount !== aligns.length) {
	    return false;
	  }
	  if (silent) {
	    return true;
	  }
	  const oldParentType = state.parentType;
	  state.parentType = 'table';

	  // use 'blockquote' lists for termination because it's
	  // the most similar to tables
	  const terminatorRules = state.md.block.ruler.getRules('blockquote');
	  const token_to = state.push('table_open', 'table', 1);
	  const tableLines = [startLine, 0];
	  token_to.map = tableLines;
	  const token_tho = state.push('thead_open', 'thead', 1);
	  token_tho.map = [startLine, startLine + 1];
	  const token_htro = state.push('tr_open', 'tr', 1);
	  token_htro.map = [startLine, startLine + 1];
	  for (let i = 0; i < columns.length; i++) {
	    const token_ho = state.push('th_open', 'th', 1);
	    if (aligns[i]) {
	      token_ho.attrs = [['style', 'text-align:' + aligns[i]]];
	    }
	    const token_il = state.push('inline', '', 0);
	    token_il.content = columns[i].trim();
	    token_il.children = [];
	    state.push('th_close', 'th', -1);
	  }
	  state.push('tr_close', 'tr', -1);
	  state.push('thead_close', 'thead', -1);
	  let tbodyLines;
	  let autocompletedCells = 0;
	  for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
	    if (state.sCount[nextLine] < state.blkIndent) {
	      break;
	    }
	    let terminate = false;
	    for (let i = 0, l = terminatorRules.length; i < l; i++) {
	      if (terminatorRules[i](state, nextLine, endLine, true)) {
	        terminate = true;
	        break;
	      }
	    }
	    if (terminate) {
	      break;
	    }
	    lineText = getLine(state, nextLine).trim();
	    if (!lineText) {
	      break;
	    }
	    if (state.sCount[nextLine] - state.blkIndent >= 4) {
	      break;
	    }
	    columns = escapedSplit(lineText);
	    if (columns.length && columns[0] === '') columns.shift();
	    if (columns.length && columns[columns.length - 1] === '') columns.pop();

	    // note: autocomplete count can be negative if user specifies more columns than header,
	    // but that does not affect intended use (which is limiting expansion)
	    autocompletedCells += columnCount - columns.length;
	    if (autocompletedCells > MAX_AUTOCOMPLETED_CELLS) {
	      break;
	    }
	    if (nextLine === startLine + 2) {
	      const token_tbo = state.push('tbody_open', 'tbody', 1);
	      token_tbo.map = tbodyLines = [startLine + 2, 0];
	    }
	    const token_tro = state.push('tr_open', 'tr', 1);
	    token_tro.map = [nextLine, nextLine + 1];
	    for (let i = 0; i < columnCount; i++) {
	      const token_tdo = state.push('td_open', 'td', 1);
	      if (aligns[i]) {
	        token_tdo.attrs = [['style', 'text-align:' + aligns[i]]];
	      }
	      const token_il = state.push('inline', '', 0);
	      token_il.content = columns[i] ? columns[i].trim() : '';
	      token_il.children = [];
	      state.push('td_close', 'td', -1);
	    }
	    state.push('tr_close', 'tr', -1);
	  }
	  if (tbodyLines) {
	    state.push('tbody_close', 'tbody', -1);
	    tbodyLines[1] = nextLine;
	  }
	  state.push('table_close', 'table', -1);
	  tableLines[1] = nextLine;
	  state.parentType = oldParentType;
	  state.line = nextLine;
	  return true;
	}

	// Code block (4 spaces padded)

	function code(state, startLine, endLine /*, silent */) {
	  if (state.sCount[startLine] - state.blkIndent < 4) {
	    return false;
	  }
	  let nextLine = startLine + 1;
	  let last = nextLine;
	  while (nextLine < endLine) {
	    if (state.isEmpty(nextLine)) {
	      nextLine++;
	      continue;
	    }
	    if (state.sCount[nextLine] - state.blkIndent >= 4) {
	      nextLine++;
	      last = nextLine;
	      continue;
	    }
	    break;
	  }
	  state.line = last;
	  const token = state.push('code_block', 'code', 0);
	  token.content = state.getLines(startLine, last, 4 + state.blkIndent, false) + '\n';
	  token.map = [startLine, state.line];
	  return true;
	}

	// fences (``` lang, ~~~ lang)

	function fence(state, startLine, endLine, silent) {
	  let pos = state.bMarks[startLine] + state.tShift[startLine];
	  let max = state.eMarks[startLine];

	  // if it's indented more than 3 spaces, it should be a code block
	  if (state.sCount[startLine] - state.blkIndent >= 4) {
	    return false;
	  }
	  if (pos + 3 > max) {
	    return false;
	  }
	  const marker = state.src.charCodeAt(pos);
	  if (marker !== 0x7E /* ~ */ && marker !== 0x60 /* ` */) {
	    return false;
	  }

	  // scan marker length
	  let mem = pos;
	  pos = state.skipChars(pos, marker);
	  let len = pos - mem;
	  if (len < 3) {
	    return false;
	  }
	  const markup = state.src.slice(mem, pos);
	  const params = state.src.slice(pos, max);
	  if (marker === 0x60 /* ` */) {
	    if (params.indexOf(String.fromCharCode(marker)) >= 0) {
	      return false;
	    }
	  }

	  // Since start is found, we can report success here in validation mode
	  if (silent) {
	    return true;
	  }

	  // search end of block
	  let nextLine = startLine;
	  let haveEndMarker = false;
	  for (;;) {
	    nextLine++;
	    if (nextLine >= endLine) {
	      // unclosed block should be autoclosed by end of document.
	      // also block seems to be autoclosed by end of parent
	      break;
	    }
	    pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
	    max = state.eMarks[nextLine];
	    if (pos < max && state.sCount[nextLine] < state.blkIndent) {
	      // non-empty line with negative indent should stop the list:
	      // - ```
	      //  test
	      break;
	    }
	    if (state.src.charCodeAt(pos) !== marker) {
	      continue;
	    }
	    if (state.sCount[nextLine] - state.blkIndent >= 4) {
	      // closing fence should be indented less than 4 spaces
	      continue;
	    }
	    pos = state.skipChars(pos, marker);

	    // closing code fence must be at least as long as the opening one
	    if (pos - mem < len) {
	      continue;
	    }

	    // make sure tail has spaces only
	    pos = state.skipSpaces(pos);
	    if (pos < max) {
	      continue;
	    }
	    haveEndMarker = true;
	    // found!
	    break;
	  }

	  // If a fence has heading spaces, they should be removed from its inner block
	  len = state.sCount[startLine];
	  state.line = nextLine + (haveEndMarker ? 1 : 0);
	  const token = state.push('fence', 'code', 0);
	  token.info = params;
	  token.content = state.getLines(startLine + 1, nextLine, len, true);
	  token.markup = markup;
	  token.map = [startLine, state.line];
	  return true;
	}

	// Block quotes

	function blockquote(state, startLine, endLine, silent) {
	  let pos = state.bMarks[startLine] + state.tShift[startLine];
	  let max = state.eMarks[startLine];
	  const oldLineMax = state.lineMax;

	  // if it's indented more than 3 spaces, it should be a code block
	  if (state.sCount[startLine] - state.blkIndent >= 4) {
	    return false;
	  }

	  // check the block quote marker
	  if (state.src.charCodeAt(pos) !== 0x3E /* > */) {
	    return false;
	  }

	  // we know that it's going to be a valid blockquote,
	  // so no point trying to find the end of it in silent mode
	  if (silent) {
	    return true;
	  }
	  const oldBMarks = [];
	  const oldBSCount = [];
	  const oldSCount = [];
	  const oldTShift = [];
	  const terminatorRules = state.md.block.ruler.getRules('blockquote');
	  const oldParentType = state.parentType;
	  state.parentType = 'blockquote';
	  let lastLineEmpty = false;
	  let nextLine;

	  // Search the end of the block
	  //
	  // Block ends with either:
	  //  1. an empty line outside:
	  //     ```
	  //     > test
	  //
	  //     ```
	  //  2. an empty line inside:
	  //     ```
	  //     >
	  //     test
	  //     ```
	  //  3. another tag:
	  //     ```
	  //     > test
	  //      - - -
	  //     ```
	  for (nextLine = startLine; nextLine < endLine; nextLine++) {
	    // check if it's outdented, i.e. it's inside list item and indented
	    // less than said list item:
	    //
	    // ```
	    // 1. anything
	    //    > current blockquote
	    // 2. checking this line
	    // ```
	    const isOutdented = state.sCount[nextLine] < state.blkIndent;
	    pos = state.bMarks[nextLine] + state.tShift[nextLine];
	    max = state.eMarks[nextLine];
	    if (pos >= max) {
	      // Case 1: line is not inside the blockquote, and this line is empty.
	      break;
	    }
	    if (state.src.charCodeAt(pos++) === 0x3E /* > */ && !isOutdented) {
	      // This line is inside the blockquote.

	      // set offset past spaces and ">"
	      let initial = state.sCount[nextLine] + 1;
	      let spaceAfterMarker;
	      let adjustTab;

	      // skip one optional space after '>'
	      if (state.src.charCodeAt(pos) === 0x20 /* space */) {
	        // ' >   test '
	        //     ^ -- position start of line here:
	        pos++;
	        initial++;
	        adjustTab = false;
	        spaceAfterMarker = true;
	      } else if (state.src.charCodeAt(pos) === 0x09 /* tab */) {
	        spaceAfterMarker = true;
	        if ((state.bsCount[nextLine] + initial) % 4 === 3) {
	          // '  >\t  test '
	          //       ^ -- position start of line here (tab has width===1)
	          pos++;
	          initial++;
	          adjustTab = false;
	        } else {
	          // ' >\t  test '
	          //    ^ -- position start of line here + shift bsCount slightly
	          //         to make extra space appear
	          adjustTab = true;
	        }
	      } else {
	        spaceAfterMarker = false;
	      }
	      let offset = initial;
	      oldBMarks.push(state.bMarks[nextLine]);
	      state.bMarks[nextLine] = pos;
	      while (pos < max) {
	        const ch = state.src.charCodeAt(pos);
	        if (isSpace(ch)) {
	          if (ch === 0x09) {
	            offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
	          } else {
	            offset++;
	          }
	        } else {
	          break;
	        }
	        pos++;
	      }
	      lastLineEmpty = pos >= max;
	      oldBSCount.push(state.bsCount[nextLine]);
	      state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);
	      oldSCount.push(state.sCount[nextLine]);
	      state.sCount[nextLine] = offset - initial;
	      oldTShift.push(state.tShift[nextLine]);
	      state.tShift[nextLine] = pos - state.bMarks[nextLine];
	      continue;
	    }

	    // Case 2: line is not inside the blockquote, and the last line was empty.
	    if (lastLineEmpty) {
	      break;
	    }

	    // Case 3: another tag found.
	    let terminate = false;
	    for (let i = 0, l = terminatorRules.length; i < l; i++) {
	      if (terminatorRules[i](state, nextLine, endLine, true)) {
	        terminate = true;
	        break;
	      }
	    }
	    if (terminate) {
	      // Quirk to enforce "hard termination mode" for paragraphs;
	      // normally if you call `tokenize(state, startLine, nextLine)`,
	      // paragraphs will look below nextLine for paragraph continuation,
	      // but if blockquote is terminated by another tag, they shouldn't
	      state.lineMax = nextLine;
	      if (state.blkIndent !== 0) {
	        // state.blkIndent was non-zero, we now set it to zero,
	        // so we need to re-calculate all offsets to appear as
	        // if indent wasn't changed
	        oldBMarks.push(state.bMarks[nextLine]);
	        oldBSCount.push(state.bsCount[nextLine]);
	        oldTShift.push(state.tShift[nextLine]);
	        oldSCount.push(state.sCount[nextLine]);
	        state.sCount[nextLine] -= state.blkIndent;
	      }
	      break;
	    }
	    oldBMarks.push(state.bMarks[nextLine]);
	    oldBSCount.push(state.bsCount[nextLine]);
	    oldTShift.push(state.tShift[nextLine]);
	    oldSCount.push(state.sCount[nextLine]);

	    // A negative indentation means that this is a paragraph continuation
	    //
	    state.sCount[nextLine] = -1;
	  }
	  const oldIndent = state.blkIndent;
	  state.blkIndent = 0;
	  const token_o = state.push('blockquote_open', 'blockquote', 1);
	  token_o.markup = '>';
	  const lines = [startLine, 0];
	  token_o.map = lines;
	  state.md.block.tokenize(state, startLine, nextLine);
	  const token_c = state.push('blockquote_close', 'blockquote', -1);
	  token_c.markup = '>';
	  state.lineMax = oldLineMax;
	  state.parentType = oldParentType;
	  lines[1] = state.line;

	  // Restore original tShift; this might not be necessary since the parser
	  // has already been here, but just to make sure we can do that.
	  for (let i = 0; i < oldTShift.length; i++) {
	    state.bMarks[i + startLine] = oldBMarks[i];
	    state.tShift[i + startLine] = oldTShift[i];
	    state.sCount[i + startLine] = oldSCount[i];
	    state.bsCount[i + startLine] = oldBSCount[i];
	  }
	  state.blkIndent = oldIndent;
	  return true;
	}

	// Horizontal rule

	function hr(state, startLine, endLine, silent) {
	  const max = state.eMarks[startLine];
	  // if it's indented more than 3 spaces, it should be a code block
	  if (state.sCount[startLine] - state.blkIndent >= 4) {
	    return false;
	  }
	  let pos = state.bMarks[startLine] + state.tShift[startLine];
	  const marker = state.src.charCodeAt(pos++);

	  // Check hr marker
	  if (marker !== 0x2A /* * */ && marker !== 0x2D /* - */ && marker !== 0x5F /* _ */) {
	    return false;
	  }

	  // markers can be mixed with spaces, but there should be at least 3 of them

	  let cnt = 1;
	  while (pos < max) {
	    const ch = state.src.charCodeAt(pos++);
	    if (ch !== marker && !isSpace(ch)) {
	      return false;
	    }
	    if (ch === marker) {
	      cnt++;
	    }
	  }
	  if (cnt < 3) {
	    return false;
	  }
	  if (silent) {
	    return true;
	  }
	  state.line = startLine + 1;
	  const token = state.push('hr', 'hr', 0);
	  token.map = [startLine, state.line];
	  token.markup = Array(cnt + 1).join(String.fromCharCode(marker));
	  return true;
	}

	// Lists


	// Search `[-+*][\n ]`, returns next pos after marker on success
	// or -1 on fail.
	function skipBulletListMarker(state, startLine) {
	  const max = state.eMarks[startLine];
	  let pos = state.bMarks[startLine] + state.tShift[startLine];
	  const marker = state.src.charCodeAt(pos++);
	  // Check bullet
	  if (marker !== 0x2A /* * */ && marker !== 0x2D /* - */ && marker !== 0x2B /* + */) {
	    return -1;
	  }
	  if (pos < max) {
	    const ch = state.src.charCodeAt(pos);
	    if (!isSpace(ch)) {
	      // " -test " - is not a list item
	      return -1;
	    }
	  }
	  return pos;
	}

	// Search `\d+[.)][\n ]`, returns next pos after marker on success
	// or -1 on fail.
	function skipOrderedListMarker(state, startLine) {
	  const start = state.bMarks[startLine] + state.tShift[startLine];
	  const max = state.eMarks[startLine];
	  let pos = start;

	  // List marker should have at least 2 chars (digit + dot)
	  if (pos + 1 >= max) {
	    return -1;
	  }
	  let ch = state.src.charCodeAt(pos++);
	  if (ch < 0x30 /* 0 */ || ch > 0x39 /* 9 */) {
	    return -1;
	  }
	  for (;;) {
	    // EOL -> fail
	    if (pos >= max) {
	      return -1;
	    }
	    ch = state.src.charCodeAt(pos++);
	    if (ch >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */) {
	      // List marker should have no more than 9 digits
	      // (prevents integer overflow in browsers)
	      if (pos - start >= 10) {
	        return -1;
	      }
	      continue;
	    }

	    // found valid marker
	    if (ch === 0x29 /* ) */ || ch === 0x2e /* . */) {
	      break;
	    }
	    return -1;
	  }
	  if (pos < max) {
	    ch = state.src.charCodeAt(pos);
	    if (!isSpace(ch)) {
	      // " 1.test " - is not a list item
	      return -1;
	    }
	  }
	  return pos;
	}
	function markTightParagraphs(state, idx) {
	  const level = state.level + 2;
	  for (let i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
	    if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
	      state.tokens[i + 2].hidden = true;
	      state.tokens[i].hidden = true;
	      i += 2;
	    }
	  }
	}
	function list(state, startLine, endLine, silent) {
	  let max, pos, start, token;
	  let nextLine = startLine;
	  let tight = true;

	  // if it's indented more than 3 spaces, it should be a code block
	  if (state.sCount[nextLine] - state.blkIndent >= 4) {
	    return false;
	  }

	  // Special case:
	  //  - item 1
	  //   - item 2
	  //    - item 3
	  //     - item 4
	  //      - this one is a paragraph continuation
	  if (state.listIndent >= 0 && state.sCount[nextLine] - state.listIndent >= 4 && state.sCount[nextLine] < state.blkIndent) {
	    return false;
	  }
	  let isTerminatingParagraph = false;

	  // limit conditions when list can interrupt
	  // a paragraph (validation mode only)
	  if (silent && state.parentType === 'paragraph') {
	    // Next list item should still terminate previous list item;
	    //
	    // This code can fail if plugins use blkIndent as well as lists,
	    // but I hope the spec gets fixed long before that happens.
	    //
	    if (state.sCount[nextLine] >= state.blkIndent) {
	      isTerminatingParagraph = true;
	    }
	  }

	  // Detect list type and position after marker
	  let isOrdered;
	  let markerValue;
	  let posAfterMarker;
	  if ((posAfterMarker = skipOrderedListMarker(state, nextLine)) >= 0) {
	    isOrdered = true;
	    start = state.bMarks[nextLine] + state.tShift[nextLine];
	    markerValue = Number(state.src.slice(start, posAfterMarker - 1));

	    // If we're starting a new ordered list right after
	    // a paragraph, it should start with 1.
	    if (isTerminatingParagraph && markerValue !== 1) return false;
	  } else if ((posAfterMarker = skipBulletListMarker(state, nextLine)) >= 0) {
	    isOrdered = false;
	  } else {
	    return false;
	  }

	  // If we're starting a new unordered list right after
	  // a paragraph, first line should not be empty.
	  if (isTerminatingParagraph) {
	    if (state.skipSpaces(posAfterMarker) >= state.eMarks[nextLine]) return false;
	  }

	  // For validation mode we can terminate immediately
	  if (silent) {
	    return true;
	  }

	  // We should terminate list on style change. Remember first one to compare.
	  const markerCharCode = state.src.charCodeAt(posAfterMarker - 1);

	  // Start list
	  const listTokIdx = state.tokens.length;
	  if (isOrdered) {
	    token = state.push('ordered_list_open', 'ol', 1);
	    if (markerValue !== 1) {
	      token.attrs = [['start', markerValue]];
	    }
	  } else {
	    token = state.push('bullet_list_open', 'ul', 1);
	  }
	  const listLines = [nextLine, 0];
	  token.map = listLines;
	  token.markup = String.fromCharCode(markerCharCode);

	  //
	  // Iterate list items
	  //

	  let prevEmptyEnd = false;
	  const terminatorRules = state.md.block.ruler.getRules('list');
	  const oldParentType = state.parentType;
	  state.parentType = 'list';
	  while (nextLine < endLine) {
	    pos = posAfterMarker;
	    max = state.eMarks[nextLine];
	    const initial = state.sCount[nextLine] + posAfterMarker - (state.bMarks[nextLine] + state.tShift[nextLine]);
	    let offset = initial;
	    while (pos < max) {
	      const ch = state.src.charCodeAt(pos);
	      if (ch === 0x09) {
	        offset += 4 - (offset + state.bsCount[nextLine]) % 4;
	      } else if (ch === 0x20) {
	        offset++;
	      } else {
	        break;
	      }
	      pos++;
	    }
	    const contentStart = pos;
	    let indentAfterMarker;
	    if (contentStart >= max) {
	      // trimming space in "-    \n  3" case, indent is 1 here
	      indentAfterMarker = 1;
	    } else {
	      indentAfterMarker = offset - initial;
	    }

	    // If we have more than 4 spaces, the indent is 1
	    // (the rest is just indented code block)
	    if (indentAfterMarker > 4) {
	      indentAfterMarker = 1;
	    }

	    // "  -  test"
	    //  ^^^^^ - calculating total length of this thing
	    const indent = initial + indentAfterMarker;

	    // Run subparser & write tokens
	    token = state.push('list_item_open', 'li', 1);
	    token.markup = String.fromCharCode(markerCharCode);
	    const itemLines = [nextLine, 0];
	    token.map = itemLines;
	    if (isOrdered) {
	      token.info = state.src.slice(start, posAfterMarker - 1);
	    }

	    // change current state, then restore it after parser subcall
	    const oldTight = state.tight;
	    const oldTShift = state.tShift[nextLine];
	    const oldSCount = state.sCount[nextLine];

	    //  - example list
	    // ^ listIndent position will be here
	    //   ^ blkIndent position will be here
	    //
	    const oldListIndent = state.listIndent;
	    state.listIndent = state.blkIndent;
	    state.blkIndent = indent;
	    state.tight = true;
	    state.tShift[nextLine] = contentStart - state.bMarks[nextLine];
	    state.sCount[nextLine] = offset;
	    if (contentStart >= max && state.isEmpty(nextLine + 1)) {
	      // workaround for this case
	      // (list item is empty, list terminates before "foo"):
	      // ~~~~~~~~
	      //   -
	      //
	      //     foo
	      // ~~~~~~~~
	      state.line = Math.min(state.line + 2, endLine);
	    } else {
	      state.md.block.tokenize(state, nextLine, endLine, true);
	    }

	    // If any of list item is tight, mark list as tight
	    if (!state.tight || prevEmptyEnd) {
	      tight = false;
	    }
	    // Item become loose if finish with empty line,
	    // but we should filter last element, because it means list finish
	    prevEmptyEnd = state.line - nextLine > 1 && state.isEmpty(state.line - 1);
	    state.blkIndent = state.listIndent;
	    state.listIndent = oldListIndent;
	    state.tShift[nextLine] = oldTShift;
	    state.sCount[nextLine] = oldSCount;
	    state.tight = oldTight;
	    token = state.push('list_item_close', 'li', -1);
	    token.markup = String.fromCharCode(markerCharCode);
	    nextLine = state.line;
	    itemLines[1] = nextLine;
	    if (nextLine >= endLine) {
	      break;
	    }

	    //
	    // Try to check if list is terminated or continued.
	    //
	    if (state.sCount[nextLine] < state.blkIndent) {
	      break;
	    }

	    // if it's indented more than 3 spaces, it should be a code block
	    if (state.sCount[nextLine] - state.blkIndent >= 4) {
	      break;
	    }

	    // fail if terminating block found
	    let terminate = false;
	    for (let i = 0, l = terminatorRules.length; i < l; i++) {
	      if (terminatorRules[i](state, nextLine, endLine, true)) {
	        terminate = true;
	        break;
	      }
	    }
	    if (terminate) {
	      break;
	    }

	    // fail if list has another type
	    if (isOrdered) {
	      posAfterMarker = skipOrderedListMarker(state, nextLine);
	      if (posAfterMarker < 0) {
	        break;
	      }
	      start = state.bMarks[nextLine] + state.tShift[nextLine];
	    } else {
	      posAfterMarker = skipBulletListMarker(state, nextLine);
	      if (posAfterMarker < 0) {
	        break;
	      }
	    }
	    if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) {
	      break;
	    }
	  }

	  // Finalize list
	  if (isOrdered) {
	    token = state.push('ordered_list_close', 'ol', -1);
	  } else {
	    token = state.push('bullet_list_close', 'ul', -1);
	  }
	  token.markup = String.fromCharCode(markerCharCode);
	  listLines[1] = nextLine;
	  state.line = nextLine;
	  state.parentType = oldParentType;

	  // mark paragraphs tight if needed
	  if (tight) {
	    markTightParagraphs(state, listTokIdx);
	  }
	  return true;
	}

	function reference(state, startLine, _endLine, silent) {
	  let pos = state.bMarks[startLine] + state.tShift[startLine];
	  let max = state.eMarks[startLine];
	  let nextLine = startLine + 1;

	  // if it's indented more than 3 spaces, it should be a code block
	  if (state.sCount[startLine] - state.blkIndent >= 4) {
	    return false;
	  }
	  if (state.src.charCodeAt(pos) !== 0x5B /* [ */) {
	    return false;
	  }
	  function getNextLine(nextLine) {
	    const endLine = state.lineMax;
	    if (nextLine >= endLine || state.isEmpty(nextLine)) {
	      // empty line or end of input
	      return null;
	    }
	    let isContinuation = false;

	    // this would be a code block normally, but after paragraph
	    // it's considered a lazy continuation regardless of what's there
	    if (state.sCount[nextLine] - state.blkIndent > 3) {
	      isContinuation = true;
	    }

	    // quirk for blockquotes, this line should already be checked by that rule
	    if (state.sCount[nextLine] < 0) {
	      isContinuation = true;
	    }
	    if (!isContinuation) {
	      const terminatorRules = state.md.block.ruler.getRules('reference');
	      const oldParentType = state.parentType;
	      state.parentType = 'reference';

	      // Some tags can terminate paragraph without empty line.
	      let terminate = false;
	      for (let i = 0, l = terminatorRules.length; i < l; i++) {
	        if (terminatorRules[i](state, nextLine, endLine, true)) {
	          terminate = true;
	          break;
	        }
	      }
	      state.parentType = oldParentType;
	      if (terminate) {
	        // terminated by another block
	        return null;
	      }
	    }
	    const pos = state.bMarks[nextLine] + state.tShift[nextLine];
	    const max = state.eMarks[nextLine];

	    // max + 1 explicitly includes the newline
	    return state.src.slice(pos, max + 1);
	  }
	  let str = state.src.slice(pos, max + 1);
	  max = str.length;
	  let labelEnd = -1;
	  for (pos = 1; pos < max; pos++) {
	    const ch = str.charCodeAt(pos);
	    if (ch === 0x5B /* [ */) {
	      return false;
	    } else if (ch === 0x5D /* ] */) {
	      labelEnd = pos;
	      break;
	    } else if (ch === 0x0A /* \n */) {
	      const lineContent = getNextLine(nextLine);
	      if (lineContent !== null) {
	        str += lineContent;
	        max = str.length;
	        nextLine++;
	      }
	    } else if (ch === 0x5C /* \ */) {
	      pos++;
	      if (pos < max && str.charCodeAt(pos) === 0x0A) {
	        const lineContent = getNextLine(nextLine);
	        if (lineContent !== null) {
	          str += lineContent;
	          max = str.length;
	          nextLine++;
	        }
	      }
	    }
	  }
	  if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 0x3A /* : */) {
	    return false;
	  }

	  // [label]:   destination   'title'
	  //         ^^^ skip optional whitespace here
	  for (pos = labelEnd + 2; pos < max; pos++) {
	    const ch = str.charCodeAt(pos);
	    if (ch === 0x0A) {
	      const lineContent = getNextLine(nextLine);
	      if (lineContent !== null) {
	        str += lineContent;
	        max = str.length;
	        nextLine++;
	      }
	    } else if (isSpace(ch)) ; else {
	      break;
	    }
	  }

	  // [label]:   destination   'title'
	  //            ^^^^^^^^^^^ parse this
	  const destRes = state.md.helpers.parseLinkDestination(str, pos, max);
	  if (!destRes.ok) {
	    return false;
	  }
	  const href = state.md.normalizeLink(destRes.str);
	  if (!state.md.validateLink(href)) {
	    return false;
	  }
	  pos = destRes.pos;

	  // save cursor state, we could require to rollback later
	  const destEndPos = pos;
	  const destEndLineNo = nextLine;

	  // [label]:   destination   'title'
	  //                       ^^^ skipping those spaces
	  const start = pos;
	  for (; pos < max; pos++) {
	    const ch = str.charCodeAt(pos);
	    if (ch === 0x0A) {
	      const lineContent = getNextLine(nextLine);
	      if (lineContent !== null) {
	        str += lineContent;
	        max = str.length;
	        nextLine++;
	      }
	    } else if (isSpace(ch)) ; else {
	      break;
	    }
	  }

	  // [label]:   destination   'title'
	  //                          ^^^^^^^ parse this
	  let titleRes = state.md.helpers.parseLinkTitle(str, pos, max);
	  while (titleRes.can_continue) {
	    const lineContent = getNextLine(nextLine);
	    if (lineContent === null) break;
	    str += lineContent;
	    pos = max;
	    max = str.length;
	    nextLine++;
	    titleRes = state.md.helpers.parseLinkTitle(str, pos, max, titleRes);
	  }
	  let title;
	  if (pos < max && start !== pos && titleRes.ok) {
	    title = titleRes.str;
	    pos = titleRes.pos;
	  } else {
	    title = '';
	    pos = destEndPos;
	    nextLine = destEndLineNo;
	  }

	  // skip trailing spaces until the rest of the line
	  while (pos < max) {
	    const ch = str.charCodeAt(pos);
	    if (!isSpace(ch)) {
	      break;
	    }
	    pos++;
	  }
	  if (pos < max && str.charCodeAt(pos) !== 0x0A) {
	    if (title) {
	      // garbage at the end of the line after title,
	      // but it could still be a valid reference if we roll back
	      title = '';
	      pos = destEndPos;
	      nextLine = destEndLineNo;
	      while (pos < max) {
	        const ch = str.charCodeAt(pos);
	        if (!isSpace(ch)) {
	          break;
	        }
	        pos++;
	      }
	    }
	  }
	  if (pos < max && str.charCodeAt(pos) !== 0x0A) {
	    // garbage at the end of the line
	    return false;
	  }
	  const label = normalizeReference(str.slice(1, labelEnd));
	  if (!label) {
	    // CommonMark 0.20 disallows empty labels
	    return false;
	  }

	  // Reference can not terminate anything. This check is for safety only.
	  /* istanbul ignore if */
	  if (silent) {
	    return true;
	  }
	  if (typeof state.env.references === 'undefined') {
	    state.env.references = {};
	  }
	  if (typeof state.env.references[label] === 'undefined') {
	    state.env.references[label] = {
	      title,
	      href
	    };
	  }
	  state.line = nextLine;
	  return true;
	}

	// List of valid html blocks names, according to commonmark spec
	// https://spec.commonmark.org/0.30/#html-blocks

	var block_names = ['address', 'article', 'aside', 'base', 'basefont', 'blockquote', 'body', 'caption', 'center', 'col', 'colgroup', 'dd', 'details', 'dialog', 'dir', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr', 'html', 'iframe', 'legend', 'li', 'link', 'main', 'menu', 'menuitem', 'nav', 'noframes', 'ol', 'optgroup', 'option', 'p', 'param', 'search', 'section', 'summary', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'title', 'tr', 'track', 'ul'];

	// Regexps to match html elements

	const attr_name = '[a-zA-Z_:][a-zA-Z0-9:._-]*';
	const unquoted = '[^"\'=<>`\\x00-\\x20]+';
	const single_quoted = "'[^']*'";
	const double_quoted = '"[^"]*"';
	const attr_value = '(?:' + unquoted + '|' + single_quoted + '|' + double_quoted + ')';
	const attribute = '(?:\\s+' + attr_name + '(?:\\s*=\\s*' + attr_value + ')?)';
	const open_tag = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';
	const close_tag = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
	const comment = '<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->';
	const processing = '<[?][\\s\\S]*?[?]>';
	const declaration = '<![A-Za-z][^>]*>';
	const cdata = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';
	const HTML_TAG_RE = new RegExp('^(?:' + open_tag + '|' + close_tag + '|' + comment + '|' + processing + '|' + declaration + '|' + cdata + ')');
	const HTML_OPEN_CLOSE_TAG_RE = new RegExp('^(?:' + open_tag + '|' + close_tag + ')');

	// HTML block


	// An array of opening and corresponding closing sequences for html tags,
	// last argument defines whether it can terminate a paragraph or not
	//
	const HTML_SEQUENCES = [[/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, true], [/^<!--/, /-->/, true], [/^<\?/, /\?>/, true], [/^<![A-Z]/, />/, true], [/^<!\[CDATA\[/, /\]\]>/, true], [new RegExp('^</?(' + block_names.join('|') + ')(?=(\\s|/?>|$))', 'i'), /^$/, true], [new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + '\\s*$'), /^$/, false]];
	function html_block(state, startLine, endLine, silent) {
	  let pos = state.bMarks[startLine] + state.tShift[startLine];
	  let max = state.eMarks[startLine];

	  // if it's indented more than 3 spaces, it should be a code block
	  if (state.sCount[startLine] - state.blkIndent >= 4) {
	    return false;
	  }
	  if (!state.md.options.html) {
	    return false;
	  }
	  if (state.src.charCodeAt(pos) !== 0x3C /* < */) {
	    return false;
	  }
	  let lineText = state.src.slice(pos, max);
	  let i = 0;
	  for (; i < HTML_SEQUENCES.length; i++) {
	    if (HTML_SEQUENCES[i][0].test(lineText)) {
	      break;
	    }
	  }
	  if (i === HTML_SEQUENCES.length) {
	    return false;
	  }
	  if (silent) {
	    // true if this sequence can be a terminator, false otherwise
	    return HTML_SEQUENCES[i][2];
	  }
	  let nextLine = startLine + 1;

	  // If we are here - we detected HTML block.
	  // Let's roll down till block end.
	  if (!HTML_SEQUENCES[i][1].test(lineText)) {
	    for (; nextLine < endLine; nextLine++) {
	      if (state.sCount[nextLine] < state.blkIndent) {
	        break;
	      }
	      pos = state.bMarks[nextLine] + state.tShift[nextLine];
	      max = state.eMarks[nextLine];
	      lineText = state.src.slice(pos, max);
	      if (HTML_SEQUENCES[i][1].test(lineText)) {
	        if (lineText.length !== 0) {
	          nextLine++;
	        }
	        break;
	      }
	    }
	  }
	  state.line = nextLine;
	  const token = state.push('html_block', '', 0);
	  token.map = [startLine, nextLine];
	  token.content = state.getLines(startLine, nextLine, state.blkIndent, true);
	  return true;
	}

	// heading (#, ##, ...)

	function heading(state, startLine, endLine, silent) {
	  let pos = state.bMarks[startLine] + state.tShift[startLine];
	  let max = state.eMarks[startLine];

	  // if it's indented more than 3 spaces, it should be a code block
	  if (state.sCount[startLine] - state.blkIndent >= 4) {
	    return false;
	  }
	  let ch = state.src.charCodeAt(pos);
	  if (ch !== 0x23 /* # */ || pos >= max) {
	    return false;
	  }

	  // count heading level
	  let level = 1;
	  ch = state.src.charCodeAt(++pos);
	  while (ch === 0x23 /* # */ && pos < max && level <= 6) {
	    level++;
	    ch = state.src.charCodeAt(++pos);
	  }
	  if (level > 6 || pos < max && !isSpace(ch)) {
	    return false;
	  }
	  if (silent) {
	    return true;
	  }

	  // Let's cut tails like '    ###  ' from the end of string

	  max = state.skipSpacesBack(max, pos);
	  const tmp = state.skipCharsBack(max, 0x23, pos); // #
	  if (tmp > pos && isSpace(state.src.charCodeAt(tmp - 1))) {
	    max = tmp;
	  }
	  state.line = startLine + 1;
	  const token_o = state.push('heading_open', 'h' + String(level), 1);
	  token_o.markup = '########'.slice(0, level);
	  token_o.map = [startLine, state.line];
	  const token_i = state.push('inline', '', 0);
	  token_i.content = state.src.slice(pos, max).trim();
	  token_i.map = [startLine, state.line];
	  token_i.children = [];
	  const token_c = state.push('heading_close', 'h' + String(level), -1);
	  token_c.markup = '########'.slice(0, level);
	  return true;
	}

	// lheading (---, ===)

	function lheading(state, startLine, endLine /*, silent */) {
	  const terminatorRules = state.md.block.ruler.getRules('paragraph');

	  // if it's indented more than 3 spaces, it should be a code block
	  if (state.sCount[startLine] - state.blkIndent >= 4) {
	    return false;
	  }
	  const oldParentType = state.parentType;
	  state.parentType = 'paragraph'; // use paragraph to match terminatorRules

	  // jump line-by-line until empty one or EOF
	  let level = 0;
	  let marker;
	  let nextLine = startLine + 1;
	  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
	    // this would be a code block normally, but after paragraph
	    // it's considered a lazy continuation regardless of what's there
	    if (state.sCount[nextLine] - state.blkIndent > 3) {
	      continue;
	    }

	    //
	    // Check for underline in setext header
	    //
	    if (state.sCount[nextLine] >= state.blkIndent) {
	      let pos = state.bMarks[nextLine] + state.tShift[nextLine];
	      const max = state.eMarks[nextLine];
	      if (pos < max) {
	        marker = state.src.charCodeAt(pos);
	        if (marker === 0x2D /* - */ || marker === 0x3D /* = */) {
	          pos = state.skipChars(pos, marker);
	          pos = state.skipSpaces(pos);
	          if (pos >= max) {
	            level = marker === 0x3D /* = */ ? 1 : 2;
	            break;
	          }
	        }
	      }
	    }

	    // quirk for blockquotes, this line should already be checked by that rule
	    if (state.sCount[nextLine] < 0) {
	      continue;
	    }

	    // Some tags can terminate paragraph without empty line.
	    let terminate = false;
	    for (let i = 0, l = terminatorRules.length; i < l; i++) {
	      if (terminatorRules[i](state, nextLine, endLine, true)) {
	        terminate = true;
	        break;
	      }
	    }
	    if (terminate) {
	      break;
	    }
	  }
	  if (!level) {
	    // Didn't find valid underline
	    return false;
	  }
	  const content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
	  state.line = nextLine + 1;
	  const token_o = state.push('heading_open', 'h' + String(level), 1);
	  token_o.markup = String.fromCharCode(marker);
	  token_o.map = [startLine, state.line];
	  const token_i = state.push('inline', '', 0);
	  token_i.content = content;
	  token_i.map = [startLine, state.line - 1];
	  token_i.children = [];
	  const token_c = state.push('heading_close', 'h' + String(level), -1);
	  token_c.markup = String.fromCharCode(marker);
	  state.parentType = oldParentType;
	  return true;
	}

	// Paragraph

	function paragraph(state, startLine, endLine) {
	  const terminatorRules = state.md.block.ruler.getRules('paragraph');
	  const oldParentType = state.parentType;
	  let nextLine = startLine + 1;
	  state.parentType = 'paragraph';

	  // jump line-by-line until empty one or EOF
	  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
	    // this would be a code block normally, but after paragraph
	    // it's considered a lazy continuation regardless of what's there
	    if (state.sCount[nextLine] - state.blkIndent > 3) {
	      continue;
	    }

	    // quirk for blockquotes, this line should already be checked by that rule
	    if (state.sCount[nextLine] < 0) {
	      continue;
	    }

	    // Some tags can terminate paragraph without empty line.
	    let terminate = false;
	    for (let i = 0, l = terminatorRules.length; i < l; i++) {
	      if (terminatorRules[i](state, nextLine, endLine, true)) {
	        terminate = true;
	        break;
	      }
	    }
	    if (terminate) {
	      break;
	    }
	  }
	  const content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
	  state.line = nextLine;
	  const token_o = state.push('paragraph_open', 'p', 1);
	  token_o.map = [startLine, state.line];
	  const token_i = state.push('inline', '', 0);
	  token_i.content = content;
	  token_i.map = [startLine, state.line];
	  token_i.children = [];
	  state.push('paragraph_close', 'p', -1);
	  state.parentType = oldParentType;
	  return true;
	}

	/** internal
	 * class ParserBlock
	 *
	 * Block-level tokenizer.
	 **/

	const _rules$1 = [
	// First 2 params - rule name & source. Secondary array - list of rules,
	// which can be terminated by this one.
	['table', table, ['paragraph', 'reference']], ['code', code], ['fence', fence, ['paragraph', 'reference', 'blockquote', 'list']], ['blockquote', blockquote, ['paragraph', 'reference', 'blockquote', 'list']], ['hr', hr, ['paragraph', 'reference', 'blockquote', 'list']], ['list', list, ['paragraph', 'reference', 'blockquote']], ['reference', reference], ['html_block', html_block, ['paragraph', 'reference', 'blockquote']], ['heading', heading, ['paragraph', 'reference', 'blockquote']], ['lheading', lheading], ['paragraph', paragraph]];

	/**
	 * new ParserBlock()
	 **/
	function ParserBlock() {
	  /**
	   * ParserBlock#ruler -> Ruler
	   *
	   * [[Ruler]] instance. Keep configuration of block rules.
	   **/
	  this.ruler = new Ruler();
	  for (let i = 0; i < _rules$1.length; i++) {
	    this.ruler.push(_rules$1[i][0], _rules$1[i][1], {
	      alt: (_rules$1[i][2] || []).slice()
	    });
	  }
	}

	// Generate tokens for input range
	//
	ParserBlock.prototype.tokenize = function (state, startLine, endLine) {
	  const rules = this.ruler.getRules('');
	  const len = rules.length;
	  const maxNesting = state.md.options.maxNesting;
	  let line = startLine;
	  let hasEmptyLines = false;
	  while (line < endLine) {
	    state.line = line = state.skipEmptyLines(line);
	    if (line >= endLine) {
	      break;
	    }

	    // Termination condition for nested calls.
	    // Nested calls currently used for blockquotes & lists
	    if (state.sCount[line] < state.blkIndent) {
	      break;
	    }

	    // If nesting level exceeded - skip tail to the end. That's not ordinary
	    // situation and we should not care about content.
	    if (state.level >= maxNesting) {
	      state.line = endLine;
	      break;
	    }

	    // Try all possible rules.
	    // On success, rule should:
	    //
	    // - update `state.line`
	    // - update `state.tokens`
	    // - return true
	    const prevLine = state.line;
	    let ok = false;
	    for (let i = 0; i < len; i++) {
	      ok = rules[i](state, line, endLine, false);
	      if (ok) {
	        if (prevLine >= state.line) {
	          throw new Error("block rule didn't increment state.line");
	        }
	        break;
	      }
	    }

	    // this can only happen if user disables paragraph rule
	    if (!ok) throw new Error('none of the block rules matched');

	    // set state.tight if we had an empty line before current tag
	    // i.e. latest empty line should not count
	    state.tight = !hasEmptyLines;

	    // paragraph might "eat" one newline after it in nested lists
	    if (state.isEmpty(state.line - 1)) {
	      hasEmptyLines = true;
	    }
	    line = state.line;
	    if (line < endLine && state.isEmpty(line)) {
	      hasEmptyLines = true;
	      line++;
	      state.line = line;
	    }
	  }
	};

	/**
	 * ParserBlock.parse(str, md, env, outTokens)
	 *
	 * Process input string and push block tokens into `outTokens`
	 **/
	ParserBlock.prototype.parse = function (src, md, env, outTokens) {
	  if (!src) {
	    return;
	  }
	  const state = new this.State(src, md, env, outTokens);
	  this.tokenize(state, state.line, state.lineMax);
	};
	ParserBlock.prototype.State = StateBlock;

	// Inline parser state

	function StateInline(src, md, env, outTokens) {
	  this.src = src;
	  this.env = env;
	  this.md = md;
	  this.tokens = outTokens;
	  this.tokens_meta = Array(outTokens.length);
	  this.pos = 0;
	  this.posMax = this.src.length;
	  this.level = 0;
	  this.pending = '';
	  this.pendingLevel = 0;

	  // Stores { start: end } pairs. Useful for backtrack
	  // optimization of pairs parse (emphasis, strikes).
	  this.cache = {};

	  // List of emphasis-like delimiters for current tag
	  this.delimiters = [];

	  // Stack of delimiter lists for upper level tags
	  this._prev_delimiters = [];

	  // backtick length => last seen position
	  this.backticks = {};
	  this.backticksScanned = false;

	  // Counter used to disable inline linkify-it execution
	  // inside <a> and markdown links
	  this.linkLevel = 0;
	}

	// Flush pending text
	//
	StateInline.prototype.pushPending = function () {
	  const token = new Token('text', '', 0);
	  token.content = this.pending;
	  token.level = this.pendingLevel;
	  this.tokens.push(token);
	  this.pending = '';
	  return token;
	};

	// Push new token to "stream".
	// If pending text exists - flush it as text token
	//
	StateInline.prototype.push = function (type, tag, nesting) {
	  if (this.pending) {
	    this.pushPending();
	  }
	  const token = new Token(type, tag, nesting);
	  let token_meta = null;
	  if (nesting < 0) {
	    // closing tag
	    this.level--;
	    this.delimiters = this._prev_delimiters.pop();
	  }
	  token.level = this.level;
	  if (nesting > 0) {
	    // opening tag
	    this.level++;
	    this._prev_delimiters.push(this.delimiters);
	    this.delimiters = [];
	    token_meta = {
	      delimiters: this.delimiters
	    };
	  }
	  this.pendingLevel = this.level;
	  this.tokens.push(token);
	  this.tokens_meta.push(token_meta);
	  return token;
	};

	// Scan a sequence of emphasis-like markers, and determine whether
	// it can start an emphasis sequence or end an emphasis sequence.
	//
	//  - start - position to scan from (it should point at a valid marker);
	//  - canSplitWord - determine if these markers can be found inside a word
	//
	StateInline.prototype.scanDelims = function (start, canSplitWord) {
	  const max = this.posMax;
	  const marker = this.src.charCodeAt(start);

	  // treat beginning of the line as a whitespace
	  const lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 0x20;
	  let pos = start;
	  while (pos < max && this.src.charCodeAt(pos) === marker) {
	    pos++;
	  }
	  const count = pos - start;

	  // treat end of the line as a whitespace
	  const nextChar = pos < max ? this.src.charCodeAt(pos) : 0x20;
	  const isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
	  const isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
	  const isLastWhiteSpace = isWhiteSpace(lastChar);
	  const isNextWhiteSpace = isWhiteSpace(nextChar);
	  const left_flanking = !isNextWhiteSpace && (!isNextPunctChar || isLastWhiteSpace || isLastPunctChar);
	  const right_flanking = !isLastWhiteSpace && (!isLastPunctChar || isNextWhiteSpace || isNextPunctChar);
	  const can_open = left_flanking && (canSplitWord || !right_flanking || isLastPunctChar);
	  const can_close = right_flanking && (canSplitWord || !left_flanking || isNextPunctChar);
	  return {
	    can_open,
	    can_close,
	    length: count
	  };
	};

	// re-export Token class to use in block rules
	StateInline.prototype.Token = Token;

	// Skip text characters for text token, place those to pending buffer
	// and increment current pos

	// Rule to skip pure text
	// '{}$%@~+=:' reserved for extentions

	// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~

	// !!!! Don't confuse with "Markdown ASCII Punctuation" chars
	// http://spec.commonmark.org/0.15/#ascii-punctuation-character
	function isTerminatorChar(ch) {
	  switch (ch) {
	    case 0x0A /* \n */:
	    case 0x21 /* ! */:
	    case 0x23 /* # */:
	    case 0x24 /* $ */:
	    case 0x25 /* % */:
	    case 0x26 /* & */:
	    case 0x2A /* * */:
	    case 0x2B /* + */:
	    case 0x2D /* - */:
	    case 0x3A /* : */:
	    case 0x3C /* < */:
	    case 0x3D /* = */:
	    case 0x3E /* > */:
	    case 0x40 /* @ */:
	    case 0x5B /* [ */:
	    case 0x5C /* \ */:
	    case 0x5D /* ] */:
	    case 0x5E /* ^ */:
	    case 0x5F /* _ */:
	    case 0x60 /* ` */:
	    case 0x7B /* { */:
	    case 0x7D /* } */:
	    case 0x7E /* ~ */:
	      return true;
	    default:
	      return false;
	  }
	}
	function text(state, silent) {
	  let pos = state.pos;
	  while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
	    pos++;
	  }
	  if (pos === state.pos) {
	    return false;
	  }
	  if (!silent) {
	    state.pending += state.src.slice(state.pos, pos);
	  }
	  state.pos = pos;
	  return true;
	}

	// Alternative implementation, for memory.
	//
	// It costs 10% of performance, but allows extend terminators list, if place it
	// to `ParserInline` property. Probably, will switch to it sometime, such
	// flexibility required.

	/*
	var TERMINATOR_RE = /[\n!#$%&*+\-:<=>@[\\\]^_`{}~]/;

	module.exports = function text(state, silent) {
	  var pos = state.pos,
	      idx = state.src.slice(pos).search(TERMINATOR_RE);

	  // first char is terminator -> empty text
	  if (idx === 0) { return false; }

	  // no terminator -> text till end of string
	  if (idx < 0) {
	    if (!silent) { state.pending += state.src.slice(pos); }
	    state.pos = state.src.length;
	    return true;
	  }

	  if (!silent) { state.pending += state.src.slice(pos, pos + idx); }

	  state.pos += idx;

	  return true;
	}; */

	// Process links like https://example.org/

	// RFC3986: scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
	const SCHEME_RE = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
	function linkify(state, silent) {
	  if (!state.md.options.linkify) return false;
	  if (state.linkLevel > 0) return false;
	  const pos = state.pos;
	  const max = state.posMax;
	  if (pos + 3 > max) return false;
	  if (state.src.charCodeAt(pos) !== 0x3A /* : */) return false;
	  if (state.src.charCodeAt(pos + 1) !== 0x2F /* / */) return false;
	  if (state.src.charCodeAt(pos + 2) !== 0x2F /* / */) return false;
	  const match = state.pending.match(SCHEME_RE);
	  if (!match) return false;
	  const proto = match[1];
	  const link = state.md.linkify.matchAtStart(state.src.slice(pos - proto.length));
	  if (!link) return false;
	  let url = link.url;

	  // invalid link, but still detected by linkify somehow;
	  // need to check to prevent infinite loop below
	  if (url.length <= proto.length) return false;

	  // disallow '*' at the end of the link (conflicts with emphasis)
	  url = url.replace(/\*+$/, '');
	  const fullUrl = state.md.normalizeLink(url);
	  if (!state.md.validateLink(fullUrl)) return false;
	  if (!silent) {
	    state.pending = state.pending.slice(0, -proto.length);
	    const token_o = state.push('link_open', 'a', 1);
	    token_o.attrs = [['href', fullUrl]];
	    token_o.markup = 'linkify';
	    token_o.info = 'auto';
	    const token_t = state.push('text', '', 0);
	    token_t.content = state.md.normalizeLinkText(url);
	    const token_c = state.push('link_close', 'a', -1);
	    token_c.markup = 'linkify';
	    token_c.info = 'auto';
	  }
	  state.pos += url.length - proto.length;
	  return true;
	}

	// Proceess '\n'

	function newline(state, silent) {
	  let pos = state.pos;
	  if (state.src.charCodeAt(pos) !== 0x0A /* \n */) {
	    return false;
	  }
	  const pmax = state.pending.length - 1;
	  const max = state.posMax;

	  // '  \n' -> hardbreak
	  // Lookup in pending chars is bad practice! Don't copy to other rules!
	  // Pending string is stored in concat mode, indexed lookups will cause
	  // convertion to flat mode.
	  if (!silent) {
	    if (pmax >= 0 && state.pending.charCodeAt(pmax) === 0x20) {
	      if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 0x20) {
	        // Find whitespaces tail of pending chars.
	        let ws = pmax - 1;
	        while (ws >= 1 && state.pending.charCodeAt(ws - 1) === 0x20) ws--;
	        state.pending = state.pending.slice(0, ws);
	        state.push('hardbreak', 'br', 0);
	      } else {
	        state.pending = state.pending.slice(0, -1);
	        state.push('softbreak', 'br', 0);
	      }
	    } else {
	      state.push('softbreak', 'br', 0);
	    }
	  }
	  pos++;

	  // skip heading spaces for next line
	  while (pos < max && isSpace(state.src.charCodeAt(pos))) {
	    pos++;
	  }
	  state.pos = pos;
	  return true;
	}

	// Process escaped chars and hardbreaks

	const ESCAPED = [];
	for (let i = 0; i < 256; i++) {
	  ESCAPED.push(0);
	}
	'\\!"#$%&\'()*+,./:;<=>?@[]^_`{|}~-'.split('').forEach(function (ch) {
	  ESCAPED[ch.charCodeAt(0)] = 1;
	});
	function escape(state, silent) {
	  let pos = state.pos;
	  const max = state.posMax;
	  if (state.src.charCodeAt(pos) !== 0x5C /* \ */) return false;
	  pos++;

	  // '\' at the end of the inline block
	  if (pos >= max) return false;
	  let ch1 = state.src.charCodeAt(pos);
	  if (ch1 === 0x0A) {
	    if (!silent) {
	      state.push('hardbreak', 'br', 0);
	    }
	    pos++;
	    // skip leading whitespaces from next line
	    while (pos < max) {
	      ch1 = state.src.charCodeAt(pos);
	      if (!isSpace(ch1)) break;
	      pos++;
	    }
	    state.pos = pos;
	    return true;
	  }
	  let escapedStr = state.src[pos];
	  if (ch1 >= 0xD800 && ch1 <= 0xDBFF && pos + 1 < max) {
	    const ch2 = state.src.charCodeAt(pos + 1);
	    if (ch2 >= 0xDC00 && ch2 <= 0xDFFF) {
	      escapedStr += state.src[pos + 1];
	      pos++;
	    }
	  }
	  const origStr = '\\' + escapedStr;
	  if (!silent) {
	    const token = state.push('text_special', '', 0);
	    if (ch1 < 256 && ESCAPED[ch1] !== 0) {
	      token.content = escapedStr;
	    } else {
	      token.content = origStr;
	    }
	    token.markup = origStr;
	    token.info = 'escape';
	  }
	  state.pos = pos + 1;
	  return true;
	}

	// Parse backticks

	function backtick(state, silent) {
	  let pos = state.pos;
	  const ch = state.src.charCodeAt(pos);
	  if (ch !== 0x60 /* ` */) {
	    return false;
	  }
	  const start = pos;
	  pos++;
	  const max = state.posMax;

	  // scan marker length
	  while (pos < max && state.src.charCodeAt(pos) === 0x60 /* ` */) {
	    pos++;
	  }
	  const marker = state.src.slice(start, pos);
	  const openerLength = marker.length;
	  if (state.backticksScanned && (state.backticks[openerLength] || 0) <= start) {
	    if (!silent) state.pending += marker;
	    state.pos += openerLength;
	    return true;
	  }
	  let matchEnd = pos;
	  let matchStart;

	  // Nothing found in the cache, scan until the end of the line (or until marker is found)
	  while ((matchStart = state.src.indexOf('`', matchEnd)) !== -1) {
	    matchEnd = matchStart + 1;

	    // scan marker length
	    while (matchEnd < max && state.src.charCodeAt(matchEnd) === 0x60 /* ` */) {
	      matchEnd++;
	    }
	    const closerLength = matchEnd - matchStart;
	    if (closerLength === openerLength) {
	      // Found matching closer length.
	      if (!silent) {
	        const token = state.push('code_inline', 'code', 0);
	        token.markup = marker;
	        token.content = state.src.slice(pos, matchStart).replace(/\n/g, ' ').replace(/^ (.+) $/, '$1');
	      }
	      state.pos = matchEnd;
	      return true;
	    }

	    // Some different length found, put it in cache as upper limit of where closer can be found
	    state.backticks[closerLength] = matchStart;
	  }

	  // Scanned through the end, didn't find anything
	  state.backticksScanned = true;
	  if (!silent) state.pending += marker;
	  state.pos += openerLength;
	  return true;
	}

	// ~~strike through~~
	//

	// Insert each marker as a separate text token, and add it to delimiter list
	//
	function strikethrough_tokenize(state, silent) {
	  const start = state.pos;
	  const marker = state.src.charCodeAt(start);
	  if (silent) {
	    return false;
	  }
	  if (marker !== 0x7E /* ~ */) {
	    return false;
	  }
	  const scanned = state.scanDelims(state.pos, true);
	  let len = scanned.length;
	  const ch = String.fromCharCode(marker);
	  if (len < 2) {
	    return false;
	  }
	  let token;
	  if (len % 2) {
	    token = state.push('text', '', 0);
	    token.content = ch;
	    len--;
	  }
	  for (let i = 0; i < len; i += 2) {
	    token = state.push('text', '', 0);
	    token.content = ch + ch;
	    state.delimiters.push({
	      marker,
	      length: 0,
	      // disable "rule of 3" length checks meant for emphasis
	      token: state.tokens.length - 1,
	      end: -1,
	      open: scanned.can_open,
	      close: scanned.can_close
	    });
	  }
	  state.pos += scanned.length;
	  return true;
	}
	function postProcess$1(state, delimiters) {
	  let token;
	  const loneMarkers = [];
	  const max = delimiters.length;
	  for (let i = 0; i < max; i++) {
	    const startDelim = delimiters[i];
	    if (startDelim.marker !== 0x7E /* ~ */) {
	      continue;
	    }
	    if (startDelim.end === -1) {
	      continue;
	    }
	    const endDelim = delimiters[startDelim.end];
	    token = state.tokens[startDelim.token];
	    token.type = 's_open';
	    token.tag = 's';
	    token.nesting = 1;
	    token.markup = '~~';
	    token.content = '';
	    token = state.tokens[endDelim.token];
	    token.type = 's_close';
	    token.tag = 's';
	    token.nesting = -1;
	    token.markup = '~~';
	    token.content = '';
	    if (state.tokens[endDelim.token - 1].type === 'text' && state.tokens[endDelim.token - 1].content === '~') {
	      loneMarkers.push(endDelim.token - 1);
	    }
	  }

	  // If a marker sequence has an odd number of characters, it's splitted
	  // like this: `~~~~~` -> `~` + `~~` + `~~`, leaving one marker at the
	  // start of the sequence.
	  //
	  // So, we have to move all those markers after subsequent s_close tags.
	  //
	  while (loneMarkers.length) {
	    const i = loneMarkers.pop();
	    let j = i + 1;
	    while (j < state.tokens.length && state.tokens[j].type === 's_close') {
	      j++;
	    }
	    j--;
	    if (i !== j) {
	      token = state.tokens[j];
	      state.tokens[j] = state.tokens[i];
	      state.tokens[i] = token;
	    }
	  }
	}

	// Walk through delimiter list and replace text tokens with tags
	//
	function strikethrough_postProcess(state) {
	  const tokens_meta = state.tokens_meta;
	  const max = state.tokens_meta.length;
	  postProcess$1(state, state.delimiters);
	  for (let curr = 0; curr < max; curr++) {
	    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
	      postProcess$1(state, tokens_meta[curr].delimiters);
	    }
	  }
	}
	var r_strikethrough = {
	  tokenize: strikethrough_tokenize,
	  postProcess: strikethrough_postProcess
	};

	// Process *this* and _that_
	//

	// Insert each marker as a separate text token, and add it to delimiter list
	//
	function emphasis_tokenize(state, silent) {
	  const start = state.pos;
	  const marker = state.src.charCodeAt(start);
	  if (silent) {
	    return false;
	  }
	  if (marker !== 0x5F /* _ */ && marker !== 0x2A /* * */) {
	    return false;
	  }
	  const scanned = state.scanDelims(state.pos, marker === 0x2A);
	  for (let i = 0; i < scanned.length; i++) {
	    const token = state.push('text', '', 0);
	    token.content = String.fromCharCode(marker);
	    state.delimiters.push({
	      // Char code of the starting marker (number).
	      //
	      marker,
	      // Total length of these series of delimiters.
	      //
	      length: scanned.length,
	      // A position of the token this delimiter corresponds to.
	      //
	      token: state.tokens.length - 1,
	      // If this delimiter is matched as a valid opener, `end` will be
	      // equal to its position, otherwise it's `-1`.
	      //
	      end: -1,
	      // Boolean flags that determine if this delimiter could open or close
	      // an emphasis.
	      //
	      open: scanned.can_open,
	      close: scanned.can_close
	    });
	  }
	  state.pos += scanned.length;
	  return true;
	}
	function postProcess(state, delimiters) {
	  const max = delimiters.length;
	  for (let i = max - 1; i >= 0; i--) {
	    const startDelim = delimiters[i];
	    if (startDelim.marker !== 0x5F /* _ */ && startDelim.marker !== 0x2A /* * */) {
	      continue;
	    }

	    // Process only opening markers
	    if (startDelim.end === -1) {
	      continue;
	    }
	    const endDelim = delimiters[startDelim.end];

	    // If the previous delimiter has the same marker and is adjacent to this one,
	    // merge those into one strong delimiter.
	    //
	    // `<em><em>whatever</em></em>` -> `<strong>whatever</strong>`
	    //
	    const isStrong = i > 0 && delimiters[i - 1].end === startDelim.end + 1 &&
	    // check that first two markers match and adjacent
	    delimiters[i - 1].marker === startDelim.marker && delimiters[i - 1].token === startDelim.token - 1 &&
	    // check that last two markers are adjacent (we can safely assume they match)
	    delimiters[startDelim.end + 1].token === endDelim.token + 1;
	    const ch = String.fromCharCode(startDelim.marker);
	    const token_o = state.tokens[startDelim.token];
	    token_o.type = isStrong ? 'strong_open' : 'em_open';
	    token_o.tag = isStrong ? 'strong' : 'em';
	    token_o.nesting = 1;
	    token_o.markup = isStrong ? ch + ch : ch;
	    token_o.content = '';
	    const token_c = state.tokens[endDelim.token];
	    token_c.type = isStrong ? 'strong_close' : 'em_close';
	    token_c.tag = isStrong ? 'strong' : 'em';
	    token_c.nesting = -1;
	    token_c.markup = isStrong ? ch + ch : ch;
	    token_c.content = '';
	    if (isStrong) {
	      state.tokens[delimiters[i - 1].token].content = '';
	      state.tokens[delimiters[startDelim.end + 1].token].content = '';
	      i--;
	    }
	  }
	}

	// Walk through delimiter list and replace text tokens with tags
	//
	function emphasis_post_process(state) {
	  const tokens_meta = state.tokens_meta;
	  const max = state.tokens_meta.length;
	  postProcess(state, state.delimiters);
	  for (let curr = 0; curr < max; curr++) {
	    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
	      postProcess(state, tokens_meta[curr].delimiters);
	    }
	  }
	}
	var r_emphasis = {
	  tokenize: emphasis_tokenize,
	  postProcess: emphasis_post_process
	};

	// Process [link](<to> "stuff")

	function link(state, silent) {
	  let code, label, res, ref;
	  let href = '';
	  let title = '';
	  let start = state.pos;
	  let parseReference = true;
	  if (state.src.charCodeAt(state.pos) !== 0x5B /* [ */) {
	    return false;
	  }
	  const oldPos = state.pos;
	  const max = state.posMax;
	  const labelStart = state.pos + 1;
	  const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);

	  // parser failed to find ']', so it's not a valid link
	  if (labelEnd < 0) {
	    return false;
	  }
	  let pos = labelEnd + 1;
	  if (pos < max && state.src.charCodeAt(pos) === 0x28 /* ( */) {
	    //
	    // Inline link
	    //

	    // might have found a valid shortcut link, disable reference parsing
	    parseReference = false;

	    // [link](  <href>  "title"  )
	    //        ^^ skipping these spaces
	    pos++;
	    for (; pos < max; pos++) {
	      code = state.src.charCodeAt(pos);
	      if (!isSpace(code) && code !== 0x0A) {
	        break;
	      }
	    }
	    if (pos >= max) {
	      return false;
	    }

	    // [link](  <href>  "title"  )
	    //          ^^^^^^ parsing link destination
	    start = pos;
	    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
	    if (res.ok) {
	      href = state.md.normalizeLink(res.str);
	      if (state.md.validateLink(href)) {
	        pos = res.pos;
	      } else {
	        href = '';
	      }

	      // [link](  <href>  "title"  )
	      //                ^^ skipping these spaces
	      start = pos;
	      for (; pos < max; pos++) {
	        code = state.src.charCodeAt(pos);
	        if (!isSpace(code) && code !== 0x0A) {
	          break;
	        }
	      }

	      // [link](  <href>  "title"  )
	      //                  ^^^^^^^ parsing link title
	      res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
	      if (pos < max && start !== pos && res.ok) {
	        title = res.str;
	        pos = res.pos;

	        // [link](  <href>  "title"  )
	        //                         ^^ skipping these spaces
	        for (; pos < max; pos++) {
	          code = state.src.charCodeAt(pos);
	          if (!isSpace(code) && code !== 0x0A) {
	            break;
	          }
	        }
	      }
	    }
	    if (pos >= max || state.src.charCodeAt(pos) !== 0x29 /* ) */) {
	      // parsing a valid shortcut link failed, fallback to reference
	      parseReference = true;
	    }
	    pos++;
	  }
	  if (parseReference) {
	    //
	    // Link reference
	    //
	    if (typeof state.env.references === 'undefined') {
	      return false;
	    }
	    if (pos < max && state.src.charCodeAt(pos) === 0x5B /* [ */) {
	      start = pos + 1;
	      pos = state.md.helpers.parseLinkLabel(state, pos);
	      if (pos >= 0) {
	        label = state.src.slice(start, pos++);
	      } else {
	        pos = labelEnd + 1;
	      }
	    } else {
	      pos = labelEnd + 1;
	    }

	    // covers label === '' and label === undefined
	    // (collapsed reference link and shortcut reference link respectively)
	    if (!label) {
	      label = state.src.slice(labelStart, labelEnd);
	    }
	    ref = state.env.references[normalizeReference(label)];
	    if (!ref) {
	      state.pos = oldPos;
	      return false;
	    }
	    href = ref.href;
	    title = ref.title;
	  }

	  //
	  // We found the end of the link, and know for a fact it's a valid link;
	  // so all that's left to do is to call tokenizer.
	  //
	  if (!silent) {
	    state.pos = labelStart;
	    state.posMax = labelEnd;
	    const token_o = state.push('link_open', 'a', 1);
	    const attrs = [['href', href]];
	    token_o.attrs = attrs;
	    if (title) {
	      attrs.push(['title', title]);
	    }
	    state.linkLevel++;
	    state.md.inline.tokenize(state);
	    state.linkLevel--;
	    state.push('link_close', 'a', -1);
	  }
	  state.pos = pos;
	  state.posMax = max;
	  return true;
	}

	// Process ![image](<src> "title")

	function image(state, silent) {
	  let code, content, label, pos, ref, res, title, start;
	  let href = '';
	  const oldPos = state.pos;
	  const max = state.posMax;
	  if (state.src.charCodeAt(state.pos) !== 0x21 /* ! */) {
	    return false;
	  }
	  if (state.src.charCodeAt(state.pos + 1) !== 0x5B /* [ */) {
	    return false;
	  }
	  const labelStart = state.pos + 2;
	  const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);

	  // parser failed to find ']', so it's not a valid link
	  if (labelEnd < 0) {
	    return false;
	  }
	  pos = labelEnd + 1;
	  if (pos < max && state.src.charCodeAt(pos) === 0x28 /* ( */) {
	    //
	    // Inline link
	    //

	    // [link](  <href>  "title"  )
	    //        ^^ skipping these spaces
	    pos++;
	    for (; pos < max; pos++) {
	      code = state.src.charCodeAt(pos);
	      if (!isSpace(code) && code !== 0x0A) {
	        break;
	      }
	    }
	    if (pos >= max) {
	      return false;
	    }

	    // [link](  <href>  "title"  )
	    //          ^^^^^^ parsing link destination
	    start = pos;
	    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
	    if (res.ok) {
	      href = state.md.normalizeLink(res.str);
	      if (state.md.validateLink(href)) {
	        pos = res.pos;
	      } else {
	        href = '';
	      }
	    }

	    // [link](  <href>  "title"  )
	    //                ^^ skipping these spaces
	    start = pos;
	    for (; pos < max; pos++) {
	      code = state.src.charCodeAt(pos);
	      if (!isSpace(code) && code !== 0x0A) {
	        break;
	      }
	    }

	    // [link](  <href>  "title"  )
	    //                  ^^^^^^^ parsing link title
	    res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
	    if (pos < max && start !== pos && res.ok) {
	      title = res.str;
	      pos = res.pos;

	      // [link](  <href>  "title"  )
	      //                         ^^ skipping these spaces
	      for (; pos < max; pos++) {
	        code = state.src.charCodeAt(pos);
	        if (!isSpace(code) && code !== 0x0A) {
	          break;
	        }
	      }
	    } else {
	      title = '';
	    }
	    if (pos >= max || state.src.charCodeAt(pos) !== 0x29 /* ) */) {
	      state.pos = oldPos;
	      return false;
	    }
	    pos++;
	  } else {
	    //
	    // Link reference
	    //
	    if (typeof state.env.references === 'undefined') {
	      return false;
	    }
	    if (pos < max && state.src.charCodeAt(pos) === 0x5B /* [ */) {
	      start = pos + 1;
	      pos = state.md.helpers.parseLinkLabel(state, pos);
	      if (pos >= 0) {
	        label = state.src.slice(start, pos++);
	      } else {
	        pos = labelEnd + 1;
	      }
	    } else {
	      pos = labelEnd + 1;
	    }

	    // covers label === '' and label === undefined
	    // (collapsed reference link and shortcut reference link respectively)
	    if (!label) {
	      label = state.src.slice(labelStart, labelEnd);
	    }
	    ref = state.env.references[normalizeReference(label)];
	    if (!ref) {
	      state.pos = oldPos;
	      return false;
	    }
	    href = ref.href;
	    title = ref.title;
	  }

	  //
	  // We found the end of the link, and know for a fact it's a valid link;
	  // so all that's left to do is to call tokenizer.
	  //
	  if (!silent) {
	    content = state.src.slice(labelStart, labelEnd);
	    const tokens = [];
	    state.md.inline.parse(content, state.md, state.env, tokens);
	    const token = state.push('image', 'img', 0);
	    const attrs = [['src', href], ['alt', '']];
	    token.attrs = attrs;
	    token.children = tokens;
	    token.content = content;
	    if (title) {
	      attrs.push(['title', title]);
	    }
	  }
	  state.pos = pos;
	  state.posMax = max;
	  return true;
	}

	// Process autolinks '<protocol:...>'

	/* eslint max-len:0 */
	const EMAIL_RE = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/;
	/* eslint-disable-next-line no-control-regex */
	const AUTOLINK_RE = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
	function autolink(state, silent) {
	  let pos = state.pos;
	  if (state.src.charCodeAt(pos) !== 0x3C /* < */) {
	    return false;
	  }
	  const start = state.pos;
	  const max = state.posMax;
	  for (;;) {
	    if (++pos >= max) return false;
	    const ch = state.src.charCodeAt(pos);
	    if (ch === 0x3C /* < */) return false;
	    if (ch === 0x3E /* > */) break;
	  }
	  const url = state.src.slice(start + 1, pos);
	  if (AUTOLINK_RE.test(url)) {
	    const fullUrl = state.md.normalizeLink(url);
	    if (!state.md.validateLink(fullUrl)) {
	      return false;
	    }
	    if (!silent) {
	      const token_o = state.push('link_open', 'a', 1);
	      token_o.attrs = [['href', fullUrl]];
	      token_o.markup = 'autolink';
	      token_o.info = 'auto';
	      const token_t = state.push('text', '', 0);
	      token_t.content = state.md.normalizeLinkText(url);
	      const token_c = state.push('link_close', 'a', -1);
	      token_c.markup = 'autolink';
	      token_c.info = 'auto';
	    }
	    state.pos += url.length + 2;
	    return true;
	  }
	  if (EMAIL_RE.test(url)) {
	    const fullUrl = state.md.normalizeLink('mailto:' + url);
	    if (!state.md.validateLink(fullUrl)) {
	      return false;
	    }
	    if (!silent) {
	      const token_o = state.push('link_open', 'a', 1);
	      token_o.attrs = [['href', fullUrl]];
	      token_o.markup = 'autolink';
	      token_o.info = 'auto';
	      const token_t = state.push('text', '', 0);
	      token_t.content = state.md.normalizeLinkText(url);
	      const token_c = state.push('link_close', 'a', -1);
	      token_c.markup = 'autolink';
	      token_c.info = 'auto';
	    }
	    state.pos += url.length + 2;
	    return true;
	  }
	  return false;
	}

	// Process html tags

	function isLinkOpen(str) {
	  return /^<a[>\s]/i.test(str);
	}
	function isLinkClose(str) {
	  return /^<\/a\s*>/i.test(str);
	}
	function isLetter(ch) {
	  /* eslint no-bitwise:0 */
	  const lc = ch | 0x20; // to lower case
	  return lc >= 0x61 /* a */ && lc <= 0x7a /* z */;
	}
	function html_inline(state, silent) {
	  if (!state.md.options.html) {
	    return false;
	  }

	  // Check start
	  const max = state.posMax;
	  const pos = state.pos;
	  if (state.src.charCodeAt(pos) !== 0x3C /* < */ || pos + 2 >= max) {
	    return false;
	  }

	  // Quick fail on second char
	  const ch = state.src.charCodeAt(pos + 1);
	  if (ch !== 0x21 /* ! */ && ch !== 0x3F /* ? */ && ch !== 0x2F /* / */ && !isLetter(ch)) {
	    return false;
	  }
	  const match = state.src.slice(pos).match(HTML_TAG_RE);
	  if (!match) {
	    return false;
	  }
	  if (!silent) {
	    const token = state.push('html_inline', '', 0);
	    token.content = match[0];
	    if (isLinkOpen(token.content)) state.linkLevel++;
	    if (isLinkClose(token.content)) state.linkLevel--;
	  }
	  state.pos += match[0].length;
	  return true;
	}

	// Process html entity - &#123;, &#xAF;, &quot;, ...

	const DIGITAL_RE = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i;
	const NAMED_RE = /^&([a-z][a-z0-9]{1,31});/i;
	function entity(state, silent) {
	  const pos = state.pos;
	  const max = state.posMax;
	  if (state.src.charCodeAt(pos) !== 0x26 /* & */) return false;
	  if (pos + 1 >= max) return false;
	  const ch = state.src.charCodeAt(pos + 1);
	  if (ch === 0x23 /* # */) {
	    const match = state.src.slice(pos).match(DIGITAL_RE);
	    if (match) {
	      if (!silent) {
	        const code = match[1][0].toLowerCase() === 'x' ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
	        const token = state.push('text_special', '', 0);
	        token.content = isValidEntityCode(code) ? fromCodePoint(code) : fromCodePoint(0xFFFD);
	        token.markup = match[0];
	        token.info = 'entity';
	      }
	      state.pos += match[0].length;
	      return true;
	    }
	  } else {
	    const match = state.src.slice(pos).match(NAMED_RE);
	    if (match) {
	      const decoded = decodeHTML(match[0]);
	      if (decoded !== match[0]) {
	        if (!silent) {
	          const token = state.push('text_special', '', 0);
	          token.content = decoded;
	          token.markup = match[0];
	          token.info = 'entity';
	        }
	        state.pos += match[0].length;
	        return true;
	      }
	    }
	  }
	  return false;
	}

	// For each opening emphasis-like marker find a matching closing one
	//

	function processDelimiters(delimiters) {
	  const openersBottom = {};
	  const max = delimiters.length;
	  if (!max) return;

	  // headerIdx is the first delimiter of the current (where closer is) delimiter run
	  let headerIdx = 0;
	  let lastTokenIdx = -2; // needs any value lower than -1
	  const jumps = [];
	  for (let closerIdx = 0; closerIdx < max; closerIdx++) {
	    const closer = delimiters[closerIdx];
	    jumps.push(0);

	    // markers belong to same delimiter run if:
	    //  - they have adjacent tokens
	    //  - AND markers are the same
	    //
	    if (delimiters[headerIdx].marker !== closer.marker || lastTokenIdx !== closer.token - 1) {
	      headerIdx = closerIdx;
	    }
	    lastTokenIdx = closer.token;

	    // Length is only used for emphasis-specific "rule of 3",
	    // if it's not defined (in strikethrough or 3rd party plugins),
	    // we can default it to 0 to disable those checks.
	    //
	    closer.length = closer.length || 0;
	    if (!closer.close) continue;

	    // Previously calculated lower bounds (previous fails)
	    // for each marker, each delimiter length modulo 3,
	    // and for whether this closer can be an opener;
	    // https://github.com/commonmark/cmark/commit/34250e12ccebdc6372b8b49c44fab57c72443460
	    /* eslint-disable-next-line no-prototype-builtins */
	    if (!openersBottom.hasOwnProperty(closer.marker)) {
	      openersBottom[closer.marker] = [-1, -1, -1, -1, -1, -1];
	    }
	    const minOpenerIdx = openersBottom[closer.marker][(closer.open ? 3 : 0) + closer.length % 3];
	    let openerIdx = headerIdx - jumps[headerIdx] - 1;
	    let newMinOpenerIdx = openerIdx;
	    for (; openerIdx > minOpenerIdx; openerIdx -= jumps[openerIdx] + 1) {
	      const opener = delimiters[openerIdx];
	      if (opener.marker !== closer.marker) continue;
	      if (opener.open && opener.end < 0) {
	        let isOddMatch = false;

	        // from spec:
	        //
	        // If one of the delimiters can both open and close emphasis, then the
	        // sum of the lengths of the delimiter runs containing the opening and
	        // closing delimiters must not be a multiple of 3 unless both lengths
	        // are multiples of 3.
	        //
	        if (opener.close || closer.open) {
	          if ((opener.length + closer.length) % 3 === 0) {
	            if (opener.length % 3 !== 0 || closer.length % 3 !== 0) {
	              isOddMatch = true;
	            }
	          }
	        }
	        if (!isOddMatch) {
	          // If previous delimiter cannot be an opener, we can safely skip
	          // the entire sequence in future checks. This is required to make
	          // sure algorithm has linear complexity (see *_*_*_*_*_... case).
	          //
	          const lastJump = openerIdx > 0 && !delimiters[openerIdx - 1].open ? jumps[openerIdx - 1] + 1 : 0;
	          jumps[closerIdx] = closerIdx - openerIdx + lastJump;
	          jumps[openerIdx] = lastJump;
	          closer.open = false;
	          opener.end = closerIdx;
	          opener.close = false;
	          newMinOpenerIdx = -1;
	          // treat next token as start of run,
	          // it optimizes skips in **<...>**a**<...>** pathological case
	          lastTokenIdx = -2;
	          break;
	        }
	      }
	    }
	    if (newMinOpenerIdx !== -1) {
	      // If match for this delimiter run failed, we want to set lower bound for
	      // future lookups. This is required to make sure algorithm has linear
	      // complexity.
	      //
	      // See details here:
	      // https://github.com/commonmark/cmark/issues/178#issuecomment-270417442
	      //
	      openersBottom[closer.marker][(closer.open ? 3 : 0) + (closer.length || 0) % 3] = newMinOpenerIdx;
	    }
	  }
	}
	function link_pairs(state) {
	  const tokens_meta = state.tokens_meta;
	  const max = state.tokens_meta.length;
	  processDelimiters(state.delimiters);
	  for (let curr = 0; curr < max; curr++) {
	    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
	      processDelimiters(tokens_meta[curr].delimiters);
	    }
	  }
	}

	// Clean up tokens after emphasis and strikethrough postprocessing:
	// merge adjacent text nodes into one and re-calculate all token levels
	//
	// This is necessary because initially emphasis delimiter markers (*, _, ~)
	// are treated as their own separate text tokens. Then emphasis rule either
	// leaves them as text (needed to merge with adjacent text) or turns them
	// into opening/closing tags (which messes up levels inside).
	//

	function fragments_join(state) {
	  let curr, last;
	  let level = 0;
	  const tokens = state.tokens;
	  const max = state.tokens.length;
	  for (curr = last = 0; curr < max; curr++) {
	    // re-calculate levels after emphasis/strikethrough turns some text nodes
	    // into opening/closing tags
	    if (tokens[curr].nesting < 0) level--; // closing tag
	    tokens[curr].level = level;
	    if (tokens[curr].nesting > 0) level++; // opening tag

	    if (tokens[curr].type === 'text' && curr + 1 < max && tokens[curr + 1].type === 'text') {
	      // collapse two adjacent text nodes
	      tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
	    } else {
	      if (curr !== last) {
	        tokens[last] = tokens[curr];
	      }
	      last++;
	    }
	  }
	  if (curr !== last) {
	    tokens.length = last;
	  }
	}

	/** internal
	 * class ParserInline
	 *
	 * Tokenizes paragraph content.
	 **/


	// Parser rules

	const _rules = [['text', text], ['linkify', linkify], ['newline', newline], ['escape', escape], ['backticks', backtick], ['strikethrough', r_strikethrough.tokenize], ['emphasis', r_emphasis.tokenize], ['link', link], ['image', image], ['autolink', autolink], ['html_inline', html_inline], ['entity', entity]];

	// `rule2` ruleset was created specifically for emphasis/strikethrough
	// post-processing and may be changed in the future.
	//
	// Don't use this for anything except pairs (plugins working with `balance_pairs`).
	//
	const _rules2 = [['balance_pairs', link_pairs], ['strikethrough', r_strikethrough.postProcess], ['emphasis', r_emphasis.postProcess],
	// rules for pairs separate '**' into its own text tokens, which may be left unused,
	// rule below merges unused segments back with the rest of the text
	['fragments_join', fragments_join]];

	/**
	 * new ParserInline()
	 **/
	function ParserInline() {
	  /**
	   * ParserInline#ruler -> Ruler
	   *
	   * [[Ruler]] instance. Keep configuration of inline rules.
	   **/
	  this.ruler = new Ruler();
	  for (let i = 0; i < _rules.length; i++) {
	    this.ruler.push(_rules[i][0], _rules[i][1]);
	  }

	  /**
	   * ParserInline#ruler2 -> Ruler
	   *
	   * [[Ruler]] instance. Second ruler used for post-processing
	   * (e.g. in emphasis-like rules).
	   **/
	  this.ruler2 = new Ruler();
	  for (let i = 0; i < _rules2.length; i++) {
	    this.ruler2.push(_rules2[i][0], _rules2[i][1]);
	  }
	}

	// Skip single token by running all rules in validation mode;
	// returns `true` if any rule reported success
	//
	ParserInline.prototype.skipToken = function (state) {
	  const pos = state.pos;
	  const rules = this.ruler.getRules('');
	  const len = rules.length;
	  const maxNesting = state.md.options.maxNesting;
	  const cache = state.cache;
	  if (typeof cache[pos] !== 'undefined') {
	    state.pos = cache[pos];
	    return;
	  }
	  let ok = false;
	  if (state.level < maxNesting) {
	    for (let i = 0; i < len; i++) {
	      // Increment state.level and decrement it later to limit recursion.
	      // It's harmless to do here, because no tokens are created. But ideally,
	      // we'd need a separate private state variable for this purpose.
	      //
	      state.level++;
	      ok = rules[i](state, true);
	      state.level--;
	      if (ok) {
	        if (pos >= state.pos) {
	          throw new Error("inline rule didn't increment state.pos");
	        }
	        break;
	      }
	    }
	  } else {
	    // Too much nesting, just skip until the end of the paragraph.
	    //
	    // NOTE: this will cause links to behave incorrectly in the following case,
	    //       when an amount of `[` is exactly equal to `maxNesting + 1`:
	    //
	    //       [[[[[[[[[[[[[[[[[[[[[foo]()
	    //
	    // TODO: remove this workaround when CM standard will allow nested links
	    //       (we can replace it by preventing links from being parsed in
	    //       validation mode)
	    //
	    state.pos = state.posMax;
	  }
	  if (!ok) {
	    state.pos++;
	  }
	  cache[pos] = state.pos;
	};

	// Generate tokens for input range
	//
	ParserInline.prototype.tokenize = function (state) {
	  const rules = this.ruler.getRules('');
	  const len = rules.length;
	  const end = state.posMax;
	  const maxNesting = state.md.options.maxNesting;
	  while (state.pos < end) {
	    // Try all possible rules.
	    // On success, rule should:
	    //
	    // - update `state.pos`
	    // - update `state.tokens`
	    // - return true
	    const prevPos = state.pos;
	    let ok = false;
	    if (state.level < maxNesting) {
	      for (let i = 0; i < len; i++) {
	        ok = rules[i](state, false);
	        if (ok) {
	          if (prevPos >= state.pos) {
	            throw new Error("inline rule didn't increment state.pos");
	          }
	          break;
	        }
	      }
	    }
	    if (ok) {
	      if (state.pos >= end) {
	        break;
	      }
	      continue;
	    }
	    state.pending += state.src[state.pos++];
	  }
	  if (state.pending) {
	    state.pushPending();
	  }
	};

	/**
	 * ParserInline.parse(str, md, env, outTokens)
	 *
	 * Process input string and push inline tokens into `outTokens`
	 **/
	ParserInline.prototype.parse = function (str, md, env, outTokens) {
	  const state = new this.State(str, md, env, outTokens);
	  this.tokenize(state);
	  const rules = this.ruler2.getRules('');
	  const len = rules.length;
	  for (let i = 0; i < len; i++) {
	    rules[i](state);
	  }
	};
	ParserInline.prototype.State = StateInline;

	function reFactory (opts) {
	  const re = {};
	  opts = opts || {};
	  re.src_Any = Any.source;
	  re.src_Cc = Cc.source;
	  re.src_Z = Z.source;
	  re.src_P = P.source;

	  // \p{\Z\P\Cc\CF} (white spaces + control + format + punctuation)
	  re.src_ZPCc = [re.src_Z, re.src_P, re.src_Cc].join('|');

	  // \p{\Z\Cc} (white spaces + control)
	  re.src_ZCc = [re.src_Z, re.src_Cc].join('|');

	  // Experimental. List of chars, completely prohibited in links
	  // because can separate it from other part of text
	  const text_separators = '[><\uff5c]';

	  // All possible word characters (everything without punctuation, spaces & controls)
	  // Defined via punctuation & spaces to save space
	  // Should be something like \p{\L\N\S\M} (\w but without `_`)
	  re.src_pseudo_letter = '(?:(?!' + text_separators + '|' + re.src_ZPCc + ')' + re.src_Any + ')';
	  // The same as abothe but without [0-9]
	  // var src_pseudo_letter_non_d = '(?:(?![0-9]|' + src_ZPCc + ')' + src_Any + ')';

	  re.src_ip4 = '(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';

	  // Prohibit any of "@/[]()" in user/pass to avoid wrong domain fetch.
	  re.src_auth = '(?:(?:(?!' + re.src_ZCc + '|[@/\\[\\]()]).)+@)?';
	  re.src_port = '(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?';
	  re.src_host_terminator = '(?=$|' + text_separators + '|' + re.src_ZPCc + ')' + '(?!' + (opts['---'] ? '-(?!--)|' : '-|') + '_|:\\d|\\.-|\\.(?!$|' + re.src_ZPCc + '))';
	  re.src_path = '(?:' + '[/?#]' + '(?:' + '(?!' + re.src_ZCc + '|' + text_separators + '|[()[\\]{}.,"\'?!\\-;]).|' + '\\[(?:(?!' + re.src_ZCc + '|\\]).)*\\]|' + '\\((?:(?!' + re.src_ZCc + '|[)]).)*\\)|' + '\\{(?:(?!' + re.src_ZCc + '|[}]).)*\\}|' + '\\"(?:(?!' + re.src_ZCc + '|["]).)+\\"|' + "\\'(?:(?!" + re.src_ZCc + "|[']).)+\\'|" +
	  // allow `I'm_king` if no pair found
	  "\\'(?=" + re.src_pseudo_letter + '|[-])|' +
	  // google has many dots in "google search" links (#66, #81).
	  // github has ... in commit range links,
	  // Restrict to
	  // - english
	  // - percent-encoded
	  // - parts of file path
	  // - params separator
	  // until more examples found.
	  '\\.{2,}[a-zA-Z0-9%/&]|' + '\\.(?!' + re.src_ZCc + '|[.]|$)|' + (opts['---'] ? '\\-(?!--(?:[^-]|$))(?:-*)|' // `---` => long dash, terminate
	  : '\\-+|') +
	  // allow `,,,` in paths
	  ',(?!' + re.src_ZCc + '|$)|' +
	  // allow `;` if not followed by space-like char
	  ';(?!' + re.src_ZCc + '|$)|' +
	  // allow `!!!` in paths, but not at the end
	  '\\!+(?!' + re.src_ZCc + '|[!]|$)|' + '\\?(?!' + re.src_ZCc + '|[?]|$)' + ')+' + '|\\/' + ')?';

	  // Allow anything in markdown spec, forbid quote (") at the first position
	  // because emails enclosed in quotes are far more common
	  re.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*';
	  re.src_xn = 'xn--[a-z0-9\\-]{1,59}';

	  // More to read about domain names
	  // http://serverfault.com/questions/638260/

	  re.src_domain_root =
	  // Allow letters & digits (http://test1)
	  '(?:' + re.src_xn + '|' + re.src_pseudo_letter + '{1,63}' + ')';
	  re.src_domain = '(?:' + re.src_xn + '|' + '(?:' + re.src_pseudo_letter + ')' + '|' + '(?:' + re.src_pseudo_letter + '(?:-|' + re.src_pseudo_letter + '){0,61}' + re.src_pseudo_letter + ')' + ')';
	  re.src_host = '(?:' +
	  // Don't need IP check, because digits are already allowed in normal domain names
	  //   src_ip4 +
	  // '|' +
	  '(?:(?:(?:' + re.src_domain + ')\\.)*' + re.src_domain /* _root */ + ')' + ')';
	  re.tpl_host_fuzzy = '(?:' + re.src_ip4 + '|' + '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))' + ')';
	  re.tpl_host_no_ip_fuzzy = '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))';
	  re.src_host_strict = re.src_host + re.src_host_terminator;
	  re.tpl_host_fuzzy_strict = re.tpl_host_fuzzy + re.src_host_terminator;
	  re.src_host_port_strict = re.src_host + re.src_port + re.src_host_terminator;
	  re.tpl_host_port_fuzzy_strict = re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;
	  re.tpl_host_port_no_ip_fuzzy_strict = re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;

	  //
	  // Main rules
	  //

	  // Rude test fuzzy links by host, for quick deny
	  re.tpl_host_fuzzy_test = 'localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:' + re.src_ZPCc + '|>|$))';
	  re.tpl_email_fuzzy = '(^|' + text_separators + '|"|\\(|' + re.src_ZCc + ')' + '(' + re.src_email_name + '@' + re.tpl_host_fuzzy_strict + ')';
	  re.tpl_link_fuzzy =
	  // Fuzzy link can't be prepended with .:/\- and non punctuation.
	  // but can start with > (markdown blockquote)
	  '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' + '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_fuzzy_strict + re.src_path + ')';
	  re.tpl_link_no_ip_fuzzy =
	  // Fuzzy link can't be prepended with .:/\- and non punctuation.
	  // but can start with > (markdown blockquote)
	  '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' + '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ')';
	  return re;
	}

	//
	// Helpers
	//

	// Merge objects
	//
	function assign(obj /* from1, from2, from3, ... */) {
	  const sources = Array.prototype.slice.call(arguments, 1);
	  sources.forEach(function (source) {
	    if (!source) {
	      return;
	    }
	    Object.keys(source).forEach(function (key) {
	      obj[key] = source[key];
	    });
	  });
	  return obj;
	}
	function _class(obj) {
	  return Object.prototype.toString.call(obj);
	}
	function isString(obj) {
	  return _class(obj) === '[object String]';
	}
	function isObject(obj) {
	  return _class(obj) === '[object Object]';
	}
	function isRegExp(obj) {
	  return _class(obj) === '[object RegExp]';
	}
	function isFunction(obj) {
	  return _class(obj) === '[object Function]';
	}
	function escapeRE(str) {
	  return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
	}

	//

	const defaultOptions = {
	  fuzzyLink: true,
	  fuzzyEmail: true,
	  fuzzyIP: false
	};
	function isOptionsObj(obj) {
	  return Object.keys(obj || {}).reduce(function (acc, k) {
	    /* eslint-disable-next-line no-prototype-builtins */
	    return acc || defaultOptions.hasOwnProperty(k);
	  }, false);
	}
	const defaultSchemas = {
	  'http:': {
	    validate: function (text, pos, self) {
	      const tail = text.slice(pos);
	      if (!self.re.http) {
	        // compile lazily, because "host"-containing variables can change on tlds update.
	        self.re.http = new RegExp('^\\/\\/' + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path, 'i');
	      }
	      if (self.re.http.test(tail)) {
	        return tail.match(self.re.http)[0].length;
	      }
	      return 0;
	    }
	  },
	  'https:': 'http:',
	  'ftp:': 'http:',
	  '//': {
	    validate: function (text, pos, self) {
	      const tail = text.slice(pos);
	      if (!self.re.no_http) {
	        // compile lazily, because "host"-containing variables can change on tlds update.
	        self.re.no_http = new RegExp('^' + self.re.src_auth +
	        // Don't allow single-level domains, because of false positives like '//test'
	        // with code comments
	        '(?:localhost|(?:(?:' + self.re.src_domain + ')\\.)+' + self.re.src_domain_root + ')' + self.re.src_port + self.re.src_host_terminator + self.re.src_path, 'i');
	      }
	      if (self.re.no_http.test(tail)) {
	        // should not be `://` & `///`, that protects from errors in protocol name
	        if (pos >= 3 && text[pos - 3] === ':') {
	          return 0;
	        }
	        if (pos >= 3 && text[pos - 3] === '/') {
	          return 0;
	        }
	        return tail.match(self.re.no_http)[0].length;
	      }
	      return 0;
	    }
	  },
	  'mailto:': {
	    validate: function (text, pos, self) {
	      const tail = text.slice(pos);
	      if (!self.re.mailto) {
	        self.re.mailto = new RegExp('^' + self.re.src_email_name + '@' + self.re.src_host_strict, 'i');
	      }
	      if (self.re.mailto.test(tail)) {
	        return tail.match(self.re.mailto)[0].length;
	      }
	      return 0;
	    }
	  }
	};

	// RE pattern for 2-character tlds (autogenerated by ./support/tlds_2char_gen.js)
	/* eslint-disable-next-line max-len */
	const tlds_2ch_src_re = 'a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]';

	// DON'T try to make PRs with changes. Extend TLDs with LinkifyIt.tlds() instead
	const tlds_default = 'biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф'.split('|');
	function resetScanCache(self) {
	  self.__index__ = -1;
	  self.__text_cache__ = '';
	}
	function createValidator(re) {
	  return function (text, pos) {
	    const tail = text.slice(pos);
	    if (re.test(tail)) {
	      return tail.match(re)[0].length;
	    }
	    return 0;
	  };
	}
	function createNormalizer() {
	  return function (match, self) {
	    self.normalize(match);
	  };
	}

	// Schemas compiler. Build regexps.
	//
	function compile(self) {
	  // Load & clone RE patterns.
	  const re = self.re = reFactory(self.__opts__);

	  // Define dynamic patterns
	  const tlds = self.__tlds__.slice();
	  self.onCompile();
	  if (!self.__tlds_replaced__) {
	    tlds.push(tlds_2ch_src_re);
	  }
	  tlds.push(re.src_xn);
	  re.src_tlds = tlds.join('|');
	  function untpl(tpl) {
	    return tpl.replace('%TLDS%', re.src_tlds);
	  }
	  re.email_fuzzy = RegExp(untpl(re.tpl_email_fuzzy), 'i');
	  re.link_fuzzy = RegExp(untpl(re.tpl_link_fuzzy), 'i');
	  re.link_no_ip_fuzzy = RegExp(untpl(re.tpl_link_no_ip_fuzzy), 'i');
	  re.host_fuzzy_test = RegExp(untpl(re.tpl_host_fuzzy_test), 'i');

	  //
	  // Compile each schema
	  //

	  const aliases = [];
	  self.__compiled__ = {}; // Reset compiled data

	  function schemaError(name, val) {
	    throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
	  }
	  Object.keys(self.__schemas__).forEach(function (name) {
	    const val = self.__schemas__[name];

	    // skip disabled methods
	    if (val === null) {
	      return;
	    }
	    const compiled = {
	      validate: null,
	      link: null
	    };
	    self.__compiled__[name] = compiled;
	    if (isObject(val)) {
	      if (isRegExp(val.validate)) {
	        compiled.validate = createValidator(val.validate);
	      } else if (isFunction(val.validate)) {
	        compiled.validate = val.validate;
	      } else {
	        schemaError(name, val);
	      }
	      if (isFunction(val.normalize)) {
	        compiled.normalize = val.normalize;
	      } else if (!val.normalize) {
	        compiled.normalize = createNormalizer();
	      } else {
	        schemaError(name, val);
	      }
	      return;
	    }
	    if (isString(val)) {
	      aliases.push(name);
	      return;
	    }
	    schemaError(name, val);
	  });

	  //
	  // Compile postponed aliases
	  //

	  aliases.forEach(function (alias) {
	    if (!self.__compiled__[self.__schemas__[alias]]) {
	      // Silently fail on missed schemas to avoid errons on disable.
	      // schemaError(alias, self.__schemas__[alias]);
	      return;
	    }
	    self.__compiled__[alias].validate = self.__compiled__[self.__schemas__[alias]].validate;
	    self.__compiled__[alias].normalize = self.__compiled__[self.__schemas__[alias]].normalize;
	  });

	  //
	  // Fake record for guessed links
	  //
	  self.__compiled__[''] = {
	    validate: null,
	    normalize: createNormalizer()
	  };

	  //
	  // Build schema condition
	  //
	  const slist = Object.keys(self.__compiled__).filter(function (name) {
	    // Filter disabled & fake schemas
	    return name.length > 0 && self.__compiled__[name];
	  }).map(escapeRE).join('|');
	  // (?!_) cause 1.5x slowdown
	  self.re.schema_test = RegExp('(^|(?!_)(?:[><\uff5c]|' + re.src_ZPCc + '))(' + slist + ')', 'i');
	  self.re.schema_search = RegExp('(^|(?!_)(?:[><\uff5c]|' + re.src_ZPCc + '))(' + slist + ')', 'ig');
	  self.re.schema_at_start = RegExp('^' + self.re.schema_search.source, 'i');
	  self.re.pretest = RegExp('(' + self.re.schema_test.source + ')|(' + self.re.host_fuzzy_test.source + ')|@', 'i');

	  //
	  // Cleanup
	  //

	  resetScanCache(self);
	}

	/**
	 * class Match
	 *
	 * Match result. Single element of array, returned by [[LinkifyIt#match]]
	 **/
	function Match(self, shift) {
	  const start = self.__index__;
	  const end = self.__last_index__;
	  const text = self.__text_cache__.slice(start, end);

	  /**
	   * Match#schema -> String
	   *
	   * Prefix (protocol) for matched string.
	   **/
	  this.schema = self.__schema__.toLowerCase();
	  /**
	   * Match#index -> Number
	   *
	   * First position of matched string.
	   **/
	  this.index = start + shift;
	  /**
	   * Match#lastIndex -> Number
	   *
	   * Next position after matched string.
	   **/
	  this.lastIndex = end + shift;
	  /**
	   * Match#raw -> String
	   *
	   * Matched string.
	   **/
	  this.raw = text;
	  /**
	   * Match#text -> String
	   *
	   * Notmalized text of matched string.
	   **/
	  this.text = text;
	  /**
	   * Match#url -> String
	   *
	   * Normalized url of matched string.
	   **/
	  this.url = text;
	}
	function createMatch(self, shift) {
	  const match = new Match(self, shift);
	  self.__compiled__[match.schema].normalize(match, self);
	  return match;
	}

	/**
	 * class LinkifyIt
	 **/

	/**
	 * new LinkifyIt(schemas, options)
	 * - schemas (Object): Optional. Additional schemas to validate (prefix/validator)
	 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
	 *
	 * Creates new linkifier instance with optional additional schemas.
	 * Can be called without `new` keyword for convenience.
	 *
	 * By default understands:
	 *
	 * - `http(s)://...` , `ftp://...`, `mailto:...` & `//...` links
	 * - "fuzzy" links and emails (example.com, foo@bar.com).
	 *
	 * `schemas` is an object, where each key/value describes protocol/rule:
	 *
	 * - __key__ - link prefix (usually, protocol name with `:` at the end, `skype:`
	 *   for example). `linkify-it` makes shure that prefix is not preceeded with
	 *   alphanumeric char and symbols. Only whitespaces and punctuation allowed.
	 * - __value__ - rule to check tail after link prefix
	 *   - _String_ - just alias to existing rule
	 *   - _Object_
	 *     - _validate_ - validator function (should return matched length on success),
	 *       or `RegExp`.
	 *     - _normalize_ - optional function to normalize text & url of matched result
	 *       (for example, for @twitter mentions).
	 *
	 * `options`:
	 *
	 * - __fuzzyLink__ - recognige URL-s without `http(s):` prefix. Default `true`.
	 * - __fuzzyIP__ - allow IPs in fuzzy links above. Can conflict with some texts
	 *   like version numbers. Default `false`.
	 * - __fuzzyEmail__ - recognize emails without `mailto:` prefix.
	 *
	 **/
	function LinkifyIt(schemas, options) {
	  if (!(this instanceof LinkifyIt)) {
	    return new LinkifyIt(schemas, options);
	  }
	  if (!options) {
	    if (isOptionsObj(schemas)) {
	      options = schemas;
	      schemas = {};
	    }
	  }
	  this.__opts__ = assign({}, defaultOptions, options);

	  // Cache last tested result. Used to skip repeating steps on next `match` call.
	  this.__index__ = -1;
	  this.__last_index__ = -1; // Next scan position
	  this.__schema__ = '';
	  this.__text_cache__ = '';
	  this.__schemas__ = assign({}, defaultSchemas, schemas);
	  this.__compiled__ = {};
	  this.__tlds__ = tlds_default;
	  this.__tlds_replaced__ = false;
	  this.re = {};
	  compile(this);
	}

	/** chainable
	 * LinkifyIt#add(schema, definition)
	 * - schema (String): rule name (fixed pattern prefix)
	 * - definition (String|RegExp|Object): schema definition
	 *
	 * Add new rule definition. See constructor description for details.
	 **/
	LinkifyIt.prototype.add = function add(schema, definition) {
	  this.__schemas__[schema] = definition;
	  compile(this);
	  return this;
	};

	/** chainable
	 * LinkifyIt#set(options)
	 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
	 *
	 * Set recognition options for links without schema.
	 **/
	LinkifyIt.prototype.set = function set(options) {
	  this.__opts__ = assign(this.__opts__, options);
	  return this;
	};

	/**
	 * LinkifyIt#test(text) -> Boolean
	 *
	 * Searches linkifiable pattern and returns `true` on success or `false` on fail.
	 **/
	LinkifyIt.prototype.test = function test(text) {
	  // Reset scan cache
	  this.__text_cache__ = text;
	  this.__index__ = -1;
	  if (!text.length) {
	    return false;
	  }
	  let m, ml, me, len, shift, next, re, tld_pos, at_pos;

	  // try to scan for link with schema - that's the most simple rule
	  if (this.re.schema_test.test(text)) {
	    re = this.re.schema_search;
	    re.lastIndex = 0;
	    while ((m = re.exec(text)) !== null) {
	      len = this.testSchemaAt(text, m[2], re.lastIndex);
	      if (len) {
	        this.__schema__ = m[2];
	        this.__index__ = m.index + m[1].length;
	        this.__last_index__ = m.index + m[0].length + len;
	        break;
	      }
	    }
	  }
	  if (this.__opts__.fuzzyLink && this.__compiled__['http:']) {
	    // guess schemaless links
	    tld_pos = text.search(this.re.host_fuzzy_test);
	    if (tld_pos >= 0) {
	      // if tld is located after found link - no need to check fuzzy pattern
	      if (this.__index__ < 0 || tld_pos < this.__index__) {
	        if ((ml = text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {
	          shift = ml.index + ml[1].length;
	          if (this.__index__ < 0 || shift < this.__index__) {
	            this.__schema__ = '';
	            this.__index__ = shift;
	            this.__last_index__ = ml.index + ml[0].length;
	          }
	        }
	      }
	    }
	  }
	  if (this.__opts__.fuzzyEmail && this.__compiled__['mailto:']) {
	    // guess schemaless emails
	    at_pos = text.indexOf('@');
	    if (at_pos >= 0) {
	      // We can't skip this check, because this cases are possible:
	      // 192.168.1.1@gmail.com, my.in@example.com
	      if ((me = text.match(this.re.email_fuzzy)) !== null) {
	        shift = me.index + me[1].length;
	        next = me.index + me[0].length;
	        if (this.__index__ < 0 || shift < this.__index__ || shift === this.__index__ && next > this.__last_index__) {
	          this.__schema__ = 'mailto:';
	          this.__index__ = shift;
	          this.__last_index__ = next;
	        }
	      }
	    }
	  }
	  return this.__index__ >= 0;
	};

	/**
	 * LinkifyIt#pretest(text) -> Boolean
	 *
	 * Very quick check, that can give false positives. Returns true if link MAY BE
	 * can exists. Can be used for speed optimization, when you need to check that
	 * link NOT exists.
	 **/
	LinkifyIt.prototype.pretest = function pretest(text) {
	  return this.re.pretest.test(text);
	};

	/**
	 * LinkifyIt#testSchemaAt(text, name, position) -> Number
	 * - text (String): text to scan
	 * - name (String): rule (schema) name
	 * - position (Number): text offset to check from
	 *
	 * Similar to [[LinkifyIt#test]] but checks only specific protocol tail exactly
	 * at given position. Returns length of found pattern (0 on fail).
	 **/
	LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text, schema, pos) {
	  // If not supported schema check requested - terminate
	  if (!this.__compiled__[schema.toLowerCase()]) {
	    return 0;
	  }
	  return this.__compiled__[schema.toLowerCase()].validate(text, pos, this);
	};

	/**
	 * LinkifyIt#match(text) -> Array|null
	 *
	 * Returns array of found link descriptions or `null` on fail. We strongly
	 * recommend to use [[LinkifyIt#test]] first, for best speed.
	 *
	 * ##### Result match description
	 *
	 * - __schema__ - link schema, can be empty for fuzzy links, or `//` for
	 *   protocol-neutral  links.
	 * - __index__ - offset of matched text
	 * - __lastIndex__ - index of next char after mathch end
	 * - __raw__ - matched text
	 * - __text__ - normalized text
	 * - __url__ - link, generated from matched text
	 **/
	LinkifyIt.prototype.match = function match(text) {
	  const result = [];
	  let shift = 0;

	  // Try to take previous element from cache, if .test() called before
	  if (this.__index__ >= 0 && this.__text_cache__ === text) {
	    result.push(createMatch(this, shift));
	    shift = this.__last_index__;
	  }

	  // Cut head if cache was used
	  let tail = shift ? text.slice(shift) : text;

	  // Scan string until end reached
	  while (this.test(tail)) {
	    result.push(createMatch(this, shift));
	    tail = tail.slice(this.__last_index__);
	    shift += this.__last_index__;
	  }
	  if (result.length) {
	    return result;
	  }
	  return null;
	};

	/**
	 * LinkifyIt#matchAtStart(text) -> Match|null
	 *
	 * Returns fully-formed (not fuzzy) link if it starts at the beginning
	 * of the string, and null otherwise.
	 **/
	LinkifyIt.prototype.matchAtStart = function matchAtStart(text) {
	  // Reset scan cache
	  this.__text_cache__ = text;
	  this.__index__ = -1;
	  if (!text.length) return null;
	  const m = this.re.schema_at_start.exec(text);
	  if (!m) return null;
	  const len = this.testSchemaAt(text, m[2], m[0].length);
	  if (!len) return null;
	  this.__schema__ = m[2];
	  this.__index__ = m.index + m[1].length;
	  this.__last_index__ = m.index + m[0].length + len;
	  return createMatch(this, 0);
	};

	/** chainable
	 * LinkifyIt#tlds(list [, keepOld]) -> this
	 * - list (Array): list of tlds
	 * - keepOld (Boolean): merge with current list if `true` (`false` by default)
	 *
	 * Load (or merge) new tlds list. Those are user for fuzzy links (without prefix)
	 * to avoid false positives. By default this algorythm used:
	 *
	 * - hostname with any 2-letter root zones are ok.
	 * - biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф
	 *   are ok.
	 * - encoded (`xn--...`) root zones are ok.
	 *
	 * If list is replaced, then exact match for 2-chars root zones will be checked.
	 **/
	LinkifyIt.prototype.tlds = function tlds(list, keepOld) {
	  list = Array.isArray(list) ? list : [list];
	  if (!keepOld) {
	    this.__tlds__ = list.slice();
	    this.__tlds_replaced__ = true;
	    compile(this);
	    return this;
	  }
	  this.__tlds__ = this.__tlds__.concat(list).sort().filter(function (el, idx, arr) {
	    return el !== arr[idx - 1];
	  }).reverse();
	  compile(this);
	  return this;
	};

	/**
	 * LinkifyIt#normalize(match)
	 *
	 * Default normalizer (if schema does not define it's own).
	 **/
	LinkifyIt.prototype.normalize = function normalize(match) {
	  // Do minimal possible changes by default. Need to collect feedback prior
	  // to move forward https://github.com/markdown-it/linkify-it/issues/1

	  if (!match.schema) {
	    match.url = 'http://' + match.url;
	  }
	  if (match.schema === 'mailto:' && !/^mailto:/i.test(match.url)) {
	    match.url = 'mailto:' + match.url;
	  }
	};

	/**
	 * LinkifyIt#onCompile()
	 *
	 * Override to modify basic RegExp-s.
	 **/
	LinkifyIt.prototype.onCompile = function onCompile() {};

	/** Highest positive signed 32-bit float value */
	const maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	const base = 36;
	const tMin = 1;
	const tMax = 26;
	const skew = 38;
	const damp = 700;
	const initialBias = 72;
	const initialN = 128; // 0x80
	const delimiter = '-'; // '\x2D'

	/** Regular expressions */
	const regexPunycode = /^xn--/;
	const regexNonASCII = /[^\0-\x7F]/; // Note: U+007F DEL is excluded too.
	const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

	/** Error messages */
	const errors = {
	  'overflow': 'Overflow: input needs wider integers to process',
	  'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	  'invalid-input': 'Invalid input'
	};

	/** Convenience shortcuts */
	const baseMinusTMin = base - tMin;
	const floor = Math.floor;
	const stringFromCharCode = String.fromCharCode;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
	  throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, callback) {
	  const result = [];
	  let length = array.length;
	  while (length--) {
	    result[length] = callback(array[length]);
	  }
	  return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {String} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(domain, callback) {
	  const parts = domain.split('@');
	  let result = '';
	  if (parts.length > 1) {
	    // In email addresses, only the domain name should be punycoded. Leave
	    // the local part (i.e. everything up to `@`) intact.
	    result = parts[0] + '@';
	    domain = parts[1];
	  }
	  // Avoid `split(regex)` for IE8 compatibility. See #17.
	  domain = domain.replace(regexSeparators, '\x2E');
	  const labels = domain.split('.');
	  const encoded = map(labels, callback).join('.');
	  return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
	  const output = [];
	  let counter = 0;
	  const length = string.length;
	  while (counter < length) {
	    const value = string.charCodeAt(counter++);
	    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
	      // It's a high surrogate, and there is a next character.
	      const extra = string.charCodeAt(counter++);
	      if ((extra & 0xFC00) == 0xDC00) {
	        // Low surrogate.
	        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
	      } else {
	        // It's an unmatched surrogate; only append this code unit, in case the
	        // next code unit is the high surrogate of a surrogate pair.
	        output.push(value);
	        counter--;
	      }
	    } else {
	      output.push(value);
	    }
	  }
	  return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	const ucs2encode = codePoints => String.fromCodePoint(...codePoints);

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	const basicToDigit = function (codePoint) {
	  if (codePoint >= 0x30 && codePoint < 0x3A) {
	    return 26 + (codePoint - 0x30);
	  }
	  if (codePoint >= 0x41 && codePoint < 0x5B) {
	    return codePoint - 0x41;
	  }
	  if (codePoint >= 0x61 && codePoint < 0x7B) {
	    return codePoint - 0x61;
	  }
	  return base;
	};

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	const digitToBasic = function (digit, flag) {
	  //  0..25 map to ASCII a..z or A..Z
	  // 26..35 map to ASCII 0..9
	  return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	};

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	const adapt = function (delta, numPoints, firstTime) {
	  let k = 0;
	  delta = firstTime ? floor(delta / damp) : delta >> 1;
	  delta += floor(delta / numPoints);
	  for /* no initialization */
	  (; delta > baseMinusTMin * tMax >> 1; k += base) {
	    delta = floor(delta / baseMinusTMin);
	  }
	  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	};

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	const decode = function (input) {
	  // Don't use UCS-2.
	  const output = [];
	  const inputLength = input.length;
	  let i = 0;
	  let n = initialN;
	  let bias = initialBias;

	  // Handle the basic code points: let `basic` be the number of input code
	  // points before the last delimiter, or `0` if there is none, then copy
	  // the first basic code points to the output.

	  let basic = input.lastIndexOf(delimiter);
	  if (basic < 0) {
	    basic = 0;
	  }
	  for (let j = 0; j < basic; ++j) {
	    // if it's not a basic code point
	    if (input.charCodeAt(j) >= 0x80) {
	      error('not-basic');
	    }
	    output.push(input.charCodeAt(j));
	  }

	  // Main decoding loop: start just after the last delimiter if any basic code
	  // points were copied; start at the beginning otherwise.

	  for /* no final expression */
	  (let index = basic > 0 ? basic + 1 : 0; index < inputLength;) {
	    // `index` is the index of the next character to be consumed.
	    // Decode a generalized variable-length integer into `delta`,
	    // which gets added to `i`. The overflow checking is easier
	    // if we increase `i` as we go, then subtract off its starting
	    // value at the end to obtain `delta`.
	    const oldi = i;
	    for /* no condition */
	    (let w = 1, k = base;; k += base) {
	      if (index >= inputLength) {
	        error('invalid-input');
	      }
	      const digit = basicToDigit(input.charCodeAt(index++));
	      if (digit >= base) {
	        error('invalid-input');
	      }
	      if (digit > floor((maxInt - i) / w)) {
	        error('overflow');
	      }
	      i += digit * w;
	      const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
	      if (digit < t) {
	        break;
	      }
	      const baseMinusT = base - t;
	      if (w > floor(maxInt / baseMinusT)) {
	        error('overflow');
	      }
	      w *= baseMinusT;
	    }
	    const out = output.length + 1;
	    bias = adapt(i - oldi, out, oldi == 0);

	    // `i` was supposed to wrap around from `out` to `0`,
	    // incrementing `n` each time, so we'll fix that now:
	    if (floor(i / out) > maxInt - n) {
	      error('overflow');
	    }
	    n += floor(i / out);
	    i %= out;

	    // Insert `n` at position `i` of the output.
	    output.splice(i++, 0, n);
	  }
	  return String.fromCodePoint(...output);
	};

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	const encode = function (input) {
	  const output = [];

	  // Convert the input in UCS-2 to an array of Unicode code points.
	  input = ucs2decode(input);

	  // Cache the length.
	  const inputLength = input.length;

	  // Initialize the state.
	  let n = initialN;
	  let delta = 0;
	  let bias = initialBias;

	  // Handle the basic code points.
	  for (const currentValue of input) {
	    if (currentValue < 0x80) {
	      output.push(stringFromCharCode(currentValue));
	    }
	  }
	  const basicLength = output.length;
	  let handledCPCount = basicLength;

	  // `handledCPCount` is the number of code points that have been handled;
	  // `basicLength` is the number of basic code points.

	  // Finish the basic string with a delimiter unless it's empty.
	  if (basicLength) {
	    output.push(delimiter);
	  }

	  // Main encoding loop:
	  while (handledCPCount < inputLength) {
	    // All non-basic code points < n have been handled already. Find the next
	    // larger one:
	    let m = maxInt;
	    for (const currentValue of input) {
	      if (currentValue >= n && currentValue < m) {
	        m = currentValue;
	      }
	    }

	    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
	    // but guard against overflow.
	    const handledCPCountPlusOne = handledCPCount + 1;
	    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
	      error('overflow');
	    }
	    delta += (m - n) * handledCPCountPlusOne;
	    n = m;
	    for (const currentValue of input) {
	      if (currentValue < n && ++delta > maxInt) {
	        error('overflow');
	      }
	      if (currentValue === n) {
	        // Represent delta as a generalized variable-length integer.
	        let q = delta;
	        for /* no condition */
	        (let k = base;; k += base) {
	          const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
	          if (q < t) {
	            break;
	          }
	          const qMinusT = q - t;
	          const baseMinusT = base - t;
	          output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
	          q = floor(qMinusT / baseMinusT);
	        }
	        output.push(stringFromCharCode(digitToBasic(q, 0)));
	        bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
	        delta = 0;
	        ++handledCPCount;
	      }
	    }
	    ++delta;
	    ++n;
	  }
	  return output.join('');
	};

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	const toUnicode = function (input) {
	  return mapDomain(input, function (string) {
	    return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
	  });
	};

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	const toASCII = function (input) {
	  return mapDomain(input, function (string) {
	    return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
	  });
	};

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	const punycode = {
	  /**
	   * A string representing the current Punycode.js version number.
	   * @memberOf punycode
	   * @type String
	   */
	  'version': '2.3.1',
	  /**
	   * An object of methods to convert from JavaScript's internal character
	   * representation (UCS-2) to Unicode code points, and back.
	   * @see <https://mathiasbynens.be/notes/javascript-encoding>
	   * @memberOf punycode
	   * @type Object
	   */
	  'ucs2': {
	    'decode': ucs2decode,
	    'encode': ucs2encode
	  },
	  'decode': decode,
	  'encode': encode,
	  'toASCII': toASCII,
	  'toUnicode': toUnicode
	};

	// markdown-it default options

	var cfg_default = {
	  options: {
	    // Enable HTML tags in source
	    html: false,
	    // Use '/' to close single tags (<br />)
	    xhtmlOut: false,
	    // Convert '\n' in paragraphs into <br>
	    breaks: false,
	    // CSS language prefix for fenced blocks
	    langPrefix: 'language-',
	    // autoconvert URL-like texts to links
	    linkify: false,
	    // Enable some language-neutral replacements + quotes beautification
	    typographer: false,
	    // Double + single quotes replacement pairs, when typographer enabled,
	    // and smartquotes on. Could be either a String or an Array.
	    //
	    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
	    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
	    quotes: '\u201c\u201d\u2018\u2019',
	    /* “”‘’ */

	    // Highlighter function. Should return escaped HTML,
	    // or '' if the source string is not changed and should be escaped externaly.
	    // If result starts with <pre... internal wrapper is skipped.
	    //
	    // function (/*str, lang*/) { return ''; }
	    //
	    highlight: null,
	    // Internal protection, recursion limit
	    maxNesting: 100
	  },
	  components: {
	    core: {},
	    block: {},
	    inline: {}
	  }
	};

	// "Zero" preset, with nothing enabled. Useful for manual configuring of simple
	// modes. For example, to parse bold/italic only.

	var cfg_zero = {
	  options: {
	    // Enable HTML tags in source
	    html: false,
	    // Use '/' to close single tags (<br />)
	    xhtmlOut: false,
	    // Convert '\n' in paragraphs into <br>
	    breaks: false,
	    // CSS language prefix for fenced blocks
	    langPrefix: 'language-',
	    // autoconvert URL-like texts to links
	    linkify: false,
	    // Enable some language-neutral replacements + quotes beautification
	    typographer: false,
	    // Double + single quotes replacement pairs, when typographer enabled,
	    // and smartquotes on. Could be either a String or an Array.
	    //
	    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
	    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
	    quotes: '\u201c\u201d\u2018\u2019',
	    /* “”‘’ */

	    // Highlighter function. Should return escaped HTML,
	    // or '' if the source string is not changed and should be escaped externaly.
	    // If result starts with <pre... internal wrapper is skipped.
	    //
	    // function (/*str, lang*/) { return ''; }
	    //
	    highlight: null,
	    // Internal protection, recursion limit
	    maxNesting: 20
	  },
	  components: {
	    core: {
	      rules: ['normalize', 'block', 'inline', 'text_join']
	    },
	    block: {
	      rules: ['paragraph']
	    },
	    inline: {
	      rules: ['text'],
	      rules2: ['balance_pairs', 'fragments_join']
	    }
	  }
	};

	// Commonmark default options

	var cfg_commonmark = {
	  options: {
	    // Enable HTML tags in source
	    html: true,
	    // Use '/' to close single tags (<br />)
	    xhtmlOut: true,
	    // Convert '\n' in paragraphs into <br>
	    breaks: false,
	    // CSS language prefix for fenced blocks
	    langPrefix: 'language-',
	    // autoconvert URL-like texts to links
	    linkify: false,
	    // Enable some language-neutral replacements + quotes beautification
	    typographer: false,
	    // Double + single quotes replacement pairs, when typographer enabled,
	    // and smartquotes on. Could be either a String or an Array.
	    //
	    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
	    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
	    quotes: '\u201c\u201d\u2018\u2019',
	    /* “”‘’ */

	    // Highlighter function. Should return escaped HTML,
	    // or '' if the source string is not changed and should be escaped externaly.
	    // If result starts with <pre... internal wrapper is skipped.
	    //
	    // function (/*str, lang*/) { return ''; }
	    //
	    highlight: null,
	    // Internal protection, recursion limit
	    maxNesting: 20
	  },
	  components: {
	    core: {
	      rules: ['normalize', 'block', 'inline', 'text_join']
	    },
	    block: {
	      rules: ['blockquote', 'code', 'fence', 'heading', 'hr', 'html_block', 'lheading', 'list', 'reference', 'paragraph']
	    },
	    inline: {
	      rules: ['autolink', 'backticks', 'emphasis', 'entity', 'escape', 'html_inline', 'image', 'link', 'newline', 'text'],
	      rules2: ['balance_pairs', 'emphasis', 'fragments_join']
	    }
	  }
	};

	// Main parser class

	const config = {
	  default: cfg_default,
	  zero: cfg_zero,
	  commonmark: cfg_commonmark
	};

	//
	// This validator can prohibit more than really needed to prevent XSS. It's a
	// tradeoff to keep code simple and to be secure by default.
	//
	// If you need different setup - override validator method as you wish. Or
	// replace it with dummy function and use external sanitizer.
	//

	const BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
	const GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;
	function validateLink(url) {
	  // url should be normalized at this point, and existing entities are decoded
	  const str = url.trim().toLowerCase();
	  return BAD_PROTO_RE.test(str) ? GOOD_DATA_RE.test(str) : true;
	}
	const RECODE_HOSTNAME_FOR = ['http:', 'https:', 'mailto:'];
	function normalizeLink(url) {
	  const parsed = urlParse(url, true);
	  if (parsed.hostname) {
	    // Encode hostnames in urls like:
	    // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
	    //
	    // We don't encode unknown schemas, because it's likely that we encode
	    // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
	    //
	    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
	      try {
	        parsed.hostname = punycode.toASCII(parsed.hostname);
	      } catch (er) {/**/}
	    }
	  }
	  return encode$1(format(parsed));
	}
	function normalizeLinkText(url) {
	  const parsed = urlParse(url, true);
	  if (parsed.hostname) {
	    // Encode hostnames in urls like:
	    // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
	    //
	    // We don't encode unknown schemas, because it's likely that we encode
	    // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
	    //
	    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
	      try {
	        parsed.hostname = punycode.toUnicode(parsed.hostname);
	      } catch (er) {/**/}
	    }
	  }

	  // add '%' to exclude list because of https://github.com/markdown-it/markdown-it/issues/720
	  return decode$1(format(parsed), decode$1.defaultChars + '%');
	}

	/**
	 * class MarkdownIt
	 *
	 * Main parser/renderer class.
	 *
	 * ##### Usage
	 *
	 * ```javascript
	 * // node.js, "classic" way:
	 * var MarkdownIt = require('markdown-it'),
	 *     md = new MarkdownIt();
	 * var result = md.render('# markdown-it rulezz!');
	 *
	 * // node.js, the same, but with sugar:
	 * var md = require('markdown-it')();
	 * var result = md.render('# markdown-it rulezz!');
	 *
	 * // browser without AMD, added to "window" on script load
	 * // Note, there are no dash.
	 * var md = window.markdownit();
	 * var result = md.render('# markdown-it rulezz!');
	 * ```
	 *
	 * Single line rendering, without paragraph wrap:
	 *
	 * ```javascript
	 * var md = require('markdown-it')();
	 * var result = md.renderInline('__markdown-it__ rulezz!');
	 * ```
	 **/

	/**
	 * new MarkdownIt([presetName, options])
	 * - presetName (String): optional, `commonmark` / `zero`
	 * - options (Object)
	 *
	 * Creates parser instanse with given config. Can be called without `new`.
	 *
	 * ##### presetName
	 *
	 * MarkdownIt provides named presets as a convenience to quickly
	 * enable/disable active syntax rules and options for common use cases.
	 *
	 * - ["commonmark"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.mjs) -
	 *   configures parser to strict [CommonMark](http://commonmark.org/) mode.
	 * - [default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.mjs) -
	 *   similar to GFM, used when no preset name given. Enables all available rules,
	 *   but still without html, typographer & autolinker.
	 * - ["zero"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.mjs) -
	 *   all rules disabled. Useful to quickly setup your config via `.enable()`.
	 *   For example, when you need only `bold` and `italic` markup and nothing else.
	 *
	 * ##### options:
	 *
	 * - __html__ - `false`. Set `true` to enable HTML tags in source. Be careful!
	 *   That's not safe! You may need external sanitizer to protect output from XSS.
	 *   It's better to extend features via plugins, instead of enabling HTML.
	 * - __xhtmlOut__ - `false`. Set `true` to add '/' when closing single tags
	 *   (`<br />`). This is needed only for full CommonMark compatibility. In real
	 *   world you will need HTML output.
	 * - __breaks__ - `false`. Set `true` to convert `\n` in paragraphs into `<br>`.
	 * - __langPrefix__ - `language-`. CSS language class prefix for fenced blocks.
	 *   Can be useful for external highlighters.
	 * - __linkify__ - `false`. Set `true` to autoconvert URL-like text to links.
	 * - __typographer__  - `false`. Set `true` to enable [some language-neutral
	 *   replacement](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs) +
	 *   quotes beautification (smartquotes).
	 * - __quotes__ - `“”‘’`, String or Array. Double + single quotes replacement
	 *   pairs, when typographer enabled and smartquotes on. For example, you can
	 *   use `'«»„“'` for Russian, `'„“‚‘'` for German, and
	 *   `['«\xA0', '\xA0»', '‹\xA0', '\xA0›']` for French (including nbsp).
	 * - __highlight__ - `null`. Highlighter function for fenced code blocks.
	 *   Highlighter `function (str, lang)` should return escaped HTML. It can also
	 *   return empty string if the source was not changed and should be escaped
	 *   externaly. If result starts with <pre... internal wrapper is skipped.
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * // commonmark mode
	 * var md = require('markdown-it')('commonmark');
	 *
	 * // default mode
	 * var md = require('markdown-it')();
	 *
	 * // enable everything
	 * var md = require('markdown-it')({
	 *   html: true,
	 *   linkify: true,
	 *   typographer: true
	 * });
	 * ```
	 *
	 * ##### Syntax highlighting
	 *
	 * ```js
	 * var hljs = require('highlight.js') // https://highlightjs.org/
	 *
	 * var md = require('markdown-it')({
	 *   highlight: function (str, lang) {
	 *     if (lang && hljs.getLanguage(lang)) {
	 *       try {
	 *         return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
	 *       } catch (__) {}
	 *     }
	 *
	 *     return ''; // use external default escaping
	 *   }
	 * });
	 * ```
	 *
	 * Or with full wrapper override (if you need assign class to `<pre>` or `<code>`):
	 *
	 * ```javascript
	 * var hljs = require('highlight.js') // https://highlightjs.org/
	 *
	 * // Actual default values
	 * var md = require('markdown-it')({
	 *   highlight: function (str, lang) {
	 *     if (lang && hljs.getLanguage(lang)) {
	 *       try {
	 *         return '<pre><code class="hljs">' +
	 *                hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
	 *                '</code></pre>';
	 *       } catch (__) {}
	 *     }
	 *
	 *     return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
	 *   }
	 * });
	 * ```
	 *
	 **/
	function MarkdownIt(presetName, options) {
	  if (!(this instanceof MarkdownIt)) {
	    return new MarkdownIt(presetName, options);
	  }
	  if (!options) {
	    if (!isString$1(presetName)) {
	      options = presetName || {};
	      presetName = 'default';
	    }
	  }

	  /**
	   * MarkdownIt#inline -> ParserInline
	   *
	   * Instance of [[ParserInline]]. You may need it to add new rules when
	   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
	   * [[MarkdownIt.enable]].
	   **/
	  this.inline = new ParserInline();

	  /**
	   * MarkdownIt#block -> ParserBlock
	   *
	   * Instance of [[ParserBlock]]. You may need it to add new rules when
	   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
	   * [[MarkdownIt.enable]].
	   **/
	  this.block = new ParserBlock();

	  /**
	   * MarkdownIt#core -> Core
	   *
	   * Instance of [[Core]] chain executor. You may need it to add new rules when
	   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
	   * [[MarkdownIt.enable]].
	   **/
	  this.core = new Core();

	  /**
	   * MarkdownIt#renderer -> Renderer
	   *
	   * Instance of [[Renderer]]. Use it to modify output look. Or to add rendering
	   * rules for new token types, generated by plugins.
	   *
	   * ##### Example
	   *
	   * ```javascript
	   * var md = require('markdown-it')();
	   *
	   * function myToken(tokens, idx, options, env, self) {
	   *   //...
	   *   return result;
	   * };
	   *
	   * md.renderer.rules['my_token'] = myToken
	   * ```
	   *
	   * See [[Renderer]] docs and [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.mjs).
	   **/
	  this.renderer = new Renderer();

	  /**
	   * MarkdownIt#linkify -> LinkifyIt
	   *
	   * [linkify-it](https://github.com/markdown-it/linkify-it) instance.
	   * Used by [linkify](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/linkify.mjs)
	   * rule.
	   **/
	  this.linkify = new LinkifyIt();

	  /**
	   * MarkdownIt#validateLink(url) -> Boolean
	   *
	   * Link validation function. CommonMark allows too much in links. By default
	   * we disable `javascript:`, `vbscript:`, `file:` schemas, and almost all `data:...` schemas
	   * except some embedded image types.
	   *
	   * You can change this behaviour:
	   *
	   * ```javascript
	   * var md = require('markdown-it')();
	   * // enable everything
	   * md.validateLink = function () { return true; }
	   * ```
	   **/
	  this.validateLink = validateLink;

	  /**
	   * MarkdownIt#normalizeLink(url) -> String
	   *
	   * Function used to encode link url to a machine-readable format,
	   * which includes url-encoding, punycode, etc.
	   **/
	  this.normalizeLink = normalizeLink;

	  /**
	   * MarkdownIt#normalizeLinkText(url) -> String
	   *
	   * Function used to decode link url to a human-readable format`
	   **/
	  this.normalizeLinkText = normalizeLinkText;

	  // Expose utils & helpers for easy acces from plugins

	  /**
	   * MarkdownIt#utils -> utils
	   *
	   * Assorted utility functions, useful to write plugins. See details
	   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/common/utils.mjs).
	   **/
	  this.utils = utils;

	  /**
	   * MarkdownIt#helpers -> helpers
	   *
	   * Link components parser functions, useful to write plugins. See details
	   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/helpers).
	   **/
	  this.helpers = assign$1({}, helpers);
	  this.options = {};
	  this.configure(presetName);
	  if (options) {
	    this.set(options);
	  }
	}

	/** chainable
	 * MarkdownIt.set(options)
	 *
	 * Set parser options (in the same format as in constructor). Probably, you
	 * will never need it, but you can change options after constructor call.
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * var md = require('markdown-it')()
	 *             .set({ html: true, breaks: true })
	 *             .set({ typographer, true });
	 * ```
	 *
	 * __Note:__ To achieve the best possible performance, don't modify a
	 * `markdown-it` instance options on the fly. If you need multiple configurations
	 * it's best to create multiple instances and initialize each with separate
	 * config.
	 **/
	MarkdownIt.prototype.set = function (options) {
	  assign$1(this.options, options);
	  return this;
	};

	/** chainable, internal
	 * MarkdownIt.configure(presets)
	 *
	 * Batch load of all options and compenent settings. This is internal method,
	 * and you probably will not need it. But if you will - see available presets
	 * and data structure [here](https://github.com/markdown-it/markdown-it/tree/master/lib/presets)
	 *
	 * We strongly recommend to use presets instead of direct config loads. That
	 * will give better compatibility with next versions.
	 **/
	MarkdownIt.prototype.configure = function (presets) {
	  const self = this;
	  if (isString$1(presets)) {
	    const presetName = presets;
	    presets = config[presetName];
	    if (!presets) {
	      throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name');
	    }
	  }
	  if (!presets) {
	    throw new Error('Wrong `markdown-it` preset, can\'t be empty');
	  }
	  if (presets.options) {
	    self.set(presets.options);
	  }
	  if (presets.components) {
	    Object.keys(presets.components).forEach(function (name) {
	      if (presets.components[name].rules) {
	        self[name].ruler.enableOnly(presets.components[name].rules);
	      }
	      if (presets.components[name].rules2) {
	        self[name].ruler2.enableOnly(presets.components[name].rules2);
	      }
	    });
	  }
	  return this;
	};

	/** chainable
	 * MarkdownIt.enable(list, ignoreInvalid)
	 * - list (String|Array): rule name or list of rule names to enable
	 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
	 *
	 * Enable list or rules. It will automatically find appropriate components,
	 * containing rules with given names. If rule not found, and `ignoreInvalid`
	 * not set - throws exception.
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * var md = require('markdown-it')()
	 *             .enable(['sub', 'sup'])
	 *             .disable('smartquotes');
	 * ```
	 **/
	MarkdownIt.prototype.enable = function (list, ignoreInvalid) {
	  let result = [];
	  if (!Array.isArray(list)) {
	    list = [list];
	  }
	  ['core', 'block', 'inline'].forEach(function (chain) {
	    result = result.concat(this[chain].ruler.enable(list, true));
	  }, this);
	  result = result.concat(this.inline.ruler2.enable(list, true));
	  const missed = list.filter(function (name) {
	    return result.indexOf(name) < 0;
	  });
	  if (missed.length && !ignoreInvalid) {
	    throw new Error('MarkdownIt. Failed to enable unknown rule(s): ' + missed);
	  }
	  return this;
	};

	/** chainable
	 * MarkdownIt.disable(list, ignoreInvalid)
	 * - list (String|Array): rule name or list of rule names to disable.
	 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
	 *
	 * The same as [[MarkdownIt.enable]], but turn specified rules off.
	 **/
	MarkdownIt.prototype.disable = function (list, ignoreInvalid) {
	  let result = [];
	  if (!Array.isArray(list)) {
	    list = [list];
	  }
	  ['core', 'block', 'inline'].forEach(function (chain) {
	    result = result.concat(this[chain].ruler.disable(list, true));
	  }, this);
	  result = result.concat(this.inline.ruler2.disable(list, true));
	  const missed = list.filter(function (name) {
	    return result.indexOf(name) < 0;
	  });
	  if (missed.length && !ignoreInvalid) {
	    throw new Error('MarkdownIt. Failed to disable unknown rule(s): ' + missed);
	  }
	  return this;
	};

	/** chainable
	 * MarkdownIt.use(plugin, params)
	 *
	 * Load specified plugin with given params into current parser instance.
	 * It's just a sugar to call `plugin(md, params)` with curring.
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * var iterator = require('markdown-it-for-inline');
	 * var md = require('markdown-it')()
	 *             .use(iterator, 'foo_replace', 'text', function (tokens, idx) {
	 *               tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
	 *             });
	 * ```
	 **/
	MarkdownIt.prototype.use = function (plugin /*, params, ... */) {
	  const args = [this].concat(Array.prototype.slice.call(arguments, 1));
	  plugin.apply(plugin, args);
	  return this;
	};

	/** internal
	 * MarkdownIt.parse(src, env) -> Array
	 * - src (String): source string
	 * - env (Object): environment sandbox
	 *
	 * Parse input string and return list of block tokens (special token type
	 * "inline" will contain list of inline tokens). You should not call this
	 * method directly, until you write custom renderer (for example, to produce
	 * AST).
	 *
	 * `env` is used to pass data between "distributed" rules and return additional
	 * metadata like reference info, needed for the renderer. It also can be used to
	 * inject data in specific cases. Usually, you will be ok to pass `{}`,
	 * and then pass updated object to renderer.
	 **/
	MarkdownIt.prototype.parse = function (src, env) {
	  if (typeof src !== 'string') {
	    throw new Error('Input data should be a String');
	  }
	  const state = new this.core.State(src, this, env);
	  this.core.process(state);
	  return state.tokens;
	};

	/**
	 * MarkdownIt.render(src [, env]) -> String
	 * - src (String): source string
	 * - env (Object): environment sandbox
	 *
	 * Render markdown string into html. It does all magic for you :).
	 *
	 * `env` can be used to inject additional metadata (`{}` by default).
	 * But you will not need it with high probability. See also comment
	 * in [[MarkdownIt.parse]].
	 **/
	MarkdownIt.prototype.render = function (src, env) {
	  env = env || {};
	  return this.renderer.render(this.parse(src, env), this.options, env);
	};

	/** internal
	 * MarkdownIt.parseInline(src, env) -> Array
	 * - src (String): source string
	 * - env (Object): environment sandbox
	 *
	 * The same as [[MarkdownIt.parse]] but skip all block rules. It returns the
	 * block tokens list with the single `inline` element, containing parsed inline
	 * tokens in `children` property. Also updates `env` object.
	 **/
	MarkdownIt.prototype.parseInline = function (src, env) {
	  const state = new this.core.State(src, this, env);
	  state.inlineMode = true;
	  this.core.process(state);
	  return state.tokens;
	};

	/**
	 * MarkdownIt.renderInline(src [, env]) -> String
	 * - src (String): source string
	 * - env (Object): environment sandbox
	 *
	 * Similar to [[MarkdownIt.render]] but for single paragraph content. Result
	 * will NOT be wrapped into `<p>` tags.
	 **/
	MarkdownIt.prototype.renderInline = function (src, env) {
	  env = env || {};
	  return this.renderer.render(this.parseInline(src, env), this.options, env);
	};

	var css_248z$2 = ".style_markdown__85-3L{padding:12px}";
	var styles$2 = {"markdown":"style_markdown__85-3L"};
	styleInject(css_248z$2);

	const Markdown = ({ content }) => {
	    return (React.createElement("div", { className: classnames('markdown-body', styles$2.markdown), dangerouslySetInnerHTML: { __html: MarkdownIt().render(content) } }));
	};
	var Markdown$1 = React.memo(Markdown);

	var css_248z$1 = ".style_icon-button__PrPfz{background-color:unset;border:unset;color:#666;cursor:pointer;display:inline-block;opacity:.2;transition:all .1s;user-select:none}.style_icon-button__PrPfz.style_active__2dg6t{color:#0d1117;opacity:1}.style_icon-button__PrPfz:hover{opacity:1}";
	var styles$1 = {"icon-button":"style_icon-button__PrPfz","active":"style_active__2dg6t","iconButton":"style_icon-button__PrPfz"};
	styleInject(css_248z$1);

	const IconButton = (_a) => {
	    var { className, active = false, onClick } = _a, rest = __rest(_a, ["className", "active", "onClick"]);
	    return (React.createElement(Icon$1, Object.assign({}, rest, { className: classnames(styles$1.iconButton, className, {
	            [styles$1.active]: active,
	        }), color: "pink", onClick: onClick })));
	};
	var IconButton$1 = React.memo(IconButton);

	var defaultTheme = function defaultTheme(editor, shareState) {
	  editor.events.on('selected', function (nodes, point) {
	    var _a, _b;
	    shareState.selectedNodes = nodes;
	    shareState.selectedPoint = point;
	    if (point) {
	      shareState.selectedLine = (_b = (_a = editor.deformers.find(function (i) {
	        return i.curveDot === point;
	      })) === null || _a === void 0 ? void 0 : _a.curveBar) !== null && _b !== void 0 ? _b : null;
	    }
	  });
	  editor.events.on('deselected', function () {
	    shareState.selectedNodes = [];
	    shareState.selectedPoint = null;
	    shareState.selectedLine = null;
	  });
	  return {
	    path: function path(decorator, pathObject) {
	      pathObject.set({
	        stroke: '#333',
	        strokeWidth: 4,
	        fill: 'transparent',
	        strokeUniform: true
	      });
	    },
	    node: function node(decorator) {
	      var object = new fabric.fabric.Circle({
	        strokeWidth: 4,
	        radius: 6,
	        fill: '#ffffff',
	        stroke: '#4b4b4b'
	      });
	      object.on('mouseover', function () {
	        shareState.hoverNode = object;
	      });
	      object.on('mouseout', function () {
	        shareState.hoverNode = null;
	      });
	      object.on('removed', function () {
	        if (shareState.hoverNode === object) shareState.hoverNode = null;
	      });
	      return decorator(object, function () {
	        var _a;
	        object.set({
	          fill: ((_a = shareState.selectedNodes) === null || _a === void 0 ? void 0 : _a.includes(object)) ? '#29ca6e' : shareState.hoverNode === object ? '#7ef4ad' : '#ffffff'
	        });
	      });
	    },
	    dot: function dot(decorator) {
	      var circle = new fabric.fabric.Circle({
	        radius: 4,
	        fill: '#bebebe',
	        stroke: '#bebebe',
	        strokeWidth: 2
	      });
	      circle.on('mouseover', function () {
	        var _a, _b, _c;
	        shareState.hoverPoint = circle;
	        shareState.hoverLine = (_b = (_a = editor.deformers.find(function (i) {
	          return i.curveDot === circle;
	        })) === null || _a === void 0 ? void 0 : _a.curveBar) !== null && _b !== void 0 ? _b : null;
	        (_c = circle.canvas) === null || _c === void 0 ? void 0 : _c.requestRenderAll();
	      });
	      circle.on('mouseout', function () {
	        var _a;
	        shareState.hoverPoint = null;
	        shareState.hoverLine = null;
	        (_a = circle.canvas) === null || _a === void 0 ? void 0 : _a.requestRenderAll();
	      });
	      return decorator(circle, function () {
	        circle.set({
	          stroke: shareState.selectedPoint === circle ? '#333' : '#bebebe'
	        });
	      });
	    },
	    line: function line(decorator) {
	      var line = new fabric.fabric.Line([0, 0, 0, 0], {
	        stroke: '#bebebe',
	        strokeWidth: 1,
	        strokeDashArray: [4, 3]
	      });
	      return decorator(line, function () {
	        line.set({
	          stroke: shareState.selectedLine === line ? '#333' : '#bebebe'
	        });
	      });
	    }
	  };
	};

	var content$8 = "#### Installation\n\n```shell\n$ npm install fabric-vizpath --save\n// or\n$ pnpm add fabric-vizpath\n```\n\n#### Quick Start\n\n> Attention: You must make sure you had installed [fabric.js](https://github.com/fabricjs/fabric.js) before using this library!\n\n```typescript\nimport { VizPath } from 'fabric-vizpath';\n\nconst vizpath = new VizPath('');\n```\n";

	var arc = "M 101 94 Q 103 -59 -52 -58 Q -204 -58 -206 93";
	var arch = "M0.5 53.8667C0.5 24.3763 23.5738 0.5 52 0.5C80.4262 0.5 103.5 24.3763 103.5 53.8667V143.5H0.5V53.8667Z";
	var banana = "M -105 111 C -105 111 38 114 80 -70 C 82 -81 79 -90 81 -103 L 97 -103 C 97 -103 94 -86 98 -73 C 119 -5 94 169 -106 123 L -105 111 Z M -105 118 C -105 118 83 158 91 -42";
	var bubble = "M5 -39c-29.8233 0 -54 24.1767 -54 54c0 22.3749 13.6084 41.5716 33 49.7646V93L16.0001 69H50c29.8233 0 54 -24.1767 54 -54S79.8233 -39 50 -39H5z";
	var circle = "M91 26.5C91 62.1223 62.1223 91 26.5 91S-38 62.1223 -38 26.5S-9.1223 -38 26.5 -38S91 -9.1223 91 26.5z";
	var diamond = "M 0 100 L 100 0 L 0 -100 L -100 0 Z";
	var favicon = "M 295.233 250.642 L 390.393 281.854 C 391.402 282.189 392.1 283.112 392.145 284.174 C 392.191 285.236 391.575 286.216 390.598 286.636 L 346.157 305.682 L 326.998 350.39 C 326.586 351.364 325.619 351.985 324.562 351.953 C 323.506 351.921 322.578 351.243 322.226 350.247 L 288.823 257.237 C 288.163 255.397 288.609 253.342 289.971 251.94 C 291.334 250.539 293.375 250.035 295.233 250.642 L 295.233 250.642 Z M 346.72 156.24 C 362.4 156.244 375.375 168.438 376.351 184.088 C 377.327 199.738 365.967 213.449 350.408 215.401 C 334.85 217.353 320.456 206.872 317.536 191.465 C 278.386 195.181 245.902 223.319 236.64 261.538 C 249.18 267.502 255.91 281.363 252.842 294.906 C 249.773 308.449 237.726 318.055 223.84 318.032 C 208.938 318.053 196.329 307.026 194.362 292.256 C 192.396 277.485 201.68 263.543 216.068 259.664 C 226.553 210.348 269.336 172.951 321.232 170.678 C 326.595 161.716 336.275 156.232 346.72 156.24 Z M 223.84 277.072 C 219.816 277.072 216.097 279.219 214.085 282.704 C 212.073 286.189 212.073 290.483 214.085 293.968 C 216.097 297.453 219.816 299.6 223.84 299.6 C 230.061 299.6 235.104 294.557 235.104 288.336 C 235.104 282.115 230.061 277.072 223.84 277.072 Z M 346.72 174.672 C 342.696 174.672 338.977 176.819 336.965 180.304 C 334.953 183.789 334.953 188.083 336.965 191.568 C 338.977 195.053 342.696 197.2 346.72 197.2 C 352.941 197.2 357.984 192.157 357.984 185.936 C 357.984 179.715 352.941 174.672 346.72 174.672 L 346.72 174.672 Z";
	var heart = "M -108.5 -211.5 C -175.5 -211.5 -228.5 -157.5 -228.5 -91.5 C -228.5 43.5 -92.5 78.5 -0.5 211.5 C 87.5 79.5 228.5 38.5 228.5 -91.5 C 228.5 -157.5 174.5 -211.5 108.5 -211.5 C 60.5 -211.5 18.5 -183.5 -0.5 -142.5 C -19.5 -183.5 -60.5 -211.5 -108.5 -211.5 z";
	var hexagon = "M 50 0 L 150 0 L 200 86.6 L 150 173.2 L 50 173.2 L 0 86.6 Z";
	var line = "M -150 0 L 150 0";
	var closedLine = "M -150 0 L 150 0 z";
	var twoLines = "M -150 -50 L -50 -50 M 50 50 L 150 50";
	var lines = "M -45.5135 -136.3919 L 46.1892 -136.3919 M -70.2027 -113.4662 L 70.8784 -113.4662 M -94.8919 -90.5405 L 95.5676 -90.5405 M -94.8919 -67.6149 L 95.5676 -67.6149 M 42.6622 -44.6892 L 95.5676 -44.6892 M -94.8919 -44.6892 L -41.9865 -44.6892 M 42.6622 -21.7635 L 95.5676 -21.7635 M -94.8919 -21.7635 L -41.9865 -21.7635 M 42.6622 1.1622 L 95.5676 1.1622 M -94.8919 1.1622 L -41.9865 1.1622 M 42.6622 24.0878 L 95.5676 24.0878 M -94.8919 24.0878 L -41.9865 24.0878 M 42.6622 47.0135 L 95.5676 47.0135 M -94.8919 47.0135 L -41.9865 47.0135 M -94.8919 69.9392 L 95.5676 69.9392 M -94.8919 92.8649 L 95.5676 92.8649 M -70.2027 115.7905 L 70.8784 115.7905 M -45.5135 138.7162 L 46.1892 138.7162";
	var logo = "M5.83 0L5.83 0Q4.54 0 3.64-0.90Q2.74-1.80 2.74-3.10L2.74-3.10L2.74-53.14Q2.74-54.50 3.60-55.37Q4.46-56.23 5.83-56.23L5.83-56.23L39.17-56.23Q40.54-56.23 41.40-55.40Q42.26-54.58 42.26-53.28L42.26-53.28Q42.26-52.06 41.40-51.23Q40.54-50.40 39.17-50.40L39.17-50.40L8.93-50.40L8.93-31.25L30.89-31.25Q32.26-31.25 33.08-30.38Q33.91-29.52 33.91-28.30L33.91-28.30Q33.91-27.00 33.08-26.17Q32.26-25.34 30.89-25.34L30.89-25.34L8.93-25.34L8.93-3.10Q8.93-1.80 8.03-0.90Q7.13 0 5.83 0ZM68.54 0.36L68.54 0.36Q63.07 0.36 58.75-2.27Q54.43-4.90 51.91-9.43Q49.39-13.97 49.39-19.66L49.39-19.66Q49.39-25.42 52.02-29.95Q54.65-34.49 59.18-37.12Q63.72-39.74 69.41-39.74L69.41-39.74Q75.02-39.74 79.52-37.12Q84.02-34.49 86.65-29.95Q89.28-25.42 89.35-19.66L89.35-19.66L86.90-18.43Q86.90-13.10 84.49-8.86Q82.08-4.61 77.94-2.12Q73.80 0.36 68.54 0.36ZM69.41-5.11L69.41-5.11Q73.44-5.11 76.57-7.02Q79.70-8.93 81.54-12.24Q83.38-15.55 83.38-19.66L83.38-19.66Q83.38-23.83 81.54-27.11Q79.70-30.38 76.57-32.33Q73.44-34.27 69.41-34.27L69.41-34.27Q65.45-34.27 62.24-32.33Q59.04-30.38 57.17-27.11Q55.30-23.83 55.30-19.66L55.30-19.66Q55.30-15.55 57.17-12.24Q59.04-8.93 62.24-7.02Q65.45-5.11 69.41-5.11ZM86.26 0L86.26 0Q84.96 0 84.06-0.83Q83.16-1.66 83.16-3.02L83.16-3.02L83.16-14.90L84.53-21.17L89.35-19.66L89.35-3.02Q89.35-1.66 88.49-0.83Q87.62 0 86.26 0ZM120.02 0.36L120.02 0.36Q114.41 0.36 109.94-2.27Q105.48-4.90 102.85-9.40Q100.22-13.90 100.15-19.51L100.15-19.51L100.15-53.14Q100.15-54.58 100.98-55.40Q101.81-56.23 103.25-56.23L103.25-56.23Q104.62-56.23 105.44-55.40Q106.27-54.58 106.27-53.14L106.27-53.14L106.27-32.54Q108.65-35.78 112.46-37.76Q116.28-39.74 120.96-39.74L120.96-39.74Q126.43-39.74 130.75-37.12Q135.07-34.49 137.56-29.95Q140.04-25.42 140.04-19.73L140.04-19.73Q140.04-13.97 137.41-9.43Q134.78-4.90 130.28-2.27Q125.78 0.36 120.02 0.36ZM120.02-5.11L120.02-5.11Q124.06-5.11 127.26-7.06Q130.46-9.00 132.30-12.28Q134.14-15.55 134.14-19.73L134.14-19.73Q134.14-23.83 132.30-27.14Q130.46-30.46 127.26-32.36Q124.06-34.27 120.02-34.27L120.02-34.27Q116.14-34.27 112.93-32.36Q109.73-30.46 107.93-27.14Q106.13-23.83 106.13-19.73L106.13-19.73Q106.13-15.55 107.93-12.28Q109.73-9.00 112.93-7.06Q116.14-5.11 120.02-5.11ZM156.96-24.41L153.65-24.41Q153.79-28.80 155.92-32.29Q158.04-35.78 161.53-37.80Q165.02-39.82 169.20-39.82L169.20-39.82Q172.87-39.82 174.78-38.74Q176.69-37.66 176.18-35.78L176.18-35.78Q175.97-34.78 175.28-34.34Q174.60-33.91 173.70-33.91Q172.80-33.91 171.65-34.06L171.65-34.06Q167.40-34.56 164.12-33.52Q160.85-32.47 158.90-30.10Q156.96-27.72 156.96-24.41L156.96-24.41ZM154.01 0L154.01 0Q152.57 0 151.78-0.79Q150.98-1.58 150.98-3.02L150.98-3.02L150.98-36.36Q150.98-37.80 151.78-38.59Q152.57-39.38 154.01-39.38L154.01-39.38Q155.45-39.38 156.20-38.59Q156.96-37.80 156.96-36.36L156.96-36.36L156.96-3.02Q156.96-1.58 156.20-0.79Q155.45 0 154.01 0ZM188.71 0L188.71 0Q187.34 0 186.48-0.83Q185.62-1.66 185.62-3.10L185.62-3.10L185.62-36.29Q185.62-37.73 186.48-38.56Q187.34-39.38 188.71-39.38L188.71-39.38Q190.08-39.38 190.91-38.56Q191.74-37.73 191.74-36.29L191.74-36.29L191.74-3.10Q191.74-1.66 190.91-0.83Q190.08 0 188.71 0ZM188.64-46.51L188.64-46.51Q186.91-46.51 185.69-47.77Q184.46-49.03 184.46-50.76L184.46-50.76Q184.46-52.56 185.72-53.71Q186.98-54.86 188.64-54.86L188.64-54.86Q190.30-54.86 191.56-53.71Q192.82-52.56 192.82-50.76L192.82-50.76Q192.82-49.03 191.59-47.77Q190.37-46.51 188.64-46.51ZM223.34 0.36L223.34 0.36Q217.66 0.36 213.19-2.27Q208.73-4.90 206.17-9.43Q203.62-13.97 203.62-19.66L203.62-19.66Q203.62-25.42 206.10-29.95Q208.58-34.49 212.87-37.12Q217.15-39.74 222.77-39.74L222.77-39.74Q227.09-39.74 230.76-38.05Q234.43-36.36 237.24-32.98L237.24-32.98Q238.10-31.97 237.85-30.92Q237.60-29.88 236.52-29.09L236.52-29.09Q235.66-28.51 234.61-28.69Q233.57-28.87 232.70-29.81L232.70-29.81Q228.74-34.27 222.77-34.27L222.77-34.27Q218.81-34.27 215.82-32.40Q212.83-30.53 211.18-27.25Q209.52-23.98 209.52-19.66L209.52-19.66Q209.52-15.48 211.28-12.20Q213.05-8.93 216.18-7.02Q219.31-5.11 223.34-5.11L223.34-5.11Q226.08-5.11 228.28-5.83Q230.47-6.55 232.20-8.06L232.20-8.06Q233.21-8.86 234.22-8.93Q235.22-9.00 236.09-8.35L236.09-8.35Q237.02-7.49 237.17-6.41Q237.31-5.33 236.45-4.46L236.45-4.46Q231.19 0.36 223.34 0.36ZM289.37 0L289.37 0Q287.42 0 286.49-1.94L286.49-1.94L265.25-51.48Q264.38-53.64 265.10-54.94Q265.82-56.23 267.70-56.23L267.70-56.23Q269.71-56.23 270.50-54.29L270.50-54.29L290.02-7.70L288.65-7.70L308.16-54.22Q308.66-55.37 309.35-55.80Q310.03-56.23 311.11-56.23L311.11-56.23Q312.98-56.23 313.63-54.90Q314.28-53.57 313.56-51.84L313.56-51.84L292.10-1.94Q291.67-0.94 290.99-0.47Q290.30 0 289.37 0ZM325.87 0L325.87 0Q324.50 0 323.64-0.83Q322.78-1.66 322.78-3.10L322.78-3.10L322.78-36.29Q322.78-37.73 323.64-38.56Q324.50-39.38 325.87-39.38L325.87-39.38Q327.24-39.38 328.07-38.56Q328.90-37.73 328.90-36.29L328.90-36.29L328.90-3.10Q328.90-1.66 328.07-0.83Q327.24 0 325.87 0ZM325.80-46.51L325.80-46.51Q324.07-46.51 322.85-47.77Q321.62-49.03 321.62-50.76L321.62-50.76Q321.62-52.56 322.88-53.71Q324.14-54.86 325.80-54.86L325.80-54.86Q327.46-54.86 328.72-53.71Q329.98-52.56 329.98-50.76L329.98-50.76Q329.98-49.03 328.75-47.77Q327.53-46.51 325.80-46.51ZM371.74-34.78L346.25-1.73L341.64-4.75L367.70-38.23L371.74-34.78ZM369.86 0L343.87 0Q341.06 0 341.06-2.81L341.06-2.81Q341.06-5.54 343.87-5.54L343.87-5.54L369.86-5.54Q372.67-5.54 372.67-2.81L372.67-2.81Q372.67 0 369.86 0L369.86 0ZM369.50-33.84L343.44-33.84Q340.63-33.84 340.63-36.58L340.63-36.58Q340.63-39.38 343.44-39.38L343.44-39.38L369.50-39.38Q372.24-39.38 372.24-36.58L372.24-36.58Q372.24-33.84 369.50-33.84L369.50-33.84ZM385.99 0L385.99 0Q384.62 0 383.76-0.86Q382.90-1.73 382.90-3.10L382.90-3.10L382.90-53.14Q382.90-54.50 383.76-55.37Q384.62-56.23 385.99-56.23L385.99-56.23L400.39-56.23Q405.72-56.23 409.86-53.89Q414-51.55 416.30-47.41Q418.61-43.27 418.61-37.80L418.61-37.80Q418.61-32.54 416.30-28.48Q414-24.41 409.86-22.07Q405.72-19.73 400.39-19.73L400.39-19.73L389.09-19.73L389.09-3.10Q389.09-1.73 388.22-0.86Q387.36 0 385.99 0ZM389.09-50.40L389.09-25.63L400.39-25.63Q403.92-25.63 406.69-27.18Q409.46-28.73 411.05-31.50Q412.63-34.27 412.63-37.80L412.63-37.80Q412.63-41.54 411.08-44.35Q409.54-47.16 406.73-48.78Q403.92-50.40 400.39-50.40L400.39-50.40L389.09-50.40ZM442.08 0.36L442.08 0.36Q436.61 0.36 432.29-2.27Q427.97-4.90 425.45-9.43Q422.93-13.97 422.93-19.66L422.93-19.66Q422.93-25.42 425.56-29.95Q428.18-34.49 432.72-37.12Q437.26-39.74 442.94-39.74L442.94-39.74Q448.56-39.74 453.06-37.12Q457.56-34.49 460.19-29.95Q462.82-25.42 462.89-19.66L462.89-19.66L460.44-18.43Q460.44-13.10 458.03-8.86Q455.62-4.61 451.48-2.12Q447.34 0.36 442.08 0.36ZM442.94-5.11L442.94-5.11Q446.98-5.11 450.11-7.02Q453.24-8.93 455.08-12.24Q456.91-15.55 456.91-19.66L456.91-19.66Q456.91-23.83 455.08-27.11Q453.24-30.38 450.11-32.33Q446.98-34.27 442.94-34.27L442.94-34.27Q438.98-34.27 435.78-32.33Q432.58-30.38 430.70-27.11Q428.83-23.83 428.83-19.66L428.83-19.66Q428.83-15.55 430.70-12.24Q432.58-8.93 435.78-7.02Q438.98-5.11 442.94-5.11ZM459.79 0L459.79 0Q458.50 0 457.60-0.83Q456.70-1.66 456.70-3.02L456.70-3.02L456.70-14.90L458.06-21.17L462.89-19.66L462.89-3.02Q462.89-1.66 462.02-0.83Q461.16 0 459.79 0ZM490.18 0L488.74 0Q484.99 0 482.04-1.80Q479.09-3.60 477.40-6.77Q475.70-9.94 475.70-13.90L475.70-13.90L475.70-48.89Q475.70-50.18 476.53-51.05Q477.36-51.91 478.73-51.91L478.73-51.91Q480.02-51.91 480.89-51.05Q481.75-50.18 481.75-48.89L481.75-48.89L481.75-13.90Q481.75-10.51 483.73-8.28Q485.71-6.05 488.74-6.05L488.74-6.05L490.90-6.05Q492.05-6.05 492.84-5.18Q493.63-4.32 493.63-3.02L493.63-3.02Q493.63-1.66 492.66-0.83Q491.69 0 490.18 0L490.18 0ZM489.24-32.69L471.46-32.69Q470.23-32.69 469.44-33.44Q468.65-34.20 468.65-35.28L468.65-35.28Q468.65-36.43 469.44-37.19Q470.23-37.94 471.46-37.94L471.46-37.94L489.24-37.94Q490.46-37.94 491.26-37.19Q492.05-36.43 492.05-35.28L492.05-35.28Q492.05-34.20 491.26-33.44Q490.46-32.69 489.24-32.69L489.24-32.69ZM505.73-15.55L505.73-15.55Q504.29-15.55 503.46-16.42Q502.63-17.28 502.63-18.58L502.63-18.58L502.63-53.14Q502.63-54.58 503.46-55.40Q504.29-56.23 505.73-56.23L505.73-56.23Q507.10-56.23 507.92-55.40Q508.75-54.58 508.75-53.14L508.75-53.14L508.75-18.58Q508.75-17.28 507.92-16.42Q507.10-15.55 505.73-15.55ZM536.26 0L536.26 0Q534.89 0 534.02-0.86Q533.16-1.73 533.16-3.02L533.16-3.02L533.16-21.38Q533.16-25.78 531.54-28.55Q529.92-31.32 527.11-32.72Q524.30-34.13 520.70-34.13L520.70-34.13Q517.32-34.13 514.62-32.80Q511.92-31.46 510.34-29.20Q508.75-26.93 508.75-23.98L508.75-23.98L504.58-23.98Q504.72-28.51 506.99-32.08Q509.26-35.64 513.07-37.73Q516.89-39.82 521.57-39.82L521.57-39.82Q526.61-39.82 530.60-37.69Q534.60-35.57 536.94-31.46Q539.28-27.36 539.28-21.38L539.28-21.38L539.28-3.02Q539.28-1.73 538.42-0.86Q537.55 0 536.26 0ZM505.73 0L505.73 0Q504.29 0 503.46-0.83Q502.63-1.66 502.63-3.02L502.63-3.02L502.63-36.29Q502.63-37.73 503.46-38.56Q504.29-39.38 505.73-39.38L505.73-39.38Q507.10-39.38 507.92-38.56Q508.75-37.73 508.75-36.29L508.75-36.29L508.75-3.02Q508.75-1.66 507.92-0.83Q507.10 0 505.73 0Z";
	var pentagon = "M 100 0 L 190 50 L 160 140 L 40 140 L 10 50 z";
	var point = "M 100 100 z";
	var polyline = "M 40 40 L 160 40 L 40 100 L 160 100 L 40 160 L 160 160";
	var shapes = "M -61.1077 -171 L 26.7539 -27 L -128.6769 -27 L -61.1077 -171 Z M 218.6769 -97.5 C 218.6769 -61.8777 189.7992 -33 154.1769 -33 C 118.5546 -33 89.6769 -61.8777 89.6769 -97.5 C 89.6769 -133.1223 118.5546 -162 154.1769 -162 C 189.7992 -162 218.6769 -133.1223 218.6769 -97.5 Z M -124.3231 181 L 28.6769 180 L 28.6769 28 L -124.3231 28 L -124.3231 181 Z M 230.6769 180 L 79.6769 177 L 230.6769 27 L 79.6769 28";
	var spiral = "M 23.5296 117.9696 C 23.5296 117.9696 23.5009 117.9777 23.4892 117.9817 C 15.6793 119.9628 7.2337 121.9278 -1.6511 122.8701 C -13.0515 124.0857 -24.9443 123.6698 -37.0108 121.6325 C -59.034 117.9214 -79.0017 109.0888 -96.3677 95.3959 C -118.0763 78.2732 -133.1613 56.2982 -141.1879 30.0912 L -141.316 29.6723 C -152.0365 -6.3544 -149.1799 -41.6978 -132.8198 -75.3812 C -124.6557 -92.1925 -113.1862 -107.107 -98.7396 -119.7129 C -88.8397 -128.3516 -77.4946 -135.6064 -65.0201 -141.2725 C -43.5422 -151.0406 -19.8783 -155.3314 5.3047 -154.0363 C 21.5845 -153.1997 37.8936 -149.5028 53.7808 -143.0425 C 72.2356 -135.5424 89.0348 -124.513 103.7183 -110.2669 C 113.6378 -100.6403 122.3519 -89.3142 129.6072 -76.6012 C 134.7589 -67.5772 139.2375 -57.3425 143.3001 -45.2946 C 143.4609 -44.8152 143.2077 -44.299 142.7315 -44.1409 C 142.2674 -43.9729 141.743 -44.2393 141.5843 -44.7187 C 137.5578 -56.6503 133.1274 -66.7855 128.034 -75.7005 C 120.863 -88.261 112.2615 -99.4492 102.4585 -108.9593 C 87.9438 -123.041 71.3395 -133.9383 53.1037 -141.3535 C 37.407 -147.7316 21.2935 -151.3866 5.212 -152.2138 C -19.6711 -153.4988 -43.0531 -149.256 -64.2666 -139.6134 C -76.5792 -134.0158 -87.777 -126.8571 -97.5425 -118.3358 C -111.8117 -105.8924 -123.1241 -91.1657 -131.1859 -74.5765 C -147.3456 -41.3109 -150.1692 -6.4165 -139.5835 29.1489 L -139.4572 29.562 C -131.5426 55.4021 -116.6646 77.0717 -95.2528 93.9673 C -78.1327 107.4754 -58.439 116.1734 -36.7204 119.8402 C -24.8212 121.8434 -13.0868 122.2573 -1.851 121.0618 C 6.9038 120.1275 15.2684 118.1866 22.996 116.2236 L 23.2405 116.1372 C 43.0485 110.3968 60.5479 99.4224 75.2957 83.5053 C 88.8459 68.876 98.2552 51.4359 103.2622 31.6837 C 106.5392 18.759 107.6523 5.892 106.5653 -6.5702 C 105.8742 -14.5025 104.6084 -21.7622 102.6976 -28.7491 C 99.2759 -41.2604 94.3753 -52.1489 87.7228 -62.024 C 79.6095 -74.0682 69.5051 -84.1537 57.6767 -92.0078 C 44.552 -100.7247 30.2641 -106.414 15.2136 -108.9243 C 3.0419 -110.9537 -8.0997 -110.9758 -18.8547 -108.991 L -20.1684 -108.7483 C -24.3203 -107.9876 -28.6102 -107.2038 -32.7174 -105.9669 C -62.082 -96.7582 -82.989 -77.2018 -94.8596 -47.837 C -101.3247 -31.8442 -103.1177 -14.7671 -100.1939 2.9224 C -95.7581 29.7438 -82.4005 50.5659 -60.5013 64.8073 C -46.8164 73.7022 -31.3984 78.3857 -14.6679 78.7153 C -5.8255 78.8921 2.7178 77.6805 10.7129 75.1087 C 10.7418 75.0986 10.7764 75.0886 10.8053 75.0806 C 30.1329 68.4501 44.7025 56.5775 54.1224 39.7886 C 63.3588 23.3241 66.2099 5.6435 62.6074 -12.7611 C 58.9184 -31.585 49.2492 -46.27 33.8699 -56.4163 C 23.2162 -63.4458 12.133 -67.0103 -0.0106 -67.3178 C -18.7428 -67.7988 -33.5227 -61.9557 -45.1765 -49.4597 C -56.386 -37.4493 -61.2212 -23.0174 -59.5473 -6.568 C -57.1837 16.6752 -41.9533 32.523 -19.7983 34.7884 C -4.1488 36.3904 7.6748 31.0506 15.3575 18.9163 C 21.8959 8.5888 21.4543 -6.7806 14.3798 -15.35 C 9.0101 -21.8514 3.1473 -24.2513 -4.628 -23.1269 C -8.2418 -22.6071 -11.5279 -20.6861 -13.4178 -17.9959 C -15.1598 -15.5228 -15.7079 -12.5495 -15.0448 -9.1639 C -14.9508 -8.6711 -15.2711 -8.1915 -15.7583 -8.0932 C -16.2474 -8.001 -16.7252 -8.3257 -16.825 -8.817 C -17.5771 -12.6586 -16.9112 -16.1961 -14.901 -19.0502 C -12.729 -22.1384 -8.9916 -24.3373 -4.895 -24.9284 C 3.5759 -26.151 9.9462 -23.5565 15.7675 -16.5061 C 23.3106 -7.3737 23.8145 8.9627 16.8843 19.9064 C 8.8053 32.6645 -3.5954 38.2825 -19.9747 36.6048 C -31.4171 35.434 -41.3393 30.6936 -48.6657 22.8883 C -55.7911 15.3079 -60.1758 5.1778 -61.354 -6.3908 C -63.0826 -23.3899 -58.0838 -38.298 -46.5064 -50.7135 C -34.6413 -63.4269 -18.9882 -69.6324 0.0248 -69.1417 C 12.3418 -68.8239 24.0602 -65.059 34.8552 -57.9391 C 50.6599 -47.5158 60.5921 -32.4274 64.3835 -13.1006 C 68.0745 5.7409 65.1571 23.8427 55.6996 40.6935 C 46.0439 57.9097 31.0972 70.0776 11.2888 76.8467 C 11.2427 76.8607 11.2024 76.8728 11.162 76.8848 C 2.9995 79.5089 -5.6947 80.7245 -14.6956 80.5437 C -31.7639 80.2021 -47.5064 75.4281 -61.4772 66.3404 C -83.8321 51.8056 -97.4555 30.5682 -101.9785 3.2137 C -104.9616 -14.8141 -103.1324 -32.2267 -96.5361 -48.533 C -84.5362 -78.2172 -63.4509 -98.0574 -33.8726 -107.5161 C -33.8378 -107.5267 -33.8165 -107.5396 -33.7761 -107.5518 C -33.6262 -107.5976 -33.4761 -107.6437 -33.3262 -107.6895 L -33.2107 -107.7248 C -33.2107 -107.7248 -33.1878 -107.7319 -33.1703 -107.7371 C -28.998 -108.9876 -24.6908 -109.7767 -20.514 -110.5386 L -19.206 -110.7795 C -8.242 -112.8026 3.1078 -112.7807 15.485 -110.7188 C 30.7868 -108.1707 45.3131 -102.3825 58.6572 -93.529 C 70.6805 -85.5443 80.9597 -75.2886 89.2076 -63.0445 C 95.9707 -52.9992 100.9495 -41.9373 104.4315 -29.2283 C 106.3745 -22.1309 107.6584 -14.7745 108.3616 -6.7247 C 109.4586 5.9437 108.3335 19.0181 105.0022 32.1374 C 99.9188 52.1934 90.3669 69.8927 76.6097 84.751 C 61.6409 100.9133 43.8498 112.0484 23.784 117.8732 L 23.5509 117.9556 C 23.5509 117.9556 23.528 117.9636 23.5163 117.9676 L 23.5296 117.9696 Z";
	var test = "M -150 50 z M 0 0 Q 50 0 50 50 Q 50 100 0 100 Q -50 100 -50 50 Q -50 0 0 0 z M 80 0 L 180 0 L 80 50 L 180 50 L 80 100 L 180 100";
	var curve1 = "M 0 -197.5 Q -185 -195.5 -197 1.5 Q -174 176.5 2 176.5 Q 158 164.5 158 -1.5 Q 142 -134.5 0 -147.5 Q -141 -146.5 -148 0.5 Q -128 131.5 0 129.5 Q 106 110.5 110 -0.5 Q 95 -97.5 -2 -103.5 Q -96 -97.5 -102 0 Q -88 81.5 -7 80.5 Q 54 72.5 62 3.5 Q 51 -62.5 -3 -60.5 Q -57 -58.5 -57 -1.5 Q -44 35.5 -10 35.5 C 24 35.5 30 -0.5 17 -10.5 C 4 -20.5 -16 -21.5 -24 -4.5";
	var curve2 = "M 12.969 12.166 Q 11.3986 62.4165 49.612 61.0162 Q 102.218 62.194 110.4623 0.9512 Q 102.6106 -59.5064 49.612 -59.5064 Q -3.3865 -59.1139 -10.0604 0.5586 Q -45.5891 -53.814 -118.6093 0.3623";
	var paths = {
		arc: arc,
		arch: arch,
		banana: banana,
		bubble: bubble,
		circle: circle,
		diamond: diamond,
		favicon: favicon,
		heart: heart,
		hexagon: hexagon,
		line: line,
		closedLine: closedLine,
		twoLines: twoLines,
		lines: lines,
		logo: logo,
		pentagon: pentagon,
		point: point,
		polyline: polyline,
		shapes: shapes,
		spiral: spiral,
		test: test,
		curve1: curve1,
		curve2: curve2
	};

	var index_umd = {exports: {}};

	(function (module, exports) {
	  !function (e, n) {
	    n(exports) ;
	  }(commonjsGlobal, function (e) {

	    function n(e, n, t, o) {
	      return new (t || (t = Promise))(function (i, a) {
	        function r(e) {
	          try {
	            l(o.next(e));
	          } catch (e) {
	            a(e);
	          }
	        }
	        function u(e) {
	          try {
	            l(o.throw(e));
	          } catch (e) {
	            a(e);
	          }
	        }
	        function l(e) {
	          var n;
	          e.done ? i(e.value) : (n = e.value, n instanceof t ? n : new t(function (e) {
	            e(n);
	          })).then(r, u);
	        }
	        l((o = o.apply(e, n || [])).next());
	      });
	    }
	    function t(e = 0, n, t) {
	      var o;
	      let i = 0;
	      const a = {
	          ease: n => Math.pow(n / e, 4),
	          "ease-in": n => Math.pow(n / e, 2),
	          "ease-in-out": n => {
	            let t = n / (e / 2);
	            return t < 1 ? Math.pow(t, 2) / 2 : -(--t * (t - 2) - 1) / 2;
	          },
	          "ease-out": n => -n / e * (n / e - 2),
	          linear: n => n / e,
	          random: n => i + Math.pow(Math.random() * (n / e) * (1 - i), 3)
	        },
	        r = Object.keys(a),
	        u = "random" === n ? a[r[Math.floor(Math.random() * r.length)]] : null !== (o = a[n]) && void 0 !== o ? o : a.random;
	      return new Promise(n => {
	        let o = new Date().getTime(),
	          a = 0,
	          r = !1;
	        const l = () => {
	          !function (e) {
	            if ("undefined" != typeof window) return window.requestAnimationFrame(e);
	            const n = setTimeout(() => {
	              e(n), clearTimeout(n);
	            }, 16.6);
	          }(() => {
	            if (a = new Date().getTime() - o, i = u(a), a >= e) null == t || t(1), n(a);else {
	              const e = () => {
	                r = !0;
	              };
	              null == t || t(i, e), r ? n(a) : l();
	            }
	          });
	        };
	        l();
	      });
	    }
	    e.wait = function (e, o = {}) {
	      return n(this, void 0, void 0, function* () {
	        const {
	          mode: n = "random",
	          handler: i,
	          onUpdate: a
	        } = o;
	        let r = i ? .99 : 1;
	        const u = i ? i() : Promise.resolve(),
	          l = yield t(e, n, (e, n) => {
	            null == a || a(Math.round(e * r * 1e4) / 1e4, n);
	          }),
	          [d] = yield Promise.all([u, l]);
	        return i && (null == a || a(1)), d;
	      });
	    }, Object.defineProperty(e, "__esModule", {
	      value: !0
	    });
	  });
	})(index_umd, index_umd.exports);
	var index_umdExports = index_umd.exports;

	function Demo01() {
	    const { canvas, currentDemo, setEditor } = React.useContext(PageContext);
	    const run = React.useCallback(async () => {
	        if (!canvas)
	            return;
	        if (currentDemo !== Instruction._01_INSTALL_AND_START)
	            return;
	        const path = new Path(paths.banana);
	        const vizpath = path.visualize();
	        // console.log(vizpath.joinSegment(vizpath.segments[0][0], vizpath.segments[0][5]));
	        const editor = new VizPathEditor();
	        await editor
	            .use(new EditorBackground())
	            .use(new EditorMoveModule())
	            .use(new EditorZoom())
	            .use(new EditorResize())
	            .use(new EditorShortcut([
	            {
	                key: 'C',
	                combinationKeys: ['ctrl'],
	                onActivate: () => {
	                    editor.draw(Path.transform(vizpath.getPathData(null), [{ translate: { x: 10, y: 10 } }]));
	                },
	            },
	            {
	                key: 'A',
	                combinationKeys: ['ctrl'],
	                onActivate: () => {
	                    return editor.focus(...editor.nodes);
	                },
	            },
	            {
	                key: 'D',
	                onActivate: () => {
	                    return editor.set('mode', 'delete');
	                },
	                onDeactivate: (e, reset) => {
	                    reset();
	                },
	            },
	            {
	                key: 'P',
	                onActivate: () => {
	                    return editor.set('mode', 'add');
	                },
	                onDeactivate: (e, reset) => {
	                    reset();
	                },
	            },
	            {
	                key: 'V',
	                onActivate: () => {
	                    return editor.set('mode', 'convert');
	                },
	                onDeactivate: (e, reset) => {
	                    reset();
	                },
	            },
	            {
	                key: 'O',
	                combinationKeys: ['ctrl'],
	                onActivate: () => {
	                    console.log(vizpath.getPathData(null, { withTransform: true, withTranslate: true }));
	                },
	            },
	            {
	                key: 'BACKSPACE',
	                onActivate: () => {
	                    if (editor.activePoint)
	                        editor.remove(editor.activePoint);
	                    else
	                        editor.remove(...editor.activeNodes);
	                },
	            },
	        ], 
	        /** verbose */ false))
	            .use(new EditorTheme(defaultTheme, {
	            hoverNode: null,
	            hoverPoint: null,
	            hoverLine: null,
	            selectedNodes: [],
	            selectedPoint: null,
	            selectedLine: null,
	        }))
	            .mount(canvas);
	        await editor.enterEditing(vizpath);
	        setEditor(editor);
	    }, [currentDemo, canvas, setEditor]);
	    React.useEffect(() => {
	        run();
	    }, [run]);
	    return (React.createElement("div", null,
	        React.createElement(Markdown$1, { content: content$8 })));
	}

	var content$7 = "基础使用\n\n第二章";

	function Demo02() {
	    const { canvas, currentDemo, setEditor } = React.useContext(PageContext);
	    // const init = useCallback(async (canvas: HTMLCanvasElement) => {
	    //   const container = canvas.parentNode as HTMLDivElement;
	    //   // 创建fabric画布
	    //   const fabricCanvas = new fabric.Canvas(canvas, {
	    //     width: container.clientWidth,
	    //     height: container.clientHeight,
	    //     selectionBorderColor: '#ccc',
	    //     selectionColor: 'rgba(150, 150, 150, 0.3)',
	    //     // selection: false,
	    //   });
	    //   // fabricCanvas.setViewportTransform([0.5, 0, 0, 0.5, 100, 100]);
	    //   // const path = new fabric.Path('M0.5 53.8667C0.5 24.3763 23.5738 0.5 52 0.5C80.4262 0.5 103.5 24.3763 103.5 53.8667V143.5H0.5V53.8667Z', {
	    //   //   objectCaching: false,
	    //   //   noScaleCache: false,
	    //   //   fill: '#e1e1e1',
	    //   //   // stroke: '#333',
	    //   //   // strokeWidth: 20,
	    //   //   originX: 'center',
	    //   //   originY: 'center',
	    //   //   left: fabricCanvas.getWidth() / 2,
	    //   //   top: fabricCanvas.getHeight() / 2,
	    //   //   // angle: 45,
	    //   //   scaleX: 1.2,
	    //   //   scaleY: 1.2,
	    //   // });
	    //   // fabricCanvas.add(path);
	    //   const vizpath = new VizPath({
	    //     refreshPathTriggerTime: 'auto',
	    //     refreshDeferDuration: 10,
	    //   });
	    //   const editor = new Editor(fabricCanvas);
	    //   const bezier = new EditorBezier();
	    //   vizpath
	    //     .use(editor)
	    //     .use(new EditorMove())
	    //     .use(new EditorZoom())
	    //     .use(new EditorResize(container))
	    //     .use(new EditorBackground())
	    //     .use(bezier)
	    //     .use(
	    //       new EditorShortcut([
	    //         // 删除节点快捷键
	    //         {
	    //           key: 'backspace',
	    //           onActivate: (e) => {
	    //             e.preventDefault();
	    //             const editor = vizpath.findModule(Editor);
	    //             if (!editor) return;
	    //             // 如果当前有选中曲线控制点
	    //             if (editor.activePoint) {
	    //               editor.remove(editor.activePoint);
	    //             } else if (editor.activeNodes.length) {
	    //               editor.remove(...editor.activeNodes);
	    //             }
	    //           },
	    //         },
	    //         // 全选节点快捷键
	    //         {
	    //           key: 'A',
	    //           combinationKeys: ['meta'],
	    //           onActivate: (e) => {
	    //             e.preventDefault();
	    //             const editor = vizpath.findModule(Editor);
	    //             if (!editor) return;
	    //             editor.focus(...editor.nodes);
	    //           },
	    //         },
	    //         // 取消节点选择
	    //         {
	    //           key: 'D',
	    //           combinationKeys: ['meta'],
	    //           onActivate: (e) => {
	    //             e.preventDefault();
	    //             const editor = vizpath.findModule(Editor);
	    //             if (!editor) return;
	    //             editor.focus();
	    //           },
	    //         },
	    //         // 更改路径节点交互模式
	    //         {
	    //           combinationKeys: ['alt'],
	    //           onActivate: () => {
	    //             const editor = vizpath.findModule(Editor);
	    //             if (!editor) return;
	    //             return editor.set({
	    //               dotSymmetricMode: editor.dotSymmetricAutoMode === 'none' ? 'angle' : 'none',
	    //             });
	    //           },
	    //           onDeactivate: (e, reset) => {
	    //             reset?.();
	    //           },
	    //         },
	    //         {
	    //           combinationKeys: ['alt', 'ctrl'],
	    //           onActivate: () => {
	    //             const editor = vizpath.findModule(Editor);
	    //             if (!editor) return;
	    //             return editor.set({
	    //               dotSymmetricMode: editor.dotSymmetricAutoMode === 'none' ? 'entire' : 'none',
	    //             });
	    //           },
	    //           onDeactivate: (e, reset) => {
	    //             reset?.();
	    //           },
	    //         },
	    //         // 更改为变换模式
	    //         {
	    //           key: 'V',
	    //           onActivate: () => {
	    //             const editor = vizpath.findModule(Editor);
	    //             if (!editor) return;
	    //             return editor.set({
	    //               mode: 'convert',
	    //               dotSymmetricMode: 'entire',
	    //             });
	    //           },
	    //           onDeactivate: (e, reset) => {
	    //             reset?.();
	    //           },
	    //         },
	    //         // 更改为添加模式
	    //         {
	    //           key: 'P',
	    //           onActivate: () => {
	    //             const editor = vizpath.findModule(Editor);
	    //             if (!editor) return;
	    //             return editor.set('mode', 'add');
	    //           },
	    //           onDeactivate: (e, reset) => {
	    //             reset?.();
	    //           },
	    //         },
	    //       ]),
	    //     );
	    //   // const theme = new EditorTheme<ThemeShareState>({
	    //   //   hoverNode: null,
	    //   //   hoverPoint: null,
	    //   //   hoverLine: null,
	    //   //   selectedNodes: [],
	    //   //   selectedPoint: null,
	    //   //   selectedLine: null,
	    //   // });
	    //   // theme.configure(editor, defaultTheme);
	    //   // theme.configure(bezier, (editor, shareState) => {
	    //   //   return {
	    //   //     splitDot: editor.themes.create('node'),
	    //   //     virtualNode: editor.themes.create('node'),
	    //   //     // virtualPath:
	    //   //   };
	    //   // });
	    //   // vizpath.use(theme);
	    //   await vizpath.mount();
	    //   // const path2 = VizPath.parseFabricPath(path);
	    //   const path2 = VizPath.parsePathData(
	    //     'M0.5 53.8667C0.5 24.3763 23.5738 0.5 52 0.5C80.4262 0.5 103.5 24.3763 103.5 53.8667V143.5H0.5V53.8667Z',
	    //   );
	    //   vizpath.draw(path2);
	    //   path2[0].pathObject.set({
	    //     left: fabricCanvas.getWidth() / 2,
	    //     top: fabricCanvas.getHeight() / 2,
	    //     scaleX: 3,
	    //     scaleY: 1.5,
	    //     angle: 30,
	    //     // originX: 'center',
	    //     // originY: 'center'
	    //   })
	    //   // fabricCanvas.on('before:render', () => {
	    //   //   const dirtySegments = vizpath.segments.filter(i => i.pathObject.isCacheDirty());
	    //   //   vizpath.events.fire('draw', dirtySegments);
	    //   // });
	    //   // vizpath.events.fire('draw', path2)
	    //   // vizpath.rerenderOriginPath(path2[0].pathObject);
	    //   //   vizpath.events.on('update', () => {
	    //   //     const d = vizpath.segments.map(segment => {
	    //   //       return vizpath.getSegmentData(segment);
	    //   //     }).join(' ');
	    //   //     path.set({
	    //   //       scaleX: 1,
	    //   //       scaleY: 1,
	    //   //       angle: 0,
	    //   //       strokeWidth: path.strokeWidth! * path.scaleX!,
	    //   //     });
	    //   //     path.initialize(d as any);
	    //   //     path.canvas?.renderAll();
	    //   //   });
	    // }, []);
	    const run = React.useCallback(async () => {
	        if (!canvas)
	            return;
	        if (currentDemo !== Instruction._02_MORE_DRAWING_WAYS)
	            return;
	        // const path = new fabric.Path(paths.shapes, {
	        //   objectCaching: false,
	        //   noScaleCache: false,
	        //   fill: '#e1e1e1',
	        //   stroke: '#333',
	        //   strokeWidth: 2,
	        //   strokeDashArray: [5, 5],
	        //   // strokeLineJoin: 'round',
	        //   originX: 'center',
	        //   originY: 'center',
	        //   left: 0,
	        //   top: 0,
	        //   angle: 0,
	        //   // scaleX: 2,
	        //   // scaleY: 2,
	        // });
	        const path = new Path(paths.diamond);
	        path.visualize();
	        path.set({
	            objectCaching: false,
	            fill: '#333',
	            stroke: '#000',
	            strokeWidth: 1,
	            left: 150,
	            top: 150,
	            strokeUniform: true,
	        });
	        canvas.add(path);
	        await index_umdExports.wait(3000);
	        // console.log(path._observers.size);
	        const examples = async () => {
	            // 改变节点位置
	            // const node = path.segments[0][2].node;
	            // if (node) node.set(node.x + 2, node.y - 1);
	            // 删除指令 = 删除节点/拆分指令
	            // path.remove(path.segments[0][0].node, path.segments[1][0].node);
	            // 新增指令
	            // path.insert(path.segments[1], 2, ['Q', 300, 100, 150, 200]);
	            // 插入指令
	            // path.add(path.segments[1], ['Q', 300, 100, 150, 200]);
	            // 替换指令
	            // path.replace(path.segments[0][0], ['Q', 300, 100, 150, 200]);
	            // 移除路径片段
	            // const removePath = path.removeSegment(path.segments[0]);
	            // console.log(removePath, path);
	            // 拆分路径片段
	            // const splitPath = path.splitSegment(path.segments[0]);
	            // if (splitPath) {
	            //   canvas.add(splitPath);
	            //   console.log(splitPath);
	            // }
	            // 反转路径片段
	            // path.reverseSegment(path.segments[0]);
	            // 合并路径片段
	            // path.closeSegment(path.segments[0]);
	            // 拼接路径片段
	            // path.joinSegment(path.segments[0][1], path.segments[1][1]);
	            // 获取路径指令
	            // console.log(path.getPathData());
	            // 使用新的路径指令构建路径
	            // path.reinitialize(Path.toInstructions(paths.bubble));
	            // 读取SVG并作为路径段加入当前路径对象
	            // const _paths = await Path.loadFabricPathFromURL(
	            //   'https://scannables.scdn.co/uri/plain/svg/000000/white/640/spotify:track:5h9dlUlCGZahkuaC3MShz3',
	            // );
	            // _paths.forEach((_path) => path.addSegment(_path));
	        };
	        await examples();
	        // console.log(path.toSVG());
	        // const { left, top, width, height } = path.object._calcDimensions();
	        // console.log({ left, top, width, height });
	        // path.object.pathOffset = { x: -(width + left) / 2, y: -(height + top) / 2 };
	        // path.object.set({ width, height });
	        // console.log(...path.segments[0]);
	        // console.log(path.object._calcDimensions());
	        // console.log(path.object.path);
	        // const vizpath = new VizPath();
	        // vizpath
	        //   .use(new EditorBackground())
	        //   .use(new EditorMove())
	        //   .use(new EditorZoom())
	        //   .use(new EditorResize())
	        //   .mount(canvas);
	        // vizpath.draw(path);
	        // setEditor(vizpath);
	    }, [currentDemo, canvas, setEditor]);
	    React.useEffect(() => {
	        run();
	    }, [run]);
	    return (React.createElement("div", null,
	        React.createElement(Markdown$1, { content: content$7 })));
	}

	var content$6 = "#### 变换路径 Transform";

	function Demo03() {
	    const { canvas, currentDemo, setEditor } = React.useContext(PageContext);
	    const run = React.useCallback(async () => {
	        if (!canvas)
	            return;
	        if (currentDemo !== Instruction._03_TRANSFORM_PATH)
	            return;
	        const path = new Path();
	        const vizpath = path.visualize();
	        console.log(vizpath);
	    }, [currentDemo, canvas, setEditor]);
	    React.useEffect(() => {
	        run();
	    }, [run]);
	    return (React.createElement("div", null,
	        React.createElement(Markdown$1, { content: content$6 })));
	}

	var content$5 = "#### 操作说明 How to Operate";

	function Demo04() {
	    const { canvas, currentDemo, setEditor } = React.useContext(PageContext);
	    const run = React.useCallback(async () => {
	        if (!canvas)
	            return;
	        if (currentDemo !== Instruction._04_HOW_TO_OPERATE_PATH)
	            return;
	        const path = new Path();
	        const vizpath = path.visualize();
	        console.log(vizpath);
	    }, [currentDemo, canvas, setEditor]);
	    React.useEffect(() => {
	        run();
	    }, [run]);
	    return (React.createElement("div", null,
	        React.createElement(Markdown$1, { content: content$5 })));
	}

	var content$4 = "#### 路径同步 Synchronization";

	function Demo05() {
	    const { canvas, currentDemo, setEditor } = React.useContext(PageContext);
	    const run = React.useCallback(async () => {
	        if (!canvas)
	            return;
	        if (currentDemo !== Instruction._05_SYNCHRONIZATION)
	            return;
	        const path = new Path();
	        const vizpath = path.visualize();
	        console.log(vizpath);
	    }, [currentDemo, canvas, setEditor]);
	    React.useEffect(() => {
	        run();
	    }, [run]);
	    return (React.createElement("div", null,
	        React.createElement(Markdown$1, { content: content$4 })));
	}

	var content$3 = "#### 主题设置 Theme Settings";

	function Demo06() {
	    const { canvas, currentDemo, setEditor } = React.useContext(PageContext);
	    const run = React.useCallback(async () => {
	        if (!canvas)
	            return;
	        if (currentDemo !== Instruction._06_THEME_SETTINGS)
	            return;
	        const path = new Path();
	        const vizpath = path.visualize();
	        console.log(vizpath);
	    }, [currentDemo, canvas, setEditor]);
	    React.useEffect(() => {
	        run();
	    }, [run]);
	    return (React.createElement("div", null,
	        React.createElement(Markdown$1, { content: content$3 })));
	}

	var content$2 = "#### 模块应用 Module Applications";

	function Demo07() {
	    const { canvas, currentDemo, setEditor } = React.useContext(PageContext);
	    const run = React.useCallback(async () => {
	        if (!canvas)
	            return;
	        if (currentDemo !== Instruction._07_MODULE_APPLICATIONS)
	            return;
	        const path = new Path();
	        const vizpath = path.visualize();
	        console.log(vizpath);
	    }, [currentDemo, canvas, setEditor]);
	    React.useEffect(() => {
	        run();
	    }, [run]);
	    return (React.createElement("div", null,
	        React.createElement(Markdown$1, { content: content$2 })));
	}

	var content$1 = "#### How to Develop Modules";

	function Demo08() {
	    const { canvas, currentDemo, setEditor } = React.useContext(PageContext);
	    const run = React.useCallback(async () => {
	        if (!canvas)
	            return;
	        if (currentDemo !== Instruction._08_HOW_TO_DEVELOP_MODULES)
	            return;
	        const path = new Path();
	        const vizpath = path.visualize();
	        console.log(vizpath);
	    }, [currentDemo, canvas, setEditor]);
	    React.useEffect(() => {
	        run();
	    }, [run]);
	    return (React.createElement("div", null,
	        React.createElement(Markdown$1, { content: content$1 })));
	}

	var content = "#### API";

	function Demo09() {
	    const { canvas, currentDemo, setEditor } = React.useContext(PageContext);
	    const run = React.useCallback(async () => {
	        if (!canvas)
	            return;
	        if (currentDemo !== Instruction._09_API)
	            return;
	        const path = new Path();
	        const vizpath = path.visualize();
	        console.log(vizpath);
	    }, [currentDemo, canvas, setEditor]);
	    React.useEffect(() => {
	        run();
	    }, [run]);
	    return (React.createElement("div", null,
	        React.createElement(Markdown$1, { content: content })));
	}

	var css_248z = "*{box-sizing:border-box;margin:0;padding:0}body,html{overflow:hidden}.style_page__0LoNd{align-items:stretch;display:flex;height:100vh;margin:0 auto}.style_page__0LoNd .style_instruction__22KM6{overflow:auto}.style_page__0LoNd .style_instruction__22KM6::-webkit-scrollbar{height:8px;width:8px}.style_page__0LoNd .style_instruction__22KM6::-webkit-scrollbar-track{background:transparent;border-radius:2px}.style_page__0LoNd .style_instruction__22KM6::-webkit-scrollbar-thumb{background:#66666633;border-radius:8px;transition:all .1s}.style_page__0LoNd .style_instruction__22KM6::-webkit-scrollbar-thumb:hover{background:#66666666}.style_page__0LoNd .style_instruction__22KM6::-webkit-scrollbar-corner{background:transparent}.style_page__0LoNd .style_instruction__22KM6 .style_logo__3MEA0{background-color:#fff;display:none;padding:20px 32px 12px;position:sticky;top:0;z-index:1}.style_page__0LoNd .style_instruction__22KM6 .style_logo__3MEA0 .style_title__fFbra{font-size:24px;line-height:32px}.style_page__0LoNd .style_instruction__22KM6 .style_logo__3MEA0 .style_description__HJ2Pk{color:#666;font-size:14px;margin-top:12px}.style_page__0LoNd .style_instruction__22KM6 .style_content__t0e77{margin-bottom:12px}.style_page__0LoNd .style_instruction__22KM6>main{padding:0 32px}.style_page__0LoNd .style_instruction__22KM6.style_maximize__mTGAZ{flex:1}.style_page__0LoNd .style_instruction__22KM6.style_minimize__ORKWx{pointer-events:none;position:absolute;user-select:none;z-index:0}.style_page__0LoNd .style_instruction__22KM6.style_minimize__ORKWx .style_logo__3MEA0{background-color:unset}.style_page__0LoNd .style_instruction__22KM6.style_minimize__ORKWx>main{display:none}.style_page__0LoNd .style_instruction__22KM6.style_half__Z-joI{box-shadow:0 0 6px rgba(0,0,0,.08),0 0 12px rgba(0,0,0,.04);max-width:650px;z-index:999999}.style_page__0LoNd .style_container__y7Kec{flex:1;overflow:hidden;position:relative}.style_page__0LoNd .style_container__y7Kec>footer{background-color:#fff;border-radius:8px;bottom:32px;box-shadow:0 0 6px rgba(0,0,0,.08),0 0 12px rgba(0,0,0,.04);display:flex;left:50%;max-width:80%;min-height:56px;overflow:auto;position:absolute;transform:translateX(-50%)}.style_page__0LoNd .style_container__y7Kec>footer svg{flex-shrink:0}.style_page__0LoNd .style_container__y7Kec>aside{bottom:20px;display:flex;display:none;flex-direction:column;gap:8px;position:absolute;right:20px}";
	var styles = {"page":"style_page__0LoNd","instruction":"style_instruction__22KM6","logo":"style_logo__3MEA0","title":"style_title__fFbra","description":"style_description__HJ2Pk","content":"style_content__t0e77","maximize":"style_maximize__mTGAZ","minimize":"style_minimize__ORKWx","half":"style_half__Z-joI","container":"style_container__y7Kec"};
	styleInject(css_248z);

	var Instruction;
	(function (Instruction) {
	    Instruction["_01_INSTALL_AND_START"] = "Install & Start";
	    Instruction["_02_MORE_DRAWING_WAYS"] = "More Drawing Methods";
	    Instruction["_03_TRANSFORM_PATH"] = "Transform Path";
	    Instruction["_04_HOW_TO_OPERATE_PATH"] = "How to Operate Path";
	    Instruction["_05_SYNCHRONIZATION"] = "Synchronization";
	    Instruction["_06_THEME_SETTINGS"] = "Theme Settings";
	    Instruction["_07_MODULE_APPLICATIONS"] = "Module Applications";
	    Instruction["_08_HOW_TO_DEVELOP_MODULES"] = "How to Develop Modules";
	    Instruction["_09_API"] = "API";
	})(Instruction || (Instruction = {}));
	/**
	 * 示例内容大纲
	 */
	const contents = [
	    {
	        title: Instruction._01_INSTALL_AND_START,
	        component: React.createElement(Demo01, null),
	    },
	    {
	        title: Instruction._02_MORE_DRAWING_WAYS,
	        component: React.createElement(Demo02, null),
	    },
	    {
	        title: Instruction._03_TRANSFORM_PATH,
	        component: React.createElement(Demo03, null),
	    },
	    {
	        title: Instruction._04_HOW_TO_OPERATE_PATH,
	        component: React.createElement(Demo04, null),
	    },
	    {
	        title: Instruction._05_SYNCHRONIZATION,
	        component: React.createElement(Demo05, null),
	    },
	    {
	        title: Instruction._06_THEME_SETTINGS,
	        component: React.createElement(Demo06, null),
	    },
	    {
	        title: Instruction._07_MODULE_APPLICATIONS,
	        component: React.createElement(Demo07, null),
	    },
	    {
	        title: Instruction._08_HOW_TO_DEVELOP_MODULES,
	        component: React.createElement(Demo08, null),
	    },
	    {
	        title: Instruction._09_API,
	        component: React.createElement(Demo09, null),
	    },
	];
	const PageContext = React.createContext({
	    setEditor: () => { },
	});
	const Page = () => {
	    const _canvasEl = React.useRef(null);
	    const [view, setView] = React.useState('only-demo');
	    const [canvas, setCanvas] = React.useState();
	    const [editor, setEditor] = React.useState();
	    const [currentDemo, setCurrentDemo] = React.useState(Instruction._01_INSTALL_AND_START);
	    const initial = React.useCallback(async () => {
	        if (!_canvasEl.current)
	            return;
	        const canvas = _canvasEl.current;
	        const container = canvas.parentNode;
	        const fabricCanvas = new fabric.fabric.Canvas(canvas, {
	            width: container.clientWidth,
	            height: container.clientHeight,
	            selectionBorderColor: '#ccc',
	            selectionColor: 'rgba(150, 150, 150, 0.3)',
	        });
	        setCanvas(fabricCanvas);
	    }, []);
	    React.useEffect(() => {
	        initial();
	    }, [initial]);
	    const handleSelect = React.useCallback((item) => {
	        if (currentDemo === item)
	            return;
	        editor === null || editor === void 0 ? void 0 : editor.destroy();
	        setEditor(undefined);
	        setCurrentDemo(item);
	    }, [currentDemo, editor]);
	    return (React.createElement(PageContext.Provider, { value: { canvas, currentDemo, editor, setEditor } },
	        React.createElement("div", { className: styles.page },
	            React.createElement("div", { className: classnames(styles.instruction, {
	                    [styles.half]: view === 'both',
	                    [styles.maximize]: view === 'only-docs',
	                    [styles.minimize]: view === 'only-demo',
	                }) },
	                React.createElement("div", { className: styles.logo },
	                    React.createElement("h2", { className: styles.title }, "Fabric VizPath"),
	                    React.createElement("p", { className: styles.description }, "A path editor for Fabric.js.")),
	                React.createElement("main", null, contents.map((item, index) => (React.createElement(ContentCard, { className: styles.content, key: item.title, title: `0${index + 1}/ ${item.title}`, onSelect: () => handleSelect(item.title) }, item.component))))),
	            React.createElement("div", { className: styles.container, style: { display: view === 'only-docs' ? 'none' : 'block' } },
	                React.createElement("canvas", { ref: _canvasEl }),
	                React.createElement("aside", { className: styles.buttons },
	                    React.createElement(IconButton$1, { name: "github", onClick: () => {
	                            window.open('https://github.com/huanjinliu/fabric-vizpath', '_blank');
	                        } }),
	                    React.createElement(IconButton$1, { name: "position", onClick: () => {
	                            const canvas = editor === null || editor === void 0 ? void 0 : editor.canvas;
	                            if (!canvas)
	                                return;
	                            const center = canvas.getCenter();
	                            canvas.setViewportTransform([1, 0, 0, 1, center.left, center.top]);
	                        } }),
	                    React.createElement(IconButton$1, { name: "document", active: view === 'both', onClick: () => {
	                            setView(view === 'both' ? 'only-demo' : 'both');
	                        } }))))));
	};

	const root = createRoot(document.getElementById('page'));
	root.render(React.createElement(Page, null));

})(React, ReactDOM, fabric);
