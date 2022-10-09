
/**
 * @desc 防抖
 * @ params { 回调函数 } fn
 */
export function debounce(fn, wait, immediate) {
    let timer = null;
    let hasCall = false;
    return function () {
        let _this = this, args = arguments;

        if (timer) clearTimeout(timer);
        if (immediate && !hasCall) {
            fn.apply(_this, args);
            hasCall = true
        } else {
            timer = setTimeout(function () {
                fn.apply(_this, args);
                hasCall = false;
            }, wait)
        }

    }
}


/**
 * 
 * @param {回调函数} fn 
 * @param {等待时间} wait 
 * @param { leading: 首执行， trailing: 尾执行} options 
 */
export function throttle(fn, wait = 200, options = { leading: true, trailing: true }) {
    let timer = null,
        last = 0;
    return function () {
        let now = Date.now(),
            _this = this,
            args = arguments;
        
        // 禁用首执行的时候并且是第一次执行的时候，赋值
        if (!last && !options.leading) { last = now };

        if (now - last > wait) {
            
            // 有timer则取消定时器
            if (timer) {
                timer && clearTimeout(timer);
                timer = null;
            }
            last = now;
            fn.apply(_this, args);
        } else if (options.trailing) {
            // 需要尾执行的时候
            // 在时间内取消旧的定时器，并新建
            timer && clearTimeout(timer);
            timer = setTimeout(function () {

                // 须将下一次设为首执行
                last = 0;

                timer = null;
                last = now;
                fn.apply(_this, args);
            }, wait - (now - last))
            // 下次执行时间为剩余时间
        }
    }
}