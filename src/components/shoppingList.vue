<template>
  <div class="shoppingList">
    <p class="titleTip" v-if="newList.length==0">购物车为空，请客观尽情购物吧！</p>
    <ul v-else>
      <li v-for="(item,index) in newList" :key="index">
        <input
          type="checkbox"
          v-model="checkedModel"
          :value="item.id"
          class="tui-checkbox commonStyle"
        >
        <span class="img">
          <img :src="item.url">
        </span>
        <div>
          <p>{{item.name}}</p>
          <p class="changeCount">
            <span class="reduce">
              <button @click="changeNum(index,item,-1)">-</button>
            </span>
            <span class="text">
              <input type="number" v-model.number="item.count" @keyup="amount(index,item,$event)">
            </span>
            <span class="add">
              <button @click="changeNum(index,item,1)">+</button>
            </span>
          </p>
          <p>
            单价：
            <i class="price">￥{{item.price}}</i>
          </p>
          <p>
            小计：
            <i class="price">￥{{item.mainPrice}}</i>
          </p>
          <p class="del">
            <button @click="open2(index)">删除</button>
          </p>
        </div>
      </li>
    </ul>
    <footer class="shoppingFotter">
      <div class="tip">
        <span class="checkAlled" v-if="list.length>0">
          <input
            type="checkbox"
            v-model="checkedAll"
            @change="changeState"
            class="tui-checkbox commonStyle2"
          >全选
        </span>
        <span class="totalMoney">
          合计：
          <i>{{totalMoney}}</i>
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
      totalMoney: 0,
      list: store.state.shopList,
      checkedAll: false,
      checkedModel: [],
      money: []
    };
  },
  mounted() {},
  computed: {
    newList() {
      //console.log(this.list, "this.list");
      return this.list;
    }
  },
  methods: {
    open2(index) {
      //console.log(index,'indexxxxxxx');
      this.$confirm("此操作将删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          store.commit("deleteList", index);
          console.log(this.list, "this.list");
          console.log(this.checkedModel, "this.checkedModel");
          if (this.checkedAll) {
            this.checkedModel = [];
            this.totalMoney = 0;
            this.money = [];
            this.list.forEach(item => {
              this.checkedModel.push(item.id);
              var e = { id: item.id, mainPrice: item.mainPrice };
              this.money.push(e);
            });
          }

          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //限制购买数量，最多为2位数
    amount(index, item, v) {
      //console.log(v, v.currentTarget.value, "vvvv");
      var patrn = /^[0-9]*[1-9][0-9]*$/;
      if (!patrn.test(v.currentTarget.value)) {
        v.currentTarget.value = "";
      }
      if (v.currentTarget.value.length > 2) {
        v.currentTarget.value = v.currentTarget.value.slice(0, 2);
      }
      store.commit("updateList", {
        index: index,
        key: "count",
        value: Number(v.currentTarget.value)
      });
      store.commit("updateList", {
        index: index,
        key: "mainPrice",
        value: item.price * item.count
      });
      this.money.some((e, i) => {
        if (e.id == item.id) {
          this.money[i].mainPrice = item.mainPrice;
          return true;
        }
      });
    },

    changeNum(index, item, val) {
      store.commit("updateList", {
        index: index,
        key: "count",
        value: item.count + val <= 0 ? 1 : item.count + val
      });
      store.commit("updateList", {
        index: index,
        key: "mainPrice",
        value: item.price * item.count
      });
      this.money.some((e, i) => {
        if (e.id == item.id) {
          this.money[i].mainPrice = item.mainPrice;
          return true;
        }
      });
    },

    changeState() {
      this.checkedModel = [];
      this.totalMoney = 0;
      this.money = [];
      if (this.checkedAll) {
        this.list.forEach(item => {
          this.checkedModel.push(item.id);
          var e = { id: item.id, mainPrice: item.mainPrice };
          this.money.push(e);
          //console.log(this.money, "this.moneyyyyyyyy");
        });
      }
    }
  },
  watch: {
    checkedModel: {
      handler() {
        if (this.checkedModel.length == this.list.length) {
          this.checkedAll = true;
          this.totalMoney = 0;
          this.money = [];
          if (this.checkedAll) {
            this.list.forEach(item => {
              var e = { id: item.id, mainPrice: item.mainPrice };
              this.money.push(e);
              //console.log(this.money, "this.moneyyyyyyyy");
            });
          }
        } else {
          this.checkedAll = false;
          //console.log(this.checkedModel, "this.checkedModel");
          this.money = [];
          this.totalMoney = 0;
          for (var i = 0; i < this.checkedModel.length; i++) {
            for (var j = 0; j < this.list.length; j++) {
              if (this.checkedModel[i] == this.list[j].id) {
                var e = {
                  id: this.list[j].id,
                  mainPrice: this.list[j].mainPrice
                };
                this.money.push(e);
              }
            }
          }
        }
      },
      deep: true
    },
    money: {
      handler(oldValue, newValue) {
        // console.log(oldValue,'oldValue')
        // console.log(newValue,'newValue')
        this.totalMoney = 0;
        for (var i = oldValue.length - 1; i >= 0; i--) {
          this.totalMoney += oldValue[i].mainPrice;
        }
        return this.totalMoney;
      },
      deep: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
