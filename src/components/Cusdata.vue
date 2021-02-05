<template>
  <div style="overflow:scroll; width:100%; height:100vh;">
    <div  class="wrap">
      <div v-for="(value, index) in user" :key="index">
        <div class="box1" >
            유저 :<a :href="value.url">{{value.name }}</a> <br>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="module">
export default {
  data: function () {
    return {
      user: [
        { name: "mg" ,url:"/" },
        { name: "om" ,url:"http//:127.0.0.1:8081/home"},
        { name: "sh" ,url:"http//:127.0.0.1:8081/home"},
        { name: "jw" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
        { name: "ch" ,url:"http//:127.0.0.1:8081/home"},
      ],
    };
  },
};
</script>
<style scoped>

.box1 {
    background-color: rgb(144, 27, 247);
  height: 300px;
  width: 300px;
  margin-left: 25%;
  margin-right: 20%;
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 25px;

  background: rgba( 255, 255, 255, 0.75 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 6.5px );
-webkit-backdrop-filter: blur( 6.5px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
opacity: 50%;
}

.box1:hover{
        opacity: 100%;
    }

.wrap {

  column-width: 100%;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 450px 450px 450px;
}

.item {
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 25px;
}

</style>