<template>
  <div>
      <x-header>
        <span>问答</span>
      </x-header>
      <group gutter="0">
        <div style="padding:10px;">
          <flexbox>
            <flexbox-item>
              <x-button style="border-radius:99px;">我的问答</x-button>
            </flexbox-item>
            <flexbox-item>
              <x-button link="/ask" type="warn" style="border-radius:99px;">我要提问</x-button>
            </flexbox-item>
          </flexbox>
        </div>
      </group>
      <box gap="10px 10px">
        <divider v-if="all.length==0">问题为空...</divider>
        <panel :list="all" type="4"></panel>
      </box>
  </div>
</template>

<script>
import { Box, Divider ,Group, Flexbox, FlexboxItem, Panel, XButton } from "vux";

export default {
  components: {
    Box,
    Divider ,
    Group,
    Flexbox,
    FlexboxItem,
    Panel,
    XButton
  },
  data(){
    return {
      all:[]
    }
  },
  mounted(){
    this.$http.post('/api/question/find').then(({data}) => {
      for(let i = 0;i<data.questions.length;i++){
        this.all.push(data.questions[i])
      }
    })
  }
};
</script>