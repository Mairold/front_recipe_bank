<template>
  <div>
    <div class="row justify-content-center m-2">
      <h1>Vali retseptid ja lisa menüüsse</h1>
    </div>

    <div>
      <div class="row row-cols-auto justify-content-center m-5">
        <div class="col offset-md-0">

          <button v-on:click="addNewRecipe" type="button" class="btn btn-success">Ei leidnud endale isuäratavat retsepti? Lisa uus siit</button>
        </div>
          <div class="col pe-5">

          <button v-on:click="backToMenu" type="button" class="btn btn-success">Tagasi menüüd vaatama</button>

        </div>
      </div>


    </div>

  </div>
</template>

<script>
export default {
  name: "AddToMenuView",

  data: function () {
    return {

    }
  },

  methods: {

    backToMenu: function () {
      this.$router.push({name: 'menuRoute'})
    },
    addNewRecipe: function () {
      this.$router.push({name: 'addRecipeRoute'})
    }
  }
}
</script>
