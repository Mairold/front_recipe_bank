<template>
    <div class="col-2 offset-md-2">

      <select v-on:change="clickSelectMeasurement"  v-model="selectedMeasurementId"
              class="form-select" aria-label="Default select example">
        <option selected disabled>Vali ühik</option>
        <option v-for="unit in measurements" :value="unit.measurementId"> {{ unit.measurementName }}</option>
      </select>
    </div>

</template>
<script>
export default {
  name: 'RecipeIngredientSelectBox',

  data: function () {
    return {
      measurements: [
        {
          measurementId: 0,
          measurementName: ''
        }
      ],
      selectedMeasurementId: 0,
    }
  },

  methods: {
    clickSelectMeasurement: function (){
      this.$emit('clickSelectMeasurement', this.selectedMeasurementId)
    },


    getAllMeasurements: function () {
      this.$http.get("/ingredient/measurements")
          .then(response => {
            this.measurements = response.data
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
  beforeMount() {
    this.getAllMeasurements()
  }
}
</script>