<template>
  <div class="container">
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email"
             v-model="email"
             class="form-control"
             id="exampleInputEmail1"
             aria-describedby="emailHelp"
             placeholder="Enter email">
      <div class="error">
        <span class="html-error">{{ getMassage('auth', 'login') }}</span>
      </div>
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
    </div>
    <div class="form-check">
      <input type="checkbox" v-model="isRememberMe" class="form-check-input" id="exampleCheck1">
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <div class="error">
      <span class="html-error">{{ getMassage('auth', 'auth') }}</span>
    </div>
    <button type="submit" v-on:click="auth" class="btn btn-primary">login</button>
    <span class="link-info" v-on:click="doRegistration">Регистрация</span>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Options, Vue } from 'vue-class-component'
import { MutationAuthArgs } from '@/graphql/graphql'
import { AuthorizationValue } from '@/modules/auth/values/AuthorizationValue'
import { Authorization } from '@/modules/auth/aggregate/AuthorizationAggregat'
import { mapGetters } from 'vuex'
import { ExceptionGettersTypes, ExceptionModuleTypes } from '@/store/modules/exception/types'

@Options({
  name: 'LoginForm',
  computed: mapGetters([ExceptionModuleTypes.EXCEPTION_MODULE].toString(), {
    getMassage: [ExceptionGettersTypes.GET_MASSAGE].toString()
  })
})

export default class LoginForm extends Vue {
  email!: string
  password!: string
  isRememberMe!: boolean

  auth (): void {
    const IValue: MutationAuthArgs = {
      email: this.email,
      password: this.password,
      isRememberMe: this.isRememberMe
    }

    Authorization.auth(AuthorizationValue.create(IValue))
  }

  doRegistration (): void {
    this.$emit('showRegistration', true)
  }
}
</script>
<style scoped>

</style>
