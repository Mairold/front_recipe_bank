<template>
  <table class="table table-success table-striped">
    <ChooseRecipeTableHead :sectionInMenuId="sectionInMenuId"/>
    <tbody>
    <tr v-for="recipe in recipes" :key="recipe.recipeId">
      <th scope="row">{{ recipe.sequenceNumber }}</th>
      <td>{{ recipe.categoryName }}</td>
      <td v-on:click="navigateToRecipeView(recipe.recipeId)">{{ recipe.recipeName }}</td>
      <td>{{ recipe.prepTime }}</td>
      <td v-if="sectionInMenuId !== null">
        <button v-on:click="clickAlertButtonEvent(recipe)" type="button" class="btn btn-light">Lisa
          menüüsse
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
import ChooseRecipeTableHead from "@/components/ChooseRecipe/ChooseRecipeTableHead";

export default {
  name: 'ChooseRecipeTable',
  components: {ChooseRecipeTableHead},
  props: {
    recipes: {}
  },
  data: function () {
    return {
      sectionInMenuId: sessionStorage.getItem('sectionInMenuId'),
    }
  },
  methods: {
    clickAlertButtonEvent: function (recipe) {
      this.$emit('clickAlertButtonEvent', recipe)

    },
    navigateToRecipeView: function (recipeId) {
      sessionStorage.setItem('recipeId', recipeId)
      this.$router.push({name: 'recipeRoute'})
    }
  }
}
</script>