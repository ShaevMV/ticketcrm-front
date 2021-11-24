<template>
  <navbar></navbar>
  <router-view/>
</template>
<script>
import Navbar from '@/components/navbar/Navbar'
export default {
  components: {Navbar}
}
</script>
