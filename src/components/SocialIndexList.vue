<template>
  <div class="SocialIndexList" id="SocialIndexList">
      <div class="IndexListType clearfix" id="IndexListType">
         <div class="TypeTag fl">
             <ul>
                 <li>
                    <a href="javascript:;"  :class="{current:current == -1}" title="全部" data-tagid="" @click="GoTagsBtn('', -1)" wn_tj_click_href wn_tj_click_gameId wn_tj_click_excel="all_select" wn_tj_click_id>全部</a>
                 </li>
                 <li v-for="(allTags,index) in allTags" >
                    <a href="javascript:;" :title="allTags.name" :data-tagid="allTags.id" @click="GoTagsBtn(allTags.id, index)" :class="{current:index == current}" wn_tj_click_href :wn_tj_click_excel="allTags.name" wn_tj_click_id>{{allTags.name}}</a>
                 </li>
             </ul>
         </div>
         <div class="scrrenTag fr">
           <h6 class="scrrenTagInput" @click="drownInput"><span>{{ordername}}</span><i :class="['rotatez',{'roate':drown === false}]"></i></h6>
           <ul class="InputSelect" v-if="drown">
              <li data-order="hot" @click="drownSelect('hot','热门排序')" wn_tj_click_href wn_tj_click_gameId wn_tj_click_excel="hot_ordering" wn_tj_click_id>热门排序</li>
              <li data-order="time" @click="drownSelect('time','时间排序')" wn_tj_click_href wn_tj_click_gameId wn_tj_click_excel="time_ordering" wn_tj_click_id>时间排序</li>
           </ul>
         </div>
      </div>
      <div class="IndexListCont">
        <ul>
          <li v-for="(list, i) in list" :data-listId="list.id" :name="list.id">
              <div class="Jitems">
                <div class="Jitems-Title">
                  <router-link :to="{ name: 'post', params: {'circleId':circleId,'postId': list.id,'onPage':1}}" :title="list.title" :listId="list.id">{{list.title}}</router-link>
                  <i :class="['icon-gf',{'none':list.is_official == 0}]" title="官方">官方</i>
                  <i :class="['icon-top',{'none':list.is_top == 0}]" title="置顶">置顶</i>
                  <i class="icon-good" v-for="tags in list.tags" :title="tags.name" :class="tags.mark">{{tags.text}}</i>
                </div>
                <div class="Jitems-Detail" v-if="list.is_top != 1">
                    <h5 class="Jitems-Detail-text" v-html="list.text"></h5>
                    <div class="Jitems-Detail-img clearfix">
                        <div class="JDICont">
                           <div class="imgList" v-for="(img, index) in list.images" @click="ShowBigPic($event,index,i)">
                              <div class="imgfd"></div>
                              <img :src="img + '?x-oss-process=image/resize,h_110'" alt="刷新加载图片"/>
                           </div>
                        </div>
                        <div class="Jlist-thumb clearfix" v-if="list.images != ''" v-show="list.flag">
                          <div class="thumbHd"><a href="javascript:;" class="j_retract" @click="hidePic($event,i)"><i class="icon_retract"></i>收起</a> </div>
                          <div class="thumbWarp">
                              <div :class="['thumbWarpList',{none: list.showindex != index }]" v-for="(img, index) in list.images" >
                                <div class="thumbPrev" v-if="index != 0" :data-cur="index-1" @click="thumbPrev(index,i)"></div>
                                <div class="thumbsx" @click="hidePic2($event,i)"></div>
                                <img :src="img" alt="刷新查看" />
                                <div class="thumbNext" v-if="list.images.length-1 != index" :data-cur="index+1" @click="thumbNext(index,i)"></div>
                              </div>
                          </div>
                        </div>
                        <!-- <EnlargePicture :imagesList="list.images" :isCurrent="isCurrent"  :isFlag="list.flag" :data-flag="list.flag"></EnlargePicture> -->
                    </div>
                </div>
                <div class="Jitems-Info">
                    <div class="JuserInfo fl">
                        <a href="javascript:;" class="JuserInfo-people default" :title="list.username">
                            <img :src="list.user_photo"/>
                            {{list.username}}
                        </a>
                        <span class="JuserInfo-time" :title="list.created_at">{{list.created_at}}</span>
                    </div>
                    <router-link class="JdataInfo fr" :to="{ name: 'post', params: {'circleId':circleId,'postId': list.id,'onPage':1}}">
                       <span class="Jview"><img src="../images/icon4.png"/>{{list.view_count}}</span>
                       <span class="Jreply"><img src="../images/icon5.png"/>{{list.comment_count}}</span>
                    </router-link>
                </div>
              </div>
          </li>       
        </ul>
      </div>
      <div class="IndexPage">
         <pagination :cur="cur" :all="all"  :isJump="isJump" @listen="monitor" ref="page"></pagination>   
      </div>
      <div class="selectMask" v-show="isSelectMask" @click="closeSelect()"></div>
  </div>
