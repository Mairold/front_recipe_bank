<template>
  <div>
    <div class="row justify-content-center m-2">
      <h1>Lisa uus retsept</h1>
    </div>

    <!-- Üldandmete komponent -->

    <div class="container.col-md-8" aria-placeholder="Üldandmed" type="text"
         id="General">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div v-if="recipeResponseDto.recipeId === null">
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

                    <input v-model="recipeRequestDto.servingSize" type="number" min="1"
                           class="form-control" id="servingSizeId" placeholder="Sööjate arv">
                  </div>


                  <button v-on:click="addRecipe" type="button" class="btn btn-success">Lisa</button>

                </div>
                <div class="form-group">
                </div>
              </form>
            </div>
          </div>

          <div v-if="recipeResponseDto.recipeId !== null">
            <div style="border:1px solid darkslategrey; text-align: left; padding:10px; text-indent: 3px">
              <h3>{{ recipeResponseDto.recipeName }}</h3>
            </div>


            <!-- Koostisosade komponent -->

            <div style="border:1px solid darkslategrey; text-align: left; padding:10px; text-indent: 3px">
              Koostisosad
              <div class="row g-3">

                <!-- Vali retsepti koostisosa -->

                <RecipeList :recipe-ingredient-info="recipeIngredientInfo"/>


                <!-- Vali retsepti koostisosa -->

                <div class="col-md-3">
                  <RecipeIngredient ref="recipeIngredient" @clickSelectRecipeIngredientEvent="setRecipeIngredientId"/>
                </div>

                <!-- Vali retsepti koostisosa ühiku kogus -->

                <div class="col-md-2">
                  <RecipeIngredientQuantity ref="ingredientQuantity" @sendIngredientQuantity="setQuantity"/>
                </div>

                <!-- Vali retsepti koostisosa ühiku  -->

                <div class="col-md-4">
                  <IngredientAllowedMeasurement ref="allowedMeasurements"
                                                :allowedMeasurementUnits="allowedMeasurementUnits"
                                                @clickSelectAllowedMeasurement="setSelectedAllowedMeasurement"/>
                </div>

                <div class="col-md-3 d-grid gap-2">
                  <button v-on:click="addIngredient" class="btn btn-success" type="button">Lisa retseptile</button>
                  <!-- NUPP: Lisa deeki uus toiduaine-->
                  <button v-on:click="addNewIngredient" class="btn btn-success" type="button">Lisa deeki uus toiduaine
                  </button>
                </div>

              </div>

              <!-- Vali retsepti valmistamise juhend -->

              <div class="col-md-12">
                <div class="form-floating">
                  <textarea v-model="recipeInstruction.recipeComment" class="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"></textarea>
                  <label for="floatingInput">Valmistamise juhend</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-evenly mt-3">
          <div class="col-2">
            <AlertMessage :errorResponse="errorResponse"/>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="form-group col-md-12">
        <div v-if="recipeResponseDto.recipeId !== null" class="row justify-content-evenly m-4">
          <!-- NUPP: Salvesta retsept retseptide kataloogi -->
          <div class="col-lg-2">
            <button v-on:click="saveRecipeComment" type="button" class="btn btn-success">Salvesta retsept</button>
          </div>
        </div>
        <div class="row justify-content-evenly m-4">
          <!-- NUPP: Salvesta retsept retseptide kataloogi ja lisa õige menüü külge kui see on olemas-->
          <div class="col-2">
            <button v-on:click="ifSavedAddToMenu" class="btn btn-success" type="button">Lisa retsept menüüsse</button>
          </div>
          <div class="col-2">
            <button v-on:click="navigateToRecipeMainView" type="button" class="btn btn-success">Vaata salvestatud
              retsepte
            </button>
          </div>
        </div>
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
import IngredientSelectBox from "@/components/ingredient/IngredientSelectBox";
import RecipeIngredientSelectBox from "@/components/AddRecipeForm/RecipeIngredientSelectBox";
import RecipeList from "@/components/AddRecipeForm/RecipeList";
import IngredientAllowedMeasurement from "@/components/AddRecipeForm/IngredientAllowedMeasurement";
import AlertMessage from "@/components/general/AlertMessage";
import { getCurrentInstance } from 'vue'

