<template>
  <div class="SocialIndexHot bgWhite" id="SocialIndexHot">
    <div class="MoudleHd">
      热门讨论
    </div>
    <div class="HotList clearfix">
      <ul>
        <li v-for="(list,temp) in list">
           <router-link :to="{ name: 'post', params: {'circleId':list.circle_id,'postId': list.id,'onPage':1}}" :title="list.title" :listId="list.id" wn_tj_click_gameId wn_tj_click_href wn_tj_click_excel="hot_posts" :wn_tj_click_id="list.id">
            <i class="fl">{{temp+1}}</i>
            <span class="fl" :title="list.title">{{list.title}}</span>
            <b class="fr">{{list.view_count}}</b>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SocialIndexHot',
  data () {
    return {
      list: [ ]
    }
  },
  created: function () {
    const vm = this
    vm.$http({
      url: '//moment.snail.com/api/v1/post/hot-circle-post-top-ten',
      method: 'jsonp',
      params: {'page': 1},
      jsonp: 'callback',
      emulateJSON: true,
      headers: {
        'Content-Type': 'x-www-from-urlencoded'
      }
    }).then(function (res) {
      this.list = res.data.list
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   @import '../sass/stylesheets/SocialIndexHot.css'
</style>
