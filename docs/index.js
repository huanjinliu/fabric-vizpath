
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (fabric) {
  'use strict';

  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
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
        if (o === f) throw new Error("Generator is already running");
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
              if (!u) throw new Error("try statement without catch or finally");
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
        throw new Error("illegal catch attempt");
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
    return "symbol" == typeof i ? i : String(i);
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
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
  var root = freeGlobal || freeSelf || Function('return this')();

  /** Built-in value references. */
  var Symbol$1 = root.Symbol;

  /** Used for built-in method references. */
  var objectProto$g = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$d = objectProto$g.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$g.toString;

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
    var isOwn = hasOwnProperty$d.call(value, symToStringTag$1),
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
  var objectProto$f = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto$f.toString;

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
  function isObject(value) {
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
  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
  }

  /** Used to detect overreaching core-js shims. */
  var coreJsData = root['__core-js_shared__'];

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
    objectProto$e = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$c = objectProto$e.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' + funcToString$1.call(hasOwnProperty$c).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
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
  var Map$1 = getNative(root, 'Map');

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
  var objectProto$d = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$b = objectProto$d.hasOwnProperty;

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
    return hasOwnProperty$b.call(data, key) ? data[key] : undefined;
  }

  /** Used for built-in method references. */
  var objectProto$c = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$a = objectProto$c.hasOwnProperty;

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
    return nativeCreate ? data[key] !== undefined : hasOwnProperty$a.call(data, key);
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
  var objectProto$b = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

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
    if (!(hasOwnProperty$9.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
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
  var objectProto$a = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable$1 = objectProto$a.propertyIsEnumerable;

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
    return isObjectLike(value) && hasOwnProperty$8.call(value, 'callee') && !propertyIsEnumerable$1.call(value, 'callee');
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
  var Buffer$1 = moduleExports$2 ? root.Buffer : undefined;

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
  var objectProto$9 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

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
      if ((inherited || hasOwnProperty$7.call(value, key)) && !(skipIndexes && (
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
  var objectProto$8 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$8;
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
  var objectProto$7 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

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
      if (hasOwnProperty$6.call(object, key) && key != 'constructor') {
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
    return value != null && isLength(value.length) && !isFunction(value);
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
  var objectProto$6 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn(object) {
    if (!isObject(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype(object),
      result = [];
    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$5.call(object, key)))) {
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
  var Buffer = moduleExports ? root.Buffer : undefined,
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
  var objectProto$5 = Object.prototype;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;

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
  var DataView = getNative(root, 'DataView');

  /* Built-in method references that are verified to be native. */
  var Promise$1 = getNative(root, 'Promise');

  /* Built-in method references that are verified to be native. */
  var Set$1 = getNative(root, 'Set');

  /* Built-in method references that are verified to be native. */
  var WeakMap$1 = getNative(root, 'WeakMap');

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
  var objectProto$4 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$4.hasOwnProperty;

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
    if (length && typeof array[0] == 'string' && hasOwnProperty$4.call(array, 'index')) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }

  /** Built-in value references. */
  var Uint8Array$1 = root.Uint8Array;

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
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
      if (!isObject(proto)) {
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
    if (!isObject(value)) {
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

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;

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
    start = nativeMax(start === undefined ? func.length - 1 : start, 0);
    return function () {
      var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
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
    if (!isObject(object)) {
      return false;
    }
    var type = _typeof(index);
    if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
      return eq(object[index], value);
    }
    return false;
  }

  /** Used for built-in method references. */
  var objectProto$3 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

  /**
   * Assigns own and inherited enumerable string keyed properties of source
   * objects to the destination object for all destination properties that
   * resolve to `undefined`. Source objects are applied from left to right.
   * Once a property is set, additional values of the same property are ignored.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @see _.defaultsDeep
   * @example
   *
   * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
   * // => { 'a': 1, 'b': 2 }
   */
  var defaults = baseRest(function (object, sources) {
    object = Object(object);
    var index = -1;
    var length = sources.length;
    var guard = length > 2 ? sources[2] : undefined;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      length = 1;
    }
    while (++index < length) {
      var source = sources[index];
      var props = keysIn(source);
      var propsIndex = -1;
      var propsLength = props.length;
      while (++propsIndex < propsLength) {
        var key = props[propsIndex];
        var value = object[key];
        if (value === undefined || eq(value, objectProto$3[key]) && !hasOwnProperty$3.call(object, key)) {
          object[key] = source[key];
        }
      }
    }
    return object;
  });

  /**
   * 变换
   * @param crood 路径
   * @param process 变换流程
   */
  var transform = function transform(crood, process) {
    var x = crood.x,
      y = crood.y;
    process.forEach(function (item) {
      var translate = item.translate,
        scale = item.scale,
        rotate = item.rotate;
      if (scale !== undefined) {
        x *= scale.x;
        y *= scale.y;
      }
      if (rotate !== undefined) {
        x = Math.cos(rotate * Math.PI / 180) * x - Math.sin(rotate * Math.PI / 180) * y;
        y = Math.sin(rotate * Math.PI / 180) * x + Math.cos(rotate * Math.PI / 180) * y;
      }
      if (translate !== undefined) {
        x += translate.x;
        y += translate.y;
      }
    });
    return {
      x: x,
      y: y
    };
  };

  /**
   * 注册响应式
   */
  var observe = function observe(point, keys, callback) {
    var immediate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var data = {};
    var properties = {};
    keys.forEach(function (key) {
      data[key] = point[key];
      properties[key] = {
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
    Object.defineProperties(point, properties);
    if (immediate) callback(data, data);
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
  var calcCroodsAngle = function calcCroodsAngle(a, b, c) {
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
  var calcCroodsDistance = function calcCroodsDistance(a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  };

  /**
   * 画布真实坐标转变换后坐标
   */
  var calcCanvasCrood = function calcCanvasCrood(canvas, point) {
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
                      rest = __rest(_a, ["type", "visible", "width", "height", "x", "y", "rx", "ry"]);
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
                      _rest = __rest(_b, ["type", "visible", "x", "y", "radius"]);
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
                      _rest2 = __rest(_c, ["type", "visible", "x", "y", "rx", "ry"]);
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
                      _rest3 = __rest(_d, ["type", "visible", "x1", "x2", "y1", "y2"]);
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
                      _rest4 = __rest(_e, ["type", "visible", "points"]);
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
        croods = _item.slice(1);
      for (var i = 0; i < croods.length; i += 2) {
        var _transform = transform({
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
  };

  /**
   * 重新修正路径的尺寸和位置
   *
   * @param path 路径对象
   *
   * @note
   *
   * fabric.Path对象直接改内部路径指令，其路径会渲染正确的，但却保持其原尺寸和偏移信息，导致对象信息错误，
   * 该方法使用initialize重新初始化路径，使其获取正确的尺寸，但偏移是错的，该方法同时修正偏移。
   */
  var repairPath = function repairPath(path) {
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
    var repairOffset = fabric.fabric.util.transformPoint(new fabric.fabric.Point(path.pathOffset.x - (path.width - oldInfo.width) / 2 - oldInfo.pathOffset.x, path.pathOffset.y - (path.height - oldInfo.height) / 2 - oldInfo.pathOffset.y), [].concat(_toConsumableArray(path.calcOwnMatrix().slice(0, 4)), [0, 0]));
    // 设置回正确的偏移位置
    path.set({
      left: oldInfo.left + repairOffset.x,
      top: oldInfo.top + repairOffset.y
    });
    path.setCoords();
    return repairOffset;
  };

  /**
   * 反转路径
   */
  var reversePath = function reversePath(path) {
    var _path = [];
    var isClosePath = false;
    for (var i = path.length - 1; i >= 0; i--) {
      var instruction = path[i];
      var preInstruction = path[i - 1];
      var preMajorPointCrood = preInstruction === null || preInstruction === void 0 ? void 0 : preInstruction.slice(preInstruction.length - 2);
      if (i === path.length - 1) {
        if (instruction[0] === InstructionType.CLOSE) {
          _path.push([InstructionType.START].concat(_toConsumableArray(preMajorPointCrood)));
        } else {
          _path.push([InstructionType.START].concat(_toConsumableArray(instruction.slice(instruction.length - 2))));
        }
      }
      switch (instruction[0]) {
        case InstructionType.START:
          if (isClosePath) _path.push([InstructionType.CLOSE]);
          break;
        case InstructionType.LINE:
          _path.push([InstructionType.LINE].concat(_toConsumableArray(preMajorPointCrood)));
          break;
        case InstructionType.QUADRATIC_CURCE:
          _path.push([InstructionType.QUADRATIC_CURCE, instruction[1], instruction[2]].concat(_toConsumableArray(preMajorPointCrood)));
          break;
        case InstructionType.BEZIER_CURVE:
          _path.push([InstructionType.BEZIER_CURVE, instruction[3], instruction[4], instruction[1], instruction[2]].concat(_toConsumableArray(preMajorPointCrood)));
          break;
        case InstructionType.CLOSE:
          isClosePath = true;
          break;
      }
    }
    return _path;
  };

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
    if (isObject(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject(other) ? other + '' : other;
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
  var nativeIsFinite = root.isFinite,
    nativeMin = Math.min;

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
      precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
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
   * 基础事件类
   */
  var BaseEvent = /*#__PURE__*/function () {
    function BaseEvent() {
      _classCallCheck(this, BaseEvent);
      /**
       * 监听事件
       */
      this.events = {};
    }
    /**
     * 监听事件
     * @param eventName 事件名
     * @param callback 回调
     */
    return _createClass(BaseEvent, [{
      key: "on",
      value: function on(eventName, callback, params) {
        var _a;
        this.events[eventName] = (_a = this.events[eventName]) !== null && _a !== void 0 ? _a : [];
        this.events[eventName].push(callback);
      }
      /**
       * 取消监听事件
       * @param eventName 事件名
       * @param callback 回调
       */
    }, {
      key: "off",
      value: function off(eventName, callback, params) {
        if (!callback) delete this.events[eventName];
        var handlers = this.events[eventName];
        if (!handlers) return;
        var index = handlers.indexOf(callback);
        if (index !== -1) handlers.splice(index, 1);
      }
      /**
       * 触发编辑器事件
       */
    }, {
      key: "fire",
      value: function fire(eventName) {
        var handlers = this.events[eventName];
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
    }]);
  }();
  /**
   * VizPath (Visualization Path，可视化路径)
   */
  var VizPath = /*#__PURE__*/function (_BaseEvent) {
    function VizPath(context) {
      var _this;
      _classCallCheck(this, VizPath);
      _this = _callSuper(this, VizPath);
      /**
       * 路径信息（包含路径分段、路径指令、路径节点及曲线变换点信息）
       */
      _this.paths = [];
      /**
       * 路径信息映射
       */
      _this.pathNodeMap = new Map([]);
      /**
       * 响应式节点的更改监听
       */
      _this._observers = new Map();
      /**
       * 防抖更新路径
       */
      _this._debounceRerenderPathMap = new WeakMap([]);
      /**
       * 需要一次更新路径列表
       */
      _this._onceRerenderPaths = null;
      _this.context = context;
      return _this;
    }
    /**
     * 获取指令中的路径节点
     *
     * @note 闭合指令无路径节点
     */
    _inherits(VizPath, _BaseEvent);
    return _createClass(VizPath, [{
      key: "_toResponsive",
      value:
      /**
       * 转化为响应式更改的点对象
       * @param crood 点
       * @param callback 响应式更改回调
       * @returns
       */
      function _toResponsive(crood) {
        var _this2 = this;
        var temporaryIgnoreIds = [];
        var proxy = new Proxy(crood, {
          set: function set(target, p, value, receiver) {
            if (p === 'x' || p === 'y') {
              var oldValue = target[p];
              var result = Reflect.set(target, p, value, receiver);
              if (oldValue !== value) {
                var observers = _this2._observers.get(proxy);
                if (observers) {
                  var x = p === 'x' ? value : target.x;
                  var y = p === 'y' ? value : target.y;
                  var _iterator2 = _createForOfIteratorHelper(observers),
                    _step2;
                  try {
                    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                      var _observe = _step2.value;
                      if (_observe.id && temporaryIgnoreIds.indexOf(_observe.id) !== -1) continue;
                      _observe.handler(x, y);
                    }
                  } catch (err) {
                    _iterator2.e(err);
                  } finally {
                    _iterator2.f();
                  }
                }
              }
              return result;
            } else {
              return Reflect.set(target, p, value, receiver);
            }
          }
        });
        proxy.setCrood = function (crood) {
          var skipObserverIDs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
          if (_typeof(crood) !== 'object') return;
          if (Array.isArray(skipObserverIDs)) {
            temporaryIgnoreIds = skipObserverIDs;
          }
          proxy.x = crood.x;
          proxy.y = crood.y;
          temporaryIgnoreIds = [];
        };
        proxy.observe = function (handler) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var _a;
          var immediate = options.immediate,
            id = options.id;
          if (immediate) handler(crood.x, crood.y);
          var observers = (_a = _this2._observers.get(proxy)) !== null && _a !== void 0 ? _a : [];
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
          _this2._observers.set(proxy, observers);
        };
        proxy.unobserve = function (id) {
          var observers = _this2._observers.get(proxy);
          if (!observers) return;
          if (!id) {
            _this2._observers["delete"](proxy);
            return;
          }
          _this2._observers.set(proxy, observers.filter(function (i) {
            return i.id !== id;
          }));
        };
        return proxy;
      }
      /**
       * 获取路径或指令列表所在的路径
       */
    }, {
      key: "getPath",
      value: function getPath(target) {
        var index = target instanceof fabric.fabric.Path ? this.paths.findIndex(function (i) {
          return i.pathObject === target;
        }) : this.paths.findIndex(function (i) {
          return i.segment === target;
        });
        if (index === -1) return;
        return this.paths[index];
      }
      /**
       * 提取当前路径的信息
       */
    }, {
      key: "getPathSegmentsInfo",
      value: function getPathSegmentsInfo() {
        var paths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.paths;
        var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
        var ds = paths.map(function (_ref3) {
          var segment = _ref3.segment,
            pathObject = _ref3.pathObject;
          var matrix = _toConsumableArray(pathObject.calcOwnMatrix());
          var matrixWithoutTranslate = [].concat(_toConsumableArray(matrix.slice(0, 4)), [0, 0]);
          var instructions = segment.map(function (item) {
            var instruction = _toConsumableArray(item.instruction);
            for (var i = 0; i < instruction.length - 1; i += 2) {
              var point = fabric.fabric.util.transformPoint(new fabric.fabric.Point(instruction[i + 1], instruction[i + 2]), matrix);
              var offset = fabric.fabric.util.transformPoint(pathObject.pathOffset, matrixWithoutTranslate);
              point.x -= offset.x;
              point.y -= offset.y;
              instruction[i + 1] = round(point.x, precision);
              instruction[i + 2] = round(point.y, precision);
            }
            return instruction;
          });
          return instructions;
        });
        return ds;
      }
      /**
       * 提取当前路径的信息
       */
    }, {
      key: "getPathData",
      value: function getPathData() {
        var paths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.paths;
        var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
        var segments = this.getPathSegmentsInfo(paths, precision);
        return segments.map(fabric.fabric.util.joinPath).join(' ');
      }
      /**
       * 是否是闭合路径段
       * @param segment 路径段
       */
    }, {
      key: "isClosePath",
      value: function isClosePath(segment) {
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
        if (this.isClosePath(node.segment)) return false;
        var index = node.segment.indexOf(node);
        return index === 0 || index === node.segment.length - 1;
      }
      /**
       * 获取前后的指令信息
       * @param pathNode 路径节点
       * @param cycle 闭合路径是否开启循环查找
       */
    }, {
      key: "getNeighboringInstructions",
      value: function getNeighboringInstructions(pathNode) {
        var cycle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var segment = pathNode.segment;
        var index = segment.indexOf(pathNode);
        var pre = segment[index - 1];
        var next = segment[index + 1];
        // 是否循环并且是闭合路径
        if (cycle && this.isClosePath(segment)) {
          // 如果没有上一个指令，则倒数第二个指令视为上一个指令
          if (!pre) {
            pre = segment[segment.length - 2];
          }
          // 如果没有下一个指令，则起始指令视为下一个指令
          if (!next) {
            pre = segment[0];
          }
          // 如果有下一个指令但下一个指令是闭合指令，则指向起始指令
          if (next && next.instruction[0] === InstructionType.CLOSE) {
            next = segment[0];
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
      value: function getNeighboringNodes(pathNode) {
        var cycle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var segment = pathNode.segment;
        var _cycle = this.isClosePath(segment) && cycle;
        var _index = segment.indexOf(pathNode);
        var pre;
        var next;
        if (_index !== -1) {
          var i = _index;
          while (!pre && segment[i]) {
            if (i !== _index && segment[i].node) pre = segment[i];
            i--;
            if (i === -1 && _cycle) i = segment.length - 1;
            if (i === _index) break;
          }
          i = _index;
          while (!next && segment[i]) {
            if (i !== _index && segment[i].node) next = segment[i];
            i++;
            if (i === segment.length && _cycle) i = 0;
            if (i === _index) break;
          }
        }
        return {
          pre: pre,
          next: next
        };
      }
      /**
       * 获取周围的曲线变换点信息（前、后、上一路径节点后、下一路径节点前），默认循环查找
       */
    }, {
      key: "getNeighboringCurveDots",
      value: function getNeighboringCurveDots(pathNode) {
        var curveDots = [];
        curveDots.push({
          position: 'cur',
          direction: 'pre',
          from: pathNode
        });
        curveDots.push({
          position: 'cur',
          direction: 'next',
          from: pathNode
        });
        var _this$getNeighboringN = this.getNeighboringNodes(pathNode),
          pre = _this$getNeighboringN.pre,
          next = _this$getNeighboringN.next;
        if (pre) curveDots.push({
          position: 'pre',
          direction: 'next',
          from: pre
        });
        if (next) curveDots.push({
          position: 'next',
          direction: 'pre',
          from: next
        });
        return curveDots;
      }
      /**
       * 绘制路径
       *
       * @note
       *
       * 闭合点和起始点的闭合重叠点均无路径节点和曲线变换点
       *
       * @param path 路径信息
       */
    }, {
      key: "draw",
      value: function draw(paths) {
        var _this3 = this;
        var allDrawPaths = [];
        paths.forEach(function (item) {
          var drawPath = item;
          var segment = item.segment,
            pathObject = item.pathObject;
          segment.forEach(function (pathNode, index) {
            var _a, _b, _c, _d;
            var instruction = pathNode.instruction;
            // 是否是起始点的闭合重叠点，其路径节点沿用起始点，而曲线变换点也会被起始点占用
            var isStartSyncPoint = segment[index + 1] && ((_a = segment[index + 1].instruction) === null || _a === void 0 ? void 0 : _a[0]) === InstructionType.CLOSE;
            // 路径节点
            var node = VizPath.getInstructionNodeCrood(instruction);
            if (node && !pathNode.node) {
              if (isStartSyncPoint) {
                (_b = segment[0].node) === null || _b === void 0 ? void 0 : _b.observe(function (x, y) {
                  instruction[instruction.length - 2] = x;
                  instruction[instruction.length - 1] = y;
                  _this3._rerenderOriginPath(pathObject);
                });
              } else {
                var responsiveNode = _this3._toResponsive(node);
                responsiveNode.observe(function (x, y) {
                  instruction[instruction.length - 2] = x;
                  instruction[instruction.length - 1] = y;
                  _this3._rerenderOriginPath(pathObject);
                });
                pathNode.node = responsiveNode;
                _this3.pathNodeMap.set(pathNode.node, pathNode);
              }
            }
            // 指令曲线变换点
            var curveDots = {};
            var _this3$getNeighboring = _this3.getNeighboringInstructions(pathNode),
              pre = _this3$getNeighboring.pre,
              next = _this3$getNeighboring.next;
            // 前曲线变换点
            if (isStartSyncPoint) {
              if ((pathNode === null || pathNode === void 0 ? void 0 : pathNode.instruction[0]) === InstructionType.BEZIER_CURVE) {
                var curveDot = _this3._toResponsive({
                  x: pathNode.instruction[3],
                  y: pathNode.instruction[4]
                });
                curveDot.observe(function (x, y) {
                  pathNode.instruction[3] = x;
                  pathNode.instruction[4] = y;
                  _this3._rerenderOriginPath(pathObject);
                });
                segment[0].curveDots = (_c = segment[0].curveDots) !== null && _c !== void 0 ? _c : {};
                segment[0].curveDots.pre = curveDot;
              }
              if ((pathNode === null || pathNode === void 0 ? void 0 : pathNode.instruction[0]) === InstructionType.QUADRATIC_CURCE && pre && pre.instruction[0]) {
                var _curveDot2 = pre.curveDots.next;
                _curveDot2.observe(function (x, y) {
                  pathNode.instruction[1] = x;
                  pathNode.instruction[2] = y;
                  _this3._rerenderOriginPath(pathObject);
                });
                segment[0].curveDots = (_d = segment[0].curveDots) !== null && _d !== void 0 ? _d : {};
                segment[0].curveDots.pre = _curveDot2;
              }
            } else {
              if ((pathNode === null || pathNode === void 0 ? void 0 : pathNode.instruction[0]) === InstructionType.BEZIER_CURVE) {
                curveDots.pre = _this3._toResponsive({
                  x: pathNode.instruction[3],
                  y: pathNode.instruction[4]
                });
                curveDots.pre.observe(function (x, y) {
                  pathNode.instruction[3] = x;
                  pathNode.instruction[4] = y;
                  _this3._rerenderOriginPath(pathObject);
                });
              }
              if ((pathNode === null || pathNode === void 0 ? void 0 : pathNode.instruction[0]) === InstructionType.QUADRATIC_CURCE && pre && pre.instruction[0]) {
                curveDots.pre = pre.curveDots.next;
                curveDots.pre.observe(function (x, y) {
                  pathNode.instruction[1] = x;
                  pathNode.instruction[2] = y;
                  _this3._rerenderOriginPath(pathObject);
                });
              }
            }
            // 后曲线变换点
            if (next && [InstructionType.BEZIER_CURVE, InstructionType.QUADRATIC_CURCE].includes(next.instruction[0])) {
              curveDots.next = _this3._toResponsive({
                x: next.instruction[1],
                y: next.instruction[2]
              });
              curveDots.next.observe(function (x, y) {
                next.instruction[1] = x;
                next.instruction[2] = y;
                _this3._rerenderOriginPath(pathObject);
              });
            }
            if (pathNode.curveDots) {
              if (pathNode.curveDots.pre) _this3._observers["delete"](pathNode.curveDots.pre);
              if (pathNode.curveDots.next) _this3._observers["delete"](pathNode.curveDots.next);
            }
            if (Object.keys(curveDots).length) {
              pathNode.curveDots = curveDots;
            } else {
              delete pathNode.curveDots;
            }
          });
          var index = _this3.paths.findIndex(function (i) {
            return i.pathObject === pathObject;
          });
          if (index === -1) {
            _this3.paths.push(drawPath);
          } else {
            pathObject.path = segment.map(function (i) {
              return i.instruction;
            });
            _this3._rerenderOriginPath(pathObject);
            _this3.paths.splice(index, 1, drawPath);
          }
          allDrawPaths.push(drawPath);
        });
        this.fire('draw', paths);
        return allDrawPaths;
      }
      /**
       * 重新渲染路径，修正路径位置及尺寸
       * @param path 路径信息
       *
       * @description
       *
       * fabric.Path对象直接改内部路径指令，其路径会渲染正确的，但却保持其原尺寸和偏移信息，导致对象信息错误，
       * 该方法使用initialize重新初始化路径，使其获取正确的尺寸，但偏移是错的，该方法同时修正偏移。
       */
    }, {
      key: "rerenderOriginPath",
      value: function rerenderOriginPath(path) {
        var _a;
        repairPath(path);
        (_a = path.canvas) === null || _a === void 0 ? void 0 : _a.requestRenderAll();
        this.fire('update', this.getPath(path));
      }
      /**
       * 重新渲染路径，修正路径位置及尺寸，为了性能默认为延迟（防抖）更新
       */
    }, {
      key: "_rerenderOriginPath",
      value: function _rerenderOriginPath(path) {
        var _this4 = this;
        if (this._onceRerenderPaths) {
          this._onceRerenderPaths.add(path);
          return;
        }
        var _this$context$options = this.context.options,
          refreshPathTriggerTime = _this$context$options.refreshPathTriggerTime,
          refreshDeferDuration = _this$context$options.refreshDeferDuration;
        if (refreshPathTriggerTime === 'manual') return;
        if (refreshPathTriggerTime === 'auto') {
          this.rerenderOriginPath(path);
        } else {
          var timeout = this._debounceRerenderPathMap.get(path);
          if (timeout) clearTimeout(timeout);
          this._debounceRerenderPathMap.set(path, setTimeout(function () {
            _this4.rerenderOriginPath(path);
            _this4._debounceRerenderPathMap["delete"](path);
          }, refreshDeferDuration));
        }
      }
      /**
       * 在回调中执行，可以让过程中的路径重渲染操作只执行一次
       */
    }, {
      key: "onceRerenderOriginPath",
      value: function onceRerenderOriginPath(callback) {
        // 外层设置了一次渲染则直接进行回调即可
        if (this._onceRerenderPaths) return callback();
        this._onceRerenderPaths = new Set([]);
        var result = callback();
        var paths = Array.from(this._onceRerenderPaths.values());
        this._onceRerenderPaths.clear();
        this._onceRerenderPaths = null;
        paths.forEach(this._rerenderOriginPath.bind(this));
        return result;
      }
      /**
       * 使用新的路径信息绘制旧路径，多个路径段则会使原路径拆分成多个
       */
    }, {
      key: "replacePathSegments",
      value: function replacePathSegments(path, segments) {
        var pathObject = path.pathObject,
          oldSegment = path.segment;
        var newPath = segments.map(function (segment, index) {
          var path = pathObject;
          if (index > 0) {
            var _parsePathJSON = parsePathJSON(pathObject),
              styles = _parsePathJSON.styles,
              layout = _parsePathJSON.layout;
            path = new fabric.fabric.Path(fabric.fabric.util.joinPath(pathObject.path));
            path.set(Object.assign(Object.assign({}, styles), layout));
          }
          path.path = segment;
          repairPath(path);
          var _segment = [];
          segment.forEach(function (instruction) {
            var oldInstruction = index === 0 ? oldSegment.find(function (i) {
              return i.instruction === instruction;
            }) : undefined;
            if (oldInstruction) {
              oldInstruction.segment = _segment;
              delete oldInstruction.node;
              delete oldInstruction.curveDots;
            }
            _segment.push(oldInstruction !== null && oldInstruction !== void 0 ? oldInstruction : {
              segment: _segment,
              instruction: instruction
            });
          });
          return {
            segment: _segment,
            pathObject: path
          };
        });
        var result = this.draw(newPath);
        this._rerenderOriginPath(pathObject);
        return result;
      }
      /**
       * 移除路径节点
       *
       * @note
       *
       * ① 只有一个删除节点时，删除节点前后线段，连接前后节点
       * ② 有多个删除节点，仅删除节点间的线段，中间节点同时也会被移除
       */
    }, {
      key: "remove",
      value: function remove() {
        var _this5 = this;
        for (var _len2 = arguments.length, targets = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          targets[_key2] = arguments[_key2];
        }
        // 找出需要删除的路径和指令索引映射，便于后续同路径下节点的批量操作
        var segmentIndexMap = targets.reduce(function (maps, target) {
          var _a;
          var pathNode = _this5.pathNodeMap.get(target);
          if (!pathNode) return maps;
          var segment = pathNode.segment,
            instruction = pathNode.instruction;
          var indexes = (_a = maps.get(segment)) !== null && _a !== void 0 ? _a : [];
          var index = segment.findIndex(function (i) {
            return i.instruction === instruction;
          });
          indexes.push(index);
          maps.set(segment, indexes);
          return maps;
        }, new Map([]));
        var needRemoveSegments = Array.from(segmentIndexMap).map(function (item) {
          var _item2 = _slicedToArray(item, 2),
            segment = _item2[0],
            indexes = _item2[1];
          indexes.sort();
          var isMultipleRemove = indexes.length > 1;
          var isIncludeStartNode = indexes[0] === 0;
          var isClosePath = segment[segment.length - 1].instruction[0] === InstructionType.CLOSE;
          if (isMultipleRemove && isIncludeStartNode && isClosePath) indexes.push(segment.length - 2);
          return item;
        });
        var segments = needRemoveSegments.map(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
            segment = _ref5[0],
            indexes = _ref5[1];
          var path = _this5.getPath(segment);
          var pathObject = path.pathObject;
          var isClosePath = _this5.isClosePath(segment);
          // 先替换掉路径信息，避免被修改到
          pathObject.path = cloneDeep(segment.map(function (i) {
            return i.instruction;
          }));
          // 如果路径所有点都在删除列表列表中，直接移除整个路径
          var isWholePath = indexes.length === segment.length || isClosePath && indexes.length === segment.length - 1;
          if (isWholePath) return {
            path: path,
            segment: []
          };
          /**
           * 删除单节点时
           */
          var removeSingleNode = function removeSingleNode(index) {
            var _a2;
            var _a;
            var _segments = [segment.map(function (i) {
              return i.instruction;
            })];
            var instructions = _segments[0];
            var pre = instructions.slice(0, index);
            var next = instructions.slice(index);
            if (isClosePath) {
              pre.shift();
              next.pop();
              if (next[0][0] === InstructionType.START) next.pop();
            }
            next.shift();
            (_a = next[0]) === null || _a === void 0 ? void 0 : (_a2 = _a).splice.apply(_a2, [0, next[0].length, InstructionType.START].concat(_toConsumableArray(next[0].slice(-2))));
            _segments.shift();
            if (isClosePath) {
              next.push.apply(next, _toConsumableArray(pre));
              pre.length = 0;
            } else {
              if (pre.length > 0 && next[0]) next[0][0] = InstructionType.LINE;
              pre.push.apply(pre, _toConsumableArray(next));
              next.length = 0;
            }
            if (next.length >= 1) _segments.unshift(next);
            if (pre.length >= 1) _segments.unshift(pre);
            // 如果原本是闭合路径，且剩余节点多于1个，保留闭合状态
            if (isClosePath && _segments[0].length > 1) {
              _segments[0].push([InstructionType.LINE].concat(_toConsumableArray(_segments[0][0].slice(-2))), [InstructionType.CLOSE]);
            }
            return _segments;
          };
          /**
           * 删除多节点
           */
          var removeMulitpleNodes = function removeMulitpleNodes(indexes) {
            var _a;
            // 需要克隆出新的指令列表不然会影响到pathObject
            var _segments = [segment.map(function (i) {
              return i.instruction;
            })];
            var removeIndexes = indexes.length <= 1 ? indexes : indexes.filter(function (i, idx, arr) {
              return arr.length <= 1 || idx >= 1 && arr[idx - 1] + 1 === i;
            });
            for (var i = removeIndexes.length - 1, startIndex = 0; i >= 0; i--) {
              var _a3;
              var instructions = _segments[0];
              var _index2 = startIndex + removeIndexes[i];
              var pre = instructions.slice(0, _index2);
              var next = instructions.slice(_index2);
              if (isClosePath) {
                pre.shift();
                next.pop();
                if (next[0][0] === InstructionType.START) next.pop();
              }
              (_a = next[0]) === null || _a === void 0 ? void 0 : (_a3 = _a).splice.apply(_a3, [0, next[0].length, InstructionType.START].concat(_toConsumableArray(next[0].slice(-2))));
              _segments.shift();
              if (isClosePath) {
                startIndex = next.length - 1;
                next.push.apply(next, _toConsumableArray(pre));
                pre.length = 0;
              }
              if (next.length > 1) _segments.unshift(next);
              if (pre.length > 1) _segments.unshift(pre);
              isClosePath = false;
            }
            return _segments;
          };
          return {
            path: path,
            segment: indexes.length === 1 ? removeSingleNode(indexes[0]) : removeMulitpleNodes(indexes)
          };
        });
        segments.forEach(function (i) {
          if (i.segment.length) {
            _this5.replacePathSegments(i.path, i.segment);
          } else {
            _this5.clear(i.path.pathObject);
          }
        });
        segmentIndexMap.clear();
      }
      /**
       * 新增路径指令
       * @param pathNode 指令对象
       * @param instruction 新指令
       */
    }, {
      key: "insert",
      value: function insert(path, index, instruction) {
        var newPath = this._updatePathByCommands(path, [{
          type: 'add',
          index: index,
          instruction: instruction
        }]);
        return newPath[0].segment[index];
      }
      /**
       * 在节点前新增路径指令
       * @param pathNode 指令对象
       * @param instruction 新指令
       */
    }, {
      key: "insertBeforeNode",
      value: function insertBeforeNode(pathNode, instruction) {
        var segment = pathNode.segment;
        var path = this.getPath(segment);
        if (!path) return;
        var index = segment.indexOf(pathNode);
        if (index === -1) return;
        return this.insert(path, index, instruction);
      }
      /**
       * 在节点后新增路径指令
       * @param pathNode 指令对象
       * @param instruction 新指令
       */
    }, {
      key: "insertAfterNode",
      value: function insertAfterNode(pathNode, instruction) {
        var segment = pathNode.segment;
        var path = this.getPath(segment);
        if (!path) return;
        var index = segment.indexOf(pathNode);
        if (index === -1) return;
        return this.insert(path, index + 1, instruction);
      }
      /**
       * 替换路径节点所在指令
       *
       * @note 路径节点的引用不会发生变化
       *
       * @param pathNode 指令对象
       * @param instruction 新指令
       */
    }, {
      key: "replace",
      value: function replace(pathNode, instruction) {
        var segment = pathNode.segment;
        var index = segment.indexOf(pathNode);
        if (index === -1) return;
        if (this.isClosePath(segment) && index === segment.length - 2) index = 0;
        var updateCommands = [];
        if (index === 0) {
          var newStartInstruction = [InstructionType.START].concat(_toConsumableArray(instruction.slice(-2)));
          updateCommands.push({
            type: 'update',
            index: 0,
            instruction: newStartInstruction
          });
          if (this.isClosePath(segment)) {
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
        var newPath = this._updatePathByCommands(this.paths.find(function (i) {
          return i.segment === segment;
        }), updateCommands);
        return newPath[0].segment[index];
      }
      /**
       * 闭合路径
       */
    }, {
      key: "close",
      value: function close(pathNode) {
        var path = this.getPath(pathNode.segment);
        if (!path) return;
        // 自闭合的路径无需再做闭合处理
        if (this.isClosePath(path.segment)) return;
        // 少于2个节点时无法实现闭合
        if (path.segment.length < 2) return;
        var updateCommands = [];
        var startNode = path.segment[0].node;
        var endNode = path.segment[path.segment.length - 1].node;
        // 需要考虑添加闭合重叠点
        if (startNode.x !== endNode.x || startNode.y !== endNode.y) {
          updateCommands.push({
            type: 'add',
            index: path.segment.length,
            instruction: [InstructionType.LINE, startNode.x, startNode.y]
          });
        }
        updateCommands.push({
          type: 'add',
          index: path.segment.length + updateCommands.length,
          instruction: [InstructionType.CLOSE]
        });
        this._updatePathByCommands(path, updateCommands);
      }
      /**
       * 通过更新命令更新路径
       * @param target
       * @param instruction
       */
    }, {
      key: "_updatePathByCommands",
      value: function _updatePathByCommands(path, queue) {
        var _this6 = this;
        var segment = path.segment;
        queue.sort(function (a, b) {
          return b.index - a.index;
        });
        queue.forEach(function (_ref6) {
          var type = _ref6.type,
            index = _ref6.index,
            instruction = _ref6.instruction;
          var _a, _b;
          if (type === 'add') {
            // 改变原来的起始点指令类型
            if (index === 0 && segment.length) {
              segment.splice(0, 1, {
                segment: segment,
                instruction: [InstructionType.LINE, segment[0].node.x, segment[0].node.y]
              });
            }
            segment.splice(index, 0, {
              segment: segment,
              instruction: instruction
            });
          }
          if (type === 'update') {
            var pathNode = segment[index];
            if (pathNode.node) {
              _this6.pathNodeMap["delete"](pathNode.node);
              _this6._observers["delete"](pathNode.node);
              if ((_a = pathNode.curveDots) === null || _a === void 0 ? void 0 : _a.pre) _this6._observers["delete"](pathNode.curveDots.pre);
              if ((_b = pathNode.curveDots) === null || _b === void 0 ? void 0 : _b.next) _this6._observers["delete"](pathNode.curveDots.next);
            }
            pathNode.instruction = instruction;
            delete pathNode.node;
            delete pathNode.curveDots;
          }
        });
        return this.draw([path]);
      }
      /**
       * 清除路径
       */
    }, {
      key: "clear",
      value: function clear(target) {
        var _this7 = this;
        var index = target instanceof fabric.fabric.Path ? this.paths.findIndex(function (i) {
          return i.pathObject === target;
        }) : this.paths.findIndex(function (i) {
          return i.segment === target;
        });
        if (index === -1) return;
        var path = this.paths[index];
        path.segment.forEach(function (_ref7) {
          var node = _ref7.node,
            curveDots = _ref7.curveDots;
          var _a, _b;
          if (!node) return;
          node.unobserve();
          (_a = curveDots === null || curveDots === void 0 ? void 0 : curveDots.pre) === null || _a === void 0 ? void 0 : _a.unobserve();
          (_b = curveDots === null || curveDots === void 0 ? void 0 : curveDots.next) === null || _b === void 0 ? void 0 : _b.unobserve();
          _this7.pathNodeMap["delete"](node);
        });
        this.paths.splice(index, 1);
        this._rerenderOriginPath(path.pathObject);
        this.fire('clear', [path]);
      }
      /**
       * 清除所有路径
       */
    }, {
      key: "clearAll",
      value: function clearAll() {
        this.paths.forEach(function (_ref8) {
          var segment = _ref8.segment;
          segment.forEach(function (_ref9) {
            var node = _ref9.node,
              curveDots = _ref9.curveDots;
            var _a, _b;
            node === null || node === void 0 ? void 0 : node.unobserve();
            (_a = curveDots === null || curveDots === void 0 ? void 0 : curveDots.pre) === null || _a === void 0 ? void 0 : _a.unobserve();
            (_b = curveDots === null || curveDots === void 0 ? void 0 : curveDots.next) === null || _b === void 0 ? void 0 : _b.unobserve();
          });
        });
        this.paths.length = 0;
        this.pathNodeMap.clear();
        this._observers.clear();
        this.fire('clearAll');
      }
      /**
       * 销毁并释放内存
       */
    }, {
      key: "destroy",
      value: function destroy() {
        var _a;
        this.clearAll();
        (_a = this._onceRerenderPaths) === null || _a === void 0 ? void 0 : _a.clear();
        this._onceRerenderPaths = null;
        this.context.destroy();
        this.events = {};
        this.fire('destroy');
      }
    }], [{
      key: "getInstructionNodeCrood",
      value: function getInstructionNodeCrood(instruction) {
        if (instruction[0] === InstructionType.CLOSE) return;
        return {
          x: instruction[instruction.length - 2],
          y: instruction[instruction.length - 1]
        };
      }
      /**
       * 获取路径中的路径分段
       * @param instructions 路径指令列表
       * @returns 路径分段
       */
    }, {
      key: "getPathSegments",
      value: function getPathSegments(instructions) {
        var segments = instructions.reduce(function (paths, instruction, idx, arr) {
          if (!instruction) return paths;
          if (instruction[0] === InstructionType.START && paths[paths.length - 1].length) paths.push([]);
          paths[paths.length - 1].push(instruction);
          if (instruction[0] === InstructionType.CLOSE && idx !== arr.length - 1) paths.push([]);
          return paths;
        }, [[]]);
        return segments;
      }
    }]);
  }(BaseEvent);
  /** 指令类型 */
  var InstructionType;
  (function (InstructionType) {
    InstructionType["START"] = "M";
    InstructionType["LINE"] = "L";
    InstructionType["QUADRATIC_CURCE"] = "Q";
    InstructionType["BEZIER_CURVE"] = "C";
    InstructionType["CLOSE"] = "Z";
  })(InstructionType || (InstructionType = {}));
  /**
   * VizPath
   */
  var VizPathCreator = /*#__PURE__*/function () {
    function VizPathCreator() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, VizPathCreator);
      this.options = {
        refreshPathTriggerTime: 'auto',
        refreshDeferDuration: 100
      };
      this.vizpath = null;
      /**
       * 增强模块列表
       */
      this.modules = [];
      this.options = defaults(options, this.options);
    }
    /**
     * 通过fabric.Path对象解析路径信息
     *
     * @param path farbic路径对象
     * @example
     *
     * const path = parseFabricPath(new fabric.Path());
     */
    return _createClass(VizPathCreator, [{
      key: "use",
      value:
      /**
       * 添加拓展模块
       */
      function use(module) {
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
       * 通过模块ID查找模块
       */
    }, {
      key: "findByID",
      value: function findByID(ID) {
        return this.modules.find(function (module) {
          return module.constructor.ID === ID;
        });
      }
      /**
       * 查找模块
       */
    }, {
      key: "find",
      value: function find(moduleConstructor) {
        return this.findByID(moduleConstructor.ID);
      }
      /**
       * 销毁
       */
    }, {
      key: "destroy",
      value: function destroy() {
        if (!this.vizpath) return;
        var vizpath = this.vizpath;
        this.modules.forEach(function (module) {
          module.__unload(vizpath);
        });
        this.vizpath = null;
      }
      /**
       * 初始可视路径编辑器
       */
    }, {
      key: "initialize",
      value: (function () {
        var _initialize = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var _this8 = this;
          var vizpath;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.vizpath) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return", this.vizpath);
              case 2:
                vizpath = new VizPath(this);
                _context3.next = 5;
                return new Promise(function (resolve) {
                  var next = 0;
                  var loadModule = /*#__PURE__*/function () {
                    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
                      var module;
                      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                        while (1) switch (_context2.prev = _context2.next) {
                          case 0:
                            module = _this8.modules[next];
                            if (module) {
                              _context2.next = 4;
                              break;
                            }
                            resolve(vizpath);
                            return _context2.abrupt("return");
                          case 4:
                            _context2.next = 6;
                            return Promise.resolve(module.__load(vizpath));
                          case 6:
                            next++;
                            loadModule();
                          case 8:
                          case "end":
                            return _context2.stop();
                        }
                      }, _callee2);
                    }));
                    return function loadModule() {
                      return _ref10.apply(this, arguments);
                    };
                  }();
                  loadModule();
                });
              case 5:
                this.vizpath = vizpath;
                return _context3.abrupt("return", vizpath);
              case 7:
              case "end":
                return _context3.stop();
            }
          }, _callee3, this);
        }));
        function initialize() {
          return _initialize.apply(this, arguments);
        }
        return initialize;
      }())
    }], [{
      key: "parseFabricPath",
      value: function parseFabricPath(pathObject) {
        var _parsePathJSON2 = parsePathJSON(pathObject),
          layout = _parsePathJSON2.layout,
          styles = _parsePathJSON2.styles;
        /**
         * 第一步：拆分组合路径， 如 new fabric.Path('M 0 0 L 10 10 z M 20 20 L 40 40 z')
         */
        var instructions = cloneDeep(pathObject.path);
        var segments = VizPath.getPathSegments(instructions).map(function (segment) {
          // 为每个子路径分配新建的路径对象
          var pathObject = new fabric.fabric.Path(fabric.fabric.util.joinPath(segment), styles);
          pathObject.path = segment;
          return {
            segment: segment,
            pathObject: pathObject
          };
        });
        // 建立组并销毁组是为了保持子路径对象的正确尺寸和位置
        new fabric.fabric.Group(segments.map(function (i) {
          return i.pathObject;
        }), layout).destroy();
        /**
         * 第二步：组合path
         */
        var path = segments.map(function (_ref11) {
          var segment = _ref11.segment,
            pathObject = _ref11.pathObject;
          // ① 清除组合元素对路径的偏移影响
          clearPathOffset(pathObject);
          repairPath(pathObject);
          // ② 修正头指令，头指令必须是M开始指令，其他的也没效果
          if (segment[0][0] !== InstructionType.START) {
            segment[0] = [InstructionType.START].concat(_toConsumableArray(segment[0].slice(segment[0].length - 2)));
          }
          // ③ 闭合指令的字母全改为大小以保证统一处理
          if (segment[segment.length - 1][0].toUpperCase() === InstructionType.CLOSE) {
            segment[segment.length - 1][0] = InstructionType.CLOSE;
          }
          // ④ 小于两个点的闭合路径直接解除闭合
          if (segment.length <= 2 && segment[segment.length - 1][0] === InstructionType.CLOSE) {
            segment.pop();
          }
          // ⑤ 闭合的路径如果在闭合指令前没有回到起始点，补充一条回到起始点的指令
          var isAutoClose = segment[segment.length - 1][0] === InstructionType.CLOSE;
          if (isAutoClose) {
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
          // ⑤ 创建path
          var _segment = [];
          segment.forEach(function (instruction) {
            _segment.push({
              segment: _segment,
              instruction: instruction
            });
          });
          return {
            segment: _segment,
            pathObject: pathObject
          };
        });
        return path;
      }
      /**
       * 通过路径指令获取Editor路径信息
       *
       * @param d 路径指令信息
       * @example
       *
       * const path = parsePathData('M 0 0 L 100 100');
       */
    }, {
      key: "parsePathData",
      value: function parsePathData(d) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var path = new fabric.fabric.Path(d, defaults(options, {
          left: 0,
          top: 0
        }));
        return this.parseFabricPath(path);
      }
      /**
       * 通过svg文件链接加载并获取Editor路径信息
       *
       * @param d 路径指令信息
       * @example
       *
       * const path = parsePathFile('http');
       */
    }, {
      key: "parsePathFile",
      value: (function () {
        var _parsePathFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(url) {
          var options,
            object,
            pathGroup,
            paths,
            extract,
            _args4 = arguments;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                _context4.next = 3;
                return loadSVGToPathFromURL(url);
              case 3:
                object = _context4.sent;
                if (object) {
                  _context4.next = 6;
                  break;
                }
                return _context4.abrupt("return");
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
                      paths.push(VizPathCreator.parseFabricPath(child));
                    }
                  });
                };
                extract(pathGroup);
                return _context4.abrupt("return", paths);
              case 12:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }));
        function parsePathFile(_x4) {
          return _parsePathFile.apply(this, arguments);
        }
        return parsePathFile;
      }())
    }]);
  }(); // Unique ID creation requires a high quality random # generator. In the browser we therefore
  // require the crypto API and do not support built-in fallback to lower quality random number
  // generators (like Math.random()).
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    // lazy load so that environments that need to polyfill have a chance to do so
    if (!getRandomValues) {
      // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
      getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
      if (!getRandomValues) {
        throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
      }
    }
    return getRandomValues(rnds8);
  }

  /**
   * Convert array of 16 byte values to UUID string format of the form:
   * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   */

  var byteToHex = [];
  for (var i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1));
  }
  function unsafeStringify(arr) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
  }
  var randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  var _native = {
    randomUUID: randomUUID
  };
  function v4(options, buf, offset) {
    if (_native.randomUUID && !buf && !options) {
      return _native.randomUUID();
    }
    options = options || {};
    var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

    if (buf) {
      offset = offset || 0;
      for (var _i = 0; _i < 16; ++_i) {
        buf[offset + _i] = rnds[_i];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  var EditorModule = /*#__PURE__*/function (_BaseEvent2) {
    function EditorModule() {
      var _this9;
      _classCallCheck(this, EditorModule);
      _this9 = _callSuper(this, EditorModule, arguments);
      _this9.vizpath = null;
      return _this9;
    }
    _inherits(EditorModule, _BaseEvent2);
    return _createClass(EditorModule, [{
      key: "prepare",
      value: function () {
        var _prepare = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
              case "end":
                return _context5.stop();
            }
          }, _callee5);
        }));
        function prepare() {
          return _prepare.apply(this, arguments);
        }
        return prepare;
      }()
    }, {
      key: "__unload",
      value: function __unload(vizpath) {
        this.unload(vizpath);
        this.vizpath = null;
        this.events = {};
      }
    }, {
      key: "__load",
      value: function () {
        var _load = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(vizpath) {
          return _regeneratorRuntime().wrap(function _callee6$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.prepare();
              case 2:
                this.vizpath = vizpath;
                this.load(vizpath);
              case 4:
              case "end":
                return _context6.stop();
            }
          }, _callee6, this);
        }));
        function __load(_x5) {
          return _load.apply(this, arguments);
        }
        return __load;
      }()
    }]);
  }(BaseEvent);
  var DEFAULT_THEME = {
    path: function path(decorator, pathObject) {
      pathObject.set({
        stroke: '#4b4b4b',
        strokeWidth: 1
      });
    },
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
  var EditorUI = /*#__PURE__*/function (_EditorModule) {
    function EditorUI() {
      var _this10;
      var configurator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
        return {};
      };
      var initialShareState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var onShareStateUpdate = arguments.length > 2 ? arguments[2] : undefined;
      _classCallCheck(this, EditorUI);
      _this10 = _callSuper(this, EditorUI);
      /**
       * 主题
       */
      _this10.theme = null;
      /**
       * 元素渲染更新回调映射
       */
      _this10.objectPreRenderCallbackMap = new Map([]);
      _this10.configurator = configurator;
      _this10.shareState = initialShareState;
      _this10._onShareStateUpdate = onShareStateUpdate;
      return _this10;
    }
    /**
     * 重新渲染对象样式
     */
    _inherits(EditorUI, _EditorModule);
    return _createClass(EditorUI, [{
      key: "refresh",
      value: function refresh() {
        var _a, _b;
        var editor = (_a = this.vizpath) === null || _a === void 0 ? void 0 : _a.context.find(Editor$1);
        if (!editor) return;
        var canvas = editor.canvas;
        if (!canvas) return;
        (_b = this._onShareStateUpdate) === null || _b === void 0 ? void 0 : _b.call(this, editor, this.shareState);
        this.objectPreRenderCallbackMap.forEach(function (callback) {
          return callback();
        });
        canvas.requestRenderAll();
      }
    }, {
      key: "unload",
      value: function unload() {
        this.theme = null;
        this.shareState = {};
        this._onShareStateUpdate = undefined;
        this.objectPreRenderCallbackMap.clear();
      }
    }, {
      key: "load",
      value: function load(vizpath) {
        var _this11 = this;
        var editor = vizpath.context.find(Editor$1);
        if (!editor) {
          throw new TypeError('Please use editor module before using ui module.');
        }
        this.shareState = new Proxy(this.shareState, {
          // 每次共享状态修改都会触发UI更新
          set: function set(target, p, newValue, receiver) {
            var needRefresh = target[p] !== newValue;
            var result = Reflect.set(target, p, newValue, receiver);
            if (needRefresh) _this11.refresh();
            return result;
          }
        });
        var theme = this.configurator(editor, this.shareState);
        this.theme = defaults(theme, DEFAULT_THEME);
      }
    }]);
  }(EditorModule);
  EditorUI.ID = 'editor-ui';

  // math-inlining.
  var abs$1 = Math.abs,
    cos$1 = Math.cos,
    sin$1 = Math.sin,
    acos$1 = Math.acos,
    atan2 = Math.atan2,
    sqrt$1 = Math.sqrt,
    pow = Math.pow;

  // cube root function yielding real roots
  function crt(v) {
    return v < 0 ? -pow(-v, 1 / 3) : pow(v, 1 / 3);
  }

  // trig constants
  var pi$1 = Math.PI,
    tau = 2 * pi$1,
    quart = pi$1 / 2,
    // float precision significant decimal
    epsilon = 0.000001,
    // extremas used in bbox calculation and similar algorithms
    nMax = Number.MAX_SAFE_INTEGER || 9007199254740991,
    nMin = Number.MIN_SAFE_INTEGER || -9007199254740991,
    // a zero coordinate, which is surprisingly useful
    ZERO = {
      x: 0,
      y: 0,
      z: 0
    };

  // Bezier utility functions
  var utils = {
    // Legendre-Gauss abscissae with n=24 (x_i values, defined at i=n as the roots of the nth order Legendre polynomial Pn(x))
    Tvalues: [-0.0640568928626056260850430826247450385909, 0.0640568928626056260850430826247450385909, -0.1911188674736163091586398207570696318404, 0.1911188674736163091586398207570696318404, -0.3150426796961633743867932913198102407864, 0.3150426796961633743867932913198102407864, -0.4337935076260451384870842319133497124524, 0.4337935076260451384870842319133497124524, -0.5454214713888395356583756172183723700107, 0.5454214713888395356583756172183723700107, -0.6480936519369755692524957869107476266696, 0.6480936519369755692524957869107476266696, -0.7401241915785543642438281030999784255232, 0.7401241915785543642438281030999784255232, -0.8200019859739029219539498726697452080761, 0.8200019859739029219539498726697452080761, -0.8864155270044010342131543419821967550873, 0.8864155270044010342131543419821967550873, -0.9382745520027327585236490017087214496548, 0.9382745520027327585236490017087214496548, -0.9747285559713094981983919930081690617411, 0.9747285559713094981983919930081690617411, -0.9951872199970213601799974097007368118745, 0.9951872199970213601799974097007368118745],
    // Legendre-Gauss weights with n=24 (w_i values, defined by a function linked to in the Bezier primer article)
    Cvalues: [0.1279381953467521569740561652246953718517, 0.1279381953467521569740561652246953718517, 0.1258374563468282961213753825111836887264, 0.1258374563468282961213753825111836887264, 0.121670472927803391204463153476262425607, 0.121670472927803391204463153476262425607, 0.1155056680537256013533444839067835598622, 0.1155056680537256013533444839067835598622, 0.1074442701159656347825773424466062227946, 0.1074442701159656347825773424466062227946, 0.0976186521041138882698806644642471544279, 0.0976186521041138882698806644642471544279, 0.086190161531953275917185202983742667185, 0.086190161531953275917185202983742667185, 0.0733464814110803057340336152531165181193, 0.0733464814110803057340336152531165181193, 0.0592985849154367807463677585001085845412, 0.0592985849154367807463677585001085845412, 0.0442774388174198061686027482113382288593, 0.0442774388174198061686027482113382288593, 0.0285313886289336631813078159518782864491, 0.0285313886289336631813078159518782864491, 0.0123412297999871995468056670700372915759, 0.0123412297999871995468056670700372915759],
    arcfn: function arcfn(t, derivativeFn) {
      var d = derivativeFn(t);
      var l = d.x * d.x + d.y * d.y;
      if (typeof d.z !== "undefined") {
        l += d.z * d.z;
      }
      return sqrt$1(l);
    },
    compute: function compute(t, points, _3d) {
      // shortcuts
      if (t === 0) {
        points[0].t = 0;
        return points[0];
      }
      var order = points.length - 1;
      if (t === 1) {
        points[order].t = 1;
        return points[order];
      }
      var mt = 1 - t;
      var p = points;

      // constant?
      if (order === 0) {
        points[0].t = t;
        return points[0];
      }

      // linear?
      if (order === 1) {
        var ret = {
          x: mt * p[0].x + t * p[1].x,
          y: mt * p[0].y + t * p[1].y,
          t: t
        };
        if (_3d) {
          ret.z = mt * p[0].z + t * p[1].z;
        }
        return ret;
      }

      // quadratic/cubic curve?
      if (order < 4) {
        var mt2 = mt * mt,
          t2 = t * t,
          a,
          b,
          c,
          d = 0;
        if (order === 2) {
          p = [p[0], p[1], p[2], ZERO];
          a = mt2;
          b = mt * t * 2;
          c = t2;
        } else if (order === 3) {
          a = mt2 * mt;
          b = mt2 * t * 3;
          c = mt * t2 * 3;
          d = t * t2;
        }
        var _ret = {
          x: a * p[0].x + b * p[1].x + c * p[2].x + d * p[3].x,
          y: a * p[0].y + b * p[1].y + c * p[2].y + d * p[3].y,
          t: t
        };
        if (_3d) {
          _ret.z = a * p[0].z + b * p[1].z + c * p[2].z + d * p[3].z;
        }
        return _ret;
      }

      // higher order curves: use de Casteljau's computation
      var dCpts = JSON.parse(JSON.stringify(points));
      while (dCpts.length > 1) {
        for (var _i2 = 0; _i2 < dCpts.length - 1; _i2++) {
          dCpts[_i2] = {
            x: dCpts[_i2].x + (dCpts[_i2 + 1].x - dCpts[_i2].x) * t,
            y: dCpts[_i2].y + (dCpts[_i2 + 1].y - dCpts[_i2].y) * t
          };
          if (typeof dCpts[_i2].z !== "undefined") {
            dCpts[_i2].z = dCpts[_i2].z + (dCpts[_i2 + 1].z - dCpts[_i2].z) * t;
          }
        }
        dCpts.splice(dCpts.length - 1, 1);
      }
      dCpts[0].t = t;
      return dCpts[0];
    },
    computeWithRatios: function computeWithRatios(t, points, ratios, _3d) {
      var mt = 1 - t,
        r = ratios,
        p = points;
      var f1 = r[0],
        f2 = r[1],
        f3 = r[2],
        f4 = r[3],
        d;

      // spec for linear
      f1 *= mt;
      f2 *= t;
      if (p.length === 2) {
        d = f1 + f2;
        return {
          x: (f1 * p[0].x + f2 * p[1].x) / d,
          y: (f1 * p[0].y + f2 * p[1].y) / d,
          z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z) / d,
          t: t
        };
      }

      // upgrade to quadratic
      f1 *= mt;
      f2 *= 2 * mt;
      f3 *= t * t;
      if (p.length === 3) {
        d = f1 + f2 + f3;
        return {
          x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x) / d,
          y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y) / d,
          z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z) / d,
          t: t
        };
      }

      // upgrade to cubic
      f1 *= mt;
      f2 *= 1.5 * mt;
      f3 *= 3 * mt;
      f4 *= t * t * t;
      if (p.length === 4) {
        d = f1 + f2 + f3 + f4;
        return {
          x: (f1 * p[0].x + f2 * p[1].x + f3 * p[2].x + f4 * p[3].x) / d,
          y: (f1 * p[0].y + f2 * p[1].y + f3 * p[2].y + f4 * p[3].y) / d,
          z: !_3d ? false : (f1 * p[0].z + f2 * p[1].z + f3 * p[2].z + f4 * p[3].z) / d,
          t: t
        };
      }
    },
    derive: function derive(points, _3d) {
      var dpoints = [];
      for (var p = points, d = p.length, c = d - 1; d > 1; d--, c--) {
        var list = [];
        for (var j = 0, dpt; j < c; j++) {
          dpt = {
            x: c * (p[j + 1].x - p[j].x),
            y: c * (p[j + 1].y - p[j].y)
          };
          if (_3d) {
            dpt.z = c * (p[j + 1].z - p[j].z);
          }
          list.push(dpt);
        }
        dpoints.push(list);
        p = list;
      }
      return dpoints;
    },
    between: function between(v, m, M) {
      return m <= v && v <= M || utils.approximately(v, m) || utils.approximately(v, M);
    },
    approximately: function approximately(a, b, precision) {
      return abs$1(a - b) <= (precision || epsilon);
    },
    length: function length(derivativeFn) {
      var z = 0.5,
        len = utils.Tvalues.length;
      var sum = 0;
      for (var _i3 = 0, _t; _i3 < len; _i3++) {
        _t = z * utils.Tvalues[_i3] + z;
        sum += utils.Cvalues[_i3] * utils.arcfn(_t, derivativeFn);
      }
      return z * sum;
    },
    map: function map(v, ds, de, ts, te) {
      var d1 = de - ds,
        d2 = te - ts,
        v2 = v - ds,
        r = v2 / d1;
      return ts + d2 * r;
    },
    lerp: function lerp(r, v1, v2) {
      var ret = {
        x: v1.x + r * (v2.x - v1.x),
        y: v1.y + r * (v2.y - v1.y)
      };
      if (v1.z !== undefined && v2.z !== undefined) {
        ret.z = v1.z + r * (v2.z - v1.z);
      }
      return ret;
    },
    pointToString: function pointToString(p) {
      var s = p.x + "/" + p.y;
      if (typeof p.z !== "undefined") {
        s += "/" + p.z;
      }
      return s;
    },
    pointsToString: function pointsToString(points) {
      return "[" + points.map(utils.pointToString).join(", ") + "]";
    },
    copy: function copy(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    angle: function angle(o, v1, v2) {
      var dx1 = v1.x - o.x,
        dy1 = v1.y - o.y,
        dx2 = v2.x - o.x,
        dy2 = v2.y - o.y,
        cross = dx1 * dy2 - dy1 * dx2,
        dot = dx1 * dx2 + dy1 * dy2;
      return atan2(cross, dot);
    },
    // round as string, to avoid rounding errors
    round: function round(v, d) {
      var s = "" + v;
      var pos = s.indexOf(".");
      return parseFloat(s.substring(0, pos + 1 + d));
    },
    dist: function dist(p1, p2) {
      var dx = p1.x - p2.x,
        dy = p1.y - p2.y;
      return sqrt$1(dx * dx + dy * dy);
    },
    closest: function closest(LUT, point) {
      var mdist = pow(2, 63),
        mpos,
        d;
      LUT.forEach(function (p, idx) {
        d = utils.dist(point, p);
        if (d < mdist) {
          mdist = d;
          mpos = idx;
        }
      });
      return {
        mdist: mdist,
        mpos: mpos
      };
    },
    abcratio: function abcratio(t, n) {
      // see ratio(t) note on http://pomax.github.io/bezierinfo/#abc
      if (n !== 2 && n !== 3) {
        return false;
      }
      if (typeof t === "undefined") {
        t = 0.5;
      } else if (t === 0 || t === 1) {
        return t;
      }
      var bottom = pow(t, n) + pow(1 - t, n),
        top = bottom - 1;
      return abs$1(top / bottom);
    },
    projectionratio: function projectionratio(t, n) {
      // see u(t) note on http://pomax.github.io/bezierinfo/#abc
      if (n !== 2 && n !== 3) {
        return false;
      }
      if (typeof t === "undefined") {
        t = 0.5;
      } else if (t === 0 || t === 1) {
        return t;
      }
      var top = pow(1 - t, n),
        bottom = pow(t, n) + top;
      return top / bottom;
    },
    lli8: function lli8(x1, y1, x2, y2, x3, y3, x4, y4) {
      var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
        ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4),
        d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      if (d == 0) {
        return false;
      }
      return {
        x: nx / d,
        y: ny / d
      };
    },
    lli4: function lli4(p1, p2, p3, p4) {
      var x1 = p1.x,
        y1 = p1.y,
        x2 = p2.x,
        y2 = p2.y,
        x3 = p3.x,
        y3 = p3.y,
        x4 = p4.x,
        y4 = p4.y;
      return utils.lli8(x1, y1, x2, y2, x3, y3, x4, y4);
    },
    lli: function lli(v1, v2) {
      return utils.lli4(v1, v1.c, v2, v2.c);
    },
    makeline: function makeline(p1, p2) {
      return new Bezier(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2, p2.x, p2.y);
    },
    findbbox: function findbbox(sections) {
      var mx = nMax,
        my = nMax,
        MX = nMin,
        MY = nMin;
      sections.forEach(function (s) {
        var bbox = s.bbox();
        if (mx > bbox.x.min) mx = bbox.x.min;
        if (my > bbox.y.min) my = bbox.y.min;
        if (MX < bbox.x.max) MX = bbox.x.max;
        if (MY < bbox.y.max) MY = bbox.y.max;
      });
      return {
        x: {
          min: mx,
          mid: (mx + MX) / 2,
          max: MX,
          size: MX - mx
        },
        y: {
          min: my,
          mid: (my + MY) / 2,
          max: MY,
          size: MY - my
        }
      };
    },
    shapeintersections: function shapeintersections(s1, bbox1, s2, bbox2, curveIntersectionThreshold) {
      if (!utils.bboxoverlap(bbox1, bbox2)) return [];
      var intersections = [];
      var a1 = [s1.startcap, s1.forward, s1.back, s1.endcap];
      var a2 = [s2.startcap, s2.forward, s2.back, s2.endcap];
      a1.forEach(function (l1) {
        if (l1.virtual) return;
        a2.forEach(function (l2) {
          if (l2.virtual) return;
          var iss = l1.intersects(l2, curveIntersectionThreshold);
          if (iss.length > 0) {
            iss.c1 = l1;
            iss.c2 = l2;
            iss.s1 = s1;
            iss.s2 = s2;
            intersections.push(iss);
          }
        });
      });
      return intersections;
    },
    makeshape: function makeshape(forward, back, curveIntersectionThreshold) {
      var bpl = back.points.length;
      var fpl = forward.points.length;
      var start = utils.makeline(back.points[bpl - 1], forward.points[0]);
      var end = utils.makeline(forward.points[fpl - 1], back.points[0]);
      var shape = {
        startcap: start,
        forward: forward,
        back: back,
        endcap: end,
        bbox: utils.findbbox([start, forward, back, end])
      };
      shape.intersections = function (s2) {
        return utils.shapeintersections(shape, shape.bbox, s2, s2.bbox, curveIntersectionThreshold);
      };
      return shape;
    },
    getminmax: function getminmax(curve, d, list) {
      if (!list) return {
        min: 0,
        max: 0
      };
      var min = nMax,
        max = nMin,
        t,
        c;
      if (list.indexOf(0) === -1) {
        list = [0].concat(list);
      }
      if (list.indexOf(1) === -1) {
        list.push(1);
      }
      for (var _i4 = 0, len = list.length; _i4 < len; _i4++) {
        t = list[_i4];
        c = curve.get(t);
        if (c[d] < min) {
          min = c[d];
        }
        if (c[d] > max) {
          max = c[d];
        }
      }
      return {
        min: min,
        mid: (min + max) / 2,
        max: max,
        size: max - min
      };
    },
    align: function align(points, line) {
      var tx = line.p1.x,
        ty = line.p1.y,
        a = -atan2(line.p2.y - ty, line.p2.x - tx),
        d = function d(v) {
          return {
            x: (v.x - tx) * cos$1(a) - (v.y - ty) * sin$1(a),
            y: (v.x - tx) * sin$1(a) + (v.y - ty) * cos$1(a)
          };
        };
      return points.map(d);
    },
    roots: function roots(points, line) {
      line = line || {
        p1: {
          x: 0,
          y: 0
        },
        p2: {
          x: 1,
          y: 0
        }
      };
      var order = points.length - 1;
      var aligned = utils.align(points, line);
      var reduce = function reduce(t) {
        return 0 <= t && t <= 1;
      };
      if (order === 2) {
        var _a4 = aligned[0].y,
          _b2 = aligned[1].y,
          _c2 = aligned[2].y,
          _d2 = _a4 - 2 * _b2 + _c2;
        if (_d2 !== 0) {
          var m1 = -sqrt$1(_b2 * _b2 - _a4 * _c2),
            m2 = -_a4 + _b2,
            _v = -(m1 + m2) / _d2,
            v2 = -(-m1 + m2) / _d2;
          return [_v, v2].filter(reduce);
        } else if (_b2 !== _c2 && _d2 === 0) {
          return [(2 * _b2 - _c2) / (2 * _b2 - 2 * _c2)].filter(reduce);
        }
        return [];
      }

      // see http://www.trans4mind.com/personal_development/mathematics/polynomials/cubicAlgebra.htm
      var pa = aligned[0].y,
        pb = aligned[1].y,
        pc = aligned[2].y,
        pd = aligned[3].y;
      var d = -pa + 3 * pb - 3 * pc + pd,
        a = 3 * pa - 6 * pb + 3 * pc,
        b = -3 * pa + 3 * pb,
        c = pa;
      if (utils.approximately(d, 0)) {
        // this is not a cubic curve.
        if (utils.approximately(a, 0)) {
          // in fact, this is not a quadratic curve either.
          if (utils.approximately(b, 0)) {
            // in fact in fact, there are no solutions.
            return [];
          }
          // linear solution:
          return [-c / b].filter(reduce);
        }
        // quadratic solution:
        var _q = sqrt$1(b * b - 4 * a * c),
          a2 = 2 * a;
        return [(_q - b) / a2, (-b - _q) / a2].filter(reduce);
      }

      // at this point, we know we need a cubic solution:

      a /= d;
      b /= d;
      c /= d;
      var p = (3 * b - a * a) / 3,
        p3 = p / 3,
        q = (2 * a * a * a - 9 * a * b + 27 * c) / 27,
        q2 = q / 2,
        discriminant = q2 * q2 + p3 * p3 * p3;
      var u1, v1, x1, x2, x3;
      if (discriminant < 0) {
        var mp3 = -p / 3,
          mp33 = mp3 * mp3 * mp3,
          r = sqrt$1(mp33),
          _t2 = -q / (2 * r),
          cosphi = _t2 < -1 ? -1 : _t2 > 1 ? 1 : _t2,
          phi = acos$1(cosphi),
          crtr = crt(r),
          t1 = 2 * crtr;
        x1 = t1 * cos$1(phi / 3) - a / 3;
        x2 = t1 * cos$1((phi + tau) / 3) - a / 3;
        x3 = t1 * cos$1((phi + 2 * tau) / 3) - a / 3;
        return [x1, x2, x3].filter(reduce);
      } else if (discriminant === 0) {
        u1 = q2 < 0 ? crt(-q2) : -crt(q2);
        x1 = 2 * u1 - a / 3;
        x2 = -u1 - a / 3;
        return [x1, x2].filter(reduce);
      } else {
        var sd = sqrt$1(discriminant);
        u1 = crt(-q2 + sd);
        v1 = crt(q2 + sd);
        return [u1 - v1 - a / 3].filter(reduce);
      }
    },
    droots: function droots(p) {
      // quadratic roots are easy
      if (p.length === 3) {
        var a = p[0],
          b = p[1],
          c = p[2],
          d = a - 2 * b + c;
        if (d !== 0) {
          var m1 = -sqrt$1(b * b - a * c),
            m2 = -a + b,
            v1 = -(m1 + m2) / d,
            v2 = -(-m1 + m2) / d;
          return [v1, v2];
        } else if (b !== c && d === 0) {
          return [(2 * b - c) / (2 * (b - c))];
        }
        return [];
      }

      // linear roots are even easier
      if (p.length === 2) {
        var _a5 = p[0],
          _b3 = p[1];
        if (_a5 !== _b3) {
          return [_a5 / (_a5 - _b3)];
        }
        return [];
      }
      return [];
    },
    curvature: function curvature(t, d1, d2, _3d, kOnly) {
      var num,
        dnm,
        adk,
        dk,
        k = 0,
        r = 0;

      //
      // We're using the following formula for curvature:
      //
      //              x'y" - y'x"
      //   k(t) = ------------------
      //           (x'² + y'²)^(3/2)
      //
      // from https://en.wikipedia.org/wiki/Radius_of_curvature#Definition
      //
      // With it corresponding 3D counterpart:
      //
      //          sqrt( (y'z" - y"z')² + (z'x" - z"x')² + (x'y" - x"y')²)
      //   k(t) = -------------------------------------------------------
      //                     (x'² + y'² + z'²)^(3/2)
      //

      var d = utils.compute(t, d1);
      var dd = utils.compute(t, d2);
      var qdsum = d.x * d.x + d.y * d.y;
      if (_3d) {
        num = sqrt$1(pow(d.y * dd.z - dd.y * d.z, 2) + pow(d.z * dd.x - dd.z * d.x, 2) + pow(d.x * dd.y - dd.x * d.y, 2));
        dnm = pow(qdsum + d.z * d.z, 3 / 2);
      } else {
        num = d.x * dd.y - d.y * dd.x;
        dnm = pow(qdsum, 3 / 2);
      }
      if (num === 0 || dnm === 0) {
        return {
          k: 0,
          r: 0
        };
      }
      k = num / dnm;
      r = dnm / num;

      // We're also computing the derivative of kappa, because
      // there is value in knowing the rate of change for the
      // curvature along the curve. And we're just going to
      // ballpark it based on an epsilon.
      if (!kOnly) {
        // compute k'(t) based on the interval before, and after it,
        // to at least try to not introduce forward/backward pass bias.
        var pk = utils.curvature(t - 0.001, d1, d2, _3d, true).k;
        var nk = utils.curvature(t + 0.001, d1, d2, _3d, true).k;
        dk = (nk - k + (k - pk)) / 2;
        adk = (abs$1(nk - k) + abs$1(k - pk)) / 2;
      }
      return {
        k: k,
        r: r,
        dk: dk,
        adk: adk
      };
    },
    inflections: function inflections(points) {
      if (points.length < 4) return [];

      // FIXME: TODO: add in inflection abstraction for quartic+ curves?

      var p = utils.align(points, {
          p1: points[0],
          p2: points.slice(-1)[0]
        }),
        a = p[2].x * p[1].y,
        b = p[3].x * p[1].y,
        c = p[1].x * p[2].y,
        d = p[3].x * p[2].y,
        v1 = 18 * (-3 * a + 2 * b + 3 * c - d),
        v2 = 18 * (3 * a - b - 3 * c),
        v3 = 18 * (c - a);
      if (utils.approximately(v1, 0)) {
        if (!utils.approximately(v2, 0)) {
          var _t3 = -v3 / v2;
          if (0 <= _t3 && _t3 <= 1) return [_t3];
        }
        return [];
      }
      var d2 = 2 * v1;
      if (utils.approximately(d2, 0)) return [];
      var trm = v2 * v2 - 4 * v1 * v3;
      if (trm < 0) return [];
      var sq = Math.sqrt(trm);
      return [(sq - v2) / d2, -(v2 + sq) / d2].filter(function (r) {
        return 0 <= r && r <= 1;
      });
    },
    bboxoverlap: function bboxoverlap(b1, b2) {
      var dims = ["x", "y"],
        len = dims.length;
      for (var _i5 = 0, dim, l, _t4, d; _i5 < len; _i5++) {
        dim = dims[_i5];
        l = b1[dim].mid;
        _t4 = b2[dim].mid;
        d = (b1[dim].size + b2[dim].size) / 2;
        if (abs$1(l - _t4) >= d) return false;
      }
      return true;
    },
    expandbox: function expandbox(bbox, _bbox) {
      if (_bbox.x.min < bbox.x.min) {
        bbox.x.min = _bbox.x.min;
      }
      if (_bbox.y.min < bbox.y.min) {
        bbox.y.min = _bbox.y.min;
      }
      if (_bbox.z && _bbox.z.min < bbox.z.min) {
        bbox.z.min = _bbox.z.min;
      }
      if (_bbox.x.max > bbox.x.max) {
        bbox.x.max = _bbox.x.max;
      }
      if (_bbox.y.max > bbox.y.max) {
        bbox.y.max = _bbox.y.max;
      }
      if (_bbox.z && _bbox.z.max > bbox.z.max) {
        bbox.z.max = _bbox.z.max;
      }
      bbox.x.mid = (bbox.x.min + bbox.x.max) / 2;
      bbox.y.mid = (bbox.y.min + bbox.y.max) / 2;
      if (bbox.z) {
        bbox.z.mid = (bbox.z.min + bbox.z.max) / 2;
      }
      bbox.x.size = bbox.x.max - bbox.x.min;
      bbox.y.size = bbox.y.max - bbox.y.min;
      if (bbox.z) {
        bbox.z.size = bbox.z.max - bbox.z.min;
      }
    },
    pairiteration: function pairiteration(c1, c2, curveIntersectionThreshold) {
      var c1b = c1.bbox(),
        c2b = c2.bbox(),
        r = 100000,
        threshold = curveIntersectionThreshold || 0.5;
      if (c1b.x.size + c1b.y.size < threshold && c2b.x.size + c2b.y.size < threshold) {
        return [(r * (c1._t1 + c1._t2) / 2 | 0) / r + "/" + (r * (c2._t1 + c2._t2) / 2 | 0) / r];
      }
      var cc1 = c1.split(0.5),
        cc2 = c2.split(0.5),
        pairs = [{
          left: cc1.left,
          right: cc2.left
        }, {
          left: cc1.left,
          right: cc2.right
        }, {
          left: cc1.right,
          right: cc2.right
        }, {
          left: cc1.right,
          right: cc2.left
        }];
      pairs = pairs.filter(function (pair) {
        return utils.bboxoverlap(pair.left.bbox(), pair.right.bbox());
      });
      var results = [];
      if (pairs.length === 0) return results;
      pairs.forEach(function (pair) {
        results = results.concat(utils.pairiteration(pair.left, pair.right, threshold));
      });
      results = results.filter(function (v, i) {
        return results.indexOf(v) === i;
      });
      return results;
    },
    getccenter: function getccenter(p1, p2, p3) {
      var dx1 = p2.x - p1.x,
        dy1 = p2.y - p1.y,
        dx2 = p3.x - p2.x,
        dy2 = p3.y - p2.y,
        dx1p = dx1 * cos$1(quart) - dy1 * sin$1(quart),
        dy1p = dx1 * sin$1(quart) + dy1 * cos$1(quart),
        dx2p = dx2 * cos$1(quart) - dy2 * sin$1(quart),
        dy2p = dx2 * sin$1(quart) + dy2 * cos$1(quart),
        // chord midpoints
        mx1 = (p1.x + p2.x) / 2,
        my1 = (p1.y + p2.y) / 2,
        mx2 = (p2.x + p3.x) / 2,
        my2 = (p2.y + p3.y) / 2,
        // midpoint offsets
        mx1n = mx1 + dx1p,
        my1n = my1 + dy1p,
        mx2n = mx2 + dx2p,
        my2n = my2 + dy2p,
        // intersection of these lines:
        arc = utils.lli8(mx1, my1, mx1n, my1n, mx2, my2, mx2n, my2n),
        r = utils.dist(arc, p1);

      // arc start/end values, over mid point:
      var s = atan2(p1.y - arc.y, p1.x - arc.x),
        m = atan2(p2.y - arc.y, p2.x - arc.x),
        e = atan2(p3.y - arc.y, p3.x - arc.x),
        _;

      // determine arc direction (cw/ccw correction)
      if (s < e) {
        // if s<m<e, arc(s, e)
        // if m<s<e, arc(e, s + tau)
        // if s<e<m, arc(e, s + tau)
        if (s > m || m > e) {
          s += tau;
        }
        if (s > e) {
          _ = e;
          e = s;
          s = _;
        }
      } else {
        // if e<m<s, arc(e, s)
        // if m<e<s, arc(s, e + tau)
        // if e<s<m, arc(s, e + tau)
        if (e < m && m < s) {
          _ = e;
          e = s;
          s = _;
        } else {
          e += tau;
        }
      }
      // assign and done.
      arc.s = s;
      arc.e = e;
      arc.r = r;
      return arc;
    },
    numberSort: function numberSort(a, b) {
      return a - b;
    }
  };

  /**
   * Poly Bezier
   * @param {[type]} curves [description]
   */
  var PolyBezier = /*#__PURE__*/function () {
    function PolyBezier(curves) {
      _classCallCheck(this, PolyBezier);
      this.curves = [];
      this._3d = false;
      if (!!curves) {
        this.curves = curves;
        this._3d = this.curves[0]._3d;
      }
    }
    return _createClass(PolyBezier, [{
      key: "valueOf",
      value: function valueOf() {
        return this.toString();
      }
    }, {
      key: "toString",
      value: function toString() {
        return "[" + this.curves.map(function (curve) {
          return utils.pointsToString(curve.points);
        }).join(", ") + "]";
      }
    }, {
      key: "addCurve",
      value: function addCurve(curve) {
        this.curves.push(curve);
        this._3d = this._3d || curve._3d;
      }
    }, {
      key: "length",
      value: function length() {
        return this.curves.map(function (v) {
          return v.length();
        }).reduce(function (a, b) {
          return a + b;
        });
      }
    }, {
      key: "curve",
      value: function curve(idx) {
        return this.curves[idx];
      }
    }, {
      key: "bbox",
      value: function bbox() {
        var c = this.curves;
        var bbox = c[0].bbox();
        for (var i = 1; i < c.length; i++) {
          utils.expandbox(bbox, c[i].bbox());
        }
        return bbox;
      }
    }, {
      key: "offset",
      value: function offset(d) {
        var offset = [];
        this.curves.forEach(function (v) {
          offset.push.apply(offset, _toConsumableArray(v.offset(d)));
        });
        return new PolyBezier(offset);
      }
    }]);
  }();
  /**
    A javascript Bezier curve library by Pomax.

    Based on http://pomax.github.io/bezierinfo

    This code is MIT licensed.
  **/
  // math-inlining.
  var abs = Math.abs,
    min = Math.min,
    max = Math.max,
    cos = Math.cos,
    sin = Math.sin,
    acos = Math.acos,
    sqrt = Math.sqrt;
  var pi = Math.PI;

  /**
   * Bezier curve constructor.
   *
   * ...docs pending...
   */
  var Bezier = /*#__PURE__*/function () {
    function Bezier(coords) {
      _classCallCheck(this, Bezier);
      var args = coords && coords.forEach ? coords : Array.from(arguments).slice();
      var coordlen = false;
      if (_typeof(args[0]) === "object") {
        coordlen = args.length;
        var newargs = [];
        args.forEach(function (point) {
          ["x", "y", "z"].forEach(function (d) {
            if (typeof point[d] !== "undefined") {
              newargs.push(point[d]);
            }
          });
        });
        args = newargs;
      }
      var higher = false;
      var len = args.length;
      if (coordlen) {
        if (coordlen > 4) {
          if (arguments.length !== 1) {
            throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");
          }
          higher = true;
        }
      } else {
        if (len !== 6 && len !== 8 && len !== 9 && len !== 12) {
          if (arguments.length !== 1) {
            throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");
          }
        }
      }
      var _3d = this._3d = !higher && (len === 9 || len === 12) || coords && coords[0] && typeof coords[0].z !== "undefined";
      var points = this.points = [];
      for (var idx = 0, step = _3d ? 3 : 2; idx < len; idx += step) {
        var point = {
          x: args[idx],
          y: args[idx + 1]
        };
        if (_3d) {
          point.z = args[idx + 2];
        }
        points.push(point);
      }
      var order = this.order = points.length - 1;
      var dims = this.dims = ["x", "y"];
      if (_3d) dims.push("z");
      this.dimlen = dims.length;

      // is this curve, practically speaking, a straight line?
      var aligned = utils.align(points, {
        p1: points[0],
        p2: points[order]
      });
      var baselength = utils.dist(points[0], points[order]);
      this._linear = aligned.reduce(function (t, p) {
        return t + abs(p.y);
      }, 0) < baselength / 50;
      this._lut = [];
      this._t1 = 0;
      this._t2 = 1;
      this.update();
    }
    return _createClass(Bezier, [{
      key: "getUtils",
      value: function getUtils() {
        return Bezier.getUtils();
      }
    }, {
      key: "valueOf",
      value: function valueOf() {
        return this.toString();
      }
    }, {
      key: "toString",
      value: function toString() {
        return utils.pointsToString(this.points);
      }
    }, {
      key: "toSVG",
      value: function toSVG() {
        if (this._3d) return false;
        var p = this.points,
          x = p[0].x,
          y = p[0].y,
          s = ["M", x, y, this.order === 2 ? "Q" : "C"];
        for (var _i6 = 1, last = p.length; _i6 < last; _i6++) {
          s.push(p[_i6].x);
          s.push(p[_i6].y);
        }
        return s.join(" ");
      }
    }, {
      key: "setRatios",
      value: function setRatios(ratios) {
        if (ratios.length !== this.points.length) {
          throw new Error("incorrect number of ratio values");
        }
        this.ratios = ratios;
        this._lut = []; //  invalidate any precomputed LUT
      }
    }, {
      key: "verify",
      value: function verify() {
        var print = this.coordDigest();
        if (print !== this._print) {
          this._print = print;
          this.update();
        }
      }
    }, {
      key: "coordDigest",
      value: function coordDigest() {
        return this.points.map(function (c, pos) {
          return "" + pos + c.x + c.y + (c.z ? c.z : 0);
        }).join("");
      }
    }, {
      key: "update",
      value: function update() {
        // invalidate any precomputed LUT
        this._lut = [];
        this.dpoints = utils.derive(this.points, this._3d);
        this.computedirection();
      }
    }, {
      key: "computedirection",
      value: function computedirection() {
        var points = this.points;
        var angle = utils.angle(points[0], points[this.order], points[1]);
        this.clockwise = angle > 0;
      }
    }, {
      key: "length",
      value: function length() {
        return utils.length(this.derivative.bind(this));
      }
    }, {
      key: "getABC",
      value: function getABC(t, B) {
        B = B || this.get(t);
        var S = this.points[0];
        var E = this.points[this.order];
        return Bezier.getABC(this.order, S, B, E, t);
      }
    }, {
      key: "getLUT",
      value: function getLUT(steps) {
        this.verify();
        steps = steps || 100;
        if (this._lut.length === steps + 1) {
          return this._lut;
        }
        this._lut = [];
        // n steps means n+1 points
        steps++;
        this._lut = [];
        for (var _i7 = 0, p, _t5; _i7 < steps; _i7++) {
          _t5 = _i7 / (steps - 1);
          p = this.compute(_t5);
          p.t = _t5;
          this._lut.push(p);
        }
        return this._lut;
      }
    }, {
      key: "on",
      value: function on(point, error) {
        error = error || 5;
        var lut = this.getLUT(),
          hits = [];
        for (var _i8 = 0, c, _t6 = 0; _i8 < lut.length; _i8++) {
          c = lut[_i8];
          if (utils.dist(c, point) < error) {
            hits.push(c);
            _t6 += _i8 / lut.length;
          }
        }
        if (!hits.length) return false;
        return t /= hits.length;
      }
    }, {
      key: "project",
      value: function project(point) {
        // step 1: coarse check
        var LUT = this.getLUT(),
          l = LUT.length - 1,
          closest = utils.closest(LUT, point),
          mpos = closest.mpos,
          t1 = (mpos - 1) / l,
          t2 = (mpos + 1) / l,
          step = 0.1 / l;

        // step 2: fine check
        var mdist = closest.mdist,
          t = t1,
          ft = t,
          p;
        mdist += 1;
        for (var d; t < t2 + step; t += step) {
          p = this.compute(t);
          d = utils.dist(point, p);
          if (d < mdist) {
            mdist = d;
            ft = t;
          }
        }
        ft = ft < 0 ? 0 : ft > 1 ? 1 : ft;
        p = this.compute(ft);
        p.t = ft;
        p.d = mdist;
        return p;
      }
    }, {
      key: "get",
      value: function get(t) {
        return this.compute(t);
      }
    }, {
      key: "point",
      value: function point(idx) {
        return this.points[idx];
      }
    }, {
      key: "compute",
      value: function compute(t) {
        if (this.ratios) {
          return utils.computeWithRatios(t, this.points, this.ratios, this._3d);
        }
        return utils.compute(t, this.points, this._3d, this.ratios);
      }
    }, {
      key: "raise",
      value: function raise() {
        var p = this.points,
          np = [p[0]],
          k = p.length;
        for (var _i9 = 1, _pi, pim; _i9 < k; _i9++) {
          _pi = p[_i9];
          pim = p[_i9 - 1];
          np[_i9] = {
            x: (k - _i9) / k * _pi.x + _i9 / k * pim.x,
            y: (k - _i9) / k * _pi.y + _i9 / k * pim.y
          };
        }
        np[k] = p[k - 1];
        return new Bezier(np);
      }
    }, {
      key: "derivative",
      value: function derivative(t) {
        return utils.compute(t, this.dpoints[0], this._3d);
      }
    }, {
      key: "dderivative",
      value: function dderivative(t) {
        return utils.compute(t, this.dpoints[1], this._3d);
      }
    }, {
      key: "align",
      value: function align() {
        var p = this.points;
        return new Bezier(utils.align(p, {
          p1: p[0],
          p2: p[p.length - 1]
        }));
      }
    }, {
      key: "curvature",
      value: function curvature(t) {
        return utils.curvature(t, this.dpoints[0], this.dpoints[1], this._3d);
      }
    }, {
      key: "inflections",
      value: function inflections() {
        return utils.inflections(this.points);
      }
    }, {
      key: "normal",
      value: function normal(t) {
        return this._3d ? this.__normal3(t) : this.__normal2(t);
      }
    }, {
      key: "__normal2",
      value: function __normal2(t) {
        var d = this.derivative(t);
        var q = sqrt(d.x * d.x + d.y * d.y);
        return {
          t: t,
          x: -d.y / q,
          y: d.x / q
        };
      }
    }, {
      key: "__normal3",
      value: function __normal3(t) {
        // see http://stackoverflow.com/questions/25453159
        var r1 = this.derivative(t),
          r2 = this.derivative(t + 0.01),
          q1 = sqrt(r1.x * r1.x + r1.y * r1.y + r1.z * r1.z),
          q2 = sqrt(r2.x * r2.x + r2.y * r2.y + r2.z * r2.z);
        r1.x /= q1;
        r1.y /= q1;
        r1.z /= q1;
        r2.x /= q2;
        r2.y /= q2;
        r2.z /= q2;
        // cross product
        var c = {
          x: r2.y * r1.z - r2.z * r1.y,
          y: r2.z * r1.x - r2.x * r1.z,
          z: r2.x * r1.y - r2.y * r1.x
        };
        var m = sqrt(c.x * c.x + c.y * c.y + c.z * c.z);
        c.x /= m;
        c.y /= m;
        c.z /= m;
        // rotation matrix
        var R = [c.x * c.x, c.x * c.y - c.z, c.x * c.z + c.y, c.x * c.y + c.z, c.y * c.y, c.y * c.z - c.x, c.x * c.z - c.y, c.y * c.z + c.x, c.z * c.z];
        // normal vector:
        var n = {
          t: t,
          x: R[0] * r1.x + R[1] * r1.y + R[2] * r1.z,
          y: R[3] * r1.x + R[4] * r1.y + R[5] * r1.z,
          z: R[6] * r1.x + R[7] * r1.y + R[8] * r1.z
        };
        return n;
      }
    }, {
      key: "hull",
      value: function hull(t) {
        var p = this.points,
          _p = [],
          q = [],
          idx = 0;
        q[idx++] = p[0];
        q[idx++] = p[1];
        q[idx++] = p[2];
        if (this.order === 3) {
          q[idx++] = p[3];
        }
        // we lerp between all points at each iteration, until we have 1 point left.
        while (p.length > 1) {
          _p = [];
          for (var _i10 = 0, pt, l = p.length - 1; _i10 < l; _i10++) {
            pt = utils.lerp(t, p[_i10], p[_i10 + 1]);
            q[idx++] = pt;
            _p.push(pt);
          }
          p = _p;
        }
        return q;
      }
    }, {
      key: "split",
      value: function split(t1, t2) {
        // shortcuts
        if (t1 === 0 && !!t2) {
          return this.split(t2).left;
        }
        if (t2 === 1) {
          return this.split(t1).right;
        }

        // no shortcut: use "de Casteljau" iteration.
        var q = this.hull(t1);
        var result = {
          left: this.order === 2 ? new Bezier([q[0], q[3], q[5]]) : new Bezier([q[0], q[4], q[7], q[9]]),
          right: this.order === 2 ? new Bezier([q[5], q[4], q[2]]) : new Bezier([q[9], q[8], q[6], q[3]]),
          span: q
        };

        // make sure we bind _t1/_t2 information!
        result.left._t1 = utils.map(0, 0, 1, this._t1, this._t2);
        result.left._t2 = utils.map(t1, 0, 1, this._t1, this._t2);
        result.right._t1 = utils.map(t1, 0, 1, this._t1, this._t2);
        result.right._t2 = utils.map(1, 0, 1, this._t1, this._t2);

        // if we have no t2, we're done
        if (!t2) {
          return result;
        }

        // if we have a t2, split again:
        t2 = utils.map(t2, t1, 1, 0, 1);
        return result.right.split(t2).left;
      }
    }, {
      key: "extrema",
      value: function extrema() {
        var result = {};
        var roots = [];
        this.dims.forEach(function (dim) {
          var mfn = function mfn(v) {
            return v[dim];
          };
          var p = this.dpoints[0].map(mfn);
          result[dim] = utils.droots(p);
          if (this.order === 3) {
            p = this.dpoints[1].map(mfn);
            result[dim] = result[dim].concat(utils.droots(p));
          }
          result[dim] = result[dim].filter(function (t) {
            return t >= 0 && t <= 1;
          });
          roots = roots.concat(result[dim].sort(utils.numberSort));
        }.bind(this));
        result.values = roots.sort(utils.numberSort).filter(function (v, idx) {
          return roots.indexOf(v) === idx;
        });
        return result;
      }
    }, {
      key: "bbox",
      value: function bbox() {
        var extrema = this.extrema(),
          result = {};
        this.dims.forEach(function (d) {
          result[d] = utils.getminmax(this, d, extrema[d]);
        }.bind(this));
        return result;
      }
    }, {
      key: "overlaps",
      value: function overlaps(curve) {
        var lbbox = this.bbox(),
          tbbox = curve.bbox();
        return utils.bboxoverlap(lbbox, tbbox);
      }
    }, {
      key: "offset",
      value: function offset(t, d) {
        if (typeof d !== "undefined") {
          var c = this.get(t),
            n = this.normal(t);
          var ret = {
            c: c,
            n: n,
            x: c.x + n.x * d,
            y: c.y + n.y * d
          };
          if (this._3d) {
            ret.z = c.z + n.z * d;
          }
          return ret;
        }
        if (this._linear) {
          var nv = this.normal(0),
            coords = this.points.map(function (p) {
              var ret = {
                x: p.x + t * nv.x,
                y: p.y + t * nv.y
              };
              if (p.z && nv.z) {
                ret.z = p.z + t * nv.z;
              }
              return ret;
            });
          return [new Bezier(coords)];
        }
        return this.reduce().map(function (s) {
          if (s._linear) {
            return s.offset(t)[0];
          }
          return s.scale(t);
        });
      }
    }, {
      key: "simple",
      value: function simple() {
        if (this.order === 3) {
          var a1 = utils.angle(this.points[0], this.points[3], this.points[1]);
          var a2 = utils.angle(this.points[0], this.points[3], this.points[2]);
          if (a1 > 0 && a2 < 0 || a1 < 0 && a2 > 0) return false;
        }
        var n1 = this.normal(0);
        var n2 = this.normal(1);
        var s = n1.x * n2.x + n1.y * n2.y;
        if (this._3d) {
          s += n1.z * n2.z;
        }
        return abs(acos(s)) < pi / 3;
      }
    }, {
      key: "reduce",
      value: function reduce() {
        // TODO: examine these var types in more detail...
        var i,
          t1 = 0,
          t2 = 0,
          step = 0.01,
          segment,
          pass1 = [],
          pass2 = [];
        // first pass: split on extrema
        var extrema = this.extrema().values;
        if (extrema.indexOf(0) === -1) {
          extrema = [0].concat(extrema);
        }
        if (extrema.indexOf(1) === -1) {
          extrema.push(1);
        }
        for (t1 = extrema[0], i = 1; i < extrema.length; i++) {
          t2 = extrema[i];
          segment = this.split(t1, t2);
          segment._t1 = t1;
          segment._t2 = t2;
          pass1.push(segment);
          t1 = t2;
        }

        // second pass: further reduce these segments to simple segments
        pass1.forEach(function (p1) {
          t1 = 0;
          t2 = 0;
          while (t2 <= 1) {
            for (t2 = t1 + step; t2 <= 1 + step; t2 += step) {
              segment = p1.split(t1, t2);
              if (!segment.simple()) {
                t2 -= step;
                if (abs(t1 - t2) < step) {
                  // we can never form a reduction
                  return [];
                }
                segment = p1.split(t1, t2);
                segment._t1 = utils.map(t1, 0, 1, p1._t1, p1._t2);
                segment._t2 = utils.map(t2, 0, 1, p1._t1, p1._t2);
                pass2.push(segment);
                t1 = t2;
                break;
              }
            }
          }
          if (t1 < 1) {
            segment = p1.split(t1, 1);
            segment._t1 = utils.map(t1, 0, 1, p1._t1, p1._t2);
            segment._t2 = p1._t2;
            pass2.push(segment);
          }
        });
        return pass2;
      }
    }, {
      key: "translate",
      value: function translate(v, d1, d2) {
        d2 = typeof d2 === "number" ? d2 : d1;

        // TODO: make this take curves with control points outside
        //       of the start-end interval into account

        var o = this.order;
        var d = this.points.map(function (_, i) {
          return (1 - i / o) * d1 + i / o * d2;
        });
        return new Bezier(this.points.map(function (p, i) {
          return {
            x: p.x + v.x * d[i],
            y: p.y + v.y * d[i]
          };
        }));
      }
    }, {
      key: "scale",
      value: function scale(d) {
        var _this12 = this;
        var order = this.order;
        var distanceFn = false;
        if (typeof d === "function") {
          distanceFn = d;
        }
        if (distanceFn && order === 2) {
          return this.raise().scale(distanceFn);
        }

        // TODO: add special handling for non-linear degenerate curves.

        var clockwise = this.clockwise;
        var points = this.points;
        if (this._linear) {
          return this.translate(this.normal(0), distanceFn ? distanceFn(0) : d, distanceFn ? distanceFn(1) : d);
        }
        var r1 = distanceFn ? distanceFn(0) : d;
        var r2 = distanceFn ? distanceFn(1) : d;
        var v = [this.offset(0, 10), this.offset(1, 10)];
        var np = [];
        var o = utils.lli4(v[0], v[0].c, v[1], v[1].c);
        if (!o) {
          throw new Error("cannot scale this curve. Try reducing it first.");
        }

        // move all points by distance 'd' wrt the origin 'o',
        // and move end points by fixed distance along normal.
        [0, 1].forEach(function (t) {
          var p = np[t * order] = utils.copy(points[t * order]);
          p.x += (t ? r2 : r1) * v[t].n.x;
          p.y += (t ? r2 : r1) * v[t].n.y;
        });
        if (!distanceFn) {
          // move control points to lie on the intersection of the offset
          // derivative vector, and the origin-through-control vector
          [0, 1].forEach(function (t) {
            if (order === 2 && !!t) return;
            var p = np[t * order];
            var d = _this12.derivative(t);
            var p2 = {
              x: p.x + d.x,
              y: p.y + d.y
            };
            np[t + 1] = utils.lli4(p, p2, o, points[t + 1]);
          });
          return new Bezier(np);
        }

        // move control points by "however much necessary to
        // ensure the correct tangent to endpoint".
        [0, 1].forEach(function (t) {
          if (order === 2 && !!t) return;
          var p = points[t + 1];
          var ov = {
            x: p.x - o.x,
            y: p.y - o.y
          };
          var rc = distanceFn ? distanceFn((t + 1) / order) : d;
          if (distanceFn && !clockwise) rc = -rc;
          var m = sqrt(ov.x * ov.x + ov.y * ov.y);
          ov.x /= m;
          ov.y /= m;
          np[t + 1] = {
            x: p.x + rc * ov.x,
            y: p.y + rc * ov.y
          };
        });
        return new Bezier(np);
      }
    }, {
      key: "outline",
      value: function outline(d1, d2, d3, d4) {
        d2 = d2 === undefined ? d1 : d2;
        if (this._linear) {
          // TODO: find the actual extrema, because they might
          //       be before the start, or past the end.

          var n = this.normal(0);
          var start = this.points[0];
          var end = this.points[this.points.length - 1];
          var s, mid, e;
          if (d3 === undefined) {
            d3 = d1;
            d4 = d2;
          }
          s = {
            x: start.x + n.x * d1,
            y: start.y + n.y * d1
          };
          e = {
            x: end.x + n.x * d3,
            y: end.y + n.y * d3
          };
          mid = {
            x: (s.x + e.x) / 2,
            y: (s.y + e.y) / 2
          };
          var fline = [s, mid, e];
          s = {
            x: start.x - n.x * d2,
            y: start.y - n.y * d2
          };
          e = {
            x: end.x - n.x * d4,
            y: end.y - n.y * d4
          };
          mid = {
            x: (s.x + e.x) / 2,
            y: (s.y + e.y) / 2
          };
          var bline = [e, mid, s];
          var _ls = utils.makeline(bline[2], fline[0]);
          var _le = utils.makeline(fline[2], bline[0]);
          var _segments2 = [_ls, new Bezier(fline), _le, new Bezier(bline)];
          return new PolyBezier(_segments2);
        }
        var reduced = this.reduce(),
          len = reduced.length,
          fcurves = [];
        var bcurves = [],
          p,
          alen = 0,
          tlen = this.length();
        var graduated = typeof d3 !== "undefined" && typeof d4 !== "undefined";
        function linearDistanceFunction(s, e, tlen, alen, slen) {
          return function (v) {
            var f1 = alen / tlen,
              f2 = (alen + slen) / tlen,
              d = e - s;
            return utils.map(v, 0, 1, s + f1 * d, s + f2 * d);
          };
        }

        // form curve oulines
        reduced.forEach(function (segment) {
          var slen = segment.length();
          if (graduated) {
            fcurves.push(segment.scale(linearDistanceFunction(d1, d3, tlen, alen, slen)));
            bcurves.push(segment.scale(linearDistanceFunction(-d2, -d4, tlen, alen, slen)));
          } else {
            fcurves.push(segment.scale(d1));
            bcurves.push(segment.scale(-d2));
          }
          alen += slen;
        });

        // reverse the "return" outline
        bcurves = bcurves.map(function (s) {
          p = s.points;
          if (p[3]) {
            s.points = [p[3], p[2], p[1], p[0]];
          } else {
            s.points = [p[2], p[1], p[0]];
          }
          return s;
        }).reverse();

        // form the endcaps as lines
        var fs = fcurves[0].points[0],
          fe = fcurves[len - 1].points[fcurves[len - 1].points.length - 1],
          bs = bcurves[len - 1].points[bcurves[len - 1].points.length - 1],
          be = bcurves[0].points[0],
          ls = utils.makeline(bs, fs),
          le = utils.makeline(fe, be),
          segments = [ls].concat(fcurves).concat([le]).concat(bcurves);
        return new PolyBezier(segments);
      }
    }, {
      key: "outlineshapes",
      value: function outlineshapes(d1, d2, curveIntersectionThreshold) {
        d2 = d2 || d1;
        var outline = this.outline(d1, d2).curves;
        var shapes = [];
        for (var _i11 = 1, len = outline.length; _i11 < len / 2; _i11++) {
          var shape = utils.makeshape(outline[_i11], outline[len - _i11], curveIntersectionThreshold);
          shape.startcap.virtual = _i11 > 1;
          shape.endcap.virtual = _i11 < len / 2 - 1;
          shapes.push(shape);
        }
        return shapes;
      }
    }, {
      key: "intersects",
      value: function intersects(curve, curveIntersectionThreshold) {
        if (!curve) return this.selfintersects(curveIntersectionThreshold);
        if (curve.p1 && curve.p2) {
          return this.lineIntersects(curve);
        }
        if (curve instanceof Bezier) {
          curve = curve.reduce();
        }
        return this.curveintersects(this.reduce(), curve, curveIntersectionThreshold);
      }
    }, {
      key: "lineIntersects",
      value: function lineIntersects(line) {
        var _this13 = this;
        var mx = min(line.p1.x, line.p2.x),
          my = min(line.p1.y, line.p2.y),
          MX = max(line.p1.x, line.p2.x),
          MY = max(line.p1.y, line.p2.y);
        return utils.roots(this.points, line).filter(function (t) {
          var p = _this13.get(t);
          return utils.between(p.x, mx, MX) && utils.between(p.y, my, MY);
        });
      }
    }, {
      key: "selfintersects",
      value: function selfintersects(curveIntersectionThreshold) {
        // "simple" curves cannot intersect with their direct
        // neighbour, so for each segment X we check whether
        // it intersects [0:x-2][x+2:last].

        var reduced = this.reduce(),
          len = reduced.length - 2,
          results = [];
        for (var _i12 = 0, result, left, right; _i12 < len; _i12++) {
          left = reduced.slice(_i12, _i12 + 1);
          right = reduced.slice(_i12 + 2);
          result = this.curveintersects(left, right, curveIntersectionThreshold);
          results.push.apply(results, _toConsumableArray(result));
        }
        return results;
      }
    }, {
      key: "curveintersects",
      value: function curveintersects(c1, c2, curveIntersectionThreshold) {
        var pairs = [];
        // step 1: pair off any overlapping segments
        c1.forEach(function (l) {
          c2.forEach(function (r) {
            if (l.overlaps(r)) {
              pairs.push({
                left: l,
                right: r
              });
            }
          });
        });
        // step 2: for each pairing, run through the convergence algorithm.
        var intersections = [];
        pairs.forEach(function (pair) {
          var result = utils.pairiteration(pair.left, pair.right, curveIntersectionThreshold);
          if (result.length > 0) {
            intersections = intersections.concat(result);
          }
        });
        return intersections;
      }
    }, {
      key: "arcs",
      value: function arcs(errorThreshold) {
        errorThreshold = errorThreshold || 0.5;
        return this._iterate(errorThreshold, []);
      }
    }, {
      key: "_error",
      value: function _error(pc, np1, s, e) {
        var q = (e - s) / 4,
          c1 = this.get(s + q),
          c2 = this.get(e - q),
          ref = utils.dist(pc, np1),
          d1 = utils.dist(pc, c1),
          d2 = utils.dist(pc, c2);
        return abs(d1 - ref) + abs(d2 - ref);
      }
    }, {
      key: "_iterate",
      value: function _iterate(errorThreshold, circles) {
        var t_s = 0,
          t_e = 1,
          safety;
        // we do a binary search to find the "good `t` closest to no-longer-good"
        do {
          safety = 0;

          // step 1: start with the maximum possible arc
          t_e = 1;

          // points:
          var np1 = this.get(t_s),
            np2 = void 0,
            np3 = void 0,
            arc = void 0,
            prev_arc = void 0;

          // booleans:
          var curr_good = false,
            prev_good = false,
            done = void 0;

          // numbers:
          var t_m = t_e,
            prev_e = 1;

          // step 2: find the best possible arc
          do {
            prev_good = curr_good;
            prev_arc = arc;
            t_m = (t_s + t_e) / 2;
            np2 = this.get(t_m);
            np3 = this.get(t_e);
            arc = utils.getccenter(np1, np2, np3);

            //also save the t values
            arc.interval = {
              start: t_s,
              end: t_e
            };
            var error = this._error(arc, np1, t_s, t_e);
            curr_good = error <= errorThreshold;
            done = prev_good && !curr_good;
            if (!done) prev_e = t_e;

            // this arc is fine: we can move 'e' up to see if we can find a wider arc
            if (curr_good) {
              // if e is already at max, then we're done for this arc.
              if (t_e >= 1) {
                // make sure we cap at t=1
                arc.interval.end = prev_e = 1;
                prev_arc = arc;
                // if we capped the arc segment to t=1 we also need to make sure that
                // the arc's end angle is correct with respect to the bezier end point.
                if (t_e > 1) {
                  var d = {
                    x: arc.x + arc.r * cos(arc.e),
                    y: arc.y + arc.r * sin(arc.e)
                  };
                  arc.e += utils.angle({
                    x: arc.x,
                    y: arc.y
                  }, d, this.get(1));
                }
                break;
              }
              // if not, move it up by half the iteration distance
              t_e = t_e + (t_e - t_s) / 2;
            } else {
              // this is a bad arc: we need to move 'e' down to find a good arc
              t_e = t_m;
            }
          } while (!done && safety++ < 100);
          if (safety >= 100) {
            break;
          }

          // console.log("L835: [F] arc found", t_s, prev_e, prev_arc.x, prev_arc.y, prev_arc.s, prev_arc.e);

          prev_arc = prev_arc ? prev_arc : arc;
          circles.push(prev_arc);
          t_s = prev_e;
        } while (t_e < 1);
        return circles;
      }
    }], [{
      key: "quadraticFromPoints",
      value: function quadraticFromPoints(p1, p2, p3, t) {
        if (typeof t === "undefined") {
          t = 0.5;
        }
        // shortcuts, although they're really dumb
        if (t === 0) {
          return new Bezier(p2, p2, p3);
        }
        if (t === 1) {
          return new Bezier(p1, p2, p2);
        }
        // real fitting.
        var abc = Bezier.getABC(2, p1, p2, p3, t);
        return new Bezier(p1, abc.A, p3);
      }
    }, {
      key: "cubicFromPoints",
      value: function cubicFromPoints(S, B, E, t, d1) {
        if (typeof t === "undefined") {
          t = 0.5;
        }
        var abc = Bezier.getABC(3, S, B, E, t);
        if (typeof d1 === "undefined") {
          d1 = utils.dist(B, abc.C);
        }
        var d2 = d1 * (1 - t) / t;
        var selen = utils.dist(S, E),
          lx = (E.x - S.x) / selen,
          ly = (E.y - S.y) / selen,
          bx1 = d1 * lx,
          by1 = d1 * ly,
          bx2 = d2 * lx,
          by2 = d2 * ly;
        // derivation of new hull coordinates
        var e1 = {
            x: B.x - bx1,
            y: B.y - by1
          },
          e2 = {
            x: B.x + bx2,
            y: B.y + by2
          },
          A = abc.A,
          v1 = {
            x: A.x + (e1.x - A.x) / (1 - t),
            y: A.y + (e1.y - A.y) / (1 - t)
          },
          v2 = {
            x: A.x + (e2.x - A.x) / t,
            y: A.y + (e2.y - A.y) / t
          },
          nc1 = {
            x: S.x + (v1.x - S.x) / t,
            y: S.y + (v1.y - S.y) / t
          },
          nc2 = {
            x: E.x + (v2.x - E.x) / (1 - t),
            y: E.y + (v2.y - E.y) / (1 - t)
          };
        // ...done
        return new Bezier(S, nc1, nc2, E);
      }
    }, {
      key: "getUtils",
      value: function getUtils() {
        return utils;
      }
    }, {
      key: "PolyBezier",
      get: function get() {
        return PolyBezier;
      }
    }, {
      key: "getABC",
      value: function getABC() {
        var order = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
        var S = arguments.length > 1 ? arguments[1] : undefined;
        var B = arguments.length > 2 ? arguments[2] : undefined;
        var E = arguments.length > 3 ? arguments[3] : undefined;
        var t = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.5;
        var u = utils.projectionratio(t, order),
          um = 1 - u,
          C = {
            x: u * S.x + um * E.x,
            y: u * S.y + um * E.y
          },
          s = utils.abcratio(t, order),
          A = {
            x: B.x + (B.x - C.x) / s,
            y: B.y + (B.y - C.y) / s
          };
        return {
          A: A,
          B: B,
          C: C,
          S: S,
          E: E
        };
      }
    }]);
  }();
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
        } else if (!isObject(objValue) || isFunction(objValue)) {
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
      if (isObject(srcValue)) {
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
    if (isObject(objValue) && isObject(srcValue)) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, objValue);
      baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
      stack['delete'](srcValue);
    }
    return objValue;
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
  var DEFAULT_OPTIONS = {
    splitDotKey: 'splitDot',
    disabledSplit: false,
    disabledSplitDot: false,
    disabledDbclickConvert: false
  };
  /**
   * 编辑器曲线化操作模块：1.双击实现指令升降级 2.实现路径选点拆分
   *
   * @note 注意：拆分点的样式需要在UI模块中配置，没配置默认使用UI模块中路径节点的样式
   *
   * @example
   *
   * vizpath
   * .use(new Editor(fabricCanvas))
   * .use(new EditorBezier())
   * .use(new EditorUI<EditorBezierThemeConfigurators>({
   *
   * }))
   */
  var EditorBezier = /*#__PURE__*/function (_EditorModule2) {
    function EditorBezier() {
      var _this14;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, EditorBezier);
      _this14 = _callSuper(this, EditorBezier);
      _this14.splitDot = null;
      _this14.options = defaultsDeep(options, DEFAULT_OPTIONS);
      return _this14;
    }
    /**
     * 根据路径指令上的一点拆分路径指令
     */
    _inherits(EditorBezier, _EditorModule2);
    return _createClass(EditorBezier, [{
      key: "_splitInstruction",
      value: function _splitInstruction(points, point) {
        if (points.length === 2) {
          return {
            pre: [InstructionType.LINE, point.x, point.y],
            next: [InstructionType.LINE, points[1].x, points[1].y]
          };
        } else {
          var curve = new Bezier(points);
          var _curve$project = curve.project(point),
            _t7 = _curve$project.t;
          var splitCurves = curve.split(_t7);
          var path = new fabric.fabric.Path(splitCurves.left.toSVG() + splitCurves.right.toSVG()).path;
          return {
            pre: path[1],
            next: path[3]
          };
        }
      }
      /**
       * 通过线与点实现曲线化
       */
    }, {
      key: "curveFromLine",
      value: function curveFromLine(line, point) {
        var t = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.71;
        var _line = _slicedToArray(line, 2),
          start = _line[0],
          end = _line[1];
        var curvePoint = {
          x: end.x + (point.x - start.x) / 2,
          y: end.y + (point.y - start.y) / 2
        };
        var curve = Bezier.quadraticFromPoints.apply(Bezier, _toConsumableArray([end, curvePoint, point].flat(1)).concat([t]));
        return curve.points[1];
      }
      /**
       * 通过点与点实现曲线化
       */
    }, {
      key: "curveFromPoint",
      value: function curveFromPoint(point0, point) {
        var centerPoint = {
          x: (point.x + point0.x) / 2,
          y: (point.y + point0.y) / 2
        };
        var dx = point.x - centerPoint.x;
        var dy = point.y - centerPoint.y;
        var midPoint = {
          x: centerPoint.x - dy,
          y: centerPoint.y + dx
        };
        return midPoint;
      }
      /**
       * 自动降级到直线
       */
    }, {
      key: "degrade",
      value: function degrade(object) {
        var _a;
        var editor = (_a = this.vizpath) === null || _a === void 0 ? void 0 : _a.context.find(Editor$1);
        if (!editor) return;
        editor.degrade(object, 'both', true);
      }
      /**
       * 自动升级到曲线
       */
    }, {
      key: "upgrade",
      value: function upgrade(object) {
        var _a, _b, _c;
        var vizpath = this.vizpath;
        if (!vizpath) return;
        var editor = (_a = this.vizpath) === null || _a === void 0 ? void 0 : _a.context.find(Editor$1);
        if (!editor) return;
        var pathNode = editor.objectNodeMap.get(object);
        var _vizpath$getNeighbori = vizpath.getNeighboringNodes(pathNode),
          pre = _vizpath$getNeighbori.pre,
          next = _vizpath$getNeighbori.next;
        if (pre && next) {
          var centerPoint = {
            x: (pre.node.x + next.node.x) / 2,
            y: (pre.node.y + next.node.y) / 2
          };
          var preCurvePoint = {
            x: pathNode.node.x + (pre.node.x - centerPoint.x),
            y: pathNode.node.y + (pre.node.y - centerPoint.y)
          };
          var nextCurvePoint = {
            x: pathNode.node.x + (next.node.x - centerPoint.x),
            y: pathNode.node.y + (next.node.y - centerPoint.y)
          };
          vizpath.replace(pathNode, [InstructionType.QUADRATIC_CURCE, preCurvePoint.x, preCurvePoint.y, pathNode.node.x, pathNode.node.y]);
          vizpath.replace(next, [InstructionType.QUADRATIC_CURCE, nextCurvePoint.x, nextCurvePoint.y, next.node.x, next.node.y]);
          // const points = [pre, pathNode, next].map((item) => item.node!);
          // // 这里使用quadraticFromPoints，是使三个点组合成曲线路径（点都在曲线上）
          // const splitCurves = this._splitInstruction(
          //   (Bezier.quadraticFromPoints as any)(...points, 0.5).points,
          //   points[1],
          // );
          // const neighboringInstructions = vizpath.getNeighboringInstructions(pathNode);
          // vizpath.replace(
          //   pathNode.instruction[0] === InstructionType.START
          //     ? neighboringInstructions.pre!
          //     : pathNode,
          //   splitCurves.pre,
          // );
          // vizpath.replace(neighboringInstructions.next!, splitCurves.next);
        } else if (pre) {
          var _vizpath$getNeighbori2 = vizpath.getNeighboringNodes(pre),
            ppre = _vizpath$getNeighbori2.pre;
          if (ppre) {
            var point = this.curveFromLine(((_b = pre.curveDots) === null || _b === void 0 ? void 0 : _b.pre) ? [pre.curveDots.pre, pre.node] : [ppre.node, pre.node], pathNode.node);
            vizpath.replace(pathNode, [InstructionType.QUADRATIC_CURCE, point.x, point.y, pathNode.node.x, pathNode.node.y]);
          } else {
            var midPoint = this.curveFromPoint(pre.node, pathNode.node);
            vizpath.replace(pathNode, [InstructionType.QUADRATIC_CURCE, midPoint.x, midPoint.y, pathNode.node.x, pathNode.node.y]);
          }
        } else if (next) {
          var _vizpath$getNeighbori3 = vizpath.getNeighboringNodes(next),
            nnext = _vizpath$getNeighbori3.next;
          if (nnext) {
            var _point = this.curveFromLine(((_c = next.curveDots) === null || _c === void 0 ? void 0 : _c.next) ? [next.curveDots.next, next.node] : [nnext.node, next.node], pathNode.node);
            vizpath.replace(next, [InstructionType.QUADRATIC_CURCE, _point.x, _point.y, next.node.x, next.node.y]);
          } else {
            var _midPoint = this.curveFromPoint(next.node, pathNode.node);
            vizpath.replace(next, [InstructionType.QUADRATIC_CURCE, _midPoint.x, _midPoint.y, next.node.x, next.node.y]);
          }
        }
      }
      // 创建拆分点
    }, {
      key: "_initSpiltDot",
      value: function _initSpiltDot(vizpath) {
        var _a, _b, _c, _d;
        var ui = vizpath.context.find(EditorUI);
        var splitDotTheme = (_d = (_b = (_a = ui === null || ui === void 0 ? void 0 : ui.theme) === null || _a === void 0 ? void 0 : _a[this.options.splitDotKey]) !== null && _b !== void 0 ? _b : (_c = ui === null || ui === void 0 ? void 0 : ui.theme) === null || _c === void 0 ? void 0 : _c.node) !== null && _d !== void 0 ? _d : DEFAULT_THEME.node;
        var decorated = false;
        var decorator = function decorator(customObject, callback) {
          customObject.set({
            name: v4(),
            // 选中时不出现选中框
            hasBorders: false,
            hasControls: false,
            // 不给选中
            evented: false,
            selectable: false,
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
          if (ui && callback) {
            ui.objectPreRenderCallbackMap.set(customObject, callback);
          }
          decorated = true;
          return customObject;
        };
        var object = splitDotTheme(decorator);
        if (!decorated) object = decorator(object);
        return object;
      }
      // 清除拆分点
    }, {
      key: "_destorySplitDot",
      value: function _destorySplitDot(vizpath) {
        var _a;
        if (!this.splitDot) return;
        var ui = vizpath.context.find(EditorUI);
        ui === null || ui === void 0 ? void 0 : ui.objectPreRenderCallbackMap["delete"](this.splitDot);
        (_a = this.splitDot.canvas) === null || _a === void 0 ? void 0 : _a.remove(this.splitDot);
        this.splitDot = null;
      }
      // 注册双击节点变换事件
    }, {
      key: "_initDbclickChangeEvent",
      value: function _initDbclickChangeEvent(vizpath) {
        var _this15 = this;
        var _a;
        var editor = vizpath.context.find(Editor$1);
        if (!editor) return;
        (_a = editor.canvas) === null || _a === void 0 ? void 0 : _a.on('mouse:dblclick', function (event) {
          var target = event.target;
          if (!target || !editor.nodes.includes(target)) return;
          var curveDots = editor.curveDots.filter(function (i) {
            return i.node === target;
          });
          if (curveDots.length) _this15.degrade(target);else _this15.upgrade(target);
        });
      }
      // 注册指令拆分事件
    }, {
      key: "_initSplitEvent",
      value: function _initSplitEvent(vizpath) {
        var _this16 = this;
        var editor = vizpath.context.find(Editor$1);
        if (!editor) return;
        var canvas = editor.canvas;
        if (!canvas) return;
        var pathNode;
        var splitCrood;
        var disableAddToken;
        var clean = function clean() {
          if (pathNode) {
            if (_this16.splitDot) canvas.remove(_this16.splitDot);
            pathNode = undefined;
            splitCrood = undefined;
          }
          if (disableAddToken) {
            editor.requestEnableFunction(disableAddToken);
            disableAddToken = undefined;
          }
        };
        editor.addCanvasEvent('mouse:move', function (e) {
          var _a;
          clean();
          if (editor.setting.mode !== Mode.ADD) return;
          if (e.target && e.target[Editor$1.symbol]) return;
          if (e.target && e.target.type === 'activeSelection') return;
          var pointer = calcCanvasCrood(canvas, e.pointer);
          // 只有进入路径范围内才开始判定是否触线拆分
          var touchPath = editor.paths.find(function (i) {
            return i.pathObject.containsPoint(e.pointer);
          });
          if (!touchPath) return;
          var segment = touchPath.segment,
            pathObject = touchPath.pathObject;
          var _editor$calcRelativeC = editor.calcRelativeCrood({
              left: pointer.x,
              top: pointer.y
            }, pathObject),
            x = _editor$calcRelativeC.x,
            y = _editor$calcRelativeC.y;
          var d = Math.max(((_a = pathObject.strokeWidth) !== null && _a !== void 0 ? _a : 0) / 2 || 1, 1);
          var _iterator3 = _createForOfIteratorHelper(segment),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var item = _step3.value;
              var points = [];
              if ([InstructionType.START, InstructionType.CLOSE].includes(item.instruction[0])) continue;
              if (item.instruction[0] === InstructionType.LINE) {
                var _vizpath$getNeighbori4 = vizpath.getNeighboringNodes(item, true),
                  pre = _vizpath$getNeighbori4.pre;
                points = [pre.node, {
                  x: item.instruction[1],
                  y: item.instruction[2]
                }, {
                  x: item.instruction[1],
                  y: item.instruction[2]
                }];
              } else if (item.instruction[0] === InstructionType.QUADRATIC_CURCE) {
                var _vizpath$getNeighbori5 = vizpath.getNeighboringNodes(item, true),
                  _pre = _vizpath$getNeighbori5.pre;
                points = [_pre.node, {
                  x: item.instruction[1],
                  y: item.instruction[2]
                }, {
                  x: item.instruction[3],
                  y: item.instruction[4]
                }];
              } else if (item.instruction[0] === InstructionType.BEZIER_CURVE) {
                var _vizpath$getNeighbori6 = vizpath.getNeighboringNodes(item, true),
                  _pre2 = _vizpath$getNeighbori6.pre;
                points = [_pre2.node, {
                  x: item.instruction[1],
                  y: item.instruction[2]
                }, {
                  x: item.instruction[3],
                  y: item.instruction[4]
                }, {
                  x: item.instruction[5],
                  y: item.instruction[6]
                }];
              }
              var bezier = new Bezier(points);
              var p = bezier.project({
                x: x,
                y: y
              });
              if (p.d && p.d < d) {
                d = p.d;
                pathNode = item;
                splitCrood = p;
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          if (pathNode && splitCrood) {
            var _splitCrood = splitCrood,
              _x6 = _splitCrood.x,
              _y3 = _splitCrood.y;
            var _editor$calcAbsoluteP = editor.calcAbsolutePosition({
                x: _x6,
                y: _y3
              }, pathObject),
              left = _editor$calcAbsoluteP.left,
              top = _editor$calcAbsoluteP.top;
            if (!_this16.splitDot && !_this16.options.disabledSplitDot) {
              _this16.splitDot = _this16._initSpiltDot(vizpath);
            }
            var splitDot = _this16.splitDot;
            if (splitDot) {
              splitDot.set({
                left: left,
                top: top
              });
              canvas.add(splitDot);
              canvas.requestRenderAll();
            }
            disableAddToken = editor.requestDisableFunction('add');
          }
        });
        editor.addCanvasEvent('mouse:down:before', function (e) {
          if (!pathNode || !splitCrood) return;
          var _vizpath$getNeighbori7 = vizpath.getNeighboringInstructions(pathNode, true),
            pre = _vizpath$getNeighbori7.pre;
          if (!pre || !pre.node) return;
          var splitCurves = _this16._splitInstruction([pre.node].concat(_toConsumableArray(pathNode.instruction.slice(1).reduce(function (list, _, i, arr) {
            if (i % 2 === 0) {
              list.push({
                x: arr[i],
                y: arr[i + 1]
              });
            }
            return list;
          }, []))), splitCrood);
          var node = vizpath.replace(pathNode, splitCurves.pre);
          if (node) {
            var object = editor.nodeObjectMap.get(node);
            if (object) editor.focus(object);
            vizpath.insertAfterNode(node, splitCurves.next);
            var insertObject = editor.nodeObjectMap.get(node);
            editor.currentConvertNodeObject = insertObject !== null && insertObject !== void 0 ? insertObject : null;
          }
          clean();
        });
      }
    }, {
      key: "unload",
      value: function unload(vizpath) {
        this._destorySplitDot(vizpath);
      }
    }, {
      key: "load",
      value: function load(vizpath) {
        var _this$options = this.options,
          disabledSplit = _this$options.disabledSplit,
          disabledSplitDot = _this$options.disabledSplitDot;
        if (!disabledSplit) this._initSplitEvent(vizpath);
        if (!disabledSplitDot) this._initDbclickChangeEvent(vizpath);
      }
    }]);
  }(EditorModule);
  EditorBezier.ID = 'editor-bezier';
  var EditorSymbolType;
  (function (EditorSymbolType) {
    EditorSymbolType["PATH"] = "path";
    EditorSymbolType["NODE"] = "node";
    EditorSymbolType["CURVE_DOT"] = "curve-dot";
    EditorSymbolType["LINE"] = "line";
    EditorSymbolType["OTHER"] = "other";
  })(EditorSymbolType || (EditorSymbolType = {}));
  var Mode;
  (function (Mode) {
    Mode["MOVE"] = "move";
    Mode["ADD"] = "add";
    Mode["DELETE"] = "delete";
    Mode["CONVERT"] = "convert";
  })(Mode || (Mode = {}));
  var Editor = /*#__PURE__*/function (_EditorModule3) {
    /**
     * 构造函数
     * @param options 更多配置
     */
    function Editor(mountCanvas) {
      var _this17;
      var isolation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      _classCallCheck(this, Editor);
      _this17 = _callSuper(this, Editor);
      /* ---------------------------- 画布相关配置 ---------------------------- */
      /** 挂载的画布 */
      _this17.mountCanvas = null;
      /** 交互所在fabric画布 */
      _this17.canvas = null;
      /** 当前编辑器是否使用隔离画布（模拟克隆的新画布对象） */
      _this17.isolation = false;
      /** 监听事件 */
      _this17.listeners = [];
      /** 功能禁用请求凭证 */
      _this17.disabledFunctionTokens = {};
      /* ---------------------------- 路径相关配置 ---------------------------- */
      /** 路径汇总 */
      _this17.paths = [];
      /** 节点路径映射 */
      _this17.nodePathMap = new Map([]);
      /* ---------------------------- 节点相关配置 ---------------------------- */
      /**
       * 内置配置，配置的更改会影响编辑器的交互效果
       */
      _this17.setting = {
        mode: Mode.MOVE,
        forcePointSymmetric: 'angle'
      };
      /** 路径节点对象 */
      _this17.nodes = [];
      /** 路径曲线变换点列表 */
      _this17.curveDots = [];
      /** 元素画布对象 与 路径节点对象 映射 */
      _this17.objectNodeMap = new Map([]);
      /** 路径节点对象 与 元素画布对象 映射 */
      _this17.nodeObjectMap = new Map([]);
      /** 当前活跃的路径节点画布对象列表 */
      _this17.activeNodes = [];
      /** 当前活跃的曲线变换点画布对象 */
      _this17.activePoint = null;
      /** 当前转换的路径节点 */
      _this17.currentConvertNodeObject = null;
      /**  临时停用选择监听处理 */
      _this17._deactivateSelectListeners = false;
      /** 废弃的画布对象池，可用于复用减少创建消耗 */
      _this17._abandonedPool = {
        nodes: [],
        points: [],
        lines: []
      };
      _this17.mountCanvas = mountCanvas;
      _this17.isolation = isolation;
      return _this17;
    }
    /**
     * 将画布坐标转化为特定路径的相对指令坐标位置
     */
    _inherits(Editor, _EditorModule3);
    return _createClass(Editor, [{
      key: "calcAbsolutePosition",
      value: function calcAbsolutePosition(crood, object) {
        var matrix = _toConsumableArray(object.calcOwnMatrix());
        // 路径如果带有偏移则需要移除偏移带来的影响
        if (object.type === 'path') {
          var offset = fabric.fabric.util.transformPoint(object.pathOffset, [].concat(_toConsumableArray(matrix.slice(0, 4)), [0, 0]));
          matrix[4] -= offset.x;
          matrix[5] -= offset.y;
        }
        var point = fabric.fabric.util.transformPoint(new fabric.fabric.Point(crood.x, crood.y), matrix);
        return {
          left: point.x,
          top: point.y
        };
      }
      /**
       * 将路径内的相对指令坐标位置转为所在画布的坐标位置
       */
    }, {
      key: "calcRelativeCrood",
      value: function calcRelativeCrood(position, object) {
        var matrix = _toConsumableArray(object.calcOwnMatrix());
        if (object.type === 'path') {
          var offset = fabric.fabric.util.transformPoint(object.pathOffset, [].concat(_toConsumableArray(matrix.slice(0, 4)), [0, 0]));
          matrix[4] -= offset.x;
          matrix[5] -= offset.y;
        }
        var point = fabric.fabric.util.transformPoint(new fabric.fabric.Point(position.left, position.top), fabric.fabric.util.invertTransform(matrix));
        return point;
      }
      /**
       * 重新修正路径的尺寸和位置
       *
       * @param path 路径对象
       *
       * @note
       *
       * fabric.Path对象直接改内部路径指令，只能更新其路径渲染师正确的，但对象本身的尺寸和偏移信息都是错误的，
       * 需要使用initialize重新初始化路径，获取正确的尺寸，但是偏移是错的，该方法同时修正偏移。
       */
    }, {
      key: "updatePathStatus",
      value: function updatePathStatus(path) {
        var _a;
        repairPath(path);
        (_a = path.canvas) === null || _a === void 0 ? void 0 : _a.requestRenderAll();
      }
      /**
       * 基于挂载画布构建编辑器画布
       */
    }, {
      key: "_createEditorCanvas",
      value: function _createEditorCanvas(canvas) {
        var _a;
        var container = canvas.getElement().parentNode;
        if (!container) {
          throw new TypeError('Please use fabric.Canvas which is mounted into the document.');
        }
        // 如果使用隔离画布则会参考配置构造新画布使与原画布隔离
        if (this.isolation) {
          var editorCanvas = document.createElement('canvas');
          container.appendChild(editorCanvas);
          var editorFabricCanvas = new fabric.fabric.Canvas(editorCanvas, {
            // 跟随尺寸
            width: container.clientWidth,
            height: container.clientHeight,
            // 允许画布多选
            selection: true,
            // 画布渲染不跳过离屏元素
            skipOffscreen: false,
            // 保持选中元素的层级关系
            preserveObjectStacking: true
          });
          // 保留画布变换
          editorFabricCanvas.setViewportTransform((_a = canvas.viewportTransform) !== null && _a !== void 0 ? _a : [1, 0, 0, 1, 0, 0]);
          // 更多画布配置需要使用者外部配置
          return editorFabricCanvas;
        }
        return canvas;
      }
      /**
       * 添加元素事件监听
       */
    }, {
      key: "addGlobalEvent",
      value: function addGlobalEvent(eventName, handler) {
        window.addEventListener(eventName, handler);
        this.listeners.push({
          type: 'global',
          eventName: eventName,
          handler: handler
        });
      }
    }, {
      key: "addCanvasEvent",
      value: function addCanvasEvent(eventName, handler) {
        if (!this.canvas) return;
        this.canvas.on(eventName, handler);
        this.listeners.push({
          type: 'canvas',
          eventName: eventName,
          handler: handler
        });
      }
      /**
       * 移除事件监听
       */
    }, {
      key: "removeGlobalEvent",
      value: function removeGlobalEvent(eventName, handler) {
        this.listeners = this.listeners.filter(function (listener) {
          if (handler && handler !== listener.handler) return true;
          if (eventName === listener.eventName) {
            window.removeEventListener(listener.eventName, listener.handler);
            return false;
          }
          return true;
        });
      }
    }, {
      key: "removeCanvasEvent",
      value: function removeCanvasEvent(eventName, handler) {
        var canvas = this.canvas;
        if (!canvas) return;
        this.listeners = this.listeners.filter(function (listener) {
          if (handler && handler !== listener.handler) return true;
          if (eventName === listener.eventName) {
            canvas.off(listener.eventName, listener.handler);
            return false;
          }
          return true;
        });
      }
      /**
       * 初始化路径绘制监听
       */
    }, {
      key: "_initDrawPathListener",
      value: function _initDrawPathListener(vizpath) {
        var _this18 = this;
        var canvas = this.canvas;
        if (!canvas) return;
        var handler = function handler(paths) {
          var _this18$paths;
          var _a;
          var ui = vizpath.context.find(EditorUI);
          var theme = (_a = ui === null || ui === void 0 ? void 0 : ui.theme) !== null && _a !== void 0 ? _a : DEFAULT_THEME;
          paths.forEach(function (item) {
            var pathObject = item.pathObject;
            // 如果已经带有标志则是已经添加进画布的路径
            if (pathObject[Editor.symbol]) return;
            var decorator = function decorator(customPath, callback) {
              customPath.set({
                name: v4(),
                // 路径本身不可选中，后续通过操纵点和线条来更改路径
                selectable: false,
                // 不触发事件
                evented: false,
                // 防止因为缓存没有显示正确的路径
                objectCaching: false
              });
              customPath[Editor.symbol] = EditorSymbolType.PATH;
              if (ui && callback) {
                ui.objectPreRenderCallbackMap.set(customPath, callback);
              }
              return customPath;
            };
            theme.path(decorator, pathObject);
            if (!pathObject[Editor.symbol]) decorator(pathObject);
          });
          // 添加新的路径对象
          canvas.renderOnAddRemove = true;
          paths.forEach(function (_ref12) {
            var pathObject = _ref12.pathObject;
            if (!canvas.contains(pathObject)) canvas.add(pathObject);
          });
          canvas.renderOnAddRemove = false;
          canvas.requestRenderAll();
          (_this18$paths = _this18.paths).push.apply(_this18$paths, _toConsumableArray(paths));
          // 建立映射关系，便于减少后续计算
          _this18.paths.forEach(function (item) {
            item.segment.forEach(function (_ref13) {
              var node = _ref13.node;
              if (node) _this18.nodePathMap.set(node, item);
            });
          });
        };
        vizpath.on('draw', handler);
      }
      /**
       * 初始化路径清除监听
       */
    }, {
      key: "_initClearPathListener",
      value: function _initClearPathListener(vizpath) {
        var _this19 = this;
        var canvas = this.canvas;
        if (!canvas) return;
        var handler = function handler(paths) {
          canvas.remove.apply(canvas, _toConsumableArray(paths.map(function (i) {
            return i.pathObject;
          })));
          _this19.paths = _this19.paths.filter(function (i) {
            return paths.includes(i);
          });
          // 清除映射
          paths.forEach(function (item) {
            item.segment.forEach(function (_ref14) {
              var node = _ref14.node;
              if (node) _this19.nodePathMap["delete"](node);
            });
          });
        };
        vizpath.on('clear', handler);
        vizpath.on('clearAll', function () {
          canvas.remove.apply(canvas, _toConsumableArray(_this19.paths.map(function (i) {
            return i.pathObject;
          })));
          _this19.paths.forEach(function (item) {
            item.segment.forEach(function (_ref15) {
              var node = _ref15.node;
              if (node) _this19.nodePathMap["delete"](node);
            });
          });
          _this19.paths = [];
        });
      }
    }, {
      key: "_initPathNodes",
      value: function _initPathNodes() {
        var _this20 = this;
        var _a;
        var objects = [];
        var objectNodeMap = new Map();
        var nodeObjectMap = new Map();
        var vizpath = this.vizpath;
        if (!vizpath) return {
          objects: objects,
          objectNodeMap: objectNodeMap,
          nodeObjectMap: nodeObjectMap
        };
        var ui = vizpath.context.find(EditorUI);
        var theme = (_a = ui === null || ui === void 0 ? void 0 : ui.theme) !== null && _a !== void 0 ? _a : DEFAULT_THEME;
        /**
         * 创建路径节点对应的fabric对象
         * @param node 路径节点
         * @param originObject 来源对象
         */
        var createNodeObject = function createNodeObject(node, originObject) {
          var decorator = function decorator(customObject, callback) {
            customObject.set({
              name: v4(),
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
            customObject[Editor.symbol] = EditorSymbolType.NODE;
            if (ui && callback) {
              ui.objectPreRenderCallbackMap.set(customObject, callback);
            }
            return customObject;
          };
          var object = originObject !== null && originObject !== void 0 ? originObject : theme.node(decorator);
          if (!object[Editor.symbol]) object = decorator(object);
          // 加入画布时添加自动响应
          var onAddedNode = function onAddedNode() {
            node.observe(function (x, y) {
              var position = _this20.calcAbsolutePosition({
                x: x,
                y: y
              }, _this20.nodePathMap.get(node).pathObject);
              if (object.group) {
                var relativePosition = _this20.calcRelativeCrood(position, object.group);
                object.set({
                  left: relativePosition.x,
                  top: relativePosition.y
                }).setCoords();
                object.group.addWithUpdate();
              } else {
                object.set(position).setCoords();
              }
            }, {
              id: object.name,
              immediate: true
            });
          };
          // 移除时结束自动响应
          var onRemovedNode = function onRemovedNode() {
            object.off('added', onAddedNode);
            object.off('removed', onRemovedNode);
            node.unobserve(object.name);
            observe(object, ['left', 'top'], function () {});
            _this20._abandonedPool.nodes.push(object);
          };
          object.on('added', onAddedNode);
          object.on('removed', onRemovedNode);
          return object;
        };
        // 第一轮遍历为了重用旧对象，避免每次更新fabric对象都变化还需要重新处理聚焦事件
        vizpath.paths.forEach(function (_ref16) {
          var segment = _ref16.segment;
          segment.forEach(function (item) {
            var node = item.node;
            if (!node) return;
            var reuseObject = _this20.nodeObjectMap.get(item);
            if (reuseObject) {
              var object = createNodeObject(node, reuseObject);
              if (!object) return;
              objects.push(object);
              objectNodeMap.set(object, item);
              nodeObjectMap.set(item, object);
            }
          });
        });
        // 第二轮遍历则是为了创建新对象
        vizpath.paths.forEach(function (_ref17) {
          var segment = _ref17.segment;
          segment.forEach(function (item) {
            var node = item.node;
            if (!node) return;
            if (nodeObjectMap.has(item)) return;
            var recycleObject;
            do {
              recycleObject = _this20._abandonedPool.nodes.pop();
            } while (recycleObject && objectNodeMap.has(recycleObject));
            var object = createNodeObject(node, recycleObject);
            if (!object) return;
            objects.push(object);
            objectNodeMap.set(object, item);
            nodeObjectMap.set(item, object);
          });
        });
        return {
          objects: objects,
          objectNodeMap: objectNodeMap,
          nodeObjectMap: nodeObjectMap
        };
      }
      /**
       * 初始路径节点绘制事件
       */
    }, {
      key: "_initDrawNodeEvents",
      value: function _initDrawNodeEvents(vizpath) {
        var _this21 = this;
        var updateNodes = function updateNodes() {
          var canvas = _this21.canvas;
          if (!canvas) return;
          var storeActiveObjects = _this21.activeNodes;
          // 失去当前选中状态
          if (storeActiveObjects.length) _this21.blur();
          // 由于需要多次添加路径节点和曲线变换点，如果不设置该配置，每次添加和移除都会渲染一次画布，设置为false后可以控制为1次渲染
          canvas.renderOnAddRemove = false;
          // 移除旧对象
          canvas.remove.apply(canvas, _toConsumableArray(_this21.nodes));
          // 初始路径路径节点
          var _this21$_initPathNode = _this21._initPathNodes(),
            objects = _this21$_initPathNode.objects,
            objectNodeMap = _this21$_initPathNode.objectNodeMap,
            nodeObjectMap = _this21$_initPathNode.nodeObjectMap;
          // 添加新对象并重新建立映射关系
          _this21.nodes = objects;
          canvas.add.apply(canvas, _toConsumableArray(objects));
          _this21.objectNodeMap.clear();
          _this21.objectNodeMap = objectNodeMap;
          _this21.nodeObjectMap.clear();
          _this21.nodeObjectMap = nodeObjectMap;
          canvas.renderOnAddRemove = true;
          canvas.requestRenderAll();
          // 保留原聚焦状态
          if (storeActiveObjects.length) _this21.focus.apply(_this21, _toConsumableArray(storeActiveObjects));
        };
        vizpath.on('draw', updateNodes);
      }
      /**
       * 初始路径节点清除事件
       */
    }, {
      key: "_initClearNodeEvents",
      value: function _initClearNodeEvents(vizpath) {
        var _this22 = this;
        var canvas = this.canvas;
        if (!canvas) return;
        vizpath.on('clear', function (path) {
          var removeObjects = [];
          path.forEach(function (_ref18) {
            var segment = _ref18.segment;
            segment.forEach(function (node) {
              var object = _this22.nodeObjectMap.get(node);
              if (object) removeObjects.push(object);
            });
          });
          _this22.blur();
          canvas.remove.apply(canvas, removeObjects);
          removeObjects.forEach(function (object) {
            var node = _this22.objectNodeMap.get(object);
            if (node) {
              _this22.nodeObjectMap["delete"](node);
              _this22.objectNodeMap["delete"](object);
            }
          });
          _this22.nodes = _this22.nodes.filter(function (i) {
            return !removeObjects.includes(i);
          });
        });
        vizpath.on('clearAll', function () {
          _this22.blur();
          canvas.remove.apply(canvas, _toConsumableArray(_this22.nodes));
          _this22.nodes = [];
          _this22.objectNodeMap.clear();
          _this22.nodeObjectMap.clear();
        });
        vizpath.on('destroy', function () {
          _this22._abandonedPool = {
            nodes: [],
            points: [],
            lines: []
          };
        });
      }
      /**
       * 添加活跃组的响应式变化
       */
    }, {
      key: "_addActiveSelectionObserve",
      value: function _addActiveSelectionObserve(group) {
        var _this23 = this;
        var initialObjectCount = group._objects.length;
        group._objects.forEach(function (object) {
          return observe(object, ['left', 'top'], function () {});
        });
        observe(group, ['left', 'top', 'angle', 'scaleX', 'scaleY'], function (newValue, oldValue) {
          var _a;
          if (!group.canvas) return;
          if (group._objects.length !== initialObjectCount) return;
          (_a = _this23.vizpath) === null || _a === void 0 ? void 0 : _a.onceRerenderOriginPath(function () {
            var _a, _b;
            var hadFollowedCroods = new Set([]);
            var _iterator4 = _createForOfIteratorHelper(group._objects),
              _step4;
            try {
              var _loop = function _loop() {
                var object = _step4.value;
                var followCurveDots = [];
                var pathNode = _this23.objectNodeMap.get(object);
                var curveDots = (_b = (_a = _this23.vizpath) === null || _a === void 0 ? void 0 : _a.getNeighboringCurveDots(pathNode)) !== null && _b !== void 0 ? _b : [];
                curveDots === null || curveDots === void 0 ? void 0 : curveDots.forEach(function (_ref19) {
                  var position = _ref19.position,
                    direction = _ref19.direction,
                    from = _ref19.from;
                  var _a;
                  var crood = (_a = from.curveDots) === null || _a === void 0 ? void 0 : _a[direction];
                  if (position !== 'cur' || !crood) return;
                  // 避免重复的曲线变换点跟随更改
                  if (hadFollowedCroods.has(crood)) return;
                  followCurveDots.push(crood);
                  hadFollowedCroods.add(crood);
                });
                object.set({
                  scaleX: object.scaleX / (newValue.scaleX / oldValue.scaleX),
                  scaleY: object.scaleY / (newValue.scaleY / oldValue.scaleY),
                  angle: object.angle - (newValue.angle - oldValue.angle)
                });
                var decomposeMatrix = fabric.fabric.util.qrDecompose(object.calcTransformMatrix(false));
                var left = decomposeMatrix.translateX;
                var top = decomposeMatrix.translateY;
                _this23._transform(object, {
                  left: left,
                  top: top,
                  scaleX: newValue.scaleX / oldValue.scaleX,
                  scaleY: newValue.scaleY / oldValue.scaleY,
                  angle: newValue.angle - oldValue.angle
                }, followCurveDots);
              };
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                _loop();
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
            hadFollowedCroods.clear();
          });
        });
      }
      /**
       * 添加单个活跃对象的响应式变化
       */
    }, {
      key: "_addActivePointObserve",
      value: function _addActivePointObserve(object) {
        var _this24 = this;
        observe(object, ['left', 'top'], function (_ref20) {
          var left = _ref20.left,
            top = _ref20.top;
          var _a, _b;
          if (object.group) return;
          var followCurveDots = [];
          var pathNode = _this24.objectNodeMap.get(object);
          var curveDots = (_b = (_a = _this24.vizpath) === null || _a === void 0 ? void 0 : _a.getNeighboringCurveDots(pathNode)) !== null && _b !== void 0 ? _b : [];
          curveDots === null || curveDots === void 0 ? void 0 : curveDots.forEach(function (_ref21) {
            var position = _ref21.position,
              direction = _ref21.direction,
              from = _ref21.from;
            var _a;
            var crood = (_a = from.curveDots) === null || _a === void 0 ? void 0 : _a[direction];
            if (position !== 'cur' || !crood) return;
            followCurveDots.push(crood);
          });
          _this24._transform(object, {
            left: left,
            top: top
          }, followCurveDots);
        });
      }
      /**
       * 初始画布节点选中事件
       */
    }, {
      key: "_initSelectNodeEvents",
      value: function _initSelectNodeEvents() {
        var _this25 = this;
        this.addCanvasEvent('selection:created', function (e) {
          if (_this25._deactivateSelectListeners) return;
          _this25.focus.apply(_this25, _toConsumableArray(_this25.canvas.getActiveObjects()));
        });
        this.addCanvasEvent('selection:updated', function (e) {
          if (_this25._deactivateSelectListeners) return;
          _this25.focus.apply(_this25, _toConsumableArray(_this25.canvas.getActiveObjects()));
        });
        this.addCanvasEvent('selection:cleared', function () {
          if (_this25._deactivateSelectListeners) return;
          _this25.focus();
        });
        // 选中路径段时自动选中路线段内的所有指令路径节点
        this.addCanvasEvent('mouse:dblclick', function (e) {
          if (e.target && e.target[Editor.symbol]) return;
          var focusPath;
          for (var _i13 = _this25.paths.length - 1; _i13 >= 0; _i13--) {
            var path = _this25.paths[_i13];
            if (path.pathObject.containsPoint(e.pointer)) {
              focusPath = path;
              break;
            }
          }
          if (focusPath) {
            _this25.focus.apply(_this25, _toConsumableArray(_this25.nodes.filter(function (node) {
              return _this25.nodePathMap.get(_this25.objectNodeMap.get(node).node) === focusPath;
            })));
          }
        });
      }
      /**
       * 初始路径点添加事件
       */
    }, {
      key: "_initAddNodeEvents",
      value: function _initAddNodeEvents() {
        var _this26 = this;
        var canvas = this.canvas;
        if (!canvas) return;
        this.addCanvasEvent('mouse:down:before', function (event) {
          var _a, _b;
          if ((_a = _this26.disabledFunctionTokens.add) === null || _a === void 0 ? void 0 : _a.length) return;
          if (_this26.setting.mode !== Mode.ADD) return;
          var target;
          if (event.target && event.target[Editor.symbol]) {
            if (_this26.activeNodes.length === 1 && event.target[Editor.symbol] === EditorSymbolType.NODE) {
              var joinNode = _this26.link(_this26.objectNodeMap.get(_this26.activeNodes[0]), _this26.objectNodeMap.get(event.target));
              if (joinNode) target = _this26.nodeObjectMap.get(joinNode);
            }
          } else {
            // 新增节点
            var pointer = calcCanvasCrood(canvas, event.pointer);
            target = _this26.add({
              left: pointer.x,
              top: pointer.y
            });
            if (target) {
              var bezier = (_b = _this26.vizpath) === null || _b === void 0 ? void 0 : _b.context.find(EditorBezier);
              if (bezier) bezier.upgrade(target);
            }
          }
          if (target) _this26.currentConvertNodeObject = target;
        });
      }
      /**
       * 添加活跃节点的周围曲线变换点
       */
    }, {
      key: "_addActivePointCurveDots",
      value: function _addActivePointCurveDots(nodeObject) {
        var _this27 = this;
        var _a;
        var vizpath = this.vizpath;
        if (!vizpath) return;
        var canvas = nodeObject.canvas;
        if (!canvas) return;
        var curPathNode = this.objectNodeMap.get(nodeObject);
        if (!curPathNode) return;
        var ui = vizpath.context.find(EditorUI);
        var theme = (_a = ui === null || ui === void 0 ? void 0 : ui.theme) !== null && _a !== void 0 ? _a : DEFAULT_THEME;
        // 创建新的路径曲线变换点
        var curveDots = [];
        var curveDotSet = new WeakSet([]);
        var neighboringCurveDots = vizpath.getNeighboringCurveDots(curPathNode);
        neighboringCurveDots.forEach(function (_ref22) {
          var position = _ref22.position,
            direction = _ref22.direction,
            from = _ref22.from;
          var _a, _b, _c;
          var node = from.node;
          var curveDot = (_a = from.curveDots) === null || _a === void 0 ? void 0 : _a[direction];
          if (!node || !curveDot || curveDotSet.has(curveDot)) return false;
          var nodeObject = _this27.nodeObjectMap.get(from);
          /**
           * 创建指令曲线变换点
           */
          var pointDecorator = function pointDecorator(customObject, callback) {
            customObject.set({
              name: v4(),
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
            customObject[Editor.symbol] = EditorSymbolType.CURVE_DOT;
            if (ui && callback) {
              ui.objectPreRenderCallbackMap.set(customObject, callback);
            }
            return customObject;
          };
          var point = (_b = _this27._abandonedPool.points.pop()) !== null && _b !== void 0 ? _b : theme.dot(pointDecorator);
          if (!point[Editor.symbol]) point = pointDecorator(point);
          // 建立相互响应，指令的数据和元素的位置更改会相互同步
          var onAddedPoint = function onAddedPoint() {
            curveDot.observe(function (x, y) {
              var _a;
              if (((_a = point.canvas) === null || _a === void 0 ? void 0 : _a.getActiveObject()) === point) return;
              var position = _this27.calcAbsolutePosition({
                x: x,
                y: y
              }, _this27.nodePathMap.get(node).pathObject);
              point.set(position).setCoords();
            }, {
              immediate: true,
              id: point.name
            });
            observe(point, ['left', 'top'], function (_ref23) {
              var left = _ref23.left,
                top = _ref23.top;
              var _a;
              if (point.group) return;
              // 与中心点相对角度固定
              var nodeCenter = nodeObject.getCenterPoint();
              var pointCenter = point.getCenterPoint();
              point.set({
                angle: 45 + Math.atan2(pointCenter.y - nodeCenter.y, pointCenter.x - nodeCenter.x) * 180 / Math.PI
              });
              // 响应式更改指令信息
              if (((_a = point.canvas) === null || _a === void 0 ? void 0 : _a.getActiveObject()) === point) {
                var crood = _this27.calcRelativeCrood({
                  left: left,
                  top: top
                }, _this27.nodePathMap.get(node).pathObject);
                // 曲线变换点对称操作
                if (_this27.setting.forcePointSymmetric !== 'none') {
                  var symmetricCurveDot = _this27.curveDots.find(function (i) {
                    var _a;
                    var antiDirection = {
                      pre: 'next',
                      next: 'pre'
                    }[direction];
                    if (i.type !== antiDirection) return false;
                    return i.pathNode === ((_a = neighboringCurveDots.find(function (i) {
                      return i.position === position && i.direction === antiDirection;
                    })) === null || _a === void 0 ? void 0 : _a.from);
                  });
                  if (symmetricCurveDot) {
                    var _curveDot = symmetricCurveDot.curveDot;
                    // 旧镜像曲线变换点到路径节点的距离
                    var d = calcCroodsDistance(_curveDot, node);
                    // 新镜像曲线变换点到路径节点的距离
                    var new_d = calcCroodsDistance({
                      x: node.x - (crood.x - node.x),
                      y: node.y - (crood.y - node.y)
                    }, node);
                    var scale = _this27.setting.forcePointSymmetric === 'entire' ? 1 : d / new_d;
                    _curveDot.setCrood({
                      x: node.x - (crood.x - node.x) * scale,
                      y: node.y - (crood.y - node.y) * scale
                    });
                  }
                }
                curveDot.setCrood(crood, [point.name]);
              }
            }, true);
          };
          var onRemovedPoint = function onRemovedPoint() {
            point.off('added', onAddedPoint);
            point.off('removed', onRemovedPoint);
            curveDot.unobserve(point.name);
            observe(point, ['left', 'top'], function () {});
            _this27._abandonedPool.points.push(point);
          };
          point.on('added', onAddedPoint);
          point.on('removed', onRemovedPoint);
          /**
           * 创建曲线变换点和节点的连线
           */
          var lineDecorator = function lineDecorator(customObject, callback) {
            customObject.set({
              name: v4(),
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
            customObject[Editor.symbol] = EditorSymbolType.LINE;
            if (ui && callback) {
              ui.objectPreRenderCallbackMap.set(customObject, callback);
            }
            return customObject;
          };
          var line = (_c = _this27._abandonedPool.lines.pop()) !== null && _c !== void 0 ? _c : theme.line(lineDecorator);
          if (!line[Editor.symbol]) line = lineDecorator(line);
          // 建立响应式，让连线随时跟随指令的值进行变化
          var onAddedLine = function onAddedLine() {
            node.observe(function (x, y) {
              var position = _this27.calcAbsolutePosition({
                x: x,
                y: y
              }, _this27.nodePathMap.get(node).pathObject);
              line.set({
                x1: position.left,
                y1: position.top
              });
            }, {
              immediate: true,
              id: line.name
            });
            curveDot.observe(function (x, y) {
              var position = _this27.calcAbsolutePosition({
                x: x,
                y: y
              }, _this27.nodePathMap.get(node).pathObject);
              line.set({
                x2: position.left,
                y2: position.top
              });
            }, {
              immediate: true,
              id: line.name
            });
          };
          var onRemovedLine = function onRemovedLine() {
            line.off('added', onAddedLine);
            line.off('removed', onRemovedLine);
            node.unobserve(line.name);
            curveDot.unobserve(line.name);
            _this27._abandonedPool.lines.push(line);
          };
          line.on('added', onAddedLine);
          line.on('removed', onRemovedLine);
          curveDots.push({
            type: direction,
            pathNode: from,
            curveDot: curveDot,
            node: nodeObject,
            point: point,
            line: line
          });
          curveDotSet.add(curveDot);
        });
        // 移除旧对象并添加新对象
        canvas.renderOnAddRemove = false;
        canvas.remove.apply(canvas, _toConsumableArray(this.curveDots.map(function (i) {
          return [i.point, i.line];
        }).flat(1)));
        var baseIndex = canvas._objects.indexOf(this.paths[0].pathObject) + this.paths.length;
        curveDots.forEach(function (i, idx) {
          canvas.insertAt(i.line, baseIndex + idx, false);
          canvas.add(i.point);
        });
        this.curveDots = curveDots;
        canvas.renderOnAddRemove = true;
        canvas.requestRenderAll();
      }
      /**
       * 移除当前曲线变换点
       */
    }, {
      key: "_removeCurrentCurveDots",
      value: function _removeCurrentCurveDots() {
        var _a;
        var editor = (_a = this.vizpath) === null || _a === void 0 ? void 0 : _a.context.find(Editor);
        var canvas = editor === null || editor === void 0 ? void 0 : editor.canvas;
        if (!canvas) return;
        canvas.renderOnAddRemove = false;
        this.curveDots.forEach(function (i) {
          canvas.remove(i.point, i.line);
        });
        this.curveDots = [];
        canvas.renderOnAddRemove = true;
        canvas.requestRenderAll();
      }
      /**
       * 获取路径节点进行转换的配置
       */
    }, {
      key: "_getConvertibleNodes",
      value: function _getConvertibleNodes(node) {
        if (!this.vizpath) return [];
        var instruction = node.instruction;
        var _this$vizpath$getNeig = this.vizpath.getNeighboringInstructions(node),
          pre = _this$vizpath$getNeig.pre,
          next = _this$vizpath$getNeig.next;
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
       * 初始路径指令转换事件
       */
    }, {
      key: "_initConvertNodeEvents",
      value: function _initConvertNodeEvents() {
        var _this28 = this;
        var canvas = this.canvas;
        if (!canvas) return;
        this.addCanvasEvent('mouse:down', function (event) {
          var _a, _b;
          if ((_a = _this28.disabledFunctionTokens.convert) === null || _a === void 0 ? void 0 : _a.length) return;
          if (!_this28.currentConvertNodeObject) {
            if (_this28.setting.mode !== Mode.CONVERT) return;
            if (((_b = event.target) === null || _b === void 0 ? void 0 : _b[Editor.symbol]) !== EditorSymbolType.NODE) return;
            _this28.currentConvertNodeObject = event.target;
          }
          if (_this28.currentConvertNodeObject) {
            fireMouseUpAndSelect(_this28.currentConvertNodeObject);
            _this28.currentConvertNodeObject.set({
              lockMovementX: true,
              lockMovementY: true
            });
            canvas.selection = false;
          }
        });
        this.addCanvasEvent('mouse:move', function (event) {
          var target = _this28.currentConvertNodeObject;
          if (!target) return;
          // 如果鼠标还在点上不触发控制曲线作用，当移出后才触发，避免触发敏感
          if (target.containsPoint(event.pointer)) return;
          var pointer = calcCanvasCrood(canvas, event.pointer);
          var targetNode = _this28.objectNodeMap.get(target);
          var pathObject = _this28.nodePathMap.get(targetNode.node).pathObject;
          var convertibleNodes = _this28._getConvertibleNodes(targetNode);
          var neighboringNodes = _this28.vizpath.getNeighboringNodes(targetNode, true);
          var position = _this28.calcRelativeCrood({
            left: pointer.x,
            top: pointer.y
          }, pathObject);
          var antiPosition = _this28.calcRelativeCrood({
            left: target.left - (pointer.x - target.left),
            top: target.top - (pointer.y - target.top)
          }, pathObject);
          // 根据夹角大小排序，夹角越小意味鼠标越接近
          if (convertibleNodes.length > 1) {
            convertibleNodes.sort(function (a, b) {
              return calcCroodsAngle(position, targetNode.node, neighboringNodes[a[0]].node) - calcCroodsAngle(position, targetNode.node, neighboringNodes[b[0]].node);
            });
          }
          convertibleNodes.forEach(function (item, index) {
            var _a;
            var newCrood = [position, antiPosition][index];
            var newInstruction = _toConsumableArray(item[1].instruction);
            newInstruction[0] = _defineProperty(_defineProperty({}, InstructionType.LINE, InstructionType.QUADRATIC_CURCE), InstructionType.QUADRATIC_CURCE, InstructionType.BEZIER_CURVE)[newInstruction[0]];
            newInstruction.splice(item[0] === 'pre' ? -2 : 1, 0, newCrood.x, newCrood.y);
            (_a = _this28.vizpath) === null || _a === void 0 ? void 0 : _a.replace(item[1], newInstruction);
          });
          var targetCurveDot = _this28.curveDots.find(function (i) {
            var _a;
            return i.pathNode === targetNode && i.type === ((_a = convertibleNodes[0]) === null || _a === void 0 ? void 0 : _a[0]);
          });
          if (targetCurveDot) {
            _this28.focus(targetCurveDot.point);
            fireMouseUpAndSelect(targetCurveDot.point);
          }
        });
        this.addCanvasEvent('mouse:up', function () {
          if (_this28.currentConvertNodeObject) {
            _this28.currentConvertNodeObject.set({
              lockMovementX: false,
              lockMovementY: false
            });
            _this28.currentConvertNodeObject = null;
            canvas.selection = true;
          }
        });
      }
      /**
       * 初始路径节点删除事件
       */
    }, {
      key: "_initDeleteNodeEvents",
      value: function _initDeleteNodeEvents() {
        var _this29 = this;
        this.addCanvasEvent('mouse:down', function (event) {
          var _a, _b, _c;
          if ((_a = _this29.disabledFunctionTokens.remove) === null || _a === void 0 ? void 0 : _a.length) return;
          if (_this29.setting.mode !== Mode.DELETE) return;
          if (((_b = event.target) === null || _b === void 0 ? void 0 : _b[Editor.symbol]) === EditorSymbolType.NODE || ((_c = event.target) === null || _c === void 0 ? void 0 : _c[Editor.symbol]) === EditorSymbolType.CURVE_DOT) {
            _this29.remove(event.target);
          }
        });
      }
      /**
       * 变换节点
       * @param object 路径节点
       * @param options 变换配置
       * @param followCurveDots 跟随变换的曲线变换点
       * @returns
       */
    }, {
      key: "_transform",
      value: function _transform(object, options) {
        var followCurveDots = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var _a;
        var pathNode = this.objectNodeMap.get(object);
        if (!pathNode) return;
        var node = pathNode.node;
        var left = options.left,
          top = options.top,
          _options$scaleX = options.scaleX,
          scaleX = _options$scaleX === void 0 ? 1 : _options$scaleX,
          _options$scaleY = options.scaleY,
          scaleY = _options$scaleY === void 0 ? 1 : _options$scaleY,
          _options$angle = options.angle,
          angle = _options$angle === void 0 ? 0 : _options$angle;
        var newCrood = this.calcRelativeCrood({
          left: left,
          top: top
        }, this.nodePathMap.get(node).pathObject);
        // 需要跟随变化的曲线曲线变换点
        followCurveDots.forEach(function (curveDot) {
          if (!curveDot) return;
          var relativeDiff = transform({
            x: curveDot.x - newCrood.x,
            y: curveDot.y - newCrood.y
          }, [{
            translate: {
              x: newCrood.x - node.x,
              y: newCrood.y - node.y
            }
          }, {
            scale: {
              x: scaleX,
              y: scaleY
            }
          }, {
            rotate: angle
          }]);
          curveDot.x = newCrood.x + relativeDiff.x;
          curveDot.y = newCrood.y + relativeDiff.y;
        });
        // 节点位置更新
        node.setCrood(newCrood, [object.name]);
        (_a = object.canvas) === null || _a === void 0 ? void 0 : _a.requestRenderAll();
      }
      /**
       * 请求对特定功能禁用
       *
       * @param functionName 禁用功能名称
       *
       * @example
       *
       * // 持有凭证用于重新启用功能
       * const token = requestDisableFunction('add');
       *
       * // 重新启用功能
       * requestEnableFunction(token);
       */
    }, {
      key: "requestDisableFunction",
      value: function requestDisableFunction(functionName) {
        var _a;
        var token = "".concat(functionName, "-").concat(v4());
        var tokens = (_a = this.disabledFunctionTokens[functionName]) !== null && _a !== void 0 ? _a : [];
        tokens.push(token);
        this.disabledFunctionTokens[functionName] = tokens;
        return token;
      }
      /**
       * 请求启用特定功能
       */
    }, {
      key: "requestEnableFunction",
      value: function requestEnableFunction(token) {
        var functionName = token.split('-')[0];
        var tokens = this.disabledFunctionTokens[functionName];
        if (!tokens) return false;
        var index = tokens.indexOf(token);
        if (index === -1) return false;
        tokens.splice(index, 1);
        return true;
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
       */
    }, {
      key: "add",
      value: function add(position) {
        var _a;
        if ((_a = this.disabledFunctionTokens.add) === null || _a === void 0 ? void 0 : _a.length) return;
        var vizpath = this.vizpath;
        if (!vizpath) return;
        if (this.activeNodes.length === 1) {
          var node = this.activeNodes[0];
          var pathNode = this.objectNodeMap.get(node);
          if (!pathNode) return;
          var segment = pathNode.segment;
          // 如果当前节点已闭合或非端点，无法实现节点添加
          if (vizpath.isClosePath(segment)) return;
          var newCrood = this.calcRelativeCrood(position, this.nodePathMap.get(pathNode.node).pathObject);
          // 如果是起始点
          if (pathNode === segment[0]) {
            // 添加新的起始
            var addPathNode = vizpath.insertBeforeNode(pathNode, [InstructionType.START, newCrood.x, newCrood.y]);
            if (!addPathNode) return;
            return this.nodeObjectMap.get(addPathNode);
          }
          // 如果是末尾端点
          else if (pathNode === segment[segment.length - 1]) {
            var _addPathNode = vizpath.insertAfterNode(pathNode, [InstructionType.LINE, newCrood.x, newCrood.y]);
            if (!_addPathNode) return;
            return this.nodeObjectMap.get(_addPathNode);
          }
        } else {
          var path = VizPathCreator.parseFabricPath(new fabric.fabric.Path('M 0 0', position));
          var responsivePath = vizpath.draw(path);
          return this.nodeObjectMap.get(responsivePath[0].segment[0]);
        }
      }
      /**
       * 删除节点或变换点
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
       * 2）删除1个变换点，实现曲线路径降级为直线路径
       *
       * @param objects 点对象(路径节点、变换点)列表
       */
    }, {
      key: "remove",
      value: function remove() {
        var _this30 = this;
        var _a;
        if ((_a = this.disabledFunctionTokens.remove) === null || _a === void 0 ? void 0 : _a.length) return;
        if (!this.vizpath) return;
        var canvas = this.canvas;
        if (!canvas) return;
        for (var _len3 = arguments.length, objects = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          objects[_key3] = arguments[_key3];
        }
        var nodeObjects = objects.filter(function (i) {
          return i[Editor.symbol] === EditorSymbolType.NODE;
        });
        var pointObjects = objects.filter(function (i) {
          return i[Editor.symbol] === EditorSymbolType.CURVE_DOT;
        });
        if (nodeObjects.length) {
          var _this$vizpath;
          var removeNodes = [];
          nodeObjects.forEach(function (object) {
            var _this30$objectNodeMap = _this30.objectNodeMap.get(object),
              node = _this30$objectNodeMap.node;
            if (!node) return;
            removeNodes.push(node);
          });
          this.blur();
          // 触发鼠标举起事件，避免后续拖动操作生效
          this.canvas._onMouseUp(new MouseEvent('mouseup'));
          (_this$vizpath = this.vizpath).remove.apply(_this$vizpath, removeNodes);
        }
        if (pointObjects.length) {
          var _this$curveDots$find = this.curveDots.find(function (i) {
              return i.point === pointObjects[0];
            }),
            type = _this$curveDots$find.type,
            node = _this$curveDots$find.node;
          this.degrade(node, type);
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
        var _this31 = this;
        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
        var _a;
        if ((_a = this.disabledFunctionTokens.upgrade) === null || _a === void 0 ? void 0 : _a.length) return;
        if (!this.vizpath) return;
        var pathNode = this.objectNodeMap.get(object);
        if (!pathNode) return;
        var instruction = pathNode.instruction,
          node = pathNode.node;
        var _this$vizpath$getNeig2 = this.vizpath.getNeighboringInstructions(pathNode, true),
          pre = _this$vizpath$getNeig2.pre,
          next = _this$vizpath$getNeig2.next;
        var directionNodeMap = {
          pre: instruction[0] === InstructionType.START ? pre : pathNode,
          next: next
        };
        var targets = [];
        if ((direction === 'both' || direction === 'pre') && directionNodeMap.pre) {
          targets.push(['pre', directionNodeMap.pre]);
        }
        if ((direction === 'both' || direction === 'next') && directionNodeMap.next) {
          targets.push(['next', directionNodeMap.next]);
        }
        targets.forEach(function (_ref24) {
          var _ref25 = _slicedToArray(_ref24, 2),
            direction = _ref25[0],
            pathNode = _ref25[1];
          var oldInstruction = pathNode.instruction;
          if (oldInstruction[0] === InstructionType.BEZIER_CURVE) return;
          var newInstruction = _toConsumableArray(oldInstruction);
          newInstruction[0] = _defineProperty(_defineProperty({}, InstructionType.LINE, InstructionType.QUADRATIC_CURCE), InstructionType.QUADRATIC_CURCE, InstructionType.BEZIER_CURVE)[newInstruction[0]];
          newInstruction.splice({
            pre: -2,
            next: 1
          }[direction], 0, node.x, node.y);
          _this31.vizpath.replace(pathNode, newInstruction);
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
        var _this32 = this;
        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
        var lowest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var _a;
        if ((_a = this.disabledFunctionTokens.degrade) === null || _a === void 0 ? void 0 : _a.length) return;
        if (!this.vizpath) return;
        var pathNode = this.objectNodeMap.get(object);
        if (!pathNode) return;
        var _this$vizpath$getNeig3 = this.vizpath.getNeighboringInstructions(pathNode, true),
          pre = _this$vizpath$getNeig3.pre,
          next = _this$vizpath$getNeig3.next;
        var directionNodeMap = {
          pre: pathNode.instruction[0] === InstructionType.START ? pre : pathNode,
          next: next
        };
        var targets = [];
        if ((direction === 'both' || direction === 'pre') && directionNodeMap.pre) {
          targets.push(['pre', directionNodeMap.pre]);
        }
        if ((direction === 'both' || direction === 'next') && directionNodeMap.next) {
          targets.push(['next', directionNodeMap.next]);
        }
        targets.forEach(function (_ref26) {
          var _ref27 = _slicedToArray(_ref26, 2),
            direction = _ref27[0],
            pathNode = _ref27[1];
          var oldInstruction = pathNode.instruction;
          if ([InstructionType.START, InstructionType.LINE].includes(oldInstruction[0])) return;
          var newInstruction = _toConsumableArray(oldInstruction);
          if (lowest) {
            newInstruction[0] = InstructionType.LINE;
            newInstruction.splice(1, newInstruction.length - 3);
          } else {
            newInstruction[0] = _defineProperty(_defineProperty({}, InstructionType.QUADRATIC_CURCE, InstructionType.LINE), InstructionType.BEZIER_CURVE, InstructionType.QUADRATIC_CURCE)[newInstruction[0]];
            newInstruction.splice({
              pre: -4,
              next: 1
            }[direction], 2);
          }
          _this32.vizpath.replace(pathNode, newInstruction);
        });
      }
      /**
       * 连接两个节点，可以实现路径闭合和路径拼接，仅在两点都是路径端点（即首尾点）时生效。
       *
       * @param source 当前点
       * @param target 目标点
       */
    }, {
      key: "link",
      value: function link(source, target) {
        var _this33 = this;
        var _a;
        if ((_a = this.disabledFunctionTokens.link) === null || _a === void 0 ? void 0 : _a.length) return;
        var vizpath = this.vizpath;
        if (!vizpath) return;
        if (source === target) return;
        if (!vizpath.isTerminalNode(source) || !vizpath.isTerminalNode(target)) return;
        // 自身合并，直接加'z'闭合指令即可
        if (source.segment === target.segment) {
          vizpath.close(source);
          return target;
        }
        // 不同路径需要进行合并
        var sourcePath = source.segment.map(function (i) {
          return i.instruction;
        });
        var targetPath = target.segment.map(function (i) {
          return i.instruction;
        });
        if (source.instruction === sourcePath[0]) {
          sourcePath = reversePath(sourcePath);
        }
        if (target.instruction === targetPath[targetPath.length - 1]) {
          targetPath = reversePath(targetPath);
        }
        targetPath.splice(0, 1, [InstructionType.LINE, targetPath[0][1], targetPath[0][2]]);
        targetPath.map(function (item) {
          var instruction = item;
          for (var _i14 = 0; _i14 < instruction.length - 1; _i14 += 2) {
            var position = _this33.calcAbsolutePosition(new fabric.fabric.Point(instruction[_i14 + 1], instruction[_i14 + 2]), vizpath.getPath(target.segment).pathObject);
            var crood = _this33.calcRelativeCrood(position, vizpath.getPath(source.segment).pathObject);
            instruction[_i14 + 1] = crood.x;
            instruction[_i14 + 2] = crood.y;
          }
        });
        var joinIndex = sourcePath.length;
        var mergePath = sourcePath.concat(targetPath);
        // 合并后添加回路径段集合
        var newPath = vizpath.onceRerenderOriginPath(function () {
          vizpath.clear(target.segment);
          return vizpath.replacePathSegments(vizpath.getPath(source.segment), [mergePath]);
        });
        return newPath[0].segment[joinIndex];
      }
    }, {
      key: "focus",
      value: function focus() {
        var _this34 = this;
        var canvas = this.canvas;
        if (!canvas) return;
        // 提取有效活跃元素
        var focusNodes = [];
        var focusCurveDotPoints = [];
        for (var _len4 = arguments.length, selectedObjects = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          selectedObjects[_key4] = arguments[_key4];
        }
        selectedObjects.forEach(function (object) {
          switch (object[Editor.symbol]) {
            case EditorSymbolType.NODE:
              focusNodes.push(object);
              break;
            case EditorSymbolType.CURVE_DOT:
              focusCurveDotPoints.push(object);
              break;
          }
        });
        // 触发内置失焦事件
        if (this.activePoint || this.activeNodes.length) {
          this.fire('deselected', this.activeNodes, this.activePoint);
        }
        // 只要包含路径节点则只处理聚焦路径节点逻辑
        if (focusNodes.length) {
          this._deactivateSelectListeners = true;
          // 取消画布选中重新构造只包含路径节点的选中框对象
          canvas.discardActiveObject();
          this.activeNodes = focusNodes;
          this.activePoint = null;
          // 是否只选中单一路径节点
          if (focusNodes.length === 1) {
            var focusNode = focusNodes[0];
            this._addActivePointObserve(focusNode);
            this._addActivePointCurveDots(focusNode);
            canvas.setActiveObject(focusNode);
          }
          // 多选则成组选择
          else if (focusNodes.length > 1) {
            var activeSelection = new fabric.fabric.ActiveSelection(focusNodes, {
              canvas: canvas,
              lockScalingFlip: true,
              // TODO: 暂不允许旋转，后续计算会出现精度问题导致多次变换后无法正确呈现位置
              lockRotation: true,
              originX: 'center',
              originY: 'center'
            });
            if (activeSelection.lockRotation) {
              activeSelection.setControlVisible('mtr', false);
            }
            this._addActiveSelectionObserve(activeSelection);
            this._removeCurrentCurveDots();
            canvas.setActiveObject(activeSelection);
          }
          this._deactivateSelectListeners = false;
          this.fire('selected', focusNodes, null);
        }
        // 考虑是否只有一个曲线变换点聚焦情况，不允许多曲线变换点同时聚焦
        else if (focusCurveDotPoints.length === 1) {
          this.activePoint = focusCurveDotPoints[0];
          this.activeNodes = [this.curveDots.find(function (i) {
            return i.point === _this34.activePoint;
          }).node];
          canvas.setActiveObject(focusCurveDotPoints[0]);
          this.fire('selected', this.activeNodes, this.activePoint);
        }
        // 如都不符合上面情况则是所有节点都失去焦点
        else {
          this.activeNodes = [];
          this.activePoint = null;
          this._removeCurrentCurveDots();
          canvas.discardActiveObject();
        }
      }
    }, {
      key: "blur",
      value: function blur() {
        this.focus();
      }
    }, {
      key: "unload",
      value: function unload() {
        var _this35 = this;
        var canvas = this.canvas;
        if (!canvas) return;
        canvas.remove.apply(canvas, _toConsumableArray(this.paths.map(function (i) {
          return i.pathObject;
        })).concat(_toConsumableArray(this.nodes), _toConsumableArray(this.curveDots.map(function (i) {
          return i.point;
        })), _toConsumableArray(this.curveDots.map(function (i) {
          return i.line;
        }))));
        // 节点相关配置
        this.nodes.length = 0;
        this.curveDots.length = 0;
        this.activeNodes.length = 0;
        this.activePoint = null;
        this.currentConvertNodeObject = null;
        this.objectNodeMap.clear();
        this.nodeObjectMap.clear();
        this._deactivateSelectListeners = false;
        this._abandonedPool.nodes.length = 0;
        this._abandonedPool.points.length = 0;
        this._abandonedPool.lines.length = 0;
        // 路径相关配置
        this.paths.length = 0;
        this.nodePathMap.clear();
        // 画布相关配置
        this.listeners.forEach(function (_ref28) {
          var type = _ref28.type,
            eventName = _ref28.eventName,
            handler = _ref28.handler;
          if (type === 'global') _this35.removeGlobalEvent(eventName, handler);
          if (type === 'canvas') _this35.removeCanvasEvent(eventName, handler);
        });
        this.mountCanvas = null;
        this.canvas = null;
        this.isolation = false;
        this.listeners.length = 0;
        this.disabledFunctionTokens = {};
        // 如果是隔离画布要销毁克隆画布
        if (this.isolation) canvas.dispose();else canvas.requestRenderAll();
      }
    }, {
      key: "load",
      value: function () {
        var _load2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(vizpath) {
          return _regeneratorRuntime().wrap(function _callee7$(_context7) {
            while (1) switch (_context7.prev = _context7.next) {
              case 0:
                if (this.mountCanvas) {
                  _context7.next = 2;
                  break;
                }
                throw new TypeError('Please use valid canvas object.');
              case 2:
                if (this.mountCanvas instanceof fabric.fabric.Canvas) {
                  _context7.next = 4;
                  break;
                }
                throw new TypeError('Please use fabric.Canvas instead of fabric.StaticCanvas.');
              case 4:
                this.canvas = this._createEditorCanvas(this.mountCanvas);
                this._initDrawPathListener(vizpath);
                this._initClearPathListener(vizpath);
                this._initDrawNodeEvents(vizpath);
                this._initClearNodeEvents(vizpath);
                this._initSelectNodeEvents();
                this._initAddNodeEvents();
                this._initConvertNodeEvents();
                this._initDeleteNodeEvents();
              case 13:
              case "end":
                return _context7.stop();
            }
          }, _callee7, this);
        }));
        function load(_x7) {
          return _load2.apply(this, arguments);
        }
        return load;
      }()
    }]);
  }(EditorModule);
  Editor.ID = 'editor';
  Editor.symbol = Symbol('editor');
  var Editor$1 = Editor;
  var EditorBackground = /*#__PURE__*/function (_EditorModule4) {
    function EditorBackground() {
      var _this36;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, EditorBackground);
      _this36 = _callSuper(this, EditorBackground);
      _this36.options = {
        grid: true,
        gridSize: 50,
        gridStyle: {
          stroke: 'rgba(0, 0, 0, 0.05)',
          strokeWidth: 1,
          strokeDashArray: [4, 2]
        }
      };
      _this36.options = defaultsDeep(options, _this36.options);
      return _this36;
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
    _inherits(EditorBackground, _EditorModule4);
    return _createClass(EditorBackground, [{
      key: "unload",
      value: function unload(vizpath) {
        var editor = vizpath.context.find(Editor$1);
        if (!editor) return;
        var canvas = editor.canvas;
        if (!canvas) return;
        canvas.backgroundColor = undefined;
        canvas.requestRenderAll();
      }
    }, {
      key: "load",
      value: function () {
        var _load3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(vizpath) {
          var editor, canvas, _this$options2, grid, gridSize, gridStyle, pattern;
          return _regeneratorRuntime().wrap(function _callee8$(_context8) {
            while (1) switch (_context8.prev = _context8.next) {
              case 0:
                editor = vizpath.context.find(Editor$1);
                if (editor) {
                  _context8.next = 3;
                  break;
                }
                return _context8.abrupt("return");
              case 3:
                canvas = editor.canvas;
                if (canvas) {
                  _context8.next = 6;
                  break;
                }
                return _context8.abrupt("return");
              case 6:
                _this$options2 = this.options, grid = _this$options2.grid, gridSize = _this$options2.gridSize, gridStyle = _this$options2.gridStyle;
                if (!(grid && gridSize > 0)) {
                  _context8.next = 11;
                  break;
                }
                pattern = new fabric.fabric.Group([new fabric.fabric.Line([0, 0, gridSize, 0], gridStyle), new fabric.fabric.Line([0, 0, 0, gridSize], gridStyle)]);
                _context8.next = 11;
                return new Promise(function (resolve) {
                  var image = new Image();
                  image.onload = function () {
                    canvas.setBackgroundColor(new fabric.fabric.Pattern({
                      source: image,
                      repeat: 'repeat',
                      offsetX: -(canvas.getWidth() % gridSize) / 2,
                      offsetY: -(canvas.getHeight() % gridSize) / 2
                    }), function () {
                      canvas.requestRenderAll();
                      resolve();
                    });
                  };
                  image.src = pattern.toDataURL({});
                });
              case 11:
              case "end":
                return _context8.stop();
            }
          }, _callee8, this);
        }));
        function load(_x8) {
          return _load3.apply(this, arguments);
        }
        return load;
      }()
    }]);
  }(EditorModule);
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
        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))) {
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
  var EditorShortcut = /*#__PURE__*/function (_EditorModule5) {
    function EditorShortcut(options) {
      var _this37;
      _classCallCheck(this, EditorShortcut);
      _this37 = _callSuper(this, EditorShortcut);
      _this37.shortcuts = [];
      _this37.shortcutOptions = options;
      return _this37;
    }
    /**
     * 初始默认快捷键配置
     */
    _inherits(EditorShortcut, _EditorModule5);
    return _createClass(EditorShortcut, [{
      key: "_getDefaultShortcutOptions",
      value: function _getDefaultShortcutOptions(vizpath) {
        return [
        // 删除节点快捷键
        {
          key: 'backspace',
          onActivate: function onActivate(e) {
            e.preventDefault();
            var editor = vizpath.context.find(Editor$1);
            if (!editor) return;
            // 如果当前有选中曲线控制点
            if (editor.activePoint) {
              editor.remove(editor.activePoint);
            } else if (editor.activeNodes.length) {
              editor.remove.apply(editor, _toConsumableArray(editor.activeNodes));
            }
          }
        },
        // 全选节点快捷键
        {
          key: 'A',
          combinationKeys: ['meta'],
          onActivate: function onActivate(e) {
            e.preventDefault();
            var editor = vizpath.context.find(Editor$1);
            if (!editor) return;
            editor.focus.apply(editor, _toConsumableArray(editor.nodes));
          }
        },
        // 取消节点选择
        {
          key: 'D',
          combinationKeys: ['meta'],
          onActivate: function onActivate(e) {
            e.preventDefault();
            var editor = vizpath.context.find(Editor$1);
            if (!editor) return;
            editor.focus();
          }
        },
        // 更改路径节点交互模式
        {
          combinationKeys: ['alt'],
          onActivate: function onActivate() {
            var editor = vizpath.context.find(Editor$1);
            if (!editor) return;
            if (editor.setting.mode === 'move') {
              editor.setting.mode = 'convert';
              editor.setting.forcePointSymmetric = 'entire';
            }
          },
          onDeactivate: function onDeactivate() {
            var editor = vizpath.context.find(Editor$1);
            if (!editor) return;
            editor.setting.mode = 'move';
            editor.setting.forcePointSymmetric = 'angle';
          }
        }, {
          combinationKeys: ['alt', 'ctrl'],
          onActivate: function onActivate() {
            var editor = vizpath.context.find(Editor$1);
            if (!editor) return;
            if (editor.setting.mode === 'move') {
              editor.setting.mode = 'convert';
              editor.setting.forcePointSymmetric = 'none';
            }
          },
          onDeactivate: function onDeactivate() {
            var editor = vizpath.context.find(Editor$1);
            if (!editor) return;
            editor.setting.mode = 'move';
            editor.setting.forcePointSymmetric = 'angle';
          }
        },
        // 更改为添加模式
        {
          combinationKeys: ['shift'],
          onActivate: function onActivate() {
            var editor = vizpath.context.find(Editor$1);
            if (!editor) return;
            if (editor.setting.mode === 'move') {
              editor.setting.mode = 'add';
              editor.setting.forcePointSymmetric = 'entire';
            }
          },
          onDeactivate: function onDeactivate() {
            var editor = vizpath.context.find(Editor$1);
            if (!editor) return;
            editor.setting.mode = 'move';
            editor.setting.forcePointSymmetric = 'angle';
          }
        }];
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
          (_b = (_a = this.activeShortcut).onDeactivate) === null || _b === void 0 ? void 0 : _b.call(_a, e);
          this.activeShortcut = undefined;
        }
      }
    }, {
      key: "_handleShortcutKey",
      value: function _handleShortcutKey(e) {
        var _a, _b, _c, _d;
        // 寻找所有匹配的按键
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
        if (this.activeShortcut === shortcut) {
          (_a = this.activeShortcut) === null || _a === void 0 ? void 0 : _a.onActivate(e);
          return;
        }
        (_c = (_b = this.activeShortcut) === null || _b === void 0 ? void 0 : _b.onDeactivate) === null || _c === void 0 ? void 0 : _c.call(_b, e);
        this.activeShortcut = shortcut;
        (_d = this.activeShortcut) === null || _d === void 0 ? void 0 : _d.onActivate(e);
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
      value: function unload(vizpath) {
        var editor = vizpath.context.find(Editor$1);
        if (!editor) return;
        editor.removeGlobalEvent('keydown', this._handleShortcutKey.bind(this));
        editor.removeGlobalEvent('keyup', this._handleShortcutKey.bind(this));
        editor.removeGlobalEvent('blur', this._handlePageDeactivate.bind(this));
        this.shortcuts.length = 0;
        this.activeShortcut = undefined;
      }
    }, {
      key: "load",
      value: function load(vizpath) {
        var _a;
        var editor = vizpath.context.find(Editor$1);
        if (!editor) return;
        this.shortcuts = ((_a = this.shortcutOptions) !== null && _a !== void 0 ? _a : this._getDefaultShortcutOptions(vizpath)).map(this._tryGetValidShortcut.bind(this)).filter(Boolean);
        editor.addGlobalEvent('keydown', this._handleShortcutKey.bind(this));
        editor.addGlobalEvent('keyup', this._handleShortcutKey.bind(this));
        editor.addGlobalEvent('blur', this._handlePageDeactivate.bind(this));
      }
    }]);
  }(EditorModule);
  EditorShortcut.ID = 'editor-shortcut';

  var defaultTheme = function defaultTheme(editor, shareState) {
    editor.on('selected', function (nodes, point) {
      var _a, _b;
      shareState.selectedNodes = nodes;
      shareState.selectedPoint = point;
      if (point) {
        shareState.selectedLine = (_b = (_a = editor.curveDots.find(function (i) {
          return i.point === point;
        })) === null || _a === void 0 ? void 0 : _a.line) !== null && _b !== void 0 ? _b : null;
      }
    });
    editor.on('deselected', function () {
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
          shareState.hoverLine = (_b = (_a = editor.curveDots.find(function (i) {
            return i.point === circle;
          })) === null || _a === void 0 ? void 0 : _a.line) !== null && _b !== void 0 ? _b : null;
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

  const EXAMPLE_PATH_D = {
      arc: 'M 88.827 199.088 Q 258.533 199.088 258.533 368.794',
      point: 'M 100 100 z',
      polyline: 'M 40 40 L 160 40 L 40 100 L 160 100 L 40 160 L 160 160',
      circle: 'M91 26.5C91 62.1223 62.1223 91 26.5 91S-38 62.1223 -38 26.5S-9.1223 -38 26.5 -38S91 -9.1223 91 26.5z',
      bubble: 'M5 -39c-29.8233 0 -54 24.1767 -54 54c0 22.3749 13.6084 41.5716 33 49.7646V93L16.0001 69H50c29.8233 0 54 -24.1767 54 -54S79.8233 -39 50 -39H5z',
      shapes: 'L-188.7846 -47L-100.923 97H-256.3538 z M91 26.5C91 62.1223 62.1223 91 26.5 91S-38 62.1223 -38 26.5S-9.1223 -38 26.5 -38S91 -9.1223 91 26.5z',
      heart: 'M,-108.5,-211.5 C,-175.5,-211.5,-228.5,-157.5,-228.5,-91.5 C,-228.5,43.5,-92.5,78.5,-0.5,211.5 C,87.5,79.5,228.5,38.5,228.5,-91.5 C,228.5,-157.5,174.5,-211.5,108.5,-211.5 C,60.5,-211.5,18.5,-183.5,-0.5,-142.5 C,-19.5,-183.5,-60.5,-211.5,-108.5,-211.5 z',
      banana: 'M 8,223 c 0,0 143,3 185,-181 c 2,-11 -1,-20 1,-33 h 16 c 0,0 -3,17 1,30 c 21,68 -4,242 -204,196 L 8,223 z M 8,230 c 0,0 188,40 196,-160',
      test: 'M -150 50 z M 0 0 Q 50 0 50 50 Q 50 100 0 100 Q -50 100 -50 50 Q -50 0 0 0 z M 80 0 L 180 0 L 80 50 L 180 50 L 80 100 L 180 100',
      favicon: 'M 295.233 250.642 L 390.393 281.854 C 391.402 282.189 392.1 283.112 392.145 284.174 C 392.191 285.236 391.575 286.216 390.598 286.636 L 346.157 305.682 L 326.998 350.39 C 326.586 351.364 325.619 351.985 324.562 351.953 C 323.506 351.921 322.578 351.243 322.226 350.247 L 288.823 257.237 C 288.163 255.397 288.609 253.342 289.971 251.94 C 291.334 250.539 293.375 250.035 295.233 250.642 L 295.233 250.642 Z M 346.72 156.24 C 362.4 156.244 375.375 168.438 376.351 184.088 C 377.327 199.738 365.967 213.449 350.408 215.401 C 334.85 217.353 320.456 206.872 317.536 191.465 C 278.386 195.181 245.902 223.319 236.64 261.538 C 249.18 267.502 255.91 281.363 252.842 294.906 C 249.773 308.449 237.726 318.055 223.84 318.032 C 208.938 318.053 196.329 307.026 194.362 292.256 C 192.396 277.485 201.68 263.543 216.068 259.664 C 226.553 210.348 269.336 172.951 321.232 170.678 C 326.595 161.716 336.275 156.232 346.72 156.24 Z M 223.84 277.072 C 219.816 277.072 216.097 279.219 214.085 282.704 C 212.073 286.189 212.073 290.483 214.085 293.968 C 216.097 297.453 219.816 299.6 223.84 299.6 C 230.061 299.6 235.104 294.557 235.104 288.336 C 235.104 282.115 230.061 277.072 223.84 277.072 Z M 346.72 174.672 C 342.696 174.672 338.977 176.819 336.965 180.304 C 334.953 183.789 334.953 188.083 336.965 191.568 C 338.977 195.053 342.696 197.2 346.72 197.2 C 352.941 197.2 357.984 192.157 357.984 185.936 C 357.984 179.715 352.941 174.672 346.72 174.672 L 346.72 174.672 Z',
  };
  (async () => {
      // 取得上传文件输入框
      const uploader = document.getElementById('upload');
      // 取得容器节点
      const container = document.getElementsByTagName('main')[0];
      // 创建画布节点
      const canvas = document.createElement('canvas');
      container.appendChild(canvas);
      // 添加容器尺寸更改监听
      new ResizeObserver(() => {
          fabricCanvas.setDimensions({
              width: container.clientWidth,
              height: container.clientHeight,
          });
          fabricCanvas.renderAll();
      }).observe(container);
      // 创建fabric画布
      const fabricCanvas = new fabric.fabric.Canvas(canvas, {
          width: container.clientWidth,
          height: container.clientHeight,
          selectionBorderColor: '#ccc',
          selectionColor: 'rgba(150, 150, 150, 0.3)',
          // selection: false,
      });
      // fabricCanvas.setViewportTransform([0.5, 0, 0, 0.5, 100, 100]);
      const path = new fabric.fabric.Path(EXAMPLE_PATH_D.test, {
          objectCaching: false,
          noScaleCache: false,
          fill: '#e1e1e1',
          strokeWidth: 2,
          originX: 'center',
          originY: 'center',
          left: fabricCanvas.getWidth() / 2,
          top: fabricCanvas.getHeight() / 2,
          // angle: 45,
          scaleX: 1.2,
          scaleY: 1.2,
      });
      fabricCanvas.add(path);
      // let pathText = new fabric.Text(
      //   'The shortest way to do many things is to only one thing at a time.',
      //   {
      //     fontSize: 20,
      //     // @ts-ignore
      //     path: path as any,
      //     pathAlign: 'center',
      //     pathSide: 'left',
      //     left: fabricCanvas.getWidth() / 2,
      //     top: fabricCanvas.getHeight() / 2,
      //     originX: 'center',
      //     originY: 'center',
      //     objectCaching: false,
      //     noScaleCache: false,
      //     // backgroundColor: 'pink',
      //     // angle: 45,
      //     // scaleX: 0.5,
      //     // scaleY: 0.5,
      //   }
      // );
      // fabricCanvas.add(pathText);
      fabricCanvas.renderAll();
      const vizpath = new VizPathCreator({
          refreshPathTriggerTime: 'auto',
          refreshDeferDuration: 10,
      });
      const editor = new Editor$1(fabricCanvas, true);
      const operator = await vizpath
          .use(editor)
          .use(new EditorBackground())
          .use(new EditorBezier())
          .use(new EditorUI(defaultTheme, {
          hoverNode: null,
          hoverPoint: null,
          hoverLine: null,
          selectedNodes: [],
          selectedPoint: null,
          selectedLine: null,
      }, (state) => {
          // 监听状态变化
      }))
          .use(new EditorShortcut())
          .initialize();
      // // ① 通过路径指令直接绘制
      // const path1 = VizPath.parsePathData(EXAMPLE_PATH_D.test, {
      //   left: pathText.left,
      //   top: pathText.top,
      //   originX: pathText.originX,
      //   originY: pathText.originY,
      //   angle: pathText.angle,
      //   scaleX: pathText.scaleX,
      //   scaleY: pathText.scaleY,
      // });
      // operator.draw(path1);
      // operator.on('update', () => {
      //   const d = operator.getPathData(operator.paths);
      //   // 更新旧的路径信息
      //   path.initialize(d as any);
      //   pathText.initialize(pathText.text as any);
      //   // 创建参考路径对象并设置新的对象位置
      //   const referencePath = new fabric.Path(d);
      //   pathText.setPositionByOrigin(
      //     referencePath.getCenterPoint(),
      //     'center',
      //     'center'
      //   );
      //   // 提取出的路径信息会将缩放和旋转数据一并计算在内，所以需要重置状态
      //   pathText.set({
      //     scaleX: 1,
      //     scaleY: 1,
      //     angle: 0,
      //   })
      //   fabricCanvas.requestRenderAll();
      // });
      // ② 通过路径对象绘制
      const path2 = VizPathCreator.parseFabricPath(path);
      operator.draw(path2);
      operator.on('update', () => {
          var _a;
          const d = operator.getPathData(operator.paths);
          path.set({
              scaleX: 1,
              scaleY: 1,
              angle: 0,
          });
          path.initialize(d);
          (_a = path.canvas) === null || _a === void 0 ? void 0 : _a.renderAll();
          // const d = operator.getPathData(operator.paths);
          // // 更新旧的路径信息
          // path.initialize(d as any);
          // // 创建参考路径对象并设置新的对象位置
          // const referencePath = new fabric.Path(d);
          // path.setPositionByOrigin(
          //   referencePath.getCenterPoint(),
          //   'center',
          //   'center'
          // );
          // // 提取出的路径信息会将缩放和旋转数据一并计算在内，所以需要重置状态
          // path.set({
          //   scaleX: 1,
          //   scaleY: 1,
          //   angle: 0,
          // })
          // fabricCanvas.renderAll();
      });
      // ③ 通过URL绘制
      // const svgURL = 'https://storage.sunzi.cool/image-template/2100d3fa-fbf0-4e7e-aa32-7afcf764fb62.svg';
      // const svgURL = 'https://sunzi-cool.maiyuan.online/image-template/d306e5f3-2c30-4599-b8a5-5348de226350.svg';
      // const paths = await VizPath.parsePathFile(svgURL, {
      //   left: fabricCanvas.getWidth() / 2,
      //   top: fabricCanvas.getHeight() / 2,
      //   originX: 'center',
      //   originY: 'center',
      //   scaleX: 1.2,
      //   scaleY: 1.2
      // });
      // paths?.forEach((path) => {
      //   operator.draw(path);
      // })
      // ④ 快速使用
      // const path = VizPath.parsePathData(EXAMPLE_PATH_D.bubble, {
      //   left: fabricCanvas.getWidth() / 2,
      //   top: fabricCanvas.getHeight() / 2,
      //   originX: 'center',
      //   originY: 'center'
      // });
      // operator.draw(path);
      // 上传input
      uploader.onchange = async (e) => {
          var _a, _b;
          const file = ((_b = (_a = e.target) === null || _a === void 0 ? void 0 : _a.files) !== null && _b !== void 0 ? _b : [])[0];
          if (!file)
              return;
          operator.clearAll();
          const url = URL.createObjectURL(file);
          const paths = await VizPathCreator.parsePathFile(url, {
              left: fabricCanvas.getWidth() / 2,
              top: fabricCanvas.getHeight() / 2,
              originX: 'center',
              originY: 'center',
          });
          paths === null || paths === void 0 ? void 0 : paths.forEach((path) => {
              operator.draw(path);
          });
      };
      // 操作测试
      // const editorNode = vizpath.find(EditorNode);
      // if (!editorNode) return;
      // editorNode.focus(editorNode.nodes[3]);
      // const object = editorNode.add({ left: 100, top: 100 });
      // editorNode.focus(object);
      // editorNode.remove();
      // operator.move(operator.paths[0][0].node, { x: 200, y: 200 })
  })();

})(fabric);
