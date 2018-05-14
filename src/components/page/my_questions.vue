<template>
  <div>
    <box gap="10px 10px">
      <div v-if="questions.length==0" class="center">
        <img src="/static/no.png" alt="" width="80%">
        <p>还没有提问过哦~</p>
        <x-button link="/ask" type="warn" style="border-radius:99px;width:60%;">我要提问</x-button>
      </div>
      <panel :list="questions" type="4"></panel>
    </box>
  </div>
</template>

<script>
import { Box, Panel, XButton } from "vux";

export default {
  components: {
    Box,
    Panel,
    XButton
  },
  data() {
    return {
      questions: []
    };
  },
  mounted(){
    var user = JSON.parse(sessionStorage.getItem("user"));
    this.$http.post('/api/question/find/my/'+user.id).then(({data}) => {
      this.questions = data.questions
    })
  }
};
</script>

<style>
.center {
  margin-top: calc(50vh - 268px);
  text-align: center;
}
</style>
