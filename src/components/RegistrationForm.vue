<template>
  <div class="container">
    <div class="form-group">
      <label for="inputLogin">Email address</label>
      <input type="email"
             v-model="email"
             class="form-control"
             id="inputLogin"
             placeholder="Enter email">
      <div class="error">
        <span class="html-error">{{ getMassage('registration', 'email') }}</span>
      </div>
    </div>
    <div class="form-group">
      <label for="inputName">Name</label>
      <input type="text"
             v-model="name"
             class="form-control"
             id="inputName"
             placeholder="Your name">
      <div class="error">
        <span class="html-error">{{ getMassage('registration', 'name') }}</span>
      </div>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword">Password</label>
      <input v-model="password" type="password" class="form-control" id="exampleInputPassword" placeholder="Password">
      <div class="error">
        <span class="html-error">{{ getMassage('registration', 'password') }}</span>
      </div>
    </div>
    <div class="form-group">
      <label for="exampleInputPasswordConfirmation">Password confirmation</label>
      <input v-model="passwordConfirmation" type="password" class="form-control" id="exampleInputPasswordConfirmation"
             placeholder="password confirmation">
      <div class="error">
        <span class="html-error">{{ getMassage('registration', 'password_confirmation') }}</span>
      </div>
    </div>

    <button type="submit" v-on:click="userRegistration" class="btn btn-primary">Registration</button>
    <span class="link-info" v-on:click="doLogin">Авторизация</span>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Options, Vue } from 'vue-class-component'
import { mapGetters } from 'vuex'
import { ExceptionGettersTypes, ExceptionModuleTypes } from '@/store/modules/exception/types'
import { MutationRegistrationArgs } from '@/graphql/graphql'
import { Profile } from '@/modules/profile/aggregates/ProfileAggregate'
import { Authorization } from '@/modules/auth/aggregate/AuthorizationAggregat'
import { ExceptionAggregate } from '@/modules/exception/aggregates/ExceptionAggregate'
import { REGISTRATION_MODULE } from '@/modules/profile/exeptions/registration/RegistrationBadRequestException'

@Options({
  name: 'RegistrationForm',
  computed: mapGetters([ExceptionModuleTypes.EXCEPTION_MODULE].toString(), {
    getMassage: [ExceptionGettersTypes.GET_MASSAGE].toString()
  })
})

export default class RegistrationForm extends Vue {
  email: null | string = null
  name: null | string = null
  password: null | string = null
  passwordConfirmation: null | string = null

  doLogin (): void {
    this.$emit('showRegistration', false)
  }

  created (): void {
    ExceptionAggregate.clear(REGISTRATION_MODULE)
  }

  userRegistration (): void {
    const value: MutationRegistrationArgs = {
      email: this.email ?? '',
      name: this.name ?? '',
      password: this.password ?? '',
      password_confirmation: this.passwordConfirmation ?? ''
    }

    Profile.registration(value).then(token => {
      Authorization.inAuth(token)
    })
  }
}
</script>

<style scoped>

</style>
