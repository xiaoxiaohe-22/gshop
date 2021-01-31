<template>
  <div>
    <router-view></router-view>
<!--    底部的导航区域我们只有在四个一级路由的时候才显示 其他情况都不显示-->
    <FooterGuide v-show="$route.meta.isShowFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide";
export default {
  name: 'App',
  components: {FooterGuide},
   mounted() {
//页面一加载就发送自动登录请求
     this.$store.dispatch("autoLogin");

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >

</style>
