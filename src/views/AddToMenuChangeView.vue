<template>
  <div>
    //       <!--Siia lehele maandutakse "Koosta menüü" vaatest retsepti taga olevat "Muuda" nuppu vajutades-->
    <div class="row justify-content-center m-1">
      <h1>Retsepti andmete muutmine</h1>
    </div>

    <div>
      <div class="row justify-content-center mt-2">
        <div class="col-lg-6">
          <div class="input-group mb-3">
            <div class="form-floating "><input disabled v-model="recipeInMenuRequest.recipeName" type="text" class="form-control"
                                               id="floatingInput" placeholder="">
              <label for="floatingInput">Retsepti nimetus</label></div>
          </div>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-lg-3">
          <h5>Muuda sööjate arvu:</h5>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-lg-1">
          <div class="input-group mb-3">
            <div><input v-model="recipeInMenuRequest.servingSize" type="number" class="form-control" id="servingSizeInput">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center mt-3">
      <div class="col-lg-9">
        <h5>Täienda kommentaari:</h5>
      </div>
    </div>

    <div class="row justify-content-center mt-2">
      <div class="d-grid gap-5 col-7 mx-auto">
        <div><input v-model="recipeInMenuRequest.commentToRecipe" type="text" class="form-control" id="floatingInput">
        </div>
        <button v-on:click="changeRecipeInSection" type="button" class="btn btn-success">Salvesta muudatused</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "AddToMenuChangeView",

  data: function () {
    return {

      recipeInMenuRequest: {
        recipeInSectionId: Number(sessionStorage.getItem('recipeInSectionId')), // selle salvestab SS-sse "Koosta menüü" vaade
        recipeName: '',
        servingSize: 0,
        commentToRecipe: '',
      },
    }
  },
  methods: {

      getRecipeInfo: function () {
        console.log('retsepti id ' + this.recipeInMenuRequest.recipeInSectionId)
        this.$http.get("/menu/recipe-in-menu", {
              params: {
                recipeInSectionId: this.recipeInMenuRequest.recipeInSectionId
              }
            }
        ).then(response => {
          this.recipeInMenuRequest = response.data
          console.log(response.data)
        }).catch(error => {
          console.log(error)
        })
    },

    changeRecipeInSection: function () {
      this.$http.put("/menu/change-recipe-info", this.recipeInMenuRequest
      ).then(response => {
        console.log(response.data)
        this.$router.push({name: 'createMenuRoute'})
        // Peale nupuvajutust liigutakse tagasi "Koosta menüü" üldvaatesse, kus kuvatakse retsepti juures tehtud muudatused.
      }).catch(error => {
        console.log(error)
      })
    },
    // todo: nupule vajutades muudetakse varasemalt menüüsse salvestatud retsepti sööjate arv ning kommentaar.
    // salvesta muudatused taha tuleb bäkis put-teenus ja andmebaasis salvestatakse andmed üle.
    // Backis tuleb Id järgi üles entity ja siis anname sisse DTo.


  },
  beforeMount() {
    this.getRecipeInfo()
  }
}
</script>