</template>
<script>
import pagination from './pagination.vue'
import EnlargePicture from './EnlargePicture.vue'
export default {
  name: 'SocialIndexList',
  components: {
    pagination: pagination,
    EnlargePicture: EnlargePicture
  },
  watch: {
    currentPage: 'requestData',
    list: {
      handler: function (val, oldval) {
        // console.log(val)
      }
    }
  },
  ready () {
    this.requestData()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  data () {
    return {
      list: [],
      allTags: [],
      circleId: '',
      cur: 1,
      all: 1,
      pageSize: 20,
      tags: '',
      order: 'time',
      ordername: '时间排序',
      drown: false,
      current: -1,
      isCurrent: 0,
      showFlag: -1,
      tumbCurrent: 0,
      show: false,
      scrolled: false,
      isJump: true,
      isSelectMask: false
    }
  },
  methods: {
    handleScroll: function (scroll) {
      this.scrolled = scroll
    },
    hidePic: function (event, temp) {
      this.list[temp]['flag'] = false
    },
    hidePic2: function (event, temp) {
      this.list[temp]['flag'] = false
    },
    thumbNext: function (index, temp) { // 缩略图
      this.list[temp]['showindex'] = index + 1
    },
    thumbPrev: function (index, temp) {
      this.list[temp]['showindex'] = index - 1
    },
    ShowBigPic: function (event, index, temp) {
      this.list[temp].flag = true
      this.list[temp]['showindex'] = index
    },
    GoTagsBtn: function (tagId, index) { // 切换tag
      this.current = index
      this.tags = tagId
      this.ShowHtml(this.order, 1)
      this.$refs.page.send(1)
    },
    goTop: function () {
      var gotoTop = function () {
        var currentPosition = document.documentElement.scrollTop || document.body.scrollTop
        currentPosition -= 80
        if (currentPosition > 0) {
          window.scrollTo(0, currentPosition)
        } else {
          window.scrollTo(0, 0)
          clearInterval(timer)
          timer = null
        }
      }
      var timer = setInterval(gotoTop, 50)
    },
    monitor: function (data) { // 分页监听
      this.ShowHtml(this.order, data)
      this.goTop()
    },
    closeSelect: function () { // 关闭下拉框
      this.isSelectMask = false
      this.drown = false
    },
    drownInput: function () { // 下拉框排序
      if (this.drown === true) {
        this.drown = false
      } else {
        this.drown = true
        this.isSelectMask = true
      }
    },
    drownSelect: function (order, ordername) {
      this.ordername = ordername
      this.drown = false
      this.isSelectMask = false
      this.order = order
      this.ShowHtml(this.order, 1)
      this.$refs.page.send(1)
    },
    ShowHtml: function (order, page) {
      const vm = this
      vm.$http({
        url: '//moment.snail.com/api/v1/post/list-of-circle-post',
        method: 'jsonp',
        params: {
          'circle_id': this.circleId,
          'tag_id': this.tags,
          'order': order,
          'page': page,
          'pagesize': this.pageSize
        },
        jsonp: 'callback',
        emulateJSON: true,
        headers: {
          'Content-Type': 'x-www-from-urlencoded'
        }
      }).then(function (res) {
        for (var i in res.data.list) {
          res.data.list[i]['flag'] = false
          res.data.list[i]['showindex'] = 0
        }
        this.list = res.data.list
        this.all = res.data.totalPage
        if (res.data.totalPage === 0) {
          this.all = 1
        }
      })
    }
  },
  created: function () {
    this.circleId = this.$route.params.circleId
    // this.circleId = 8
    window.addEventListener('scroll', this.handleScroll)
    const vm = this
    const Jdata = {
      'circle_id': this.circleId,
      'tag_id': this.tags,
      'order': this.order,
      'page': 1,
      'pagesize': this.pageSize
    }
    vm.$http({
      url: '//moment.snail.com/api/v1/post/list-of-circle-post',
      method: 'jsonp',
      params: Jdata,
      jsonp: 'callback',
      emulateJSON: true,
      headers: {
        'Content-Type': 'x-www-from-urlencoded'
      }
    }).then(function (res) {
      for (var i in res.data.list) {
        res.data.list[i]['flag'] = false
        res.data.list[i]['showindex'] = 0
      }
      this.list = res.data.list
      this.all = res.data.totalPage
      if (res.data.totalPage === 0) {
        this.all = 1
      }
    })
    vm.$http({
      url: '//moment.snail.com/api/v1/circle/all-tags',
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
      this.allTags = res.body.tags
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   @import '../sass/stylesheets/SocialIndexList.css'
</style>
