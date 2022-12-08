<template>
  <div>
    <div class="row justify-content-center m-1">
      <h1>Lisatud toote andmete muutmine poenimekirjas</h1>
    </div>

    <div>
      <div class="row justify-content-center mt-2">
        <div class="col-lg-6">
          <div v-if="shoppingListIngredient.shoppingListIngredientName !== null" class="input-group mb-3">
            <div class="form-floating ">
              <input disabled v-model="shoppingListIngredient.shoppingListIngredientName" type="text"
                     class="form-control" id="ingredientInput" placeholder="">
              <label for="ingredientInput">Koostisosa nimetus</label>
            </div>
          </div>
          <div v-else class="input-group mb-3">
            <div class="form-floating ">
              <input v-on:change="setCustomIngredientName" v-model="shoppingListIngredient.customIngredientName"
                     type="text"
                     class="form-control" id="customInput" placeholder="">
              <label for="customInput">Koostisosa nimetus</label>
            </div>
          </div>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-lg-3">
          <h5>Kogus:</h5>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-2">
          <div class="input-group mb-3">
            <input v-model=" shoppingListIngredient.quantity" type="number" class="form-control"
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
        <MeasurementDropDownBox :ingredientMeasurementId="shoppingListIngredient.ingredientMeasurementId"
                                @SendMeasurementIdEvent="setNewMeasurement"/>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-lg-3">
          <h5>Grupp:</h5>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-3">
          <IngredientGroupSelect :ingredientGroupId="shoppingListIngredient.ingredientGroupId"
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
      shoppingListIngredient: {
        shoppingListIngredientId: 0,
        customIngredientName: '',
        shoppingListIngredientName: '',
        shoppingListIngredientIsCustom: false,
        ingredientGroupId: 0,
        ingredientMeasurementId: 0,
        quantity: 0,
      },
      shoppingListItemRequest: {
        shoppingListIngredientId: 0,
        customIngredientName: '',
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
      this.shoppingListIngredient.ingredientMeasurementId = measurementId
    },

    setNewGroup: function (groupId) {
      this.shoppingListIngredient.ingredientGroupId = groupId
    },

    setCustomIngredientName: function () {
      this.shoppingListItemRequest.customIngredientName = this.shoppingListIngredient.customIngredientName
    },

    getShoppingListIngredient: function () {
      this.$http.get("/shopping-list/ingredient", {
            params: {
              shoppingListItemId: this.shoppingListIngredientId,
            }
          }
      ).then(response => {
        this.shoppingListIngredient = response.data
        this.shoppingListItemRequest.shoppingListIngredientId = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    updateShoppingListIngredient: function () {

      if (this.shoppingListIngredient.customIngredientName.length > 0) {
        this.showErrorMessage('Nime väli peab olema täidetud', 'alert alert-danger')
      } else {

          this.$http.put("/shoppingList/ingredient", this.shoppingListItemRequest
          ).then(response => {
            this.$router.push({name: 'createShoppingListRoute'})
            console.log(response.data)
          }).catch(error => {
            console.log(error)
          })
      }
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


