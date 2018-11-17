var mixin = {
  data () {
    return {
      // 分页 每页页数条数
      pageSizes: [10, 20, 35, 50],
      // 每页默认条数
      pageSize: 10,
      // 活动查询方式
      answerTime: [
        { label: '活动开始时间', value: 0 },
        { label: '活动结束时间', value: 1 },
        { label: '最近编辑时间', value: 2 }
      ],
      activitySearch: [
        { label: '模糊搜索', value: 0 },
        { label: '活动名称', value: 1 },
        { label: '活动ID', value: 2 }
      ],
      logSearch: [
        { label: '模糊搜索', value: 0 },
        { label: '用户名', value: 1 },
        { label: '操作内容', value: 2 }
      ],
      // 奖励类型
      currencyType: [
        { label: 'USDT', value: 0 },
        { label: 'RMB', value: 1 }
      ],
      // 这个没用了，先放着
      topicOption: [
        { label: 'A', value: 0 },
        { label: 'B', value: 1 },
        { label: 'C', value: 2 },
        { label: 'D', value: 3 }
      ],
      // 字母表
      alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    }
  }
}

export default mixin
