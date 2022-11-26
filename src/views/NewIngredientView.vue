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
        <select v-model="ingredient.selectedIngredientGroupId" class="form-select" aria-label="--Vali grupp--">
          <option selected value="0">--Vali grupp--</option>
          <option v-for="ingredientGroup in ingredientGroups " :value="ingredientGroup.ingredientGroupId">
            {{ ingredientGroup.ingredientGroupName }}
          </option>
        </select>
      </div>
    </div>


    <!--Ühikute lisamine-->
    <div class="row justify-content-start mt-5">
      <div class="col-2 offset-md-2">
        <select v-model="selectedMeasurement" class="form-select" aria-label="Default select example">
          <option selected disabled>Vali ühik</option>
          <option v-for="unit in measurements" :value="unit"> {{ unit.measurementName }}</option>
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
          <tbody v-if="ingredient?.allowedMeasurements[0]?.measurementName !== ''">
          <tr v-for="measurement in ingredient?.allowedMeasurements">
            <th scope="row">{{ measurement.sequenceNumber }}</th>
            <td>{{ measurement?.measurementName }}</td>
            <td>
              <button v-on:click="deleteButtonClickEvent(measurement)" type="button" class="btn btn-sm btn-danger">
                Kustuta
              </button>
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
        selectedIngredientGroupId: 0,
        allowedMeasurements: [
          {
            measurementName: '',
            measurementId: 0
          }
        ],
      },
      ingredientGroups: [
        {
          ingredientGroupId: 0,
          ingredientGroupName: ''
        }
      ],
      measurements: [
        {
          measurementId: 0,
          measurementName: ''
        }
      ],
      selectedMeasurement: {
        measurementId: 0,
        measurementName: ''
      },
      errorResponse: {
        message: 'Proov',
        errorCode: ''
      }
    }
  },

  methods: {


    validateDuplications: function () {
      return this.ingredient.allowedMeasurements.filter(a => a.measurementName === this.selectedMeasurement.measurementName).length > 0;
    },

    addMeasurementToAllowedMeasurementsList: function () {
      if (this.ingredient?.allowedMeasurements[0]?.measurementName === '') {
        this.ingredient.allowedMeasurements[0].measurementName = this.selectedMeasurement.measurementName
        this.ingredient.allowedMeasurements[0].measurementId = this.selectedMeasurement.measurementId
      } else {
        this.ingredient.allowedMeasurements.push({
          measurementName: this.selectedMeasurement.measurementName,
          measurementId: this.selectedMeasurement.measurementId
        })
      }
    },

    addMeasurementUnit: function () {
      this.errorResponse.message = ''
      if (this.selectedMeasurement.measurementName === '') {
        this.errorResponse.message = 'Sobiv ühik valimata!'
      } else {
        if (this.validateDuplications()) {
          this.errorResponse.message = 'Oled selle ühiku juba lisanud!'
        } else {
          this.addMeasurementToAllowedMeasurementsList();
        }
      }
      this.generateRowNumbers()
    },

    generateRowNumbers: function () {
      let counter = 1
      this.ingredient.allowedMeasurements.forEach(element => {
            element.sequenceNumber = counter++
          }
      )
    },

    deleteButtonClickEvent: function (measurement) {
        let index = this.ingredient.allowedMeasurements.indexOf(measurement)
        this.ingredient.allowedMeasurements.splice(index,1)
        this.generateRowNumbers()
    },

    addIngredient: function () {
      let requestBody = this.ingredient
      requestBody.allowedMeasurements.forEach(a => delete a['sequenceNumber']);

      this.$http.post("/ingredient", requestBody
      ).then(response => {
        this.errorResponse.message = 'Uus toiduaine salvestatud'
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
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
