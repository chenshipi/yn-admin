<template>
  <div>
    <yn-draggable :data="topicList" @getdata="getdata" @datadragEnd="datadragEnd">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleClick(scope.data)">编辑</el-button>
        <el-button size="mini">删除</el-button>
      </template>
    </yn-draggable>
    <!-- 添加新题目 -->
    <div v-if="addTopic">
      <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="92px" size="mini">
        <el-form-item label="问题：" prop="topic">
          <el-row>
            <el-col :xs="19" :sm="20" :md="20" :lg="21" :xl="22">
              <el-input type="textarea" placeholder="请输入问题内容，最大字数为500字" maxlength="500" v-model="dataForm.topic"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :before-upload="beforeAvatarUpload" :limit="3" :on-exceed="handleExceed" :file-list="fileList">
                <el-button type="text"> 上传图片（选填）</el-button>
              </el-upload>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item v-for="(item,idx) in dataForm.answers" :key="idx" :label="`选项${alphabet[idx]}：`" :prop="'answers.' + idx + '.answer'" :rules="{required: true, message: '请输入选项内容', trigger: 'blur'}">
          <el-row>
            <el-col :xs="19" :sm="20" :md="20" :lg="21" :xl="22">
              <el-input placeholder="请输入选项内容，最大字数为200字" v-model="item.answer"></el-input>
              <!-- style="width: calc(100% - 110px);" -->
            </el-col>
            <el-col :xs="5" :sm="4" :md="4" :lg="3" :xl="2">
              <el-button type="text" icon="el-icon-circle-plus" @click.prevent="addOption" v-if="idx == dataForm.answers.length -1">增加</el-button>
              <el-button type="text" class="btn_remove" icon="el-icon-remove" @click.prevent="delOption(idx)" v-if="idx > 1">删除</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :before-upload="beforeAvatarUpload" :limit="3" :on-exceed="handleExceed" :file-list="fileList">
                <el-button type="text"> 上传图片（选填）</el-button>
              </el-upload>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="正确答案：" prop="rightAnswer">
          <el-row>
            <el-col :span="22">
              <el-select v-model='dataForm.rightAnswer' class="w_124" placeholder="请选择">
                <el-option v-for="(item, idx) in dataForm.answers" :key="idx" :label="alphabet[idx]" :value="alphabet[idx]">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="解析：">
          <el-row>
            <el-col :xs="19" :sm="20" :md="20" :lg="21" :xl="22">
              <el-input type="textarea" placeholder="请输入问题解析，最大字数为500字" maxlength="500" v-model="dataForm.mark"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('dataForm')">确定添加</el-button>
          <el-button @click="addTopic = false" :disabled="!topicList.length > 0">取消</el-button>
          <!-- <el-button>删除</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="btn pd-20">
      <el-button type="primary" size="small">完 成</el-button>
      <el-button size="small" :disabled="addTopic" @click="addTopic = true">新增题目</el-button>
      <el-button size="small">批量导入</el-button>
      <el-button size="small" @click="setData">预 览</el-button>
      <el-button size="small" @click="$router.go(-1)">取 消</el-button>
    </div>
  </div>
</template>

<script>
import YnDraggable from '@/components/yn-draggable';
import mixin from '@/config/mixin';
export default {
  components: {
    [YnDraggable.name]: YnDraggable
  },
  mixins: [mixin],
  data () {
    return {
      dataForm: {
        topic: '',
        img: '',
        answers: [{ answer: '' }, { answer: '' }, { answer: '' }],
        rightAnswer: '',
        mark: ''
      },
      // 表单校验规则
      rules: {
        topic: [{ required: true, message: '请输问题内容', trigger: 'blur' }],
        rightAnswer: [
          { required: true, message: '请选择正确答案', trigger: 'change' }
        ]
      },
      addTopic: true,
      fileList: [],
      topicList: [],
      topicList1: [
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
          rightAnswer: 'A',
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
          rightAnswer: 'B',
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
      ]
    };
  },
  mounted () {},
  methods: {
    // 拖拽插件方法
    getdata (evt) {
      // console.log(evt.draggedContext.element.topic);
    },
    datadragEnd (list) {
      console.log(list);
    },
    // 模拟
    setData () {
      console.log('=>');
      this.topicList = this.topicList1;
    },
    // 添加选项
    addOption () {
      this.dataForm.answers.push({ answer: '' });
    },
    // 移除选项
    delOption (index) {
      this.dataForm.answers.splice(index, 1);
    },
    // 上传相关方法
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    beforeAvatarUpload (file) {
      const isType = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isType) {
        this.$message.error('图片只能上传 JPG、PNG 格式!');
      }
      return isType;
    },
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove (file, fileList) {
      // return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleClick (value) {
      console.log(value);
    },
    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style lang='scss'>
// 删除按钮样式覆盖
.btn_remove {
  color: #f56c6c;
  &:hover,
  &:active,
  &:focus {
    color: #f56c6c;
  }
}
.btn > button {
  width: 124px;
}
.pd-20 {
  padding: 20px;
}
</style>
