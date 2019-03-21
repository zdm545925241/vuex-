<template>
  <div class="shoppingList">
    <ul>
      <li v-for="(item,index) in newList" :key="index">
        <span class="img">
          <img :src="item.url" alt>
        </span>
        <div>
          <p>{{item.name}}</p>
          <p class="changeCount">
            <span class="reduce">
              <button>-</button>
            </span>
            <span class="text">
              <input type="text" v-model="item.count">
            </span>
            <span class="add">
              <button>+</button>
            </span>
          </p>
          <p>
            单价：
            <i class="price">￥{{item.price}}</i>
          </p>
          <p>
            小计：
            <i class="price">￥{{item.totalPrice}}</i>
          </p>
          <p class="del">
            <button>删除</button>
          </p>
        </div>
      </li>
    </ul>
    <footer class="shoppingFotter">
      <div class="tip">
        <span>
          总计：
          <i>0</i>
        </span>
      </div>
      <ul>
        <li>
          <router-link class="jump" to="/proList">继续购物</router-link>
        </li>
        <li>
          <router-link to="/" class="counter">去结算</router-link>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
import store from "../store/store";
export default {
  name: "shoppingList",
  data() {
    return {
      list: store.state.shopList
      // count:0,
      // name:'',
      // id:'',
      // url:'',
      // price:0
    };
  },
  mounted() {
    // this.name=this.$route.query.name
    // this.id=this.$route.query.name
    // this.url=this.$route.query.url
    // this.price=this.$route.query.price
  },
  computed: {
    newList() {
      return this.list;
      var len = this.list.length;
      //console.log(len,'len');
      // if (len <= 1) {
      //   return this.list;
      // }
      // function sortId(a, b) {
      //   return a.id - b.id;
      // }
      // this.list.sort(sortId);

      // function indexNum(a) {
      //   if (a.length > 1) {
      //     for (var i = 0; i < a.length - 1; i++) {
      //       if (a[i].id == a[i + 1].id) {
      //         console.log(i, "iiiiiiiiiii");
      //         return i;
      //       }
      //     }
      //   }
      // }

      // function spliceNum(a) {
      //   var index = indexNum(a);
      //   console.log(index,'index');
      //   if (index > -1) {
      //     a.splice(index, 1);
      //     a[index].count++;
      //     console.log( a[index].count,' a[index].count');
      //     a[index].totalPrice = a[index].price * a[index].totalPrice;
      //      console.log(a,'aaaaaa111111');
      //     return a;
      //   } else {
      //      console.log(a,'aaaaaaa1');
      //     return a;
      //   }
      // }
      // return spliceNum(this.list);

      // if (len <= 1) {
      //   return this.list;
      // } else {
      //   for (var i = 0; i < len - 1; i++) {
      //     if (this.list[i].id == this.list[i + 1].id) {
      //       console.log(i, "iiiiiiiiiii");
      //       return i;
      //     }
      //   }
      // }

      // var index = aa();
      // console.log(index, "111111111");
      // //console.log(index,'index');
      // if (index > -1) {
      //   this.list.splice(index, 1);
      // }

     
      //           return this.list;

      //  var result = [];
      //     for(var i=0; i<=len; i++){
      //       if(result.indexOf(this.list[i])==-1){
      //           result.push(this.list[i])
      //       }
      // console.log(result,'result');
      //       return result;
      //     }
      //     var nary=this.list.sort();
      //           for(var i=0; i<len-1; i++){
      //                 if(nary[i].id==nary[i+1].id){
      //                   console.log(i,'iiiiiiiiiii');
      //                 }
      //           }
      //           return this.list;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
