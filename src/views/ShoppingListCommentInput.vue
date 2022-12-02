<template>
  <div class="col-6">
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">Kommentaar</span>
      <input v-model="shoppingListComment" type="text" class="form-control"
             aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    </div>
  </div>
</template>
<script>
export default {
  name: 'ShoppingListCommentInput',
  props: {
    shoppingListComment: {}
  }
}
</script>