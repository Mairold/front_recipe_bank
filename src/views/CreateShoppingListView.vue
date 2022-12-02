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
      <div class="row justify-content-evenly">
        <div class="col">
          <table class="table table-success table-striped">
            <thead>
            <tr>
              <th scope="col">Koostisosa</th>
              <th scope="col">Kogus</th>
              <th scope="col">Ühik</th>
              <th scope="col">Grupp</th>
              <th scope="col">Muuda</th>
              <th scope="col">Kustuta</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="product in shoppingListIngredient">
              <td>{{ product.shoppingListIngredientName }}</td>
              <td>{{ product.quantity }}</td>
              <td>{{ product.measurementName }}</td>
              <td>{{ product.ingredientGroupName }}</td>
              <td>
                <button type="button" class="btn btn-success">Muuda</button>
              </td>
              <td>
                <button type="button" class="btn btn-danger">Kustuta</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
    <div class="row justify-content-start mt-3">
      <div class="col-6">
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">Kommentaar</span>
          <input v-model="shoppingListComment" type="text" class="form-control"
                 aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>
      </div>
    </div>
    <div class="row justify-content-start">
      <div class="col-4">
        <button v-on:click="updateShoppingList" type="button" class="btn btn-success">Salvesta poenimekiri
        </button>
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
    IngredientQuantity, ShoppingListIngredientNameInput, AddNewShoppingList, MeasurementDropDownBox
  },
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

  },
  beforeMount() {
    this.getAllShoppingListIngredients()
  }
}
</script>

