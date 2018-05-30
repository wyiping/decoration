<template>
<div id="detail">
    <x-header>
      <span>{{title}}</span>
    </x-header>
    <div class="container">
        <h2 class="detail-title">{{title}}</h2>
        <div class="media_name">
            <img src="../../assets/img/head.jpg" height="360" width="360" alt="" class="avatar_url">
            <span class="name">{{source}}</span><br>
            <span class="date">{{date}}</span>
        </div>
        <div class="contentNews">
            {{description}}
            <img :src="img" alt="" v-for="(img,index) in img_arr" :key="index">
        </div>
        <hr>
        <div class="zan">
             <flexbox>
              <flexbox-item>
                <x-button type="primary">喜欢</x-button>
              </flexbox-item>
              <flexbox-item>
                <x-button type="warn">不喜欢</x-button>
              </flexbox-item>
            </flexbox>
        </div>
        <hr>
    </div>
</div>
</template>
<script>
import { XButton, Flexbox, FlexboxItem } from "vux";

export default {
  components: {
    XButton,
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      title: this.$route.params.title
    };
  },
  methods: {},
  computed: {
    source: function() {
      if (this.$route.params.source) {
        return this.$route.params.source;
      } else {
        return "";
      }
    },
    date: function() {
      if (this.$route.params.date) {
        return this.$route.params.date;
      } else {
        return "";
      }
    },
    description: function() {
      if (this.$route.params.description) {
        return this.$route.params.description;
      } else {
        return "";
      }
    },
    img_arr: function() {
      if (this.$route.params.img_arr) {
        return this.$route.params.img_arr;
      } else {
        return "";
      }
    }
  }
};
</script>
<style lang="less">
@import "../../assets/css/border.less";
#detail {
  hr {
    height: 1px;
    background: #ccc;
  }
  .detail-header {
    background: #fff;
    font-size: 18px;
    font-weight: bold;
    color: #000;
    &::after {
      content: "";
      box-sizing: border-box;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      border-top: 1px solid #ccc;
      @media screen and (-webkit-min-device-pixel-ratio: 3) {
        transform: scaleY(0.33333);
      }
      @media screen and (-webkit-min-device-pixel-ratio: 2) {
        transform: scaleY(0.5);
      }
    }
    .back {
      line-height: 1.2rem;
      margin-left: 0.3rem;
    }
    .share {
      line-height: 1.2rem;
      margin-right: 0.3rem;
    }
  }
  .container {
    margin: 1.6rem auto 1.5rem;
    width: 94%;
    .detail-title {
      color: #000;
      font-size: 20px;
    }
    .media_name {
      position: relative;
      margin-top: 0.5rem;
      .avatar_url {
        height: 1.1rem;
        width: 1.1rem;
        border-radius: 50%;
      }
      .name {
        position: absolute;
        font-size: 14px;
        font-weight: bold;
        left: 1.3rem;
        top: 0.1rem;
      }
      .date {
        position: absolute;
        left: 1.3rem;
        top: 0.6rem;
      }
    }
    .contentNews {
      margin-top: 0.5rem;
      font-size: 16px;
      color: #000;
      text-indent: 0.7rem;
      line-height: 0.8rem;
      img {
        text-align: center;
        display: block;
        width: 70%;
        margin: 0.2rem auto;
      }
    }
    .keywords {
      margin-top: 0.5rem;
      line-height: 0.8rem;
      span {
        margin-bottom: 0.3rem;
        text-align: center;
        margin-right: 0.3rem;
        display: inline-block;
        border: 1px solid #ccc;
        padding: 0 0.2rem;
        border-radius: 0.4rem;
      }
    }
    .zan {
      text-align: center;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      botton {
        padding-right: 1rem;
        color: #000;
      }
    }
  }
}
</style>
