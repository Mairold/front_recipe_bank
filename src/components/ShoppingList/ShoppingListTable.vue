<template>

    <table class="table table-success table-striped">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Koostisosa</th>
        <th scope="col">Kogus</th>
        <th scope="col">Ühik</th>
        <th scope="col">Grupp</th>
        <th scope="col">Muuda</th>
        <th scope="col">Kustuta</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in shoppingListIngredient" :key="product.shoppingListIngredientId">
        <td>{{product.sequenceNumber}}</td>
        <td v-if="!product.shoppingListIngredientIsCustom" >{{ product.shoppingListIngredientName }}</td>
        <td v-if="product.shoppingListIngredientIsCustom" >{{ product.customIngredientName }}</td>
        <td>{{ product.quantity }}</td>
        <td>{{ product.measurementName }}</td>
        <td>{{ product.ingredientGroupName }}</td>
        <td>
          <button v-on:click="changeShoppingListIngredient(product.shoppingListIngredientId)" type="button" class="btn btn-sm btn-success">Muuda</button>
        </td>
        <td>
          <button v-on:click="deleteFromList(product.shoppingListIngredientId)" type="button" class="btn btn-sm btn-danger">Kustuta</button>
        </td>
      </tr>
      </tbody>
    </table>

</template>
<script>
export default {
  name: 'ShoppingListTable',

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
    }
  },

  methods: {
    generateRowNumbers: function () {
      let counter = 1
      this.shoppingListIngredient.forEach(element => {
            element.sequenceNumber = counter++
          }
      )
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

    deleteFromList: function (shoppingListIngredientId) {
      this.$http.delete("/shopping-list/ingredient", {
            params: {
              ingredientId: shoppingListIngredientId
            }
          }
      ).then(response => {
        this.getAllShoppingListIngredients()
        this.generateRowNumbers()
      }).catch(error => {
        console.log(error)
      })
    },

    changeShoppingListIngredient: function (shoppingListIngredientId) {
      this.$router.push({
        name: 'changeShoppingListRoute', query: {
          shoppingListItemId: shoppingListIngredientId
        }
      })
    },
  },

  beforeMount() {
    this.shoppingListIngredient = []
    this.getAllShoppingListIngredients()
  }
}
</script>