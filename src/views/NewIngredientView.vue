<template>
  <div class="container overflow-hidden">

    <!--Üldandmed-->

    <div class="row justify-content-start mt-5">
      <div class="col-6 offset-md-2">
        <div class="form-floating ">
          <input type="text" class="form-control" id="floatingInput" placeholder="">
          <label for="floatingInput">Toiduaine nimetus</label>
        </div>
      </div>
    </div>
    <div class="row justify-content-start mt-2 mb-4">
      <div class="col-6 offset-md-2">
        <select class="form-select" aria-label="Default select example">
          <option selected>Vali grupp</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>


    <!--Ühikute lisamine-->
    <div class="row justify-content-start mt-5">
      <div class="col-2 offset-md-2">
        <select v-model:un  class="form-select" aria-label="Default select example">
          <option selected disabled>Vali ühik</option>
          <option v-for="unit in measurements" :value="unit.measurementId"> {{ unit.measurementName }}</option>
        </select>
      </div>
      <div class="col-4">
        <button v-on:click="addMeasurementUnit()" type="button" class="btn btn-success">Lisa lubatud ühikud</button>
      </div>
    </div>

    <!--Lubatud ühikud-->
    <div class="row justify-content-start mt-5 ">
      <div class="table table-success table-striped offset-md-2">
        <thead>
        <tr>
          <th scope="col">{#}</th>
          <th scope="col">Ühik</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
        </tr>
        </tbody>
      </div>
    </div>

    <!--Nupud-->
    <div>
      <div class="row row-cols-auto justify-content-center mt-5">
        <div class="col offset-md-2">
          <button type="button" class="btn btn-success">Salvesta deeki</button>
        </div>
        <div class="col pe-5 ">
          <button type="button" class="btn btn-success">Tagasi</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewIngredientView",
  data: function () {
    return {
      ingredientName: '',
      measurements: [
        {
          measurementId: 0,
          measurementName: ''
        }
      ]
    }
  },

  methods: {

    addMeasurementUnit: function () {

    },

    getAllMeasurements: function () {
      this.$http.get("/ingredient/new")
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

<style scoped>

</style>