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
}
