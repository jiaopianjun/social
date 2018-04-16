<template>
  <div class="LoginPop" id="LoginPop" v-show="ispop">
    <div class="LoginPop_outer">
      <i class="LoginPop_cancle" @click="closepop"></i>
      <div class="LoginPop_title"><img src="http://www.iplaystone.com/static/common/images/loginPic.png"/></div>
      <div class="LoginPop_input"><input id="LoginPop_userName" placeholder="电子邮箱/手机号" />
        <i class="LoginPop_icon LoginPop_user"></i>
        <div class="LoginPop_error"></div>
      </div>
      <div class="LoginPop_input"><input type="password" id="LoginPop_pwd" placeholder="密码" />
        <i class="LoginPop_icon LoginPop_pwd"></i>
        <div class="LoginPop_error"></div>
      </div>
      <div class="LoginPop_btn"><button id="LoginPop_submit" @click="login">登录</button></div>
      <div class="LoginPop_box"><a href="http://www.iplaystone.com/static/web/resetPwd.html" class="LoginPop_forget">忘记密码?</a><span></span><a href="http://www.iplaystone.com/static/web/register.html" target="_blank" class="LoginPop_register">立即注册</a></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginPop',
  data: function () {
    return {
      ispop: false
    }
  },
  methods: {
    login: function () {
      this.showMoreMyCircle = false
    },
    closepop: function () {
      this.ispop = false
    }
  },
  created: function () {
    var vm = this
    vm.$http({
      url: '//moment.snail.com/api/v1/user/info',
      method: 'jsonp',
      jsonp: 'callback',
      emulateJSON: true,
      headers: {
        'Content-Type': 'x-www-from-urlencoded'
      }
    }).then(function (res) {
      if (res.data.code === 200) {
        this.info = res.data.info
        this.isLogin = true
      }
    })
    vm.$http({
      url: '//moment.snail.com/api/v1/user/my-circles',
      method: 'jsonp',
      jsonp: 'callback',
      emulateJSON: true,
      headers: {
        'Content-Type': 'x-www-from-urlencoded'
      }
    }).then(function (res) {
      if (res.data.code === 200) {
        this.myCircleListDetail = res.data.list
      }
    })
  }
}
</script>
<style scoped>
  @import '../sass/stylesheets/LoginPop.css'
</style>