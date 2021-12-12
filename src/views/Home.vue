<template>
  <div>
    <login-form v-if="!isAuth && type === 'login'" @showRegistration="onShowRegistration"></login-form>
    <registration-form v-if="!isAuth && type === 'registration'" @showRegistration="onShowRegistration"></registration-form>
    <recovery-password v-if="!isAuth && type === 'recoveryPassword'" @showRegistration="onShowRegistration"></recovery-password>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import { mapGetters } from 'vuex'
import { ProfileGettersTypes, ProfileModuleTypes } from '@/store/modules/profile/types'
import RegistrationForm from '@/components/auth/RegistrationForm.vue'
import RecoveryPasswordForm from '@/components/auth/RecoveryPasswordForm.vue'

@Options({
  name: 'Home',
  components: {
    RecoveryPassword: RecoveryPasswordForm,
    RegistrationForm,
    LoginForm,
    HelloWorld
  },
  computed: mapGetters([ProfileModuleTypes.PROFILE_MODULE].toString(), {
    isAuth: [ProfileGettersTypes.IS_AUTH].toString()
  })
})

export default class Home extends Vue {
  type = 'login'

  onShowRegistration (isShow: string): void {
    this.type = isShow
  }
}
</script>
