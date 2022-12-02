<template>
  <div class="col-4">
    <button v-on:click="updateShoppingList" type="button" class="btn btn-success">Salvesta poenimekiri
    </button>
  </div>
</template>
<script>
export default {
  name: 'UpdateShoppingListButton',
  methods: {
    updateShoppingList: function () {
      this.$emit('updateButtonClickEvent')
    }
  }
}
</script>