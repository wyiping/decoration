<template>
  <div>
      <x-header>
        <span>问答</span>
      </x-header>
      <div style="padding:15px;">
        <button-tab>
          <button-tab-item selected>全部问题</button-tab-item>
          <button-tab-item>我的回答</button-tab-item>
        </button-tab>
      </div>
  </div>
</template>

<script>
import { ButtonTab, ButtonTabItem } from 'vux'

export default {
  components: {
    ButtonTab,
    ButtonTabItem
  }
}
</script>