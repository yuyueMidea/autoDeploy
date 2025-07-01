<template>
    <div>
      <h2>关于我们</h2>
      <p v-for="item in 22" key="item">这是关于页面内容 {{ item }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'About'
  }
  </script>
