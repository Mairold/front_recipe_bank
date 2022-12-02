<template>
  <div>
    <input v-on:change="insertQuantity" v-model="ingredientQuantity" type="number" pattern="[0-9]"
           class="form-control" id="ingredientQuantityId"
           placeholder="Kogus">

  </div>
</template>

<!-- Parentis on datagrupis "ingredientQuantity" on 2 korda, kuidas ta teab, et kumba mõtlen.   -->

<script>

export default {
  name: "RecipeIngredientQuantity",
  props: {
    ingredientQuantity: {}
  },


  methods: {
    insertQuantity: function (){
      this.$emit('insertQuantity'),this.ingredientQuantity
    }
  }
}
</script>

<style scoped>

</style>