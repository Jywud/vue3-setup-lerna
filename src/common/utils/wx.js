import axios from 'axios';
import { Toast } from 'vant';
import URLSearchParams from 'url-search-params';
import {getLocalStorage,setLocalStorage} from '../utils'
import * as dd from 'dingtalk-jsapi';
import qs from 'qs'
export const wxLogin =(openId)=>{ //401
    let param = new URLSearchParams()
    param.append('openId', openId)
    // console.log(param);
    return new Promise((resolve,reject)=>{
        axios.post('/api/wechatOpenIdLogin', param).then(res=>{

            if(res.data.code=='0000'){//已绑定用户

                // setLocalStorage('openid',res.data.openid)
                setLocalStorage('token',res.data.data.token.token)
                // setLocalStorage('realName',res.data.realName)
                // setLocalStorage('entLogo',res.data.entLoginUrl)
                // setLocalStorage('entName',res.data.entName)
                resolve(res.data);
            }else if(res.data.code == '9999'){//未绑定
                // setLocalStorage('openid',res.openid)reject();
                reject()
            }else{
                Toast(res.msg);
            }

        }).catch((e)=>{
            reject();
            // return new Error(e)
        })
    })

}



const instance = axios.create({
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
    transformRequest: [ function (data) {
        let ret = '' ;
        for (let it in data) { ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&' }
        return ret
    } ]
});

export const ddLogin = ()=>{
    return new Promise((resolve,reject)=>{
        axios.post('/api/dtalk/getDingParam').then((res)=>{
            if (res.data.code == '0000') {
                let corpId = res.data.data.corpId;
                dd.ready(function() {
                    dd.runtime.permission.requestAuthCode({
                        corpId: corpId, // 企业id
                        onSuccess: function (info) {
                            let code = info.code; // 通过该免登授权码可以获取用户身份
                            // alert(code,corpId);
                            axios({
                                method: 'post',
                                url: '/api/dtalkLogin', // 路径
                                data: {
                                    code
                                },
                                transformRequest: [function (data) {
                                    let ret = '';
                                    ret = qs.stringify(data);
                                    return ret;
                                }],
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).then(res=>{
                                if(res.data.code == '0000'){
                                    setLocalStorage('token',res.data.data.token.token);
                                    setLocalStorage("curl", res.data.data.permission);
                                    setLocalStorage("grider", res.data.data.grider);
                                    setLocalStorage("permissionDing", res.data.data.permissionDing);
                                    setLocalStorage("level", res.data.data.level);
                                    resolve(res.data);
                                }else{
                                    // _this.$router.go(-1);
                                    Toast('登录失败');
                                    location.href = '/h5/login.html';//登录页
                                }
                            })
                        },
                        onFail: function (err) {
                            Toast(err.errorMessage);
                            location.href = '/h5/login.html';//登录页
                            reject();
                        }
                    })
                });
            } else {
                Toast('登录失败');
                location.href = '/h5/login.html';//登录页
                reject();
            }
        })
    })
}

