<template>
  <div id='wrapper'>
    <iframe src='https://preprod.lcieducation.com/en/login.aspx?onlycontent=true'></iframe>
  </div>

</template>

<script>

export default {
  name: 'index',
  props: {
    userAgent: String
  },
  components: {

  },
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {

  },
  created() {
  }
}
</script>

<style scoped lang='stylus'>
#wrapper
  position: relative;

  iframe
    width 100%
    height 100vh
</style>
