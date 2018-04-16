<template>
  <div class="HdInfo clearfix">
    <div class="SiH-Info fl" :data-QzId="HdInfoData.id" :data-gameId="HdInfoData.game_id">
        <img :src="HdInfoData.icon" class="SiH-Info-Pic fl"/>
        <div class="SiH-Info-name fl">
            <div class="Hname">
                <!-- <h5 class="fl" :title="HdInfoData.name" :to="{ name: 'circle', params: {'circleId':HdInfoData.id}}">{{HdInfoData.name}}</h5> -->
                <router-link class="fl h5" :to="{ name: 'circle', params: {'circleId':HdInfoData.id}}" :title="HdInfoData.name">{{HdInfoData.name}}</router-link>
                <a href="javascript:;" class="HnameBtnOn fl" v-if="this.HdInfoData.is_joined" @click="QuitQz(HdInfoData.id)" data-text="退出"><span>已加入</span><span>退出</span></a>
                <a href="javascript:;" class="HnameBtnUn fl" v-if="!this.HdInfoData.is_joined" @click="JoinQz(HdInfoData.id)" wn_tj_click_href wn_tj_click_gameId wn_tj_click_excel="join_community" :wn_tj_click_id="HdInfoData.id"><img src="../images/icon3.png"/>加入</a>
            </div>
            <h4 class="Htitle" :title="HdInfoData.description">{{HdInfoData.description}}</h4>
        </div>
    </div>
    <div class="SiH-Href fr" v-show="isSiH">
        <a :href="HdInfoData.shop_url" class="goShop fr" :wn_tj_click_href="HdInfoData.shop_url" wn_tj_click_gameId wn_tj_click_excel="mall_entrance" wn_tj_click_id>商店</a>
        <!-- <a :href="HdInfoData.shop_url" class="goShop fr">商店</a> -->
        <div class="SiH-Launch fr animation" @click="goDiscussion(HdInfoData.id)">
          <!-- <img src="../images/icon.png"/>发起讨论 -->
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SocialIndexHeader',
    props: ['HdInfoData', 'isSiH'],
    data () {
      return {
        isJoined: this.HdInfoData.is_joined,
        joinText: '已加入'
      }
    },
    watch: {
      HdInfoData: function (value) {}
    },
    methods: {
      ShowLoginPop: function () {
        document.getElementById('login_pop').style.display = 'block'
        document.getElementById('stone_mask').style.display = 'block'
      },
      dataDetails: function () {
        this.joinText = '退出'
      },
      // 发起讨论
      goDiscussion: function (qzId) {
        if (document.getElementById('pdLogin').value === 'true') {
          this.$router.push({name: 'SocialPost', params: {circleId: qzId}})
        } else {
          this.ShowLoginPop()
        }
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
      JoinState: function (qzId, url, flag) {
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
            this.HdInfoData.is_joined = true
          } else if (flag === 'quit') {
            this.HdInfoData.is_joined = false
          }
        })
      }
    },
    created: function () {}
  }
</script>
<style scoped>  
    @import '../sass/stylesheets/SocialIndexHeader.css'
</style>
