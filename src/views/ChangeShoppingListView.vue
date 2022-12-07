<template>
  <div>
    <div class="row justify-content-center m-1">
      <h1>Lisatud toote andmete muutmine poenimekirjas</h1>
    </div>

    <div>
      <div class="row justify-content-center mt-2">
        <div class="col-lg-6">
          <div class="input-group mb-3">
            <div class="form-floating "><input disabled v-model="shoppingListIngredient.ingredientGroupName" type="text"
                                               class="form-control" id="floatingInput" placeholder="">
              <label for="floatingInput">Koostisosa nimetus</label></div>
            <!--         todo: siia väljale peab tulema bäkist menüüsse salvestatud ja hetkel muudetava retsepti nimetus -->
          </div>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-lg-3">
          <h5>Kogus:</h5>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-lg-1">
          <div class="input-group mb-3">
            <input v-model=" shoppingListIngredient.quantity" type="number" class="form-control"
                   id="servingSizeInput">
          </div>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-lg-3">
          <h5>Ühik:</h5>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-lg-1">
          <MeasurementDropDownBox @SendMeasurementIdEvent="setNewMeasurement"/>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-lg-3">
          <h5>Grupp:</h5>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-lg-1">
          <IngredientGroupSelect @groupChangeEvent="setNewGroup"/>
        </div>
      </div>

    </div>
    <div class="row justify-content-center mt-2">
      <div class="col-2">
        <button v-on:click="updateShoppingListIngredient" type="button" class="btn btn-success">Salvesta muudatused
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import IngredientGroupSelect from "@/components/ingredient/IngredientGroupSelect";
import MeasurementDropDownBox from "@/components/ingredient/MeasurementDropDownBox";

export default {
  name: "ChangeShoppingList",
  components: {MeasurementDropDownBox, IngredientGroupSelect},
  data: function () {
    return {

      shoppingListIngredient: {
        shoppingListIngredientId: 0,
        shoppingListIngredientName: '',
        shoppingListIngredientIsCustom: false,
        ingredientGroupId: 0,
        quantity: 0,
        ingredientMeasurementId: 0,
        shoppingListId: 0,
        ingredientId: 0
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

    getShoppingListIngredient: function () {
      this.$http.get("/shoppingList/ingredient", {
            params: {
              shoppingListIngredientId: this.shoppingListIngredient.shoppingListIngredientId,
            }
          }
      ).then(response => {
        this.shoppingListIngredient = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    updateShoppingListIngredient: function () {
      sessionStorage.clear()
      if (this.shoppingListIngredient.ingredientMeasurementId === 0 ||
      this.shoppingListIngredient.ingredientGroupId === 0 ||
      this.shoppingListIngredient.quantity === 0)
      this.$http.put("/shoppingList/ingredient", null, {
            params: {
              shoppingListIngredientRequest: this.shoppingListIngredient,
            }
          }
      ).then(response => {
        this.$router.push(name = 'createShoppingListRoute')
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  },

  beforeMount() {
    this.getShoppingListIngredient()
  }
}
</script>


