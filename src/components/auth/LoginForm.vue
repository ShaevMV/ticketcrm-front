<template>
  <div class="bs-docs-section" id="maincontent">
    <div id="indexed">
      <div class="container">
        <a href="/" id="main-logo">
          <img alt="Vue logo" src="../../assets/logo.png">
        </a>
        <div class="centered">
          <h1>Здравствуйте, дорогие друзья!</h1>
          <p>Вы находитесь на странице, предназначенной для регистрации внесенных вами оргвзносов или
            приобретения трансфера до фестиваля.<br>
            Для доступа к вышеперечисленным функциям, пожалуйста, <a href="javascript:void(0);"
                                                                     v-on:click="doRegistration">зарегистрируйтесь</a>
            или войдите в свой профайл:</p>
        </div>
        <div id="logger">
          <div class="inner">
            <fieldset>
              <div class="form-group">
                <label for="login" class="col-lg-2 control-label">Логин:</label>
                <input type="text"
                       v-model="email"
                       class="form-control"
                       title="Login"
                       id="login"
                       placeholder="Логин">
              </div>
              <p class="error">{{ getMassage('auth', 'login') }}</p>
              <div class="form-group">
                <label for="login" class="col-lg-2 control-label">Пароль:</label>
                <input type="password"
                       v-model="password"
                       class="form-control"
                       title="password"
                       id="password"
                       placeholder="Пароль">
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input type="checkbox" v-model="isRememberMe" class="form-check-input" id="exampleCheck1">
                  <label class="form-check-label" for="exampleCheck1">Запомнить меня</label>
                </div>
              </div>
              <p class="error">{{ getMassage('auth', 'auth') }}</p>
              <div class="form-group">
                <button type="submit"
                        class="btn btn-primary"
                        v-on:click="auth"
                        id="enter">Войти в учетную запись
                </button>
              </div>
            </fieldset>
          </div>
          <a href="javascript:void(0);" v-on:click="doRecoveryPassword">Забыли пароль?</a>
          <p>Нет профайла? Зарегистрируйте его здесь <a href="javascript:void(0);" v-on:click="doRegistration">здесь</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Options, Vue } from 'vue-class-component'
import { MutationAuthArgs } from '@/graphql/graphql'
import { AuthorizationValue } from '@/modules/auth/values/login/AuthorizationValue'
import { mapGetters } from 'vuex'
import { ExceptionGettersTypes, ExceptionModuleTypes } from '@/store/modules/exception/types'
import { ExceptionAggregate } from '@/modules/exception/aggregates/ExceptionAggregate'
import { LOGIN_UNAUTHORIZED_COMPONENT } from '@/modules/auth/exeptions/login/LoginUnauthorizedException'
import { domainContainer } from '@/domain/inject/domainInversify.config'
import { AUTH_TYPES } from '@/modules/auth/inject/types'
import { AuthApplication } from '@/modules/auth/application/AuthApplication'

const authApplication = domainContainer.get<AuthApplication>(AUTH_TYPES.AuthApplication)
@Options({
  name: 'LoginForm',
  computed: mapGetters([ExceptionModuleTypes.EXCEPTION_MODULE].toString(), {
    getMassage: [ExceptionGettersTypes.GET_MASSAGE].toString()
  })
})

export default class LoginForm extends Vue {
  email: string | null = null
  password: null | string = null
  isRememberMe = false

  created (): void {
    ExceptionAggregate.clear(LOGIN_UNAUTHORIZED_COMPONENT)
  }

  auth (): void {
    const IValue: MutationAuthArgs = {
      email: this.email ?? '',
      password: this.password ?? '',
      isRememberMe: this.isRememberMe
    }
    authApplication.login(AuthorizationValue.create(IValue).getResult())
  }

  doRegistration (): void {
    this.$emit('showRegistration', 'registration')
  }

  doRecoveryPassword (): void {
    this.$emit('showRegistration', 'recoveryPassword')
  }
}
</script>
<style scoped>

</style>
