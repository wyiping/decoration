<template>
  <div>
    <grid :cols="2" :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item v-for="(val,index) in listCon" :key="index">
        <card class="case">
          <img slot="header" :src="val.thumb" style="width:100%;display:block;">
          <div slot="content">
            <p class="c_title">{{val.title}}</p>
            <p class="c_type">{{val.no_like}}</p>
          </div>
        </card>
      </grid-item>
    </grid>
  </div>
</template>

<script>
import { Card, Grid, GridItem } from "vux";

export default {
  name: "case",
  components: {
    Card,
    Grid,
    GridItem
  },
  data() {
    return {
      listCon: []
    };
  },
  mounted() {
    this.$http.get("/api/api/case").then(({ data }) => {
      this.listCon = data.list;
    });
  }
};
</script>

<style lang="less" scoped rel="styleheet/less">
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
