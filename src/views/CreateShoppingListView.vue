<template>
  <div class="container overflow-hidden">
    <h1>Loo uus poenimekiri!</h1>
    <div class="row justify-content-start">
      <AddNewShoppingList @newShoppingListEvent="setShoppingListId"/>
      <div class="col-3">
        <div v-if="customShoppingListIngredient.shoppingListId === 0 & shoppingListIngredient.length === 0">
          <== Alusta uut poenimekirja.
        </div>
      </div>
    </div>
    <div v-if="shoppingListIngredient.length > 0" class="border border-success rounded-3 mt-3">
      <div class="row m-1">
        <ShoppingListIngredientNameInput ref="itemNameInput" @addIngredientNameEvent="setShoppingListIngredientName"/>
        <IngredientQuantity ref="itemQuantity" @addIngredientQuantityEvent="setShoppingListIngredientQuantity"/>
        <MeasurementDropDownBox ref="itemMeasurement" @SendMeasurementIdEvent="setMeasurementId"/>
        <div class="col-2">
          <IngredientGroupSelect ref="itemGroup" @groupChangeEvent="setShoppingListIngredientGroupId"/>
        </div>
        <addNewCustomShoppingListIngredient @saveShoppingListIngredientEvent="saveCustomShoppingListIngredient"/>
      </div>
      <div class="row justify-content-evenly">
        <ShoppingListTable :shopping-list-ingredient="shoppingListIngredient"
                           @changeButtonClickEvent="changeShoppingListIngredient"
                           @deleteButtonClickEvent="deleteFromList"/>
      </div>
    </div>
    <div class="row justify-content-start mt-3">
      <ShoppingListCommentInput @commentInputEvent="setShoppingListComment"/>
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
          customIngredientName: '',
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
      shoppingListComment: '',
      shoppingListId: 0
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
    },

    saveCustomShoppingListIngredient: function () {
      this.customShoppingListIngredient.shoppingListId = this.shoppingListId
      this.$http.post("/shopping-list/ingredient", this.customShoppingListIngredient
      ).then(response => {
        this.getAllShoppingListIngredients()
        this.resetCustomIngredientInputFields();
      }).catch(error => {
        console.log(error)
      })
    },

    getAllShoppingListIngredients: function () {
      if (sessionStorage.getItem('shoppingListId') !== null) {
        this.$http.get("/shopping-list/ingredients", {
              params: {
                shoppingListId: sessionStorage.getItem('shoppingListId'),
              }
            }
        ).then(response => {
          this.shoppingListIngredient = response.data
          this.generateRowNumbers()
        }).catch(error => {
          console.log(error)
        })
      }
    },

    updateShoppingList: function () {
      console.log("Olen siin " + this.shoppingListComment)
      console.log(this.shoppingListIngredient.length)
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

    deleteFromList: function (ingredientId) {
      this.$http.delete("/shopping-list/ingredient", {
            params: {
              ingredientId: ingredientId
            }
          }
      ).then(response => {
        this.getAllShoppingListIngredients()
        this.generateRowNumbers()
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    changeShoppingListIngredient: function (id) {
      this.$router.push({
        name: 'changeShoppingListRoute', query: {
          shoppingListItemId: id
        }
      })
    },

    generateRowNumbers: function () {
      let counter = 1
      this.shoppingListIngredient.forEach(element => {
            element.sequenceNumber = counter++
          }
      )
    },
  },

  beforeMount() {
    this.shoppingListIngredient = []
    this.getAllShoppingListIngredients()
    this.shoppingListId = sessionStorage.getItem('shoppingListId')
  }
}
</script>

