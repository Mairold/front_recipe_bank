<template>
  <div>
    <div class="row justify-content-center m-1">
      <h1>Lisatud toote andmete muutmine poenimekirjas</h1>
    </div>

    <div>
      <div class="row justify-content-center mt-2">
        <div class="col-lg-6">
          <div v-if="shoppingListItemRequest.shoppingListIngredientName !== null" class="input-group mb-3">
            <div class="form-floating ">
              <input disabled v-model="shoppingListItemRequest.shoppingListIngredientName" type="text"
                     class="form-control" id="ingredientInput" placeholder="">
              <label for="ingredientInput">Koostisosa nimetus</label>
            </div>
          </div>
          <div v-else class="input-group mb-3">
            <div class="form-floating ">
              <input v-model="shoppingListItemRequest.customIngredientName"
                     type="text"
                     class="form-control" id="customInput" placeholder="">
              <label for="customInput">Koostisosa nimetus</label>
            </div>
          </div>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-lg-2">
          <h5>Kogus:</h5>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-2">
          <div class="input-group mb-3">
            <input v-model=" shoppingListItemRequest.quantity" type="number" min="0" max="1000" class="form-control"
                   id="servingSizeInput">
          </div>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-2">
          <h5>Ühik:</h5>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-2">
          <MeasurementDropDownBox :key="shoppingListItemRequest.shoppingListIngredientId"
                                  :measurement="shoppingListItemRequest.ingredientMeasurementId"
                                  @SendMeasurementIdEvent="setNewMeasurement"/>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-lg-2">
          <h5>Grupp:</h5>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-2">
          <IngredientGroupSelect :key="shoppingListItemRequest.shoppingListIngredientId"
                                 :groupId="shoppingListItemRequest.ingredientGroupId"
                                 :itemCustomName="shoppingListItemRequest.customIngredientName"
                                 @groupChangeEvent="setNewGroup"/>
        </div>
      </div>

    </div>
    <div class="row justify-content-center mt-2">
      <div class="col-2">
        <AlertMessage :errorResponse="errorResponse"/>
      </div>
      <div class="row justify-content-center mt-2">
        <div class="col-2">
          <button v-on:click="updateShoppingListIngredient" type="button" class="btn btn-success">Salvesta muudatused
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IngredientGroupSelect from "@/components/ingredient/IngredientGroupSelect";
import MeasurementDropDownBox from "@/components/ingredient/MeasurementDropDownBox";
import AlertMessage from "@/components/general/AlertMessage";

export default {
  name: "ChangeShoppingList",
  components: {AlertMessage, MeasurementDropDownBox, IngredientGroupSelect},
  data: function () {
    return {
      shoppingListIngredientId: this.$route.query.shoppingListItemId,
      shoppingListItemRequest: {
        shoppingListIngredientId: 0,
        customIngredientName: '',
        shoppingListIngredientName: '',
        ingredientGroupId: 0,
        ingredientMeasurementId: 0,
        quantity: 0,
      },
      errorResponse: {
        message: '',
        alertAttClass: 'alert alert-danger'
      }

    }
  },

  methods: {
    setNewMeasurement: function (measurementId) {
      this.shoppingListItemRequest.ingredientMeasurementId = measurementId
    },

    setNewGroup: function (groupId) {
      this.shoppingListItemRequest.ingredientGroupId = groupId
    },

    getShoppingListIngredient: function () {
      this.$http.get("/shopping-list/ingredient", {
            params: {
              shoppingListItemId: this.shoppingListIngredientId,
            }
          }
      ).then(response => {
        this.shoppingListItemRequest = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    updateShoppingListIngredient: function () {

      // if (this.shoppingListIngredient.customIngredientName.length > 0) {
      //   this.showErrorMessage('Nime väli peab olema täidetud', 'alert alert-danger')
      // } else {

      this.$http.put("/shopping-list/ingredient", this.shoppingListItemRequest
      ).then(response => {
        this.$router.push({name: 'createShoppingListRoute'})
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
      // }
    },

    showErrorMessage: function (message, alertClass) {
      this.errorResponse.message = message
      this.errorResponse.alertAttClass = alertClass
    },
  },

  beforeMount() {
    this.getShoppingListIngredient()
  }
}
</script>


