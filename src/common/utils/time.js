/**
 * 单页应用的页面切换，需要配合特定的html格式实现
 * @param id
 */

// import { getLocalStorage } from "./utils/getLocalStorage";

// //获取当前平台的url集合
// let tree = JSON.parse(getLocalStorage("curl"));

// window.jumpUrl = tree ? tree : [];

// let arr = window.jumpUrl.filter((v) => {
//     return v.id == 1
// })
// window.isEntFile = arr.length > 0 ? true : false; //是否有档案权限

/**
 * 获取前n年的年份
 * parameter 单位
 */
export const yearRetreat = (n, parameter = '') => {
    const ny = new Date().getFullYear();
    return new Array(n).fill(1).map((v, i) => {
        return {
            name: parameter ? ny - i + parameter : ny - i,
            id: ny - i
        }
    })
};

//季度描述统一方法
const quarternameList = ['一季度', '上半年', '前三季度', '全年'];
const numList = ['一', '二', '三', '四'];
export const getQuarterName = function (quarter, year, type = 0) {
    return type === 0 ? year + '年' + quarternameList[quarter - 1] : year + '年' + numList[quarter - 1] + '季度';
}

//累月描述统一方法,
/*
* month月份,year 年份, type 0 单月，1 累月
* */
export const getMonthName = function (month, year, type = 0) {
    return type == 0 ? year + '年' + month + '月' : year + '年' + (month == 1 ? "" : '1-') + month + '月'
}

/**
 * 获取从fromYear年开始到当前时间的年分
 * parameter 单位
 */
export const yearFromYear = (fromYear, parameter = '') => {
    const ny = new Date().getFullYear();
    const yearNumber = ny - fromYear + 1;

    return new Array(yearNumber).fill(1).map((v, i) => {
        return {
            label: parameter ? ny - i + parameter : ny - i,
            value: ny - i,
        }
    }).reverse();
};

/**
 * 判断是否在某时间段内
 * parameter 开始和结束时间
 */
export const nowInDateBetwen = (time1, time2) => {
    if (!time1 || !time2) {
        return false;
    }
    var time = Date.parse(new Date());
    var date1 = Date.parse(new Date(time1.replace(/-/g, '/')));
    var date2 = Date.parse(new Date(time2.replace(/-/g, '/')));
    if (date1 < time && date2 > time) {
        return true;
    };
    return false;
}

/**
 * 转换日期格式
 * @param time 可以标准化的日期
 * @param format 日期格式
 * @returns {*}
 */
export const format = (time, format = 'yyyy-MM-dd') => {
    if (typeof time === 'string' && time.indexOf('+') > -1 && time.indexOf('T') > -1) {
        time = time.substr(0, 10);
    }
    const date = new Date(time);
    if (!date.getTime()) return '';
    const o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
/**
 * 转换日期格式
 * @param timestamp 可以标准化的日期
 * @returns {*}
 */

export const timestampFormat = (timestamp) => {
    timestamp = String(timestamp)
    function zeroize(num) {
        return (String(num).length == 1 ? '0' : '') + num;
    }
    timestamp = timestamp / 1000;
    var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
    var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数

    var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
    var tmDate = new Date(timestamp * 1000);  // 参数时间戳转换成的日期对象

    var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
    var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();

    if (timestampDiff < 60) { // 一分钟以内
        return "刚刚";
    } else if (timestampDiff < 3600) { // 一小时前之内
        return Math.floor(timestampDiff / 60) + "分钟前";
    } else if (curDate.getFullYear() == Y && curDate.getMonth() + 1 == m && curDate.getDate() == d) {
        return '今天' + zeroize(H) + ':' + zeroize(i);
    } else {
        var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
        if (newDate.getFullYear() == Y && newDate.getMonth() + 1 == m && newDate.getDate() == d) {
            return '昨天' + zeroize(H) + ':' + zeroize(i);
        } else if (curDate.getFullYear() == Y) {
            return zeroize(m) + '-' + zeroize(d) + ' ' + zeroize(H) + ':' + zeroize(i);
        } else {
            return Y + '-' + zeroize(m) + '-' + zeroize(d) + ' ' + zeroize(H) + ':' + zeroize(i);
        }
    }
};

/**
 * 获取周几
 * @param time 日期毫秒
 * @returns {*}
 */
export const getWeekDate = (time) => {
    let day = (new Date(time)).getDay();
    let weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    return weeks[day];
}


// const PDFViewer = new PdfViewer();
// export const func = (time1, time2) => {
//     if (!time1 || !time2) {
//         return false;
//     }
//     var time = Date.parse(new Date());
//     var date1 = Date.parse(new Date(time1.replace(/-/g, '/')));
//     var date2 = Date.parse(new Date(time2.replace(/-/g, '/')));
//     if (date1 < time && date2 > time) {
//         return true;
//     };
//     return false;
// }





