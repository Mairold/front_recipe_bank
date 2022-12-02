<template>
  <div class="container overflow-hidden">
    <h1>Loo uus poenimekiri!</h1>
    <div class="row justify-content-start">
      <AddNewShoppingList @newShoppingListEvent="setShoppingListId"/>
    </div>
    <div v-if="customShoppingListIngredient.shoppingListId !== 0" class="border border-success rounded-3 mt-3">
      <div class="row m-1">
        <ShoppingListIngredientNameInput @addIngredientNameEvent="setShoppingListIngredientName"/>
        <IngredientQuantity @addIngredientQuantityEvent="setShoppingListIngredientQuantity"/>
        <MeasurementDropDownBox @SendMeasurementIdEvent="setMeasurementId"/>
        <div class="col-2">
          <IngredientGroupSelect @groupChangeEvent="setShoppingListIngredientGroupId"/>
        </div>
        <addNewCustomShoppingListIngredient @saveShoppingListIngredientEvent="saveCustomShoppingListIngredeient"/>
      </div>
      <div class="row justify-content-evenly">
        <ShoppingListTable :shopping-list-ingredient="shoppingListIngredient"
                           @changeButtonClickEvent="changeShopingListIngredient"
                           @deleteButtonClickEvent="deleteFromList"/>
      </div>
    </div>
    <div class="row justify-content-start mt-3">
      <ShoppingListCommentInput :shopping-list-comment="shoppingListComment"/>
    </div>
    <div class="row justify-content-start">
      <UpdateShoppingListButton @updateButtonClickEvent="updateShoppingList"/>
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

export default {
  name: "CreateShoppingListView",
  components: {
    ShoppingListTable,
    UpdateShoppingListButton,
    ShoppingListCommentInput,
    AddNewCustomShoppingListIngredient,
    IngredientGroupSelect,
    IngredientQuantity, ShoppingListIngredientNameInput, AddNewShoppingList, MeasurementDropDownBox
  },

  data: function () {
    return {
      shoppingListIngredient: [
        {
          shoppingListIngredientId: 0,
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
      shoppingListComment: ''
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
      this.getAllShoppingListIngredients()
    },

    saveCustomShoppingListIngredeient: function () {
      this.$http.post("/shoppingList/customIngredient", this.customShoppingListIngredient
      ).then(response => {
      }).catch(error => {
        console.log(error)
      })
    },

    getAllShoppingListIngredients: function () {
      this.$http.get("/shoppingList/ingredients", {
            params: {
              shoppingListId: sessionStorage.getItem('shoppingListId'),
            }
          }
      ).then(response => {
        this.shoppingListIngredient = response.data
      }).catch(error => {
        console.log(error)
      })
    },

    updateShoppingList: function () {
      this.$http.put("/some/path", null, {
            params: {
              shoppingListComment: this.shoppingListComment,
            }
          }
      ).then(response => {
      }).catch(error => {
        console.log(error)
      })
    },

    deleteFromList: function (ingredient) {
      let index = this.shoppingListIngredient.indexOf(ingredient)
      this.shoppingListIngredient.splice(index, 1)
    },

    changeShopingListIngredient: function (id) {
      this.$router.push({
        name: '', query: {
          shoppingListIngredientId: id
        }
      })
    }

  },

  beforeMount() {
    this.getAllShoppingListIngredients()
  }
}
</script>

