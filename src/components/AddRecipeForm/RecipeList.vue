<template>
  <div class="table table-success table-striped ">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">KOOSTISOSA</th>
      <th scope="col">KOGUS</th>
      <th scope="col">ÜHIK</th>
      <th scope="col">KUSTUTA?</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="ingredient in recipeIngredientInfo">
      <td>{{ ingredient.sequenceNumber }}</td>
      <td>{{ ingredient.ingredientName }}</td>
      <td>{{ ingredient.quantity }}</td>
      <td>{{ ingredient.measureUnitName }}</td>
      <td>
        <button v-on:click="deleteFromList(ingredient.recipeIngredientId)" type="button" class="btn btn-sm btn-danger">
          Kustuta
        </button>
      </td>
    </tr>
    </tbody>
  </div>
</template>
<script>
export default {
  name: "RecipeList",
  data: function () {
    return {
      recipeIngredientInfo: [
        {
          recipeIngredientId: 0,
          ingredientName: '',
          quantity: 0,
          measureUnitName: '',
        }
      ],
    }
  },

  methods: {

    getAllRecipeIngredients: function () {
      if (sessionStorage.getItem('inputRecipeId') !== null) {
        this.$http.get("/ingredient/in-recipe", {
          params: {
            recipeId: sessionStorage.getItem('inputRecipeId')
          }
        }).then(response => {
          this.recipeIngredientInfo = response.data
          this.addSequenceNumbers()
        }).catch(error => {
          console.log(error)
        })
      }
    },

    deleteFromList: function (recipeIngredientId) {
      this.$http.delete("/ingredient/in-recipe", {
            params: {
              recipeIngredientId: recipeIngredientId,
            }
          }
      ).then(response => {
        this.getAllRecipeIngredients()
        this.addSequenceNumbers()
      }).catch(error => {
        console.log(error)
      })
    },

    resetIngredientInfo: function () {
      this.recipeIngredientInfo = []
    },

    addSequenceNumbers: function () {
      let counter = 1
      this.recipeIngredientInfo.forEach(data => {
        data.sequenceNumber = counter
        counter++
      })
    }
  },

  beforeMount() {
    this.recipeIngredientInfo = []
    this.getAllRecipeIngredients()
  }
}
</script>
