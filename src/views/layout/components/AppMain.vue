<template>
  <div class="app-main">
    <transition>
      <keep-alive :include="include">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    include () {
      return []
    },
    key () {
      return this.$route.fullPath
    }
  }
}
</script>

<style>
.app-main {
  min-height: 100%;
  padding: 20px;
  /* height: 200%; */
  background-color: #fff;
}
</style>
