<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <h3>Jogo</h3>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <Jogo :numbers="numbers"/>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="addGame(jogo)">Adicionar Jogo</button>
              <button class="modal-default-button" @click="addResult(jogo)">Adicionar Resultado</button>
            </slot>
            <button class="modal-default-button" @click="close()">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { data, methods, props, components } from './form-game'

export default {
  name: 'formGame',
  data,
  methods,
  props,
  components
}
</script>

<style>
@import url('./form-game/style.css');
</style>
