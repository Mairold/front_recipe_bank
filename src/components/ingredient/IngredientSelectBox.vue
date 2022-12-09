<template>
  <div class="row justify-content-start mt-5">
    <div class="col-2 offset-md-2">
      <select v-model="selectedMeasurement" class="form-select" aria-label="Default select example">
        <option selected disabled>Vali ühik</option>
        <option v-for="unit in measurements" :value="unit"> {{ unit.measurementName }}</option>
      </select>
    </div>
    <div class="col-4">
      <button v-on:click="addMeasurementUnit" type="button" class="btn btn-success">Lisa lubatud ühikud</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IngredientSelectBox',
  data: function () {
    return {
      measurements: [
        {
          measurementId: 0,
          measurementName: ''
        }
      ],
      selectedMeasurement: {
        measurementId: 0,
        measurementName: ''
      }
    }
  },

  methods: {
    addMeasurementUnit: function () {
      this.$emit('addMeasurementUnit', this.selectedMeasurement)
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

    resetSelected: function () {
      this.selectedMeasurement = {}
    }
  },
  beforeMount() {
    this.getAllMeasurements()
  }
}
</script>