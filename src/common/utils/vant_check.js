/**
 * @desc 校验单个prop和单个rule
 * @param { * 规则 } rule 
 *      @param { 必须 } rule.required
 *      @param { 正则验证 } rule.reg
 *      @param { 函数验证 } rule.validator
 *      @param { 验证失败的时候回调 } rule.cb
 * @param { * 验证的值 } value 
 * @param { 验证对象的值 }  obj
 */
export function checkRule(rule, value, obj) {
    let flag = true;
    if (rule.required && (value == undefined || value == "")) {
        flag = false;
    }

    if (rule.reg && rule.reg instanceof RegExp) {
        flag = rule.reg.test(value);
    }

    if (rule.validator && rule.validator instanceof Function) {
        flag = rule.validator(value, obj);
    }

    if (rule.cb instanceof Function) {
        rule.cb(flag);
    }

    return flag;
}

/**
 * @desc 校验单个prop 和多个或者单个rule
 * @param { 需要校验的值 } prop 
 * @param { 规则 可为obj，可为 arr } rules 
 * @param { 值 } mode 
 */
export function checkProp(prop, rules, mode) {

    // 校验的为原始值，将他改为对象
    if (Object.prototype.toString.call(mode) !== '[object Object]') {
        mode = { prop: mode }
    }

    // rules分为对象和arr
    if (Object.prototype.toString.call(rules) === '[object Object]') {
        return checkRule(rules, mode[prop], mode);
    } else if (Array.isArray(rules)) {
        // 循环校验，已有false直接中断
        for (let i = 0; i < rules.length; i++) {
            if (!checkRule(rules[i], mode[prop], mode)) {
                return false;
            }
        }
        return true;
    }


}

/**
 * @desc 校验整个form表单
 * @param { 所有规则的对象 key时prop， value时规则 } ruleObj 
 * @param { form表单的所有值 } mode 
 */
export function checkProps(ruleObj, mode) {
    // 全局验证，一个为false就为false
    let res = true;
    for (let prop in ruleObj) {
        if (ruleObj.hasOwnProperty(prop)) {
            res = checkProp(prop, ruleObj[prop], mode) && res;
        }
    }
    return res;
}
