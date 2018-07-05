<template>
  <div class="IndexList" id="IndexList">
      <div class="IndexListType clearfix" id="IndexListType">
         <div class="TypeTag fl">
             <ul>
                 <li>
                    热门动态
                 </li>
             </ul>
         </div>
      </div>
      <div class="IndexListCont">
        <ul>
          <li v-for="(list, i) in list" :data-listId="list.circle_id">
            <div class="Jitems">
              <div class="Jitems-Name">
                <img :src="list.circle_logo" class="qzicon fl"/>
                <router-link class ="Qzname fl" :to="{ name: 'circle', params: {'circleId':list.circle_id}}" :title="list.circle_name" :circleId="list.circle_id">{{list.circle_name}}</router-link>
                <a href="javascript:;" class="Indexlist_join" @click="JoinQz(list.circle_id, i)" v-show="!list.circle_is_joined" wn_tj_click_href wn_tj_click_gameId wn_tj_click_excel="join_community" :wn_tj_click_id="list.circle_id"><img src="../images/icon3.png"/>加入</a>
                <a href="javascript:;" class="Indexlist_ujoin" @click="QuitQz(list.circle_id, i)"  v-show="list.circle_is_joined"><span>已加入</span><span>退出</span></a>
              </div>
              <div class="Jitems-Title">
                <router-link :to="{ name: 'post', params: {'circleId':list.circle_id,'postId': list.id,'onPage':1}}" :title="list.title" :listId="list.id" wn_tj_click_href wn_tj_click_gameId wn_tj_click_excel="news_headlines" :wn_tj_click_id="list.id">{{list.title}}</router-link>
              </div>
              <div class="Jitems-Detail">
                  <h5 class="Jitems-Detail-text" v-html="list.text"></h5>
                  <div class="Jitems-Detail-img clearfix">
                      <div class="JDICont">
                         <div class="imgList" v-for="(img, index) in list.images" @click="ShowBigPic($event,index,i)">
                            <div class="imgfd"></div>
                            <img :src="img + '?x-oss-process=image/resize,h_110'" alt="点击加载图片"/>
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
                  </div>
              </div>
              <div class="Jitems-Info">
                  <div class="JuserInfo fl">
                      <a href="javascript:;" class="JuserInfo-people" :title="list.user_nickname">
                          {{list.user_nickname}}
                      </a>
                      <span class="JuserInfo-time" :title="list.created_at">{{list.created_at}}</span>
                  </div>
                  <router-link class="JdataInfo fr" :to="{ name: 'post', params: {'circleId':list.circle_id,'postId': list.id}}">
                     <span class="Jview"><img src="../images/icon4.png"/>{{list.view_count}}</span>
                     <span class="Jreply"><img src="../images/icon5.png"/>{{list.comment_count}}</span>
                  </router-link>
              </div>
            </div>
          </li>       
        </ul>
        <div class="drownbox">
            <span :class="{goDrown : drownReflush === true}" v-show="drownReflushText"  wn_tj_click_gameId wn_tj_click_href wn_tj_click_excel="more" wn_tj_click_id @click="more">{{drownReflush === true ? '加载更多' : '没有更多了'}}</span>
            <div :class="['spinner8',{none:load === false}]">
              <div class="spinner-container container1">
                <div class="circle1">&nbsp;</div>
                <div class="circle2">&nbsp;</div>
                <div class="circle3">&nbsp;</div>
                <div class="circle4">&nbsp;</div>
              </div>
              <div class="spinner-container container2">
                <div class="circle1">&nbsp;</div>
                <div class="circle2">&nbsp;</div>
                <div class="circle3">&nbsp;</div>
                <div class="circle4">&nbsp;</div>
              </div>
              <div class="spinner-container container3">
                <div class="circle1">&nbsp;</div>
                <div class="circle2">&nbsp;</div>
                <div class="circle3">&nbsp;</div>
                <div class="circle4">&nbsp;</div>
              </div>
            </div>
        </div>
      </div>
      <div class="selectMask" v-show="isSelectMask" @click="closeSelect()"></div>
  </div>
