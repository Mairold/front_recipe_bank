<template>
  <div class="col-lg-5">

    <input v-model="recipeName" type="text" class="form-control" id="recipeId"
           placeholder="Retsepti pealkiri">

  </div>
</template>

<script>
export default {
  name: "RecipeNameInput",
  props:{
    recipeName:{}
  }
}
</script>

<style scoped>

</style>