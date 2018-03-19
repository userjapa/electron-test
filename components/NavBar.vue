<template lang="html">
  <nav>
    <div class="container" ref="menu">
      <nuxt-link to="/" v-on:click.native="select" class="item">
        <div>
          Jogos
        </div>
      </nuxt-link>
      <nuxt-link to="/estatistica" v-on:click.native="select" class="item">
        <div>
          Estatística
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
