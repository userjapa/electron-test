<template>
  <div class="main">
    <header>
      <NavBar/>
    </header>
    <div>
      <nuxt/>
    </div>
  </div>
</template>

<script>
import { components } from './main'

export default {
  name: 'sample',
  components
}
</script>

<style lang="css">
@import url('./main/style.css');
</style>
