<template>
  <div class="app-head">
    <div class="yn-flex">
      <img src="../../../assets/logo.svg"
           alt="">
      <i class="icon-caidan"
         :class="{shrink:isCollapse}"
         @click="toggleClick"></i>
    </div>
    <div class="btns">
      <!-- <el-button icon="icon-lvzhou_yuyanqiehuan"></el-button> -->
      <!-- <el-button type="text"
                 icon="icon-toggle-language"></el-button>
      <el-button type="text"
                 size=""
                 icon="icon-tuichu"></el-button> -->
      <el-dropdown @command="handleCommand"
                   size="medium">
        <span class="el-dropdown-link">
          <i class="icon-zhongyingwenqiehuan"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh">中文</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <el-tooltip effect="dark"
                  content="锁屏"
                  placement="bottom">
        <i class="icon-suo"></i>
      </el-tooltip> -->
      <yn-top-lock></yn-top-lock>
      <el-tooltip effect="dark"
                  content="退出登录"
                  placement="bottom-end">
        <i class="icon-tuichu"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import YnTopLock from '@/components/yn-top-lock';
import { mapGetters } from 'vuex';
export default {
  name: 'AppHead',
  components: {
    YnTopLock
  },
  computed: {
    ...mapGetters(['sidebar']),
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  methods: {
    toggleClick () {
      this.$store.dispatch('ToggleSideBar')
    },
    handleCommand (command) {
      console.log(command)
      // 这里调用store更改语言设置
      // this.$store.dispatch('setLanguage', command)
    }
  }
}
</script>

<style lang="scss">
.app-head {
  display: flex;
  justify-content: space-between;
  height: 100%;
  div:nth-child(1) img {
    height: 35px;
    margin: 12px 10px 0 0;
  }
  .btns {
    padding-top: 22px;
    i {
      cursor: pointer;
      color: #5a5e66;
      font-size: 22px;
      margin: 0 8px;
    }
  }

  .yn-flex {
    display: flex;
  }
  .icon-caidan {
    cursor: pointer;
    color: #909399;
    font-size: 27px;
    line-height: 60px;
    // transform: rotate(0deg);
    transition: transform 0.25s;
  }
  .shrink {
    -webkit-transform: rotate(90deg);
    /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(90deg);
    /* IE 9 */
    transform: rotate(90deg);
    /* Firefox 16+, IE 10+, Opera */
  }
}
</style>
