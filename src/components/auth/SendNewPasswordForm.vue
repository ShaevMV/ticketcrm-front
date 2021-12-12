<template>
  <div class="bs-docs-section" id="forgot">
    <div class="container">
      <div class="form-horizontal">
        <legend>Восстановление пароля</legend>
        <fieldset v-if="success !==true">

          <div class="form-group">
            <label for="inputEmail" class="col-lg-4 control-label">Email*</label>
            <div class="col-lg-8">
              <input type="email"
                     class="form-control"
                     v-model="email"
                     id="inputEmail"
                     placeholder="email">
              <p class="error">{{ getMassage('recoveryPassword', 'email') }}</p>
            </div>

          </div>
          <div class="form-group">
            <label for="inputPassword" class="col-lg-4 control-label">Введите новый пароль*</label>
            <div class="col-lg-8">
              <input type="password"
                     class="form-control"
                     v-model="password"
                     id="inputPassword"
                     placeholder="Новый пароль">
              <p class="error">{{ getMassage('recoveryPassword', 'password') }}</p>
            </div>

          </div>
          <div class="form-group">
            <label for="inputPasswordConfirmation" class="col-lg-4 control-label">Повторите пароль*</label>
            <div class="col-lg-8">
              <input type="password"
                     class="form-control"
                     v-model="passwordConfirmation"
                     id="inputPasswordConfirmation"
                     placeholder="Повторите пароль">
              <p class="error">{{ getMassage('recoveryPassword', 'password_confirmation') }}</p>
            </div>

          </div>
          <div class="form-group">
            <button type="submit"
                    v-if="success === null || success === false"
                    class="btn btn-primary"
                    id="enter_reg"
                    v-on:click="sendNewPassword">
              Сохранить новый пароль
            </button>
          </div>
          <p class="error">{{ getMassage('recoveryPassword', 'message') }}</p>
        </fieldset>
        <p v-bind:class="{ error: !success }">{{ massage }}</p>
        <a href="javascript:void(0);" v-on:click="goInHomePage">
          Вернуться на главную страницу
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { mapGetters } from 'vuex'
import { ExceptionGettersTypes, ExceptionModuleTypes } from '@/store/modules/exception/types'
import { Authorization } from '@/modules/auth/aggregate/AuthorizationAggregat'
import { ExceptionAggregate } from '@/modules/exception/aggregates/ExceptionAggregate'
import {
  RECOVERY_PASSWORD_COMPONENT
} from '@/modules/auth/exeptions/recoveryPassword/RecoveryPasswordBadRequestException'

@Options({
  name: 'SendNewPasswordForm',
  props: {
    token: String
  },
  computed: mapGetters([ExceptionModuleTypes.EXCEPTION_MODULE].toString(), {
    getMassage: [ExceptionGettersTypes.GET_MASSAGE].toString()
  })
})

export default class SendNewPasswordForm extends Vue {
  token!: string
  password: null | string = null
  passwordConfirmation: null | string = null
  massage: null | string = null
  success: null | boolean = null
  email: null | string = null

  sendNewPassword (): void {
    ExceptionAggregate.clear(RECOVERY_PASSWORD_COMPONENT)
    Authorization.sendNewPassword({
      email: this.email ?? '',
      password: this.password ?? '',
      password_confirmation: this.passwordConfirmation ?? '',
      token: this.token
    }).then((r) => {
      console.log(r)
      if (r !== undefined) {
        this.success = r.isSuccess
        this.massage = r.message
      }
    })
  }

  goInHomePage (): void {
    this.$router.push('/')
  }
}
</script>
