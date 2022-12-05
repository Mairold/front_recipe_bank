<template>
  <table class="table table-success table-striped">
    <thead>
    <tr>
      <th scope="col">KOOSTISOSA</th>
      <th scope="col">KOGUS</th>
      <th scope="col">ÜHIK</th>

    </tr>
    </thead>
    <tbody>
    <tr v-for="ingredient in recipeIngredientInfo">
      <td>{{ ingredient.ingredientId }}</td>
      <td>{{ ingredient.ingredientQuantity }}</td>
      <td>{{ ingredient.measurementId }}</td>
    </tr>
    </tbody>

  </table>
</template>

<script>
export default {
  name: "RecipeList",
  props: {
    recipeId: 0
  },
  data: function () {
    return {
      recipeIngredientInfo: [
        {
          ingredientId: 0,
          ingredientName: '',
          ingredientQuantity: 0,
          measurementName: '',
        }
      ]
    }
  },

  methods: {

    getAllRecipeIngredients: function () {
      this.$http.get("/recipe/ingredient", {
        params: {
          recipeId: this.recipeId
        }
      })
          .then(response => {
            this.recipeIngredientInfo = response.data
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    },
  },

  beforeMount() {
    this.recipeIngredientInfo = []
    this.getAllRecipeIngredients()
  }

}
</script>

<style scoped>

</style>