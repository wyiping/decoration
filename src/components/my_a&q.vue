<template>
  <div>
    <x-header>
      <span>我的问答</span>
    </x-header>
    <div>
      <tab :line-width="2" active-color='#fc378c'>
        <tab-item selected @on-item-click="onItemClick">我的提问</tab-item>
        <tab-item @on-item-click="onItemClick">已回答</tab-item>
      </tab>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
const routers = ["questions", "answer"];
import { Tab, TabItem } from "vux";

export default {
  name: "myQuestions",
  components: {
    Tab,
    TabItem
  },
  data() {
    return {
      index: 0,
      lists: ["我的问题", "我的回答"]
    };
  },
  methods: {
    onItemClick(index) {
      let path = "/myquestions/" + routers[index];
      this.$router.push(path);
    }
  },
  mounted() {
    var self = this;
    var user = JSON.parse(sessionStorage.getItem("user"));
    if (user == null) {
      self.$router.push("/login");
    }
  }
};
</script>

<style>

</style>
