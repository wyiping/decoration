<template>
  <div>
      <x-header :left-options="{showBack: false}">
        <span>装修头条</span>
      </x-header>
      <div>
        <tab :line-width=2 active-color='#fc378c' v-model="index">
            <tab-item  @on-item-click="onItemClick" class="vux-center" v-for="(item, index) in lists" :key="index">{{item}}</tab-item>
        </tab>
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
const list = () => ["推荐","热点","攻略","本地","选材","案例","设计","家居","美图"];
const routers = ['recommend','hot','strategy','local','choose','case','design','household','pictures']
import { Tab, TabItem,  } from "vux";

export default {
  components: {
    Tab,
    TabItem,
  },
  methods:{
    onItemClick(index){
      let path = '/' + routers[index]
      this.$router.push(path)
    }
  },
  data() {
    return {
      lists: list(),
      index: 0
    };
  }
};
</script>