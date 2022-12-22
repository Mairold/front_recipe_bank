<template>
  <div>
    <input v-on:change="sendIngredientQuantity" v-model="ingredientQuantity" type="number" min="0"
           class="form-control" placeholder="Kogus">
  </div>
</template>
<script>
export default {
  name: "RecipeIngredientQuantity",
  data: function (){
    return {
      ingredientQuantity: null,
    }
  },

  methods: {

    resetIngredientQuantity: function() {
      this.ingredientQuantity = null
    },

    sendIngredientQuantity: function () {
      this.$emit('sendIngredientQuantity',this.ingredientQuantity)
    }
  }
}
</script>
