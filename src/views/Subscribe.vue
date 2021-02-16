<template>
  <div class="pricingTable">
    <h2 class="pricingTable-title">Find a plan that's right for you.</h2>
    <h3 class="pricingTable-subtitle">
      Every plan comes with a 30-day free trial.
    </h3>

    <ul class="pricingTable-firstTable">
      <li class="pricingTable-firstTable_table">
        <h1 class="pricingTable-firstTable_table__header">Basic Package</h1>
        <p class="pricingTable-firstTable_table__pricing">
          <span>₩</span><span>Free</span><span></span>
        </p>
        <ul class="pricingTable-firstTable_table__options">
          <li>Kakao Alaram Service </li>
          <li>Add Machine Just Three</li>
        </ul>
        <div
          class="pricingTable-firstTable_table__getstart"
         @click="Kakao(rank[0], price[0])"
        >
          Get Started Now
        </div>
      </li>
      <li class="pricingTable-firstTable_table">
        <h1 class="pricingTable-firstTable_table__header">Pro Package</h1>
        <p class="pricingTable-firstTable_table__pricing">
          <span>₩</span><span>5,000</span><span>Month</span>
        </p>
        <ul class="pricingTable-firstTable_table__options">
          <li>Kakao Alaram Service </li>
          <li>Add Machine Unlimited</li>
          <li>Machine Update Available</li>
        </ul>
        <div
          class="pricingTable-firstTable_table__getstart"
         @click="Kakao(rank[1], price[1])"
        >
          Get Started Now
        </div>
      </li>
      <li class="pricingTable-firstTable_table">
        <h1 class="pricingTable-firstTable_table__header">Enterprise Package</h1>
        <p class="pricingTable-firstTable_table__pricing">
          <span>₩</span><span>10,000</span><span>Month</span>
        </p>
        <ul class="pricingTable-firstTable_table__options">
          <li>Kakao Alaram Service </li>
          <li>Add Machine Unlimited</li>
          <li>Machine Update Available</li>
          <li>Use 3D Modeling</li>
        </ul>
        <div
          class="pricingTable-firstTable_table__getstart"
          @click="Kakao(rank[2], price[2])"
        >
          Get Started Now
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: this.$cookie.get("memId"),
      rank : ["basic", "pro", "enterprise"],
      price : ["0", "5000", "10000"]
    };
  },
  methods: {
    UpdateMember(newRank) {
      axios.post(`${this.$store.state.BACK_SERVER}/updateMember`,{ memId: this.id, memRank: newRank },{headers: {Authorization: `Bearer ${this.$cookie.get("accesstoken")}`,},})
      .then((response) => {
        alert("subscribe success!");
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    Kakao(rank, price) {
      console.log(this.$store.state.BACK_SERVER)
      axios.post(`http://192.168.168.156:80/initSub`,{ memId: this.$cookie.get("memId"), rank: rank, price: price, FRONT_SERVER:this.$store.state.FRONT_SERVER },{headers: {Authorization: `Bearer ${this.$cookie.get("accesstoken")}`,}})
      .then((res) => {
        this.$cookie.set("tid", res.data["tid"], 1);
        window.open(res.data["url"]);
      });
    },
  },
};
</script>

<style lang="scss">
@import "../assets/css/subscribe.scss";
</style>