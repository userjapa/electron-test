<template>
  <div>
    <p>Testing Vuex: {{ message }}</p>
  </div>
</template>

<script>
export default {
  asyncData ({ store }) {
    return store.dispatch('fetchMain')
  },
  computed: {
    message () {
      return this.$store.state.message
    }
  },
  layout: 'sample'
}
</script>
