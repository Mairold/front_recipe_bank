<template>
  <div class="container overflow-hidden">

    <!--Üldandmed-->
    <div class="row justify-content-start mt-5">
      <IngredientNameInput :ingredient="ingredient"/>
    </div>
    <div class="row justify-content-start mt-2 mb-4">
      <IngredientGroupSelect @groupChangeEvent="addInfoToGroupId"/>
    </div>

    <!--Ühikute lisamine-->
    <IngredientSelectBox @addMeasurementUnit="addNewMeasurementUnit"/>

    <!--Lubatud ühikud-->
    <div class="row justify-content-start mt-5 ">
      <div class="col-4 offset-md-2">
        <AllowedMeasurementTable :allowedMeasurements="ingredient.allowedMeasurements"
                                 @deleteButtonClickEvent="deleteButtonClickEvent()"/>
      </div>
      <div class="col-2">
        <AlertMessage :error-response="errorResponse"/>
      </div>
    </div>

    <!--Nupud-->
    <div>
      <div class="row row-cols-auto justify-content-center mt-5">
        <SaveButton @addIngredient="addIngredient"/>
        <BackButton @backButtonAction="navigateToPreviousPage"/>
      </div>
    </div>
  </div>
</template>

<script>
import AlertMessage from "@/views/AlertMessage";
import IngredientNameInput from "@/views/IngredientNameInput";
import IngredientGroupSelect from "@/views/IngredientGroupSelect";
import IngredientSelectBox from "@/views/IngredientSelectBox";
import AllowedMeasurementTable from "@/views/AllowedMeasurementTable";
import SaveButton from "@/views/SaveButton";
import BackButton from "@/views/BackButton";

export default {
  name: "NewIngredientView",
  components: {
    BackButton, SaveButton, AllowedMeasurementTable, IngredientSelectBox,
    IngredientGroupSelect, IngredientNameInput, AlertMessage
  },
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
      errorResponse: {
        message: 'Proov',
        errorCode: '',
        alertAttClass: 'alert alert-danger'
      }
    }
  },

  methods: {

    addInfoToGroupId: function (groupId) {
      this.ingredient.selectedIngredientGroupId = groupId
    },

    validateDuplications: function (selectedMeasurement) {
      return this.ingredient.allowedMeasurements.filter(a => a.measurementName === selectedMeasurement.measurementName).length > 0;
    },

    addMeasurementToEndOfList: function (selectedMeasurement) {
      this.ingredient.allowedMeasurements.push({
        measurementName: selectedMeasurement.measurementName,
        measurementId: selectedMeasurement.measurementId
      })
    },

    replaceListFirstPosition: function (selectedMeasurement) {
      this.ingredient.allowedMeasurements[0].measurementName = selectedMeasurement.measurementName
      this.ingredient.allowedMeasurements[0].measurementId = selectedMeasurement.measurementId
    },

    addMeasurementToAllowedMeasurementsList: function (selectedMeasurement) {
      if (this.ingredient?.allowedMeasurements[0]?.measurementName === '') {
        this.replaceListFirstPosition(selectedMeasurement);
      } else {
        this.addMeasurementToEndOfList(selectedMeasurement);
      }
    },

    generateRowNumbers: function () {
      let counter = 1
      this.ingredient.allowedMeasurements.forEach(element => {
            element.sequenceNumber = counter++
          }
      )
    },

    addNewMeasurementUnit: function (selectedMeasurement) {
      this.errorResponse.message = ''
      if (selectedMeasurement.measurementName === '') {
        this.showErrorMessage('Sobiv ühik valimata!', 'alert alert-danger');
      } else {
        if (this.validateDuplications(selectedMeasurement)) {
          this.showErrorMessage('Oled selle ühiku juba lisanud!', 'alert alert-danger');
        } else {
          this.addMeasurementToAllowedMeasurementsList(selectedMeasurement);
        }
      }
      this.generateRowNumbers()
    },

    deleteButtonClickEvent: function (measurement) {
      let index = this.ingredient.allowedMeasurements.indexOf(measurement)
      this.ingredient.allowedMeasurements.splice(index, 1)
      this.generateRowNumbers()
    },

    navigateToPreviousPage: function () {
      // this.$router.push('page name')
      alert("See nupp viib eelmisele lehele")
    },

    postIngredient: function () {
      let requestBody = this.ingredient
      requestBody?.allowedMeasurements.forEach(a => delete a['sequenceNumber']);

      this.$http.post("/ingredient", requestBody
      ).then(response => {
        this.showErrorMessage('Uus toiduaine salvestatud.', 'alert alert-success');
        console.log(response.data)
      }).catch(error => {
        if (error.response.status === 403) {
          this.showErrorMessage(error.response.data?.message, 'alert alert-danger');
        }
        console.log(error)
      })
    },

    showErrorMessage: function (message, alertClass) {
      this.errorResponse.message = message
      this.errorResponse.alertAttClass = alertClass
    },

    addIngredient: function () {
      if (this.ingredient.ingredientName.length === 0 || this.ingredient.selectedIngredientGroupId === 0 || this.ingredient.allowedMeasurements.length === 0) {
        this.showErrorMessage('Palun täida kõik väljad. Vähemalt üks lubatud ühik peab olema lisatud.', 'alert alert-danger');
      } else {
        this.postIngredient();
      }
    },
  }
}
</script>
