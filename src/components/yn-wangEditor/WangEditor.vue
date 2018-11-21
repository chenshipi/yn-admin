<template>
  <!-- <div> -->
  <div id='editor'
       :style="{borderColor:borderColor}"></div>
  <!-- </div> -->
</template>

<script>
import E from 'wangeditor';
export default {
  name: 'WangEditor',
  props: {
    uploadUrl: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      default: 'file'
    },
    content: '',
    borderColor: {
      type: String,
      default: '#ccc'
    }
  },
  data () {
    return {
      editorContent: ''
    };
  },
  mounted () {
    var editor = new E('#editor');
    // 显示上传图片
    // editor.customConfig.uploadImgShowBase64 = true;
    // 服务器地址
    editor.customConfig.uploadImgServer = this.uploadUrl;
    // formData文件名
    editor.customConfig.uploadFileName = this.fileName;
    // 监听函数
    editor.customConfig.uploadImgHooks = {
      // 图片上传前
      before: function (xhr, editor, files) {},
      // 自定义插入图片
      customInsert: function (insertImg, result, editor) {
        insertImg(result.data.url);
      }
    };
    // 将图片大小限制为 3M
    editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
    // 限制一次最多上传 5 张图片
    // editor.customConfig.uploadImgMaxLength = 5;
    // 隐藏网络图片
    editor.customConfig.showLinkImg = false;
    // 允许复制过来的文本带样式
    editor.customConfig.pasteFilterStyle = false;
    // 设置面板z-index
    editor.customConfig.zIndex = 1;
    editor.customConfig.onchange = html => {
      this.$emit('pushData', html);
    };
    editor.create();
    // 初始化默认内容设置
    editor.txt.html(this.content);
  },
  methods: {
    // pushData(data){
    //     this.$emit('pushData',data)
    // }
  }
};
</script>

<style lang='scss'>
#editor {
  border: 1px solid #ccc;
}
.w-e-toolbar {
  border: 0 none !important;
  border-bottom: 1px solid #ccc !important;
}
.w-e-text-container {
  border: 0 none !important;
}
</style>
