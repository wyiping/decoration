<template>
  <div>
    <x-header><span>提问</span></x-header>
    <group>
      <x-input v-model="question.title" placeholder="请概述您的问题" @on-change="hasTitle" required></x-input>
      <x-textarea v-model="question.content" :max="1000" name="description" placeholder="您可以继续补充问题细节"></x-textarea>
      <selector v-model="question.type" title="问题分类：" :options="types"></selector>
    </group>
    <div style="padding:15px;">
       <x-button type="primary" style="border-radius:99px;"  @click.native="ask" :disabled="add">提交问题</x-button>
    </div>
  </div>
</template>

<script>
import { Group, Selector,XButton, XInput, XTextarea } from "vux";

export default {
  components: {
    Group,
    Selector,
    XButton,
    XInput,
    XTextarea
  },
  data() {
    return {
      add: true,
      question:{
        asker:"",
        title:"",
        content:"",
        type:""
      },
      types: [
        { key: "装修", value: "装修" },
        { key: "家居", value: "家居" },
        { key: "家电", value: "家电" },
        { key: "建材", value: "建材" }
      ]
    };
  },
  methods:{
    hasTitle(val){
      if(val){
        this.add = false
      }else{
        this.add = true
      }
    },
    ask(){
      this.$http.post('/api/question/ask',this.question).then(({data})=>{
        if(data.code == 1){
          this.$router.push("/questions");
        }
      })
    }
  },
  mounted() {
    var self = this;
    var user = JSON.parse(sessionStorage.getItem("user"));
    if (user == null) {
      self.$router.push("/login");
    } else {
      self.question.asker = user.id
    }
  },
};
</script>

<style>

</style>
