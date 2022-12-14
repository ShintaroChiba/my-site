/*
 @overview es6-promise - a tiny implementation of Promises/A+.
 @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 @license   Licensed under MIT license
            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 @version   4.1.1
*/
;(function (e) {
  function c(k) {
    if (a[k]) return a[k].exports
    var h = (a[k] = { i: k, l: !1, exports: {} })
    e[k].call(h.exports, h, h.exports, c)
    h.l = !0
    return h.exports
  }
  var a = {}
  c.m = e
  c.c = a
  c.d = function (a, h, b) {
    c.o(a, h) || Object.defineProperty(a, h, { configurable: !1, enumerable: !0, get: b })
  }
  c.n = function (a) {
    var h =
      a && a.__esModule
        ? function () {
            return a['default']
          }
        : function () {
            return a
          }
    c.d(h, 'a', h)
    return h
  }
  c.o = function (a, h) {
    return Object.prototype.hasOwnProperty.call(a, h)
  }
  c.p = ''
  return c((c.s = 17))
})([
  function (e, c, a) {
    c.__esModule = !0
    e = (function () {
      function a() {}
      a.isNull = function (a) {
        return 'undefined' === typeof a || null == a
      }
      a.notNull = function (h) {
        return !a.isNull(h)
      }
      return a
    })()
    c.NullChecker = e
  },
  function (e, c, a) {
    c.__esModule = !0
    var k = a(0),
      h = a(5)
    e = (function () {
      function b() {}
      b.getProtocol = function () {
        return window.location.protocol
      }
      b.getDomain = function () {
        return document.domain
      }
      b.getHost = function () {
        return window.location.host
      }
      b.getUrlAnchor = function () {
        return document.location.hash
      }
      b.getDomainFromURL = function (b) {
        return b.match(/(https?:\/\/)?([^/\?#]*)[/\?#]?/)[2].replace(/:\d+/, '')
      }
      b.getReferrer = function () {
        return document.referrer
      }
      b.getReferrerDomain = function () {
        return b.getDomainFromURL(b.getReferrer())
      }
      b.getQueryString = function () {
        return window.location.search.substring(1, window.location.search.length)
      }
      b.getPagePath = function () {
        return document.location.host + document.location.pathname
      }
      b.getLocationWithoutProtocol = function () {
        return document.location.host + document.location.pathname + document.location.search + document.location.hash
      }
      b.getUserAgent = function () {
        return window.navigator.userAgent.toLowerCase()
      }
      b.getQueryParam = function (d) {
        void 0 === d && (d = !0)
        for (var f = {}, m = 0, a = b.getQueryString().split('&'); m < a.length; m++) {
          var g = a[m].split('='),
            h = g[0]
          g = g[1]
          try {
            f[decodeURIComponent(h)] = decodeURIComponent(k.NullChecker.isNull(g) ? '' : g)
          } catch (l) {
            if (!d) throw l
          }
        }
        return f
      }
      b.addQueryParam = function (b, f) {
        var d = b.split('#'),
          a = d[1],
          g = d[0].split('?')
        d = g[0]
        var h = g[1]
        g = {}
        var c = 0
        for (h = k.NullChecker.isNull(h) ? [] : h.split('&'); c < h.length; c++) {
          var p = h[c].split('='),
            e = p[0]
          g[e] = 1 >= p.length ? '' : p[1]
        }
        for (e in f) g[encodeURIComponent(e)] = encodeURIComponent(f[e])
        c = []
        for (e in g) c.push(e + '=' + g[e])
        return d + (0 == c.length ? '' : '?' + c.join('&')) + (k.NullChecker.isNull(a) ? '' : '#' + a)
      }
      b.addQueryParamWithoutOverride = function (d, f) {
        var a = d.split('#'),
          h = a[1],
          g = a[0].split('?')
        a = g[0]
        var c = g[1]
        g = {}
        var l = 0
        for (c = k.NullChecker.isNull(c) ? [] : c.split('&'); l < c.length; l++) {
          var e = c[l].split('='),
            r = e[0]
          g[r] = 1 >= e.length ? '' : e[1]
        }
        g = b.addQueryParamHashWithoutOverride(g, f)
        l = []
        for (r in g) l.push(r + '=' + g[r])
        return a + (0 == l.length ? '' : '?' + l.join('&')) + (k.NullChecker.isNull(h) ? '' : '#' + h)
      }
      b.addQueryParamHashWithoutOverride = function (b, f) {
        var d = h.ObjectUtil.assign(b),
          a
        for (a in f) {
          var g = encodeURIComponent(a),
            c = encodeURIComponent(f[a])
          k.NullChecker.notNull(d[g]) || (d[g] = c)
        }
        return d
      }
      return b
    })()
    c.URLLocation = e
  },
  function (e, c, a) {
    c.__esModule = !0
    var k = a(19),
      h = a(8),
      b = a(5),
      d = a(0),
      f = a(7)
    e = (function () {
      function a(b) {
        this.values = b
      }
      a.prototype.isEmpty = function () {
        return b.ObjectUtil.isEmpty(this.values)
      }
      a.prototype.asQueryParamForTracking = function () {
        if (this.isEmpty()) return {}
        var b = {},
          d
        for (d in this.values) b[a.TRACKING_PREFIX + '_' + d] = this.values[d]
        return b
      }
      a.prototype.asCookieParamForTracking = function () {
        if (this.isEmpty()) return {}
        var b = {}
        b[a.TRACKING_KEY_FOR_COOKIE] = new k.URIString(JSON.stringify(this.values))
        return b
      }
      a.prototype.set = function (b, d) {
        this.values[b] = d
      }
      a.prototype.get = function (b) {
        return !this.values || d.NullChecker.isNull(this.values[b]) ? '' : this.values[b]
      }
      a.prototype.keys = function () {
        if (!this.values) return []
        var b = [],
          d
        for (d in this.values) b.push(d)
        return b
      }
      a.prototype.isEqual = function (b, d) {
        return this.get(b) == d
      }
      a.prototype.isPreviewMode = function () {
        return '1' == this.get(a.PREVIEW_MODE_KEY)
      }
      a.prototype.isAssignedTrackingUserId = function () {
        return '' !== this.get(a.TRACKING_USER_ID_KEY)
      }
      a.prototype.assignTrackingUserId = function () {
        this.set(a.TRACKING_USER_ID_KEY, f.UUID.generate())
      }
      return a
    })()
    c.TrackingData = e
    ;(function (d) {
      function a(b) {
        var a = {},
          f
        for (f in b)
          if (new RegExp('^' + d.TRACKING_PREFIX + '_').test(f)) {
            var g = f.replace(new RegExp('^' + d.TRACKING_PREFIX + '_'), '')
            a[g] = b[f]
          }
        return a
      }
      d.TRACKING_USER_ID_KEY = 'uuid'
      d.PREVIEW_MODE_KEY = 'preview'
      d.TRACKING_KEY_FOR_COOKIE = '__cribnotes_prm'
      d.TRACKING_KEY_FOR_LOCAL_STORAGE = '__cribnotes_str'
      d.TRACKING_PREFIX = '__cribnotes'
      d.fromQueryParam = function (b) {
        b = a(b)
        return new d(b)
      }
      d.fromQueryParamWithOptionals = function (f, h) {
        var g = b.ObjectUtil.assign(f, a(h))
        return new d(g)
      }
      d.fromCookie = function () {
        try {
          return new d(JSON.parse(h.CookieUtil.getCookie(d.TRACKING_KEY_FOR_COOKIE)))
        } catch (g) {
          return new d({})
        }
      }
      d.fromCookieValue = function (b) {
        try {
          var a = h.CookieUtil.parseCookieValue(b)
          return new d(JSON.parse(a[1]))
        } catch (l) {
          return new d({})
        }
      }
    })((e = c.TrackingData || (c.TrackingData = {})))
    c.TrackingData = e
  },
  function (e, c, a) {
    var k =
      (this && this.__extends) ||
      (function () {
        var a =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (b, d) {
              b.__proto__ = d
            }) ||
          function (b, d) {
            for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a])
          }
        return function (b, d) {
          function f() {
            this.constructor = b
          }
          a(b, d)
          b.prototype = null === d ? Object.create(d) : ((f.prototype = d.prototype), new f())
        }
      })()
    c.__esModule = !0
    e = (function (a) {
      function b() {
        return (null !== a && a.apply(this, arguments)) || this
      }
      k(b, a)
      b.report = function (b, f) {
        try {
          a.report.call(this, 'error', b, f)
        } catch (m) {
          console.error(m)
        }
      }
      return b
    })(a(4).Logging)
    c.ErrorLogging = e
  },
  function (e, c, a) {
    c.__esModule = !0
    var k = a(7),
      h = a(1),
      b = a(0),
      d = a(18),
      f = a(2),
      m = (b.NullChecker.isNull('production') ? a(11) : a(13)).Config
    e = (function () {
      function a() {}
      a.splitByEncodedLength = function (d, a) {
        if (10 > a) return []
        if ('' === d) return ['']
        var f = d.match(RegExp('(?:[\ud800-\udbff][\udc00-\udfff]|[^\ud800-\udfff]){1}', 'g'))
        if (b.NullChecker.isNull(f)) return ['']
        for (var g = [], c = '', h = '', m = 0; m < f.length; m++) {
          var n = f[m]
          ;(h + encodeURIComponent(n)).length <= a
            ? ((c += n), (h += encodeURIComponent(n)))
            : (g.push(c), (c = n), (h = encodeURIComponent(n)))
        }
        g.push(c)
        return g
      }
      a.report = function (b, a, c) {
        c = this.splitByEncodedLength(c, 1e3)
        for (var g = k.UUID.generate(), m = 0; m < c.length; m++) {
          var n = c[m],
            e = this.createImageTag(),
            l = document.location.protocol + '//' + h.URLLocation.getPagePath()
          e.src = h.URLLocation.addQueryParam(this.loggingServer(), {
            t: b,
            c: a,
            cn: f.TrackingData.fromCookie().get('uuid'),
            sid: f.TrackingData.fromCookie().get('sid'),
            mid: g,
            v: d.VERSION.get(),
            u: l,
            r: h.URLLocation.getReferrer(),
            q: h.URLLocation.getQueryString(),
            a: h.URLLocation.getUrlAnchor(),
            ua: h.URLLocation.getUserAgent(),
            m: n,
          })
        }
      }
      a.createImageTag = function () {
        return document.createElement('img')
      }
      a.loggingServer = function () {
        return m.loggingURL
      }
      return a
    })()
    c.Logging = e
  },
  function (e, c, a) {
    c.__esModule = !0
    var k = a(0)
    e = (function () {
      function a() {}
      a.getKeys = function (b) {
        if (b !== Object(b)) throw new TypeError('Object.keys called on a non-object')
        var a = [],
          f
        for (f in b) Object.prototype.hasOwnProperty.call(b, f) && a.push(f)
        return a
      }
      a.isEmpty = function (b) {
        return 0 == a.getKeys(b).length
      }
      a.assign = function (b) {
        for (var a = [], f = 1; f < arguments.length; f++) a[f - 1] = arguments[f]
        f = k.NullChecker.isNull(b) ? {} : Object(b)
        for (var c = 0; c < a.length; c++) {
          var h = a[c]
          if (!k.NullChecker.isNull(h)) for (var g in h) h.hasOwnProperty(g) && (f[g] = h[g])
        }
        return f
      }
      return a
    })()
    c.ObjectUtil = e
  },
  function (e, c, a) {
    c.__esModule = !0
    e = (function () {
      function a() {}
      a.addEventListener = function (a, b, d) {
        a.addEventListener ? a.addEventListener(b, d, !0) : a.attachEvent && a.attachEvent('on' + b, d)
      }
      a.addDomReadyEvent = function (a) {
        function b() {
          g || ((g = !0), a())
        }
        function d() {
          c()
          b()
        }
        function f() {
          'complete' === document.readyState && (c(), b())
        }
        function c() {
          document.addEventListener
            ? (document.removeEventListener('DOMContentLoaded', d), window.removeEventListener('load', d))
            : (document.detachEvent('onreadystatechange', f), window.detachEvent('onload', d))
        }
        function h() {
          var a = !1
          try {
            a = null == window.frameElement && document.documentElement
          } catch (l) {}
          a &&
            a.doScroll &&
            (function p() {
              if (!g) {
                try {
                  a.doScroll('left')
                } catch (r) {
                  setTimeout(p, 50)
                  return
                }
                c()
                b()
              }
            })()
        }
        var g = !1
        'complete' === document.readyState || ('loading' !== document.readyState && !document.documentElement.doScroll)
          ? a()
          : document.addEventListener
          ? (document.addEventListener('DOMContentLoaded', d), window.addEventListener('load', d))
          : document.attachEvent &&
            (document.attachEvent('onreadystatechange', f), window.attachEvent('onload', d), h())
      }
      return a
    })()
    c.EventListener = e
  },
  function (e, c, a) {
    c.__esModule = !0
    e = (function () {
      function a() {}
      a.generate = function () {
        for (var a = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split(''), b = 0, d = a.length; b < d; b++)
          switch (a[b]) {
            case 'x':
              a[b] = Math.floor(16 * Math.random()).toString(16)
              break
            case 'y':
              a[b] = (Math.floor(4 * Math.random()) + 8).toString(16)
          }
        return a.join('')
      }
      return a
    })()
    c.UUID = e
  },
  function (e, c, a) {
    c.__esModule = !0
    var k = a(0)
    e = (function () {
      function a() {}
      a.getCookie = function (b) {
        if (0 >= document.cookie.length) return ''
        for (var d = '', f = -1, c = 0, h = document.cookie.split('; '); c < h.length; c++) {
          var g = h[c].split('=')
          if (g[0] == b) {
            var e = a.parseCookieValue(g[1])
            g = e[0]
            e = e[1]
            g > f && ((f = g), (d = e))
          }
        }
        return d
      }
      a.parseCookieValue = function (b) {
        try {
          var d = decodeURIComponent(b),
            f = d.match(new RegExp('^' + a.TIME_PREFIX + '_(\\d+)_(.*)$'))
          if (k.NullChecker.isNull(f)) return [0, d]
          var c = f.slice(1, 3)
          return [Number(c[0]), c[1]]
        } catch (n) {
          return [0, '']
        }
      }
      a.setCookie = function (b, d, f) {
        void 0 === d && (d = null)
        void 0 === f && (f = this.DEFAULT_COOKIE_EXPIRE_DAYS)
        for (var c in b) document.cookie = a.getCookieString(c, b[c], d, f)
      }
      a.getCookieString = function (b, d, f, c) {
        var h = new Date().getTime()
        c = new Date(h + 864e5 * c).toUTCString()
        d = a.TIME_PREFIX + '_' + h + '_' + d.toString()
        f = k.NullChecker.notNull(f) ? ' domain=' + f + ';' : ''
        return b + '=' + d + '; path=/; expires=' + c + ';' + f
      }
      return a
    })()
    c.CookieUtil = e
    ;(function (a) {
      a.DEFAULT_COOKIE_EXPIRE_DAYS = 180
      a.TIME_PREFIX = '__t'
    })((e = c.CookieUtil || (c.CookieUtil = {})))
    c.CookieUtil = e
  },
  function (e, c, a) {
    c.__esModule = !0
    e = (function () {
      function a(a) {}
      a.prototype.process = function () {}
      a.prototype.isResponded = function () {
        return !0
      }
      return a
    })()
    c.Base = e
  },
  function (e, c, a) {
    c.__esModule = !0
    var k = a(1),
      h = a(0)
    ;(function (a) {
      a.getBelongDomain = function (a, b, c) {
        b = h.NullChecker.notNull(b) ? [].concat(b, c) : c
        a = k.URLLocation.getDomainFromURL(a)
        for (c = 0; c < b.length; c++) {
          var d = b[c],
            f = d.split('.').join('\\.').split('-').join('\\-')
          if (new RegExp('^([^\\.]+\\.)*' + f + '$').test(a)) return d
        }
        return null
      }
    })(c.DomainDecision || (c.DomainDecision = {}))
  },
  function (e, c, a) {
    c.__esModule = !0
    e = a(12)
    a = a(5)
    c.Config = a.ObjectUtil.assign(e.Config, {})
  },
  function (e, c, a) {
    c.__esModule = !0
    c.Config = {
      loggingURL: 'https://tag-manager-prototype-dot-adways-verification.appspot.com/report',
      tagManagerURL: '//tag-manager-prototype-dot-adways-verification.appspot.com/settings',
    }
  },
  function (e, c, a) {
    c.__esModule = !0
    e = a(12)
    a = a(5)
    c.Config = a.ObjectUtil.assign(e.Config, {
      loggingURL: 'https://log.cribnotes.jp/t.gif',
      tagManagerURL: '//tag.cribnotes.jp/container_manager',
    })
  },
  function (e, c, a) {
    c.__esModule = !0
    var k = a(1),
      h = a(0),
      b = a(10)
    e = (function () {
      function a(a, b) {
        this.mainDomain = a
        this.domainList = b
      }
      a.prototype.shouldAddTrackingParameter = function (a) {
        return this.isSameDomainLink(a) ? !1 : this.isInAnotherDomain(a)
      }
      a.prototype.isSameDomainLink = function (a) {
        return k.URLLocation.getDomain() == k.URLLocation.getDomainFromURL(a)
      }
      a.prototype.isInAnotherDomain = function (a) {
        var d = b.DomainDecision.getBelongDomain(k.URLLocation.getPagePath(), this.mainDomain, this.domainList)
        a = b.DomainDecision.getBelongDomain(a, this.mainDomain, this.domainList)
        return d == a ? !1 : h.NullChecker.notNull(a)
      }
      a.prototype.execute = function () {}
      a.loadFromConfig = function (a) {
        var b = h.NullChecker.isNull(a.tracking_domains) ? [] : a.tracking_domains
        return new this(h.NullChecker.isNull(a.main_domain) ? null : a.main_domain, b)
      }
      return a
    })()
    c.Decorator = e
  },
  function (e, c, a) {
    var k =
      (this && this.__extends) ||
      (function () {
        var a =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (a, d) {
              a.__proto__ = d
            }) ||
          function (a, d) {
            for (var b in d) d.hasOwnProperty(b) && (a[b] = d[b])
          }
        return function (b, d) {
          function c() {
            this.constructor = b
          }
          a(b, d)
          b.prototype = null === d ? Object.create(d) : ((c.prototype = d.prototype), new c())
        }
      })()
    c.__esModule = !0
    e = (function (a) {
      function b() {
        return (null !== a && a.apply(this, arguments)) || this
      }
      k(b, a)
      b.report = function (b, c) {
        try {
          a.report.call(this, 'debug', b, c)
        } catch (m) {
          console.error(m)
        }
      }
      return b
    })(a(4).Logging)
    c.DebugLogging = e
  },
  function (e, c, a) {
    ;(function (c, h) {
      ;(function (a, d) {
        e.exports = d()
      })(this, function () {
        function b() {
          return function () {
            return c.nextTick(g)
          }
        }
        function d() {
          return 'undefined' !== typeof M
            ? function () {
                M(g)
              }
            : n()
        }
        function f() {
          var a = 0,
            b = new S(g),
            d = document.createTextNode('')
          b.observe(d, { characterData: !0 })
          return function () {
            d.data = a = ++a % 2
          }
        }
        function e() {
          var a = new MessageChannel()
          a.port1.onmessage = g
          return function () {
            return a.port2.postMessage(0)
          }
        }
        function n() {
          var a = setTimeout
          return function () {
            return a(g, 1)
          }
        }
        function g() {
          for (var a = 0; a < A; a += 2) (0, B[a])(B[a + 1]), (B[a] = void 0), (B[a + 1] = void 0)
          A = 0
        }
        function q() {
          try {
            var b = a(38)
            M = b.runOnLoop || b.runOnContext
            return d()
          } catch (T) {
            return n()
          }
        }
        function l(a, b) {
          var d = arguments,
            c = this,
            g = new this.constructor(k)
          void 0 === g[J] && U(g)
          var f = c._state
          f
            ? (function () {
                var a = d[f - 1]
                z(function () {
                  return V(f, g, a, c._result)
                })
              })()
            : N(c, g, a, b)
          return g
        }
        function p(a) {
          if (a && 'object' === typeof a && a.constructor === this) return a
          var b = new this(k)
          E(b, a)
          return b
        }
        function k() {}
        function v(a) {
          try {
            return a.then
          } catch (T) {
            return (F.error = T), F
          }
        }
        function y(a, b, d, c) {
          try {
            a.call(b, d, c)
          } catch (ca) {
            return ca
          }
        }
        function L(a, b, d) {
          z(function (a) {
            var c = !1,
              g = y(
                d,
                b,
                function (d) {
                  c || ((c = !0), b !== d ? E(a, d) : x(a, d))
                },
                function (b) {
                  c || ((c = !0), u(a, b))
                },
                'Settle: ' + (a._label || ' unknown promise')
              )
            !c && g && ((c = !0), u(a, g))
          }, a)
        }
        function O(a, b) {
          b._state === G
            ? x(a, b._result)
            : b._state === C
            ? u(a, b._result)
            : N(
                b,
                void 0,
                function (b) {
                  return E(a, b)
                },
                function (b) {
                  return u(a, b)
                }
              )
        }
        function w(a, b, d) {
          b.constructor === a.constructor && d === l && b.constructor.resolve === p
            ? O(a, b)
            : d === F
            ? (u(a, F.error), (F.error = null))
            : void 0 === d
            ? x(a, b)
            : 'function' === typeof d
            ? L(a, b, d)
            : x(a, b)
        }
        function E(a, b) {
          if (a === b) u(a, new TypeError('You cannot resolve a promise with itself'))
          else {
            var d = typeof b
            null === b || ('object' !== d && 'function' !== d) ? x(a, b) : w(a, b, v(b))
          }
        }
        function da(a) {
          a._onerror && a._onerror(a._result)
          H(a)
        }
        function x(a, b) {
          a._state === D && ((a._result = b), (a._state = G), 0 !== a._subscribers.length && z(H, a))
        }
        function u(a, b) {
          a._state === D && ((a._state = C), (a._result = b), z(da, a))
        }
        function N(a, b, d, c) {
          var g = a._subscribers,
            f = g.length
          a._onerror = null
          g[f] = b
          g[f + G] = d
          g[f + C] = c
          0 === f && a._state && z(H, a)
        }
        function H(a) {
          var b = a._subscribers,
            d = a._state
          if (0 !== b.length) {
            for (var c, g, f = a._result, h = 0; h < b.length; h += 3)
              (c = b[h]), (g = b[h + d]), c ? V(d, c, g, f) : g(f)
            a._subscribers.length = 0
          }
        }
        function W() {
          this.error = null
        }
        function V(a, b, d, c) {
          var g = 'function' === typeof d,
            f = void 0,
            h = void 0,
            e = void 0,
            l = void 0
          if (g) {
            try {
              f = d(c)
            } catch (ea) {
              ;(P.error = ea), (f = P)
            }
            f === P ? ((l = !0), (h = f.error), (f.error = null)) : (e = !0)
            if (b === f) {
              u(b, new TypeError('A promises callback cannot return that same promise.'))
              return
            }
          } else (f = c), (e = !0)
          b._state === D && (g && e ? E(b, f) : l ? u(b, h) : a === G ? x(b, f) : a === C && u(b, f))
        }
        function fa(a, b) {
          try {
            b(
              function (b) {
                E(a, b)
              },
              function (b) {
                u(a, b)
              }
            )
          } catch (aa) {
            u(a, aa)
          }
        }
        function U(a) {
          a[J] = X++
          a._state = void 0
          a._result = void 0
          a._subscribers = []
        }
        function I(a, b) {
          this._instanceConstructor = a
          this.promise = new a(k)
          this.promise[J] || U(this.promise)
          Y(b)
            ? ((this._remaining = this.length = b.length),
              (this._result = Array(this.length)),
              0 === this.length
                ? x(this.promise, this._result)
                : ((this.length = this.length || 0),
                  this._enumerate(b),
                  0 === this._remaining && x(this.promise, this._result)))
            : u(this.promise, Error('Array Methods must be provided an Array'))
        }
        function t(a) {
          this[J] = X++
          this._result = this._state = void 0
          this._subscribers = []
          if (k !== a) {
            if ('function' !== typeof a)
              throw new TypeError('You must pass a resolver function as the first argument to the promise constructor')
            if (this instanceof t) fa(this, a)
            else
              throw new TypeError(
                "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
              )
          }
        }
        var Q = void 0,
          Y = (Q = Array.isArray
            ? Array.isArray
            : function (a) {
                return '[object Array]' === Object.prototype.toString.call(a)
              }),
          A = 0,
          M = void 0,
          R = void 0,
          z = function (a, b) {
            B[A] = a
            B[A + 1] = b
            A += 2
            2 === A && (R ? R(g) : Z())
          },
          K = (Q = 'undefined' !== typeof window ? window : void 0) || {},
          S = K.MutationObserver || K.WebKitMutationObserver
        K = 'undefined' === typeof self && 'undefined' !== typeof c && '[object process]' === {}.toString.call(c)
        var ha =
            'undefined' !== typeof Uint8ClampedArray &&
            'undefined' !== typeof importScripts &&
            'undefined' !== typeof MessageChannel,
          B = Array(1e3),
          Z = void 0
        Z = K ? b() : S ? f() : ha ? e() : void 0 === Q ? q() : n()
        var J = Math.random().toString(36).substring(16),
          D = void 0,
          G = 1,
          C = 2,
          F = new W(),
          P = new W(),
          X = 0
        I.prototype._enumerate = function (a) {
          for (var b = 0; this._state === D && b < a.length; b++) this._eachEntry(a[b], b)
        }
        I.prototype._eachEntry = function (a, b) {
          var d = this._instanceConstructor,
            c = d.resolve
          c === p
            ? ((c = v(a)),
              c === l && a._state !== D
                ? this._settledAt(a._state, b, a._result)
                : 'function' !== typeof c
                ? (this._remaining--, (this._result[b] = a))
                : d === t
                ? ((d = new d(k)), w(d, a, c), this._willSettleAt(d, b))
                : this._willSettleAt(
                    new d(function (b) {
                      return b(a)
                    }),
                    b
                  ))
            : this._willSettleAt(c(a), b)
        }
        I.prototype._settledAt = function (a, b, d) {
          var c = this.promise
          c._state === D && (this._remaining--, a === C ? u(c, d) : (this._result[b] = d))
          0 === this._remaining && x(c, this._result)
        }
        I.prototype._willSettleAt = function (a, b) {
          var d = this
          N(
            a,
            void 0,
            function (a) {
              return d._settledAt(G, b, a)
            },
            function (a) {
              return d._settledAt(C, b, a)
            }
          )
        }
        t.all = function (a) {
          return new I(this, a).promise
        }
        t.race = function (a) {
          var b = this
          return Y(a)
            ? new b(function (d, c) {
                for (var f = a.length, g = 0; g < f; g++) b.resolve(a[g]).then(d, c)
              })
            : new b(function (a, b) {
                return b(new TypeError('You must pass an array to race.'))
              })
        }
        t.resolve = p
        t.reject = function (a) {
          var b = new this(k)
          u(b, a)
          return b
        }
        t._setScheduler = function (a) {
          R = a
        }
        t._setAsap = function (a) {
          z = a
        }
        t._asap = z
        t.prototype = {
          constructor: t,
          then: l,
          catch: function (a) {
            return this.then(null, a)
          },
        }
        t.polyfill = function () {
          var a = void 0
          if ('undefined' !== typeof h) a = h
          else if ('undefined' !== typeof self) a = self
          else
            try {
              a = Function('return this')()
            } catch (ba) {
              throw Error('polyfill failed because global object is unavailable in this environment')
            }
          var b = a.Promise
          if (b) {
            var d = null
            try {
              d = Object.prototype.toString.call(b.resolve())
            } catch (ba) {}
            if ('[object Promise]' === d && !b.cast) return
          }
          a.Promise = t
        }
        return (t.Promise = t)
      })
    }.call(c, a(36), a(37)))
  },
  function (e, c, a) {
    var k =
        (this && this.__awaiter) ||
        function (a, b, d, c) {
          return new (d || (d = Promise))(function (f, g) {
            function h(a) {
              try {
                l(c.next(a))
              } catch (w) {
                g(w)
              }
            }
            function e(a) {
              try {
                l(c['throw'](a))
              } catch (w) {
                g(w)
              }
            }
            function l(a) {
              a.done
                ? f(a.value)
                : new d(function (b) {
                    b(a.value)
                  }).then(h, e)
            }
            l((c = c.apply(a, b || [])).next())
          })
        },
      h =
        (this && this.__generator) ||
        function (a, b) {
          function d(a) {
            return function (b) {
              return c([a, b])
            }
          }
          function c(d) {
            if (g) throw new TypeError('Generator is already executing.')
            for (; f; )
              try {
                if (
                  ((g = 1), h && (e = h[d[0] & 2 ? 'return' : d[0] ? 'throw' : 'next']) && !(e = e.call(h, d[1])).done)
                )
                  return e
                if (((h = 0), e)) d = [0, e.value]
                switch (d[0]) {
                  case 0:
                  case 1:
                    e = d
                    break
                  case 4:
                    return f.label++, { value: d[1], done: !1 }
                  case 5:
                    f.label++
                    h = d[1]
                    d = [0]
                    continue
                  case 7:
                    d = f.ops.pop()
                    f.trys.pop()
                    continue
                  default:
                    if (!((e = f.trys), (e = 0 < e.length && e[e.length - 1])) && (6 === d[0] || 2 === d[0])) {
                      f = 0
                      continue
                    }
                    if (3 === d[0] && (!e || (d[1] > e[0] && d[1] < e[3]))) f.label = d[1]
                    else if (6 === d[0] && f.label < e[1]) (f.label = e[1]), (e = d)
                    else if (e && f.label < e[2]) (f.label = e[2]), f.ops.push(d)
                    else {
                      e[2] && f.ops.pop()
                      f.trys.pop()
                      continue
                    }
                }
                d = b.call(a, f)
              } catch (w) {
                ;(d = [6, w]), (h = 0)
              } finally {
                g = e = 0
              }
            if (d[0] & 5) throw d[1]
            return { value: d[0] ? d[1] : void 0, done: !0 }
          }
          var f = {
              label: 0,
              sent: function () {
                if (e[0] & 1) throw e[1]
                return e[1]
              },
              trys: [],
              ops: [],
            },
            g,
            h,
            e,
            n
          return (
            (n = { next: d(0), throw: d(1), return: d(2) }),
            'function' === typeof Symbol &&
              (n[Symbol.iterator] = function () {
                return this
              }),
            n
          )
        }
    c.__esModule = !0
    var b = a(3),
      d = a(20)
    e = a(41)
    var f = a(16),
      m = a(6)
    c = a(42)
    a = a(43)
    ;(function () {
      m.EventListener.addDomReadyEvent(function () {
        ;(function () {
          return k(this, void 0, f.Promise, function () {
            var a, c, f, e
            return h(this, function (g) {
              switch (g.label) {
                case 0:
                  ;(a = '51bacb1b-c5e1-4993-95f5-4f0ea2f42ebb'),
                    (c = (function () {
                      return {
                        main_domain: 'kobekyo.com',
                        tracking_domains: [],
                        should_run_link_decoration: true,
                        should_run_form_decoration: true,
                        custom_input_params: { utm_source: 'type', utm_medium: 'medium', utm_campaign: 'campaign' },
                        tags: [
                          {
                            conditionList: [
                              'TagFiringCondition.TrackingParam.isEqual("type", "jn")',
                              '&&',
                              'TagFiringCondition.TrackingParam.isEqual("pid", "461109")',
                              '&&',
                              '(function(TagFiringCondition){var data = new Date().getTime()/1000;var target = Number(TagFiringCondition.Tracking.getData().get("et"));return target === 0 || data < target;})(TagFiringCondition)',
                              '&&',
                              '(function (TagFiringCondition){  var data = TagFiringCondition.DataLayer.get(["__cribnotes", "thanks_id"]);  var splitData = data.split(",");var expected = ["409794"];var isMatch = false;for(var dataIdx = 0; splitData.length > dataIdx; dataIdx++){  for(var expectedIdx = 0; splitData.length >= expectedIdx; expectedIdx++){    if(splitData[dataIdx] === expected[expectedIdx]){      isMatch = true;      break;    }  }  if(isMatch){    break;  }}return isMatch;  })(TagFiringCondition)',
                              '&&',
                            ],
                            condition: function (TagFiringCondition) {
                              try {
                                var url =
                                  document.location.protocol +
                                  '//' +
                                  document.location.host +
                                  document.location.pathname
                                var trackingData = TagFiringCondition.Tracking.getData()
                                var cribNotesID = trackingData.get('uuid')
                                var queryString = window.location.search.substring(1, window.location.search.length)
                                var urlAnchor = window.location.hash
                                var allTrackingData = JSON.stringify(trackingData)
                                var img1 = document.createElement('img')
                                img1.src =
                                  'https://log.cribnotes.jp/t.gif?t=debug&v=1.3.0&c=51bacb1b-c5e1-4993-95f5-4f0ea2f42ebb&u=' +
                                  encodeURIComponent(url) +
                                  '&q=' +
                                  encodeURIComponent(queryString) +
                                  '&a=' +
                                  encodeURIComponent(urlAnchor) +
                                  '&cn=' +
                                  cribNotesID +
                                  '&m=TrackingData:' +
                                  encodeURIComponent(allTrackingData)
                                var allDataLayer = TagFiringCondition.DataLayer.get(['__cribnotes'])
                                var img2 = document.createElement('img')
                                img2.src =
                                  'https://log.cribnotes.jp/t.gif?t=debug&v=1.3.0&c=51bacb1b-c5e1-4993-95f5-4f0ea2f42ebb&u=' +
                                  encodeURIComponent(url) +
                                  '&q=' +
                                  encodeURIComponent(queryString) +
                                  '&a=' +
                                  encodeURIComponent(urlAnchor) +
                                  '&cn=' +
                                  cribNotesID +
                                  '&m=DataLayer:' +
                                  JSON.stringify(allDataLayer)
                              } catch (e) {
                                if (e && e.message) {
                                  var errimg = document.createElement('img')
                                  errimg.src =
                                    'https://log.cribnotes.jp/t.gif?t=error&c=51bacb1b-c5e1-4993-95f5-4f0ea2f42ebb&m=' +
                                    encodeURIComponent(e.message)
                                }
                              }
                              return (
                                TagFiringCondition.TrackingParam.isEqual('type', 'jn') &&
                                TagFiringCondition.TrackingParam.isEqual('pid', '461109') &&
                                (function (TagFiringCondition) {
                                  var data = new Date().getTime() / 1000
                                  var target = Number(TagFiringCondition.Tracking.getData().get('et'))
                                  return target === 0 || data < target
                                })(TagFiringCondition) &&
                                (function (TagFiringCondition) {
                                  var data = TagFiringCondition.DataLayer.get(['__cribnotes', 'thanks_id'])
                                  var splitData = data.split(',')
                                  var expected = ['409794']
                                  var isMatch = false
                                  for (var dataIdx = 0; splitData.length > dataIdx; dataIdx++) {
                                    for (var expectedIdx = 0; splitData.length >= expectedIdx; expectedIdx++) {
                                      if (splitData[dataIdx] === expected[expectedIdx]) {
                                        isMatch = true
                                        break
                                      }
                                    }
                                    if (isMatch) {
                                      break
                                    }
                                  }
                                  return isMatch
                                })(TagFiringCondition)
                              )
                            },
                            output_html: function (TagFunctions) {
                              var sessionId = TagFunctions.getTrackingValue('sid')
                              var thanksId = '409794'
                              var transactionId = TagFunctions.getFromDataLayer(['__cribnotes', 'transaction_id'])
                              var itemsPath = ''
                              var uuid = TagFunctions.getTrackingValue('uuid')
                              var urlPath =
                                'https://v2action.j-a-net.jp//' +
                                sessionId +
                                '/' +
                                encodeURIComponent(transactionId) +
                                '/' +
                                thanksId +
                                itemsPath
                              return '<img src="' + TagFunctions.addQueryParam(urlPath, { uuid: uuid }) + '">'
                            },
                          },
                        ],
                      }
                    })()),
                    (g.label = 1)
                case 1:
                  return (
                    g.trys.push([1, 6, , 7]),
                    (f = void 0),
                    'string' === typeof c ? [3, 3] : [4, d.TagManagerEngine.fromConfig(a, c)]
                  )
                case 2:
                  return (f = g.sent()), [3, 5]
                case 3:
                  return [4, d.TagManagerEngine.fromAjax(a)]
                case 4:
                  ;(f = g.sent()), (g.label = 5)
                case 5:
                  return (
                    f.runInputProcessor(),
                    f.loadLocalStorage(),
                    f.assignTrackingUserId(),
                    f.saveLocalStorage(),
                    f.runOutputProcessor(),
                    f.runCompleteCallback(),
                    [3, 7]
                  )
                case 6:
                  return (e = g.sent()), console.error(e), b.ErrorLogging.report(a, e.message), [3, 7]
                case 7:
                  return [2]
              }
            })
          })
        })()
      })
    })()
    e.GlobalVariable.setGlobalVariable('setItem', c['default'])
    e.GlobalVariable.setGlobalVariable('getQueryParams', a['default'])
  },
  function (e, c, a) {
    c.__esModule = !0
    var k = a(0).NullChecker.isNull('1.6.3-beta1') ? '1.0.0' : '1.6.3-beta1'
    e = (function () {
      function a() {}
      a.get = function () {
        return k
      }
      return a
    })()
    c.VERSION = e
  },
  function (e, c, a) {
    c.__esModule = !0
    e = (function () {
      function a(a) {
        this.value = encodeURIComponent(a)
      }
      a.prototype.toString = function () {
        return this.value
      }
      a.prototype.getDecoded = function () {
        return decodeURIComponent(this.value)
      }
      return a
    })()
    c.URIString = e
  },
  function (e, c, a) {
    c.__esModule = !0
    var k = a(21),
      h = a(25),
      b = a(26),
      d = a(27),
      f = a(0),
      m = a(2),
      n = a(1),
      g = a(35),
      q = a(16),
      l = a(39),
      p = a(8),
      r = a(40),
      v = a(10),
      y = (f.NullChecker.isNull('production') ? a(11) : a(13)).Config
    e = (function () {
      function a(a, b, d, c) {
        this.containerId = a
        this.shouldRunLinkDecoration = b
        this.shouldRunFormDecoration = d
        this.config = c
      }
      a.prototype.runInputProcessor = function () {
        k.InputProcessor.Aggrigator.guess(this.config).process()
      }
      a.prototype.loadLocalStorage = function () {
        var a = m.TrackingData.fromCookie(),
          b = r.LocalStorageUtil.get(m.TrackingData.TRACKING_KEY_FOR_LOCAL_STORAGE)
        b = m.TrackingData.fromCookieValue(b)
        a = this.mergeTrackingData(a, b)
        b = this.getBelongedCookieDomain()
        p.CookieUtil.setCookie(a.asCookieParamForTracking(), b)
      }
      a.prototype.saveLocalStorage = function () {
        var a = m.TrackingData.fromCookie().asCookieParamForTracking()[m.TrackingData.TRACKING_KEY_FOR_COOKIE]
        if (a && 'function' === typeof a.toString) {
          var b = new Date().getTime()
          r.LocalStorageUtil.set(
            m.TrackingData.TRACKING_KEY_FOR_LOCAL_STORAGE,
            p.CookieUtil.TIME_PREFIX + '_' + b + '_' + a.toString()
          )
        }
      }
      a.prototype.assignTrackingUserId = function () {
        var a = m.TrackingData.fromCookie()
        if (!a.isAssignedTrackingUserId()) {
          a.assignTrackingUserId()
          var b = this.getBelongedCookieDomain()
          p.CookieUtil.setCookie(a.asCookieParamForTracking(), b)
        }
      }
      a.prototype.runOutputProcessor = function () {
        this.shouldRunLinkDecoration && h.LinkDecorator.loadFromConfig(this.config).execute()
        this.shouldRunFormDecoration && b.FormDecorator.loadFromConfig(this.config).execute()
        d.TagList.fromConfig(this.containerId, this.config).fireAll() &&
          l.ContainerCompleteLogging.report(this.containerId, 'Tags is completed!')
      }
      a.prototype.runCompleteCallback = function () {
        if (
          !f.NullChecker.isNull(window[a.CALLBACK_OF_COMPLETE_FUNCTION_KEY]) &&
          'function' == typeof window[a.CALLBACK_OF_COMPLETE_FUNCTION_KEY]
        )
          window[a.CALLBACK_OF_COMPLETE_FUNCTION_KEY]()
      }
      a.fromConfig = function (b, d) {
        var c = f.NullChecker.isNull(d.should_run_link_decoration)
            ? !1
            : 'boolean' == typeof d.should_run_link_decoration && d.should_run_link_decoration,
          g = f.NullChecker.isNull(d.should_run_form_decoration)
            ? !1
            : 'boolean' == typeof d.should_run_form_decoration && d.should_run_form_decoration
        return new a(b, c, g, d)
      }
      a.fromAjax = function (b) {
        var d = (this.isPreviewMode() ? 'preview' : 'production') + '.js',
          c = a.getTagManagerDomain() + '/' + b + '/' + d
        return new q.Promise(function (d, f) {
          var e = g.CrossBrowserXHR.xhrObject()
          e.open('GET', c)
          e.onload = function (h) {
            if (e.readyState == g.CrossBrowserXHR.LoadingState.COMPLETE)
              try {
                if (e.status != g.CrossBrowserXHR.StatusCode.OK)
                  throw Error('Cannot load the config file from AJAX !!\nURL: ' + c + '\nERROR: ' + e.statusText)
                d(a.fromConfig(b, eval(e.responseText)))
              } catch (H) {
                f(H)
              }
          }
          e.onerror = function () {
            f(Error("Communication error is occured. Please check container's URL or CORS!!!!"))
          }
          e.onabort = function () {
            f(Error('Communication is aborted!!!'))
          }
          e.ontimeout = function () {
            f(Error('Timeout error is occured!!!'))
          }
          e.send(null)
        })
      }
      a.getTagManagerDomain = function () {
        var a = n.URLLocation.getProtocol()
        'https:' != a && 'http:' != a && (a = 'https:')
        return a + y.tagManagerURL
      }
      a.isPreviewMode = function () {
        return this.isContainsTrackingParam()
          ? '1' == n.URLLocation.getQueryParam()[m.TrackingData.TRACKING_PREFIX + '_' + m.TrackingData.PREVIEW_MODE_KEY]
          : m.TrackingData.fromCookie().isPreviewMode()
      }
      a.isContainsTrackingParam = function () {
        var a = n.URLLocation.getQueryParam(),
          b
        for (b in a) if (new RegExp('^' + m.TrackingData.TRACKING_PREFIX + '_.+').test(b)) return !0
        return !1
      }
      a.prototype.getBelongedCookieDomain = function () {
        return v.DomainDecision.getBelongDomain(
          n.URLLocation.getPagePath(),
          this.config[a.MAIN_DOMAIN],
          this.config[a.TRACKING_COOKIE]
        )
      }
      a.prototype.mergeTrackingData = function (a, b) {
        for (var d = 0, c = b.keys(); d < c.length; d++) {
          var f = c[d]
          b.get(f) && !a.get(f) && a.set(f, b.get(f))
        }
        return a
      }
      return a
    })()
    c.TagManagerEngine = e
    ;(function (a) {
      a.CALLBACK_OF_COMPLETE_FUNCTION_KEY = '__cribnotesCompleteCallback__'
      a.MAIN_DOMAIN = 'main_domain'
      a.TRACKING_COOKIE = 'tracking_domains'
    })((e = c.TagManagerEngine || (c.TagManagerEngine = {})))
    c.TagManagerEngine = e
  },
  function (e, c, a) {
    c.__esModule = !0
    e = a(22)
    c.InputProcessor = e
  },
  function (e, c, a) {
    c.__esModule = !0
    e = a(23)
    c.AdwaysCPA = e.AdwaysCPA
    var k = a(24)
    c.Nop = k.Nop
    a = a(9)
    c.Base = a.Base
    a = (function () {
      function a() {}
      a.guess = function (b) {
        for (var d = 0, c = a.TRACKING_CLASS_LIST; d < c.length; d++) {
          var e = new c[d](b)
          if (e.isResponded()) return e
        }
        return new k.Nop(b)
      }
      return a
    })()
    c.Aggrigator = a
    ;(a = c.Aggrigator || (c.Aggrigator = {})).TRACKING_CLASS_LIST = [e.AdwaysCPA]
    c.Aggrigator = a
  },
  function (e, c, a) {
    var k =
      (this && this.__extends) ||
      (function () {
        var a =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (a, b) {
              a.__proto__ = b
            }) ||
          function (a, b) {
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d])
          }
        return function (b, d) {
          function c() {
            this.constructor = b
          }
          a(b, d)
          b.prototype = null === d ? Object.create(d) : ((c.prototype = d.prototype), new c())
        }
      })()
    c.__esModule = !0
    e = a(9)
    var h = a(0),
      b = a(2),
      d = a(8),
      f = a(1),
      m = a(10)
    a = (function (a) {
      function c(b) {
        var d = a.call(this, b) || this
        d.customInputParams = {}
        d.mainDomain = null
        d.trackingDomains = []
        h.NullChecker.notNull(b[c.CUSTOM_INPUT_PARAMS_KEY]) && (d.customInputParams = b[c.CUSTOM_INPUT_PARAMS_KEY])
        h.NullChecker.notNull(b[c.MAIN_DOMAIN_PARAMS_KEY]) && (d.mainDomain = b[c.MAIN_DOMAIN_PARAMS_KEY])
        h.NullChecker.notNull(b[c.TRACKING_DOMAINS_PARAMS_KEY]) &&
          (d.trackingDomains = b[c.TRACKING_DOMAINS_PARAMS_KEY])
        return d
      }
      k(c, a)
      c.prototype.process = function () {
        var a = f.URLLocation.getQueryParam()
        a = b.TrackingData.fromQueryParamWithOptionals(this.getCustomInputParams(a), a)
        var c = m.DomainDecision.getBelongDomain(f.URLLocation.getPagePath(), this.mainDomain, this.trackingDomains)
        d.CookieUtil.setCookie(this.takeOverTrackingUserIdFromCookie(a).asCookieParamForTracking(), c)
      }
      c.prototype.getCustomInputParams = function (a) {
        var b = {},
          d
        for (d in this.customInputParams) {
          var c = this.customInputParams[d]
          h.NullChecker.notNull(a[d]) && (b[c] = a[d])
        }
        return b
      }
      c.prototype.takeOverTrackingUserIdFromCookie = function (a) {
        if (this.isViaDecoratedLink(a) || this.isFirstVisited()) return a
        a.set(b.TrackingData.TRACKING_USER_ID_KEY, b.TrackingData.fromCookie().get(b.TrackingData.TRACKING_USER_ID_KEY))
        return a
      }
      c.prototype.isViaDecoratedLink = function (a) {
        return '' != a.get(b.TrackingData.TRACKING_USER_ID_KEY)
      }
      c.prototype.isFirstVisited = function () {
        return '' == b.TrackingData.fromCookie().get(b.TrackingData.TRACKING_USER_ID_KEY)
      }
      c.prototype.isResponded = function () {
        return this.isContainsTrackingParam()
      }
      c.prototype.isContainsTrackingParam = function () {
        var a = f.URLLocation.getQueryParam(),
          d
        for (d in a) if (new RegExp('^' + b.TrackingData.TRACKING_PREFIX + '_.+').test(d)) return !0
        return !1
      }
      return c
    })(e.Base)
    c.AdwaysCPA = a
    ;(function (a) {
      a.CUSTOM_INPUT_PARAMS_KEY = 'custom_input_params'
      a.MAIN_DOMAIN_PARAMS_KEY = 'main_domain'
      a.TRACKING_DOMAINS_PARAMS_KEY = 'tracking_domains'
    })((a = c.AdwaysCPA || (c.AdwaysCPA = {})))
    c.AdwaysCPA = a
  },
  function (e, c, a) {
    var k =
      (this && this.__extends) ||
      (function () {
        var a =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (a, d) {
              a.__proto__ = d
            }) ||
          function (a, d) {
            for (var b in d) d.hasOwnProperty(b) && (a[b] = d[b])
          }
        return function (b, d) {
          function c() {
            this.constructor = b
          }
          a(b, d)
          b.prototype = null === d ? Object.create(d) : ((c.prototype = d.prototype), new c())
        }
      })()
    c.__esModule = !0
    e = (function (a) {
      function b() {
        return (null !== a && a.apply(this, arguments)) || this
      }
      k(b, a)
      b.prototype.process = function () {}
      b.prototype.isResponded = function () {
        return !0
      }
      return b
    })(a(9).Base)
    c.Nop = e
  },
  function (e, c, a) {
    var k =
      (this && this.__extends) ||
      (function () {
        var a =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (a, b) {
              a.__proto__ = b
            }) ||
          function (a, b) {
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d])
          }
        return function (b, d) {
          function c() {
            this.constructor = b
          }
          a(b, d)
          b.prototype = null === d ? Object.create(d) : ((c.prototype = d.prototype), new c())
        }
      })()
    c.__esModule = !0
    e = a(14)
    var h = a(2),
      b = a(6),
      d = a(1)
    a = (function (a) {
      function c() {
        return (null !== a && a.apply(this, arguments)) || this
      }
      k(c, a)
      c.prototype.execute = function () {
        var a = h.TrackingData.fromCookie(),
          c = document.querySelectorAll('a'),
          f = a.asQueryParamForTracking()
        a = function (a) {
          var g = c[a],
            h = e
          b.EventListener.addEventListener(g, 'click', function () {
            h.shouldAddTrackingParameter(g.href) && (g.href = d.URLLocation.addQueryParamWithoutOverride(g.href, f))
          })
        }
        for (var e = this, k = 0; k < c.length; k++) a(k)
      }
      return c
    })(e.Decorator)
    c.LinkDecorator = a
  },
  function (e, c, a) {
    var k =
      (this && this.__extends) ||
      (function () {
        var a =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (a, b) {
              a.__proto__ = b
            }) ||
          function (a, b) {
            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d])
          }
        return function (b, d) {
          function c() {
            this.constructor = b
          }
          a(b, d)
          b.prototype = null === d ? Object.create(d) : ((c.prototype = d.prototype), new c())
        }
      })()
    c.__esModule = !0
    e = a(14)
    var h = a(2),
      b = a(6),
      d = a(1),
      f = a(0)
    a = (function (a) {
      function c() {
        return (null !== a && a.apply(this, arguments)) || this
      }
      k(c, a)
      c.prototype.execute = function () {
        var a = h.TrackingData.fromCookie(),
          f = document.querySelectorAll('form'),
          e = a.asQueryParamForTracking()
        a = function (a) {
          var g = f[a],
            h = k
          b.EventListener.addEventListener(g, 'submit', function () {
            h.shouldAddTrackingParameter(g.action) &&
              ('get' == g.method.toLowerCase()
                ? c.addInputElements(g, e)
                : (g.action = d.URLLocation.addQueryParamWithoutOverride(g.action, e)))
          })
        }
        for (var k = this, m = 0; m < f.length; m++) a(m)
      }
      c.addInputElements = function (a, b) {
        for (var d in b) {
          var c = a.querySelector('input[name="' + d + '"]')
          f.NullChecker.isNull(c) &&
            ((c = document.createElement('input')),
            (c.type = 'hidden'),
            (c.name = d),
            (c.value = b[d]),
            a.appendChild(c))
        }
      }
      return c
    })(e.Decorator)
    c.FormDecorator = a
  },
  function (e, c, a) {
    c.__esModule = !0
    var k = a(28),
      h = a(0),
      b = a(3)
    e = (function () {
      function a(a, b) {
        this.containerId = a
        this.tagList = b
      }
      a.prototype.fireAll = function () {
        for (var a = !0, d = 0, c = this.tagList; d < c.length; d++) {
          var e = c[d]
          try {
            e.runFiringLogic()
          } catch (q) {
            console.error(q.message), b.ErrorLogging.report(this.containerId, q.message), (a = !1)
          }
        }
        return a
      }
      a.fromConfig = function (b, d) {
        for (var c = [], f = 0, e = d.tags; f < e.length; f++) {
          var l = e[f]
          h.NullChecker.isNull(l.output_html) ||
            c.push(
              new k.Tag(
                b,
                h.NullChecker.isNull(l.condition) ? k.Tag.NO_CONDITION : l.condition,
                l.output_html,
                h.NullChecker.isNull(l.firing_process) ? k.Tag.DEFAULT_FIRING_LOGIC : l.firing_process
              )
            )
        }
        return new a(b, c)
      }
      return a
    })()
    c.TagList = e
  },
  function (e, c, a) {
    c.__esModule = !0
    var k = a(29),
      h = a(32),
      b = a(34)
    e = (function () {
      function a(a, b, d, c) {
        this.containerId = a
        this.condition = b
        this.outputTag = d
        this.firingProcess = c
      }
      a.prototype.getTags = function () {
        var a = document.createElement('div')
        a.innerHTML = '*' + this.outputTag(k.TagFunctions)
        a = a.children
        for (var b = [], d = 0; d < a.length; d++) b.push(a[d])
        return b
      }
      a.prototype.runFiringLogic = function () {
        this.firingProcess(this, k.TagFunctions)
      }
      a.prototype.getContainerId = function () {
        return this.containerId
      }
      a.prototype.checkCondition = function () {
        return this.condition(h.TagFiringCondition)
      }
      a.prototype.fire = function () {
        var d = this.getTags(),
          c = document.createElement('div')
        c.style.cssText = 'display: none; visibility: hidden;'
        c.className = '__cribnotesTagMgr'
        document.getElementsByTagName('body')[0].appendChild(c)
        for (var e = 0; e < d.length; e++) {
          var g = d[e]
          'SCRIPT' == g.tagName ? a.fireAsScriptTag(a.reconfigAsyncFlagFromHTML(g), c) : c.appendChild(g)
          b.TagFiredLogging.report(this.containerId, g.outerHTML)
        }
      }
      a.reconfigAsyncFlagFromHTML = function (a) {
        a.hasAttribute('async') ? (a.async = !0) : (a.async = !1)
        return a
      }
      a.fireAsScriptTag = function (a, b) {
        var d = document.createElement('script')
        d.async = !1
        a.async && (d.async = a.async)
        a.charset && (d.charset = a.charset)
        a.crossOrigin && (d.crossOrigin = a.crossOrigin)
        a.defer && (d.defer = a.defer)
        a.event && (d.event = a.event)
        a.htmlFor && (d.htmlFor = a.htmlFor)
        a.src && (d.src = a.src)
        a.text && (d.text = a.text)
        a.type && (d.type = a.type)
        a.integrity && (d.integrity = a.integrity)
        b.appendChild(d)
      }
      return a
    })()
    c.Tag = e
    ;(function (a) {
      a.NO_CONDITION = function (a) {
        return !0
      }
      a.DEFAULT_FIRING_LOGIC = function (a, b) {
        a.checkCondition() && a.fire()
      }
    })((e = c.Tag || (c.Tag = {})))
    c.Tag = e
  },
  function (e, c, a) {
    c.__esModule = !0
    var k = a(2),
      h = a(30),
      b = a(0),
      d = a(1),
      f = a(7),
      m = a(31),
      n = a(3),
      g = a(15)
    e = (function () {
      function a() {}
      a.getFromDom = function (a, d) {
        void 0 === d && (d = null)
        var c = b.NullChecker.isNull(d) ? document.querySelector(a) : d.querySelector(a)
        return b.NullChecker.isNull(c) ? document.createElement('div') : c
      }
      a.getListFromDom = function (a) {
        a = document.querySelectorAll(a)
        for (var b = [], d = 0; d < a.length; d++) b.push(a[d])
        return b
      }
      a.getFromDataLayer = function (a, d) {
        void 0 === d && (d = null)
        var c = this.getFromDataLayerObj(a, d)
        return b.NullChecker.isNull(c) ? '' : 'string' === typeof c ? c.toString() : JSON.stringify(c)
      }
      a.getListFromDataLayer = function (a) {
        a = this.getFromDataLayerObj(a)
        return b.NullChecker.isNull(a) ? [] : h.isArray(a) ? a : [a]
      }
      a.convertObjFromDataLayer = function () {
        var a = b.NullChecker.notNull(window.cribNotesData)
          ? window.cribNotesData
          : b.NullChecker.notNull(window.dataLayer)
          ? window.dataLayer
          : null
        if (null == a) return null
        for (var d = {}, c = 0; c < a.length; c++) {
          var e = a[c],
            f
          for (f in e) d[f] = e[f]
        }
        return d
      }
      a.getFromDataLayerObj = function (a, d) {
        void 0 === d && (d = null)
        if (0 >= a.length) return null
        var c = d ? d : this.convertObjFromDataLayer()
        if (b.NullChecker.isNull(c)) return null
        for (var e = 0; e < a.length; e++) if (((c = c[a[e]]), b.NullChecker.isNull(c))) return null
        return c
      }
      a.joinListByMethod = function (a, b, d) {
        for (var c = [], e = 0; e < b.length; e++) c.push(d(b[e]))
        return c.join(a)
      }
      a.addQueryParam = function (a, b) {
        return d.URLLocation.addQueryParam(a, b)
      }
      a.getTrackingParamName = function () {
        return k.TrackingData.TRACKING_KEY_FOR_COOKIE
      }
      a.getTrackingValue = function (a) {
        return k.TrackingData.fromCookie().get(a)
      }
      return a
    })()
    c.TagFunctions = e
    ;(function (a) {
      ;(function (a) {
        a.generate = function () {
          return f.UUID.generate()
        }
      })(a.UUID || (a.UUID = {}))
      ;(function (a) {
        a.addEventListener = function (a, b, d, c) {
          m.EventListener.addEventListener(a, b, d, c)
        }
      })(a.Event || (a.Event = {}))
      ;(function (a) {
        a.getDomainFromURL = function (a) {
          return d.URLLocation.getDomainFromURL(a)
        }
        a.getQueryParam = function () {
          return d.URLLocation.getQueryParam()
        }
        a.getPagePath = function () {
          return d.URLLocation.getPagePath()
        }
      })(a.URL || (a.URL = {}))
      ;(function (a) {
        function d(a, d) {
          void 0 === d && (d = null)
          if (0 >= a.length) return null
          if (d) var c = d
          else if (
            ((c = b.NullChecker.notNull(window.cribNotesData)
              ? window.cribNotesData
              : b.NullChecker.notNull(window.dataLayer)
              ? window.dataLayer
              : null),
            null == c)
          )
            c = null
          else {
            for (var e = {}, f = 0; f < c.length; f++) {
              var g = c[f],
                h
              for (h in g) e[h] = g[h]
            }
            c = e
          }
          if (b.NullChecker.isNull(c)) return null
          for (e = 0; e < a.length; e++) if (((c = c[a[e]]), b.NullChecker.isNull(c))) return null
          return c
        }
        a.get = function (a, c) {
          void 0 === c && (c = null)
          var e = d(a, c)
          return b.NullChecker.isNull(e) ? '' : 'string' === typeof e ? e.toString() : e
        }
      })(a.DataLayer || (a.DataLayer = {}))
      ;(function (a) {
        a.get = function (a) {
          a = document.querySelector(a)
          return b.NullChecker.isNull(a) ? document.createElement('div') : a
        }
      })(a.DOM || (a.DOM = {}))
      ;(function (a) {
        a.getData = function () {
          return k.TrackingData.fromCookie()
        }
      })(a.Tracking || (a.Tracking = {}))
      ;(function (a) {
        a.error = function (a, b) {
          n.ErrorLogging.report(a, b)
        }
        a.debug = function (a, b, d) {
          g.DebugLogging.report(a, b + ':' + d)
        }
      })(a.Logging || (a.Logging = {}))
    })((e = c.TagFunctions || (c.TagFunctions = {})))
    c.TagFunctions = e
  },
  function (e, c, a) {
    function k(a) {
      return '[object Array]' === Object.prototype.toString.call(a)
    }
    c.__esModule = !0
    e = (function () {
      function a() {}
      a.find = function (a, d) {
        if (!k(a)) throw new TypeError('ArrayUtil.find called on not array object')
        if ('function' !== typeof d) throw new TypeError('callback must be a function')
        for (var b = Object(a), c = b.length >>> 0, e, g = 0; g < c; g++) if (((e = b[g]), d.call(d, e, g, b))) return e
      }
      a.map = function (a, d) {
        var b, c
        if (!k(a)) throw new TypeError('this is not array object')
        var e = Object(a),
          g = e.length >>> 0
        if ('function' !== typeof d) throw new TypeError(d + ' is not a function')
        1 < arguments.length && (b = arguments[1])
        var h = Array(g)
        for (c = 0; c < g; ) {
          if (c in e) {
            var l = e[c]
            l = d.call(b, l, c, e)
            h[c] = l
          }
          c++
        }
        return h
      }
      return a
    })()
    c.ArrayUtil = e
    c.isArray = k
  },
  function (e, c, a) {
    c.__esModule = !0
    var k = a(6),
      h = a(3)
    e = (function () {
      function a() {}
      a.addEventListener = function (a, b, c, e) {
        k.EventListener.addEventListener(b, c, function () {
          try {
            e()
          } catch (g) {
            h.ErrorLogging.report(a, g.message)
          }
        })
      }
      return a
    })()
    c.EventListener = e
  },
  function (e, c, a) {
    c.__esModule = !0
    var k = a(33),
      h = a(2),
      b = a(0),
      d = a(1),
      f = a(15)
    ;(function (a) {
      ;(function (a) {
        a.isMatched = function (a) {
          return k.PageMatching.isMatched(a)
        }
      })(a.Page || (a.Page = {}))
      ;(function (a) {
        a.isEqual = function (a, b) {
          return h.TrackingData.fromCookie().isEqual(a, b)
        }
      })(a.TrackingParam || (a.TrackingParam = {}))
      ;(function (a) {
        a.getDomainFromURL = function (a) {
          return d.URLLocation.getDomainFromURL(a)
        }
        a.getQueryParam = function () {
          return d.URLLocation.getQueryParam()
        }
        a.getPagePath = function () {
          return d.URLLocation.getPagePath()
        }
      })(a.URL || (a.URL = {}))
      ;(function (a) {
        function d(a, d) {
          void 0 === d && (d = null)
          if (0 >= a.length) return null
          if (d) var c = d
          else if (
            ((c = b.NullChecker.notNull(window.cribNotesData)
              ? window.cribNotesData
              : b.NullChecker.notNull(window.dataLayer)
              ? window.dataLayer
              : null),
            null == c)
          )
            c = null
          else {
            for (var e = {}, f = 0; f < c.length; f++) {
              var h = c[f],
                g
              for (g in h) e[g] = h[g]
            }
            c = e
          }
          if (b.NullChecker.isNull(c)) return null
          for (e = 0; e < a.length; e++) if (((c = c[a[e]]), b.NullChecker.isNull(c))) return null
          return c
        }
        a.get = function (a, c) {
          void 0 === c && (c = null)
          var e = d(a, c)
          return b.NullChecker.isNull(e) ? '' : 'string' === typeof e ? e.toString() : e
        }
      })(a.DataLayer || (a.DataLayer = {}))
      ;(function (a) {
        a.get = function (a) {
          a = document.querySelector(a)
          return b.NullChecker.isNull(a) ? document.createElement('div') : a
        }
      })(a.DOM || (a.DOM = {}))
      ;(function (a) {
        a.getData = function () {
          return h.TrackingData.fromCookie()
        }
      })(a.Tracking || (a.Tracking = {}))
      ;(function (a) {
        a.debug = function (a, b, d) {
          f.DebugLogging.report(a, b + ':' + d)
        }
      })(a.Logging || (a.Logging = {}))
    })(c.TagFiringCondition || (c.TagFiringCondition = {}))
  },
  function (e, c, a) {
    c.__esModule = !0
    var k = a(1)
    e = (function () {
      function a() {}
      a.isMatched = function (a) {
        a =
          '^' +
          a
            .split('\\')
            .join('\\\\')
            .split('^')
            .join('\\^')
            .split('$')
            .join('\\$')
            .split('?')
            .join('\\?')
            .split('+')
            .join('\\+')
            .split('{')
            .join('\\{')
            .split('}')
            .join('\\}')
            .split('[')
            .join('\\[')
            .split(']')
            .join('\\]')
            .split('(')
            .join('\\(')
            .split(')')
            .join('\\)')
            .split('.')
            .join('\\.')
            .split('-')
            .join('\\-')
            .split('*')
            .join('.*') +
          '$'
        return new RegExp(a).test(k.URLLocation.getLocationWithoutProtocol())
      }
      return a
    })()
    c.PageMatching = e
  },
  function (e, c, a) {
    var k =
      (this && this.__extends) ||
      (function () {
        var a =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (a, d) {
              a.__proto__ = d
            }) ||
          function (a, d) {
            for (var b in d) d.hasOwnProperty(b) && (a[b] = d[b])
          }
        return function (b, d) {
          function c() {
            this.constructor = b
          }
          a(b, d)
          b.prototype = null === d ? Object.create(d) : ((c.prototype = d.prototype), new c())
        }
      })()
    c.__esModule = !0
    e = (function (a) {
      function b() {
        return (null !== a && a.apply(this, arguments)) || this
      }
      k(b, a)
      b.report = function (b, c) {
        a.report.call(this, 'tag-fired', b, c)
      }
      return b
    })(a(4).Logging)
    c.TagFiredLogging = e
  },
  function (e, c, a) {
    c.__esModule = !0
    var k = (function () {
      function a() {
        this.readyState = h.LoadingState.UNINITIALIZED
        this.responseText = ''
        this.status = 0
        this.statusText = ''
        this.onreadstatechange = void 0
        this.xdr = new window.XDomainRequest()
        this.xdr.xhr = this
        this.xdr.onprogress = function () {
          var a
          this.xhr.readyState = h.LoadingState.LOADED
          this.xhr && (a = this.xhr.onreadystatechange) && a.apply(this)
        }
        this.xdr.onload = function () {
          var a
          this.xhr.readyState = h.LoadingState.INTERACTIVE
          this && (a = this.onreadystatechange) && a.apply(this)
          this.xhr.responseText = this.responseText
          this.xhr.readyState = h.LoadingState.COMPLETE
          this.xhr.status = 200
          a && a.apply(this)
          this.xhr.onload()
        }
        this.xdr.onerror = function () {
          this.xhr.readyState = h.LoadingState.COMPLETE
          this.xhr.status = 404
          this.xhr.onload()
        }
      }
      a.prototype.open = function (a, b, c) {
        void 0 === c && (c = !0)
        this.readyState = h.LoadingState.OPEN
        return this.xdr.open(a, b, c)
      }
      a.prototype.send = function (a) {
        this.xdr.send(a)
      }
      a.prototype.setRequestHeader = function (a, b) {}
      a.prototype.getResponseHeader = function (a) {
        return a.match(/^Content\-Type$/i) ? this.xdr.contentType : ''
      }
      a.prototype.onerror = function () {}
      a.prototype.onabort = function () {}
      a.prototype.ontimeout = function () {}
      return a
    })()
    c.XmlHttpRequestForIE = k
    var h = (function () {
      function a() {}
      a.xhrObject = function () {
        return window.XDomainRequest ? new k() : new XMLHttpRequest()
      }
      return a
    })()
    c.CrossBrowserXHR = h
    ;(function (a) {
      var b = a.LoadingState || (a.LoadingState = {})
      b.UNINITIALIZED = 0
      b.OPEN = 1
      b.LOADED = 2
      b.INTERACTIVE = 3
      b.COMPLETE = 4
      ;(a.StatusCode || (a.StatusCode = {})).OK = 200
    })((h = c.CrossBrowserXHR || (c.CrossBrowserXHR = {})))
    c.CrossBrowserXHR = h
  },
  function (e, c) {
    function a() {
      throw Error('setTimeout has not been defined')
    }
    function k() {
      throw Error('clearTimeout has not been defined')
    }
    function h(b) {
      if (q === setTimeout) return setTimeout(b, 0)
      if ((q === a || !q) && setTimeout) return (q = setTimeout), setTimeout(b, 0)
      try {
        return q(b, 0)
      } catch (O) {
        try {
          return q.call(null, b, 0)
        } catch (w) {
          return q.call(this, b, 0)
        }
      }
    }
    function b(a) {
      if (l === clearTimeout) return clearTimeout(a)
      if ((l === k || !l) && clearTimeout) return (l = clearTimeout), clearTimeout(a)
      try {
        return l(a)
      } catch (O) {
        try {
          return l.call(null, a)
        } catch (w) {
          return l.call(this, a)
        }
      }
    }
    function d() {
      r && v && ((r = !1), v.length ? (p = v.concat(p)) : (y = -1), p.length && f())
    }
    function f() {
      if (!r) {
        var a = h(d)
        r = !0
        for (var c = p.length; c; ) {
          v = p
          for (p = []; ++y < c; ) v && v[y].run()
          y = -1
          c = p.length
        }
        v = null
        r = !1
        b(a)
      }
    }
    function m(a, b) {
      this.fun = a
      this.array = b
    }
    function n() {}
    var g = (e.exports = {})
    try {
      var q = 'function' === typeof setTimeout ? setTimeout : a
    } catch (L) {
      q = a
    }
    try {
      var l = 'function' === typeof clearTimeout ? clearTimeout : k
    } catch (L) {
      l = k
    }
    var p = [],
      r = !1,
      v,
      y = -1
    g.nextTick = function (a) {
      var b = Array(arguments.length - 1)
      if (1 < arguments.length) for (var c = 1; c < arguments.length; c++) b[c - 1] = arguments[c]
      p.push(new m(a, b))
      1 !== p.length || r || h(f)
    }
    m.prototype.run = function () {
      this.fun.apply(null, this.array)
    }
    g.title = 'browser'
    g.browser = !0
    g.env = {}
    g.argv = []
    g.version = ''
    g.versions = {}
    g.on = n
    g.addListener = n
    g.once = n
    g.off = n
    g.removeListener = n
    g.removeAllListeners = n
    g.emit = n
    g.prependListener = n
    g.prependOnceListener = n
    g.listeners = function (a) {
      return []
    }
    g.binding = function (a) {
      throw Error('process.binding is not supported')
    }
    g.cwd = function () {
      return '/'
    }
    g.chdir = function (a) {
      throw Error('process.chdir is not supported')
    }
    g.umask = function () {
      return 0
    }
  },
  function (e, c) {
    var a = (function () {
      return this
    })()
    try {
      a = a || Function('return this')() || (0, eval)('this')
    } catch (k) {
      'object' === typeof window && (a = window)
    }
    e.exports = a
  },
  function (e, c) {},
  function (e, c, a) {
    var k =
      (this && this.__extends) ||
      (function () {
        var a =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (a, c) {
              a.__proto__ = c
            }) ||
          function (a, c) {
            for (var b in c) c.hasOwnProperty(b) && (a[b] = c[b])
          }
        return function (b, c) {
          function d() {
            this.constructor = b
          }
          a(b, c)
          b.prototype = null === c ? Object.create(c) : ((d.prototype = c.prototype), new d())
        }
      })()
    c.__esModule = !0
    e = (function (a) {
      function b() {
        return (null !== a && a.apply(this, arguments)) || this
      }
      k(b, a)
      b.report = function (b, c) {
        a.report.call(this, 'container-complete', b, c)
      }
      return b
    })(a(4).Logging)
    c.ContainerCompleteLogging = e
  },
  function (e, c, a) {
    c.__esModule = !0
    e = (function () {
      function a() {}
      a.get = function (a) {
        return this.storageAvailable('localStorage') ? window.localStorage.getItem(a) : ''
      }
      a.set = function (a, b) {
        if (this.storageAvailable('localStorage'))
          try {
            window.localStorage.setItem(a, b)
          } catch (d) {}
      }
      a.storageAvailable = function (a) {
        try {
          var b = window[a]
          b.setItem('__storage_test__', '__storage_test__')
          b.removeItem('__storage_test__')
          return !0
        } catch (d) {
          return (
            d instanceof DOMException &&
            (22 === d.code ||
              1014 === d.code ||
              'QuotaExceededError' === d.name ||
              'NS_ERROR_DOM_QUOTA_REACHED' === d.name) &&
            0 !== b.length
          )
        }
      }
      return a
    })()
    c.LocalStorageUtil = e
  },
  function (e, c, a) {
    c.__esModule = !0
    e = (function () {
      function a() {}
      a.setGlobalVariable = function (a, b) {
        window.crib = window.crib || {}
        'object' !== typeof window.crib || window.crib.hasOwnProperty(a) || (window.crib[a] = b)
      }
      return a
    })()
    c.GlobalVariable = e
  },
  function (e, c, a) {
    c.__esModule = !0
    c['default'] = function (a, c) {
      a: {
        window.dataLayer = window.dataLayer || []
        var b = 0
        for (var d = window.dataLayer; b < d.length; b++) {
          var e = d[b]
          if (e.hasOwnProperty('__cribnotes')) {
            b = e
            break a
          }
        }
        b = { __cribnotes: {} }
      }
      if (!Array.isArray) {
        if ('[object Array]' !== Object.prototype.toString.call(window.dataLayer)) return
      } else if (!Array.isArray(window.dataLayer)) return
      if ('order' === a) {
        d = b.__cribnotes
        e = []
        if (/([^\/:]*\/\d+\/\d+(\.\d+)?(:[^\/:]*\/\d+\/\d+(\.\d+)?)*)$/.test(c))
          for (var h = 0, k = c.split(':'); h < k.length; h++) {
            var g = k[h].split('/')
            e.push({ item_id: g[0], quantity: g[1], price: g[2] })
          }
        d.items = e
      } else b.__cribnotes[a] = c
      a: {
        window.dataLayer = window.dataLayer || []
        for (d = 0; d < window.dataLayer.length; d++)
          if (window.dataLayer[d].hasOwnProperty('__cribnotes')) {
            window.dataLayer[d] = b
            break a
          }
        window.dataLayer.push(b)
      }
    }
  },
  function (e, c, a) {
    c.__esModule = !0
    var k = a(2)
    c['default'] = function () {
      var a = k.TrackingData.fromCookie().asQueryParamForTracking(),
        b = [],
        c
      for (c in a) b.push(c + '=' + a[c])
      return b.join('&')
    }
  },
])
