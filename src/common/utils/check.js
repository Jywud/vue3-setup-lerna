// 所有的验证方式都写在这

// 表单验证方式，提示文案统一

// 非空，必填
export const notEmpty = str => ({
    required: true,
    message: "请输入" + str,
    trigger: "blur"
});
// 输入长度限制
export const maxLength = num => ({
    max: num,
    message: "最多输入" + num + "字符",
    trigger: "blur"
});

// 不能有空格
export const noBlank = () => ({
    pattern: /^(\S)+$/,
    message: "不能有空格",
    trigger: "blur"
});

//筛选
export const notSelect = str => ({
    required: true,
    message: "请输入" + str,
    trigger: "change"
});
// 数字校验
export const isNumberRule = str => ({
    type: "number",
    message: str + "必须为数字值",
    trigger: "blur"
});

// 必须为数字
export const isNumberBetween = (min, max) => {
    let reg = new RegExp(`^(\d){${min},${max}}$`);
    return {
        pattern: /^(\d){}$/,
        message: `必须为${min}至${max}的数字`,
        trigger: "blur"
    };
};

// 手机号
export const isPhone = () => ({
    pattern: /^1[34578]\d{9}$/,
    message: "不是合法的手机号",
    trigger: "blur"
});

// 链接
export const isHttp = str => ({
    required: true,
    pattern: /^(http|https)\S*/,
    message: "开头必须是http或者https",
    trigger: "blur"
});

export const isCreditCode = () => ({
    pattern: /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/,
    message: "不是合法的统一社会信用代码",
    trigger: "blur"
});

//检查统代是否合法
export const checkCreditCode = str => {
    return /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(str);
};

/**
 * 验证是不是数字
 * @param val
 * @returns {boolean}
 */
export const isNumber = val => {
    if (
        val === null ||
        val === undefined ||
        val === "" ||
        Math.abs(val) === Infinity
    )
        return false;
    return !isNaN(parseFloat(val - 0));
};
//必须为数字，可以是小数
export const isDecimal = str => {
    return {
        pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
        message: str + `必须为数字值`,
        trigger: "blur"
    };
};
//20位数字，最多两位小数
export const isDecimalWithFixedTwo = str => {
    return /^[0-9]{0,20}([.]{1}[0-9]{0,2}){0,1}$/.test(str);
};

/**
 * 验证正整数
 * @param num
 * @returns {boolean}
 */
export const isPosInteger = num => {
    num = num - 0;
    return num !== 0 && /^[0-9]+$/.test(num);
};

/**
 * 验证手机号
 * @param phone
 * @returns {boolean}
 */
export const checkPhone = phone => {
    return /^1[2,3,4,5,6,7,8,9][0-9]{9}$/.test(phone);
};

/**
 * 验证邮箱
 * @param email
 * @returns {boolean}
 */
export const checkEmail = val => {
    return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(val);
};

export const checkTelPhone = tp => {
    return /^(0\d{2,3}(-|\s|)\d{7,8})$/.test(tp);
};

//验证密码6-16位，区分大小写
export const checkPassword = password => {
    return /^(?=.*[a-zA-Z])(?=.*[\d])[\w\W]{6,16}$/.test(password);
};

export const isEmptyString = str => {
    return !str || str.trim().length === 0;
};

/**
 * 验证字符串中是否包含字母
 * @param str
 * @returns {boolean}
 */
export const hasLetter = str => {
    return /[a-z]/i.test(str + "");
};

/**
 * 判断字符串是否以数字开头
 * @param str
 * @returns {boolean}
 */
export const isStartWithNum = str => {
    return /^[1-9]/.test(str);
};

/*
 *去除标签
 */
export const delLabel = label => {
    if (!label) return label;
    var temp = label.replace(/<\/?.+?>/g, "");
    let result = temp.replace(/ /g, ""); //
    result = result.replace(/&nbsp;/g, " ");
    return result;
};
/*
 *去除word粘贴的样式
 */
export const delWordLabel = src => {
    if (!src) {
        return "";
    }
    src = src.replace(/[ ]|[\r\n]/g, "");
    src = src.replace(/&nbsp;/g, " ");
    src = src.replace(/Normal.*NONE/g, "");
    src = src.replace(/@font-face.*}/g, "");
    src = src.replace(/<o:p>&nbsp;<\/o:p>/g, "");
    src = src.replace(/<FONT>/g, "");
    src = src.replace(/<font>/g, "");
    src = src.replace(/o:/g, "");
    src = src.replace(/<P>/g, "");
    src = src.replace(/<\/P>/g, "");
    src = src.replace(/<span>/g, "");
    src = src.replace(/<SPAN>/g, "");
    src = src.replace(/<SPANlang=EN-US>/g, "");
    src = src.replace(/<\/SPAN>/g, "");
    let handleJson = src.replace(/<.*?>/g, "");
    handleJson = handleJson.replace(/\/.*\//g, "");
    handleJson = handleJson.replace(/[<!--]/g, "");
    // console.log(handleJson);
    return handleJson;
};

export const isWexin = () => {
    let ua = navigator.userAgent.toLowerCase();
    let isWeixin = ua.indexOf("micromessenger") != -1;
    if (isWeixin) {
        return true;
    } else {
        return false;
    }
};

export const isddTalk = () => {
    //判断是不是钉钉
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("dingtalk") >= 0;
};

/* 是否是身份证号码 */
export const checkIDNumber = data => {
    return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
        data
    );
};
