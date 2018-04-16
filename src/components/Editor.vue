<template>
    <div>
        <div id="editorElem" style="text-align:left"></div>
        <span class="PostHtml cur" v-on:click="getContent">发表</span>
    </div>
</template>
<script>
  import E from 'wangeditor'
  export default {
    name: 'editor',
    props: ['postId', 'page', 'flag'],
    data () {
      return {
        editorContent: ''
      }
    },
    methods: {
      getContent: function () {
        if (this.editorContent !== '') {
          this.postHtml(this.postId, this.editorContent)
        }
      },
      postHtml: function (postId, editorContent) {
        var vm = this
        vm.$http({
          url: '//moment.snail.com/api/v1/comment/comment',
          method: 'jsonp',
          params: {
            'post_id': postId,
            'content': editorContent
          },
          jsonp: 'callback',
          emulateJSON: true,
          headers: {
            'Content-Type': 'x-www-from-urlencoded'
          }
        }).then(function (res) {
          this.LoadHtml(this.page, this.flag)
        })
      }
    },
    mounted () {
      var editor = new E('#editorElem')
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.customConfig.menus = [
        // 'head',  // 标题
        'bold',  // 粗体
        'italic',  // 斜体
        'underline',  // 下划线
        // 'strikeThrough',  // 删除线
        // 'foreColor',  // 文字颜色
        // 'backColor',  // 背景颜色
        // 'link',  // 插入链接
        // 'list',  // 列表
        // 'justify',  // 对齐方式
        // 'quote',  // 引用
        'emoticon',  // 表情
        'image' // 插入图片
        // 'table',  // 表格
        // 'video',  // 插入视频
        // 'code',  // 插入代码
        // 'undo',  // 撤销
        // 'redo'  // 重复
      ]
      editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
      editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
      editor.create()
    }
  }
</script>
<style scoped>
  #editorElem{}

</style>