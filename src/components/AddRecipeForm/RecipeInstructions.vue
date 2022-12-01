<template>


  <div class="col-md-4">
    <input v-model="recipeInstructions" type="text" class="form-control" id="recipeId"
           placeholder="Retsepti pealkiri">

  </div>

</template>

<script>
export default {
  name: "RecipeInstructions",
  props: {
    recipeName: {}
  }
}
</script>

<style scoped>

</style>