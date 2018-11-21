<template>
  <div class='mian_container'>
    <el-form ref="searchForm"
             :model="searchForm"
             inline>
      <el-form-item>
        <el-select v-model='searchForm.timeTpye'
                   size="small"
                   placeholder="请选择">
          <el-option v-for="item in answerTime"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker class=''
                        v-model="searchForm.time"
                        type="date"
                        placeholder="选择日期"
                        size="small"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model='searchForm.activity'
                   size="small"
                   placeholder="请选择">
          <el-option v-for="item in activitySearch"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchForm.content"
                  clearable
                  placeholder="请输入内容"
                  size="small"
                  style='width: 220px;'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small"
                   type="primary">搜 索</el-button>
      </el-form-item>
    </el-form>
    <div class="fr">
      <el-button type="primary"
                 icon="el-icon-plus"
                 @click="addActvty"
                 size="medium">新建活动</el-button>
    </div>
    <el-table :data="tableData"
              :header-cell-style="{background: '#eee'}">
      <el-table-column v-for="(item, idx) in tableList"
                       :key="idx"
                       :label="item.label"
                       :prop="item.prop"
                       v-if="item.label != '跳转链接'"
                       :width="item.width">
      </el-table-column>
      <el-table-column v-else
                       label="跳转链接">
        <template slot-scope="scope">
          <a :href="scope.row.href"
             target="_blank"
             style="color:#3a8ee6;">{{scope.row.href}}</a>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text"
                     @click='getDetail(scope.row)'>详情</el-button>
          <!-- <el-button type="text" @click='obtained(scope.row)'>下架</el-button>
                        <el-button type="text" disabled>已下架</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="right"
                   layout="total, sizes, prev, pager, next, jumper"
                   background
                   :page-sizes="pageSizes"
                   :page-size="pageSize"
                   :total="totals"
                   :current-page="page"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import mixin from '@/config/mixin';
export default {
  mixins: [mixin],
  data () {
    return {
      searchForm: {
        timeTpye: 0,
        time: '',
        activity: 0,
        content: ''
      },
      // 表格表头
      tableList: [
        { label: '活动ID', prop: 'id', width: 70 },
        { label: '活动名称', prop: 'name' },
        { label: '跳转链接', prop: 'path' },
        { label: '活动开始时间', prop: 'startTime' },
        { label: '活动结束时间', prop: 'endTime' },
        { label: '最近编辑人', prop: 'edit' },
        { label: '最近编辑时间', prop: 'editTime' }
        // {label: '操作', prop: 'console'},
      ],
      tableData: [
        {
          id: '01',
          name: '测试活动',
          href: 'http://www.baidu.com',
          startTime: '2018-10-31',
          endTime: '2018-11-05',
          edit: '你大爷',
          editTime: '2018-10-31'
        },
        {
          id: '02',
          name: '测试活动',
          href: 'http://www.2345.com',
          startTime: '2018-10-31',
          endTime: '2018-11-05',
          edit: '我大爷',
          editTime: '2018-10-31'
        },
        {
          id: '03',
          name: '测试活动',
          href: 'www.baidu.com',
          startTime: '2018-10-31',
          endTime: '2018-11-05',
          edit: '他大爷',
          editTime: '2018-10-31'
        }
      ],
      totals: 100,
      page: 1
    };
  },
  mounted () {
    // console.log(this.$data)
  },
  methods: {
    // 获取数据
    getDataList () {
      let data = {
        timeTpye: this.searchForm.timeTpye
      };
      this.$http.getDataList(data).then(
        res => {
          console.log(res);
        },
        err => {
          this.$messgae.error('网络异常请稍后尝试！');
        }
      );
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
    // 跳转详情
    getDetail (val) {
      console.log(val);
      this.$router.push({
        name: 'ActivityDetail',
        query: { id: val.id }
      });
      // this.$router.push({
      //   path: `activityDetail/?id=${val.id}`
      //   // params: { id: val.id }
      // });
    },
    // 跳转新建活动页
    addActvty () {
      this.$router.push({ name: 'AddActivity' });
    }
  }
};
</script>

<style lang='scss'>
.el-table {
  padding-top: 20px;
}
</style>
