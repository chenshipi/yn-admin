<template>
  <i class="yn-sidebar-switch"
     :style="{'font-size':size+'px'}"
     :class="[icon, { 'yn-sidebar-shrink':isCollapse }]"
     @click="toggleClick"></i>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'YnSidebarSwitch',
  props: {
    icon: {
      type: String,
      default: 'icon-caidan'
    },
    size: String
  },
  computed: {
    ...mapGetters(['sidebar']),
    isCollapse () {
      return !this.sidebar.opened;
    }
  },
  methods: {
    toggleClick () {
      this.$store.dispatch('ToggleSideBar');
    }
  }
};
</script>

<style>
.yn-sidebar-switch {
  cursor: pointer;
  color: #909399;
  font-size: 27px;
  line-height: 60px;
  /* transform: rotate(0deg); */
  transition: transform 0.25s;
}
.yn-sidebar-shrink {
  -webkit-transform: rotate(90deg);
  /* Chrome, Opera 15+, Safari 3.1+ */
  -ms-transform: rotate(90deg);
  /* IE 9 */
  transform: rotate(90deg);
  /* Firefox 16+, IE 10+, Opera */
}
</style>
