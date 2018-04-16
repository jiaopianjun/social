<template>
  <div class="PageBar" id="PageBar">   
    <ul>   
      <li><a :class="setButtonClass(0)" @click="prvePage(curIndex)"><img src="../images/prev.png" alt="<"/></a></li>   
      <li v-for="(index,i) in indexs"  :class="[{ active: curIndex == index },{point:index < 1}]">   
        <a @click="btnClick(index)">{{ index < 1 ? "..." : index }}</a>  
      </li>   
      <li class="next"><a :class="setButtonClass(1)" @click="nextPage(curIndex)"><img src="../images/next.png" alt=">"/></a></li>   
      <li class="JumpToPage" v-show="isJump">跳转到<input type="text" v-model="inputNum" onkeyup="value=value.replace(/[^\d.]+/,'')"/>页<span class="cur" @click="JumpGo(inputNum)">确定</span></li>
    </ul>  
  </div>
</template>
<script>
export default {
  name: 'PageBar',
  props: ['cur', 'all', 'order', 'tags', 'isJump'],
  data () {
    return {
      curIndex: this.cur,
      inputNum: 1
    }
  },
  watch: {
    cur: function (value) {
      console.log(value)
      this.curIndex = this.cur
    }
  },
  computed: {
    indexs: function () {
      var left = 1
      var right = this.all
      var ar = []
      if (this.all >= 11) {
        if (this.curIndex > 5 && this.curIndex < this.all - 4) {
          left = parseInt(this.curIndex) - 5
          right = parseInt(this.curIndex) + 4
        } else {
          if (this.curIndex <= 5) {
            left = 1
            right = 10
          } else {
            right = this.all
            left = this.all - 9
          }
        }
      }
      while (left <= right) {
        ar.push(left)
        left++
      }
      if (ar[ar.length - 1] < this.all) {
        ar[ar.length - 1] = this.all
        ar[ar.length - 2] = 0
      }
      return ar
    }
  },
  methods: {
    // 页码点击事件
    btnClick: function (data) {
      if (data < 1) return
      if (data !== this.curIndex) {
        this.curIndex = data
        this.$emit('listen', data)
      }
    },
    // 下一页
    nextPage: function (data) {
      if (this.curIndex >= this.all) return
      this.btnClick(parseInt(this.curIndex) + 1)
    },
    // 上一页
    prvePage: function (data) {
      if (this.curIndex <= 1) return
      this.btnClick(parseInt(this.curIndex) - 1)
    },
    // 设置按钮禁用样式
    setButtonClass: function (isNextButton) {
      if (isNextButton) {
        return this.curIndex >= this.all ? 'page-button-disabled' : ''
      } else {
        return this.curIndex <= 1 ? 'page-button-disabled' : ''
      }
    },
    send: function (page) {
      this.btnClick(page)
    },
    JumpGo: function (page) {
      if (page <= this.all) {
        this.btnClick(page)
      } else {
        // alert('没有了')
      }
    }
  },
  created: function () {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.PageBar {  
  -webkit-touch-callout: none;  
  -webkit-user-select: none;  
  -khtml-user-select: none;  
  -moz-user-select: none;  
  -ms-user-select: none;  
  user-select: none;  
  text-align: center;
  margin-top:37px;
  font-size: 0;
}   
.PageBar li {  
  list-style: none;  
  display: inline-block;  
  margin:0;
}  
.PageBar li:first-child > a {  
    margin-left: 0px;  
}
.PageBar .point a{
  border:none;
  cursor: default;
  border-left:1px solid rgb(238, 240, 241);
}
.PageBar .point a:hover{
  background: none;
}
.PageBar a {  
  display: inline-block;
  width: 36px;
  height: 36px;
  line-height: 36px;
  font-size: 12px;
  color: rgb(167, 167, 167);
  background: #fff;
  border: 1px solid #ccc;
  margin-right:4px;
  cursor: pointer;
}  
.PageBar a:hover {  
  border-color: #00aaff;
  color:#00aaff;  
}  
/*.PageBar li:last-child a{
  border-right: 1px solid rgb(238, 240, 241);
}*/
/*.PageBar li.next a{
  border-right: 1px solid rgb(238, 240, 241);
}*/
.PageBar .active a {  
  color: #fff;  
  cursor: default;  
  border-color:#00aaff;
  background:#00aaff;  
}  
.PageBar i {  
  font-style: normal;  
  color: #d44950;  
  margin: 0px 4px;  
  font-size: 12px;  
}  
.PageBar .page-button-disabled{
  background:#f7f9fa;
  cursor: not-allowed;
  color:#ddd !important;  
  border-color:#e6e6e6;
} 
.PageBar .page-button-disabled:hover{
  background:#f7f9fa;
  border-color:#e6e6e6;
}
.PageBar .JumpToPage{
  font-size: 12px;
  font-family: "Microsoft YaHei";
  color: rgb(128, 128, 128);
  margin-left:20px;
}
.PageBar .JumpToPage input[type="text"]{
  border:1px solid rgb(204, 204, 204);
  background-color: rgba(255, 85, 0, 0);
  width: 32px;
  height: 24px;
  /*line-height: 34px;*/
  text-align: center;
  padding:5px;
  margin:0 8px;
}
.PageBar .JumpToPage span{
  position: relative;
  top:2px;
  font-size: 15px;
  display: inline-block;
  border:1px solid rgb(204, 204, 204);
  border-radius: 11px;
  background-color: rgba(255, 85, 0, 0);
   width: 62px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  margin-left:10px;
}
.PageBar .JumpToPage span:hover{
  border-color:#00aaff;
  color:#00aaff;  
}
</style>
