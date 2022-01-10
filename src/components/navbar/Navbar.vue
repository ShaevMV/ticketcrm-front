<template>
  <div class="navbar navbar-inverse">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-inverse-collapse">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <h3 id="type">
          <a href="javascript:void(0);" v-on:click="goInHomePage">
            Страница регистраций Solar Systo Togathering 2021
          </a>
        </h3>
      </div>
      <user-navbar v-if="isAuth"></user-navbar>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import UserNavbar from '@/components/navbar/UserNavbar.vue'
import { mapGetters } from 'vuex'
import { ProfileGettersTypes, ProfileModuleTypes } from '@/store/modules/profile/types'

@Options({
  name: 'navbar',
  components: { UserNavbar },
  computed: mapGetters([ProfileModuleTypes.PROFILE_MODULE].toString(), {
    isAuth: [ProfileGettersTypes.IS_AUTH].toString()
  })
})

export default class Navbar extends Vue {
  goInHomePage (): void {
    this.$router.push('/')
  }
}
</script>
