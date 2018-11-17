<template>
  <draggable class="yn-draggable"
             v-model="renderData"
             :options="{disabled: disabled}"
             :move="getdata"
             @update="datadragEnd">
    <!-- <transition-group> -->
    <div class="yn-item"
         v-for="(element,index) in renderData"
         :key="index">
      <div class="yn-item-conent">
        <div class="yn-sort">{{index+1}}.</div>
        <div class="yn-conent yn-flex-1">
          <div class="yn-topic">
            <p class="text">{{element[label.topic]}}</p>
            <img v-if="element[label.image]"
                 :src="element[label.image]">
          </div>
          <div class="yn-answer">
            <div class="yn-answer-option yn-col yn-flex-1"
                 v-for="item in element[label.options]"
                 :key="item[label.option]">
              <div class="option">{{item[label.option]}}</div>
              <div class="yn-answer-conent">
                <p>{{item[label.answer]}}</p>
                <img v-if="item[label.image]"
                     :src="item[label.image]">
              </div>
            </div>
          </div>
          <div class="yn-right-answer">正确答案：<span>{{element[label.rightAnswer]}}</span></div>
          <div class="yn-analysis yn-col">
            <span>解析：</span>
            <span class="yn-mark yn-flex-1">{{element[label.mark]}}</span>
          </div>
        </div>
        <slot :data="element"></slot>
        <!-- <div class="line-between"></div> -->
      </div>
    </div>
    <!-- </transition-group> -->
    <slot name="slot-footer"
          slot="footer"></slot>
  </draggable>
</template>

<script>
var copy = value => JSON.parse(JSON.stringify(value));
export default {
  name: 'YnDraggable',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    label: {
      type: Object,
      default: () => ({
        topic: 'topic',
        image: 'img',
        options: 'answers',
        option: 'option',
        answer: 'answer',
        rightAnswer: 'rightAnswer',
        mark: 'mark'
      })
    },
    disabled: Boolean
  },
  data () {
    return {
      renderData: []
    };
  },
  created () {
    this.getChange();
  },
  methods: {
    getChange () {
      this.renderData = copy(this.data);
    },
    // 拖拽插件方法
    getdata (evt) {
      this.$emit('getdata', evt);
      // console.log(evt.draggedContext.element.topic);
    },
    datadragEnd (evt) {
      this.$emit('datadragEnd', this.renderData);
      // console.log("拖动前的索引 :" + evt.oldIndex);
      // console.log("拖动后的索引 :" + evt.newIndex);
    }
  },
  watch: {
    data (newValue, oldValue) {
      // console.log(newValue, oldValue);
      this.getChange();
    }
  }
};
</script>

<style scoped>
.yn-col {
  display: flex;
}
.yn-flex-1 {
  flex: 1;
}
.yn-item {
  border-bottom: 4px solid #eee;
  color: #606266;
  padding: 20px 5px;
}
.yn-item:nth-child(1) {
  padding-top: 0;
}
/* .yn-item:last-child {
  border: 0 none;
} */
.yn-item-conent {
  max-width: 1100px;
}
.yn-rou {
  text-align: center;
  border: 1px solid #666;
  border-radius: 50%;
  margin-right: 20px;
}
.yn-sort {
  float: left;
  width: 27px;
  height: 27px;
  line-height: 27px;
  font-size: 25px;
  font-weight: 700;
  color: #409eff;
  /* color :#606266; */
}
.yn-conent {
  overflow: hidden;
  margin-bottom: 15px;
}
.yn-topic .text {
  line-height: 20px;
}
.yn-item img {
  margin: 15px 0;
}
.yn-answer {
  margin-bottom: 10px;
}
.yn-answer-option {
  line-height: 22px;
  padding: 10px 0;
}
.option {
  width: 22px;
  height: 22px;
  line-height: 22px;
}
.yn-right-answer {
  line-height: 32px;
}
.yn-analysis {
  line-height: 22px;
}
.yn-mark {
  color: #ccc;
}
.line-between {
  border-bottom: 4px solid #eee;
}
</style>
