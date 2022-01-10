<template>
  <div class="navbar-collapse collapse navbar-inverse-collapse">
    <div class="navbar-form navbar-right" id="user">
      <p v-on:click="isMenuOpen = !isMenuOpen">
        Вы вошли как <span class="namex">{{ getUserName() }}</span>
      </p>
      <ul class="submenu" v-bind:style="getStyle()">
        <li><a href="/cabinet/">Профайл</a></li>
        <li><a href="/?exit=true" id="exit">Выйти</a></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component'
import { mapGetters } from 'vuex'
import { ProfileGettersTypes, ProfileModuleTypes } from '@/store/modules/profile/types'
import { IUserData } from '@/modules/profile/entitys/UserDataEntity'

@Options({
  name: 'user-navbar',
  computed: mapGetters([ProfileModuleTypes.PROFILE_MODULE].toString(), {
    getUser: [ProfileGettersTypes.GET_USER_DATA].toString()
  })
})

export default class UserNavbar extends Vue {
  getUser!: IUserData | null
  isMenuOpen = false

  getUserName (): string | null {
    if (this.getUser !== null) {
      return this.getUser.name
    }

    return null
  }

  getStyle (): string | null {
    return this.isMenuOpen ? 'height: 100px;' : null
  }
}
</script>

<style scoped>

</style>
