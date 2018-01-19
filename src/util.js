export default class Event {
  static bindEvent (elem, type, selector, fn) {
    if (fn == null) {    // 如果不使用代理
      fn = selector;
      selector = null;
    }
    elem.addEventListener(type, function (e) {
      if (selector) {   // 使用代理
        let target = e.target;
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
      let sVal = '';
      for (let s in el.transform) {
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

  static mscroll (wrap, callback) {
    const child = wrap.children[0];
    let startPoint = 0;
    let startY = 0;
    let minY = wrap.clientHeight - child.offsetHeight;
    let step = 1;
    let lastY = 0;
    let lastTime = 0;
    let lastDis = 0;
    let lastTimeDis = 1;
    let isMove = true;
    let isFirst = true;
    this.cssTransform(child, 'translateZ', 0.01);
    wrap.addEventListener(
      'touchstart', (e) => {
        clearInterval(child.scroll);
        if (callback && callback.start) {
          callback.start();
        }
        startPoint = {pageY: e.changedTouches[0].pageY, pageX: e.changedTouches[0].pageX};
        startY = this.cssTransform(child, 'translateY');
        step = 1;
        lastY = startPoint.pageY;
        lastTime = new Date().getTime();
        lastDis = 0;
        lastTimeDis = 1;
        isMove = true;
        isFirst = true;
      }
    );
    wrap.addEventListener(
      'touchmove', (e) => {
        if (!isMove) {
          return;
        }
        let nowPoint = e.changedTouches[0];
        let disX = nowPoint.pageX - startPoint.pageX;
        let disY = nowPoint.pageY - startPoint.pageY;
        if (isFirst) {
          isFirst = false;
          if (Math.abs(disY) < Math.abs(disX)) {
            isMove = false;
            return;
          }
        }
        let t = startY + disY;
        let nowTime = new Date().getTime();
        if (t > 0) {
          step = 1 - t / wrap.clientHeight;
          t = parseInt(t * step);
        }
        if (t < minY) {
          let over = minY - t;
          step = 1 - over / wrap.clientHeight;
          over = parseInt(over * step);
          t = minY - over;
        }
        lastDis = nowPoint.pageY - lastY;
        lastTimeDis = nowTime - lastTime;
        lastY = nowPoint.pageY;
        lastTime = nowTime;
        this.cssTransform(child, 'translateY', t);
      }
    );
    wrap.addEventListener(
      'touchend', () => {
        let speed = (lastDis / lastTimeDis) * 120;
        speed = isNaN(speed) ? 0 : speed;
        let t = this.cssTransform(child, 'translateY');
        let target = t + speed;
        let type = 'easeOut';
        let time = Math.abs(speed * 10);
        time = time < 300 ? 300 : time;
        if (target > 0) {
          target = 0;
          type = 'backOut';
        }
        if (target < minY) {
          target = minY;
          type = 'backOut';
        }
        this.move(target, time, type, child, callback);
      }
    );
  }
  static move (target, time, type, child, callback) {
    const Tween = {
      easeOut (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      },
      backOut (t, b, c, d, s) {
        if (typeof s === 'undefined') {
          s = 1.70158;
        }
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
      }
    };
    let t = 0;        // 第0次
    let b = this.cssTransform(child, 'translateY');      // 当前位置
    let c = target - b;               // 目标点-当前位置 = 移动距离
    let d = Math.ceil(time / 20);     // time为执行总时间/ 20ms执行一次 = 执行次数
    clearInterval(child.scroll);
    child.scroll = setInterval(() => {
      t++;
      if (t > d) {
        clearInterval(child.scroll);
        if (callback && callback.over) {
          callback.over();
        }
      } else {
        let top = Tween[type](t, b, c, d);
        this.cssTransform(child, 'translateY', top);
        if (callback && callback.in) {
          callback.in();
        }
      }
    }, 20);
  }
}
