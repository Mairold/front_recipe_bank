<template>
  <div>
    <div class="row justify-content-center m-2">
      <h1>Lisa retsept</h1>
    </div>

    <!-- Üldandmete komponent -->

    <div class="container.col-md-8" aria-placeholder="Üldandmed" type="text"
         id="General">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <div v-if="recipeResponse.recipeId === 0">
            <div style="border:1px solid darkslategrey; text-align: left; padding:10px; text-indent: 3px">
              Üldandmed
              <form>
                <div class="form-row">
                  <!-- Sisesta retsepti pealkiri -->

                  <div class="form-group col-md-12">
                    <input v-model="recipeRequest.recipeName" type="text" class="form-control" id="recipeId"
                           placeholder="Retsepti pealkiri">

                  </div>
                </div>

                <!-- Vali retsepti kategooria-->

                <div class="row justify-content-center mt-3">
                  <div class="col-md-4 ">
                    <CategoryDropdown @clickSelectCategoryEvent="setCategoryId"/>
                  </div>

                  <!-- Vali retsepti valmistamise aeg-->

                  <div class="col-md-4 ">
                    <PrepTimeDropdown @clickSelectPrepTimeEvent="setPrepTimeId"/>
                  </div>

                  <!-- Vali retsepti sööjate arv -->

                  <div class="form-group col-md-4">
                    <ServingSizeInput :servingSize="recipeRequest.servingSize"/>
                  </div>

                  <button v-on:click="addRecipe" type="button" class="btn btn-success">Lisa</button>

                </div>
                <div class="form-group">
                </div>
              </form>
            </div>
          </div>

          <div v-if="recipeResponse.recipeId !== 0">
            <div style="border:1px solid darkslategrey; text-align: left; padding:10px; text-indent: 3px">
              <h1>Retsept</h1>
              <h3>{{ recipeRequest.recipeName }}</h3>
            </div>
          </div>

          <!-- Koostisosade komponent -->

          <div v-if="recipeResponse.recipeId !== 0"
               style="border:1px solid darkslategrey; text-align: left; padding:10px; text-indent: 3px">
            Koostisosad
            <div class="row g-3">

              <!-- Vali retsepti koostisosa -->

              <table class="table table-success table-striped">
                <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">KOOSTISOSA</th>
                  <th scope="col">KOOGUS</th>
                  <th scope="col">ÜHIK</th>

                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>PORGAND</td>
                  <td>5</td>
                  <td>TK</td>
                </tr>
                </tbody>
              </table>
              <!-- Vali retsepti koostisosa -->

              <div class="col-md-3">
                <RecipeIngredient @clickSelectRecipeIngredientEvent="setRecipeIngredientId"/>
              </div>

              <!-- Vali retsepti koostisosa ühiku kogus -->

              <div class="col-md-2">
                <RecipeIngredientQuantity :ingredientQuantity="tempIngredient.ingredientQuantity"/>
              </div>

              <!-- Vali retsepti koostisosa ühiku  -->


              <div class="col-md-2">
                <RecipeIngredientSelectBox @clickSelectMeasurement="addNewMeasurementUnit"/>
              </div>

              <div class="col-md-1">

                <button v-on:click="addIngredientToTable" type="button" class="btn btn-success">Lisa</button>

              </div>

              <!-- Vali retsepti valmistamise juhend -->

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
    <div class="form-group col-md-12">

      <!-- NUPP: Lisa deeki uus toiduaine-->

      <div class="row-cols-md-6">
        <button v-on:click="addNewIngredient" type="button" class="btn btn-success">Lisa deeki uus toiduaine</button>
      </div>

      <!-- NUPP: Salvesta retsept retseptide kataloogi -->

      <button type="button" class="btn btn-success">Salvesta retsept</button>
    </div>


    <!-- NUPP: Salvesta retsept retseptide kataloogi ja lisa õige menüü külge -->

    <div class="form-group col-md-12">
      <div class="row-cols-md-3">
        <button type="button" class="btn btn-success">Lisa retsept menüüsse</button>


      </div>
    </div>
  </div>


</template>


