<template>
  <div>
      <x-header>
        <span>我的</span>
      </x-header>
      <panel :list="users" type="1" @on-click-item="changeHeader"></panel>
      <actionsheet v-model="photo" :menus="menus" @on-click-menu="click" show-cancel></actionsheet>

      <group>
        <cell title="我的资料" link="/user"></cell>
        <cell title="修改密码" link="/user"></cell>
        <cell title="修改头像" link="/user" @click.native="click"></cell>
        <cell title="我的问答" link="/question"></cell>
      </group>
      <input type="file" accept="image/*" multiple style="display:none" name="photo" ref="photo" @change='onUpload'/>
      <box gap="10px 10px">
        <x-button @click.native="exit">退出</x-button>
      </box>
  </div>
</template>

<script>
import { Actionsheet, AlertModule, Box, Cell, CellBox, Group, Panel, XButton } from "vux";

export default {
  components: {
    Actionsheet,
    Box,
    Cell,
    CellBox,
    Group,
    Panel,
    XButton
  },
  mounted() {
    var self = this;
    self.user = JSON.parse(sessionStorage.getItem("user"));
    if (self.user == null) {
      self.$router.push("/login");
    } else {
      const list = {
        title: self.user.username,
        src: "/static/user/" + self.user.photo,
        fallbackSrc: "/static/default.png",
        desc: "欢迎使用装修头条"
      };
      self.users.push(list);
    }
  },
  data() {
    return {
      user: {},
      users: [],
      photo: false,
      menus: {
        menu1: "拍照",
        menu2: "从相册选取"
      }
    };
  },
  methods: {
    changeHeader(item) {
      // console.log(item)
      this.photo = true;
    },
    click(key) {
      this.$refs.photo.dispatchEvent(new MouseEvent("click"));
    },
    onUpload(e) {
      var self = this;
      let file = e.target.files[0];
      /* eslint-disable no-undef */
      let param = new FormData(); // 创建form对象
      param.append("file", file, file.name); // 通过append向form对象添加数据
      param.append("chunk", "0"); // 添加form表单中其他数据
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      self.$http.post("/api/update/photo/" + this.user.id, param, config).then(({ data }) => {
          self.$http.post('/api/find/'+self.user.id).then(({ data }) => {
            sessionStorage.removeItem("user");
            sessionStorage.setItem("user", JSON.stringify(data.user))
            AlertModule.show({
              title: '更新成功',
              content: '修改头像成功',
              onHide(){
                location.reload()
              }
            })
          });
        });
    },
    exit() {
      sessionStorage.removeItem("user");
      this.$router.push("/login");
    }
  }
};
</script>
<style scoped>
.weui-media-box__thumb {
  border-radius: 50%;
}
</style>
