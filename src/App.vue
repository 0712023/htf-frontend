<template>
  <div id="app">
    <nav class="main-nav">
      <Burger></Burger><br />
    </nav>
    <div class="body"><router-view></router-view></div>

    <Sidebar>
      <ul class="sidebar-panel-nav">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link v-for="route in routes" :key="route.seq" :to="'/sensor/'+route.desc">{{ route.desc }}</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/three">Three</router-link>
        </li>
        <li>
          <router-link to="/cus">Cus</router-link>
        </li>
      </ul>
    </Sidebar>
  </div>
</template>

<script>
import Burger from "./components/Menu/Burger.vue";
import Sidebar from "./components/Menu/Sidebar.vue";
import store from "./store/store";

export default {
  name: "app",
  components: {
    Burger,
    Sidebar,
  },
  data() {
    return { routes: store.state.routes };
  },
};
</script>
<style>
html {
  height: 100%;
  overflow: hidden;
}

main {
  margin-left: 100px;
  align-items: center;
  align-self: center;
}

body {
  border: 0;
  margin: 0;
  padding: 0;
  font-family: "Lato";
  height: 100%;
  background: rgb(101, 31, 87);
  background: linear-gradient(
    45deg,
    rgba(101, 31, 87, 1) 0%,
    rgba(225, 113, 87, 1) 48%,
    rgba(249, 248, 113, 1) 100%
  );
}

.logo {
  align-self: center;
  color: #fff;
  font-weight: bold;
  font-family: "Lato";
}

.main-nav {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.8rem;
}

ul.sidebar-panel-nav {
  list-style-type: none;
}

ul.sidebar-panel-nav > li > a {
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  display: block;
  padding-bottom: 0.5em;
}
</style>
