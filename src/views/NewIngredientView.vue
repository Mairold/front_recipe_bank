<template>
  <div class="container overflow-hidden">

    <!--Üldandmed-->
    <div class="row justify-content-start mt-5">
      <IngredientNameInput :ingredient="ingredient"/>
    </div>
    <div class="row justify-content-start mt-2 mb-4">
      <div class="col-6 offset-md-2">
        <IngredientGroupSelect @groupChangeEvent="addInfoToGroupId"/>
      </div>
    </div>

    <!--Ühikute lisamine-->
    <IngredientSelectBox ref="resetSelectedId" :key="ingredient.ingredientGroupId" @addMeasurementUnit="addNewMeasurementUnit"/>

    <!--Lubatud ühikud-->
    <div class="row justify-content-start mt-5 ">
      <div class="col-4 offset-md-2">
        <AllowedMeasurementTable :allowedMeasurements="ingredient.allowedMeasurements"
                                 @deleteButtonClickEvent="deleteButtonClickEvent"/>
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
import AlertMessage from "@/components/general/AlertMessage";
import IngredientNameInput from "@/components/ingredient/IngredientNameInput";
import IngredientGroupSelect from "@/components/ingredient/IngredientGroupSelect";
import IngredientSelectBox from "@/components/ingredient/IngredientSelectBox";
import AllowedMeasurementTable from "@/components/ingredient/AllowedMeasurementTable";
import SaveButton from "@/components/general/SaveButton";
import BackButton from "@/components/general/BackButton";

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
        ingredientGroupId: 0,
        allowedMeasurements: [
          {
            measurementName: '',
            measurementId: 0
          }
        ],
      },
      errorResponse: {
        message: '',
        alertAttClass: 'alert alert-danger'
      }
    }
  },

  methods: {

    addInfoToGroupId: function (groupId) {
      this.ingredient.ingredientGroupId = groupId
    },

    validateDuplications: function (selectedMeasurement) {
      return this.ingredient.allowedMeasurements.filter(a => a.measurementName === selectedMeasurement.measurementName).length > 0;
    },

    addMeasurementToAllowedMeasurementsList: function (selectedMeasurement) {
      this.ingredient.allowedMeasurements.push({
        measurementName: selectedMeasurement.measurementName,
        measurementId: selectedMeasurement.measurementId
      })
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
      this.$router.push({name:'addRecipeRoute'})
    },

    resetAllFields: function () {
      this.ingredient.ingredientName = ''
      this.ingredient.ingredientGroupId = 0
      this.ingredient.allowedMeasurements = []
      this.$refs.resetSelectedId.resetSelected()
    },

    postIngredient: function () {
      let requestBody = this.ingredient
      requestBody?.allowedMeasurements.forEach(a => delete a['sequenceNumber']);

      this.$http.post("/ingredient", requestBody
      ).then(response => {
        this.showErrorMessage('Uus toiduaine salvestatud.', 'alert alert-success');
        console.log(response.data)
        this.resetAllFields()
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

    isAllInputPresent: function () {
      return this.ingredient.ingredientName.length === 0 ||
          this.ingredient.ingredientGroupId === 0 ||
          this.ingredient.allowedMeasurements?.length === 0;
    },

    addIngredient: function () {
      if (this.isAllInputPresent()) {
        this.showErrorMessage('Palun täida kõik väljad. Vähemalt üks lubatud ühik peab olema lisatud.', 'alert alert-danger');
      } else {
        this.postIngredient();
      }
    },
  },
  beforeMount() {
    this.ingredient.allowedMeasurements = []
  }
}
</script>
