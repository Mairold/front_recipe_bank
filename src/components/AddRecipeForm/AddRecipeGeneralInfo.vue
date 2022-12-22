<template>
  <div >
    <p>Üldandmed</p>
    <form>
      <div class="form-row">
        <div class="form-group col-md-12">
          <input v-model="recipeRequestDto.recipeName" type="text" class="form-control" id="recipeId"
                 placeholder="Retsepti pealkiri">
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-md-4 ">
          <CategoryDropdown @clickSelectCategoryEvent="setCategoryId"/>
        </div>
        <div class="col-md-4 ">
          <PrepTimeDropdown @clickSelectPrepTimeEvent="setPrepTimeId"/>
        </div>
        <div class="form-group col-md-4">
          <input v-model="recipeRequestDto.servingSize" type="number" min="1" max="100"
                 class="form-control" id="servingSizeId" placeholder="Sööjate arv">
        </div>
      </div>
      <div class="row justify-content-center m-2">
        <div class="col-md-4 offset-1">
          <button v-on:click="addRecipe" type="button" class="btn btn-success">Salvesta retsepti üldandmed</button>
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-4">
          <AlertMessage :errorResponse="errorResponse"/>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import CategoryDropdown from "@/components/ChooseRecipe/CategoryDropdown.vue"
import PrepTimeDropdown from "@/components/ChooseRecipe/PrepTimeDropdown.vue"
import AlertMessage from "@/components/general/AlertMessage.vue";
export default {
  name: 'addRecipeGeneralInfo',
  components: {AlertMessage, CategoryDropdown, PrepTimeDropdown},
  data: function () {
    return {
      recipeRequestDto: {
        recipeName: null,
        recipeCategoryId: 0,
        preparationTimeId: '',
        servingSize: null
      },
      errorResponse: {
        message: '',
        alertAttClass: 'alert alert-danger'
      },
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
        this.$emit('recipeGeneralInfoEvent', response.data)
        sessionStorage.setItem('inputRecipeId', response.data.recipeId)
        this.errorResponse.message = ''
      }).catch(error => {
        console.log(error)
      })
    },

    addRecipe: function () {
      if (this.recipeRequestDto.recipeName === null || this.recipeRequestDto.recipeCategoryId === 0 ||
          this.recipeRequestDto.preparationTimeId === 0 || this.recipeRequestDto.servingSize === null) {
        this.showErrorMessage('Palun täida kõik väljad', 'alert alert-danger')
      } else {
        this.postRecipe();
      }
    },

    showErrorMessage: function (message, alertClass) {
      this.errorResponse.message = message
      this.errorResponse.alertAttClass = alertClass
    },

    resetInputFields: function () {
      this.recipeRequestDto = {}
    }
  }
}
</script>