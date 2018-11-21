<template>
  <div class="yn-admin-login">
    <div :class="['login-form', {mobile:isMobile}]">
      <h4>社区后台管理系统</h4>
      <el-form ref="loginForm"
               :model="loginForm"
               status-icon
               :rules="rules">
        <el-form-item prop="username">
          <el-input placeholder="请输入手机号"
                    v-model="loginForm.username"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input type="password"
                    placeholder="请输入密码"
                    v-model="loginForm.pwd"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="staticCode">
          <el-input placeholder="请输入图形验证码"
                    v-model="loginForm.staticCode"
                    auto-complete="off">
            <template slot="append">ABCD</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="msgCode">
          <el-input placeholder="请输入手机验证码"
                    v-model="loginForm.msgCode"
                    auto-complete="off">
            <el-button slot="append"
                       class="msg-text"
                       :class="{disabled:msgKey}"
                       @click="handleSend">{{msgKey ? `${msgTime}秒后重发` : msgText}}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="login"
                     style="width: 100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    var validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else {
        callback();
      }
    };
    var validatepassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入登录密码'));
      } else {
        var plen = this.loginForm.pwd.length;
        if (plen < 6 || plen > 18) {
          callback(new Error('登录密码为6-18位'));
        }
        callback();
      }
    };
    var validatestaticCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入短信验证码'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '15061571315',
        pwd: '',
        staticCode: '',
        msgCode: ''
      },
      rules: {
        username: [{ validator: validateUserName, trigger: 'blur' }],
        pwd: [{ validator: validatepassword, trigger: 'blur' }],
        staticCode: [{ validator: validatestaticCode, trigger: 'blur' }],
        msgCode: [{ validator: validateCode, trigger: 'blur' }]
      },
      msgText: '获取验证码',
      msgTime: 60,
      msgKey: false
    };
  },
  computed: {
    ...mapGetters(['device']),
    isMobile () {
      return this.device === 'mobile';
    }
  },
  methods: {
    handleSend () {
      if (this.msgKey) return;
      this.msgKey = true;
      const time = setInterval(() => {
        this.msgTime--;
        if (this.msgTime === 0) {
          this.msgKey = false;
          this.msgTime = 60;
          clearInterval(time);
        }
      }, 1000);
    },
    login () {
      this.$refs.loginForm.validate(value => {
        if (value) {
          // console.log(this.$http);
          this.$http
            .login({
              nationCode: '',
              pageNum: 1,
              pageSize: 10,
              searchKeyWordType: 0,
              searchKeyWordValue: ''
            })
            .then(res => {
              console.log(res);
            });
          // alert("submit!");
        } else {
          // console.log("error submit!!");
          // return false;
          this.$http
            .login({
              nationCode: '',
              pageNum: 1,
              pageSize: 10,
              searchKeyWordType: 0,
              searchKeyWordValue: ''
            })
            .then(res => {});
        }
      });
    }
  }
};
</script>

<style>
.yn-admin-login:before {
  z-index: -999;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/lockLogin.png");
  background-size: cover;
}
.login-form {
  position: fixed;
  right: 15%;
  top: 50%;
  padding: 20px 35px;
  background-color: #fff;
  border-radius: 6px;
  transform: translateY(-50%);
}
.login-form h4 {
  font-size: 20px;
  padding-bottom: 15px;
  color: #409eff;
  text-align: center;
  margin-top: 0;
  letter-spacing: 4px;
}
.msg-text {
  width: 112px;
}
.el-input-group__append .msg-text.disabled {
  color: #ccc;
}
</style>
