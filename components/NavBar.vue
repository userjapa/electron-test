<template lang="html">
  <nav>
    <div class="container" ref="menu">
      <nuxt-link to="/" v-on:click.native="select" class="item">
        <div>
          Main
        </div>
      </nuxt-link>
      <nuxt-link to="/about" v-on:click.native="select" class="item">
        <div>
          About page
        </div>
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
import { methods, mounted } from './menu'

export default {
  name: 'navBar',
  methods,
  mounted
}
</script>

<style lang="css">
@import url('./menu/style.css');
</style>
