<template>
  <div class="pop" id="pop">
     <div :class="['rulePop Jrule animate', {'pb40':isPopInfo.isPopTsShow == 5}]" v-show="isPopInfo.isPopShow">
        <div class="rulePop-Hd">
            提示<img src="../images/close.png" class="fr cur" alt="关闭" @click="closePop()"/>
        </div>
        <div class="rulePop-Cont">
           <p :class="{'none':isPopInfo.isPopTsShow !== 2}">确定删除这条帖子嘛？</p>
           <p :class="{'none':isPopInfo.isPopTsShow !== 3}">确定删除这条评论嘛？</p>
           <p :class="{'none':isPopInfo.isPopTsShow !== 0}">{{DetailLandlord.is_top === 1 ? '确定取消这条帖子的置顶嘛？' : '确定置顶这条帖子嘛？'}}</p>
           <p :class="{'none':isPopInfo.isPopTsShow !== 4}">{{DetailLandlord.is_official === 1 ? '确定取消这条帖子为官方贴子嘛？' : '确定将其设置为官方帖子嘛？'}}</p>
           <!-- <p :class="{'none':isPopInfo.isPopTsShow !== 5}">确定将其设为FAQ贴嘛？</p> -->
           <div :class="['ruleSelect', {'none':isPopInfo.isPopTsShow !== 1}]">
               <div :class="{'none':DetailLandlord.public_tags_length === 1}">
                 <span class="fl">请设置精华帖分类</span>
                 <div class="ruleSelectBox fr">
                    <div class="ruleSelectInput cur" @click="ruleSelectInput()" :data-tagId="tagId">{{tagName}}</div>
                    <i :class="['rotatez',{'roate': isSelect === true}]"></i>
                    <ul class="ruleSelectDrown" v-show="isRuleSelectDrown">
                        <li class="cur" @click="SelectDrown(list.id, list.name)" v-for="(list, index) in publicTags" :data-tagId="list.id" :title="list.name">{{list.name}}</li>
                    </ul>
                 </div>
               </div>
               <div :class="{'none':DetailLandlord.public_tags_length === 0}">确定取消这条评论的加精嘛？</div>
           </div>
           <div :class="['faqBox', {'none':isPopInfo.isPopTsShow !== 5}]">
              <h4>设置FAQ</h4>
              <div class="faqCont">
                 <div class="faqContList">
                    <div class="faqLeft">问题大类：</div>
                    <div class="faqRight">
                      <select id="top_category_id" @change="changeTop()">
                        <option v-for="list in top_category_id_list" :value="list.id" >{{list.name}}</option>
                      </select>
                    </div>
                 </div>
                 <div class="faqContList">
                    <div class="faqLeft">二级分类大类：</div>
                    <div class="faqRight">
                      <select id="second_category_id">
                        <option v-for="list in second_category_id_list" :value="list.id">{{list.name}}</option>
                      </select>
                    </div>
                 </div>
                 <div class="faqContList">
                    <div class="faqLeft">问题名称：</div>
                    <div class="faqRight">
                      <input type="text" placeholder="填写问题名称" id="faqtitle"/>
                    </div>
                 </div>
                 <p class="faqerr" v-if="faqerror">{{faqerrtext}}</p>
              </div>
           </div>
        </div>
        <div class="rulePop-Bt">
            <span class="ruleSure cur" @click="submit(isPopInfo.isPopTsShow)">确定</span>
            <span class="ruleCannle cur" @click="closePop()">取消</span>
        </div>
     </div>
    <!--  <div class="rulePop Crule"></div> -->
    <div class="divmask" v-show="isPopInfo.isMaskShow"></div>
  </div>
</template>

