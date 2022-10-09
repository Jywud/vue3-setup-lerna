<template>
  <div class="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <van-button type="primary">主要按钮</van-button>
    <img src="@img/1.png" alt="" @click="show = true">
    <div class="test" @click="notify">show notify</div>
    <van-checkbox v-model="checked">复选框</van-checkbox>
    <van-popup v-model:show="show">内容</van-popup>
    <van-cell-group inset>
      <van-field v-model="value" label="文本" placeholder="请输入用户名" />
    </van-cell-group>
    <van-switch v-model="checked" />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Notify } from 'vant';
let show = ref(false)
const checked = ref(true);

let notify = ()=> {
  Notify('通知内容');
}

</script>
<style lang="less">
.app {
  font-size: 14px;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.test {
  width: 750px;
  background-color: red;
  height: 100px;
}
</style>
