<template>
  <div>
    <div class="form">
      <div class="option" v-for="x in 25" @click="select(x, $event.target)" :ref="x">
        {{x}}
      </div>
    </div>
  </div>
</template>

<script>
import { props, methods, mounted, watch } from './jogo-loto'

export default {
  name: 'jogo',
  props,
  methods,
  mounted,
  watch
}
</script>

<style>
@import url('./jogo-loto/style.css');
</style>
