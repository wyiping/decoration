<template>
  <div>
    <x-header>
      <span>发现</span>
    </x-header>
    <divider style="font-size: 16px;">经典案例展示</divider>
    <grid :cols="2" :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item v-for="(val,index) in case_list" :key="index">
        <card class="case">
          <img slot="header" :src="val.thumb" style="width:100%;display:block;">
          <div slot="content">
            <p class="c_title">{{val.title}}</p>
            <p class="c_type">{{val.no_like}}</p>
          </div>
        </card>
      </grid-item>
    </grid>

    <divider style="font-size: 16px;">找装修</divider>
    <panel :list="companies" type="5" :footer="{title:'查看更多公司'}"></panel>

    <divider style="font-size: 16px;">找设计</divider>
    <ul class="newsContent animated">
        <router-link
          v-for="(val,index) in designList"
          :to="{name:'detaile'}"
          class="newsDetaile"
          :key="index"
        >
        <p class="title">{{val.title}}</p>
        <div>
          <img alt="加载出错" v-for="(url,index) in val.img_arr" :key="index" :src="url">
          <div class="bottomInfo clearfix">
            <span class="writer">{{val.source}}</span> &nbsp;&nbsp;
            <span class="comment_count">阅读&nbsp;{{val.views}}</span>
            <span class="datetime">{{val.date}}</span>
          </div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { Scroller, Divider, Card, Grid, GridItem, Panel } from "vux";

export default {
  components: {
    Scroller,
    Divider,
    Card,
    Grid,
    GridItem,
    Panel
  },
  data() {
    return {
      case_list: [],
      companies: [
        {
          src: "http://tgi12.jia.com/120/008/20008594.m.jpg",
          title: "都市时空装饰",
        },
        {
          src: "http://tgi12.jia.com/120/793/20793095.m.jpg",
          title: "靓尚伊家装饰",
        },
        {
          src: "http://tgi12.jia.com/121/119/21119774.m.jpg",
          title: "以诺装饰",
        },
        {
          src: "http://tgi1.jia.com/115/499/15499113.m.jpg",
          title: "今朝装饰",
        },
        {
          src: "http://tgi1.jia.com/120/957/20957261.m.jpg",
          title: "齐家典尚太原分站",
        }
      ],
      designList:[]
    };
  },
  mounted() {
    this.$http.get("/api/api/pictures").then(({ data }) => {
      this.case_list = data.list.slice(0, 4);
    });
    this.$http.get("/api/api/design").then(({ data }) => {
      this.designList = data.list.slice(0, 10);
    });
  }
};
</script>
<style lang="less" scoped rel="styleheet/less">
@import "../assets/css/style.less";
.case {
  color: #000;
  text-align: center;
  .c_title {
    // font-size: 0.2rem;
    font-weight: bold;
    padding: 0.1rem 0.08rem 0 0.08rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.2;
  }
  .c_type {
    margin-bottom: 0.03rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
