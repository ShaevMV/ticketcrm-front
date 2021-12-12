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
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class Navbar extends Vue {
  goInHomePage (): void {
    this.$router.push('/')
  }
}
</script>
