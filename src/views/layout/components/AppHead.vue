<template>
  <div class="app-head">
    <div class="yn-flex">
      <img src="../../../assets/logo.svg"
           alt="">
      <!-- 侧边栏按钮 -->
      <yn-sidebar-switch></yn-sidebar-switch>
    </div>
    <div class="btns">
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
      <!-- 锁屏按钮 -->
      <yn-lock-switch></yn-lock-switch>
      <el-tooltip effect="dark"
                  content="退出登录"
                  placement="bottom-end">
        <i class="icon-tuichu"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import YnSidebarSwitch from "@/components/yn-sidebar-switch";
import YnLockSwitch from "@/components/yn-lock-switch";
import { mapGetters } from "vuex";
export default {
  name: "AppHead",
  components: {
    YnSidebarSwitch,
    YnLockSwitch
  },
  computed: {
    ...mapGetters(["sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  methods: {
    handleCommand(command) {
      console.log(command);
      // 这里调用store更改语言设置
      // this.$store.dispatch('setLanguage', command)
    }
  }
};
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
}
</style>
