<template>
  <div>
    <el-button class="return-btn"
               size="mini"
               icon="el-icon-d-arrow-left"
               @click="$router.go(-2)">返回协议管理列表</el-button>
    <el-form ref="dataForm"
             :model="dataForm"
             label-width="140px"
             :rules="rules"
             size="mini">
      <el-form-item label="活动名称："
                    prop="name">
        <el-input class="w-400"
                  v-model="dataForm.name"
                  placeholder="请输入活动名称，最大字数为20字"
                  :maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="活动时间："
                    prop="time">
        <!-- <el-date-picker type="date"
                        placeholder="选择日期"
                        v-model="dataForm.date1"></el-date-picker>
        <span>至</span>
        <el-date-picker type="date"
                        placeholder="选择日期"
                        v-model="dataForm.date2"></el-date-picker> -->
        <el-date-picker v-model="dataForm.time"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="H5页面图片管理："
                    prop="">
        <el-upload class="activity-uploader"
                   action="https://jsonplaceholder.typicode.com/posts/"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl"
               :src="imageUrl"
               class="activity">
          <i v-else
             class="el-icon-plus activity-uploader-icon"></i>
          <div slot="tip"
               class="tips">
            <p>1、该图用户放在用户点击封面图进来后看到的第一个页面</p>
            <p>2、请上传 80*80 像素图片，图片格式为png、jpg格式</p>
            <p>3、宣传图中请带上主办方logo图标；写明活动主题及奖励等基本信息</p>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="跳转链接："
                    prop="link">
        <el-input class="w-400"
                  placeholder="请输入Banner图后跳转的链接"
                  v-model="dataForm.link"></el-input>
      </el-form-item>
      <el-form-item label="活动奖池："
                    prop="jackpot">
        <el-input class="w-400"
                  placeholder="请输入活动总奖励"
                  v-model="dataForm.jackpot"></el-input>
        <el-select v-model="dataForm.currency"
                   style="width:100px;">
          <el-option v-for="item in currencyType"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
        <div class="tips needed-item">如超过活动奖励上限，后续参加用户将无奖励</div>
      </el-form-item>
      <el-form-item label="每题奖励："
                    prop="award">
        <el-input class="w-400"
                  placeholder="请输入每答对一题奖励数量，奖励类型以奖池类型为准"
                  v-model="dataForm.award"></el-input>
        <!-- <el-select v-model="value"
                   style="width:100px;"
                   size="mini">
          <el-option v-for="item in currencyType"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item label="活动题库："
                    prop="topic">
        <el-button v-if="dataForm.topic == 0"
                   icon="el-icon-plus"
                   @click="addTopic">添加题目</el-button>
        <span v-else>
          <span>{{dataForm.topic}}题</span>
          <el-button type="text">修改</el-button>
        </span>
      </el-form-item>
      <el-form-item label="活动规则："
                    prop="rule">
        <wang-editor @pushData="pushData"
                     :border-color="wangEditorColor"></wang-editor>
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button type="primary"
                 @click="submitForm('dataForm')">保存更新并发布</el-button>
      <el-button>预 览</el-button>
      <el-button @click="$router.go(-1)">取 消</el-button>
    </div>
  </div>
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
      if (this.dataForm.rule != '') {
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
        // date1: "",
        // date2: "",
        link: '',
        jackpot: '',
        award: '',
        currency: 0,
        topic: 0,
        rule: ''
      },
      rules: {},
      imageUrl: '',
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
      wangEditorColor: ''
    };
  },
  mounted () {},
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isType = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isType) {
        this.$message.error('图片只能是 PNG、JPG 格式!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!');
        return false;
      }
      // 图片尺寸判断
      var _this = this;
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function (event) {
          var image = new Image();
          image.onload = function () {
            var width = this.width;
            var height = this.height;
            if (width != 80 && height != 80) {
              _this.$alert('图片尺寸必须 80*80 像素图片', '提示');
              reject();
            }
            resolve();
          };
          image.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
      // return isType && isLt2M;
    },
    // WangEditor方法
    pushData (value) {
      this.dataForm.rule = value;
    },
    addTopic () {},
    // 提交表单(发布)
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
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
.activity-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.activity-uploader .el-upload:hover {
  border-color: #409eff;
}
.activity-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.activity {
  width: 80px;
  height: 80px;
  display: block;
}
.btns {
  // padding-left: 80px;
  // text-align: center;
  button {
    width: 140px;
    // margin-right: 80px;
  }
}
</style>
