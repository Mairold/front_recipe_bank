<template>
  <div>
    <input v-on:change="insertQuantity" v-model="ingredientQuantity" type="number" pattern="[0-9]"
           class="form-control" id="ingredientQuantityId"
           placeholder="Kogus">

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
    insertQuantity: function (){
      this.$emit('insertQuantity'),this.ingredientQuantity
    }
  }
}
</script>

<style scoped>

</style>