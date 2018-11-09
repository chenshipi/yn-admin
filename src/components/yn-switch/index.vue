<template>
  <div>
    <el-button :plain="plain"
               :round="round"
               :circle="circle"
               :size="size"
               :type="type"
               :icon="icon"
               @click="switchClick"></el-button>
  </div>
</template>

<script>
export default {
  name: 'YnSwitch',
  props: {
    plain: Boolean,
    round: Boolean,
    circle: Boolean,
    type: String,
    size: String,
    icon: {
      typt: String,
      default: 'el-icon-d-arrow-right'
    },
    switchClick: {
      typt: Function,
      default: null
    }
  }
}
</script>
