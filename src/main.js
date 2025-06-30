import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { groupBy } from 'lodash'
console.log('groupBy: ', groupBy)
createApp(App).use(router).mount('#app')
