<template>
  <div v-if="allowedMeasurements.length > 0" class="table table-success table-striped ">
    <thead>
    <tr>
      <th scope="col">{#}</th>
      <th scope="col">Ühik</th>
      <th scope="col"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="measurement in allowedMeasurements">
      <th scope="row">{{ measurement.sequenceNumber }}</th>
      <td>{{ measurement?.measurementName }}</td>
      <td>
        <button v-on:click="delButtonClickEvent(measurement)" type="button" class="btn btn-sm btn-danger">
          Kustuta
        </button>
      </td>
    </tr>
    </tbody>
  </div>
</template>
<script>
export default {
  name: 'AllowedMeasurementTable',
  props: {
    allowedMeasurements: {}

  },

  methods: {
    delButtonClickEvent: function (measurement) {
      this.$emit('deleteButtonClickEvent', measurement)
    }
  }
}
</script>