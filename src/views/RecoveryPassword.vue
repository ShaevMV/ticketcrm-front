<template>
  <div>
    <send-new-password-form :token="token"></send-new-password-form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import SendNewPasswordForm from '@/components/auth/SendNewPasswordForm.vue'

@Options({
  name: 'RecoveryPassword',
  components: { SendNewPasswordForm },
  props: {
    token: String
  }
})

export default class RecoveryPassword extends Vue {
  token!: string
}

</script>

<style scoped>

</style>
