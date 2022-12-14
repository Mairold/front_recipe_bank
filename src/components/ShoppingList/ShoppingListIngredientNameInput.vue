<template>
  <div class="col-4">
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">Toode</span>
      <input v-model="ingredientName" v-on:change="sendIngredientName" type="text" class="form-control"
             aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    </div>
  </div>
</template>
<script>
export default {
  name: 'ShoppingListIngredientNameInput',
  data: function () {
    return {
      ingredientName: '',
    }
  },

  methods: {
    sendIngredientName: function () {
      this.$emit('addIngredientNameEvent', this.ingredientName)
    },

    resetData: function () {
      this.ingredientName = ''
    }
  }
}
</script>