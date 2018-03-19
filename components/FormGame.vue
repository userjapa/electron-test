<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <h3>{{result?'Resultado':'Jogo'}}</h3>
              <p>{{`Quantidade de Números Assinalados: ${numbers.length}`}}</p>
            </slot>
          </div>

          <div class="modal-body">
            <Jogo :numbers="numbers"/>
          </div>

          <div class="modal-footer">
            <button class="modal-default-button" @click="close()">
              Fechar
            </button>
            <button v-if="(edit === null) && !result" class="modal-default-button" @click="addGame(jogo)">
              Adicionar Jogo
            </button>
            <button v-if="(edit !== null) && !result" class="modal-default-button" @click="editGame(jogo)">
              Editar
            </button>
            <button v-if="result && (edit === null)" class="modal-default-button" @click="addResult(jogo)">
              Adicionar Resultado
            </button>
            <button v-if="result && (edit !== null)" class="modal-default-button" @click="addResult(jogo)">
              Editar Resultado
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { data, methods, props, components, mounted } from './form-game'

export default {
  name: 'formGame',
  data,
  methods,
  props,
  components,
  mounted
}
</script>

<style>
@import url('./form-game/style.css');
</style>
