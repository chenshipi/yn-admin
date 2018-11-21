<template>
  <div>
    <el-form ref="form"
             :model="searchForm"
             size="small"
             :inline="true">
      <el-form-item label="时间：">
        <el-date-picker v-model="searchForm.date"
                        type="date"
                        placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select class="w-200"
                   v-model="searchForm.way"
                   placeholder="请选择">
          <el-option v-for="item in logSearch"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input class="w-400"
                  placeholder="请输入关键字"
                  prefix-icon="el-icon-search"
                  v-model="searchForm.conent"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜 索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData"
              :header-cell-style="{background: '#eee'}">
      <el-table-column label="时间"
                       prop="date"></el-table-column>
      <el-table-column label="用户名"
                       prop="user"></el-table-column>
      <el-table-column label="操作内容"
                       prop="action"></el-table-column>
    </el-table>
    <el-pagination class="right"
                   layout="total, sizes, prev, pager, next, jumper"
                   background
                   :page-sizes="pageSizes"
                   :page-size="pageSize"
                   :total="totals"
                   :current-page.sync="page"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<script>
import mixin from '@/config/mixin';
export default {
  mixins: [mixin],
  data () {
    return {
      searchForm: {
        date: '',
        way: 0,
        conent: ''
      },
      totals: 100,
      page: 1,
      tableData: [
        {
          date: '2018-10-17 12:57',
          user: '钟小A',
          action: '创建角色：创建了文章审核员，角色权限为文章审核'
        },
        { date: '2018-10-17 12:57', user: '钟小B', action: '操作记录显示' },
        { date: '2018-10-17 12:57', user: '钟小B', action: '操作记录显示' },
        { date: '2018-10-17 12:57', user: '钟小B', action: '操作记录显示' },
        { date: '2018-10-17 12:57', user: '钟小B', action: '操作记录显示' }
      ]
    };
  },
  created () {
    // this.getList();
  },
  mounted () {},
  methods: {
    // 获取数据
    getList () {
      let data = {
        time: this.searchForm.date,
        way: this.searchForm.way,
        conent: this.searchForm.conent,
        size: this.pageSize,
        page: this.page
      };
      this.$http.getLogList(data).then(
        res => {
          console.log(res);
          this.tableData = res.data.list;
        },
        err => {}
      );
    },
    // 切换每页数量
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.page = 1;
      console.log(`当前第 ${this.page} 页`);
      // this.getList();
    },
    // 切换当前页
    handleCurrentChange (val) {
      console.log(`当前第 ${val} 页`);
      this.page = val;
      // this.getList();
    }
  }
};
</script>

<style lang='scss'>
</style>
