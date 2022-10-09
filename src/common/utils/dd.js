import * as dding from "dingtalk-jsapi";

//钉钉扫码
export const ddScan = (successCallBack = () => {}, failCallBack = () => {}) => {
    if (dding.env.platform !== "notInDingTalk") {
        dding.ready(function() {
            dding.biz.util.scan({
                type: "qrCode",
                onSuccess: function(data) {
                    console.log(data);
                    successCallBack(data);
                },
                onFail: function(err) {
                    failCallBack(err);
                }
            });
        });
    } else {
        dd.ready(
            {
                developer: "jiangc@dtdream.com",
                usage: ["dd.biz.util.scan"],
                remark: "扫一扫"
            },
            function() {
                console.log(dd.biz.util.scan);
                dd.biz.util.scan({
                    type: "qrCode",
                    onSuccess: function(data) {
                        console.log(data.text);
                        successCallBack(data);
                        // data =>{"text" : "扫描到的内容"}
                    },
                    onFail: function(error) {
                        failCallBack(err);
                    }
                });
            }
        );
    }
};
