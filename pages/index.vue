<style lang="less">
  @import url(~assets/css/variable.less);
  .dialog-container { 
    position:fixed; top:0; left:0; z-index:100; width:100vw; height:100vh; 
    background-color: rgba(0,0,0,.3);
  }
  #dialog-cities {
    @gap-s:5px;
    @gap-n:15px;
    @gap-outer:20px;
    .outer-wrapper {
      position:relative;
      margin:20px;
      height:calc(~"100vh - 20px * 2");
      border-radius:5px;
      .scroll;
    }
    .inner-wrapper {
      position:relative;
      background-color:#fff;
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
      <div class="outer-wrapper">
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
    // Promise.all([
    //   this.$http.post('getHotCities'),
    //   this.$http.post('getCities')
    // ])
    // .then(resps => {
        let resps = [{"state":1,"message":null,"data":{"list":[{"cityId":"t2101","cityName":"雅虎"},{"cityId":"t2102","cityName":"网景"},{"cityId":"CN54511","cityName":"北京"},{"cityId":"CN54512","cityName":"深圳"},{"cityId":"JA47771","cityName":"冲绳"},{"cityId":"TW59554","cityName":"台北"},{"cityId":"TW58968","cityName":"高雄"},{"cityId":"MY48647","cityName":"吉隆坡"},{"cityId":"JA47671","cityName":"东京"},{"cityId":"HK45007","cityName":"香港"},{"cityId":"JA47412","cityName":"大阪"},{"cityId":"JA47855","cityName":"北海道"},{"cityId":"TW46746","cityName":"基隆"},{"cityId":"TW59358","cityName":"金门"}]},"serverTime":1521099197552},{"state":1,"message":null,"data":{"areaList":[{"id":"1000","name":"新马泰","children":[{"id":"1100","name":"泰国","children":[{"id":"1101","name":"曼谷","children":[]},{"id":"1102","name":"普吉岛","children":[]},{"id":"1103","name":"清迈","children":[]}]},{"id":"1200","name":"马来西亚","children":[{"id":"1201","name":"吉隆坡","children":[]},{"id":"1202","name":"马六甲","children":[]},{"id":"1203","name":"沙巴","children":[]},{"id":"1204","name":"第二行","children":[]},{"id":"1205","name":"好多字好多字好多字","children":[]}]}]},{"id":"t3000","name":"测试3","children":[{"id":"t3100","name":"城市组","children":[{"id":"t3101","name":"有id城市","children":[]},{"id":"","name":"无id城市","children":[]}]}]},{"id":"t1000","name":"测试1-没有数据的试试","children":[]},{"id":"t2000","name":"测试2-公司","children":[{"id":"t2100","name":"互联网那些没落的公司","children":[{"id":"t2101","name":"雅虎","children":[]},{"id":"t2102","name":"网景","children":[]},{"id":"t2103","name":"人人网","children":[]},{"id":"t2104","name":"开心网","children":[]}]},{"id":"t2200","name":"无数据城市组","children":[]},{"id":"t2300","name":"还有一组","children":[{"id":"t2301","name":"小城市一个","children":[]}]}]},{"id":"t4000","name":"测试4-占位","children":[{"id":"t4010","name":"占位组","children":[{"id":"t4011","name":"占位城市","children":[]}]},{"id":"t4020","name":"占位组","children":[{"id":"t4021","name":"占位城市","children":[]}]},{"id":"t4030","name":"占位组","children":[{"id":"t4031","name":"占位城市","children":[]}]},{"id":"t4040","name":"占位组","children":[{"id":"t4041","name":"占位城市","children":[]}]},{"id":"t4050","name":"占位组","children":[{"id":"t4051","name":"占位城市","children":[]}]},{"id":"t4060","name":"占位组","children":[{"id":"t4061","name":"占位城市","children":[]}]},{"id":"t4070","name":"占位组","children":[{"id":"t4071","name":"占位城市","children":[]}]},{"id":"t4080","name":"占位组","children":[{"id":"t4081","name":"占位城市","children":[]}]},{"id":"t4090","name":"占位组","children":[{"id":"t4091","name":"占位城市","children":[]}]},{"id":"t4100","name":"占位组","children":[{"id":"t4101","name":"占位城市","children":[]}]},{"id":"t4110","name":"占位组","children":[{"id":"t4111","name":"占位城市","children":[]}]},{"id":"t4120","name":"占位组","children":[{"id":"t4121","name":"占位城市","children":[]}]},{"id":"t4130","name":"占位组","children":[{"id":"t4131","name":"占位城市","children":[]}]}]}]},"serverTime":1521099197555}]
      // if ( resps.some(r=>r.state!==1) ) throw 'data error'
      this.hotCities = resps[0].data.list
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
      })
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
    // })
    // .catch(err => {
      // console.log(err)
    // })
  }
}
</script>