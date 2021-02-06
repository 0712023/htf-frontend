<template>
    <div>
        <div style="overflow:scroll; width:100%; height:100vh;">
            <div  class="wrap">
            <div v-for="(value, index) in user" :key="index">
                <div class="box1" >
                    유저 :<a :href="value.url">{{value.name }}</a> <br>
                </div>
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
        { name: "om" ,url:"/home"},
        { name: "sh" ,url:"/home"},
        { name: "jw" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
        { name: "ch" ,url:"/home"},
      ],
    };
  },
}
</script>