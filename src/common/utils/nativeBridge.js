/* 调用第三方原生API */
import * as dd from "dingtalk-jsapi";
// import zlbDD from "zlbDD";
import { Toast } from "vant";

import { getSign } from "@api/h5/companyInfo";

const agent = navigator.userAgent.toLowerCase();
const isAlipay = agent.indexOf("alipayclient") >= 0; //支付宝
const isDDing = agent.indexOf("dingtalk") >= 0; //钉钉
const isZLB =
    agent.indexOf("@zlb") >= 0 && localStorage.getItem("personalLogin") != "Y"; //浙里办
const isPerZLB =
    agent.indexOf("@zlb") >= 0 && localStorage.getItem("personalLogin") == "Y"; //浙里办个人
const isWX = agent.indexOf("micromessenger") >= 0; //微信
const isZZD = agent.indexOf("taurusapp") >= 0; //浙政钉

//获取平台
export function getPlatform() {
    if (isAlipay) {
        return "alipay";
    } else if (isDDing) {
        return "dingtalk";
    } else if (isZLB) {
        return "zlb";
    } else if (isPerZLB) {
        return "perzlb";
    } else if (isWX) {
        return "wechat";
    } else if (isZZD) {
        return "isZZD";
    } else {
        return "other";
    }
}

//设置标题
export function setTitle(title) {
    if (isAlipay && title) {
        ap.setNavigationBar(title);
    } else if (isDDing && title) {
        dd.ready(function () {
            dd.biz.navigation.setTitle({
                title: title,
                onSuccess: function (result) {},
                onFail: function (err) {},
            });
        });
    } else if (isZLB && title) {
        ZWJSBridge.onReady(() => {
            ZWJSBridge.setTitle({
                title: title,
                onSuccess: function (result) {},
                onFail: function (err) {},
            });
        });
    }

    if (title) {
        document.title = title;
    }
}
//扫一扫(不包括微信)
export function scanQR_noWX(successCB, failCB) {
    if (isDDing) {
        dd.ready(function () {
            dd.biz.util.scan({
                type: "qrCode",
                onSuccess: function (data) {
                    successCB && successCB(data);
                },
                onFail: function (err) {
                    failCB && failCB(err);
                },
            });
        });
    } else if (isZLB || isPerZLB) {
        ZWJSBridge.onReady(function () {
            ZWJSBridge.scan({
                type: "qrCode",
                onSuccess: function (data) {
                    successCB && successCB(data);
                },
                onFail: function (error) {
                    failCB && failCB(err);
                },
            });
        });
    } else if (isAlipay) {
        ap.scan(function (data) {
            successCB && successCB({ text: data.code });
        });
    }
}
// 微信扫一扫
export function scanQR_WX(successCB, failCB) {
    getSign({
        url: location.href.split("#")[0],
    }).then((res) => {
        if (res.code === "0000") {
            wx.config({
                debug: false,
                appId: res.data.appId,
                timestamp: res.data.timestamp,
                nonceStr: res.data.nonceStr,
                signature: res.data.signature,
                jsApiList: ["scanQRCode", "checkJsApi"],
            });
            wx.ready(function () {
                wx.scanQRCode({
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        successCB && successCB(res.resultStr);
                    },
                    error: function (res) {
                        failCB && failCB();
                    },
                });
            });
        } else {
            failCB && failCB();
        }
    });
    wx.error(function (res) {
        // alert(res.msg);
    });
}
// 获取浙里办地址信息
export function getLocationInfo_ZLB(successCB, failCB) {
    ZWJSBridge.onReady(
        // {
        //     usage: ["dd.device.location.get"],
        //     remark: "获取详细地址"
        // },
        function () {
            ZWJSBridge.getLocation({
                onSuccess: function (data) {
                    successCB && successCB(data);
                },
                onFail: function (error) {
                    failCB && failCB(error);
                },
            });
        }
    );
}
// 获取浙里办UUID
export function getUUID_ZLB(successCB, failCB) {
    ZWJSBridge.onReady(() => {
        ZWJSBridge.getUUID({
            onSuccess: function (data) {
                successCB && successCB(data);
            },
            onFail: function (error) {
                failCB && failCB(error);
            },
        });
    });
}
// 获取浙里办城市编号
export function selectLocalCity_ZLB(successCB, failCB) {
    ZWJSBridge.onReady(() => {
        ZWJSBridge.getCurrentLocationCity({
            onSuccess: function (data) {
                successCB && successCB(data);
            },
            onFail: function (error) {
                failCB && failCB(error);
            },
        });
    });
}
// 获取浙里办人脸认证
export function realAuthentication_ZLB(obj, successCB, failCB) {
    ZWJSBridge.onReady(() => {
        ZWJSBridge.zmAuthentication({
            certNo: obj.certNo,
            certName: obj.certName,
            onSuccess: function (data) {
                successCB && successCB(data);
            },
            onFail: function (error) {
                failCB && failCB(error);
            },
        });
    });
}
//浙里办下载图片
export function saveImage_ZLB(url, successCB, failCB) {
    ZWJSBridge.onReady(() => {
        ZWJSBridge.saveImage({
            url: url,
            onSuccess: function (data) {
                successCB && successCB(data);
            },
            onFail: function (error) {
                failCB && failCB(error);
            },
        });
    });
}
//浙里办拨打电话
export function makeCall_ZLB(corpId, successCB, failCB) {
    ZWJSBridge.onReady(
        // {
        //     usage: ["dd.biz.telephone.call"],
        //     remark: "下载图片"
        // },
        function () {
            ZWJSBridge.phoneCall({
                corpId,
                onSuccess: function (data) {
                    successCB && successCB(data);
                },
                onFail: function (error) {
                    failCB && failCB(error);
                },
            });
        }
    );
}
//钉钉自动登录获取授权码
export function requestAuthCode_DDing(corpId, successCB, failCB) {
    dd.ready(function () {
        dd.runtime.permission.requestAuthCode({
            corpId,
            onSuccess: function (data) {
                successCB && successCB(data);
            },
            onFail: function (error) {
                failCB && failCB(error);
            },
        });
    });
}
// 获取当前经纬度信息
export function getCurrentLocation(successCB, failCB) {
    if (isWX) {
        getSign({
            url: location.href.split("#")[0],
        }).then((res) => {
            if (res.code === "0000") {
                wx.config({
                    debug: false,
                    appId: res.data.appId,
                    timestamp: res.data.timestamp,
                    nonceStr: res.data.nonceStr,
                    signature: res.data.signature,
                    jsApiList: ["getLocation", "checkJsApi"],
                });
            }
        });
        wx.ready(function () {
            wx.getLocation({
                type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    console.log("wx.getLocation: " + JSON.stringify(res));
                    successCB && successCB(res);
                },
            });
        });
    } else if (isZLB) {
        getLocationInfo_ZLB((data) => {
            successCB && successCB(data);
        });
    } else {
        // TdfCGpaY8iVSlziUOCG1T571z7KMHpYj  本地的
        // RPbDbZymWkHcAFUsGh5yfSRHRGObGypx 测试跟线上
        let geolocation = new BMap.Geolocation();
        geolocation.enableSDKLocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                successCB &&
                    successCB({
                        longitude: r.point.lng,
                        latitude: r.point.lat,
                        point: r.point,
                    });
            } else {
                Toast("获取定位失败：" + this.getStatus());
            }
        });
    }
}

