<template>
  <div>
    <div class="row justify-content-center m-2">
      <h1>Lisa uus retsept</h1>
    </div>
    <div class="container.col-md-8">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div v-if="recipeResponseDto.recipeId === null"
               style="border:1px solid darkslategrey; text-align: left; padding:10px; text-indent: 3px">
            <AddRecipeGeneralInfo ref="recipeGeneralInfo" @recipeGeneralInfoEvent="setRecipeBaseInfo"/>
          </div>
          <div v-if="recipeResponseDto.recipeId !== null">
            <div style="border:1px solid darkslategrey; text-align: left; padding:10px; text-indent: 3px">
              <h3>{{ recipeResponseDto.recipeName }}</h3>
            </div>
            <div style="border:1px solid darkslategrey; text-align: left; padding:10px; text-indent: 3px">
              <AddRecipeComponents ref="recipeComponentInfo"/>
            </div>
            <div style="border:1px solid darkslategrey; text-align: left; padding:10px; text-indent: 3px">
              <div class="form-floating">
                <textarea v-model="recipeInstruction.recipeComment" class="form-control" placeholder="Valmistamise juhend:" id="instructionsBox"
                          style="height: 100px"></textarea>
                <label for="instructionsBox">Valmistamise juhend:</label>
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
    <div class="form-group justify-content-center">
      <div v-if="recipeResponseDto.recipeId !== null">
        <div class="mt-3">
          <button v-on:click="saveRecipeComment" type="button" class="btn btn-success">Salvesta retsept</button>
        </div>
      </div>
      <div v-if="isRecipeFinished" class="mt-3">
        <button v-on:click="ifSavedAddToMenu" class="btn btn-success" type="button">Lisa retsept menüüsse</button>
      </div>
      <div class="mt-3">
        <button v-on:click="navigateToRecipeMainView" type="button" class="btn btn-success">Vaata kõiki retsepte
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AlertMessage from "@/components/general/AlertMessage";
import AddRecipeGeneralInfo from "@/components/AddRecipeForm/AddRecipeGeneralInfo.vue";
import AddRecipeComponents from "@/components/AddRecipeForm/AddRecipeComponents.vue";

export default {
  name: "AddRecipe",
  components: {
    AddRecipeComponents,
    AddRecipeGeneralInfo,
    AlertMessage
  },


  data: function () {
    return {
      displayAddIngredient: false,
      isRecipeFinished: false,

      recipeResponseDto: {
        recipeId: sessionStorage.getItem('inputRecipeId'),
        recipeName: '',
      },

      recipeInstruction:
          {
            recipeId: sessionStorage.getItem('inputRecipeId'),
            recipeComment: '',
          },

      errorResponse: {
        message: '',
        alertAttClass: 'alert alert-danger'
      }
    }
  },
  methods: {

    setRecipeBaseInfo: function (recipeInfo) {
      this.recipeResponseDto = recipeInfo
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

    ifSavedAddToMenu: function () {
      if (this.recipeInstruction.recipeComment.length < 1) {
        this.showErrorMessage('Retsepti sisetamine ei ole veel lõpule viidud', 'alert alert-danger')
      } else if (sessionStorage.getItem('sectionInMenuId') === null) {
        this.showErrorMessage('Ei leitud ühtegi koostamisel olevat menüüd.', 'alert alert-danger',)
      } else {
        sessionStorage.setItem('recipeName', this.recipeResponseDto.recipeName)
        this.$router.push({name: 'addToMenuInsertRoute'})
      }
    },

    resetFieldsAfterRecipeSaved: function () {
      sessionStorage.removeItem('inputRecipeId')
      sessionStorage.setItem('recipeId', this.recipeResponseDto.recipeId)
      this.recipeResponseDto.recipeId = null
      this.$refs.recipeGeneralInfo.resetInputFields()
      this.$refs.recipeComponentInfo.resetIngredientFields()
      this.recipeInstruction.recipeComment = ''
    },

    saveRecipeComment: function () {
      if (this.recipeInstruction.recipeComment.length < 1 ) {
        this.showErrorMessage('Sisesta valmistamise juhend.', 'alert alert-danger')
      } else {
        this.$http.put("/recipe", this.recipeInstruction
        ).then(response => {
          this.showErrorMessage('Retsept on deeki lisatud', 'alert alert-success')
          this.resetFieldsAfterRecipeSaved()
          this.isRecipeFinished = true
        }).catch(error => {
          console.log(error)
        })
      }
    },

    navigateToRecipeMainView: function () {
      this.$router.push({name: 'addToMenuRoute'})
    },

    showErrorMessage: function (message, alertClass) {
      this.errorResponse.message = message
      this.errorResponse.alertAttClass = alertClass
    }
},

beforeMount()
{
  this.getRecipeName()
}

}
</script>


