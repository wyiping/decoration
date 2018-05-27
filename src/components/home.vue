<template>
  <div>
      <x-header :left-options="{showBack: false}">
        <span>装修头条</span>
      </x-header>
      <div>
        <tab :line-width=2 active-color='#fc378c' v-model="index">
          <tab-item class="vux-center" v-for="(item, index) in navbar" :key="index" @on-item-click="onItemClick(item.url)">
            {{item.text}}
          </tab-item>
        </tab>
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
import { Tab, TabItem } from "vux";

export default {
  components: {
    Tab,
    TabItem
  },
  methods: {
    onItemClick(path) {
      this.$router.push(path);
    }
  },
  data() {
    return {
      navbar: [
        {
          text: "推荐",
          url: "/home/recommend",
          type: "recommend"
        },
        {
          text: "热点",
          url: "/home/hot",
          type: "hot"
        },
        {
          text: "案例",
          url: "/home/case",
          type: "case"
        },
        {
          text: "美图",
          url: "/home/pictures",
          type: "pictures"
        },
        {
          text: "设计",
          url: "/home/design",
          type: "design"
        },
        {
          text: "攻略",
          url: "/home/strategy",
          type: "strategy"
        },
        {
          text: "选材",
          url: "/home/choose",
          type: "choose"
        },
        {
          text: "本地",
          url: "/home/local",
          type: "local"
        }
      ],
      index: 0
    };
  }
};
</script>