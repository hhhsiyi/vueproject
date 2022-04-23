<template>
  <form action="/">
    <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

</template>

<script>
import {ref} from 'vue';
import {Toast} from 'vant';

export default {
  setup() {
    const that = this
    const value = ref('');
    const onSearch = (value1) => {
      Toast(value1)
      this.$alert('onSearch',value1)
    };
    const onCancel = () => Toast('取消');
    return {
      value,
      onSearch,
      onCancel,
    };
  },
};

</script>

<style scoped>

</style>