<template>
  <div class="col-2">
    <button v-on:click="addNewMenu" type="button" class="btn btn-success">Alusta uut menüüd</button>
  </div>
</template>
<script>
export default {
  name: 'NewMenuButton',
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
      menuId: 0,

    }
  },
  methods: {
    addNewMenu: function () {
      if (sessionStorage.getItem('userId') !== null) {
        this.$http.post("/menu", null, {
              params: {
                userId: this.userId,
              }
            }
        ).then(response => {
          this.menuId = response.data
          sessionStorage.setItem('menuId', response.data)
          this.$emit('newMenuEvent', this.menuId)

        }).catch(error => {
          console.log(error)
        })
      }
    },
  }
}
</script>