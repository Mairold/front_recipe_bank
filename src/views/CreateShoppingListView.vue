<template>
  <div class="container overflow-hidden">
    <h1>Loo uus poenimekiri!</h1>
    <div class="row justify-content-start">
      <div class="col-3 offset-1">
        <AddNewShoppingList @newShoppingListEvent="setShoppingListId"/>
      </div>
      <div class="col-3">
        <div v-if="shoppingListId === null">
          <== Alusta uut poenimekirja.
        </div>
      </div>
    </div>
    <div v-if="shoppingListId !== null" class="border border-success rounded-3 mt-3">
      <div class="row m-1">
        <div class="col-4">
          <ShoppingListIngredientNameInput ref="itemNameInput" @addIngredientNameEvent="setShoppingListIngredientName"/>
        </div>
        <div class="col-2">
          <IngredientQuantity ref="itemQuantity" @addIngredientQuantityEvent="setShoppingListIngredientQuantity"/>
        </div>
        <div class="col-2">
          <MeasurementDropDownBox ref="itemMeasurement" @SendMeasurementIdEvent="setMeasurementId"/>
        </div>
        <div class="col-2">
          <IngredientGroupSelect ref="itemGroup" @groupChangeEvent="setShoppingListIngredientGroupId"/>
        </div>
        <div class="col -2">
          <addNewCustomShoppingListIngredient @saveShoppingListIngredientEvent="saveCustomShoppingListIngredient"/>
        </div>
      </div>
      <div class="row justify-content-start">
        <div class="col-sm-5 ms-3">
          <AlertMessage :errorResponse="errorResponse"/>
        </div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col">
          <ShoppingListTable ref="shoppingListTable"/>
        </div>
      </div>
    </div>
    <div class="row justify-content-start mt-3">
      <div class="col-6">
        <ShoppingListCommentInput @commentInputEvent="setShoppingListComment"/>
      </div>
    </div>
    <div v-if="shoppingListId !== null" class="row justify-content-start">
      <div class="col-3 offset-1">
        <UpdateShoppingListButton @updateButtonClickEvent="updateShoppingList"/>
      </div>
    </div>
  </div>
</template>

<script>
import MeasurementDropDownBox from "@/components/ingredient/MeasurementDropDownBox";
import AddNewShoppingList from "@/components/ShoppingList/AddNewShoppingList";
import ShoppingListIngredientNameInput from "@/components/ShoppingList/ShoppingListIngredientNameInput";
import IngredientQuantity from "@/components/ShoppingList/IngredientQuantity";
import IngredientGroupSelect from "@/components/ingredient/IngredientGroupSelect";
import AddNewCustomShoppingListIngredient from "@/components/ShoppingList/AddNewCustomShoppingListIngredient";
import ShoppingListCommentInput from "@/components/ShoppingList/ShoppingListCommentInput";
import UpdateShoppingListButton from "@/components/ShoppingList/UpdateShoppingListButton";
import ShoppingListTable from "@/components/ShoppingList/ShoppingListTable";
import AlertMessage from "@/components/general/AlertMessage";

export default {
  name: "CreateShoppingListView",
  components: {
    AlertMessage,
    ShoppingListTable,
    UpdateShoppingListButton,
    ShoppingListCommentInput,
    AddNewCustomShoppingListIngredient,
    IngredientGroupSelect,
    IngredientQuantity, ShoppingListIngredientNameInput, AddNewShoppingList, MeasurementDropDownBox
  },

  data: function () {
    return {

      customShoppingListIngredient:
          {
            shoppingListIngredientName: '',
            shoppingListIngredientIsCustom: true,
            ingredientGroupId: 0,
            measurementId: 0,
            shoppingListId: 0,
            quantity: '',
          },
      shoppingListComment: '',
      shoppingListId: 0,
      errorResponse: {
        message: '',
        alertAttClass: 'alert alert-danger'
      }
    }
  },

  methods: {
    setMeasurementId: function (measurementId) {
      this.customShoppingListIngredient.measurementId = measurementId
    },

    setShoppingListIngredientName: function (ingredientName) {
      this.customShoppingListIngredient.shoppingListIngredientName = ingredientName
    },

    setShoppingListIngredientQuantity: function (ingredientQuantity) {
      this.customShoppingListIngredient.quantity = ingredientQuantity
    },

    setShoppingListIngredientGroupId: function (groupId) {
      this.customShoppingListIngredient.ingredientGroupId = groupId
    },

    setShoppingListId: function (shoppingListId) {
      this.shoppingListId = shoppingListId
      this.getAllShoppingListIngredients()
    },

    setShoppingListComment: function (shoppingListComment) {
      this.shoppingListComment = shoppingListComment
    },

    resetCustomIngredientInputFields: function () {
      this.$refs.itemNameInput.resetData()
      this.customShoppingListIngredient.shoppingListIngredientName = ''
      this.$refs.itemMeasurement.resetData()
      this.customShoppingListIngredient.measurementId = 0
      this.$refs.itemGroup.resetData()
      this.customShoppingListIngredient.ingredientGroupId = 0
      this.$refs.itemQuantity.resetData()
      this.customShoppingListIngredient.quantity = 0
      this.errorResponse.message = ''
    },

    saveCustomShoppingListIngredient: function () {
      if (this.customShoppingListIngredient.shoppingListIngredientName === '') {
        this.showErrorMessage('Ole meheks ja sisesta vähemalt toote nimi', 'alert alert-danger')
      } else {
        this.customShoppingListIngredient.shoppingListId = this.shoppingListId
        this.$http.post("/shopping-list/ingredient", this.customShoppingListIngredient
        ).then(response => {
          this.$refs.shoppingListTable.getAllShoppingListIngredients()
          this.resetCustomIngredientInputFields();
        }).catch(error => {
          console.log(error)
        })
      }
    },

    updateShoppingList: function () {
      this.$http.put("/shopping-list", null, {
            params: {
              shoppingListId: this.shoppingListId,
              shoppingListComment: this.shoppingListComment,
            }
          }
      ).then(response => {
        sessionStorage.removeItem('menuId')
        sessionStorage.removeItem('shoppingListId')
        this.$router.push({name: 'mainRoute'})
      }).catch(error => {
        console.log(error)
      })
    },

    showErrorMessage: function (message, alertClass) {
      this.errorResponse.message = message
      this.errorResponse.alertAttClass = alertClass
    }
  },

  beforeMount() {
    this.shoppingListId = sessionStorage.getItem('shoppingListId')
  }
}
</script>

