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
          <div v-if="recipeResponseDto.recipeId === 0">
            <div style="border:1px solid darkslategrey; text-align: left; padding:10px; text-indent: 3px">
              Üldandmed
              <form>
                <div class="form-row">
                  <!-- Sisesta retsepti pealkiri -->

                  <div class="form-group col-md-12">
                    <input v-model="recipeRequestDto.recipeName" type="text" class="form-control" id="recipeId"
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
                    <ServingSizeInput :servingSize="recipeRequestDto.servingSize"/>
                  </div>

                  <button v-on:click="addRecipe" type="button" class="btn btn-success">Lisa</button>

                </div>
                <div class="form-group">
                </div>
              </form>
            </div>
          </div>

          <div v-if="recipeResponseDto.recipeId !== 0">
            <div style="border:1px solid darkslategrey; text-align: left; padding:10px; text-indent: 3px">
              <h1>Retsept</h1>
              <h3>{{ recipeRequestDto.recipeName }}</h3>
            </div>
          </div>

          <!-- Koostisosade komponent -->

          <div v-if="recipeResponseDto.recipeId !== 0"
               style="border:1px solid darkslategrey; text-align: left; padding:10px; text-indent: 3px">
            Koostisosad
            <div class="row g-3">

              <!-- Vali retsepti koostisosa -->

              <RecipeList :recipeId="recipeResponseDto.recipeId"/>

              <!-- Vali retsepti koostisosa -->

              <div class="col-md-3">
                <RecipeIngredient @clickSelectRecipeIngredientEvent="setRecipeIngredientId"/>
              </div>

              <!-- Vali retsepti koostisosa ühiku kogus -->

              <div class="col-md-2">
                <RecipeIngredientQuantity :ingredientQuantity="addQuantity"/>
              </div>

              <!-- Vali retsepti koostisosa ühiku  -->


              <div class="col-md-5">
                <RecipeIngredientSelectBox @clickSelectMeasurement="addNewMeasurementUnit"/>
              </div>

              <div class="col-md-1">

                <button v-on:click="addIngredient" type="button" class="btn btn-success">Lisa</button>

              </div>

              <!-- Vali retsepti valmistamise juhend -->

              <div class="col-md-12">
                <div class="form-floating">
                  <input v-model="recipeComment" type="text" class="form-control" id="floatingInput" placeholder=""
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

      <button v-on:click="saveRecipeComment" type="button" class="btn btn-success">Salvesta retsept</button>
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
import RecipeList from "@/components/AddRecipeForm/RecipeList";


export default {
  name: "AddRecipe",
  components: {
    RecipeList, RecipeNameInput, CategoryDropdown, PrepTimeDropdown,
    ServingSizeInput, RecipeIngredient, RecipeIngredientQuantity,
    AllowedMeasurementTable, RecipeInstructions, IngredientSelectBox, RecipeIngredientSelectBox
  },


  data: function () {
    return {
      displayAddIngredient: false,

      recipeRequestDto: {
        recipeName: '',
        recipeCategoryId: 0,
        preparationTimeId: '',
        servingSize: 4
      },

      recipeResponseDto: {
        recipeId: 0
      },

      recipeIngredientRequest: {
        recipeId: 0,
        ingredientId: 0,
        ingredientQuantity: 0,
        // measurementId: 0,
        allowedMeasurements: [
          {
            measurementName: '',
            measurementId: 0
          }
        ],
      },

      errorMessage:
          {
            message: '',
            errorCode: ''
          },

      recipeComment: ''
    }
  },
  methods: {

    setCategoryId: function (selectedCategoryId) {
      this.recipeRequestDto.recipeCategoryId = selectedCategoryId;
    },

    setPrepTimeId: function (selectedPrepTimeIdd) {
      this.recipeRequestDto.preparationTimeId = selectedPrepTimeIdd;
    },

    addRecipe: function () {
      this.$http.post("/recipe", this.recipeRequestDto
      ).then(response => {
        this.recipeResponseDto.recipeId = response.data.recipeId;
        this.recipeIngredientRequest.recipeId = response.data.recipeId;
      }).catch(error => {
        console.log(error)
      })
    },
    setRecipeIngredientId: function (selectedIngredientId) {
      this.recipeIngredientRequest.ingredientId = selectedIngredientId //
      // siin püüame kinni. Sulgudes oli algselt (info) , Kas siin peaks pigem panema selectedIngredientId nagu on Recipeingredientis komponendist siia emittitud?
    },

    addQuantity: function (ingredientQuantity) {
      this.recipeIngredientRequest.ingredientQuantity = ingredientQuantity
    },

    addNewMeasurementUnit: function (measurementId) {
      this.recipeIngredientRequest.measurementId = measurementId
    },

    //todo ("("/recipeAllowedMeasurement")") Pooleli

      getAllowedMeasurementsByIngredientId: function (ingredientId) {
        this.$http.get("/recipeAllowedMeasurement", {
              params: {
                someRequestParam1: this.someDataBlockVariable1,
                someRequestParam2: this.someDataBlockVariable2
              }
            }
        ).then(response => {
          console.log(response.data)
        }).catch(error => {
          console.log(error)
        })
      },


    addIngredient: function () {
      console.log(this.recipeIngredientRequest)
      this.errorMessage.message = ''
      if (this.recipeIngredientRequest.recipeId === 0 || this.recipeIngredientRequest.ingredientId === 0 ||
          this.recipeIngredientRequest.ingredientQuantity === 0 || this.recipeIngredientRequest.measurementId === 0) {
        this.errorMessage.message = 'Palun täida kõik väljad'
      } else {
        this.addRecipeIngredientToRecipe();
        // this.recipe.recipeIngredient.push(this.tempIngredient)

      }
    },

    addRecipeIngredientToRecipe: function () {
      this.$http.post("/ingredient/ingredientToRecipe", this.recipeIngredientRequest
      ).then(response => {
        this.$children[10].getAllRecipeIngredients()
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    addNewIngredient: function () {
      this.$router.push({name: 'newIngredientRoute'})
    },

    saveRecipeComment: function () {
      this.$http.put("/recipe", null, {
            params: {
              recipeId: this.recipeResponseDto.recipeId,
              recipeComment: this.recipeComment
            }
          }
      ).then(response => {
        this.errorMessage.message = 'Retsept on salvestatud'
        this.recipeRequestDto = {}
        this.recipeResponseDto = {}
        this.recipeIngredientRequest = {}
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
  }
}
</script>

<style scoped>

</style>
