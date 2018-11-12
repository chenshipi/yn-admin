# yn-admin-layout

``` bash
# Layout模块
# 该模块为通用布局模块，使用了element-ui的Container中的三段式布局，components文件夹内容为布局位置调用模块

# AppHead模块
# <template>
#   <div class="app-head">
#     内容
#   </div>
# </template>
# 模块内容非固定按需要编写，模块内容可以直接写在layout的el-header内，但建议写在该模块内更方便维护

# Sidebar模块
# 布局侧边栏为导航菜单，使用element-ui的NavMenu，代码中导航最多为2级，数据根据router定义数据渲染，菜单样式修改建议在该模块内操作
# 注：router数据定义很关键

# AppMain模块
# 主体内容渲染区域