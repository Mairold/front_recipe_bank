<template>
  <div>
    <input v-on:change="sendIngredientQuantity" v-model="ingredientQuantity" type="number" min="0.1"
           class="form-control" placeholder="Kogus">
  </div>
</template>

<script>


export default {
  name: "RecipeIngredientQuantity",
  data: function (){
    return {
      ingredientQuantity: 0,
    }

  },

  methods: {



    sendIngredientQuantity: function () {
      this.$emit('sendIngredientQuantity',this.ingredientQuantity)
    }
  }
}
</script>

<style scoped>

</style>