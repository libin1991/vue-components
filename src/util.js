export default class Event {
  static bindEvent (elem, type, selector, fn) {
    if (fn == null) {    // 如果不使用代理
      fn = selector;
      selector = null;
    }
    elem.addEventListener(type, function (e) {
      if (selector) {   // 使用代理
        var target = e.target;
        if (target.matches(selector)) {
          fn.call(target, e);
        }
      } else {
        fn(e);
      }
    });
  }
  static cssTransform (el, attr, val) {
    if (!el.transform) {
      el.transform = {};
    }
    if (val) {
      el.transform[attr] = val;
      let attrs = '';
      for (let s in el.transform) {
        switch (s) {
          case 'rotate':
          case 'skewX':
          case 'skewY':
            attrs += `${s}(${el.transform[s]}deg)`;
            break;
          case 'translateX':
          case 'translateY':
            attrs += `${s}(${el.transform[s]}px)`;
            break;
          case 'scaleX':
          case 'scaleY':
          case 'scale':
            attrs += `${s}(${el.transform[s]})`;
            break;
        }
        el.style.WebkitTransform = el.style.transform = attrs;
      }
    } else {
      val = el.transform[attr];
      if (!val) {
        if (attr === 'scale' || attr === 'scaleX' || attr === 'scaleY') {
          val = 1;
        } else {
          val = 0;
        }
      }
      return val;
    }
  }
}
