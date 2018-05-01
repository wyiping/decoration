<template>
  <div>
      <x-header :left-options="{showBack: false}">
        <span>装饰头条</span>
      </x-header>
      <div>
        <tab :line-width=2 active-color='#fc378c' v-model="index">
            <tab-item class="vux-center" v-for="(item, index) in lists" :key="index">{{item}}</tab-item>
        </tab>
    </div>
  </div>
</template>

<script>
const list = () => ["推荐","热点","攻略","本地","选材","案例","设计","家居","美图"];
import { Tab, TabItem,  } from "vux";

export default {
  components: {
    Tab,
    TabItem,
  },
  data() {
    return {
      lists: list(),
      index: 0
    };
  }
};
</script>