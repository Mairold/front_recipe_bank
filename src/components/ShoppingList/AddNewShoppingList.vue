<template>
    <button v-on:click="addNewShoppingList" type="button" class="btn btn-success">Alusta uut poenimekirja</button>
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
      this.$http.post("/shopping-list", null, {
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