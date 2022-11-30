<template>

  <select v-on:change="clickSelectRecipeIngredientEvent" v-model="selectedIngredient"
          class="form-select" aria-label="Koostisosa">
    <option selected disabled value="0">Koostisosa</option>
    <option v-for="ingredient in ingredients" :key="ingredient.ingredientNameId"
            :value="ingredient.ingredientNameId"> {{ ingredient.ingredientName }}
    </option>
  </select>


</template>

<script>
export default {
  name: "RecipeIngredient",

  data: function () {
    return {
      selectedIngredient: {
        ingredientName: '',
        ingredientId: 0,
      },
      ingredients: [
        {
          ingredientName: '',
          ingredientNameId: 0,
        }
      ]
    }
  },

  methods: {
    getAllIngredientInfo: function () {
      this.$http.get("/addRecipe/recipeIngredient")
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          });
    },
    clickSelectRecipeIngredientEvent: function (){
      this.$emit('clickSelectRecipeIngredientEvent'), this.selectedIngredient
    }
  },
  beforeMount() {
    this.getAllIngredientInfo()
  }
}
</script>

<style scoped>

</style>