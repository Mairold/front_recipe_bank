<template>
  <div class="col-4">
    <button v-on:click="addNewShoppingList" type="button" class="btn btn-success">Alusta uut poenimekirja</button>
  </div>
</template>
<script>
export default {
  name: 'AddNewShoppingList',
  data: function () {
    return {
      menuId: sessionStorage.getItem('menuId'),
      shoppingListId: 0,

    }
  },
  methods: {
    addNewShoppingList: function () {
      this.$http.post("/shoppingList", null, {
            params: {
              menuId: this.menuId,
            }
          }
      ).then(response => {
        this.shoppingListId = response.data
        sessionStorage.setItem('shoppingListId', response.data)
        this.$emit('newShoppingListEvent',this.shoppingListId)
      }).catch(error => {
        console.log(error)
      })
    },
  }
}
</script>