<template>
  <div>
    <el-form ref="passForm"
             :model="passForm"
             :rules="rules"
             size="small"
             label-width="100px">
      <el-form-item label="登录账号："
                    prop="">
        <!-- <el-input v-model="form.user"></el-input> -->
        <span>{{passForm.user}}</span>
      </el-form-item>
      <el-form-item label="原密码："
                    prop="pass">
        <el-input class="w-400"
                  type="password"
                  placeholder="请输入原密码"
                  v-model="passForm.pass"></el-input>
      </el-form-item>
      <el-form-item label="新密码："
                    prop="newPass">
        <el-input class="w-400"
                  type="password"
                  placeholder="请输6-18位英文数字结合，区分大小写"
                  v-model="passForm.newPass"></el-input>
      </el-form-item>
      <el-form-item label="确认密码："
                    prop="checkPass">
        <el-input class="w-400"
                  type="password"
                  placeholder="请再次输入新密码"
                  v-model="passForm.checkPass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('passForm')">提 交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      // var rule = new E
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else if (!/^[a-zA-Z\d]+$/.test(value)) {
        callback(new Error('请输6-18位英文数字结合，区分大小写'));
      } else {
        if (this.passForm.checkPass !== '') {
          this.$refs.passForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passForm.newPass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      passForm: {
        user: '12312348909',
        pass: '',
        newPass: '',
        checkPass: ''
      },
      rules: {
        pass: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        newPass: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  mounted () {},
  methods: {
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
</style>
