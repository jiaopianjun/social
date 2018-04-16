<template>
    <div class="Jlist-thumb clearfix" v-if="imagesList != ''" v-show="Flag">
      <div class="thumbHd"><a href="javascript:;" class="j_retract" @click="hidePic($event)"><i class="icon_retract"></i>收起</a> </div>
      <div class="thumbWarp">
          <div :class="['thumbWarpList',{none: tumbCurrent != index }]" v-for="(img, index) in imagesList" >
            <div class="thumbPrev" v-if="index != 0" :data-cur="index-1" @click="thumbPrev(index)"></div>
            <img :src="img" alt="刷新查看" @click="hidePic2($event)"/>
            <div class="thumbNext" v-if="imagesList.length-1 != index" :data-cur="index+1" @click="thumbNext(index)"></div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Jlistthumb',
  props: ['imagesList', 'isCurrent', 'isFlag'],
  watch: {
    isCurrent: function () {
      // alert('ss')
      this.tumbCurrent = this.isCurrent
    },
    isFlag: function () {
      this.Flag = this.isFlag
    }
  },
  data () {
    return {
      list: this.imagesList,
      tumbCurrent: this.isCurrent,
      Flag: this.isFlag
    }
  },
  methods: {
    hidePic: function (event) {
      // event.target.parentNode.parentNode.style.display = 'none'
      this.Flag = false
    },
    hidePic2: function (event) {
      // event.target.parentNode.parentNode.parentNode.style.display = 'none'
      this.Flag = false
    },
    thumbNext: function (index) { // 缩略图
      this.tumbCurrent = index + 1
    },
    thumbPrev: function (index) {
      index = index - 1
      this.tumbCurrent = index
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
