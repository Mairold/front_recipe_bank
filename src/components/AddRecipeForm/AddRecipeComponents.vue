<template>
  <div>
    <h3>Koostisosad:</h3>
    <div class="row g-3">
      <RecipeList ref="recipeIngredientTable"/>
      <div class="col-md-3">
        <RecipeIngredient :key="resetIngredientFields" ref="recipeIngredient" @clickSelectRecipeIngredientEvent="setRecipeIngredientId"/>
      </div>
      <div class="col-md-2">
        <RecipeIngredientQuantity :key="resetIngredientFields" ref="ingredientQuantity" @sendIngredientQuantity="setQuantity"/>
      </div>
      <div class="col-md-4">
        <IngredientAllowedMeasurement :key="resetIngredientFields" ref="allowedMeasurements" @clickSelectAllowedMeasurement="setSelectedAllowedMeasurement"/>
      </div>
      <div class="col-md-3 d-grid gap-2">
        <button v-on:click="addIngredient" class="btn btn-success" type="button">Lisa retseptile</button>
        <AlertMessage :errorResponse="errorResponse"/>
        <button v-on:click="addNewIngredient" class="btn btn-success" type="button">Lisa deeki uus toiduaine</button>
      </div>
    </div>
  </div>
</template>
<script>
import IngredientAllowedMeasurement from "@/components/AddRecipeForm/IngredientAllowedMeasurement.vue"
import RecipeIngredient from "@/components/AddRecipeForm/RecipeIngredient.vue"
import RecipeIngredientQuantity from "@/components/AddRecipeForm/RecipeIngredientQuantity.vue"
import RecipeList from "@/components/AddRecipeForm/RecipeList.vue"
import AlertMessage from "@/components/general/AlertMessage.vue";

export default {
  name: 'addRecipeComponents',
  components: {AlertMessage, IngredientAllowedMeasurement, RecipeIngredient, RecipeIngredientQuantity, RecipeList,},
  data: function () {
    return {
      recipeIngredientRequest: {
        recipeId: sessionStorage.getItem('inputRecipeId'),
        ingredientId: 0,
        ingredientQuantity: null,
        measurementUnitId: 0,
      },

      errorResponse: {
        message: '',
        alertAttClass: 'alert alert-danger'
      },
    }
  },

  methods: {

    addRecipeIngredientToRecipe: function () {
      this.$http.post("/ingredient/ingredientToRecipe", this.recipeIngredientRequest
      ).then(response => {
        this.$refs.recipeIngredientTable.getAllRecipeIngredients(this.recipeIngredientRequest.recipeId)
        this.resetIngredientFields()
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    addIngredient: function () {
      if (this.recipeIngredientRequest.ingredientId === 0 || this.recipeIngredientRequest.measurementUnitId === 0) {
        this.showErrorMessage('Palun täida kõik väljad', 'alert alert-danger')
      } else {
        this.addRecipeIngredientToRecipe();
      }
    },

    addNewIngredient: function () {
      this.$router.push({name: 'newIngredientRoute'})
    },

    setQuantity: function (ingredientQuantity) {
      this.recipeIngredientRequest.ingredientQuantity = ingredientQuantity
    },

    setSelectedAllowedMeasurement: function (selectedMeasurementUnit) {
      this.recipeIngredientRequest.measurementUnitId = selectedMeasurementUnit
    },

    setRecipeIngredientId: function (selectedIngredientId) {
      this.recipeIngredientRequest.ingredientId = selectedIngredientId
      this.$refs.allowedMeasurements.getAllowedRecipeIngredientMeasurementInfo(selectedIngredientId)
    },

    resetIngredientFields: function () {
      this.$refs.recipeIngredient.resetSelectedIngredientId()
      this.recipeIngredientRequest.ingredientId = 0
      this.$refs.ingredientQuantity.resetIngredientQuantity()
      this.recipeIngredientRequest.ingredientQuantity = null
      this.$refs.allowedMeasurements.resetSelectedMeasurementUnit()
      this.recipeIngredientRequest.measurementUnitId = 0
      this.$refs.recipeIngredientTable.resetIngredientInfo()
    },

    showErrorMessage: function (message, alertClass) {
      this.errorResponse.message = message
      this.errorResponse.alertAttClass = alertClass
    }
  }
}
</script>