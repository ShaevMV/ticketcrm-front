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
            <button type="submit" class="btn btn-primary" id="enter_reg">Отправить новый пароль</button>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ExceptionAggregate } from '@/modules/exception/aggregates/ExceptionAggregate'
import { REGISTRATION_COMPONENT } from '@/modules/profile/exeptions/registration/RegistrationBadRequestException'

@Options({
  name: 'RegistrationForm'
})

export default class RecoveryPassword extends Vue {
  email: null | string = null

  created (): void {
    ExceptionAggregate.clear(REGISTRATION_COMPONENT)
  }
}
</script>

<style scoped>

</style>
