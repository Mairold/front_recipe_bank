<template>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">Kommentaar</span>
      <input v-on:change="sendShoppingListComment" v-model="shoppingListComment" type="text" class="form-control"
             aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    </div>
</template>
<script>
export default {
  name: 'ShoppingListCommentInput',

  data: function () {
    return {
      shoppingListComment: ""
    }
  },

  methods: {
    sendShoppingListComment: function () {
      this.$emit('commentInputEvent',this.shoppingListComment)
    }
  }
}
</script>