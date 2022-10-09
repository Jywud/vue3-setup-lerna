export const concatUrl = (absUrl="",path='',params={},origin='')=>{
    let stringParams = '';
    for(let k in params){
        stringParams +=`&${k}=${params[k]}`
    }
    absUrl = absUrl.indexOf("/")>-1 ? absUrl : `/${absUrl}`;
    return `${origin}${absUrl}?randomStr=${(new Date()).valueOf()}${stringParams}#/${path}`
}