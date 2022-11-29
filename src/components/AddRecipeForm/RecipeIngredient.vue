<template>

  <div class="col-md-3">

  <select @change="recipeChangeEvent"  v-model="selectedIngredient" class="form-select" aria-label="Default select example">
    <option v-for="ingredient in ingredients" :key="ingredient"/>


  </select>
</div>




</template>

<script>
export default {
  name: "RecipeIngredient",
  data: function (){
    return {
      ingredients: {
        selectedIngredient: '',
      }
    }
  },
  methods: {
    recipeChangeEvent: function (){
      this.$emit('recipeChangeEvent', this.selectedIngredient)
    },
  }
}
</script>

<style scoped>

</style>