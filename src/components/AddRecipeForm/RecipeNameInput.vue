<template>
  <div class="col-lg-5">
    <input v-on:change="recipeId.recipeName" type="text" class="form-control" id="recipeId"
           placeholder="Retsepti pealkiri">
  </div>
</template>

<script>
export default {
  name: "RecipeNameInput",
  props:{
    recipeId:{}
  }
}
</script>

<style scoped>

</style>