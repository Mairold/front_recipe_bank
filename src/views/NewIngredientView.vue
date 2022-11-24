<template>
  <div class="container overflow-hidden">

    <!--Üldandmed-->

    <div class="row justify-content-start mt-5">
      <div class="col-6 offset-md-2">
        <div class="form-floating ">
          <input v-model="ingredient.ingredientName" type="text" class="form-control" id="floatingInput" placeholder="">
          <label for="floatingInput">Toiduaine nimetus</label>
        </div>
      </div>
    </div>
    <div class="row justify-content-start mt-2 mb-4">
      <div class="col-6 offset-md-2">
        <select v-model="ingredient.selectedIngredientGroupId" class="form-select" aria-label="Default select example">
          <option selected>Vali grupp</option>
          <option v-for="ingredientGroup in " value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>


    <!--Ühikute lisamine-->
    <div class="row justify-content-start mt-5">
      <div class="col-2 offset-md-2">
        <select v-model="selectedMeasurementId" class="form-select" aria-label="Default select example">
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
      <div class="col-4 offset-md-2">
        <div class="table table-success table-striped ">
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
            <td v-for="measurement in ingredient.allowedMeasurements">{{ measurement.allowedMeasurementName }}</td>
            <td>
              <button type="button" class="btn btn-sm btn-danger">Kustuta</button>
            </td>
          </tr>
          </tbody>
        </div>
      </div>
      <div class="col-2">
        <div v-if="errorResponse.message.length > 0" class="alert alert-danger" role="alert">
          {{ errorResponse.message }}
        </div>
      </div>
    </div>

    <!--Nupud-->
    <div>
      <div class="row row-cols-auto justify-content-center mt-5">
        <div class="col offset-md-2">
          <button v-on:click="addIngredient" type="button" class="btn btn-success">Salvesta deeki</button>
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
      ingredient: {
        ingredientName: '',
        selectedIngredientGroupId: '',
        allowedMeasurements: [
          {
            allowedMeasurementId: 0,
            allowedMeasurementName: ''
          }
        ],
      },
      ingredientGroups: [
        {
          ingredientGroupName: ''
        }
      ],
      measurements: [
        {
          measurementId: 0,
          measurementName: ''
        }
      ],
      selectedMeasurementId: 0,
      errorResponse: {
        message: 'Proov',
        errorCode: ''
      }
    }
  },

  methods: {


    addMeasurementUnit: function () {
      let addedIngredient = this.measurements.find(x => x.id === this.selectedMeasurementId)
      if (this.ingredient.allowedMeasurements.includes(addedIngredient.measurementName)) {
        this.ingredient.allowedMeasurements.push()
      } else {
        this.errorResponse.message = 'Oled selle ühiku juba lisanud!'
      }
    },

    addIngredient: function () {
      this.$http.post("/ingredient/", this.ingredient
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    getAllMeasurements: function () {
      this.$http.get("/ingredientsu/measurements")
          .then(response => {
            this.measurements = response.data
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    },

    getAllIngredientGroups: function () {
      this.$http.get("/ingredient/group")
          .then(response => {
            this.ingredientGroups = response.data
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    },
  }
  ,
  beforeMount() {
    this.getAllMeasurements()
    this.getAllIngredientGroups()
  }
}
</script>
