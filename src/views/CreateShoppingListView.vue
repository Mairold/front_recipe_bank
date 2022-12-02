<template>
  <div class="container overflow-hidden">
    <h1>Loo uus poenimekiri!</h1>
    <div class="row justify-content-start">
      <AddNewShoppingList @newShoppingListEvent="setShoppingListId"/>
    </div>
    <div v-if="customShoppingListIngredient.shoppingListId === 0" class="border border-success rounded-3 mt-3">
      <div class="row m-1">
        <ShoppingListIngredientNameInput @addIngredientNameEvent="setShoppingListIngredientName"/>
        <IngredientQuantity @addIngredientQuantityEvent="setShoppingListIngredientQuantity"/>
        <MeasurementDropDownBox @SendMeasurementIdEvent="setMeasurementId"/>
        <div class="col-2">
          <IngredientGroupSelect @groupChangeEvent="setShoppingListIngredientGroupId"/>
        </div>
        <addNewCustomShoppingListIngredient @saveShoppingListIngredientEvent="saveCustomShoppingListIngredeient"/>
      </div>
    </div>
  </div>
</template>

<script>
import MeasurementDropDownBox from "@/components/ingredient/MeasurementDropDownBox";
import AddNewShoppingList from "@/views/AddNewShoppingList";
import ShoppingListIngredientNameInput from "@/views/ShoppingListIngredientNameInput";
import IngredientQuantity from "@/views/IngredientQuantity";
import IngredientGroupSelect from "@/components/ingredient/IngredientGroupSelect";
import AddNewCustomShoppingListIngredient from "@/views/AddNewCustomShoppingListIngredient";

export default {
  name: "CreateShoppingListView",
  components: {
    AddNewCustomShoppingListIngredient,
    IngredientGroupSelect,
    IngredientQuantity, ShoppingListIngredientNameInput, AddNewShoppingList, MeasurementDropDownBox},
  data: function () {
    return {
      shoppingListIngredient: [
        {
          shoppingListIngredientName: '',
          shoppingListIngredientIsCustom: false,
          ingredientGroupName: '',
          measurementName: '',
          quantity: 0,
        }
      ],

      customShoppingListIngredient:
          {
            shoppingListIngredientName: '',
            shoppingListIngredientIsCustom: true,
            ingredientGroupId: 0,
            measurementId: 0,
            shoppingListId: 0,
            quantity: 0,
          },
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
      this.customShoppingListIngredient.shoppingListId = shoppingListId
    },

    saveCustomShoppingListIngredeient: function () {
      this.$http.post("/shoppingList/customIngredient", this.customShoppingListIngredient
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
  }
}
</script>

