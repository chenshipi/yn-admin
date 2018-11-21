<template>
  <div class='mian_container'>
    <el-button class="return-btn"
               size="mini"
               icon="el-icon-d-arrow-left"
               @click="$router.go(-1)">返回协议管理列表</el-button>
    <el-form ref="dataForm"
             :model="dataForm"
             :rules="rules"
             size="mini"
             label-width="100px">
      <el-form-item label="活动名称："
                    prop="name">
        <el-input v-model="dataForm.name"
                  placeholder="请输入活动名称，最大字数20个字符"
                  maxlength="20"
                  clearable></el-input>
      </el-form-item>
      <el-form-item label="活动时间："
                    prop="time">
        <!-- <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.date1"></el-date-picker>
                    <span>至</span>
                    <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.date1"></el-date-picker> -->
        <el-date-picker v-model="dataForm.time"
                        value-format="yyyy-MM-dd"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动链接："
                    prop="link">
        <el-input v-model="dataForm.link"
                  placeholder="请输入Banner图后跳转的链接"
                  clearable></el-input>
      </el-form-item>
      <el-form-item label="活动奖池："
                    prop="jackpot">
        <el-input class="w-400"
                  v-model="dataForm.jackpot"
                  placeholder="请输入活动总奖励"
                  clearable></el-input>
        <el-select class="w-100"
                   v-model='dataForm.currency'
                   placeholder="请选择">
          <el-option v-for="item in currencyType"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="每题奖励："
                    prop="award">
        <el-input class="w-400"
                  v-model="dataForm.award"
                  placeholder="请输入每答对一题奖励数量，奖励类型以奖池类型为准"
                  clearable></el-input>
        <!-- <el-select class="w_100"
                   v-model='dataForm.currency'
                   placeholder="请选择">
          <el-option v-for="item in currencyType"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item label="活动题库："
                    prop="topic">
        <span v-if="dataForm.topic == 0">
          <el-button icon="el-icon-plus"
                     @click="addTopic">添加题目</el-button>
        </span>
        <span v-else>
          <span>{{dataForm.topic}}题</span>
          <el-button type="text"
                     @click="addTopic">修改</el-button>
        </span>
      </el-form-item>
      <el-form-item label="活动规则："
                    prop="rule">
        <wang-editor :content="null"
                     :border-color="wangEditorColor"
                     :uploadUrl="uploadUrl"
                     @pushData="pushData">
        </wang-editor>
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button type="primary"
                 @click="submitForm('dataForm')">发 布</el-button>
      <el-button @click="">预 览</el-button>
      <el-button @click="">保存草稿</el-button>
      <el-button @click="$router.go(-1)">取 消</el-button>
    </div>
    <p><br></p>
    <p><br></p>
    <p><br></p>
    <p><img></p>
  </div>
  <!-- </div> -->
</template>

<script>
import mixin from '@/config/mixin';
export default {
  mixins: [mixin],
  data () {
    // topic校验
    var topicTest = (rule, value, callback) => {
      if (this.dataForm.topic > 0) {
        callback();
      } else {
        callback(new Error('请设置活动题库'));
      }
    };
    // edit校验
    var wangEditorTest = (rule, value, callback) => {
      let re = new RegExp(/^(<p><br><\/p>){1,}$/);
      if (this.dataForm.rule !== '' && !re.test(this.dataForm.rule)) {
        callback();
        this.wangEditorColor = '#67c23a';
      } else {
        callback(new Error('请输入活动规则'));
        this.wangEditorColor = '#f56c6c';
      }
    };
    return {
      dataForm: {
        name: '',
        time: '',
        link: '',
        jackpot: '',
        currency: 0,
        award: '',
        topic: 5,
        rule: ''
      },
      // 表单校验规则
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        time: [{ required: true, message: '请选择活动时间', trigger: 'blur' }],
        link: [{ required: true, message: '请输入活动链接', trigger: 'blur' }],
        jackpot: [
          { required: true, message: '请输入活动奖池', trigger: 'blur' }
        ],
        award: [{ required: true, message: '请输入每题奖励', trigger: 'blur' }],
        topic: [{ required: true, validator: topicTest, trigger: 'blur' }],
        rule: [{ required: true, validator: wangEditorTest, trigger: 'blur' }]
      },
      // 副文本部分内容
      wangEditorColor: '',
      uploadUrl: '/adminApi/fileUpload/uploadImage?isThumb=0'
    };
  },
  mounted () {},
  methods: {
    addTopic () {
      this.$router.push({ name: 'AddTopic' });
    },
    // 副文本回调
    pushData (value) {
      this.dataForm.rule = value;
      this.$refs.dataForm.validateField('rule');
    },
    // 提交表单(发布)
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          let form = this.dataForm;
          let data = {
            name: form.name,
            startTime: form.time[0],
            endTime: form.time[1],
            link: form.link,
            jackpot: form.jackpot,
            currency: form.currency,
            award: form.award,
            topic: form.topic,
            rule: form.rule
          };
          this.$http.addTopic(data).then(
            res => {
              this.$message.success('活动发布成功！');
            },
            err => {
              this.$message.error('网络异常，请稍后尝试！');
            }
          );
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
.btns {
  padding-left: 100px;
}
</style>
