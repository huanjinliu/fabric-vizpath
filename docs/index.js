
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
  var objectProto$d = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$a = objectProto$d.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$d.toString;

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
    var isOwn = hasOwnProperty$a.call(value, symToStringTag$1),
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
  var objectProto$c = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto$c.toString;

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
  var funcProto$1 = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

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
        return funcToString$1.call(func);
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
  var funcProto = Function.prototype,
    objectProto$b = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty$9).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

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
  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto$a = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

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
      return result === HASH_UNDEFINED$1 ? undefined : result;
    }
    return hasOwnProperty$8.call(data, key) ? data[key] : undefined;
  }

  /** Used for built-in method references. */
  var objectProto$9 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

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
    return nativeCreate ? data[key] !== undefined : hasOwnProperty$7.call(data, key);
  }

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

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
    data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
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
  var objectProto$8 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

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
    if (!(hasOwnProperty$6.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
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
  var argsTag$2 = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag$2;
  }

  /** Used for built-in method references. */
  var objectProto$7 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable;

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
    return isObjectLike(value) && hasOwnProperty$5.call(value, 'callee') && !propertyIsEnumerable$1.call(value, 'callee');
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
  var argsTag$1 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    boolTag$2 = '[object Boolean]',
    dateTag$2 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag$4 = '[object Map]',
    numberTag$2 = '[object Number]',
    objectTag$2 = '[object Object]',
    regexpTag$2 = '[object RegExp]',
    setTag$4 = '[object Set]',
    stringTag$2 = '[object String]',
    weakMapTag$2 = '[object WeakMap]';
  var arrayBufferTag$2 = '[object ArrayBuffer]',
    dataViewTag$3 = '[object DataView]',
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
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] = typedArrayTags[weakMapTag$2] = false;

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
  var objectProto$6 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

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
      if ((inherited || hasOwnProperty$4.call(value, key)) && !(skipIndexes && (
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
  var objectProto$5 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$5;
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
  var objectProto$4 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

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
      if (hasOwnProperty$3.call(object, key) && key != 'constructor') {
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
  var objectProto$3 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

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
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$2.call(object, key)))) {
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
  var objectProto$2 = Object.prototype;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;

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
  var Set = getNative(root, 'Set');

  /* Built-in method references that are verified to be native. */
  var WeakMap$1 = getNative(root, 'WeakMap');

  /** `Object#toString` result references. */
  var mapTag$3 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$3 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';
  var dataViewTag$2 = '[object DataView]';

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map$1),
    promiseCtorString = toSource(Promise$1),
    setCtorString = toSource(Set),
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
  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$2 || Map$1 && getTag(new Map$1()) != mapTag$3 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set && getTag(new Set()) != setTag$3 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag$1) {
    getTag = function getTag(value) {
      var result = baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag$2;
          case mapCtorString:
            return mapTag$3;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag$3;
          case weakMapCtorString:
            return weakMapTag$1;
        }
      }
      return result;
    };
  }
  var getTag$1 = getTag;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

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
    if (length && typeof array[0] == 'string' && hasOwnProperty$1.call(array, 'index')) {
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
  var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;

  /**
   * Creates a clone of the `symbol` object.
   *
   * @private
   * @param {Object} symbol The symbol object to clone.
   * @returns {Object} Returns the cloned symbol object.
   */
  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
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
  var boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    mapTag$2 = '[object Map]',
    numberTag$1 = '[object Number]',
    regexpTag$1 = '[object RegExp]',
    setTag$2 = '[object Set]',
    stringTag$1 = '[object String]',
    symbolTag$2 = '[object Symbol]';
  var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
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
      case arrayBufferTag$1:
        return cloneArrayBuffer(object);
      case boolTag$1:
      case dateTag$1:
        return new Ctor(+object);
      case dataViewTag$1:
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
      case mapTag$2:
        return new Ctor();
      case numberTag$1:
      case stringTag$1:
        return new Ctor(object);
      case regexpTag$1:
        return cloneRegExp(object);
      case setTag$2:
        return new Ctor();
      case symbolTag$2:
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
  var mapTag$1 = '[object Map]';

  /**
   * The base implementation of `_.isMap` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   */
  function baseIsMap(value) {
    return isObjectLike(value) && getTag$1(value) == mapTag$1;
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
  var setTag$1 = '[object Set]';

  /**
   * The base implementation of `_.isSet` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   */
  function baseIsSet(value) {
    return isObjectLike(value) && getTag$1(value) == setTag$1;
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
  var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag$1 = '[object Symbol]',
    weakMapTag = '[object WeakMap]';
  var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
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
  cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;

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
      if (tag == objectTag || tag == argsTag || isFunc && !object) {
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
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

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
        if (value === undefined || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
          object[key] = source[key];
        }
      }
    }
    return object;
  });

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
  var symbolTag = '[object Symbol]';

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
    return _typeof(value) == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
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
  var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

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
                var d = rx && ry ? [['M', rx + x, y], ['h', w - 2 * rx], ['a', rx, ry, 0, 0, 1, rx, ry], ['v', h - 2 * ry], ['a', rx, ry, 0, 0, 1, -rx, ry], ['h', -w + 2 * rx], ['a', rx, ry, 0, 0, 1, -rx, -ry], ['v', -h + 2 * ry], ['a', rx, ry, 0, 0, 1, rx, -ry], ['z']] : [['M', x, y], ['h', w], ['v', h], ['h', -w], ['v', -h], ['z']];
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
                var d = [['M', x - rx, y], ['A', rx, ry, 0, 0, 0, x + rx, y], ['A', rx, ry, 0, 0, 0, x - rx, y], ['z']];
                return new fabric.fabric.Path(d);
              };
              /** 转化类多边形形状 */
              var convertPolygonPath = function convertPolygonPath(points) {
                var d = points.map(function (point) {
                  return ['L', point.x, point.y];
                });
                d[0][0] = 'M';
                if (type === 'polygon') {
                  d.push(['z']);
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
    var section = path.path;
    section.forEach(function (item, pathIdx) {
      var _item = _toArray(item),
        croods = _item.slice(1);
      for (var i = 0; i < croods.length; i += 2) {
        var _transform = transform({
            x: section[pathIdx][i + 1],
            y: section[pathIdx][i + 2]
          }, [{
            translate: {
              x: -path.pathOffset.x,
              y: -path.pathOffset.y
            }
          }]),
          x = _transform.x,
          y = _transform.y;
        section[pathIdx][i + 1] = x;
        section[pathIdx][i + 2] = y;
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
   * fabric.Path对象直接改内部路径指令，只能更新其路径渲染师正确的，但对象本身的尺寸和偏移信息都是错误的，
   * 需要使用initialize重新初始化路径，获取正确的尺寸，但是偏移是错的，该方法同时修正偏移。
   */
  var reinitializePath = function reinitializePath(path) {
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
    var d = fabric.fabric.util.joinPath(instructions);
    // 更新路径尺寸
    path.initialize(d);
    path.path = instructions;
    // 计算路径偏移差值
    var distance = fabric.fabric.util.transformPoint(new fabric.fabric.Point(path.pathOffset.x - (path.width - oldInfo.width) / 2 - oldInfo.pathOffset.x, path.pathOffset.y - (path.height - oldInfo.height) / 2 - oldInfo.pathOffset.y), [].concat(_toConsumableArray(path.calcOwnMatrix().slice(0, 4)), [0, 0]));
    // 设置回正确的偏移位置
    path.set({
      left: oldInfo.left + distance.x,
      top: oldInfo.top + distance.y
    });
    path.setCoords();
  };

  /**
   * 获取二阶曲线的三阶表现
   */
  var getCubicFromQuadratic = function getCubicFromQuadratic(p0, instruction) {
    // 如果不是二阶直接返回
    if (instruction[0] !== 'Q') return cloneDeep(instruction);
    // 解析输入字符串
    var points = Array.from({
      length: 2
    }).map(function (_, i) {
      return {
        x: instruction[i * 2 + 1],
        y: instruction[i * 2 + 2]
      };
    });
    // 二阶贝塞尔曲线的点
    var _points = _slicedToArray(points, 2),
      p1 = _points[0],
      p2 = _points[1];
    // 计算三阶贝塞尔曲线的控制点
    var q1 = {
      x: 2 / 3 * p1.x + 1 / 3 * p0.x,
      y: 2 / 3 * p1.y + 1 / 3 * p0.y
    };
    var q2 = {
      x: 2 / 3 * p1.x + 1 / 3 * p2.x,
      y: 2 / 3 * p1.y + 1 / 3 * p2.y
    };
    var q3 = p2;
    // 创建三阶贝塞尔曲线指令
    return ['C', q1.x, q1.y, q2.x, q2.y, q3.x, q3.y];
  };
  var VizPathSymbalType;
  (function (VizPathSymbalType) {
    VizPathSymbalType["PATH"] = "path";
    VizPathSymbalType["NODE"] = "node";
    VizPathSymbalType["CONTROLLER_POINT"] = "controller-point";
    VizPathSymbalType["CONTROLLER_LINE"] = "controller-line";
  })(VizPathSymbalType || (VizPathSymbalType = {}));
  /**
   * VizPath (Visualization Path，可视化路径)
   */
  var VizPath = /*#__PURE__*/function () {
    function VizPath(context) {
      _classCallCheck(this, VizPath);
      /**
       * 可视化路径
       */
      this.path = null;
      /**
       * 路径信息（包含路径分段、路径指令、关键点及控制点信息）
       */
      this.pathway = [];
      /**
       * 路径信息映射
       */
      this.pathwayNodeMap = new WeakMap([]);
      /**
       * 监听事件
       */
      this.events = {};
      this.context = context;
    }
    /**
     * 获取指令中的关键节点
     *
     * @note 闭合指令无关键节点
     */
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
        var _this = this;
        var observes = [];
        var temporaryIgnoreIds = [];
        var proxy = new Proxy(crood, {
          set: function set(target, p, value, receiver) {
            if (p === 'x' || p === 'y') {
              var oldValue = target[p];
              var newValue = round(value, 4);
              var result = Reflect.set(target, p, newValue, receiver);
              if (oldValue !== newValue) {
                var x = p === 'x' ? newValue : target.x;
                var y = p === 'y' ? newValue : target.y;
                var _iterator = _createForOfIteratorHelper(observes),
                  _step;
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var _observe = _step.value;
                    if (_observe.id && temporaryIgnoreIds.length && temporaryIgnoreIds.indexOf(_observe.id) !== -1) continue;
                    _observe.handler(x, y);
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
                _this._fire('update', proxy);
              }
              return result;
            } else {
              return Reflect.set(target, p, value, receiver);
            }
          }
        });
        proxy.set = function (crood) {
          var skipObserverIDs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
          if (_typeof(crood) !== 'object') return;
          if (Array.isArray(skipObserverIDs)) {
            temporaryIgnoreIds = skipObserverIDs.filter(Boolean);
          }
          proxy.x = crood.x;
          proxy.y = crood.y;
          temporaryIgnoreIds = [];
        };
        proxy.observe = function (handler) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var immediate = options.immediate,
            id = options.id;
          if (immediate) handler(crood.x, crood.y);
          observes.push({
            handler: handler,
            id: id
          });
        };
        proxy.unobserve = function (id) {
          if (!id) {
            observes.length = 0;
            return;
          }
          observes = observes.filter(function (i) {
            return i.id !== id;
          });
        };
        return proxy;
      }
      /**
       * 是否是闭合路径段
       * @param section 路径段
       */
    }, {
      key: "isClosePath",
      value: function isClosePath(section) {
        var _a;
        return ((_a = section[section.length - 1]) === null || _a === void 0 ? void 0 : _a.instruction[0]) === InstructionType.CLOSE;
      }
      /**
       * 获取前后的指令节点信息
       * @param pathwayNode 路径节点
       * @param cycle 闭合路径是否开启循环查找
       */
    }, {
      key: "getNeighboringNodes",
      value: function getNeighboringNodes(pathwayNode) {
        var cycle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var section = pathwayNode.section;
        var index = section.indexOf(pathwayNode);
        var pre = section[index - 1];
        var next = section[index + 1];
        // 是否循环并且是闭合路径
        if (cycle && this.isClosePath(section)) {
          // 如果没有上一个指令，则倒数第二个指令视为上一个指令
          if (!pre) {
            pre = section[section.length - 2];
          }
          // 如果没有下一个指令，则起始指令视为下一个指令
          if (!next) {
            pre = section[0];
          }
          // 如果有下一个指令但下一个指令是闭合指令，则指向起始指令
          if (next && next.instruction[0] === InstructionType.CLOSE) {
            next = section[0];
          }
        }
        return {
          pre: pre,
          next: next
        };
      }
      /**
       * 获取更多周围的控制点信息（前、后、上一关键点后、下一关键点前），默认循环查找
       */
    }, {
      key: "getMoreNeighboringNodes",
      value: function getMoreNeighboringNodes(pathwayNode) {
        var nodes = [];
        var cur = pathwayNode;
        var _this$getNeighboringN = this.getNeighboringNodes(cur, true),
          pre = _this$getNeighboringN.pre,
          next = _this$getNeighboringN.next;
        // 特殊情况1：当前是起始节点
        if (cur.instruction[0] === InstructionType.START) {
          if (pre) {
            var _this$getNeighboringN2 = this.getNeighboringNodes(pre, true),
              ppre = _this$getNeighboringN2.pre;
            if (ppre) nodes.push(['pre-next', ppre]);
            nodes.push(['cur-pre', pre]);
          }
          nodes.push(['cur-next', cur]);
          if (next) nodes.push(['next-pre', next]);
        }
        // 特殊情况2：当前是自动闭合路径的闭合前节点
        else if ((next === null || next === void 0 ? void 0 : next.instruction[0]) === InstructionType.CLOSE) {
          var start = pathwayNode.section[0];
          var nnext = pathwayNode.section[1];
          if (pre) nodes.push(['pre-next', pre]);
          nodes.push(['cur-pre', cur]);
          nodes.push(['cur-next', start]);
          if (nnext) nodes.push(['next-pre', nnext]);
        }
        // 正常情况
        else {
          if (pre) nodes.push(['pre-next', pre]);
          nodes.push(['cur-pre', cur]);
          nodes.push(['cur-next', cur]);
          if (next) nodes.push(['next-pre', next]);
        }
        return nodes;
      }
      /**
       * 绘制路径，建立节点与指令的关联关系，使之可以通过直接控制控制路径及点位信息来控制指令变化
       * @param pathway 路径信息
       */
    }, {
      key: "draw",
      value: function draw(pathway) {
        var _this2 = this;
        pathway.forEach(function (_ref3) {
          var section = _ref3.section,
            originPath = _ref3.originPath;
          var _section = [];
          section.forEach(function (item) {
            var instruction = item.instruction;
            var proxyItem = {
              section: _section,
              instruction: instruction
            };
            // 关键点
            var node = VizPath.getInstructionNodeCrood(instruction);
            if (node) {
              var responsiveNode = _this2._toResponsive(node);
              responsiveNode.observe(function (x, y) {
                instruction[instruction.length - 2] = x;
                instruction[instruction.length - 1] = y;
              });
              proxyItem.node = responsiveNode;
              _this2.pathwayNodeMap.set(proxyItem.node, proxyItem);
            }
            // 指令控制点
            var _this2$getNeighboring = _this2.getNeighboringNodes(item),
              next = _this2$getNeighboring.next;
            var controllers = {};
            if ((item === null || item === void 0 ? void 0 : item.instruction[0]) === InstructionType.BEZIER_CURVE) {
              controllers.pre = _this2._toResponsive({
                x: item.instruction[3],
                y: item.instruction[4]
              });
              controllers.pre.observe(function (x, y) {
                item.instruction[3] = x;
                item.instruction[4] = y;
              });
            }
            if ((next === null || next === void 0 ? void 0 : next.instruction[0]) === InstructionType.BEZIER_CURVE) {
              controllers.next = _this2._toResponsive({
                x: next.instruction[1],
                y: next.instruction[2]
              });
              controllers.next.observe(function (x, y) {
                next.instruction[1] = x;
                next.instruction[2] = y;
              });
            }
            proxyItem.controllers = controllers;
            _section.push(proxyItem);
          });
          _this2.pathway.push({
            section: _section,
            originPath: originPath
          });
        });
        this._fire('draw', pathway);
      }
      /**
       * 使用新的路径信息绘制旧路径，多个路径段则会使原路径拆分成多个
       */
    }, {
      key: "drawWithNewSections",
      value: function drawWithNewSections(pathway, sections) {
        var originPath = pathway.originPath;
        var _parsePathJSON = parsePathJSON(originPath),
          styles = _parsePathJSON.styles,
          layout = _parsePathJSON.layout;
        var newPaths = sections.map(function (section) {
          var path = new fabric.fabric.Path(fabric.fabric.util.joinPath(originPath.path));
          path.set(Object.assign(Object.assign({}, styles), layout));
          path.path = section;
          reinitializePath(path);
          var _section = [];
          section.forEach(function (instruction) {
            _section.push({
              section: _section,
              instruction: instruction
            });
          });
          return {
            section: _section,
            originPath: path
          };
        });
        this.clear(originPath);
        this.draw(newPaths);
      }
      /**
       * 清除路径
       */
    }, {
      key: "clear",
      value: function clear(target) {
        var _this3 = this;
        var index = target instanceof fabric.fabric.Path ? this.pathway.findIndex(function (i) {
          return i.originPath === target;
        }) : this.pathway.findIndex(function (i) {
          return i.section === target;
        });
        if (index === -1) return;
        var pathway = this.pathway[index];
        pathway.section.forEach(function (_ref4) {
          var node = _ref4.node,
            controllers = _ref4.controllers;
          var _a, _b;
          if (!node) return;
          node.unobserve();
          (_a = controllers === null || controllers === void 0 ? void 0 : controllers.pre) === null || _a === void 0 ? void 0 : _a.unobserve();
          (_b = controllers === null || controllers === void 0 ? void 0 : controllers.next) === null || _b === void 0 ? void 0 : _b.unobserve();
          _this3.pathwayNodeMap["delete"](node);
        });
        this.pathway.splice(index, 1);
        this._fire('clear', [pathway]);
      }
      /**
       * 清除所有路径
       */
    }, {
      key: "clearAll",
      value: function clearAll() {
        this.pathway.forEach(function (_ref5) {
          var section = _ref5.section;
          section.forEach(function (_ref6) {
            var node = _ref6.node,
              controllers = _ref6.controllers;
            var _a, _b;
            node === null || node === void 0 ? void 0 : node.unobserve();
            (_a = controllers === null || controllers === void 0 ? void 0 : controllers.pre) === null || _a === void 0 ? void 0 : _a.unobserve();
            (_b = controllers === null || controllers === void 0 ? void 0 : controllers.next) === null || _b === void 0 ? void 0 : _b.unobserve();
          });
        });
        this.pathway = [];
        this.pathwayNodeMap = new WeakMap([]);
        this._fire('clearAll');
      }
      /**
       * 监听事件
       * @param eventName 事件名
       * @param callback 回调
       */
    }, {
      key: "on",
      value: function on(eventName, callback) {
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
      value: function off(eventName, callback) {
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
      key: "_fire",
      value: function _fire(eventName) {
        var handlers = this.events[eventName];
        if (!handlers) return;
        for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          data[_key - 1] = arguments[_key];
        }
        var _iterator2 = _createForOfIteratorHelper(handlers),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var callback = _step2.value;
            callback.apply(void 0, data);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      /**
       * 移动控制点
       */
    }, {
      key: "move",
      value: function move(target, crood) {
        if (target.x === crood.x && target.y === crood.y) return;
        target.x = crood.x;
        target.y = crood.y;
      }
      /**
       * 移除关键点
       *
       * @note
       *
       * ① 只有一个删除节点时，删除节点前后线段
       * ② 有多个删除节点，仅删除节点间的线段
       */
    }, {
      key: "remove",
      value: function remove() {
        var _this4 = this;
        for (var _len2 = arguments.length, targets = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          targets[_key2] = arguments[_key2];
        }
        // 找出需要删除的路径和指令索引映射，便于后续同路径下节点的批量操作
        var sectionIndexMap = targets.reduce(function (maps, target) {
          var _a;
          var pathwayNode = _this4.pathwayNodeMap.get(target);
          if (!pathwayNode) return maps;
          var section = pathwayNode.section,
            instruction = pathwayNode.instruction;
          var indexes = (_a = maps.get(section)) !== null && _a !== void 0 ? _a : [];
          var index = section.findIndex(function (i) {
            return i.instruction === instruction;
          });
          indexes.push(index);
          maps.set(section, indexes);
          return maps;
        }, new Map([]));
        var needRemoveSections = Array.from(sectionIndexMap).map(function (item) {
          var _item2 = _slicedToArray(item, 2),
            section = _item2[0],
            indexes = _item2[1];
          indexes.sort();
          var isMultipleRemove = indexes.length > 1;
          var isIncludeStartNode = indexes[0] === 0;
          var isClosePath = section[section.length - 1].instruction[0] === InstructionType.CLOSE;
          if (isMultipleRemove && isIncludeStartNode && isClosePath) indexes.push(section.length - 2);
          return item;
        });
        var sections = needRemoveSections.map(function (_ref7) {
          var _ref8 = _slicedToArray(_ref7, 2),
            section = _ref8[0],
            indexes = _ref8[1];
          var _a;
          var isClosePath = _this4.isClosePath(section);
          // 如果路径所有点都在删除列表列表中，直接移除整个路径
          var isWholePath = indexes.length === section.length || isClosePath && indexes.length === section.length - 1;
          if (isWholePath) {
            return {
              pathway: _this4.pathway.find(function (i) {
                return i.section === section;
              }),
              section: []
            };
          }
          // 需要克隆出新的指令列表不然会影响到originPath
          var _sections = [cloneDeep(section.map(function (i) {
            return i.instruction;
          }))];
          var removeIndexes = indexes.length <= 1 ? indexes : indexes.filter(function (i, idx, arr) {
            return arr.length <= 1 || idx >= 1 && arr[idx - 1] + 1 === i;
          });
          for (var i = removeIndexes.length - 1, startIndex = 0; i >= 0; i--) {
            var _a2;
            var instructions = _sections[0];
            var index = startIndex + removeIndexes[i];
            var pre = instructions.slice(0, index);
            var next = instructions.slice(index);
            if (isClosePath) {
              pre.shift();
              next.pop();
              if (next[0][0] === InstructionType.START) next.pop();
            }
            if (indexes.length === 1) next.shift();
            (_a = next[0]) === null || _a === void 0 ? void 0 : (_a2 = _a).splice.apply(_a2, [0, next[0].length, InstructionType.START].concat(_toConsumableArray(next[0].slice(-2))));
            _sections.shift();
            if (isClosePath) {
              startIndex = next.length - 1;
              next.push.apply(next, _toConsumableArray(pre));
              pre.length = 0;
            }
            var needMinNodeCount = indexes.length === 1 ? 1 : 2;
            if (next.length >= needMinNodeCount) _sections.unshift(next);
            if (pre.length >= needMinNodeCount) _sections.unshift(pre);
            isClosePath = false;
          }
          return {
            pathway: _this4.pathway.find(function (i) {
              return i.section === section;
            }),
            section: _sections
          };
        });
        sections.forEach(function (i) {
          if (i.section.length) {
            _this4.drawWithNewSections(i.pathway, i.section);
          } else {
            _this4.clear(i.pathway.originPath);
          }
        });
        sectionIndexMap.clear();
      }
      /**
       * 输出路径
       */
    }, {
      key: "toPaths",
      value: function toPaths() {
        var pathway = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.pathway;
        return pathway.map(function (_ref9) {
          var section = _ref9.section;
          return section.map(function (i) {
            return i.instruction;
          });
        });
      }
      /**
       * 输出路径指令
       */
    }, {
      key: "toPathD",
      value: function toPathD() {
        var pathway = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.pathway;
        return fabric.fabric.util.joinPath(this.toPaths(pathway));
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
      key: "getPathSections",
      value: function getPathSections(instructions) {
        var sections = instructions.reduce(function (paths, instruction, idx, arr) {
          if (!instruction) return paths;
          if (instruction[0] === InstructionType.START && paths[paths.length - 1].length) paths.push([]);
          paths[paths.length - 1].push(instruction);
          if (instruction[0] === InstructionType.CLOSE && idx !== arr.length - 1) paths.push([]);
          return paths;
        }, [[]]);
        return sections;
      }
    }]);
  }();
  VizPath.symbol = Symbol('vizpath');

  /** 指令类型 */
  var InstructionType;
  (function (InstructionType) {
    InstructionType["START"] = "M";
    InstructionType["LINE"] = "L";
    InstructionType["QUADRATIC_CURCE"] = "Q";
    InstructionType["BEZIER_CURVE"] = "C";
    InstructionType["CLOSE"] = "z";
  })(InstructionType || (InstructionType = {}));
  /**
   * VizPath
   */
  var VizPathContext = /*#__PURE__*/function () {
    function VizPathContext() {
      _classCallCheck(this, VizPathContext);
      /**
       * 增强模块列表
       */
      this._modules = [];
    }
    /**
     * 通过fabric.Path对象解析路径信息
     *
     * @param path farbic路径对象
     * @example
     *
     * const pathway = getPathwayFromObject(new fabric.Path());
     */
    return _createClass(VizPathContext, [{
      key: "use",
      value:
      /**
       * 添加拓展模块
       */
      function use(module) {
        var index = this._modules.findIndex(function (item) {
          return item.constructor.ID === module.constructor.ID;
        });
        if (index !== -1) {
          this._modules.splice(index, 1);
        }
        this._modules.push(module);
        return this;
      }
      /**
       * 查找模块
       */
    }, {
      key: "find",
      value: function find(moduleConstructor) {
        return this._modules.find(function (module) {
          return module.constructor.ID === moduleConstructor.ID;
        });
      }
      /**
       * 初始可视路径编辑器
       */
    }, {
      key: "initialize",
      value: (function () {
        var _initialize = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var _this5 = this;
          var vizPath;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                vizPath = new VizPath(this);
                return _context3.abrupt("return", new Promise(function (resolve) {
                  var next = 0;
                  var loadModule = /*#__PURE__*/function () {
                    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
                      var module;
                      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                        while (1) switch (_context2.prev = _context2.next) {
                          case 0:
                            module = _this5._modules[next];
                            if (module) {
                              _context2.next = 4;
                              break;
                            }
                            resolve(vizPath);
                            return _context2.abrupt("return");
                          case 4:
                            _context2.next = 6;
                            return module.prepare();
                          case 6:
                            _context2.next = 8;
                            return Promise.resolve(module.load(vizPath));
                          case 8:
                            next++;
                            loadModule();
                          case 10:
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
                }));
              case 2:
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
      key: "parsePathFromObject",
      value: function parsePathFromObject(path) {
        var _parsePathJSON2 = parsePathJSON(path),
          layout = _parsePathJSON2.layout,
          styles = _parsePathJSON2.styles;
        /**
         * 第一步：拆分组合路径， 如 new fabric.Path('M 0 0 L 10 10 z M 20 20 L 40 40 z')
         */
        var instructions = cloneDeep(path.path);
        var sections = VizPath.getPathSections(instructions).map(function (section) {
          // 为每个子路径分配新建的路径对象
          var originPath = new fabric.fabric.Path(fabric.fabric.util.joinPath(section));
          originPath.path = section;
          originPath.set(styles);
          return {
            section: section,
            originPath: originPath
          };
        });
        // 建立组并销毁组是为了保持子路径对象的正确尺寸和位置
        new fabric.fabric.Group(sections.map(function (i) {
          return i.originPath;
        }), layout).destroy();
        /**
         * 第二步：组合pathway
         */
        var pathway = sections.map(function (_ref11) {
          var section = _ref11.section,
            originPath = _ref11.originPath;
          // ① 清除组合元素对路径的偏移影响
          clearPathOffset(originPath);
          reinitializePath(originPath);
          // ② 修正头指令，头指令必须是M开始指令，其他的也没效果
          if (section[0][0] !== InstructionType.START) {
            section[0] = [InstructionType.START].concat(_toConsumableArray(section[0].slice(section[0].length - 2)));
          }
          // ③ 如果是二阶曲线全部升级为三阶曲线便于后续处理
          for (var i = 1; i < section.length; i++) {
            var instruction = section[i];
            var preInstruction = section[i - 1];
            if (instruction[0] === InstructionType.QUADRATIC_CURCE) {
              instruction.splice.apply(instruction, [0, instruction.length].concat(_toConsumableArray(getCubicFromQuadratic(VizPath.getInstructionNodeCrood(preInstruction), instruction))));
            }
          }
          // ④ 闭合的路径如果在闭合指令前没有回到起始点，补充一条回到起始点的指令
          var isAutoClose = section[section.length - 1][0] === InstructionType.CLOSE;
          if (isAutoClose) {
            var startPoint = section[0].slice(section[0].length - 2);
            var endPoint = section[section.length - 2].slice(section[section.length - 2].length - 2);
            if (
            // 如果路径只有一个起始点且闭合[M,Z]
            section[0] === section[section.length - 2] ||
            // 或者路径闭合但是最后一个关键点不完全等于起始点
            endPoint[0] !== startPoint[0] || endPoint[1] !== startPoint[1]) {
              section.splice(section.length - 1, 0, [InstructionType.LINE, startPoint[0], startPoint[1]]);
            }
          }
          // ⑤ 创建pathway
          var _section = [];
          section.forEach(function (instruction) {
            _section.push({
              section: _section,
              instruction: instruction
            });
          });
          return {
            section: _section,
            originPath: originPath
          };
        });
        return pathway;
      }
      /**
       * 通过路径指令获取Editor路径信息
       *
       * @param d 路径指令信息
       * @example
       *
       * const pathway = getPathwayFromPathD('M 0 0 L 100 100');
       */
    }, {
      key: "parsePathFromPathD",
      value: function parsePathFromPathD(d) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var path = new fabric.fabric.Path(d, defaults(options, {
          left: 0,
          top: 0
        }));
        return this.parsePathFromObject(path);
      }
      /**
       * 通过svg文件链接加载并获取Editor路径信息
       *
       * @param d 路径指令信息
       * @example
       *
       * const pathway = getPathwayFromPathD('M 0 0 L 100 100');
       */
    }, {
      key: "parsePathFromURL",
      value: (function () {
        var _parsePathFromURL = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(url) {
          var options,
            object,
            pathGroup,
            pathways,
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
                pathways = [];
                extract = function extract(group) {
                  var children = group.getObjects();
                  group.destroy();
                  children.forEach(function (child) {
                    if (child.type === 'group') {
                      extract(child);
                    } else if (child.type === 'path') {
                      pathways.push(VizPathContext.parsePathFromObject(child));
                    }
                  });
                };
                extract(pathGroup);
                return _context4.abrupt("return", pathways);
              case 12:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }));
        function parsePathFromURL(_x4) {
          return _parsePathFromURL.apply(this, arguments);
        }
        return parsePathFromURL;
      }())
    }]);
  }();
  var EditorModule = /*#__PURE__*/function () {
    function EditorModule() {
      _classCallCheck(this, EditorModule);
    }
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
      key: "load",
      value: function load(vizPath) {}
    }]);
  }();
  var Editor = /*#__PURE__*/function (_EditorModule) {
    /**
     * 构造函数
     * @param options 更多配置
     */
    function Editor(canvas) {
      var _this6;
      _classCallCheck(this, Editor);
      _this6 = _callSuper(this, Editor);
      /**
       * 交互所在fabric画布
       */
      _this6.canvas = null;
      /**
       * 监听事件
       */
      _this6.listeners = [];
      _this6._mountCanvas = canvas;
      return _this6;
    }
    /**
     * 基于挂载画布构建编辑器画布
     */
    _inherits(Editor, _EditorModule);
    return _createClass(Editor, [{
      key: "_createEditorCanvas",
      value: function _createEditorCanvas(canvas) {
        var _a;
        if (!(canvas instanceof fabric.fabric.Canvas)) {
          throw new TypeError('Please use fabric.Canvas instead of fabric.StaticCanvas.');
        }
        var container = canvas.getElement().parentNode;
        if (!container) {
          throw new TypeError('Please use fabric.Canvas which is mounted into the document.');
        }
        var editorCanvas = document.createElement('canvas');
        container.appendChild(editorCanvas);
        var editorFabricCanvas = new fabric.fabric.Canvas(editorCanvas, {
          width: container.clientWidth,
          height: container.clientHeight,
          selection: true,
          preserveObjectStacking: true,
          selectionColor: canvas.selectionColor,
          selectionBorderColor: canvas.selectionBorderColor,
          selectionDashArray: canvas.selectionDashArray,
          selectionLineWidth: canvas.selectionLineWidth
        });
        editorFabricCanvas.setViewportTransform((_a = canvas.viewportTransform) !== null && _a !== void 0 ? _a : [1, 0, 0, 1, 0, 0]);
        return editorFabricCanvas;
      }
      /**
       * 添加事件监听
       */
    }, {
      key: "on",
      value: function on(type, eventName, handler) {
        if (!this.canvas) return;
        if (type === 'global') {
          window.addEventListener(eventName, handler);
        }
        if (type === 'canvas') {
          this.canvas.on(eventName, handler);
        }
        this.listeners.push({
          type: type,
          eventName: eventName,
          handler: handler
        });
      }
      /**
       * 移除事件监听
       */
    }, {
      key: "off",
      value: function off(type, eventName, handler) {
        var canvas = this.canvas;
        if (!canvas) return;
        this.listeners = this.listeners.filter(function (listener) {
          if (handler && handler !== listener.handler) return true;
          if (eventName === listener.eventName) {
            if (type === 'global') {
              window.removeEventListener(listener.eventName, listener.handler);
            }
            if (type === 'canvas') {
              canvas.off(listener.eventName, listener.handler);
            }
            return false;
          }
          return true;
        });
      }
    }, {
      key: "load",
      value: function load(editor) {
        this.canvas = this._createEditorCanvas(this._mountCanvas);
      }
    }]);
  }(EditorModule);
  Editor.ID = Symbol('editor');
  var EditorBackground = /*#__PURE__*/function (_EditorModule2) {
    function EditorBackground() {
      _classCallCheck(this, EditorBackground);
      return _callSuper(this, EditorBackground, arguments);
    }
    _inherits(EditorBackground, _EditorModule2);
    return _createClass(EditorBackground, [{
      key: "load",
      value: function load(vizPath) {
        var editor = vizPath.context.find(Editor);
        if (!editor) {
          return;
        }
        var canvas = editor.canvas;
        if (!canvas) {
          return;
        }
        var size = 50;
        var grid = new fabric.fabric.Rect({
          width: size,
          height: size,
          fill: 'transparent',
          stroke: '#f1f1f1',
          strokeWidth: 1,
          strokeDashArray: [4, 2]
        });
        return new Promise(function (resolve) {
          var image = new Image();
          image.onload = function () {
            canvas.setBackgroundColor(new fabric.fabric.Pattern({
              source: image,
              repeat: 'repeat',
              offsetX: -(canvas.getWidth() % size) / 2,
              offsetY: -(canvas.getHeight() % size) / 2
            }), function () {
              canvas.renderAll();
              resolve();
            });
          };
          image.src = grid.toDataURL({});
        });
      }
    }]);
  }(EditorModule);
  EditorBackground.ID = Symbol('editor-background');

  // Unique ID creation requires a high quality random # generator. In the browser we therefore
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
  var createDefaultPath$1 = function createDefaultPath$1(decorator, originPath) {
    var path = new fabric.fabric.Path();
    path.set(originPath.toJSON());
    var _originPath$pathOffse = originPath.pathOffset,
      x = _originPath$pathOffse.x,
      y = _originPath$pathOffse.y;
    path.pathOffset = new fabric.fabric.Point(x, y);
    path.set({
      stroke: '#1884ec',
      strokeWidth: 2
    });
    return decorator(path);
  };
  var createDefaultNode$1 = function createDefaultNode$1(decorator) {
    var rect = new fabric.fabric.Rect({
      width: 6,
      height: 6,
      fill: "#ffffff",
      stroke: "#1784ec",
      strokeWidth: 1
    });
    var object = decorator(rect);
    object.on('selected', function () {
      var _a;
      rect.set({
        fill: '#1884ec'
      });
      (_a = object.canvas) === null || _a === void 0 ? void 0 : _a.requestRenderAll();
    });
    object.on('deselected', function () {
      var _a;
      rect.set({
        fill: '#ffffff'
      });
      (_a = object.canvas) === null || _a === void 0 ? void 0 : _a.requestRenderAll();
    });
    return object;
  };
  var createDefaultPoint$1 = function createDefaultPoint$1(decorator) {
    var circle = new fabric.fabric.Circle({
      radius: 3,
      fill: '#ffffff',
      stroke: '#1884ec',
      strokeWidth: 1
    });
    var object = decorator(circle);
    object.on('selected', function () {
      var _a;
      circle.set({
        fill: '#1884ec'
      });
      (_a = object.canvas) === null || _a === void 0 ? void 0 : _a.requestRenderAll();
    });
    object.on('deselected', function () {
      var _a;
      circle.set({
        fill: '#ffffff'
      });
      (_a = object.canvas) === null || _a === void 0 ? void 0 : _a.requestRenderAll();
    });
    return object;
  };
  var createDefaultLine$1 = function createDefaultLine$1(decorator) {
    var line = new fabric.fabric.Line([0, 0, 0, 0], {
      stroke: '#1884ec',
      strokeWidth: 1
    });
    return decorator(line);
  };
  var noneTheme = {
    path: createDefaultPath$1,
    node: createDefaultNode$1,
    controllerPoint: createDefaultPoint$1,
    controllerLine: createDefaultLine$1
  };
  var createDefaultPath = function createDefaultPath(decorator, originPath) {
    var path = new fabric.fabric.Path();
    path.set(originPath.toJSON());
    var _originPath$pathOffse2 = originPath.pathOffset,
      x = _originPath$pathOffse2.x,
      y = _originPath$pathOffse2.y;
    path.pathOffset = new fabric.fabric.Point(x, y);
    path.set({
      stroke: '#333',
      strokeWidth: 4,
      fill: 'transparent'
    });
    return decorator(path);
  };
  var createDefaultNode = function createDefaultNode(decorator) {
    var object = new fabric.fabric.Circle({
      strokeWidth: 4,
      radius: 6,
      fill: "#ffffff",
      stroke: "#4b4b4b"
    });
    var group = decorator(object);
    group.on("mouseover", function () {
      var _a;
      object.set({
        fill: "#7ef4ad"
      });
      (_a = group.canvas) === null || _a === void 0 ? void 0 : _a.requestRenderAll();
    });
    group.on("mouseout", function () {
      var _a, _b;
      object.set({
        fill: ((_a = group.canvas) === null || _a === void 0 ? void 0 : _a.getActiveObject()) === group ? "#29ca6e" : "#ffffff"
      });
      (_b = group.canvas) === null || _b === void 0 ? void 0 : _b.requestRenderAll();
    });
    group.on("selected", function () {
      var _a;
      object.set({
        fill: "#29ca6e"
      });
      (_a = group.canvas) === null || _a === void 0 ? void 0 : _a.requestRenderAll();
    });
    group.on("deselected", function () {
      var _a;
      object.set({
        fill: "#ffffff"
      });
      (_a = group.canvas) === null || _a === void 0 ? void 0 : _a.requestRenderAll();
    });
    return group;
  };
  var createDefaultPoint = function createDefaultPoint(decorator) {
    var circle = new fabric.fabric.Circle({
      radius: 4,
      fill: '#bebebe',
      stroke: '#bebebe',
      strokeWidth: 2
    });
    var object = decorator(circle);
    object.on('selected', function () {
      var _a;
      circle.set({
        stroke: '#333'
      });
      (_a = object.canvas) === null || _a === void 0 ? void 0 : _a.requestRenderAll();
    });
    object.on('deselected', function () {
      var _a;
      circle.set({
        stroke: '#bebebe'
      });
      (_a = object.canvas) === null || _a === void 0 ? void 0 : _a.requestRenderAll();
    });
    return object;
  };
  var createDefaultLine = function createDefaultLine(decorator) {
    var line = new fabric.fabric.Line([0, 0, 0, 0], {
      stroke: '#bebebe',
      strokeWidth: 1,
      strokeDashArray: [4, 3]
    });
    return decorator(line);
  };
  var defaultTheme = {
    path: createDefaultPath,
    node: createDefaultNode,
    controllerPoint: createDefaultPoint,
    controllerLine: createDefaultLine
  };
  var EditorUI = /*#__PURE__*/function (_EditorModule3) {
    function EditorUI() {
      var _this7;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, EditorUI);
      _this7 = _callSuper(this, EditorUI);
      _this7.options = EditorUI.defaultUI;
      _this7.options = defaults(options, _this7.options);
      return _this7;
    }
    _inherits(EditorUI, _EditorModule3);
    return _createClass(EditorUI);
  }(EditorModule);
  EditorUI.ID = Symbol('editor-ui');
  EditorUI.noneUI = noneTheme;
  EditorUI.defaultUI = defaultTheme;
  var EditorPath = /*#__PURE__*/function (_EditorModule4) {
    function EditorPath() {
      var _this8;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, EditorPath);
      _this8 = _callSuper(this, EditorPath);
      _this8.options = {
        updateTriggerTime: 'defer'
      };
      _this8.paths = [];
      _this8.nodePathMap = new WeakMap([]);
      _this8.options = defaults(options, _this8.options);
      return _this8;
    }
    /**
     * 将相对坐标点转化为带元素本身变换的偏移位置
     */
    _inherits(EditorPath, _EditorModule4);
    return _createClass(EditorPath, [{
      key: "calcAbsolutePosition",
      value: function calcAbsolutePosition(crood, object) {
        var matrix = _toConsumableArray(object.calcOwnMatrix());
        if (object.type === 'path') {
          matrix[4] -= object.pathOffset.x;
          matrix[5] -= object.pathOffset.y;
        }
        var point = fabric.fabric.util.transformPoint(new fabric.fabric.Point(crood.x, crood.y), matrix);
        return {
          left: point.x,
          top: point.y
        };
      }
      /**
       * 移除元素本身变换，将实际偏移转化为路径相对坐标
       */
    }, {
      key: "calcRelativeCrood",
      value: function calcRelativeCrood(position, object) {
        var matrix = _toConsumableArray(object.calcOwnMatrix());
        if (object.type === 'path') {
          matrix[4] -= object.pathOffset.x;
          matrix[5] -= object.pathOffset.y;
        }
        var point = fabric.fabric.util.transformPoint(new fabric.fabric.Point(position.left, position.top), fabric.fabric.util.invertTransform(matrix));
        return {
          x: round(point.x, 4),
          y: round(point.y, 4)
        };
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
        reinitializePath(path);
        (_a = path.canvas) === null || _a === void 0 ? void 0 : _a.requestRenderAll();
      }
      /**
       * 初始化路径绘制监听
       */
    }, {
      key: "_initDrawListener",
      value: function _initDrawListener(vizPath) {
        var _this9 = this;
        var editor = vizPath.context.find(Editor);
        if (!editor) {
          return;
        }
        var canvas = editor.canvas;
        if (!canvas) {
          return;
        }
        var updatePaths = function updatePaths() {
          var ui = vizPath.context.find(EditorUI);
          var paths = vizPath.pathway.map(function (_ref12) {
            var section = _ref12.section,
              originPath = _ref12.originPath;
            var _a;
            var decorator = function decorator(customPath) {
              var _parsePathJSON3 = parsePathJSON(customPath),
                layout = _parsePathJSON3.layout,
                styles = _parsePathJSON3.styles;
              var _path = originPath;
              _path.set(layout);
              _path.set(styles);
              _path.set({
                name: v4(),
                // 路径本身不可选中，后续通过操纵点和线条来更改路径
                selectable: false,
                // 不触发事件
                evented: false,
                // 防止因为缓存没有显示正确的路径
                objectCaching: false
              });
              _path[VizPath.symbol] = VizPathSymbalType.PATH;
              return _path;
            };
            var path = ((_a = ui === null || ui === void 0 ? void 0 : ui.options.path) !== null && _a !== void 0 ? _a : EditorUI.noneUI.path)(decorator, originPath);
            if (!path[VizPath.symbol]) path = decorator(path);
            return {
              path: path,
              section: section
            };
          });
          // 移除旧的路径对象并添加新的路径对象
          canvas.renderOnAddRemove = true;
          _this9.paths.forEach(function (_ref13) {
            var path = _ref13.path;
            canvas.remove(path);
          });
          paths.forEach(function (_ref14) {
            var path = _ref14.path;
            canvas.add(path);
          });
          canvas.renderOnAddRemove = false;
          canvas.renderAll();
          _this9.paths = paths;
          // 建立映射关系，便于减少后续计算
          _this9.paths.forEach(function (item) {
            item.section.forEach(function (_ref15) {
              var node = _ref15.node;
              if (node) _this9.nodePathMap.set(node, item);
            });
          });
        };
        vizPath.on('draw', updatePaths);
        vizPath.on('clear', updatePaths);
      }
      /**
       * 初始化路径更新监听
       */
    }, {
      key: "_initPathListener",
      value: function _initPathListener(vizPath) {
        var _this10 = this;
        var debounceWeakMap = new WeakMap([]);
        vizPath.on('update', function (crood) {
          var updateTriggerTime = _this10.options.updateTriggerTime;
          if (updateTriggerTime === 'manual') return;
          var path = _this10.nodePathMap.get(crood);
          if (!path) return;
          if (updateTriggerTime === 'auto') {
            _this10.updatePathStatus(path.path);
          } else {
            var timeout = debounceWeakMap.get(path);
            if (timeout) clearTimeout(timeout);
            debounceWeakMap.set(path, setTimeout(function () {
              _this10.updatePathStatus(path.path);
              debounceWeakMap["delete"](path);
            }, 60));
          }
        });
      }
    }, {
      key: "load",
      value: function load(vizPath) {
        this._initDrawListener(vizPath);
        this._initPathListener(vizPath);
      }
    }]);
  }(EditorModule);
  EditorPath.ID = Symbol('editor-path');
  var EditorNode = /*#__PURE__*/function (_EditorModule5) {
    function EditorNode() {
      var _this11;
      _classCallCheck(this, EditorNode);
      _this11 = _callSuper(this, EditorNode, arguments);
      _this11.vizPath = null;
      _this11.editor = null;
      _this11.nodes = [];
      _this11.controllers = [];
      _this11.objectNodeMap = new WeakMap([]);
      _this11.nodeObjectMap = new WeakMap([]);
      _this11.activeNodes = [];
      _this11.activePoint = null;
      _this11._cancelSelectEvent = false;
      return _this11;
    }
    _inherits(EditorNode, _EditorModule5);
    return _createClass(EditorNode, [{
      key: "_initPathNodes",
      value: function _initPathNodes() {
        var _this12 = this;
        var vizPath = this.vizPath;
        if (!vizPath) return [];
        var editorPath = vizPath.context.find(EditorPath);
        if (!editorPath) return [];
        var ui = vizPath.context.find(EditorUI);
        var nodes = [];
        // 创建路径关键点的操作点（即实际路径上的节点，而非曲线上的虚拟点）
        vizPath.pathway.forEach(function (_ref16) {
          var section = _ref16.section;
          section.forEach(function (item, index) {
            var _a, _b, _c;
            var node = item.node;
            if (!node) return;
            // 如果下一个指令是闭合点，则不添加关键点
            // 因为路径补丁的时候遇到闭合点会添加一条到起始点的路径，所以当前关键点正好和起始点一致
            if (((_b = (_a = section[index + 1]) === null || _a === void 0 ? void 0 : _a.instruction) === null || _b === void 0 ? void 0 : _b[0]) === InstructionType.CLOSE) return;
            var decorator = function decorator(innerObject) {
              var _object = new fabric.fabric.Group([innerObject], {
                name: v4(),
                // 选中时不出现选中框
                hasBorders: false,
                hasControls: false,
                // 保持居中
                originX: 'center',
                originY: 'center'
              });
              _object[VizPath.symbol] = VizPathSymbalType.NODE;
              // 加入画布时添加自动响应
              _object.on('added', function () {
                node.observe(function (x, y) {
                  var position = editorPath.calcAbsolutePosition({
                    x: x,
                    y: y
                  }, editorPath.nodePathMap.get(node).path);
                  if (_object.group) {
                    var relativePosition = editorPath.calcRelativeCrood(position, _object.group);
                    _object.set({
                      left: relativePosition.x,
                      top: relativePosition.y
                    }).setCoords();
                    _object.group.addWithUpdate();
                  } else {
                    _object.set(position).setCoords();
                  }
                }, {
                  id: _object.name,
                  immediate: true
                });
              });
              // 移除时结束自动响应
              _object.on('removed', function () {
                return node.unobserve(_object);
              });
              return _object;
            };
            var object = ((_c = ui === null || ui === void 0 ? void 0 : ui.options.node) !== null && _c !== void 0 ? _c : EditorUI.noneUI.node)(decorator);
            if (!object[VizPath.symbol]) object = decorator(object);
            nodes.push(object);
            _this12.objectNodeMap.set(object, item);
            _this12.nodeObjectMap.set(item, object);
          });
        });
        return nodes;
      }
      // 添加活跃组的响应式变化
    }, {
      key: "_addActiveSelectionObserve",
      value: function _addActiveSelectionObserve(group) {
        var _this13 = this;
        observe(group, ['left', 'top', 'angle'], function () {
          var _iterator3 = _createForOfIteratorHelper(group._objects),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var object = _step3.value;
              var decomposeMatrix = fabric.fabric.util.qrDecompose(object.calcTransformMatrix(false));
              var left = decomposeMatrix.translateX;
              var top = decomposeMatrix.translateY;
              _this13.move(object, {
                left: left,
                top: top
              });
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        });
      }
      // 添加单个活跃对象的响应式变化
    }, {
      key: "_addActivePointObserve",
      value: function _addActivePointObserve(object) {
        var _this14 = this;
        observe(object, ['left', 'top'], function (_ref17) {
          var left = _ref17.left,
            top = _ref17.top;
          if (object.group) return;
          _this14.move(object, {
            left: left,
            top: top
          });
        });
      }
      // 移除当前控制点
    }, {
      key: "_removeCurrentControllers",
      value: function _removeCurrentControllers() {
        var _b2;
        var _a, _b;
        var editor = (_a = this.vizPath) === null || _a === void 0 ? void 0 : _a.context.find(Editor);
        (_b = editor === null || editor === void 0 ? void 0 : editor.canvas) === null || _b === void 0 ? void 0 : (_b2 = _b).remove.apply(_b2, _toConsumableArray(this.controllers.map(function (i) {
          return [i.point, i.line];
        }).flat(1)));
      }
      // 添加活跃节点的周围控制点
    }, {
      key: "_addActivePointControllers",
      value: function _addActivePointControllers(nodeObject) {
        var _this15 = this;
        var canvas = nodeObject.canvas;
        if (!canvas) return;
        if (!this.vizPath) return;
        var pathwayNode = this.objectNodeMap.get(nodeObject);
        if (!pathwayNode) return;
        var editorPath = this.vizPath.context.find(EditorPath);
        if (!editorPath) return;
        var ui = this.vizPath.context.find(EditorUI);
        if (!pathwayNode.node) return;
        var controllers = [];
        var neighboringNodes = this.vizPath.getMoreNeighboringNodes(pathwayNode);
        neighboringNodes.forEach(function (_ref18) {
          var _ref19 = _slicedToArray(_ref18, 2),
            type = _ref19[0],
            pathwayNode = _ref19[1];
          var _a, _b;
          var pos = type.split('-')[1];
          // 已存在的节点直接复用
          var existIdx = _this15.controllers.findIndex(function (i) {
            return i.node === pathwayNode && i.type === pos;
          });
          if (existIdx !== -1) {
            controllers.push(_this15.controllers[existIdx]);
            return;
          }
          var node = pathwayNode.node;
          var controller = pathwayNode.controllers[pos];
          if (!node || !controller) return;
          /**
           * 创建指令控制点
           */
          var pointDecorator = function pointDecorator(innerObject) {
            var _object = new fabric.fabric.Group([innerObject], {
              name: v4(),
              // 选中时不出现选中框
              hasBorders: false,
              hasControls: false,
              // 保持居中
              originX: 'center',
              originY: 'center'
            });
            _object[VizPath.symbol] = VizPathSymbalType.CONTROLLER_POINT;
            // 建立相互响应，指令的数据和元素的位置更改会相互同步
            _object.on('added', function () {
              controller.observe(function (x, y) {
                var _a;
                if (((_a = _object.canvas) === null || _a === void 0 ? void 0 : _a.getActiveObject()) === _object) return;
                var position = editorPath.calcAbsolutePosition({
                  x: x,
                  y: y
                }, editorPath.nodePathMap.get(node).path);
                _object.set(position).setCoords();
              }, {
                immediate: true,
                id: _object.name
              });
            });
            _object.on('removed', function () {
              return controller.unobserve(_object);
            });
            observe(_object, ['left', 'top'], function (_ref20) {
              var left = _ref20.left,
                top = _ref20.top;
              var _a;
              if (((_a = _object.canvas) === null || _a === void 0 ? void 0 : _a.getActiveObject()) !== _object) return;
              var crood = editorPath.calcRelativeCrood({
                left: left,
                top: top
              }, editorPath.nodePathMap.get(node).path);
              controller.set(crood, [_object.name]);
            });
            return _object;
          };
          var point = ((_a = ui === null || ui === void 0 ? void 0 : ui.options.controllerPoint) !== null && _a !== void 0 ? _a : EditorUI.noneUI.controllerPoint)(pointDecorator);
          if (!point[VizPath.symbol]) point = pointDecorator(point);
          /**
           * 创建控制点和节点的连线
           */
          var lineDecorator = function lineDecorator(_line) {
            _line.set({
              name: v4(),
              // 保持比例
              strokeUniform: true,
              // 不允许选中
              selectable: false,
              evented: false,
              // 保持居中
              originX: 'center',
              originY: 'center'
            });
            _line[VizPath.symbol] = VizPathSymbalType.CONTROLLER_LINE;
            // 建立响应式，让连线随时跟随指令的值进行变化
            _line.on('added', function () {
              node.observe(function (x, y) {
                var position = editorPath.calcAbsolutePosition({
                  x: x,
                  y: y
                }, editorPath.nodePathMap.get(node).path);
                _line.set({
                  x1: position.left,
                  y1: position.top
                });
              }, {
                immediate: true,
                id: _line.name
              });
              controller.observe(function (x, y) {
                var position = editorPath.calcAbsolutePosition({
                  x: x,
                  y: y
                }, editorPath.nodePathMap.get(node).path);
                _line.set({
                  x2: position.left,
                  y2: position.top
                });
              }, {
                immediate: true,
                id: _line.name
              });
            });
            _line.on('removed', function () {
              node.unobserve(_line);
              controller.unobserve(_line);
            });
            return _line;
          };
          var line = ((_b = ui === null || ui === void 0 ? void 0 : ui.options.controllerLine) !== null && _b !== void 0 ? _b : EditorUI.noneUI.controllerLine)(lineDecorator);
          if (!line[VizPath.symbol]) line = lineDecorator(line);
          controllers.push({
            type: pos,
            node: pathwayNode,
            point: point,
            line: line
          });
        });
        // 由于需要多次添加关键点和控制点，如果不设置该配置，每次添加和移除都会渲染一次画布，设置为false后可以控制为1次渲染
        canvas.renderOnAddRemove = false;
        // 移除旧对象
        canvas.remove.apply(canvas, _toConsumableArray(this.controllers.map(function (i) {
          return [i.point, i.line];
        }).flat(1)));
        // 初始路径控制点
        this.controllers = controllers;
        // 添加新对象
        this.controllers.forEach(function (i, idx) {
          canvas.insertAt(i.line, editorPath.paths.length + idx, false);
          canvas.insertAt(i.point, editorPath.paths.length + idx + 1, false);
        });
        canvas.renderOnAddRemove = true;
        canvas.requestRenderAll();
      }
    }, {
      key: "_initSelectEvents",
      value: function _initSelectEvents() {
        var _this16 = this;
        if (!this.editor) return;
        this.editor.on('canvas', 'selection:created', function (e) {
          if (_this16._cancelSelectEvent) return;
          _this16.focus.apply(_this16, _toConsumableArray(e.selected));
        });
        this.editor.on('canvas', 'selection:updated', function (e) {
          if (_this16._cancelSelectEvent) return;
          _this16.focus.apply(_this16, _toConsumableArray(e.selected));
        });
        this.editor.on('canvas', 'selection:cleared', function () {
          if (_this16._cancelSelectEvent) return;
          _this16.focus();
        });
        // 选中路径段时自动选中路线段内的所有指令关键点
        this.editor.on('canvas', 'mouse:dblclick', function (e) {
          var _a;
          if (e.target !== null) return;
          var editorPath = (_a = _this16.vizPath) === null || _a === void 0 ? void 0 : _a.context.find(EditorPath);
          if (!editorPath) return;
          var focusPath;
          for (var _i2 = editorPath.paths.length - 1; _i2 >= 0; _i2--) {
            var path = editorPath.paths[_i2];
            if (path.path.containsPoint(e.pointer)) {
              focusPath = path;
              break;
            }
          }
          if (focusPath) {
            _this16.focus.apply(_this16, _toConsumableArray(_this16.nodes.filter(function (node) {
              return editorPath.nodePathMap.get(_this16.objectNodeMap.get(node).node) === focusPath;
            })));
          }
        });
      }
    }, {
      key: "_initDrawEvents",
      value: function _initDrawEvents() {
        var _this17 = this;
        if (!this.vizPath) return;
        var editor = this.vizPath.context.find(Editor);
        if (!editor) return;
        var editorPath = this.vizPath.context.find(EditorPath);
        if (!editorPath) return;
        var updateNodes = function updateNodes() {
          var canvas = editor.canvas;
          if (!canvas) return;
          // 失去当前选中状态
          canvas.discardActiveObject();
          // 由于需要多次添加关键点和控制点，如果不设置该配置，每次添加和移除都会渲染一次画布，设置为false后可以控制为1次渲染
          canvas.renderOnAddRemove = false;
          // 移除旧对象
          canvas.remove.apply(canvas, _toConsumableArray(_this17.nodes).concat(_toConsumableArray(_this17.controllers.map(function (i) {
            return [i.point, i.line];
          }).flat(1))));
          // 初始路径关键点
          _this17.nodes = _this17._initPathNodes();
          // 添加新对象
          canvas.add.apply(canvas, _toConsumableArray(_this17.nodes));
          canvas.renderOnAddRemove = true;
          canvas.renderAll();
        };
        this.vizPath.on('draw', updateNodes);
        this.vizPath.on('clear', updateNodes);
      }
    }, {
      key: "_initClearEvents",
      value: function _initClearEvents() {
        var _this18 = this;
        if (!this.vizPath) return;
        var editor = this.vizPath.context.find(Editor);
        if (!editor) return;
        this.vizPath.on('clearAll', function () {
          var canvas = editor.canvas;
          if (!canvas) return;
          canvas.remove.apply(canvas, _toConsumableArray(_this18.nodes).concat(_toConsumableArray(_this18.controllers.map(function (i) {
            return [i.point, i.line];
          }).flat(1))));
          _this18.nodes = [];
          _this18.controllers = [];
          _this18.activeNodes = [];
          _this18.activePoint = null;
        });
      }
    }, {
      key: "remove",
      value: function remove() {
        var _this19 = this,
          _b3;
        var _a, _b;
        var canvas = (_a = this.editor) === null || _a === void 0 ? void 0 : _a.canvas;
        if (!canvas) return;
        var removeNodes = [];
        for (var _len3 = arguments.length, objects = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          objects[_key3] = arguments[_key3];
        }
        objects.forEach(function (object) {
          if (object[VizPath.symbol] !== VizPathSymbalType.NODE) return;
          var _this19$objectNodeMap = _this19.objectNodeMap.get(object),
            node = _this19$objectNodeMap.node;
          if (!node) return;
          removeNodes.push(node);
        });
        (_b = this.vizPath) === null || _b === void 0 ? void 0 : (_b3 = _b).remove.apply(_b3, removeNodes);
        canvas.remove.apply(canvas, objects);
        canvas.requestRenderAll();
      }
    }, {
      key: "move",
      value: function move(object, position) {
        var _a, _b, _c, _d, _e;
        var pathwayNode = this.objectNodeMap.get(object);
        if (!pathwayNode) return;
        var node = pathwayNode.node,
          section = pathwayNode.section;
        var editorPath = (_a = this.vizPath) === null || _a === void 0 ? void 0 : _a.context.find(EditorPath);
        if (!editorPath) return [];
        var selectionGroup = object.group;
        var _object$scaleX = object.scaleX,
          preScaleX = _object$scaleX === void 0 ? 1 : _object$scaleX,
          _object$scaleY = object.scaleY,
          preScaleY = _object$scaleY === void 0 ? 1 : _object$scaleY,
          _object$angle = object.angle,
          preAngle = _object$angle === void 0 ? 0 : _object$angle;
        var _ref21 = selectionGroup ? {
            scaleX: 1 / selectionGroup.scaleX,
            scaleY: 1 / selectionGroup.scaleY,
            angle: -selectionGroup.angle
          } : {
            scaleX: 1,
            scaleY: 1,
            angle: 0
          },
          newScaleX = _ref21.scaleX,
          newScaleY = _ref21.scaleY,
          newAngle = _ref21.angle;
        object.set({
          scaleX: newScaleX,
          scaleY: newScaleY,
          angle: newAngle
        }).setCoords();
        var newCrood = editorPath.calcRelativeCrood(position, editorPath.nodePathMap.get(node).path);
        // 需要跟随变化的曲线控制点
        var followCroods = [];
        var followTransform = {
          translate: {
            x: newCrood.x - node.x,
            y: newCrood.y - node.y
          },
          rotate: preAngle - newAngle,
          scale: {
            x: preScaleX / newScaleX,
            y: preScaleY / newScaleY
          }
        };
        node.set(newCrood, [object === null || object === void 0 ? void 0 : object.name]);
        var list = (_b = this.vizPath) === null || _b === void 0 ? void 0 : _b.getMoreNeighboringNodes(pathwayNode);
        list === null || list === void 0 ? void 0 : list.forEach(function (_ref22) {
          var _ref23 = _slicedToArray(_ref22, 2),
            type = _ref23[0],
            node = _ref23[1];
          if (type === 'cur-pre' || type === 'cur-next') {
            followCroods.push(node.controllers[type.split('-')[1]]);
          }
        });
        // 如果『路径自动闭合（带有z指令）』，首尾两个节点需要同步操作
        if (((_d = (_c = section[section.length - 1]) === null || _c === void 0 ? void 0 : _c.instruction) === null || _d === void 0 ? void 0 : _d[0]) === InstructionType.CLOSE && section.length > 2) {
          if (section[0].node === node) {
            var _node = section[section.length - 2].node;
            _node.set(newCrood);
          }
          // 闭合节点不可能存在可视操作节点
          // if (section[section.length - 2].node === node) {}
        }
        // 控制点跟随
        followCroods.forEach(function (controller) {
          if (!controller) return;
          var _followTransform$tran = followTransform.translate,
            translate = _followTransform$tran === void 0 ? {
              x: 0,
              y: 0
            } : _followTransform$tran,
            _followTransform$scal = followTransform.scale,
            scale = _followTransform$scal === void 0 ? {
              x: 1,
              y: 1
            } : _followTransform$scal,
            _followTransform$rota = followTransform.rotate,
            rotate = _followTransform$rota === void 0 ? 0 : _followTransform$rota;
          var relativeDiff = transform({
            x: controller.x - newCrood.x,
            y: controller.y - newCrood.y
          }, [{
            translate: translate
          }, {
            scale: scale
          }, {
            rotate: rotate
          }]);
          controller.x = newCrood.x + relativeDiff.x;
          controller.y = newCrood.y + relativeDiff.y;
        });
        (_e = object.canvas) === null || _e === void 0 ? void 0 : _e.requestRenderAll();
      }
    }, {
      key: "focus",
      value: function focus() {
        var _this20 = this;
        var _a, _b, _c, _d, _e;
        var canvas = (_a = this.editor) === null || _a === void 0 ? void 0 : _a.canvas;
        if (!canvas) return;
        var editorPath = (_b = this.vizPath) === null || _b === void 0 ? void 0 : _b.context.find(EditorPath);
        if (!editorPath) return;
        for (var _len4 = arguments.length, selectedObjects = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          selectedObjects[_key4] = arguments[_key4];
        }
        var focusNodes = selectedObjects.filter(function (i) {
          return _this20.nodes.includes(i);
        });
        var focusControllerPoints = selectedObjects.filter(function (i) {
          return _this20.controllers.find(function (_ref24) {
            var point = _ref24.point;
            return point === i;
          });
        });
        // 优先判断是否聚焦关键点
        if (focusNodes.length) {
          // 聚焦多个时只保留关键点
          focusControllerPoints.length = 0;
        }
        // 没有聚焦关键点再考虑是否只有一个控制点聚焦情况
        else if (focusControllerPoints.length === 1) {
          var _this$controllers$fin = this.controllers.find(function (i) {
              return i.point === focusControllerPoints[0];
            }),
            node = _this$controllers$fin.node;
          // 控制点所在的关键点需要先选中
          var object = (_c = this.nodeObjectMap.get(node)) !== null && _c !== void 0 ? _c : this.nodeObjectMap.get(node.section[0]);
          if (object) focusNodes.push(object);
        }
        this._cancelSelectEvent = true;
        // 取消画布选中重新构造只包含关键点的选中框对象
        canvas.discardActiveObject();
        if (focusNodes.length === 1) {
          var focusNode = focusNodes[0];
          this._addActivePointObserve(focusNode);
          this._addActivePointControllers(focusNode);
          canvas.setActiveObject((_d = focusControllerPoints[0]) !== null && _d !== void 0 ? _d : focusNode);
        } else if (focusNodes.length > 1) {
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
          this._removeCurrentControllers();
          canvas.setActiveObject(activeSelection);
        } else {
          this._removeCurrentControllers();
        }
        this.activeNodes = focusNodes;
        this.activePoint = (_e = focusControllerPoints[0]) !== null && _e !== void 0 ? _e : null;
        this._cancelSelectEvent = false;
      }
    }, {
      key: "load",
      value: function load(vizPath) {
        var editor = vizPath.context.find(Editor);
        if (!editor) return;
        this.vizPath = vizPath;
        this.editor = editor;
        this._initSelectEvents();
        this._initDrawEvents();
        this._initClearEvents();
      }
    }]);
  }(EditorModule);
  EditorNode.ID = Symbol('editor-node');

  const EXAMPLE_PATH_D = {
      single: 'M 100 100 z',
      circle: 'M91 26.5C91 62.1223 62.1223 91 26.5 91S-38 62.1223 -38 26.5S-9.1223 -38 26.5 -38S91 -9.1223 91 26.5z',
      bubble: 'M5 -39c-29.8233 0 -54 24.1767 -54 54c0 22.3749 13.6084 41.5716 33 49.7646V93L16.0001 69H50c29.8233 0 54 -24.1767 54 -54S79.8233 -39 50 -39H5z',
      shapes: 'L-188.7846 -47L-100.923 97H-256.3538 z M91 26.5C91 62.1223 62.1223 91 26.5 91S-38 62.1223 -38 26.5S-9.1223 -38 26.5 -38S91 -9.1223 91 26.5z',
  };
  (async () => {
      // 取得上传文件输入框
      const uploader = document.getElementById('upload');
      // 取得操作按钮
      const btnDelete = document.getElementById('btn-delete');
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
      fabricCanvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      new fabric.fabric.Path(EXAMPLE_PATH_D.bubble, {
          originX: 'center',
          originY: 'center',
          left: 100,
          top: 100,
          objectCaching: false,
          noScaleCache: false,
          fill: '#59d571',
          stroke: '#5c7461',
          strokeWidth: 2,
          // angle: 60,
          // scaleX: 1.5,
          // scaleY: 1.5
      });
      // fabricCanvas.add(path);
      // fabricCanvas.renderAll();
      const vizPath = new VizPathContext();
      const operator = await vizPath
          .use(new Editor(fabricCanvas))
          .use(new EditorUI({
      // path: (decorator, originPath) => {
      //   return originPath;
      // },
      }))
          .use(new EditorBackground())
          .use(new EditorPath({
      // updateTriggerTime: 'auto'
      }))
          .use(new EditorNode())
          .initialize();
      // ① 通过路径指令直接绘制
      const pathway1 = VizPathContext.parsePathFromPathD(EXAMPLE_PATH_D.shapes, {
          left: fabricCanvas.getWidth() / 2,
          top: fabricCanvas.getHeight() / 2,
          originX: 'center',
          originY: 'center',
      });
      operator.draw(pathway1);
      // ② 通过路径对象绘制
      // const pathway2 = VizPath.parsePathFromObject(path);
      // operator.draw(pathway2);
      // ③ 通过URL绘制
      // const svgURL = 'https://sunzi-cool.maiyuan.online/image-template/d306e5f3-2c30-4599-b8a5-5348de226350.svg';
      // const pathways = await VizPath.parsePathFromURL(svgURL, {
      //   left: fabricCanvas.getWidth() / 2,
      //   top: fabricCanvas.getHeight() / 2,
      //   originX: 'center',
      //   originY: 'center',
      //   scaleX: 2,
      //   scaleY: 2
      // });
      // pathways?.forEach((pathway) => {
      //   operator.draw(pathway);
      // })
      // ④ 快速使用
      // const pathway = VizPath.parsePathFromPathD(EXAMPLE_PATH_D.bubble, {
      //   left: fabricCanvas.getWidth() / 2,
      //   top: fabricCanvas.getHeight() / 2,
      //   originX: 'center',
      //   originY: 'center'
      // });
      // operator.draw(pathway);
      // 上传input
      uploader.onchange = async (e) => {
          var _a, _b;
          const file = ((_b = (_a = e.target) === null || _a === void 0 ? void 0 : _a.files) !== null && _b !== void 0 ? _b : [])[0];
          if (!file)
              return;
          operator.clearAll();
          const url = URL.createObjectURL(file);
          const pathways = await VizPathContext.parsePathFromURL(url, {
              left: fabricCanvas.getWidth() / 2,
              top: fabricCanvas.getHeight() / 2,
              originX: 'center',
              originY: 'center',
          });
          pathways === null || pathways === void 0 ? void 0 : pathways.forEach((pathway) => {
              operator.draw(pathway);
          });
      };
      // operator.move(operator.pathway[0][0].node, { x: 200, y: 200 })
      // 操作按钮
      btnDelete.addEventListener('click', () => {
          const editorNode = vizPath.find(EditorNode);
          if (!editorNode)
              return;
          if (editorNode.activePoint)
              editorNode.remove(editorNode.activePoint);
          if (editorNode.activeNodes.length)
              editorNode.remove(...editorNode.activeNodes);
      });
  })();

})(fabric);
