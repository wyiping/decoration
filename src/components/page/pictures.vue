<template>
  <div>
    <grid :cols="2" :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item v-for="(val,index) in listCon" :key="index">
        <card class="pic">
          <img slot="header" :src="val.thumb" style="width:100%;display:block;" @click="shows(val.img_arr)">
          <div slot="content">
            <p class="title">{{val.title}}</p>
          </div>
        </card>
      </grid-item>
    </grid>
    <previewer :list="picLists" ref="previewer"></previewer>
  </div>
</template>

<script>
import { Card, Grid, GridItem, Previewer } from "vux";
import { setTimeout } from 'timers';

export default {
  name: "case",
  components: {
    Card,
    Grid,
    GridItem,
    Previewer
  },
  data() {
    return {
      listCon: [],
      picLists: [],
      options: {
        getThumbBoundsFn(index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll(".previewer-demo-img")[
            index
          ];
          // get window scroll Y
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect();
          // w = width
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    };
  },
  methods: {
    shows(list) {
      this.picLists = list;
      setTimeout(()=>{
        this.$refs.previewer.show(0);
      },100)
    }
  },
  mounted() {
    this.$http.get("/api/api/pictures").then(({ data }) => {
      this.listCon = data.list;
    });
  }
};
</script>
<style lang="less" scoped>
.pic {
  color: #000;
  .title {
    padding: 0.15rem 0.05rem 0.15rem 0.05rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
