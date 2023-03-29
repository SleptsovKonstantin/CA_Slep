/* eslint-disable */
var vNotify = (function() {
  var a = {
      topLeft: 'topLeft',
      topRight: 'topRight',
      bottomLeft: 'bottomLeft',
      bottomRight: 'bottomRight',
      center: 'center',
    },
    b = {
      fadeInDuration: 1e3,
      fadeOutDuration: 1e3,
      fadeInterval: 50,
      visibleDuration: 5e3,
      postHoverVisibleDuration: 500,
      position: a.topRight,
      sticky: !1,
      showClose: !0,
    },
    c = function(a) {
      return (a.notifyClass = 'vnotify-info'), i(a);
    },
    d = function(a) {
      return (a.notifyClass = 'vnotify-success'), i(a);
    },
    e = function(a) {
      return (a.notifyClass = 'vnotify-error'), i(a);
    },
    f = function(a) {
      return (a.notifyClass = 'vnotify-warning'), i(a);
    },
    g = function(a) {
      return (a.notifyClass = 'vnotify-notify'), i(a);
    },
    h = function(a) {
      return i(a);
    },
    i = function(a) {
      if (!a.title && !a.text) return null;
      var b = document.createDocumentFragment(),
        c = document.createElement('div');
      c.classList.add('vnotify-item'),
        c.classList.add(a.notifyClass),
        (c.style.opacity = 0),
        (c.options = p(a)),
        a.title && c.appendChild(k(a.title)),
        a.text && c.appendChild(j(a.text)),
        c.options.showClose && c.appendChild(l(c)),
        (c.visibleDuration = c.options.visibleDuration);
      var d = function() {
          c.fadeInterval = r('out', c.options.fadeOutDuration, c);
        },
        e = function() {
          clearTimeout(c.interval),
            clearTimeout(c.fadeInterval),
            (c.style.opacity = null),
            (c.visibleDuration = c.options.postHoverVisibleDuration);
        },
        f = function() {
          c.interval = setTimeout(d, c.visibleDuration);
        };
      b.appendChild(c);
      var g = m(c.options.position);
      return (
        g.appendChild(b),
        c.addEventListener('mouseover', e),
        r('in', c.options.fadeInDuration, c),
        c.options.sticky || (c.addEventListener('mouseout', f), f()),
        c
      );
    },
    j = function(a) {
      var b = document.createElement('div');
      return b.classList.add('vnotify-text'), (b.innerHTML = a), b;
    },
    k = function(a) {
      var b = document.createElement('div');
      return b.classList.add('vnotify-title'), (b.innerHTML = a), b;
    },
    l = function(a) {
      var b = document.createElement('span');
      return (
        b.classList.add('vn-close'),
        b.addEventListener('click', function() {
          q(a);
        }),
        b
      );
    },
    m = function(a) {
      var b = o(a),
        c = document.querySelector('.' + b);
      return c ? c : n(b);
    },
    n = function(a) {
      var b = document.createDocumentFragment();
      return (
        (container = document.createElement('div')),
        container.classList.add('vnotify-container'),
        container.classList.add(a),
        container.setAttribute('role', 'alert'),
        b.appendChild(container),
        document.body.appendChild(b),
        container
      );
    },
    o = function(b) {
      switch (b) {
        case a.topLeft:
          return 'vn-top-left';
        case a.bottomRight:
          return 'vn-bottom-right';
        case a.bottomLeft:
          return 'vn-bottom-left';
        case a.center:
          return 'vn-center';
        default:
          return 'vn-top-right';
      }
    },
    p = function(a) {
      return {
        fadeInDuration: a.fadeInDuration || b.fadeInDuration,
        fadeOutDuration: a.fadeOutDuration || b.fadeOutDuration,
        fadeInterval: a.fadeInterval || b.fadeInterval,
        visibleDuration: a.visibleDuration || b.visibleDuration,
        postHoverVisibleDuration: a.postHoverVisibleDuration || b.postHoverVisibleDuration,
        position: a.position || b.position,
        sticky: null != a.sticky ? a.sticky : b.sticky,
        showClose: null != a.showClose ? a.showClose : b.showClose,
      };
    },
    q = function(a) {
      (a.style.display = 'none'), (a.outerHTML = ''), (a = null);
    },
    r = function(a, c, d) {
      function e() {
        (g = f ? g + i : g - i),
          (d.style.opacity = g),
          g <= 0 && (q(d), s()),
          ((!f && g <= h) || (f && g >= h)) && window.clearInterval(j);
      }
      var f = 'in' === a,
        g = f ? 0 : d.style.opacity || 1,
        h = f ? 0.8 : 0,
        i = b.fadeInterval / c;
      f && ((d.style.display = 'block'), (d.style.opacity = g));
      var j = window.setInterval(e, b.fadeInterval);
      return j;
    },
    s = function() {
      var a = document.querySelector('.vnotify-item');
      if (!a)
        for (var b = document.querySelectorAll('.vnotify-container'), c = 0; c < b.length; c++)
          (b[c].outerHTML = ''), (b[c] = null);
    };
  return {
    info: c,
    success: d,
    error: e,
    warning: f,
    notify: g,
    custom: h,
    options: b,
    positionOption: a,
  };
})();