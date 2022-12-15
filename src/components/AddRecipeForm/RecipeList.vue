<template>

  <div class="table table-success table-striped ">
    <thead>
    <tr>
      <th scope="col">KOOSTISOSA</th>
      <th scope="col">KOGUS</th>
      <th scope="col">ÜHIK</th>
      <th scope="col">KUSTUTA?</th>

    </tr>
    </thead>
    <tbody>
    <tr v-for="ingredient in recipeIngredientInfo">
      <td>{{ ingredient.ingredientName }}</td>
      <td>{{ ingredient.quantity }}</td>
      <td>{{ ingredient.measureUnitName }}</td>
      <td><button v-on:click="deleteFromList(ingredient.recipeIngredientId)" type="button" class="btn btn-sm btn-danger">Kustuta</button></td>
    </tr>
    </tbody>
  </div>
</template>

<script>
export default {
  name: "RecipeList",
  props: {
    recipeIngredientInfo: {}
  },

  methods: {
      deleteFromList: function (recipeIngredientId) {
        this.$http.delete("/ingredient/in-recipe", {
              params: {
                recipeIngredientId: recipeIngredientId,
              }
            }
        ).then(response => {
          this.$emit('recipeIngredientDeleteEvent')
        }).catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
