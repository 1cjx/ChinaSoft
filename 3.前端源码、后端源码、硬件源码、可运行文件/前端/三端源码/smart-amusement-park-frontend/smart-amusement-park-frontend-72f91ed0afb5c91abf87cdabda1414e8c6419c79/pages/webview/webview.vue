<!-- 开发者:陈金铭 -->

<template>
  <view>
    <web-view :src="url"></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      url: ''
    };
  },
  methods: {
    onLoad() {
      this.url = this.$route.query.url;
    },
  },
};
</script>