<template>
  <div id="app_wrapper">
    <nav class="app_header">
      <router-link to="/">主页</router-link> | 
      <router-link v-for="dataEgg in dataEggs" :key="dataEgg.id" :title="dataEgg.type"
        :to="{name:'eggs', params:{eggType:dataEgg.type}}">{{dataEgg.name}} | </router-link>
        <button @click="backward">退后</button>
        <button @click="forward">前进</button>
    </nav>
    <div class="app_main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import dataEggs from "./data.json";

export default {
  data() {
    return {
      dataEggs
    }
  },
  methods: {
    backward() {
      this.$router.go(-1)
    },
    forward() {
      this.$router.go(1)
    }
  }
}
</script>


<style>
#app_wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.app_header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #ccc;
}
.app_header a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
}

.app_header a.router-link-exact-active {
  color: white;
  background: #42b983;
}

.app_main {
  width: 100%;
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>