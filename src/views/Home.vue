<template>
  <div>
    <login-form v-if="!isAuth && !isRegistration" @showRegistration="onShowRegistration"></login-form>
    <registration-form v-if="!isAuth && isRegistration" @showRegistration="onShowRegistration"></registration-form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue'
import LoginForm from '@/components/LoginForm.vue'
import { mapGetters } from 'vuex'
import { ProfileGettersTypes, ProfileModuleTypes } from '@/store/modules/profile/types'
import RegistrationForm from '@/components/RegistrationForm.vue'

@Options({
  name: 'Home',
  components: {
    RegistrationForm,
    LoginForm,
    HelloWorld
  },
  computed: mapGetters([ProfileModuleTypes.PROFILE_MODULE].toString(), {
    isAuth: [ProfileGettersTypes.IS_AUTH].toString()
  })
})

export default class Home extends Vue {
  isRegistration = false

  onShowRegistration (isShow: any): void {
    this.isRegistration = isShow
  }
}
</script>