<script>
export default {
  name: 'pop',
  props: ['isPopInfo', 'DetailLandlord', 'cur'],
  // props: {
  //   isPopInfo: {
  //     type: Object
  //   },
  //   DetailLandlord: {
  //     type: Array
  //   }
  // },
  watch: {
  },
  data () {
    return {
      publicTags: [],
      postId: '',
      circleId: '',
      isPopShowr: false,
      isMaskShowr: false,
      isSelect: true,
      isTop: false,
      isDelete: false,
      isClassify: false,
      isRuleSelectDrown: false,
      tagId: '',
      tagName: '',
      top_category_id: '',
      top_category_id_list: [],
      second_category_id: '',
      second_category_id_list: [{
        id: '',
        name: '选择二级分类大类'
      }],
      faq_title: '',
      medicine: '',
      faqerror: false,
      faqerrtext: '对不起,请填写必填选项'
    }
  },
  methods: {
    submit: function (index) { // 提交
      var data, url
      if (index === 0) { // 置顶
        data = {
          post_id: this.postId
        }
        url = '//moment.snail.com/api/v1/post/top'
        this.PostAjax(url, data, 0)
      } else if (index === 1) { // 加精
        if (this.DetailLandlord.public_tags.length !== 0) {
          data = {
            post_id: this.postId
          }
          url = 'http://moment.snail.com/api/v1/post/cancel-cream'
        } else {
          data = {
            post_id: this.postId,
            private_tag_id: this.tagId
          }
          url = '//moment.snail.com/api/v1/post/set-cream'
        }
        this.PostAjax(url, data, 1)
      } else if (index === 2) { // 删除主贴
        data = {
          post_id: this.postId
        }
        url = '//moment.snail.com/api/v1/post/delete'
        this.PostAjax(url, data, 2)
      } else if (index === 3) { // 删除评论
        data = {
          comment_id: this.isPopInfo.commentId
        }
        url = '//moment.snail.com/api/v1/comment/delete'
        this.PostAjax(url, data, 3)
      } else if (index === 4) { // 设为官方贴
        data = {
          post_id: this.postId
        }
        if (this.DetailLandlord.is_official === 1) {
          url = '//moment.snail.com/api/v1/post/cancel-official'
        } else {
          url = '//moment.snail.com/api/v1/post/set-official'
        }
        this.PostAjax(url, data, 4)
      } else if (index === 5) { // 设为FAQ
        var topid = document.getElementById('top_category_id').value
        var secid = document.getElementById('second_category_id').value
        var faqtitle = document.getElementById('faqtitle').value
        if (topid && secid && faqtitle) {
          data = {
            post_id: this.postId,
            top_category_id: topid,
            second_category_id: secid,
            faq_title: faqtitle
          }
          url = '//moment.snail.com/api/v1/faq/set'
          this.PostAjax(url, data, 5)
        } else {
          this.faqerror = true
        }
      }
    },
    closePop: function () { // 关闭弹窗
      this.isPopInfo.isPopShow = false
      this.isPopInfo.isMaskShow = false
      this.isRuleSelectDrown = false
    },
    ruleSelectInput: function () { // 显示下拉框
      if (this.isRuleSelectDrown === true) {
        this.isRuleSelectDrown = false
        this.isSelect = true
      } else {
        this.isRuleSelectDrown = true
        this.isSelect = false
      }
    },
    SelectDrown: function (tagId, tagName) {
      this.isRuleSelectDrown = false
      this.isSelect = true
      this.tagId = tagId
      this.tagName = tagName
    },
    PostAjax: function (url, data, temp) {
      var vm = this
      vm.$http({
        url: url,
        method: 'jsonp',
        params: data,
        jsonp: 'callback',
        emulateJSON: true,
        headers: {
          'Content-Type': 'x-www-from-urlencoded'
        }
      }).then(function (res) {
        this.isPopInfo.isPopShow = false
        this.isPopInfo.isMaskShow = false
        if (temp === 0) { // 置顶
          if (this.DetailLandlord.is_top === 0) {
            this.DetailLandlord.is_top = 1
          } else {
            this.DetailLandlord.is_top = 0
          }
        }
        if (temp === 1) { // 加精
          var ob = [{
            mark: 'cream',
            name: '精华',
            text: '精'
          }]
          // this.$router.go({name: '/post', params: {circleId: this.circleId, postId: this.postId}})
          if (this.DetailLandlord.public_tags_length === 1) {
            this.DetailLandlord.public_tags = ''
            this.DetailLandlord.public_tags_length = 0
          } else {
            console.log(this.DetailLandlord.public_tags, ob)
            this.DetailLandlord.public_tags = ob
            this.DetailLandlord.public_tags_length = 1
          }
        }

        if (temp === 3) { // 加精
          this.$emit('abc', 'dddd')
          // this.$router.go({name: '/SocialDetail', params: {circleId: this.circleId, postId: this.postId}})
        }

        if (temp === 4) { // 官方贴
          if (this.DetailLandlord.is_official === 0) {
            this.DetailLandlord.is_official = 1
          } else {
            this.DetailLandlord.is_official = 0
          }
        }
        if (temp === 2) {
          this.$router.push({name: 'circle', params: {circleId: this.circleId}})
        }
        if (temp === 5) { // FAQ
          this.DetailLandlord.is_faq_setup = true
        }
      })
    },
    changeTop: function () {
      this.faqerror = false
      var id = document.getElementById('top_category_id').value
      if (id) {
        this.getSecond(id)
      } else {
        var ts = [{
          id: '',
          name: '选择二级分类大类'
        }]
        this.second_category_id_list = ts
      }
    },
    getSecond: function (id) {
      var vm = this
      vm.$http({
        url: '//moment.snail.com/api/v1/faq/get-second-categorys',
        method: 'jsonp',
        params: {
          'top_category_id': id
        },
        jsonp: 'callback',
        emulateJSON: true,
        headers: {
          'Content-Type': 'x-www-from-urlencoded'
        }
      }).then(function (res) {
        if (res.status === 200) {
          this.second_category_id_list = res.data.result
        }
      })
    }
  },
  created: function () {
    this.postId = this.$route.params.postId
    this.circleId = this.$route.params.circleId
    var vm = this
    vm.$http({
      url: '//moment.snail.com/api/v1/circle/private-tags',
      method: 'jsonp',
      params: {
        'circle_id': this.circleId
      },
      jsonp: 'callback',
      emulateJSON: true,
      headers: {
        'Content-Type': 'x-www-from-urlencoded'
      }
    }).then(function (res) {
      this.publicTags = res.data.tags
      this.tagId = this.publicTags[0].id
      this.tagName = this.publicTags[0].name
    })

    vm.$http({
      url: '//moment.snail.com/api/v1/faq/get-top-categorys',
      method: 'jsonp',
      jsonp: 'callback',
      emulateJSON: true,
      headers: {
        'Content-Type': 'x-www-from-urlencoded'
      }
    }).then(function (res) {
      if (res.status === 200) {
        var ts = {
          id: '',
          name: '选择问题大类'
        }
        res.data.result.unshift(ts)
        this.top_category_id_list = res.data.result
        console.log(this.top_category_id_list)
      }
    })
  }
}
</script>
<style scoped>
  @import '../sass/stylesheets/SocialPop.css'
</style>
