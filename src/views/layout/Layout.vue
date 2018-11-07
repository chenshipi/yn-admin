<template>
  <!-- <div class="app-wrapper"> -->
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside>
        <sidebar></sidebar>
      </el-aside>
      <el-main>
        <div class="main-top">面包屑位置</div>
        <div class="main-conent">
          <app-main></app-main>
        </div>
      </el-main>
    </el-container>
  </el-container>
  <!-- </div> -->
</template>

<script>
import { Sidebar, AppMain } from './components';
export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain
  }
}
</script>

<style lang="scss">
.el-header {
  border-bottom: 1px solid #eee;
  background: #dcdfe6;
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
  background: #c0c4cc;
}
.main-conent {
  text-align: center;
  // height = 100vh - 60px - .main-conent上边元素的高度
  height: calc(100vh - 60px - 32px);
  padding: 20px;
  overflow: auto;
  position: relative;
}
</style>
