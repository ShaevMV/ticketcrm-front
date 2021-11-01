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
    <button type="submit" v-on:click="auth" class="btn btn-primary">login</button>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Options, Vue } from 'vue-class-component'
import { MutationAuthArgs } from '@/graphql/graphql'
import { AuthorizationValue } from '@/modules/auth/values/AuthorizationValue'
import { Authorization } from '@/modules/auth/aggregate/AuthorizationAggregat'
import { mapActions } from 'vuex'
import { ITokenAuth } from '@/modules/auth/entity/AuthTokenEntity'

@Options({
  name: 'LoginForm',
  methods: mapActions('profile', ['updateToken'])
})

export default class LoginForm extends Vue {
  email!: string
  password!: string
  isRememberMe!: boolean

  updateToken!: (value: ITokenAuth | null) => any;

  auth (): void {
    const IValue: MutationAuthArgs = {
      email: this.email,
      password: this.password,
      isRememberMe: this.isRememberMe
    }

    Authorization.auth(AuthorizationValue.create(IValue)).then((r) => {
      if (r.isFailure) {
        console.error(r.error)
      } else {
        this.updateToken(r.getResult().getToken())
      }
    })
  }
}
</script>
<style scoped>

</style>
