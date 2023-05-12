// 节流：固定时间内的多次触发，只有最后一个触发被执行；
// 防抖：固定时间间隔，每个触发只有占据了没被占据的时间间隔才会被执行

export default function TestPage() {
  /* 这个写法在每一个时间间隔的开头执行, 最后一次点击若不在下一个时间间隔的就不执行了，相当于可能丢了用户的最后一次操作，因此不推荐 */
  /* 难讲开头尾巴，真实场景中应该算开头，因为从加载到用户点击一般都会超过delay */
  // 最外层的throttled函数在包围fn的地方就开始执行了
  function throttled1(fn: Function, delay = 500) {
    // 时间戳写法
    let oldTime = Date.now();
    // console.log("top: ", oldTime);
    // fn被触发执行的时候执行下面这个函数
    return function (...args) {
      let newTime = Date.now();
      // console.log("inner: ", newTime);
      // 有判断条件，满足了才真的执行fn
      if (newTime - oldTime >= delay) {
        fn.apply(null, args);
        oldTime = Date.now();
        // console.log("function: ", oldTime);
      }
    };
  }

  /* 这个写法在每一个时间间隔的尾巴执行, 不会丢掉用户操作 */
  function throttled2(fn: Function, delay: number = 2000) {
    // 定时器写法
    // 区别在于点击的最后一次在上一次点击的时间范围内，会最后在时间范围过了执行
    let timer: number = 0;
    // console.log("top timer: ", timer);
    return function (...args) {
      // console.log("inner timer: ", timer);
      if (!timer) {
        timer = setTimeout(() => {
          // console.log("function timer: ", timer);
          fn.apply(this, args);
          timer = 0;
        }, delay);
      }
    };
  }

  /* 此写法在用户第一次触发事件时立即执行， 也不会丢失最后一次操作 */
  function throttled(fn: Function, delay: number = 2000) {
    // console.log("top loading...");
    let timer: number = 0;
    let startTime = Date.now();
    return function () {
      // console.log("trigger...");
      let curTime = Date.now();
      let remaining = delay - (curTime - startTime);
      // 上一次的点击没有被本次顶掉就会如期执行，被顶掉就重新判断什么时候再执行
      clearTimeout(timer);
      if (remaining <= 0) {
        // console.log("executing function...");
        fn.apply(this, arguments);
        startTime = Date.now();
      } else {
        // console.log("reset timer.");
        timer = setTimeout(fn, remaining);
      }
    };
  }

  function debounce1(fn: Function, delay: number = 2000) {
    let timeout: number;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        fn.apply(this, arguments);
      }, delay);
    };
  }

  function debounce(
    fn: Function,
    delay: number = 2000,
    immediate: boolean = true
  ) {
    let timeout: number;
    return function () {
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        let callNow = !timeout;
        timeout = setTimeout(function () {
          timeout = 0;
        }, delay);
        if (callNow) {
          fn.apply(this, arguments);
        }
      } else {
        timeout = setTimeout(function () {
          fn.apply(this, arguments);
        }, delay);
      }
    };
  }

  const handleClick = () => {
    console.log("Click!");
  };

  const handleClick2 = () => {
    console.log("Click.");
  };

  return (
    <>
      {" "}
      <button
        className="btn btn-primary"
        onClick={throttled(handleClick, 2000)}
      >
        Trottled Click
      </button>
      <button
        className="btn btn-primary"
        onClick={debounce(handleClick2, 2000)}
      >
        Debounce Click
      </button>
    </>
  );
}