export default {
  name: "AddRecipe",
  components: {
    AlertMessage,
    IngredientAllowedMeasurement,
    RecipeList, RecipeNameInput, CategoryDropdown, PrepTimeDropdown,
    RecipeIngredient, RecipeIngredientQuantity,
    AllowedMeasurementTable, RecipeInstructions, IngredientSelectBox, RecipeIngredientSelectBox
  },


  data: function () {
    return {
      displayAddIngredient: false,

      recipeRequestDto: {
        recipeName: null,
        recipeCategoryId: 0,
        preparationTimeId: '',
        servingSize: 0
      },

      recipeResponseDto: {
        recipeId: sessionStorage.getItem('inputRecipeId'),
        recipeName: '',
      },

      recipeIngredientRequest: {
        recipeId: sessionStorage.getItem('inputRecipeId'),
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

      errorResponse: {
        message: '',
        alertAttClass: 'alert alert-danger'
      },

      recipeInstruction:
          {
            recipeId: sessionStorage.getItem('inputRecipeId'),
            recipeComment: '',
          },

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

    postRecipe: function () {
      this.$http.post("/recipe", this.recipeRequestDto
      ).then(response => {
        this.recipeResponseDto = response.data
        this.recipeIngredientRequest.recipeId = response.data.recipeId;
        this.recipeInstruction.recipeId = response.data.recipeId;

        sessionStorage.setItem('inputRecipeId', response.data.recipeId)
        this.errorResponse.message = ''
      }).catch(error => {
        console.log(error)
      })
    },

    getRecipeName: function () {
      if (sessionStorage.getItem('inputRecipeId') !== null) {
        this.$http.get("/recipe/name", {
              params: {
                recipeId: sessionStorage.getItem('inputRecipeId'),
              }
            }
        ).then(response => {
          this.recipeResponseDto = response.data
        }).catch(error => {
          console.log(error)
        })
      }
    },

    addRecipe: function () {
      if (this.recipeRequestDto.recipeName === null || this.recipeRequestDto.recipeCategoryId === 0 ||
          this.recipeRequestDto.preparationTimeId === 0 || this.recipeRequestDto.servingSize === 0) {
        this.showErrorMessage('kõik ei ole valitud', 'alert alert-danger')
      } else {
        this.postRecipe();
      }
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
        this.clearIngredientFields()
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    clearIngredientFields: function () {
      this.$refs.recipeIngredient.resetSelectedIngredientId()
      this.$refs.ingredientQuantity.resetIngredientQuantity()
      this.$refs.allowedMeasurements.resetSelectedMeasurementUnit()
    },

    getAllRecipeIngredients: function () {
      if (sessionStorage.getItem('inputRecipeId') !== null) {
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
      }
    },


    addNewIngredient: function () {
      this.$router.push({name: 'newIngredientRoute'})
    },

    ifSavedAddToMenu: function () {
      if (this.recipeInstruction.recipeComment.length < 1) {
        this.showErrorMessage('Retsepti sisetamine ei ole veel lõpule viidud', 'alert alert-danger')
      } else if(sessionStorage.getItem('sectionInMenuId') === null) {
        this.showErrorMessage('Ei leitud ühtegi koostamisel olevat menüüd.','alert alert-danger',)
      } else {
        sessionStorage.setItem('recipeId', this.recipeResponseDto.recipeId)
        sessionStorage.setItem('recipeName', this.recipeResponseDto.recipeName)
        this.$router.push({name: 'addToMenuInsertRoute'})
      }
      //save retsept ja kui kõik tingimused täidetud, siis routi add to menu routile.
    },

    resetFieldsAfterRecipeSaved: function () {
      sessionStorage.removeItem('inputRecipeId')
      this.recipeResponseDto.recipeId = null
      this.recipeRequestDto = {}
    },

    saveRecipeComment: function () {
      if (this.recipeInstruction.recipeComment.length === 0 || this.recipeIngredientInfo.length === 0) {
        this.showErrorMessage('Sisesta valmistamise juhend ja vali koostisosa.', 'alert alert-danger')
      } else {
        this.$http.put("/recipe", this.recipeInstruction
        ).then(response => {
          console.log(response.data)
          console.log(response.data)
          this.showErrorMessage('Retsept on deeki lisatud', 'alert alert-success')
          this.resetFieldsAfterRecipeSaved()
        }).catch(error => {
          console.log(error)
        })
      }
    },

    addIngredient: function () {
      console.log('Olen siin 22')
      if (this.recipeIngredientRequest.ingredientId === 0 || this.recipeIngredientRequest.ingredientQuantity === 0 ||
          this.recipeIngredientRequest.allowedMeasurementUnitId === 0) {
        this.showErrorMessage('Palun täida kõik väljad', 'alert alert-danger')
      } else {
        this.addRecipeIngredientToRecipe();
        //this.recipe.recipeIngredient.push(this.recipeIngredientInfo)

      }
    },

    navigateToRecipeMainView: function () {
      this.$router.push({name: 'addToMenuRoute'})
    },

    showErrorMessage: function (message, alertClass) {
      this.errorResponse.message = message
      this.errorResponse.alertAttClass = alertClass
    },

  },

  beforeMount() {
    this.recipeIngredientInfo = []
    this.getAllRecipeIngredients()
    this.getRecipeName()
  }

}
</script>


