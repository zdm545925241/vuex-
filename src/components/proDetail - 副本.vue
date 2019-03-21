<template>
  <div class="proDetail">
    <div class="banner">
      <span class="sImg">
        <img :src="url" alt>
      </span>
      <div class="cont">
        <p>{{name}}</p>
        <p>{{level}}</p>
        <p>
          <el-rate disabled v-model="value"></el-rate>
        </p>
        <p>共有654321人评价</p>
      </div>
    </div>
    <h2>内容简介</h2>
    <p class="contDetail">暂无内容</p>
    <p class="link">
      <a href="javascript:;" @click="jumpTo()">加入购物车</a>
    </p>
  </div>
</template>

<script>
import store from "../store/store";
export default {
  name: "proDetail",
  data() {
    return {
      flag: false,
      list: store.state.shopList,
      name: "",
      id: "",
      url: "",
      level: "",
      value: 0,
      price: 0
    };
  },
  mounted() {
    this.name = this.$route.query.name;
    this.id = this.$route.query.id;
    this.url = this.$route.query.url;
    this.level = this.$route.query.level;
    this.value = Number(this.$route.query.value);
    this.price = this.$route.query.price;
    //console.log(this.value, typeof this.value, " this.value");
  },
  methods: {
    jumpTo() {
      var json = {
        id: this.id,
        url: this.url,
        name: this.name,
        price: this.price,
        count: 1,
        totalPrice: this.price * 1
      };
      //store.commit("changeJson", json);
      //this.list.push(json);
      // 判断是否重复      

      var idExist = this.list.find(item => {
        return item.id == this.id;
      });
      console.log(idExist, "idExist");
      if (!idExist) {
        this.list.push(json);
      } else {
        for (var i = 0; i < this.list.length; i++) {
          console.log(json.id, this.list[i].id);
          console.log(json.id == this.list[i].id);

          if (this.list[i].id == json.id) {
            alert(111);

            this.list[i].count++;
            this.list[i].totalPrice = this.list[i].price * this.list[i].count;
            break;
          }
        }
      }

      // function sortId(a,b){
      //    return a.id-b.id
      // }
      // this.list.sort(sortId);
      // console.log(this.list,'this.listt111');

      //   if (len == 0) {
      //     this.list.push(json);
      //   }
      //   else{
      //         for(var i=0; i<=len-1; i++){
      //           console.log(len,'len');
      //               if(this.list[i].id!=this.list[i+1].id){
      //                 console.log(i,'iiiiiiiiiii');
      //                 this.list.push(json);
      //               }
      //         }
      //   }

      // //console.log(len, "len");

      // if (len==0) {
      //   this.list.push(json);
      // }
      // else {
      //   for (var i = 0; i < len; i++) {
      //     debugger;
      //     console.log(json.id, this.list[i].id);
      //     console.log(json.id== this.list[i].id);

      //       if (this.list[i].id == json.id) {
      //         alert(111);

      //           this.list[i].count++;
      //           // localStorage.setItem('count',this.list[i].count);
      //           this.list[i].totalPrice =
      //             this.list[i].price * this.list[i].count;
      //             this.falg = true;
      //          break;
      //       }
      //     else {
      //       alert(222);
      //       if (!this.falg) {
      //         this.list.push(json);
      //         this.falg = true;
      //       }
      //     }
      //   }
      // }

      //   var result = [];

      //   for (var i = 0; i < len; i++) {
      //     if (result.indexOf(this.list[i]) == -1) {
      //       result.push(this.list[i]);
      //     }
      //     console.log(result, "result");
      //     return result;
      //   }
      // }

      store.commit("changeList", this.list);
      console.log(this.list, " this.list");
      this.$router.push({
        path: "/shoppingList",
        query: {
          id: this.id,
          url: this.url,
          price: this.price,
          name: this.name
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
