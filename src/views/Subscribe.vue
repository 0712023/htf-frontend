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
        <div class="pricingTable-firstTable_table__getstart" @click="UpdateMember">
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
        <div class="pricingTable-firstTable_table__getstart" @click="Kakao(rank[0], price[0])">
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
        <div class="pricingTable-firstTable_table__getstart" @click="Kakao(rank[1], price[1])">
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
      rank : ["pro", "enterprise"],
      price : ["5000", "10000"]
    };
  },
  methods: {
    UpdateMember() {
      axios.post(`${this.$store.state.BACK_SERVER}/updateMemberRank`,{ memId: this.id, memRank: 'basic' },{headers: {Authorization: `Bearer ${this.$cookie.get("accesstoken")}`,},})
      .then(() => {
        alert("subscribe success!");
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    Kakao(rank, price) {
      axios.post(`${this.$store.state.BACK_SERVER}/initSub`,{ memId: this.$cookie.get("memId"), rank: rank, price: price, FRONT_SERVER:this.$store.state.FRONT_SERVER },{headers: {Authorization: `Bearer ${this.$cookie.get("accesstoken")}`,}})
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