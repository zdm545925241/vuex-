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
        mainPrice:this.price*1
      };

      // 判断是否重复
      var idExist = this.list.find(item => {
        if (item.id == this.id) {
          return true;
        }
      });
      //console.log(idExist, "idExist");

      if (!idExist) {
        this.list.push(json);
      } else {
        this.list.some((item, i) => {
          if (item.id == this.id) {
            this.list[i].count++;
            store.commit("updateList", {
              index: i,
              key: "count",
              value: this.list[i].count
            });
            store.commit("updateList", {
              index: i,
              key: "mainPrice",
              value: this.list[i].price* this.list[i].count
            });
            return true;
          }
        });

        //console.log(this.list,'listtttttttt');
        // for (var i = 0; i < this.list.length; i++) {
        //   if (this.list[i].id == json.id) {
        //     this.list[i].count++;
        //     break;
        //   }
        // }
      }
      store.commit("changeList", this.list);
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
