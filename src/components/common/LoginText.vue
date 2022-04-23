<template>
  <div>
    <van-field
        v-model="text"
        :label="label"
        :type="type"
        :placeholder="placeholder"
        :rule="rule"
        size="large"
        autosize
    >
    </van-field>
  </div>
</template>

<script>
export default {
  name: "LoginText",
  props: ['label', 'type', 'placeholder', 'rule'],
  data() {
    return {
      text: ''
    }
  },
  methods: {
    handlerInput() {
      // console.log(this.rule);
      const rule = new RegExp(this.rule)
      // console.log(rule);
      if (rule.test(this.text)) {
        console.log('正则校验通过');
        this.$emit('passVerification',this.text)
      }
      // else {
      //   alert('正则校验失败')
      // }
    }
  },
  watch: {
    text() {
      // console.log('a');
      this.handlerInput()
    }
  }
}
</script>

<style scoped>

</style>