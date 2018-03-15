<style lang="less">
  @import url(~assets/css/variable.less);
  .dialog-container { 
    position:fixed; top:0; left:0; width:100vw; height:100vh; 
    background-color: rgba(0,0,0,.3);
  }
  #dialog-cities {
    @gap-s:5px;
    @gap-n:15px;
    @gap-outer:20px;
    .inner-wrapper {
      position:relative;
      margin:20px;
      height:calc(~"100vh - 20px * 2");
      background-color:#fff;
      border-radius:5px;
      .scroll;
    }
    h3 { padding:@gap-s @gap-n; background-color:@color-border-lighter; }
    #hot-cities {
      ul { 
        .flow(row,wrap); padding:@gap-s 0; border-bottom:1px solid @color-border-base;
        li { margin:3px @gap-s; padding:@gap-s @gap-n; border-radius:@gap-n; border:1px solid @color-border-light; }
      }
    }
    #all-cities {
      .list { 
        padding:0 @gap-n; 
        li { 
          padding:@gap-n 0; 
          &:not(:last-child) { border-bottom:1px solid @color-border-base; }
        }
      }
    }
    #anchors { 
      position:absolute; right:@gap-outer; top:50%; transform:translate3d(0,-50%,0);
      li {
        width:30px; height:30px; line-height:30px; text-align:center;
      }
    }
  }
</style>
<template>
  <div id="page-home">
    <div id="dialog-cities" class="dialog-container">
      <div class="inner-wrapper">
        <div id="hot-cities">
          <h3>热门城市</h3>
          <ul class="list">
            <li v-for="(c,i) in hotCities" :key="`hc${i}`" @click="selectCity(c.cityId)">
              {{c.cityName}}
            </li>
          </ul>
        </div>
        <div id="all-cities">
          <template v-for="(s,i) in cities">
            <h3 :ref="`letter-${s.letter}`" :key="`act${i}`">{{s.letter}}</h3>
            <ul class="list" :key="`acl${i}`">
              <li v-for="(c,j) in s.data" :key="`acc${j}`" @click="selectCity(c.id)">
                {{c.name}}
              </li>
            </ul>
          </template>
        </div>
      </div>
      <ul id="anchors">
        <li v-for="(s,i) in cities" 
          @click="scrollToAnchor(s.letter)"
          :key="`aca${i}`"
        >{{s.letter}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import pinyinUtil from '../static/js/pinyinUtil.js'
export default {
  data () {
    return {
      cities   :[],
      hotCities:[]
    }
  },
  methods: {
    getFirstLetter (word) {
      return pinyinUtil.getFirstLetter(word)
    },
    selectCity (name) {
      // city.name||city.cityName; city.id||city.cityId;
      console.log(name)
    },
    scrollToAnchor (name) {
      this.$refs['letter-'+name][0].scrollIntoView()
    }
  },
  created () {
    let allCities = []
    Promise.all([
      this.$http.post('getHotCities'),
      this.$http.post('getCities')
    ])
    .then(resps => {
      if ( resps.some(r=>r.state!==1) ) throw 'data error'
      this.hotCities = resps[0].data.list;
      let allCities    = []
      let allCitiesMap = {}
      let letters      = ''
      let letter       = ''
      // 按首字母摘取
      resps[1].data.areaList.forEach((area)=> { // 区域
        (area.children || []).forEach(contry => { // 国家
          (contry.children || []).forEach(city => { // 城市
            letters = this.getFirstLetter(city.name)
            letter  = letters[0]
            city.firstLetter = letters
            allCitiesMap[letter] = allCitiesMap[letter] || {letter, data:[]},
            allCitiesMap[letter].data.push(city)
          })
        })
      });
      // 转成有序数组
      for( let key in allCitiesMap ) {
        allCities.push( allCitiesMap[key] )
      }
      // 外排序
      allCities.sort((c,n)=>c.letter.charCodeAt(0)-n.letter.charCodeAt(0));
      // 内排序
      allCities.forEach((s)=>{
        s.data.sort((c,n)=>{
          return c.firstLetter.split('').reduce((acc,c,idx)=>acc+c.charCodeAt(0)*Math.pow(10,-idx),0) - 
            n.firstLetter.split('').reduce((acc,c,idx)=>acc+c.charCodeAt(0)*Math.pow(10,-idx),0)
        })
      })
      this.cities = allCities;
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>