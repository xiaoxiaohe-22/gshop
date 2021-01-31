import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'



Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh_CN', {
    messages: zh_CN.messages,
    attributes: {
        phone: '手机号',
        code: '验证码',
        mobile:"手机号码",
        pwd:"密码",
        name:"用户名",
        authCode:"验证码"
    }
})

//扩展的手机号
VeeValidate.Validator.extend('mobile', {
    validate: value => {
        return /^1\d{10}$/.test(value)
    },
    getMessage: field => field + '必须是11位手机号码'
})
// 扩展的验证码
VeeValidate.Validator.extend('code', {
    messages: {
        zh_CN: field => '验证码格式不正确'
    },
    validate: value => {
        return /^\d{6}$/.test(value)
    }
})
// 扩展的密码
VeeValidate.Validator.extend('pwd', {
    messages: {
        zh_CN: field => '密码格式不正确'
    },
    validate: value => {
        return /^\S{6,18}$/.test(value)
    }
})

// 扩展d的用户名
VeeValidate.Validator.extend('name', {
    messages: {
        zh_CN: field => '用户名格式不正确'
    },
    validate: value => {
        return /^[\u4e00-\u9fa5A-Za-z0-9]*$/.test(value)
    }
})
// 扩展图形验证码
VeeValidate.Validator.extend('captcha', {
    messages: {
        zh_CN: field => '验证码必须是四位字母和数字组成'
    },
    validate: value => {
        return /^[a-z0-9]{4}$/i.test(value)
    }
})
