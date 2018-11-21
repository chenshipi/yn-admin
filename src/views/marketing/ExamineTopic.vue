<template>
  <div>
    <el-button class="return-btn" size="mini" icon="el-icon-d-arrow-left" @click="$router.go(-1)">返 回</el-button>
    <yn-draggable :data="topicList" :disabled="true" @getdata="getdata" @datadragEnd="datadragEnd">
      <!-- <template slot-scope="scope">
        <el-button size="mini"
                   @click="handleClick(scope.data)">编辑</el-button>
        <el-button size="mini">删除</el-button>
      </template> -->
    </yn-draggable>
  </div>
</template>

<script>
import YnDraggable from '@/components/yn-draggable';
export default {
  components: {
    YnDraggable
  },
  data () {
    return {
      topicList: [
        {
          id: 1,
          topic:
            '题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容（）',
          img: 'static/u639.png',
          answers: [
            {
              option: 'A',
              answer:
                '选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容',
              img: 'static/u639.png'
            },
            {
              option: 'B',
              answer:
                '选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容',
              img: 'static/u639.png'
            },
            {
              option: 'C',
              answer:
                '选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容',
              img: null
            },
            {
              option: 'D',
              answer:
                '选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容',
              img: null
            }
          ],
          rightAnswerr: 'A',
          mark:
            '答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析'
        },
        {
          id: 2,
          topic:
            '题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容（）',
          answers: [
            {
              option: 'A',
              answer:
                '选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容',
              img: null
            },
            {
              option: 'B',
              answer:
                '选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容',
              img: null
            },
            {
              option: 'C',
              answer:
                '选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容',
              img: null
            },
            {
              option: 'D',
              answer:
                '选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容',
              img: null
            }
          ],
          rightAnswerr: 'B',
          mark:
            '答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析'
        },
        {
          id: 3,
          topic:
            '题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容题目内容（）',
          answers: [
            {
              option: 'A',
              answer:
                '选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容',
              img: null
            },
            {
              option: 'B',
              answer:
                '选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容',
              img: null
            },
            {
              option: 'C',
              answer:
                '选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容',
              img: null
            },
            {
              option: 'D',
              answer:
                '选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容选项内容',
              img: null
            }
          ],
          rightAnswer: 'C',
          mark:
            '答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解析'
        }
      ],
      topicList1: [
        {
          title: '1题~~~~~~~~~~~~~~~~~~~~~~~~',
          imgurl: 'static/u639.png',
          options: [
            { option: 'A', answer: '@/components/YnDraggable' },
            { option: 'B', answer: '@click="handleClick(scope.data)' },
            { option: 'C', answer: '~~~~~~~~~' },
            { option: 'D', answer: '=>==>>===>>>' }
          ],
          rightAnswer: 'A',
          mark: '答案解析答案解析答案解析答案解析答案解析答案解析答案解析答案解'
        }
      ],
      // 组件数据的键
      props: {
        topic: 'title',
        image: 'imgurl',
        options: 'options',
        option: 'option',
        answer: 'answer',
        rightAnswer: 'rightAnswer',
        mark: 'mark'
      }
    };
  },
  mounted () {
    console.log(this.$route.query.id);
  },
  methods: {
    getdata (val) {
      // console.log(val);
    },
    datadragEnd (val) {
      // console.log("==>>", val);
    },
    handleClick (item) {
      console.log(item);
    }
  }
};
</script>

<style lang='scss'>
</style>
