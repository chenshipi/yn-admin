<template>
  <div class="sidebar-wrapper"
       :class="{collapse: isCollapse}">
    <el-menu class="el-menu-sidebar"
             background-color="#2f353a"
             text-color="#fff"
             active-text-color="#20A8D8"
             :unique-opened="true"
             :router="true"
             @select="selectChange"
             :collapse="isCollapse"
             :default-active="$route.matched[1].path">
      <!-- :default-active="$route.path" -->
      <template v-for="route in routes">
        <el-submenu v-if="route.children && route.children.length > 0"
                    :key="route.path"
                    :index="route.path">
          <template slot="title">
            <i :class="route.meta.icon"></i>
            <span>{{route.meta.title}}</span>
          </template>
          <el-menu-item v-for="item in route.children"
                        :key="item.path"
                        :index="`${route.path}/${item.path}`">{{item.meta.title}}</el-menu-item>
        </el-submenu>
        <el-menu-item :key="route.path"
                      :index="route.path"
                      v-else>
          <i :class="route.meta.icon"></i>
          <span slot="title">{{route.meta.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Sidebar",
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapGetters(["sidebar", "device"]),
    isCollapse() {
      return !this.sidebar.opened;
    },
    routes() {
      var res = [];
      this.$router.options.routes.forEach(item => {
        if (!item.hidden) {
          if (item.path === "/") {
            res.push(item.children[0]);
          } else {
            res.push(item);
          }
        }
      });
      return res;
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    selectChange() {
      if (this.device === "mobile") this.toggleSideBar();
    }
  }
};
</script>

<style>
.sidebar-wrapper {
  height: 100%;
  background-color: #262a2e;
  /* border-right: solid 1px #e6e6e6; */
}
.el-menu-sidebar {
  border-right: 0 none;
}
.el-menu-sidebar:not(.el-menu--collapse) {
  width: 200px;
}
.el-submenu .el-menu-item {
  background: #262a2e !important;
}

/* 修改icon样式 */
.el-submenu__title i:nth-child(1),
.el-menu-item i {
  color: #fff;
}

/* hover样式修改 */
.el-submenu__title:hover,
.el-menu-item:hover {
  color: #fff !important;
  background-color: #20a8d8 !important;
}
.el-submenu__title:hover i {
  color: #fff !important;
}

/* 修改收起样式 */
.el-menu--collapse {
  width: 36px;
}
.el-menu--collapse .el-menu-item,
.el-menu--collapse .el-tooltip,
.el-menu--collapse .el-submenu__title {
  padding: 0 !important;
  text-align: center;
}

.mobile .sidebar-wrapper {
  position: fixed;
  z-index: 999;
  top: 0;
}
.mobile .sidebar-wrapper.collapse {
  margin-left: -36px;
  transition: margin-left 0.1s linear 0.28s;
}
</style>
