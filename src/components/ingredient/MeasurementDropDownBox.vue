<template>
  <div class="col-3">
    <select v-on:change="sendMeasurementId" v-model="selectedMeasurementId" class="form-select" aria-label="Default select example">
      <option selected disabled value="0">--Vali ühik--</option>
      <option v-for="unit in measurements" :value="unit.measurementId"> {{ unit.measurementName }}</option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'MeasurementDropDownBox',
  props: {
    ingredientMeasurementId: 0,
  },
  data: function () {
    return {
      measurements: [
        {
          measurementId: 0,
          measurementName: ''
        }
      ],
      selectedMeasurementId: this.ingredientMeasurementId,

    }
  },
  methods: {
    sendMeasurementId: function () {
      this.$emit('SendMeasurementIdEvent', this.selectedMeasurementId)
    },

    getAllMeasurements: function () {
      this.$http.get("/ingredient/measurements")
          .then(response => {
            this.measurements = response.data
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
