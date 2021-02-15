<template>
  <div class="pricingTable">
    <h2 class="pricingTable-title">Find a plan that's right for you.</h2>
    <h3 class="pricingTable-subtitle">
      Every plan comes with a 30-day free trial.
    </h3>

    <ul class="pricingTable-firstTable">
      <li class="pricingTable-firstTable_table">
        <h1 class="pricingTable-firstTable_table__header">Silver Package</h1>
        <p class="pricingTable-firstTable_table__pricing">
          <span>$</span><span>Free</span><span></span>
        </p>
        <ul class="pricingTable-firstTable_table__options">
          <li>Unlimited Listing</li>
          <li>Edit Your Listing</li>
          <li>Approve Reviews</li>
        </ul>
        <div
          class="pricingTable-firstTable_table__getstart"
         @click="Kakao(rank[2], price[2])"
        >
          Get Started Now
        </div>
      </li>
      <li class="pricingTable-firstTable_table">
        <h1 class="pricingTable-firstTable_table__header">Gold Package</h1>
        <p class="pricingTable-firstTable_table__pricing">
          <span>$</span><span>19</span><span>Month</span>
        </p>
        <ul class="pricingTable-firstTable_table__options">
          <li>Unlimited Listing</li>
          <li>Edit Your Listing</li>
          <li>Approve Reviews</li>
          <li>Take Booking Online</li>
          <li>24/7 Support Service</li>
        </ul>
        <div
          class="pricingTable-firstTable_table__getstart"
          @click="UpdateMember('gold')"
        >
          Get Started Now
        </div>
      </li>
      <li class="pricingTable-firstTable_table">
        <h1 class="pricingTable-firstTable_table__header">Platinum Package</h1>
        <p class="pricingTable-firstTable_table__pricing">
          <span>$</span><span>49</span><span>Month</span>
        </p>
        <ul class="pricingTable-firstTable_table__options">
          <li>Unlimited Listing</li>
          <li>Edit Your Listing</li>
          <li>Approve Reviews</li>
        </ul>
        <div
          class="pricingTable-firstTable_table__getstart"
          @click="UpdateMember('platinum')"
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
    UpdateMember(v) {
      axios
        .post(
          `${this.$store.state.BACK_SERVER}/updateMember`,
          { memId: this.id, memRank: v },
          {
            headers: {
              Authorization: `Bearer ${this.$cookie.get("accesstoken")}`,
            },
          }
        )
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
      axios.post(`http://192.168.168.156:80/initSub`,{ memId: this.$cookie.get("memId"), rank: rank, price: price },{headers: {Authorization: `Bearer ${this.$cookie.get("accesstoken")}`,}})
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