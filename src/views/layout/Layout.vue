<template>
  <!-- <div class="app-wrapper"> -->
  <el-container :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened"
         class="drawer-bg"
         @click="toggleSideBar"></div>
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
import { mapGetters } from "vuex";
import { AppHead, Sidebar, AppMain } from "./components";
import YnBreadcrumb from "@/components/yn-breadcrumb";
import ResizeMixin from "./mixin/ResizeHandler";
export default {
  name: "Layout",
  mixins: [ResizeMixin],
  components: {
    AppHead,
    Sidebar,
    AppMain,
    YnBreadcrumb
  },
  computed: {
    ...mapGetters(["sidebar", "device"]),
    classObj() {
      return {
        mobile: this.device === "mobile"
      };
    }
  },
  mounted() {
    console.log(this.classObj);
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    }
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
  border-bottom: 1px solid #eee;
}
.main-conent {
  text-align: center;
  /* height = 100vh - 60px - .main-conent上边元素的高度 */
  height: calc(100vh - 60px - 32px);
  padding: 20px;
  overflow: auto;
  position: relative;
}
.mobile .main-conent {
  padding: 0;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 990;
}
</style>
