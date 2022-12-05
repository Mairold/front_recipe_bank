<template>
  <div>
    <input v-on:change="sendIngredientQuantity" v-model="ingredientQuantity" type="number" pattern="[0-9]" class="form-control" placeholder="Kogus">
  </div>
</template>

<script>

import ingredientQuantity from "@/components/ShoppingList/IngredientQuantity";

export default {
  name: "RecipeIngredientQuantity",
  data: function (){
    return {
      ingredientQuantity: 0,
      // ingredient: [
      //   {
      //
      //   }
      //]
    }

  // props: {
  //   ingredientQuantity: {}
  },

  methods: {



    sendIngredientQuantity: function () {
      this.$emit('sendIngredientQuantity',this.ingredientQuantity)
    }
  }
}
</script>

<style scoped>

</style>