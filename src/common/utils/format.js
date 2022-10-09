//格式化数字
export const numFormat = (value, addZero) => {
    if (!value) return addZero ? "0.00" : "0";

    let intPart = Number(value) - (Number(value) % 1); //获取整数部分
    let data = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    return addZero ? data + ".00" : data; //将整数部分逢三一断
};

/**
 *
 * @desc 格式化金额
 */
export function formatMoney(s, dot = ",") {
    if (typeof s === "string" && s.indexOf("E") > -1) {
        s = (
            (s.split("E")[0] - 0) *
            Math.pow(10, s.split("E")[1] - 0)
        ).toString();
    }
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
    let l = s
        .split(".")[0]
        .split("")
        .reverse();
    let r = s.split(".")[1];
    let t = "";
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? dot : "");
    }
    return (
        t
            .split("")
            .reverse()
            .join("") +
        "." +
        r
    );
}
