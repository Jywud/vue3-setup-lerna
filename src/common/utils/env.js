const agent = navigator.userAgent.toLowerCase();
export const isALIPAY = agent.indexOf("alipayclient") >= 0; //支付宝
export const isDINGDING = agent.indexOf("dingtalk") >= 0; //钉钉
export const isZLB =
    agent.indexOf("@zlb") >= 0 && localStorage.getItem("personalLogin") != "Y"; //浙里办
export const isPerZLB =
    agent.indexOf("@zlb") >= 0 && localStorage.getItem("personalLogin") == "Y"; //浙里办个人
export const isWX = agent.indexOf("micromessenger") >= 0; //微信
export const isZZD = agent.indexOf("taurusapp") >= 0; //浙政钉
