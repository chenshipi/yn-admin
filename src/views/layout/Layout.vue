<template>
  <!-- <div class="app-wrapper"> -->
  <el-container>
    <el-header>
      <app-head></app-head>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <sidebar></sidebar>
      </el-aside>
      <el-main>
        <div class="main-top">
          <yn-breadcrumb></yn-breadcrumb>
        </div>
        <div class="main-conent">
          <app-main></app-main>
        </div>
      </el-main>
    </el-container>
  </el-container>
  <!-- </div> -->
</template>

<script>
import { AppHead, Sidebar, AppMain } from "./components";
import YnBreadcrumb from "@/components/yn-breadcrumb";
export default {
  name: "Layout",
  components: {
    AppHead,
    Sidebar,
    AppMain,
    YnBreadcrumb
  },
  mounted() {
    // console.log(this.$route)
  },
  watch: {
    $route() {
      console.log(this.$route);
    }
  }
};
</script>

<style>
.el-header {
  border-bottom: 1px solid #eee;
  background: #fff;
}
.el-aside {
  background: #e4e7ed;
}
.el-main {
  overflow: hidden;
  padding: 0;
}
.main-top {
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  background: #fff;
}
.main-conent {
  text-align: center;
  /* height = 100vh - 60px - .main-conent上边元素的高度 */
  height: calc(100vh - 60px - 32px);
  padding: 20px;
  overflow: auto;
  position: relative;
}
</style>
