<template>
  <el-breadcrumb class="app-breadcrumb"
                 :separator-class="separator">
    <!-- <transition> -->
    <el-breadcrumb-item v-for="(item, index) in levelList"
                        :key="index"
                        :to="item.path">{{item.meta.title}}</el-breadcrumb-item>
    <!-- </transition> -->
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'YnBreadcrumb',
  props: {
    separator: String
  },
  data () {
    return {
      levelList: null
    };
  },
  created () {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => {
        if (item.meta && item.meta.title) {
          return item;
        }
      });
      this.levelList = matched;
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb();
    }
  }
};
</script>

<style>
.app-breadcrumb {
  height: 100%;
  line-height: inherit;
}
</style>
