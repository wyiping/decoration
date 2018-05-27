<template>
  <div>
    <ul class="newsContent animated">
        <router-link
          v-for="(val,index) in listCon"
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
export default {
  data() {
    return {
      listCon: []
    };
  },
  mounted() {
    this.$http.get("/api/api/hot").then(({ data }) => {
      this.listCon = data.list;
    });
  }
};
</script>

<style lang="less" scoped rel="styleheet/less">
@import "../../assets/css/style.less";
</style>
