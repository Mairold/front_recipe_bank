<template>
  <div>
    <select v-on:change="addIngredient" v-model="selectedIngredientId"
            class="form-select" aria-label="Default select example">
      <option selected disabled value="0">Koostisosa</option>
      <option v-for="ingredient in ingredients" :value="ingredient.ingredientId"> {{
          ingredient.ingredientName
        }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  name: "RecipeIngredient",
  data: function () {
    return {
      selectedIngredientId: 0,

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

    addIngredient: function () {
      this.$emit('clickSelectRecipeIngredientEvent', this.selectedIngredientId)
    },

    resetSelectedIngredientId: function () {
      this.selectedIngredientId = 0
    }
  },

  beforeMount() {
    this.getAllIngredientInfo()
  }
}
</script>
