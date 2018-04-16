<template>
  <div id="Index" class="Index">
     <div class="SocialIndexMain clearfix">
        <div class="MainList fl bgWhite">
            <IndexList></IndexList>
        </div>
        <div class="MainMoudle fr" id="MainMoudle">
          <PeoInfo :showMoreMyCircle.sync="showMoreMyCircle"></PeoInfo>
          <SocialIndexHot></SocialIndexHot>
          <SocialIndexRecommend></SocialIndexRecommend>
          <span class="goTop cur" v-show="isGoTop" @click="goTop()" style="bottom:145px;"></span>
        </div>
     </div>
     <LoginPop :ispop.sync="ispop"></LoginPop>
  </div>
</template>
<script>
  import PeoInfo from './components/PeoInfo.vue'
  import LoginPop from './components/LoginPop.vue'
  import SocialIndexHot from './components/SocialIndexHot.vue'
  import IndexList from './components/IndexList.vue'
  import SocialIndexRecommend from './components/SocialIndexRecommend.vue'
  export default {
    name: 'SocialIndex',
    components: {
      LoginPop: LoginPop,
      PeoInfo: PeoInfo,
      SocialIndexHot: SocialIndexHot,
      IndexList: IndexList,
      SocialIndexRecommend: SocialIndexRecommend
    },
    data () {
      return {
        HdInfoData: {},
        isShow: false,
        scrolled: false,
        isSiH: true,
        circleId: '',
        isGoTop: false,
        showMoreMyCircle: true,
        ispop: true
      }
    },
    ready () {
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
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
      handleScroll () {
        this.scrolled = window.scrollY
        // if (this.scrolled > 180) {
        //   document.getElementById('IndexListType').style.position = 'fixed'
        // } else {
        //   document.getElementById('IndexListType').style.position = 'static'
        // }
        if (this.scrolled > 900) {
          this.isShow = true
          this.isGoTop = true
          document.getElementById('SocialIndexRecommend').classList.add('fixed3')
          document.getElementById('PeoInfo').classList.add('hfixed')
        } else if (this.scrolled < 800) {
          document.getElementById('PeoInfo').classList.remove('hfixed')
          document.getElementById('SocialIndexRecommend').classList.remove('fixed3')
          this.isShow = false
          this.isGoTop = false
          this.showMoreMyCircle = true
        }
        if (document.documentElement.clientHeight < 700) {
          this.isGoTop = false
        }
      }
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    },
    created: function () {
      this.circleId = this.$route.params.circleId
      window.addEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style>
  
</style>
