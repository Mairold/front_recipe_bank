<template>
    <select v-on:change="sendMeasurementId" v-model="selectedMeasurementId" class="form-select"
            aria-label="--Vali mõõtühik--">
      <option selected disabled value="0">--Vali ühik--</option>
      <option v-for="unit in measurements" :value="unit.measurementId"> {{ unit.measurementName }}</option>
    </select>
</template>
<script>
export default {
  name: 'MeasurementDropDownBox',
  props: {
    measurement: 0
  },

  data: function () {
    return {
      selectedMeasurementId: this.measurement === undefined ? 0 : this.measurement,
      measurements: [
        {
          measurementId: 0,
          measurementName: ''
        }
      ]
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

    resetData: function () {
      this.selectedMeasurementId = ''
    }
  },

  beforeMount() {
    this.getAllMeasurements()
  }
}
</script>
