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
    // 传过来的是最外面一层容器，首先获取滑动的子元素
    const child = wrap.children[0];
    let startPoint = 0;   // 手指
    let startY = 0;     // 元素
    let minY = wrap.clientHeight - child.offsetHeight;
    let step = 1;    // 计算速度用
    let lastY = 0;
    let lastTime = 0;
    let lastDis = 0;
    let lastTimeDis = 1;
    let isMove = true;    // 用来辨别是否是向下滑动，可能是左右滑动
    let isFirst = true;
    // 使用3D硬件加速
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
        // 此时添加isFirst，做优化，不用touchmove触发的时候都执行判断，只判断第一次
        // 如果横向距离大于纵向距离，那就不滚动了
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
        // 调试速度
        let speed = (lastDis / lastTimeDis) * 120;
        // 速度有时候为NaN（lastTimeDis为0的时候？）
        speed = isNaN(speed) ? 0 : speed;
        let t = this.cssTransform(child, 'translateY');
        let target = t + speed;
        let type = 'easeOut';
        let time = Math.abs(speed * 10);
        time = time < 300 ? 300 : time;
        // 顶部，还往下滑动，有一个回弹效果
        if (target > 0) {
          target = 0;
          type = 'backOut';
        }
        // 最下边滑过了，有回弹效果
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
    }, 20);  // 20ms 执行一次
  }
}
