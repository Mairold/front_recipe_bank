<template>
  <div class="col offset-md-2">
    <button v-on:click="saveClickEvent" type="button" class="btn btn-success">Salvesta deeki</button>
  </div>
</template>
<script>
export default {
  name: 'SaveButton',
  methods: {
    saveClickEvent: function () {
      this.$emit('addIngredient')
    }
  }
}
</script>