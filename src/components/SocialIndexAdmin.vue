<template>
  <div id="SocialIndexAdmin" class="SocialIndexAdmin bgWhite">
     <div class="MoudleHd">
        管理团队
        <a href="javascript:;" class="ApplyAdmin fr" @click="judgeInfo" wn_tj_click_href wn_tj_click_gameId wn_tj_click_excel="moderator_recruitment" :wn_tj_click_id="circleId" v-if="!HdInfoData.is_admin">申请管理员</a>
     </div>
     <div class="SocialIndexAdmin-Cont clearfix">
        <ul>
           <li v-for="list in HdInfoData.adminUserInfo">
              <a href="javascript:;" class="default" :data-adminId="list.id" :data-adminUuid="list.uuid" :title="list.nickname">
                  <img :src="list.photo" class="adminPic"/>
                  <span class="adminName" :title="list.nickname">{{list.nickname}}</span>
              </a>
           </li>
        </ul>
     </div>
     <div class="rulePop" v-if="ismask">
        <div class="rulePop-Hd">
          申请管理员<img src="../images/close.png" class="fr cur" alt="关闭" @click="closePop()"/>
        </div>
        <div class="rulePop-Cont">
          <div class="r-setp r-setpA" v-if="setpA">
            <h3>管理员守则</h3>
            <div class="overText">
              <h4>圈子管理员职责：</h4>
              <h5>1.  建立各个圈子的置顶规则，如加精规则、违规处罚规则等。</h5>
              <h5>2.  积极活跃圈子讨论和交流气氛，组织大家参与或开展各种圈子讨论话题，为玩家建立和维护一个良好的交流环境，吸引更多的用户加入进来，并保持圈子的活跃。</h5>
              <h5>3.  积极挖掘优秀内容，尊重作者劳心劳力之贡献，并将其中优秀帖子加精华给予鼓励。</h5>
              <h5>4.  保证圈子内容质量，及时对圈子内的不良信息进行处理，如广告、黄赌毒、政治敏感、侵权、不实信息等。</h5>
              <h5>5.  收集论坛的缺点和网友的意见和建议，每月月底反馈。</h5>
              <h5>6.  每天坚持登录自己所管辖的圈子，保证每周有5条主题更新（内容可长可短，形式可多样，可以像微博一样一个讨论的话题，也可以是一篇攻略，或是转载的图文等），每周保持Stone在线10小时以上。</h5>
              <h5>7.  申请圈子管理员的玩家请保证提交材料真实可信。</h5>
            </div>
          </div>
          <div class="r-setp r-setpB" v-if="setpB">
            <h3>申请资料</h3>
            <div class="r-setpList">
              <p class="r-setpList-Name">申请人账号：</p>
              <p class="r-setpList-Cont">{{applyInfo.username}}</p>
            </div>
            <div class="r-setpList">
              <p class="r-setpList-Name">申请人昵称：</p>
              <p class="r-setpList-Cont">{{applyInfo.nickname}}</p>
            </div>
            <div class="r-setpList">
              <p class="r-setpList-Name">圈子名称：</p>
              <p class="r-setpList-Cont yellowColor">{{applyInfo.circle_name}}</p>
            </div>
            <div class="r-setpList">
              <p class="r-setpList-Name">联系方式：</p>
              <p class="r-setpList-Cont"><input type="text" placeholder="手机/QQ号/微信号" id="applyContact" @focus="removeTs"/></p>
            </div>
            <div class="r-setpList clearfix">
              <p class="r-setpList-Name">申请理由：</p>
              <p class="r-setpList-Cont"><textarea id="applyReason" @focus="removeTs" placeholder="例如：                                            方舟玩过1000小时，有贴吧管理员经验等等。"></textarea></p>
            </div>
            <span class="ruleerrts" v-if="error">{{errorText}}</span>
          </div>
          <div class="r-setp r-setpC mt60" v-if="setpC">
            <img src="../images/rss.png"/>
            <p>资料已成功提交<br/>工作人员会尽快联系您</p>
          </div>
          <div class="r-setp r-setpD mt60" v-if="setpD">
            <img src="../images/rm.png"/>
            <p v-html="overText"></p>
          </div>
          <div class="r-setp r-setpD mt60" v-if="setpE">
            <img src="../images/rm.png"/>
            <p>您尚未加入圈子<br/>请先加入圈子~</p>
          </div>
        </div>
        <div class="rulePop-Bt">
          <span class="ruleSure cur" @click="btnClick()" v-if="sureBtn">{{ruleText}}</span>
          <span class="ruleCannle cur" @click="closePop()" v-if="chanBtn">再想想</span>
        </div>
     </div>
     <div class="divmask" v-if="ismask"></div>
  </div>
</template>

