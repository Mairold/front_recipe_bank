<template>
  <div>
    <div v-if="shoppingListIngredient.length > 0" class="border border-success rounded-3 m-3">
      <div class="row justify-content-center mt-3">
        <div class="col-5">
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Salvestamise aeg</span>
            <input v-model="shoppingList.shoppingListTimeAdded" type="text" class="form-control" disabled
                   aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          </div>
        </div>
        <div class="col-7">
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Kommentaar</span>
            <input v-model="shoppingList.shoppingListComment" type="text" class="form-control" disabled
                   aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col">
          <table class="table table-success table-striped">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Koostisosa</th>
              <th scope="col">Kogus</th>
              <th scope="col">Ühik</th>
              <th scope="col">Grupp</th>

            </tr>
            </thead>
            <tbody>
            <tr v-for="product in shoppingListIngredient" :key="product.shoppingListIngredientId">
              <th scope="row">{{ product.sequenceNumber }}</th>
              <td v-if="!product.shoppingListIngredientIsCustom">{{ product.shoppingListIngredientName }}</td>
              <td v-if="product.shoppingListIngredientIsCustom">{{ product.customIngredientName }}</td>
              <td>{{ product.quantity }}</td>
              <td>{{ product.measurementName }}</td>
              <td>{{ product.ingredientGroupName }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row justify-content-end m-3">
      <div class="col-2">
        <CloseButton />
      </div>
    </div>
  </div>
</template>

<script>
import CloseButton from "@/components/general/CloseButton";

export default {
  name: "ShoppingListView",
  components: {CloseButton},
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
      shoppingList: {
        shoppingListId: 0,
        shoppingListTimeAdded: '',
        shoppingListComment: ''
      },
      shoppingListId: this.$route.params.shoppingListId,
    }

  },
  methods: {
    getAllShoppingListIngredients: function () {
      this.$http.get("/shopping-list/ingredients", {
            params: {
              shoppingListId: this.shoppingListId,
            }
          }
      ).then(response => {
        this.shoppingListIngredient = response.data
        this.generateRowNumbers()
      }).catch(error => {
        console.log(error)
      })
    },

    getShoppingList: function () {
      this.$http.get("/shopping-list", {
            params: {
              shoppingListId: this.shoppingListId,
            }
          }
      ).then(response => {
        this.shoppingList = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
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
    this.getAllShoppingListIngredients()
    this.getShoppingList()
    this.generateRowNumbers()
  }
}
</script>
