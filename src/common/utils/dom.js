import { isWX, isZLB, isDINGDING, isPerZLB } from "../utils";
import { saveLog } from "../interface/api/h5/companyInfo";

/**
 * 如果字符串为空 null undefined ，则返回placeholder
 * @param str
 * @param placeholder
 * @returns {*|string}
 */
export const toHtmlStr = (str, placeholder = "") => {
    if (
        str === undefined ||
        str === null ||
        str === "null" ||
        str === "undefined" ||
        str === ""
    ) {
        return placeholder;
    } else if (str === 999999999 || str === 888888888) {
        return "∞";
    }
    return str;
};

export const statistics = (url, title, id, key) => {
    let parameter = {};
    try {
        parameter.remoteaddr =
            returnCitySN["cip"] + "," + returnCitySN["cname"];
    } catch (e) {
        parameter.remoteaddr = "";
    }
    parameter.requesturi = url;
    parameter.modulename = title;
    parameter.requestmethod = "get";
    parameter.moduleCode = id;
    parameter.moduleType = key;
    parameter.useragent = window.navigator.userAgent;
    parameter.requestplatm = isDINGDING
        ? "DINGDING"
        : isWX
        ? "WECHART"
        : isZLB
        ? "ZLB"
        : isPerZLB
        ? "PERZLB"
        : "";
    saveLog(parameter).then(res => {});
};
