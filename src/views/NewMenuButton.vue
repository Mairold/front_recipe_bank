<template>
  <div class="col-2">
    <button v-on:click="addNewMenu" type="button" class="btn btn-success">Alusta uut menüüd</button>
  </div>
</template>
<script>
export default {
  name: 'NewMenuButton',
  methods: {
  addNewMenu: function () {
    this.$http.post("/menu", null, {
          params: {
            userId: sessionStorage.getItem('userId'),
          }
        }
    ).then(response => {
      sessionStorage.setItem('menuId', response.data)
      console.log(response.data)
    }).catch(error => {
      console.log(error)
    })
  },
  }
}
</script>