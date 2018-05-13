<template>
  <div>
    <x-header>
      <span>问答</span>
    </x-header>
    <card :header="{title:question.title}" :footer="{title:'我来回答'}" @on-click-footer="Answer">
      <div slot="content" style="padding:15px">
        <p style="font-size:16px;line-height:1.2;">{{question.content}}</p>
        <p style="color:#999;font-size:12px;">{{question.askTime}}</p>
      </div>
    </card>

    <box gap="10px 10px">
        <divider v-if="answers.length==0">没有人回答...</divider>
        <panel :list="answers" type="4"></panel>
      </box>
    <div v-transfer-dom>
      <popup v-model="isAnswer" height="100%">
        <x-header @on-click-back="isAnswer=!isAnswer" :left-options="{backText:'取消',preventGoBack:true}">
          <span>回答</span>
        </x-header>
        <group>
          <x-input v-model="question.title" disabled></x-input>
          <x-textarea v-model="answer.content" :max="1000" name="answer" @on-change="hasAnswer" placeholder="您的回答将帮助到很多正在装修的网友，请尽量回答的真实、详细、有效。"></x-textarea>
        </group>
        <div style="padding:15px;">
          <x-button type="primary" style="border-radius:99px;"  @click.native="postAnswer" :disabled="isNull">提交回答</x-button>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import {
  Box,
  Card,
  Divider,
  Group,
  XButton,
  XInput,
  XTextarea,
  Panel,
  Popup,
  TransferDom
} from "vux";
export default {
  name: "question",
  components: {
    Box,
    Card,
    Divider,
    Group,
    XButton,
    XInput,
    XTextarea,
    Panel,
    Popup
  },
  data() {
    return {
      answer: {
        question: "",
        answerer: "",
        content: ""
      },
      answers: [],
      question: {},
      isAnswer: false,
      isNull: true
    };
  },
  directives: {
    TransferDom
  },
  methods: {
    Answer() {
      var self = this;
      var user = JSON.parse(sessionStorage.getItem("user"));
      if (user) {
        this.isAnswer = true;
        self.answer.answerer = user.id;
      } else {
        self.$router.push("/login");
      }
    },
    getAnsewers() {
      this.$http
        .post("/api/question/find/answer/" + this.$route.params.id)
        .then(({ data }) => {
          this.answers = data.answers;
        });
    },
    getQuestion() {
      this.$http
        .post("/api/question/find/" + this.$route.params.id)
        .then(({ data }) => {
          this.question = data.question;
        });
    },
    hasAnswer(val) {
      if (val) {
        this.isNull = false;
      } else {
        this.isNull = true;
      }
    },
    postAnswer() {
      this.$http.post("/api/question/answer", this.answer).then(({ data }) => {
        if (data.code == 1) {
          this.getAnsewers()
          this.isAnswer = false;
        }
      });
    }
  },
  mounted() {
    var self = this;
    self.answer.question = self.$route.params.id;
    self.getQuestion();
    self.getAnsewers();
  }
};
</script>

<style>

</style>
