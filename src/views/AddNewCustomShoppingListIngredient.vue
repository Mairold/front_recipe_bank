<template>
  <div class="col -2">
    <button v-on:click="addNewCustomShoppingListIngredient" type="button" class="btn btn-success">Lisa poenimekirja
    </button>
  </div>
</template>
<script>
export default {
  name: 'addNewCustomShoppingListIngredient',
  methods: {
    addNewCustomShoppingListIngredient: function () {
      this.$emit('saveShoppingListIngredientEvent')
    }
  }
}
</script>