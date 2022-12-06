<template>
  <div>
    <div  class="row justify-content-center">
      <div class="col">
        <table  class="table table-success table-striped">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nimi</th>
            <th scope="col">Inimeste arv</th>
            <th scope="col">Kommentaar</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="recipe in recipesInMenuSection" :key="recipe.recipeInSectionId" v-if="recipe.sectionInMenuId === section.sectionId">
            <th scope="row">1</th>
            <td>{{ recipe.recipeName }}</td>
            <td>{{ recipe.plannedServingSize }}</td>
            <td>{{ recipe.recipeComment }}</td>
            <td>
              <button v-on:click="changeRecipeInSection(recipe.recipeInSectionId)" type="button"
                      class="btn btn-success">Muuda
              </button>
            </td>
            <td>
              <button v-on:click="deleteRecipeInSection(recipe.recipeInSectionId)" type="button" class="btn btn-danger">Kustuta</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RecipesInSectionTable',
  props: {
    recipesInMenuSection: {},
    section: {}
  },

  methods: {
    changeRecipeInSection: function (recipeInSectionId) {
      console.log(recipeInSectionId)
      this.$emit('changeButtonClickEvent', recipeInSectionId)
    },

    deleteRecipeInSection: function (recipeInSectionId) {
      this.$emit('deleteButtonClickEvent', recipeInSectionId)
    }
  }
}
</script>