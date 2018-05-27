<template>
  <div id="app">
      <view-box ref="viewBox">
        <router-view></router-view>
      </view-box>
      <tabbar>
        <tabbar-item selected link="/">
          <img slot="icon" src="./assets/img/home.png">
          <img slot="icon-active" src="./assets/img/home-active.png">
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item link="/find">
          <img slot="icon" src="./assets/img/find.png">
          <img slot="icon-active" src="./assets/img/find-active.png">
          <span slot="label">发现</span>
        </tabbar-item>
        <tabbar-item link="/questions">
          <img slot="icon" src="./assets/img/question.png">
          <img slot="icon-active" src="./assets/img/question-active.png">
          <span slot="label">问答</span>
        </tabbar-item>
        <tabbar-item link="/user">
          <img slot="icon" src="./assets/img/user.png">
          <img slot="icon-active" src="./assets/img/user-active.png">
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
  </div>
</template>

<script>
import { ViewBox } from "vux";

export default {
  name: "app",
  components: {
    ViewBox
  },
  data() {
    return {
      msg: "Hello World!"
    };
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

body {
  background-color: #fbf9fe;
}
html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
</style>
