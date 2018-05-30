<template>
  <div>
    <x-header>
      <span>修改密码</span>
    </x-header>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input title="原密码" type="password" required v-model="oldpassword" placeholder="请输入您的原密码" :min="6"></x-input>
      <x-input title="新密码" type="password" required v-model="newpassword" placeholder="请输入您的新密码" :min="6"></x-input>
      <x-input title="新密码" type="password" @on-change="check" required v-model="news" placeholder="请再次输入您的新密码" :min="6"></x-input>
    </group>
    <div style="padding:15px;">
      <x-button type="primary" :disabled="status" @click.native="edit">提交</x-button>
    </div>
  </div>
</template>

<script>
import { AlertModule,XButton, Group, Cell, XInput } from "vux";

export default {
  components: {
    AlertModule,
    XButton,
    Group,
    Cell,
    XInput
  },
  data() {
    return {
      status: true,
      oldpassword: "",
      newpassword: "",
      news: ""
    };
  },
  methods: {
    check() {
      console.log("check")
      if (this.newpassword == this.news) {
        this.status = false;
      }
    },
    edit() {
      this.$http
        .post("/api/edit/password/" + this.$route.params.id, {
          old: this.oldpassword,
          password: this.newpassword
        })
        .then(({ data }) => {
            AlertModule.show({
              title: data.title,
              content: data.msg
            })
        });
    }
  }
};
</script>

<style>
</style>
