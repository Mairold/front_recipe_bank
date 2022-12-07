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

              <RecipeList :recipe-ingredient-info="recipeIngredientInfo"/>


              <!-- Vali retsepti koostisosa -->

              <div class="col-md-3">
                <RecipeIngredient @clickSelectRecipeIngredientEvent="setRecipeIngredientId"/>
              </div>

              <!-- Vali retsepti koostisosa ühiku kogus -->

              <div class="col-md-2">
                <RecipeIngredientQuantity @sendIngredientQuantity="setQuantity"/>
              </div>

              <!-- Vali retsepti koostisosa ühiku  -->

              <div class="col-md-6">
                <IngredientAllowedMeasurement :allowedMeasurementUnits="allowedMeasurementUnits"
                                              @clickSelectAllowedMeasurement="setSelectedAllowedMeasurement"/>
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
import IngredientAllowedMeasurement from "@/components/AddRecipeForm/IngredientAllowedMeasurement";


export default {
  name: "AddRecipe",
  components: {
    IngredientAllowedMeasurement,
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
        measurementUnitId: 0,

      },

      recipeIngredientInfo: [
        {
          recipeId: 0,
          ingredientName: '',
          quantity: 0,
          measureUnitName: '',
        }
      ],

      errorMessage:
          {
            message: '',
            errorCode: ''
          },

      recipeComment: '',

      allowedMeasurementUnits: [
        {
          measurementUnitId: 0,
          allowedMeasurementUnitId: 0,
          allowedMeasurementName: ''
        }
      ]

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
      this.getAllowedRecipeIngredientMeasurementInfo(selectedIngredientId)
      // siin püüame kinni. Sulgudes oli algselt (info) , Kas siin peaks pigem panema selectedIngredientId nagu on Recipeingredientis komponendist siia emittitud?
    },

    getAllowedRecipeIngredientMeasurementInfo: function (ingredientId) {
      this.$http.get("/ingredient/recipeAllowedMeasurement", {
            params: {
              ingredientId: ingredientId,
            }
          }
      ).then(response => {
        this.allowedMeasurementUnits = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    setQuantity: function (ingredientQuantity) {
      this.recipeIngredientRequest.ingredientQuantity = ingredientQuantity
    },

    setSelectedAllowedMeasurement: function (selectedMeasurementUnit) {
      this.recipeIngredientRequest.measurementUnitId = selectedMeasurementUnit
    },

    addRecipeIngredientToRecipe: function () {
      this.$http.post("/ingredient/ingredientToRecipe", this.recipeIngredientRequest
      ).then(response => {
        this.getAllRecipeIngredients()

        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    getAllRecipeIngredients: function () {
      this.$http.get("/ingredient/in-recipe", {
        params: {
          recipeId: this.recipeResponseDto.recipeId
        }
      })
          .then(response => {
            this.recipeIngredientInfo = response.data
            console.log(response.data)
          })
          .catch(error => {
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

    addIngredient: function () {
      console.log('Olen siin 22')
      this.errorMessage.message = ''
      if (this.recipeIngredientRequest.recipeId === 0 || this.recipeIngredientRequest.ingredientId === 0 ||
          this.recipeIngredientRequest.ingredientQuantity === 0 || this.recipeIngredientRequest.allowedMeasurementUnitId === 0) {
        this.errorMessage.message = 'Palun täida kõik väljad'
      } else {
        this.addRecipeIngredientToRecipe();
       //this.recipe.recipeIngredient.push(this.recipeIngredientInfo)

      }
    },

  },

  beforeMount() {
    this.recipeIngredientInfo = []
    this.getAllRecipeIngredients()
  }

}
</script>


