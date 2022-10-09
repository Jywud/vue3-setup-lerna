/**
 * get请求query转为Object
 * @param query 请求的值query
 *
 */
export const getUrlParams = (query = window.location.search.slice(1)) => {
    query =
        query ||
        (/\?[/\u4e00-\u9fa5_\-a-zA-Z0-9\.=&]+/.exec(location.href) || [
            ""
        ])[0].slice(1);

    if (typeof query !== "string") throw new Error("query must be a string");

    let obj = {};

    query.split("&").forEach(query => {
        let [key, value] = query.split("=");
        obj[key] = decodeURI(value);
    });

    return obj;
};

/**
 * @desc 获取search某一个值得value
 * @param key search的key值
 *
 */
export const getUrlParam = key => getUrlParams()[key];

/**
 * @desc   解析url
 * @param {location} 完整的urlStr
 */
export const getLocation = (location = window.location.href) => {
    location = decodeURI(location);
    let pathname = (/\/[a-zA-Z0-9\.\/]+.html/.exec(location) || [""])[0];
    let lastPathname = (/[^/]+.html/.exec(location) || [""])[0];
    let hash = (/#[/a-zA-Z0-9_\.]+/.exec(location) || [""])[0];
    let query = (/\?[/\u4e00-\u9fa5_\-a-zA-Z0-9\.=&]+/.exec(location) || [
        ""
    ])[0];
    let protocol = (/[a-zA-Z0-9:]+(?=\/\/)/.exec(location) || [""])[0];
    query = getUrlParams(query.slice(1));

    hash = hash.slice(1);
    return {
        origin: window.origin,
        protocol,
        pathname,
        lastPathname,
        query,
        hash
    };
};

/**
 * @desc 路由跳转
 * @params {基础路由} dir
 * @params {第二层路由} url
 */
export const gotoURL = (dir, url) => {
    window.location.href = getURL(dir, url);
};

/**
 * @desc 获取路由
 * @params {基础路由} dir
 * @params {第二层路由} url
 */
export const getURL = (dir, url) => {
    if (!url) {
        return `${location.origin}/${dir}`;
    }
    return `${location.origin}/${dir}/${url}`;
};

/**
 * @desc 创建search的string字符串
 * @params { 参数的对象 } params
 */
export const createSearch = params => {
    let search = [];
    for (let i in params) {
        if (params.hasOwnProperty(i)) {
            let param = params[i];
            if (params === undefined || params === null) param = "";
            search.push(i + "=" + param);
        }
    }
    return search.length ? "?" + search.join("&") : "";
};

/**
 * @desc 获取search的字符串（去问号）
 * @params { search字符串 } str
 */
export const getSearchFromStr = (str = "") => {
    const search = str.split("?")[1];
    return search ? "?" + search : "";
};

// 以下是四个跳转路由的基础枚举
export const gotoBaseURL = url => {
    window.location.href = getURL(url);
};

export const gotoGovURL = url => {
    window.location.href = getURL("gov", url);
};

export const gotoEntURL = url => {
    window.location.href = getURL("ent", url);
};

export const gotoH5URL = url => {
    window.location.href = getURL("h5", url);
};

export const gotoWxURL = url => {
    window.location.href = getURL("wechat", url);
};
