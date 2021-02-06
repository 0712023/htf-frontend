<template>
  <div id="app">
    <nav class="main-nav">
      <Burger/><logout/>
    </nav>
    <div class="body"><router-view></router-view></div>

    <Sidebar>
      <ul class="sidebar-panel-nav">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/user">User</router-link>
        </li>
        <li>
          <router-link v-for="route in routes" :key="route.seq" :to="'/sensor/'+route.desc">{{ route.desc }}</router-link>
        </li>
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/three">Three</router-link>
        </li>
      </ul>
    </Sidebar>
  </div>
</template>

<script>
import Burger from "./components/Menu/Burger.vue";
import Sidebar from "./components/Menu/Sidebar.vue";
import Logout from './components/Logout.vue';
import store from "./store/store";

export default {
  name: "app",
  components: {
    Burger,
    Sidebar,
    Logout,
  },
  data() {
    return { routes: store.state.routes };
  },
};
</script>
<style>
 @import './assets/css/style.css';
</style>
