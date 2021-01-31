<template>
  <ul class="footer-guide">
    <li @click="goWhere('/msite')">
      <span class="iconfont icon-waimai" :class="{on:'msite'===path}"></span>
      <p>首页</p>
    </li>
    <li @click="goWhere('/search')">
      <span class="iconfont icon-search2" :class="{on:'search'===path}"></span>
      <p>搜索</p>
    </li>
    <li @click="goWhere('/order')">
      <span class="iconfont icon-dingdan" :class="{on:'order'===path}"></span>
      <p>订单</p>
    </li>
    <li @click="goWhere('/profile')">
      <span class="iconfont icon-geren" :class="{on:'profile'===path}"></span>
      <p>我的</p>
    </li>
  </ul>
</template>
<script>
  export default {
    data(){
      return {
        on:false
      }
    },
    methods:{
      goWhere(path){
        //如果是请求的同样的地址 会报错
        if (path !== this.$route.path){
          this.$router.push(path)
        }else {
          window.location.href = path;
        }
      }
    },
    computed:{
      path(){
        return this.$route.fullPath.substring(1);
      }
    }

  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"

//定义一个高亮显示的类
.on
  color $green

.footer-guide
  top-border-1px(#cccccc)
  display flex
  position: fixed;
  left 0;
  bottom 0
  width: 100%;
  height 50px
  background-color: #fff;
  &>li
    margin-top 10px
    width: 25%;
    text-align center
    font-weight bold
    font-size 12px
    &>p
      margin-top  3px
    span
      font-size 22px
</style>
