<template>
  <!-- <div> -->
  <div id='editor' :style="{borderColor:borderColor}"></div>
  <!-- </div> -->
</template>

<script>
import E from 'wangeditor';
export default {
  name: 'WangEditor',
  props: {
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
    editor.customConfig.uploadImgServer = '/upload';
    // 上传回调
    // editor.customConfig.uploadImgHooks = {
    //   before: function (xhr, editor, files) {
    //     console.log(files);
    //     let url = 'www.baidu.com';
    //     // 调接口接收返回图片url
    //     editor.txt.append('<img src=' + url + '>');
    //   }
    // };
    // 上传回调
    // let self = this;
    editor.customConfig.uploadImgHooks = {
      before: function (xhr, editor, files) {
        console.log('before', xhr, editor, files);
        // console.log(files[0]);
        // 调接口接收返回图片url
        // let param = {
        //   isThumb: 0
        // };
        // let formData = new FormData();
        // formData.append('file', files[0]);
        // self.$store
        //   .dispatch('uploadImage', { params: param, data: formData })
        //   .then(res => {
        //     let url = res.data.url;
        //     self.editor.txt.append('<img src=' + url + '>');
        //   });
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
