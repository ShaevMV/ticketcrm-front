import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import urql from '@urql/vue'
createApp(App)
  .use(store)
  .use(router)
  .use(urql, {
    url: process.env.URL_GRAPHQL
  })
  .mount('#app')
// # sourceMappingURL=main.js.map
