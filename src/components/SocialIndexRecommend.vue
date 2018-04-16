<template>
  <div class="SocialIndexRecommend bgWhite" id="SocialIndexRecommend">
    <div class="MoudleHd">
      圈子推荐
      <a href="javascript:;" class="Switch fr" @click="SwitchQz(onPage)" wn_tj_click_href wn_tj_click_gameId wn_tj_click_excel="community_change" wn_tj_click_id>换一换</a>
    </div>
    <div class="RecommentList clearfix">
       <ul>
           <li v-for="(list,temp) in list" :data-qzid="list.id">
               <div class="ListGameName fl">
                   <img :src="list.icon" class="fl" alt="刷新查看"/>
                   <div class="NameBox fl">
                      <router-link :to="{ name: 'circle', params: {'circleId':list.id}}" :title="list.name" class="qzname textOverFlow" wn_tj_click_gameId wn_tj_click_href wn_tj_click_excel="community_recommendation" :wn_tj_click_id="list.id">{{list.name}}</router-link>
                      <h6 :title="list.description">{{list.description}}</h6>
                   </div>
               </div>
               <div class="ListGameBtn fr">
                   <a href="javascript:;" class="R_Join" v-if="!list.isJoined" @click="JoinQz(list.id,temp)" wn_tj_click_gameId wn_tj_click_href wn_tj_click_excel="join_community" :wn_tj_click_id="list.id"><img src="../images/icon3.png"/>加入</a>
                   <a href="javascript:;" class="R_nJoin" v-if="list.isJoined" @click="QuitQz(list.id,temp)"><span>已加入</span><span>退出</span></a>
               </div>
           </li>
       </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SocialIndexRecommend',
  data () {
    return {
      list: [],
      onPage: 1,
      allPage: 1,
      isJoined: false
    }
  },
  methods: {
    ShowLoginPop: function () {
      document.getElementById('login_pop').style.display = 'block'
      document.getElementById('stone_mask').style.display = 'block'
    },
    SwitchQz: function (qzId) {
      if (this.onPage < this.allPage) {
        this.onPage++
      } else {
        this.onPage = 1
      }
      const vm = this
      vm.$http({
        url: '//moment.snail.com/api/v1/circle/recommend-circles',
        method: 'jsonp',
        params: {'page': this.onPage},
        jsonp: 'callback',
        emulateJSON: true,
        headers: {
          'Content-Type': 'x-www-from-urlencoded'
        }
      }).then(function (res) {
        for (var i in res.data.list) {
          res.data.list[i]['isJoined'] = false
        }
        this.list = res.data.list
        this.allPage = res.data.totalPage
      })
    },
    // Join quanzi
    JoinQz: function (qzId, temp) {
      if (document.getElementById('pdLogin').value === 'true') {
        let JoinUrl = '//moment.snail.com/api/v1/circle/join'
        this.JoinState(qzId, JoinUrl, 'join', temp)
      } else {
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
          this.list[temp]['isJoined'] = true
        } else if (flag === 'quit') {
          this.list[temp]['isJoined'] = false
        }
      })
    }
  },
  created: function () {
    const vm = this
    vm.$http({
      url: '//moment.snail.com/api/v1/circle/recommend-circles',
      method: 'jsonp',
      params: {'page': 1},
      jsonp: 'callback',
      emulateJSON: true,
      headers: {
        'Content-Type': 'x-www-from-urlencoded'
      }
    }).then(function (res) {
      for (var i in res.data.list) {
        res.data.list[i]['isJoined'] = false
      }
      this.list = res.data.list
      this.allPage = res.data.totalPage
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../sass/stylesheets/ScoialIndexRecommend.css'
</style>
