<template>
  <div class="bs-docs-section">
    <div class="container">
      <div class="form-horizontal">
        <div id="regz">
          <fieldset>
            <legend>Регистрация нового профайла</legend>
            <div class="form-group " id="email">
              <label for="inputemail" class="col-lg-4 control-label">E-mail:</label>
              <div class="col-lg-9">
                <input type="email"
                       v-model="email"
                       class="form-control"
                       id="inputemail"
                       placeholder="E-mail">
              </div>
            </div>
            <p class="error">{{ getMassage('registration', 'email') }}</p>
            <div class="form-group">
              <label for="per_name" class="col-lg-4 control-label">Имя:</label>
              <div class="col-lg-9">
                <input type="text"
                       class="form-control"
                       id="per_name"
                       placeholder="Имя"
                       v-model="name">
              </div>
            </div>
            <p class="error">{{ getMassage('registration', 'name') }}</p>
            <div class="form-group">
              <label for="new_password" class="col-lg-4 control-label">Пароль:</label>
              <div class="col-lg-9">
                <input type="password"
                       v-model="password"
                       class="form-control"
                       id="new_password"
                       placeholder="Пароль">
              </div>
            </div>
            <p class="error">{{ getMassage('registration', 'password') }}</p>
            <div class="form-group" id="password_checin">
              <label for="password_reg" class="col-lg-4 control-label">Повторите пароль:</label>
              <div class="col-lg-9">
                <input type="password"
                       v-model="passwordConfirmation"
                       class="form-control"
                       id="password_reg"
                       placeholder="Повторите пароль">
              </div>
            </div>
            <p class="error">{{ getMassage('registration', 'password_confirmation') }}</p>
            <div class="form-group">
              <button type="submit"
                      class="btn btn-primary"
                      v-on:click="userRegistration"
                      id="enter_reg">Зарегистрировать новый профайл
              </button>
            </div>
          </fieldset>
        </div>
        <p>Уже есть профайл? Авторизуйтесь <a href="javascript:void(0);" v-on:click="doLogin">здесь</a>.</p>
      </div>
    </div>
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
import { REGISTRATION_COMPONENT } from '@/modules/profile/exeptions/registration/RegistrationBadRequestException'

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
    this.$emit('showRegistration', 'login')
  }

  created (): void {
    ExceptionAggregate.clear(REGISTRATION_COMPONENT)
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
