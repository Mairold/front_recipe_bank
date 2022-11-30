<template>
  <table class="table table-success table-striped">
    <ChooseRecipeTableHead/>
    <tbody>
    <tr v-for="recipe in recipes" :key="recipe.recipeId">
      <th scope="row">{{ recipe.sequenceNumber }}</th>
      <td>{{ recipe.categoryName }}</td>
      <td>{{ recipe.recipeName }}</td>
      <td>{{ recipe.prepTime }}</td>
      <td>
        <button v-on:click="clickAlertButtonEvent(recipe.recipeName)" type="button" class="btn btn-light">Lisa
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
    return {}
  },
  methods: {
    clickAlertButtonEvent: function (recipeName) {
      this.$emit('clickAlertButtonEvent', recipeName)

    },
  }
}
</script>