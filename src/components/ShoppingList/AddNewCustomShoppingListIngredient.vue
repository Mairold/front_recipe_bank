<template>
    <button v-on:click="addNewCustomShoppingListIngredient" type="button" class="btn btn-success">Lisa poenimekirja
    </button>
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