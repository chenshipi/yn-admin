<template>
  <div>
    <el-button class="return-btn" size="mini" icon="el-icon-d-arrow-left" @click="$router.go(-1)">返回协议管理列表</el-button>
    <div class="title">基本资料</div>
    <div class="clear">
      <el-button class="fr w_100" size="mini" @click="edit">编 辑
      </el-button>
    </div>
    <div class="form_data">
      <el-form ref="form" size="mini" :model="form" label-width="110px" label-position="left">
        <!-- size="small"> -->
        <el-form-item label="活动名称：">
          <span>{{form.title}}</span>
        </el-form-item>
        <el-row>
          <el-col :span="5">
            <el-form-item label="活动开始时间：">{{form.startTime}}</el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="活动结束时间：">{{form.endTime}}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="跳转链接：">
          <a :href="form.path">{{form.path}}</a>
        </el-form-item>
        <el-form-item label="活动题目：">
          <span>{{form.topic}}</span>
          <el-button type="text" @click="examine">查看</el-button>
        </el-form-item>
        <el-row>
          <el-col :span="5">
            <el-form-item label="活动奖池：">
              <span>{{form.jackpot}}</span>
              <el-button type="text" @click="dialogVisible = true">追加奖励</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="每题奖励：">{{form.award}}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="活动规则：">
          <p v-for="(item,idx) in form.rule" :key="idx">{{item}}</p>
        </el-form-item>
        <el-row>
          <el-col :span="5">
            <el-form-item label="最近编辑人：">{{form.edit}}</el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="最近编辑时间：">{{form.editTime}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="title">数据情况</div>
    <!-- <el-row class="tab_row"
                type="flex"
                justify="space-between">
            <el-col v-for="tab, idx in tabs"
                    :key="idx">
                <el-row class="tab"
                        :style="{background: tab.bg}">
                    <el-col :span="6"
                            class="col_left">
                        <i class="el-icon-share"></i>
                    </el-col>
                    <el-col :span="18"
                            class="col_right">
                        <p class="tab_conent">{{tab.conent}}</p>
                        <span>{{tab.text}}</span>
                    </el-col>
                </el-row>
            </el-col>
        </el-row> -->
    <div class="tabs">
      <div v-for="(tab, idx) in tabs" :key="idx">
        <el-row class="tab" :style="{background: tab.bg}">
          <el-col :span="6" class="col_left">
            <i class="el-icon-share"></i>
          </el-col>
          <el-col :span="18" class="col_right">
            <p class="tab_conent">{{tab.conent}}</p>
            <span>{{tab.text}}</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="title">奖励明细</div>
    <div class="detail">
      <el-row>
        <el-col :span="3">
          <span>已领取： 22 USDT</span>
        </el-col>
        <el-col :span="3">
          <span>待领取： 22 USDT</span>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" :header-cell-style="{background: '#eee'}">
      <el-table-column label="用户名" prop="user" align="center" width="100"></el-table-column>
      <el-table-column label="地区" prop="area" align="center" sortable></el-table-column>
      <el-table-column label="正确题数" prop="true" align="center" sortable></el-table-column>
      <el-table-column label="获得奖励数" prop="award" align="center" sortable></el-table-column>
      <el-table-column label="获得时间" prop="time" align="center" sortable></el-table-column>
      <el-table-column label="领取状态" prop="state" align="center"></el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :center="true" :show-close="false" width="600px">
      <span class="tips needed-item">如需追加奖励，必须先联系系统开发人员在程序上添加后才能生效，追加奖励在此仅作为记录及展示</span>
      <div class="dialog_form">
        <el-form ref="dialog_form">
          <el-form-item label="活动奖池：">
            <span>{{form.jackpot}}</span>
          </el-form-item>
          <el-form-item label="追加奖励：">
            <el-upload :file-list="fileList" action="https://jsonplaceholder.typicode.com/posts/" :on-exceed="handleExceed" :limit="1">
              <el-button size="mini">点击上传</el-button>
              <el-select v-model="value" style="width:100px;margin-left:180px;" size="mini">
                <el-option v-for="item in currencyType" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <div slot="tip" class="tips ml needed-item">追加奖励生效后，APP中的奖池数将增加</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="确定追加后活动奖池：">
            <span>{{form.jackpot}} + 22 USDT</span>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="dialogVisible = false">确定追加</el-button>
        <el-button @click="dialogVisible = false" size="small" style="width: 80px;">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mixin from '@/config/mixin';
export default {
  mixins: [mixin],
  data () {
    return {
      activityId: '',
      dialogVisible: false,
      form: {
        title: '第一期答题活动题库',
        startTime: '2018-10-01 08:00',
        endTime: '2018-10-31 08:00',
        path: 'https://www.baidu.com/',
        topic: '50题',
        jackpot: '88 USDT',
        award: '1 USDT',
        rule: [
          '1、秒杀商品数量有限先到先得',
          '2、秒杀商品需支付成功后才算秒杀成功',
          '3、商品在秒杀活动期间将不能以正常售价购买，购物车内的秒杀商品将暂时失效',
          '4、秒杀商品支持严选的退货服务，将以实付金额进行等额退款',
          '5、秒杀商品暂不支持app首单减8元的优惠',
          '6、秒杀商品暂不同严选的其他优惠共享',
          '7、如被发现有违规行为（如恶意刷订单获取秒杀商品等违反活动公平性的问题），严选活动组织方将取消你的秒杀订单，原路退还支付金额。'
        ],
        edit: '钟小A',
        editTime: '2018-10-29 12:38'
      },
      tableData: [
        {
          user: '钟小A',
          area: '中国（大陆）',
          true: 6,
          award: '876 USDT',
          time: '2018-10-07 12:36',
          state: '已领取'
        },
        {
          user: '钟小B',
          area: '香港',
          true: 10,
          award: '768 USDT',
          time: '2018-10-07 12:36',
          state: '待领取'
        },
        {
          user: '钟小C',
          area: '澳门',
          true: 6,
          award: '156 USDT',
          time: '2018-10-07 12:36',
          state: '已领取'
        },
        {
          user: '钟小D',
          area: '马来西亚',
          true: 1,
          award: '156 USDT',
          time: '2018-10-07 12:36',
          state: '待领取'
        },
        {
          user: '钟小E',
          area: '中国（大陆）',
          true: 3,
          award: '156 USDT',
          time: '2018-10-07 12:36',
          state: '待领取'
        },
        {
          user: '钟小F',
          area: '香港',
          true: 8,
          award: '156 USDT',
          time: '2018-10-07 12:36',
          state: '未领取'
        },
        {
          user: '钟小G',
          area: '中国（大陆）',
          true: 2,
          award: '156 USDT',
          time: '2018-10-07 12:36',
          state: '已领取'
        }
      ],
      tabs: [
        { bg: '#D79767', conent: '88 USDT', text: '活动总奖励' },
        { bg: '#D79767', conent: '60 USDT', text: '剩余奖励数' },
        { bg: '#70ADC8', conent: '188', text: '点击量（次）' },
        { bg: '#169BD5', conent: '33', text: '参与量（人）' }
      ],
      value: 1, // 选择器绑定值
      fileList: [] // 上传控件绑定的数组
    };
  },
  created () {
    console.log('$router', this.$router);
    console.log('$route', this.$route);
    this.getData();
  },
  mounted () {},
  methods: {
    // 查询数据
    getData () {
      // this.$http.getActivit({ id: this.$route.query.id }).then(res => {
      //   console.log(res);
      // });
    },
    edit () {
      this.$router.push({
        name: 'EditActivity',
        params: {
          id: this.$route.query.id
        }
      });
    },
    examine () {
      console.log('==>>');
      this.$router.push({
        name: 'ExamineTopic',
        query: { id: this.$route.query.id }
      });
    },
    // 文件上传方法
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    }
  }
};
</script>

<style lang='scss'>
.title {
  padding-left: 10px;
  border-left: 2px solid #409eff;
  line-height: 24px;
  font-size: 16px;
  //   font-weight: 700;
  color: #409eff;
}
.form_data {
  padding: 10px;
}
.tab_row {
  padding: 20px 10px;
  margin-right: 20px;
}
.tabs {
  padding: 20px 10px;
  margin-right: 20px;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 210px;
  height: 80px;
  background: #409eff;
  color: #fff;
  .col_left {
    text-align: center;
    font-size: 24px;
    line-height: 80px;
  }
  .col_right {
    text-align: right;
    padding: 12px 15px 0 0;
  }
  .tab_conent {
    font-size: 32px;
  }
}
.detail {
  padding: 10px 3px 0;
  line-height: 24px;
  color: #888;
}
.dialog_form {
  padding: 0 40px;
}
.tips.ml {
  margin-left: 82px;
}
</style>
