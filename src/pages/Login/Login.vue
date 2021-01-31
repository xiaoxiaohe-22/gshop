<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:isLoginBySms}" @click="isLoginBySms = true">短信登录</a>
          <a href="javascript:;" :class="{on:!isLoginBySms}" @click="isLoginBySms = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <!--          一个div是控制用短信登录-->
          <div :class="{on:isLoginBySms}">
            <section class="login_message">
              <input v-validate="'required|mobile'" name="mobile" type="tel" maxlength="11" placeholder="手机号"
                     v-model="phone">
              <span style="color: red" v-show="errors.has('mobile')"> {{ errors.first('mobile') }} </span>

              <button :disabled="!verifyPhone || time>0"
                      class="get_verification"
                      :class="{right_phone_number:verifyPhone}"
                      @click.prevent="sendSms"
              >{{ time > 0 ? `剩余时间(${time})s` : '获取验证码' }}
              </button>
            </section>
            <section class="login_verification">
              <input v-validate="'required|code'" name="code" v-model="code" type="tel" maxlength="8" placeholder="验证码">
              <span style="color: red" v-show="errors.has('code')"> {{ errors.first('code') }} </span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <!--          一个div是控制用密码登录 两者的显示隐藏通过类名是否有on来控制-->
          <div :class="{on:!isLoginBySms}">
            <section>
              <section class="login_message">
                <input v-validate="'required|name'" v-model="name" name="name" type="tel" maxlength="11"
                       placeholder="手机/邮箱/用户名">
                <span style="color: red" v-show="errors.has('name')"> {{ errors.first('name') }} </span>

              </section>
              <section class="login_verification">
                <input v-validate="'required|pwd'" v-model="pwd" name="pwd" :type="isShowPwd ? 'text' : 'password'"
                       maxlength="8"
                       placeholder="密码">
                <span style="color: red" v-show="errors.has('pwd')"> {{ errors.first('pwd') }} </span>

                <div class="switch_button" :class="isShowPwd ? 'on' : 'off'" @click="isShowPwd = !isShowPwd">
                  <div class="switch_circle" :class="{right:isShowPwd}"></div>
                  <span class="switch_text">{{ isShowPwd ? 'abc' : '' }}</span>
                </div>
              </section>
              <section class="login_message">
                <input v-validate="'required|captcha'" v-model="captcha" name="authCode" type="text" maxlength="11"
                       placeholder="验证码">
                <span style="color: red" v-show="errors.has('captcha')"> {{ errors.first('captcha') }} </span>

                <img @click="changeSrc" class="get_verification" :src="imgSrc" alt="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="submitForm">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script>
import {reqSmsCode} from "@/api/req"
import { MessageBox } from 'mint-ui';
export default {
  name: "Login",
  data() {
    return {
      isLoginBySms: false,
      phone: "",  //双向绑定短信框输入的手机号 进行手机号码的校验
      code: "",
      name: "",
      pwd: "",
      captcha: "",
      isShowPwd: false,   //是否以明文展示密码
      time: 0,  //倒计时的显示时间
      imgSrc: "/api/captcha"
    }
  },
  methods: {

    async submitForm() {  //此方法用于表单统一的验证
      let {isLoginBySms, phone, code, name, pwd, captcha} = this;
      let names = isLoginBySms ? ['mobile', 'code'] : ['name', 'pwd', 'authCode'];
      const success = await this.$validator.validateAll(names);
      if (success) {
        let result;
        //根据登录方式确定是 短信验证码登录还是用户名密码登录
        if (isLoginBySms) {
          result = await this.$API.reqLoginBySms({phone, code})
        } else {
          result = await this.$API.reqLoginByPwd({name, pwd, captcha})
        }
        if (result.code === 0) {
          //表示登录成功  保存用户信息到vuex中 跳转到个人中心页面
          const user = result.data;
          this.$store.dispatch("save_user",user);
          this.$router.replace("/profile");
        } else {
          MessageBox('提示', result.msg);

        }


        this.changeSrc(); //重新刷新验证码
      } else {
        alert("输入的信息有误");
        this.changeSrc(); //重新刷新验证码
      }
    },

    changeSrc() {  //只要调用此方法 就会重新修改图片的src从而达到让图片重新请求的目的

      this.imgSrc = this.imgSrc + '?time=' + Date.now()

    },
    async sendSms() {


      this.time = 5;
      let timer = setInterval(() => {
        this.time--;
        if (this.time <= 0) clearInterval(timer)
      }, 1000);

//发送获取短信
      const result = await reqSmsCode(this.phone);
      if (result.code === 0) {
        alert("发送短信成功")
      } else {
        alert(result.msg)
      }

    }


  },
  computed: {
    verifyPhone() {
      return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"


.loginContainer
  width 100%
  height 100%
  background #fff

  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto

    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center

      .login_header_title
        padding-top 40px
        text-align center

        > a
          color #333
          font-size 14px
          padding-bottom 4px

          &:first-child
            margin-right 40px

          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774

    .login_content
      > form
        > div
          display none

          &.on
            display block

          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial

            &:focus
              border 1px solid #02a774

          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff

            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent

            .right_phone_number
              color black

          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff

            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s, border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)

              &.off
                background #fff

                .switch_text
                  float right
                  color #ddd

              &.on
                background #02a774

              > .switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                transition transform .3s

                &.right
                  transform translateX(27px)

          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px

            > a
              color #02a774

        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0

      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999

    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px

      > .iconfont
        font-size 20px
        color #999

</style>