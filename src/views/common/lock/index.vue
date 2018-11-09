<template>
  <div class="lock-container">
    <div class="lock-form">
      <el-input placeholder="请输入登录密码"
                type="password"
                v-model="passwd"
                @keyup.enter.native="handleLogin">
        <el-button slot="append"
                   icon="icon-jiesuo"
                   @click="handleLogin"></el-button>
        <el-button slot="append"
                   icon="icon-tuichu"
                   @click="handleLogout"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      passwd: ''
    }
  },
  computed: {
    ...mapGetters(['lockPasswd'])
  },
  methods: {
    handleLogin () {
      if (this.passwd !== this['lockPasswd']) {
        this.passwd = '';
        this.$message.error('解锁密码错误,请重新输入')
        return;
      }
      setTimeout(() => {
        this.$router.push('/')
      }, 1000)
    },
    handleLogout () {
      this.$confirm('是否退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$router.push('/login')
        })
        .catch(() => {
          return false
        })
    }
  }
}
</script>

<style>
.lock-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.lock-container::before {
  z-index: -999;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("../../../assets/images/lockLogin.png");
  background-size: cover;
}
</style>