//打开微信内置地图定位
export function openLocation_WX(data) {
    if (!isWX) {
        return;
    }
    getSign({
        url: location.href.split("#")[0],
    }).then((res) => {
        if (res.code === "0000") {
            wx.config({
                debug: false,
                appId: res.data.appId,
                timestamp: res.data.timestamp,
                nonceStr: res.data.nonceStr,
                signature: res.data.signature,
                jsApiList: ["checkJsApi", "openLocation"],
            });
        }
    });
    wx.error(function (res) {
        // alert(res.msg);
    });
    wx.ready(() => {
        wx.openLocation({
            latitude: data.latitude, // 纬度，浮点数，范围为90 ~ -90
            longitude: data.longitude, // 经度，浮点数，范围为180 ~ -180。
            name: data.name || "", // 位置名
            address: data.address || "", // 地址详情说明
            scale: data.scale || 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: data.infoUrl || "", // 在查看位置界面底部显示的超链接,可点击跳转
        });
    });
}

//分享微信
export function shareWechat_WX({ title, desc, link, imgUrl }) {
    getSign({
        url: location.href.split("#")[0],
    }).then((res) => {
        if (res.code === "0000") {
            wx.config({
                debug: false,
                appId: res.data.appId,
                timestamp: res.data.timestamp,
                nonceStr: res.data.nonceStr,
                signature: res.data.signature,
                jsApiList: [
                    "checkJsApi",
                    "updateAppMessageShareData",
                    "updateTimelineShareData",
                ],
            });
        }
    });
    wx.ready(function () {
        //需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {},
        });
        wx.updateTimelineShareData({
            title: title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {},
        });
    });
}

// 关闭浙里办页面
export function close_ZLB(successCB, failCB) {
    ZWJSBridge.onReady(() => {
        ZWJSBridge.close({
            onSuccess: function (data) {
                successCB && successCB(data);
            },
            onFail: function (error) {
                failCB && failCB(error);
            },
        });
    });
}
