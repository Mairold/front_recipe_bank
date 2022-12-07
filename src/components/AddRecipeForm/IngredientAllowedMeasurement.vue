<template>
  <div>
    <select v-on:change="addAllowedRecipeIngredientMeasurement"
            v-model="selectedMeasurementUnit"
            class="form-select" aria-label="Default select example">
      <option selected disabled>Mõõtühik</option>
      <option v-for="allowedMeasurement in allowedMeasurementUnits"
              :value="allowedMeasurement.measurementUnitId"> {{ allowedMeasurement.allowedMeasurementName }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "IngredientAllowedMeasurement",
  props: {
    allowedMeasurementUnits: {}
  },
  data: function () {
    return {
      selectedMeasurementUnit: 0,

    }
  },
  methods: {


    // getAllowedRecipeIngredientMeasurementInfo: function () {
    //   this.$http.get("/ingredient/recipeAllowedMeasurement")
    //       .then(response => {
    //         this.allowedMeasurementUnits = response.data
    //         console.log(response.data)
    //       })
    //       .catch(error => {
    //         console.log(error)
    //       })
    // },

    addAllowedRecipeIngredientMeasurement: function () {
      this.$emit('clickSelectAllowedMeasurement', this.selectedMeasurementUnit)
    }

  },
}
</script>

<style scoped>

</style>