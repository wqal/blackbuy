<template>
  <div class="login">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/login.html">会员登录</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit">
            <a
              class="selected"
              href="javascript:;"
            >账户登录</a>
            <i>|</i>
            <a href="/register.html">免费注册</a>
          </div>

          <div
            id="loginform"
            name="loginform"
            class="login-box"
          >
            <div class="input-box">
              <input
                id="txtuser_name"
                name="txtuser_name"
                type="text"
                placeholder="用户名/手机/邮箱"
                maxlength="50"
                v-model="user_name"
                v-focus
              >
            </div>
            <div class="input-box">
              <input
                id="txtpassword"
                name="txtpassword"
                type="password"
                placeholder="输入登录密码"
                maxlength="16"
                v-model="password"
              >
            </div>
            <div class="btn-box">
              <input
                id="btnSubmit"
                name="btnSubmit"
                type="submit"
                value="立即登录"
                @click="login"
              >
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "login",
  data: function() {
    return {
      user_name: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (this.user_name == "" || this.password == "") {
        this.$Message.warning("不能为空");
      } else {
        this.$axios
          .post(`site/account/login`, {
            user_name: this.user_name,
            password: this.password
          })
          .then(res => {
            console.log(res);
            if (res.data.status === 0) {
              // 登陆成功
              this.$message.success(res.data.message);
              this.$store.commit("changeLogin", true);
              this.$router.go(-1);
            } else {
              //登陆失败
              this.$message.error(res.data.message);
            }
          });
      }
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>

<style >
</style>