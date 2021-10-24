import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import urql from '@urql/vue'

createApp(App)
  .use(store)
  .use(router)
  .use(urql, {
    url: 'http://172.17.0.1/graphql'
  })
  .mount('#app')
