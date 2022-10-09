/**
 * 前端字符串加密
 * @param str
 * @returns {string}
 */
export const fhwfroms = (str) => {
    str = str.toString();
    if(!str) return '';
    let s = '';
    while (str.length>0){
        s += String.fromCharCode(str.substr(1,str[0]));
        str = str.substr(str[0]-0+2).toString();
    }
    return s;
};

/**
 * 前端字符串解密
 * @param str
 * @returns {string}
 */
export const fhwton = (str) => {
    str = str.toString();
    let s = '';
    for(let i=0;i<str.length;i++){
        let _s = str[i].charCodeAt()+'';
        _s = _s.length +''+ _s + '' + Math.floor(Math.random()*10);
        s += _s;
    }
    return s;
};

 
