<template>
  <div>

    <div class="row justify-content-center m-2">
      <h1>"Koosta menüü" üldvaade</h1>
    </div>

    <div class="row justify-content-start">
      <div class="col-2 offset-md-2">
        <button v-on:click="addRecipe" type="button" class="btn btn-success">Lisa retsept</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuView",

  data: function () {
    return {

    }
  },
  methods: {

    addRecipe: function () {
      this.$router.push({name: 'addToMenuRoute'})
    }

  }





}
</script>