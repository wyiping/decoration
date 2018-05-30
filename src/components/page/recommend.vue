<template>
  <div>
      <swiper :list="banner_list" v-model="banner_index" :auto="true" @on-index-change="banner_onIndexChange"></swiper>
      <ul class="newsContent animated">
        <router-link
          v-for="(val,index) in listCon"
          :to="{name:'detail',
                params:{ 
                  title:val.title,
                  date:val.date,
                  description:val.description,
                  img_arr:val.img_arr,
                  source:val.source,
                }
          }"
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
import { Swiper, SwiperItem } from "vux";
export default {
  name: "recommend",
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    banner_onIndexChange(index) {
      this.banner_index = index;
    }
  },
  mounted() {
    this.$http.get("/api/api/recommend").then(({ data }) => {
      this.listCon = data.list;
    });
  },
  data() {
    return {
      banner_list: [
        {
          url: "javascript:",
          img:
            "http://oneimg1.jia.com/content/public/resource/12807987/2017/01/541315_field_3_1483698780.jpg",
          title: "暖暖的新家"
        },
        {
          url: "javascript:",
          img:
            "http://oneimg2.jia.com/content/public/resource/12807987/2017/03/541319_field_3_1488520014.jpg",
          title: "家装流程，手把手教你做装修！"
        },
        {
          url: "javascript:",
          img:
            "http://oneimg3.jia.com/content/public/resource/12807987/2017/03/541316_field_3_1488520060.jpg", // 404
          title: "最美软装打造靓丽新家！"
        }
      ],
      banner_index: 0,
      swiperItemIndex: 1,
      listCon: []
    };
  }
};
</script>
<style lang="less" scoped rel="styleheet/less">
@import "../../assets/css/style.less";
</style>