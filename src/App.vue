<template>
  <div id="app" class="app clearfix">
    <input type="hidden" id="pdLogin" value="sdd"/>
    <router-view :key="key"></router-view>
  </div>
</template>

<script>
// import statistics from 'http://static.snail.com/js/stone/v2/statistics_ty_v2.source.js'
export default {
  name: 'app',
  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  },
  mounted () {
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.src = 'http://static.snail.com/js/stone/v2/statistics_ty_v2.source.js'
    document.body.appendChild(s)
  },
  created: function () {
    var vm = this
    vm.$http({
      url: '//moment.snail.com/api/v1/user/info',
      method: 'jsonp',
      jsonp: 'callback',
      emulateJSON: true,
      headers: {
        'Content-Type': 'x-www-from-urlencoded'
      }
    }).then(function (res) {
      if (res.data.code === 200) {
        document.getElementById('pdLogin').value = 'true'
      } else {
        document.getElementById('pdLogin').value = 'false'
      }
    })
  }
}
</script>

<style >
   @import './sass/stylesheets/SocialPublic.css'
</style>