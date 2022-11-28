<template>
  <div class="col-6 offset-md-2">
    <div class="form-floating ">
      <input v-model="ingredient.ingredientName" type="text" class="form-control" id="floatingInput" placeholder="">
      <label for="floatingInput">Toiduaine nimetus</label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IngredientNameInput',
  props: {
    ingredient: {}
  }
}
</script>