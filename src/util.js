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
    if (arguments.length > 2) {
      el.transform[attr] = val;
      var sVal = '';
      for (var s in el.transform) {
        switch (s) {
          case 'rotate':
          case 'rotateX':
          case 'rotateY':
          case 'rotateZ':
          case 'skewX':
          case 'skewY':
            sVal += s + '(' + el.transform[s] + 'deg)';
            break;
          case 'translateX':
          case 'translateY':
          case 'translateZ':
            sVal += s + '(' + el.transform[s] + 'px)';
            break;
          case 'scaleX':
          case 'scaleY':
          case 'scale':
            sVal += s + '(' + el.transform[s] + ')';
            break;
        }
        el.style.WebkitTransform = el.style.transform = sVal;
      }
    } else {
      val = el.transform[attr];
      if (typeof val === 'undefined') {
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
