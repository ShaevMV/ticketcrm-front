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
import { myContainer } from '@/domain/inject/inversify.config'
import { TYPES } from '@/domain/inject/types'
import { MutationAuthArgs } from '@/graphql/graphql'
import { AuthorizationValue } from '@/modules/auth/values/AuthorizationValue'
import { AuthorizationAction } from '@/modules/auth/actions/AuthorizationAction'

@Options({
  name: 'LoginForm'
})

export default class LoginForm extends Vue {
  email!: string
  password!: string
  isRememberMe!: boolean

  auth (): void {
    const IValue: MutationAuthArgs = {
      email: 'test@test.com',
      password: 'password',
      isRememberMe: false
    }

    const action = myContainer.get<AuthorizationAction>(TYPES.AuthorizationAction)

    action.authSend(AuthorizationValue.create(IValue).getResult()).then((r) => {
      console.log(r)
    })
  }

  private _getAuthorizationValue (): AuthorizationValue {
    const IValue : MutationAuthArgs = {
      email: this.email,
      password: this.password,
      isRememberMe: this.isRememberMe
    }

    return AuthorizationValue.create(IValue).getResult()
  }
}
</script>
<style scoped>

</style>