<script>
import RecipeNameInput from "@/components/AddRecipeForm/RecipeNameInput";
import CategoryDropdown from "@/components/ChooseRecipe/CategoryDropdown";
import PrepTimeDropdown from "@/components/ChooseRecipe/PrepTimeDropdown";
import RecipeIngredient from "@/components/AddRecipeForm/RecipeIngredient";
import RecipeIngredientQuantity from "@/components/AddRecipeForm/RecipeIngredientQuantity";
import AllowedMeasurementTable from "@/components/ingredient/AllowedMeasurementTable";
import RecipeInstructions from "@/components/AddRecipeForm/RecipeInstructions";
import ServingSizeInput from "@/components/AddRecipeForm/ServingSizeInput";
import IngredientSelectBox from "@/components/ingredient/IngredientSelectBox";
import RecipeIngredientSelectBox from "@/components/AddRecipeForm/RecipeIngredientSelectBox";


export default {
  name: "AddRecipe",
  components: {
    RecipeNameInput, CategoryDropdown, PrepTimeDropdown,
    ServingSizeInput, RecipeIngredient, RecipeIngredientQuantity,
    AllowedMeasurementTable, RecipeInstructions, IngredientSelectBox, RecipeIngredientSelectBox
  },


  data: function () {
    return {
      displayAddIngredient: false,
      recipeRequest: {
        recipeName: '',
        recipeCategoryId: 0,
        preparationTimeId: '',
        servingSize: 4
      },
      recipeResponse: {
        recipeId: 0
      },

      recipeIngredientRequest: {
        recipeId: 0,
        ingredientId: 0,
        ingredientQuantity: 0,
        measurementId: 0,
      },


      recipe: {
        recipeName: '',
        servingSize: 0,
        recipeCategoryId: 0,
        prepTimeId: '',
        recipeIngredient: [
          {
            ingredientId: 0,
            ingredientName: '',
            ingredientQuantity: 0,
            measurementName: '',
            measurementId: 0,
          }, {
            ingredientId: 0,
            ingredientName: '',
            ingredientQuantity: 0,
            measurementName: '',
            measurementId: 0,
          }, {
            ingredientId: 0,
            ingredientName: '',
            ingredientQuantity: 0,
            measurementName: '',
            measurementId: 0,
          },
        ],
      },

      tempIngredient:
          {
            ingredientName: '',
            ingredientId: 0,
            ingredientQuantity: 0,
            measurementName: '',
            measurementId: 0,
          },
      errorMessage:
          {
            message: '',
            errorCode: ''
          }
    }
  },
  methods: {

    setCategoryId: function (selectedCategoryId) {
      this.recipeRequest.recipeCategoryId = selectedCategoryId;
    },

    setPrepTimeId: function (selectedPrepTimeIdd) {
      this.recipeRequest.preparationTimeId = selectedPrepTimeIdd;
    },


    addRecipe: function () {
      this.$http.post("/recipe", this.recipeRequest
      ).then(response => {
        this.recipeResponse.recipeId = response.data.recipeId;
        this.recipeIngredientRequest.recipeId = response.data.recipeId;
      }).catch(error => {
        console.log(error)
      })
    },
    setRecipeIngredientId: function (info) {
      alert(JSON.stringify(info))
      console.log(info)
      this.recipeIngredientRequest.ingredientId = info // miks on recipeRequest ja recipeResponse eraldI?
      // siin püüame kinni.

    },


    addRecipeIngredient: function () {
      this.$http.post("/recipe/ingredient", this.recipeIngredientRequest
      ).then(response => {
        // getRecipeIngredientsByRecipeId
      }).catch(error => {
        console.log(error)
      })
    },


    addIngredientToTable: function () {
      this.errorMessage.message = ''
      if (this.tempIngredient.ingredientName.length === 0 || this.tempIngredient.ingredientQuantity.length === 0
          || this.tempIngredient.measurementName.length === 0) {
        // kas siin ei peaks olema
        this.errorMessage.message = 'Palun täida kõik väljad'
      } else {

        this.recipe.recipeIngredient.push(this.tempIngredient)



      }
    },

    addInfoToRecipeCategoryId: function (recipeCategoryId) {
      this.recipe.recipeCategoryId = recipeCategoryId
      console.log(this.recipe.recipeCategoryId)
    },
    addNewIngredient: function () {
      this.$router.push({name: 'newIngredientRoute'})
    },
    addInfoToPrepTimeId: function (prepTimeId) {
      this.recipe.prepTimeId = prepTimeId

    },
    addInfoToRecipeIngredient: function (ingredient) {
      this.tempIngredient.ingredientId = ingredient.ingredientId
      this.tempIngredient.ingredientName = ingredient.ingredientName
    },
    addNewMeasurementUnit: function (recipeMeasurement) {
      this.tempIngredient.measurementId = recipeMeasurement.measurementId
      this.tempIngredient.measurementName = recipeMeasurement.measurementName
    },


  }
}
</script>

<style scoped>

</style>
