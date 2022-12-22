<template>
  <div>
    <select v-on:change="addAllowedRecipeIngredientMeasurement"
            v-model="selectedMeasurementUnit"
            class="form-select" aria-label="Default select example">
      <option selected disabled value="0">Mõõtühik</option>
      <option v-for="allowedMeasurement in allowedMeasurementUnits"
              :value="allowedMeasurement.measurementUnitId"> {{ allowedMeasurement.allowedMeasurementName }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  name: "IngredientAllowedMeasurement",
  data: function () {
    return {
      selectedMeasurementUnit: 0,

      allowedMeasurementUnits: [
        {
          measurementUnitId: 0,
          allowedMeasurementUnitId: 0,
          allowedMeasurementName: ''
        }
      ]
    }
  },
  methods: {

    resetSelectedMeasurementUnit: function () {
      this.selectedMeasurementUnit = 0
    },

    getAllowedRecipeIngredientMeasurementInfo: function (ingredientId) {
      this.$http.get("/ingredient/recipeAllowedMeasurement", {
            params: {
              ingredientId: ingredientId,
            }
          }
      ).then(response => {
        this.allowedMeasurementUnits = response.data
      }).catch(error => {
        console.log(error)
      })
    },

    addAllowedRecipeIngredientMeasurement: function () {
      this.$emit('clickSelectAllowedMeasurement', this.selectedMeasurementUnit)
    }

  },
}
</script>
