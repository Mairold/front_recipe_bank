<template>

  <select v-on:change="clickSelectRecipeIngredientEvent" v-model="selectedIngredientId"
          class="form-select" aria-label="Koostisosa">
    <option selected disabled value="0">Koostisosa</option>
    <option v-for="ingredient in ingredients" :key="ingredient.ingredientId"
            :value="ingredient.ingredientId"> {{ ingredient.ingredientName }}
    </option>
  </select>


</template>

<script>
export default {
  name: "RecipeIngredient",

  data: function () {
    return {
      selectedIngredientId:0,
      ingredients: [
        {
          ingredientName: '',
          ingredientId: 0,
        }
      ]
    }
  },

  methods: {
    getAllIngredientInfo: function () {
      this.$http.get("/ingredient/recipeIngredient")
          .then(response => {
            this.ingredients = response.data
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          });

    },
    clickSelectRecipeIngredientEvent: function (){
      this.$emit('clickSelectRecipeIngredientEvent', this.selectedIngredientId)
    }
  },
  beforeMount() {
    this.getAllIngredientInfo()
  }
}
</script>

<style scoped>

</style>