</template>
<script>
import pagination from './pagination.vue'
export default {
  name: 'IndexList',
  components: {
    pagination: pagination
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
      circleId: '',
      cur: 1,
      all: 1,
      pageSize: 10,
      showFlag: -1,
      tumbCurrent: 0,
      show: false,
      scrolled: false,
      isJump: true,
      isSelectMask: false,
      drownReflushText: true,
      drownReflush: true,
      load: false
    }
  },
  methods: {
    ShowLoginPop: function () {
      document.getElementById('login_pop').style.display = 'block'
      document.getElementById('stone_mask').style.display = 'block'
    },
    // Join quanzi
    JoinQz: function (qzId, temp) {
      if (document.getElementById('pdLogin').value === 'true') {
        let JoinUrl = '//moment.snail.com/api/v1/circle/join'
        this.JoinState(qzId, JoinUrl, 'join', temp)
      } else {
        // alert('清闲登陆1')
        this.ShowLoginPop()
      }
    },
    QuitQz: function (qzId, temp) {
      if (document.getElementById('pdLogin').value === 'true') {
        let QuitUrl = '//moment.snail.com/api/v1/circle/leave'
        this.JoinState(qzId, QuitUrl, 'quit', temp)
      } else {
        this.ShowLoginPop()
      }
    },
    JoinState: function (qzId, url, flag, temp) {
      const vm = this
      vm.$http({
        url: url,
        method: 'jsonp',
        params: {'circle_id': qzId},
        jsonp: 'callback',
        emulateJSON: true,
        headers: {
          'Content-Type': 'x-www-from-urlencoded'
        }
      }).then(function (res) {
        if (flag === 'join') {
          this.list[temp].circle_is_joined = true
        } else if (flag === 'quit') {
          this.list[temp].circle_is_joined = false
        }
      })
    },
    more: function () {
      if (this.drownReflush === true) {
        if (this.cur < this.all) {
          this.ShowHtml(++this.cur)
        } else {
          this.load = false
          this.drownReflush = false
          this.drownReflushText = true
        }
      } else {
        this.load = false
        this.drownReflush = false
        this.drownReflushText = true
      }
    },
    handleScroll: function (scroll) {
      this.scrolled = window.scrollY
      if (this.cur < this.all) {
        if (this.scrolled >= document.documentElement.scrollHeight - 959) { // 下拉刷新
          this.load = true
          this.drownReflushText = false
          let _this = this
          setTimeout(function () {
            _this.ShowHtml(++_this.cur)
          }, 1000)
        }
      } else { // 没有 择显示没有了
        this.load = false
        this.drownReflush = false
        this.drownReflushText = true
      }
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
    ShowHtml: function (page) {
      const vm = this
      const Jdata = {
        'page': page
      }
      vm.$http({
        url: '//moment.snail.com/api/v1/post/list-of-hot-circle-post',
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
          this.list.push(res.data.list[i])
        }
        this.all = res.data.totalPage
        if (res.data.totalPage === 0 || res.data.totalPage < 2) {
          this.all = 1
          this.load = false
          this.drownReflushText = true
          this.drownReflush = false
        } else {
          this.load = false
          this.drownReflush = true
          this.drownReflushText = true
        }
      })
    }
  },
  created: function () {
    this.circleId = this.$route.params.circleId
    window.addEventListener('scroll', this.handleScroll)
    const vm = this
    const Jdata = {
      'page': 1
    }
    vm.$http({
      url: '//moment.snail.com/api/v1/post/list-of-hot-circle-post',
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
      if (res.data.totalPage === 0 || res.data.totalPage < 2) {
        this.all = 1
        this.drownReflush = false
        this.drownReflushText = false
      }
    })
  }
}
</script>
<style scoped>
   @import '../sass/stylesheets/IndexList.css'
</style>
