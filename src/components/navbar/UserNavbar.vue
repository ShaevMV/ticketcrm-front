<template>
  <div class="navbar-collapse collapse navbar-inverse-collapse">
    <div class="navbar-form navbar-right" id="user">
      <p v-on:click="isMenuOpen = !isMenuOpen">
        Вы вошли как <span class="namex">{{ getUserName() }}</span>
      </p>
      <ul class="submenu" v-bind:style="getStyle()">
        <li><a href="/cabinet/">Профайл</a></li>
        <li><a href="javascript:void(0);" v-on:click="logout">Выйти</a></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component'
import { mapGetters } from 'vuex'
import { ProfileGettersTypes, ProfileModuleTypes } from '@/store/modules/profile/types'
import { IUserData } from '@/modules/profile/entitys/UserDataEntity'
import { Authorization } from '@/modules/auth/aggregate/AuthorizationAggregat'
import { AUTH_TYPES } from '@/modules/auth/inject/types'
import { AuthApplication } from '@/modules/auth/application/AuthApplication'
import { domainContainer } from '@/domain/inject/domainInversify.config'

const authApplication = domainContainer.get<AuthApplication>(AUTH_TYPES.AuthApplication)
@Options({
  name: 'user-navbar',
  computed: mapGetters([ProfileModuleTypes.PROFILE_MODULE].toString(), {
    getUser: [ProfileGettersTypes.GET_USER_DATA].toString()
  })
})

export default class UserNavbar extends Vue {
  getUser!: IUserData | null
  isMenuOpen = false

  /**
   * Показать имя пользователя
   */
  getUserName (): string | null {
    if (this.getUser !== null) {
      return this.getUser.name
    }

    return null
  }

  /**
   * В
   */
  logout (): void {
    // Authorization.logAuth()
  }

  /**
   * Стиль для открытия меню
   */
  getStyle (): string | null {
    return this.isMenuOpen ? 'height: 100px;' : null
  }
}
</script>

<style scoped>

</style>