<script>
export default {
  name: 'SocialIndexAdmin',
  props: {
    HdInfoData: {
      type: Object
    }
  },
  data () {
    return {
      ismask: false,
      circleId: '',
      ruleText: '同意',
      geturl: 'http://moment.snail.com/api/v1/circle/admin-apply-info',
      posturl: 'http://moment.snail.com/api/v1/circle/admin-apply',
      setpA: false,
      setpB: false,
      setpC: false,
      setpD: false,
      setpE: false,
      sureBtn: true,
      chanBtn: true,
      status: 'setpA',
      applyInfo: [],
      error: false,
      errorText: '请完整填写联系方式和申请理由！',
      overText: '您的申请正在审核<br/>请耐心等待~'
    }
  },
  methods: {
    ShowLoginPop: function () {
      document.getElementById('login_pop').style.display = 'block'
      document.getElementById('stone_mask').style.display = 'block'
    },
    Apply: function () {
      var _this = this
      _this.ismask = true
    },
    closePop: function () {
      var _this = this
      _this.ismask = false
    },
    removeTs: function () {
      const _this = this
      _this.error = false
    },
    btnClick: function () {
      const _this = this
      if (_this.status === 'setpA') {
        _this.setpB = _this.sureBtn = true
        _this.ruleText = '提交'
        _this.status = 'setpB'
        _this.setpA = _this.setpC = _this.setpD = _this.chanBtn = _this.setpE = false
      } else if (_this.status === 'setpB') {
        if (document.getElementById('applyContact').value !== '' && document.getElementById('applyReason').value !== '') {
          _this.postInfo(document.getElementById('applyContact').value, document.getElementById('applyReason').value)
        } else {
          _this.error = true
          _this.errorText = '请完整填写联系方式和申请理由！'
        }
      } else if (_this.status === 'setpC') {
        _this.ismask = false
      } else if (_this.status === 'setpD' || _this.status === 'setpE') {
        _this.ismask = false
      }
    },
    judgeInfo: function () {
      if (document.getElementById('pdLogin').value === 'true') {
        this.judgeInfoClick()
      } else {
        this.ShowLoginPop()
      }
    },
    judgeInfoClick: function () {
      const _this = this
      _this.$http({
        url: _this.geturl,
        method: 'jsonp',
        params: {'circle_id': _this.circleId},
        jsonp: 'callback',
        emulateJSON: true,
        headers: {
          'Content-Type': 'x-www-from-urlencoded'
        }
      }).then(function (res) {
        console.log(res.body.code)
        if (res.body.code === 40004) { // 已申请
          _this.ismask = true
          _this.ruleText = '关闭'
          _this.status = 'setpD'
          _this.setpD = _this.sureBtn = true
          _this.setpB = _this.setpC = _this.setpA = _this.chanBtn = _this.setpE = false
        } else if (res.body.code === 40006) { // 已申请在申请其他圈子
          _this.ismask = true
          _this.ruleText = '关闭'
          _this.status = 'setpD'
          _this.overText = '已有其他申请正在审核<br/>请耐心等待~'
          _this.setpD = _this.sureBtn = true
          _this.setpB = _this.setpC = _this.setpA = _this.chanBtn = _this.setpE = false
        } else if (res.body.code === 40003) { // 未加入
          _this.ismask = true
          _this.ruleText = '关闭'
          _this.status = 'setpE'
          _this.setpE = _this.sureBtn = true
          _this.setpB = _this.setpC = _this.setpA = _this.chanBtn = _this.setpD = false
        } else if (res.body.code === 40005) { // 已经是管理员
          window.location.href = window.location.href
        } else if (res.body.code === 200) {
          _this.applyInfo = res.body.info
          _this.ismask = true
          _this.status = 'setpA'
          _this.ruleText = '同意'
          _this.setpA = _this.sureBtn = _this.chanBtn = true
          _this.setpB = _this.setpC = _this.setpD = _this.setpE = false
        }
      })
    },
    postInfo: function (applyContact, applyReason) {
      const _this = this
      _this.$http({
        url: _this.posturl,
        method: 'jsonp',
        params: {
          'circle_id': _this.circleId,
          'contact': applyContact,
          'reason': applyReason
        },
        jsonp: 'callback',
        emulateJSON: true,
        headers: {
          'Content-Type': 'x-www-from-urlencoded'
        }
      }).then(function (res) {
        if (res.body.code === 200) {
          console.log(res)
          _this.status = 'setpC'
          _this.ruleText = '关闭'
          _this.setpC = _this.sureBtn = true
          _this.setpB = _this.setpA = _this.setpD = _this.chanBtn = false
        } else {
          _this.error = true
          _this.errorText = res.body.message
        }
      })
    }
  },
  created: function () {
    this.circleId = this.$route.params.circleId
  }
}
</script>
<style scoped>
   @import '../sass/stylesheets/SocialIndexAdmin.css'
</style>
