<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <login-form v-if="!isAuth"></login-form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue'
import LoginForm from '@/components/LoginForm.vue'
import { mapGetters } from 'vuex'

@Options({
  name: 'Home',
  components: {
    LoginForm,
    HelloWorld
  },
  computed: mapGetters('profile', ['isAuth'])
})

export default class Home extends Vue {
}
</script>
