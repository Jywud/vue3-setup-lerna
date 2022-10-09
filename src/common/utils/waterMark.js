import watermark  from 'watermark-dom';
import {getUserInfoForWaterMark} from '../interface/api/h5/companyInfo';
export const createMark =  (parentEl)=>{
    let id = createDOM(parentEl);
    getUserInfoForWaterMark().then(res=>{
        if(res.code == "0000"){
            let data = res.data;
            initMark(`${data.userName}`,id) 
        }
        
    })
  
}

function initMark(text,parentElID){
    let date = new Date();
    let options ={
        watermark_prefix: 'mask_div_id',    //小水印的id前缀
        watermark_txt:text ? text : ( date.getFullYear()+'-'+(date.getMonth()+1) + "-" +date.getDate() ),             //水印的内容
        watermark_x:5,                     //水印起始位置x轴坐标
        watermark_y:5,                     //水印起始位置Y轴坐标
        watermark_rows:10,                   //水印行数
        watermark_cols:2,                   //水印列数
        watermark_x_space:0,              //水印x轴间隔
        watermark_y_space:0,               //水印y轴间隔
        watermark_font:'微软雅黑',           //水印字体
        watermark_color:'black',            //水印字体颜色
        watermark_fontsize:'12px',          //水印字体大小
        watermark_alpha:0.03,               //水印透明度，要求设置在大于等于0.005
        watermark_width:150,                //水印宽度
        watermark_height:80,               //水印长度
        watermark_angle:30,   
        watermark_parent_node:parentElID    //水印父元素

    }
    // console.log(options)
    watermark.init(options);
}

export const removeWaterMark = ()=>{
     watermark.remove()
}
export const createDOM = (parentEl)=>{
    let dom = document.createElement("div");
    let id = (new Date()).valueOf();
    dom.id = id;
    dom.style.height = '100%';
    dom.style.width = '100%';
    dom.style.position = 'absolute';
    dom.style.left = '0px';
    dom.style.top = '0px';
    parentEl.appendChild(dom);
    return id;
}