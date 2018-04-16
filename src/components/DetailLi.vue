<template>
 <li class="clearfix bgWhite ListContUlLi">
                    <div class="Jitems">
                      <div class="JitemsLeft fl">
                        <div class="J-UserInfo">
                           <div class="J-UserInfo-Pic"><img src="./images/hd.jpg" /></div>
                           
                           <span class="J-UserInfo-Name">管理远阿德管理远阿德</span>
                           <span class="J-UserInfo-adminCall">管理员</span>
                        </div>
                      </div>
                      <div class="JitemsRight fr">
                          <div class="J-TextCont">
                              <img src="./images/1.jpg"/>
                              那么《绝地求生》游戏有多火呢？
                          </div>
                          <div class="J-ClickUp J-On">
                              <p></p>
                              <p>500</p>
                          </div>
                          <div class="J-Modle clearfix">
                              <div class="J-Modle-Hd">
                                  <div class="Hd-Floor fl"><span>2楼</span>10-12 20：23</div>
                                  <div class="Hd-Moudle fr">
                                    <ol>
                                       <li><span class="PostManagement"><img src="./images/icon12.png"/>帖子管理<i class="rotate"></i></span></li>
                                       <li><span class="Hd-Moudle-Del">删除</span></li>  
                                       <li><span class="Hd-Moudle-Report">举报</span></li>
                                       <li><span class="Hd-Moudle-Reply"><img src="./images/icon6.png"/>收起回复<b>（6）</b></span></li>
                                       <li><span class="Hd-Moudle-Praise"><img src="./images/icon11.png"/>赞</span></li>
                                    </ol>
                                  </div>
                              </div>
                              <div class="J-Moudle-List">
                                  <div class="J-Moudle-List-Cont clearfix">
                                       <ul>
                                          <li class="">
                                              <div class="Jmoude-items clearfix">
                                                  <div class="Jmoude-items-Pic fl"><img src="./images/hd.jpg"/></div>
                                                  <div class="Jmoude-items-Cont fr">
                                                    <div class="Jmoudle-items-h5">
                                                        <a href="javascript:;">逆风学长：</a><span>据相关媒体报道，沈阳通用航空产业基地于2010年开始建设，目前规划面积68平方公里，入驻通航企业近20家，已完成跑道、航站楼、停机坪、机库、路网、管网等设施建设，开放空域在3000米以下、3000平方公里以上，正在打造通用飞机(无人机)研发生产、检测试飞及航材生产基地，建设无人机产业园、航空新材料产业园。</span>
                                                    </div>
                                                    <div class="Jmoudle-items-info">
                                                        <span class="fl">25分钟前</span>
                                                        <span class="fr cur">回复</span>
                                                    </div>
                                                  </div>     
                                              </div>
                                          </li>
                                           <li class="">
                                              <div class="Jmoude-items clearfix">
                                                  <div class="Jmoude-items-Pic fl"><img src="./images/hd.jpg"/></div>
                                                  <div class="Jmoude-items-Cont fr">
                                                    <div class="Jmoudle-items-h5">
                                                        <a href="javascript:;">逆风学长：</a>回复<span><a href="javascript:;">逆风学长：</a>据相关媒体报道，沈阳通用航空产业基地于2010年开始建设，目前规划面积68平方公里，入驻通航企业近20家，已完成跑道、航站楼、停机坪、机库、路网、管网等设施建设，开放空域在3000米以下、3000平方公里以上，正在打造通用飞机(无人机)研发生产、检测试飞及航材生产基地，建设无人机产业园、航空新材料产业园。</span>
                                                    </div>
                                                    <div class="Jmoudle-items-info">
                                                        <span class="fl">25分钟前</span>
                                                        <span class="fr cur">回复</span>
                                                    </div>
                                                  </div>     
                                              </div>
                                          </li>
                                       </ul>
                                       <div class="J-Moudle-List-Cont-Jet">
                                            <span class="J-Moudle-List-More fl cur">查看更多</span>
                                            <div class="J-Moudle-Page fl"></div>
                                            <div class="J-Moudle-Mebtn fr cur">我也说一句</div>
                                       </div>
                                  </div>
                                  <div class="J-Moudle-List-Input">
                                      <div class="J-Moudle-List-Input-Box">
                                          <input type="text" placeholder="回复 逆风学长："/>
                                      </div>
                                      <div class="J-Moudle-List-Input-Set">
                                          <div class="J-M-l-I-S-Icon cur fl">
                                              <img src="./images/icon13.png"/>
                                              <div class="Icon-List none"></div>
                                          </div>
                                          <span class="J-M-L-Btn cur fr">发表</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </div>
                </li>
  </div>
</template>
<script>
export default {
  name: 'pager',
  props: {
    // 用于记录总页码，可由父组件传过来
    pageNo: {
      type: Number,
      default: 1
    },
    // 用于记录当前页数，这个与父组件进行数据交互来完成每一页的数据更新，所以我们只要改变current的值来控制整个页面的数据即可
    current: {
      type: Number,
      default: 1
    }
  },
  data: function () {
    return {
      // 用于判断省略号是否显示
      backClipped: true,
      preClipped: false
    }
  },
  methods: {
    prePage () {
      // 上一页
      // if (current !== 1) {
      this.current--
      // }
    },
    nextPage () {
      // 下一页
      // if (current < this.pageNo) {
      this.current++
      // }
    },
    goPage (index) {
      // 跳转到相应页面
      if (index !== this.current) {
        this.current = index
      }
    }
  },
  computed: {
    // 使用计算属性来得到每次应该显示的页码
    pages: function () {
      let ret = []
      if (this.current > 3) {
        // 当前页码大于三时，显示当前页码的前2个
        ret.push(this.current - 2)
        ret.push(this.current - 1)
        if (this.current > 4) {
          // 当前页与第一页差距4以上时显示省略号
          this.preClipped = true
        }
      } else {
        this.preClipped = false
        for (let i = 2; i < this.current; i++) {
          ret.push(i)
        }
      }
      if (this.current !== this.pageNo && this.current !== 1) {
        ret.push(this.current)
      }
      if (this.current < (this.pageNo - 2)) {
        // 显示当前页码的后2个
        ret.push(this.current + 1)
        ret.push(this.current + 2)
        if (this.current <= (this.pageNo - 10)) {
          // 当前页与最后一页差距3以上时显示省略号
          this.backClipped = true
        }
      } else {
        this.backClipped = false
        for (let i = (this.current + 1); i < this.pageNo; i++) {
          ret.push(i)
        }
      }
      // 返回整个页码组
      return ret
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .pager {
      text-align: center;
      font-size: 0;
      margin-top:10px;
    }
    .pager a,.pager button{
      display: inline-block;
      width: 36px;
      height: 36px;
      line-height: 36px;
      font-size: 12px;
      color: rgb(167, 167, 167);
      background: #fff;
      border: 1px solid rgb(238, 240, 241);
      border-right:none;
    }
    .pager a:last-child{
       border-right: 1px solid rgb(238, 240, 241);
    }
    .btnPager:hover {
      background-color: #f2f2f2;
    }
    .pager .active,
    .pager .pageIndex:hover{
      color: #fff;
      border-color:rgb(0, 170, 255);
      background: rgb(0, 170, 255);
    }
    .pager button{
      position: relative;
      top:1px;
      width: 38px;
      height: 38px;
    }
    .pager .default{
      background:#f2f2f2;
      cursor: not-allowed;
    }
</style>
