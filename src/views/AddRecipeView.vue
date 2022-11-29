<template>
  <div>
    <div class="row justify-content-center m-2">
      <h1>Lisa retsept</h1>
    </div>

    <!-- Üldandmete komponent -->

    <div class="container.col-md-8" aria-placeholder="Üldandmed" type="text" id="General">
      <div class="row justify-content-center">
        <div class="col-lg-5">


          <div style="border:1px solid darkslategrey; text-align: left; padding:10px; text-indent: 3px">
            Üldandmed


            <form>
              <div class="form-row">

                <!-- Sisesta retsepti pealkiri -->

                <div class="form-group col-md-12">

                  <input @addRecipeName="addRecipeName"/>

                </div>

                <!-- Vali retsepti kategooria -->

                <div class="row justify-content-center mt-3">
                  <div class="col-md-4 ">
                    <select class="form-select" aria-label="Default select example">
                      <option selected>Kategooria</option>
                      <option value="1">One</option>
                    </select>
                  </div>

                  <!-- Vali retsepti valmistamise aeg -->

                  <div class="col-md-4 ">
                    <select class="form-select" aria-label="Default select example">
                      <option selected>Valmistamise aeg</option>
                      <option value="1">One</option>
                    </select>
                  </div>

                  <!-- Vali retsepti sööjate arv -->

                  <div class="col-md-4 ">
                    <select class="form-select" aria-label="Default select example">
                      <option selected>Sööjate arv</option>
                      <option value="1">One</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>


          <!-- Vali retsepti toiduaine komponendid deegist -->

          <div style="border:1px solid darkslategrey; text-align: left; padding:10px; text-indent: 3px">
            Koostisosad
            <div class="row g-3">
              <div class="col-md-3">
                <addIngredientToRecipe @recipeChangeEvent="addIngredientToRecipe"/>
              </div>


              <!-- Vali kasutatava toiduaine ühik  -->


              <div class="col-md-2">
                <input type="newRecipe" class="form-control" id="recipeId" placeholder="500">
              </div>


              <div class="col-md-2">
                <select class="form-select" aria-label="Default select example">
                  <option selected>Ühik</option>
                  <option value="1">One</option>
                </select>
              </div>

              <!-- Lisa uus toiduaine rida retsepti   -->

              <div class="col-md-1">
                <input type="image" src="plus.ico.png" height="30" width="30"/>
              </div>

              <!-- Sisesta valmistamise juhend   -->

              <div class="col-md-4">
                <div class="form-floating">
                  <input type="text" class="form-control" id="floatingInput" placeholder=""
                         style="height: 250px; margin-outside: 5px">
                  <label for="floatingInput">Valmistamise juhend</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- NUPUD: Lisa deeki uus toiduaine  -->

    <div class="form-group col-md-12">

      <div class="row-cols-md-6">
        <button v-on:click="addNewIngredient" type="button" class="btn btn-success">Lisa deeki uus toiduaine</button>

      </div>


      <!-- NUPUD: Salvesta retsept retseptide deeki  -->


      <button type="button" class="btn btn-success">Salvesta retsept</button>
    </div>

    <!-- NUPUD: Salvesta retsept menüüsse õige menu Id külge  -->


    <div class="form-group col-md-12">
      <div class="row-cols-md-3">
        <button type="button" class="btn btn-success">Salvesta retsept ja lisa menüüsse</button>
        <div class="row-cols-md-3">
          <select class="form-select" aria-label="Default select example">

            <option selected>Vali grupp</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import RecipeNameInput from "@/components/AddRecipeForm/RecipeNameInput";

export default {

  name: "AddRecipeView",
  components: {RecipeNameInput},
  data: function () {
    return {
      recipeRequest:
          {
            recipeId: sessionStorage.getItem('recipeId'),
            recipeName: '',
          }
    }

  },
  methods: {

    addRecipeName: function (newRecipeName) {
      this.recipeRequest.recipeName = newRecipeName
      this.$http.post("/addRecipe", this.recipeRequest
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

  },

  addNewIngredient: function () {
    this.$router.push({name: 'newIngredientRoute'})
  },
  beforeMount() {
    this.addRecipeName()
  }
}

</script>

<style scoped>

</style>
