<template>
  <div class="col-2">
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">Kogus</span>
      <input v-model="ingredientQuantity" v-on:change="sendIngredientQuantity" type="number" min="0" class="form-control"
             aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    </div>
  </div>
</template>
<script>
export default {
  name: 'IngredientQuantity',
  data: function () {
    return {
      ingredientQuantity: 0,
    }
  },

  methods: {
    sendIngredientQuantity: function () {
      this.$emit('addIngredientQuantityEvent',this.ingredientQuantity)
    },

    resetData: function () {
      this.ingredientQuantity = 0
    }
  }
}
</script>