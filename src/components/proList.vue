<template>
  <div class="proList">
    <h2>vue购物车实例</h2>
    <ul class="list">
      <li v-for="(item,index) in proList" :key="index">
        <router-link :to="{ path: '/proDetail', query: { id: item.id,url:item.url,name:item.name,level:item.level,value:item.value,price:item.price }}">
          <span><img :src="item.url" alt=""></span>
          <p class="name">{{item.name}}</p>
          <p class="level">评分：{{item.level}}</p>
          <p class="star"><el-rate disabled v-model="item.value"></el-rate></p>
        </router-link>       
      </li>
    </ul>
    <footer class="listFooter">
      <ul>
        <li v-for="(item,index) in menu" :key="index">
          <router-link :to="item.url" :class="{'c1':tabIndex==index}">
              <span class="icon iconfont" :class="item.name"><i class="count" v-show="index==2 &&newCount>0">{{newCount}}</i></span>
          </router-link>
           
        </li>        
      </ul>
    </footer>
  </div>
</template>

<script>
 import {mapState} from 'vuex'
 import store from '../store/store' 
export default {
  name: 'proList',
  data () {
    return {
      flag:false,
      tabIndex:0,
      proList:[
        {
          id:1,
          url:'../../static/img/1.png',
          name:'梦想之城',
          level:'7.4',
          value:'7.4'/'2',
          price:21
          
        },
          {
          id:2,
          url:'../../static/img/2.png',
          name:'新喜剧之王',
          level:'5.8',
          value:'5.8'/'2',
          price:32
         
        },
         {
          id:3,
          url:'../../static/img/3.png',
          name:'惊奇队长',
          level:'7',
           value:'7'/'2',
           price:30
        },
         {
          id:4,
          url:'../../static/img/4.png',
          name:'绿皮书',
          level:'8.9',
           value:'8.9'/'2',
           price:36
         
        },
         {
          id:5,
          url:'../../static/img/3.png',
          name:'夏目友人帐',
          level:'8.1',
           value:'8.1'/'2',
           price:35
        },
         {
          id:6,
          url:'../../static/img/6.png',
          name:'阿丽塔',
          level:'7.6',
          value:'7.6'/'2',
          price:40
        },
         {
          id:7,
          url:'../../static/img/7.png',
          name:'流浪地球',
          level:'7.9',
          value:'7.9'/'2',
          price:38
        },
        {
          id:8,
          url:'../../static/img/8.png',
          name:'白蛇：缘起',
          level:'7.9',
           value:'7.9'/'2',
           price:30
        },
        {
          id:9,
          url:'../../static/img/9.png',
          name:'小偷家族',
          level:'8.7',
           value:'8.7'/'2',
           price:36
        },
         {
          id:10,
          url:'../../static/img/10.png',
          name:'驭风男孩',
          level:'7.9',
          value:'7.9'/'2',
          price:30
        },
        {
          id:11,
          url:'../../static/img/11.png',
          name:'蓝蜥蜴俱乐部',
          level:'6.9',
          value:'6.9'/'2',
          price:22
        },
         {
          id:12,
          url:'../../static/img/12.png',
          name:'三次元女友',
          level:'6.7',
           value:'6.7'/'2',
           price:20
        },
         {
          id:13,
          url:'../../static/img/13.png',
          name:'疯狂的外星人',
          level:'6.4',
           value:'6.4'/'2',
           price:42
        },
         {
          id:14,
          url:'../../static/img/14.png',
          name:'蜘蛛侠',
          level:'8.7',
            value:'8.7'/'2',
            price:50
        },
        {
          id:15,
          url:'../../static/img/15.png',
          name:'“大”人物',
          level:'6.6',
            value:'6.6'/'2',
            price:30
        },
         {
          id:16,
          url:'../../static/img/16.png',
          name:'海王',
          level:'7.7',
            value:'7.7'/'2',
            price:32
        }

      ],
      menu:[
        {
          name:'icon-zhuye',        
          url:'/proList'
        },
          {
          name:'icon-search',        
          url:'/'
        },
         {
          name:'icon-gouwuche',        
          url:'/shoppingList'
        },
         {
          name:'icon-wo',        
          url:'/'
        }
      ]
    }
  },
  computed:{
    newCount(){
      return  store.state.shopList.length;
    }
  },
 methods:{
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
