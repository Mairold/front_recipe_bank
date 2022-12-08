<template>
  <div class="col">
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
  </div>
</template>
<script>
export default {
  name: 'ShoppingListTable',
  props: {
    shoppingListIngredient: {}
  },
  methods: {
    deleteFromList: function (shoppingListIngredientId) {
      this.$emit('deleteButtonClickEvent',shoppingListIngredientId)
    },

    changeShoppingListIngredient: function (shoppingListIngredientId) {
      this.$emit('changeButtonClickEvent',shoppingListIngredientId)
    }
  }
}
</script>