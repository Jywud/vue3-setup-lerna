import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'amfe-flexible';
import Vconsole from 'vconsole';

/* 特殊函数式调用组件自己引入样式 */
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';

import App from './App.vue';
import router from './router';

import '@style/reset.less';
const app = createApp(App);
app.use(createPinia());
app.use(router);

if (process.env.NODE_ENV === 'development') {
  new Vconsole();
}

app.mount('#app');
