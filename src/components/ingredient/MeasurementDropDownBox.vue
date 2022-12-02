<template>
  <div class="col-2">
    <select v-on:change="sendMeasurementId" v-model="selectedMeasurementId" class="form-select" aria-label="Default select example">
      <option selected disabled value="0">--Vali ühik--</option>
      <option v-for="unit in measurements" :value="unit.measurementId"> {{ unit.measurementName }}</option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'MeasurementDropDownBox',
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
