import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import urql from '@urql/vue'
import { Authorization } from '@/modules/auth/aggregate/AuthorizationAggregat'
import { ExceptionAggregate } from '@/modules/exception/aggregates/ExceptionAggregate'
import { Profile } from '@/modules/profile/aggregates/ProfileAggregate'

createApp(App)
  .use(store)
  .use(router)
  .use(urql, {
    url: 'http://172.17.0.1/graphql'
  })
  .mount('#app')

export const authorization = Authorization.create()
export const profile = Profile.create()

console.log(authorization)
console.log(profile)
// очистить все ошибки
ExceptionAggregate.allClear()
