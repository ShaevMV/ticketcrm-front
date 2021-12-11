<template>
  <div class="bs-docs-section" id="forgot">
    <div class="container">
      <div class="form-horizontal">
        <fieldset>
          <legend>Восстановление пароля</legend>
          <div class="form-group " id="email">
            <label for="inputemail" class="col-lg-4 control-label">E-mail*</label>
            <div class="col-lg-8">
              <input type="email"
                     class="form-control"
                     v-model="email"
                     id="inputemail"
                     placeholder="E-mail">
              <span class="help-block">Введите свой E-mail</span>
            </div>
          </div>
          <div class="form-group">
            <button type="submit"
                    class="btn btn-primary"
                    id="enter_reg"
                    v-bind:disabled="email === null"
                    v-on:click="doRecoveryPassword">
              Отправить новый пароль
            </button>
          </div>
          <p class="error">{{ getMassage('recoveryPassword', 'email') }}</p>
          <p v-bind:class="{ error: !success }">{{ massage }}</p>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ExceptionAggregate } from '@/modules/exception/aggregates/ExceptionAggregate'
import { REGISTRATION_COMPONENT } from '@/modules/profile/exeptions/registration/RegistrationBadRequestException'
import { Authorization } from '@/modules/auth/aggregate/AuthorizationAggregat'
import { mapGetters } from 'vuex'
import { ExceptionGettersTypes, ExceptionModuleTypes } from '@/store/modules/exception/types'

@Options({
  name: 'RegistrationForm',
  computed: mapGetters([ExceptionModuleTypes.EXCEPTION_MODULE].toString(), {
    getMassage: [ExceptionGettersTypes.GET_MASSAGE].toString()
  })
})

export default class RecoveryPassword extends Vue {
  email: null | string = null
  success: null | boolean = null
  massage: null | string = null

  created (): void {
    ExceptionAggregate.clear(REGISTRATION_COMPONENT)
  }

  doRecoveryPassword (): void {
    if (this.email !== null) {
      Authorization.recoveryPassword(this.email).then((r) => {
        console.log(r)
        this.success = r.isSuccess
        this.massage = r.message
      })
    }
  }
}
</script>

<style scoped>

</style>
