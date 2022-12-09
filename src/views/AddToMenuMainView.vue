<template>
  <div>
    <div class="row justify-content-center">
    </div>

    <div>
      <div class="row justify-content-between ">
        <div class="col col-lg-6">
          <button v-on:click="addNewRecipe" type="button" class="btn btn-success">
            Ei leidnud endale isuäratavat retsepti? Lisa uus siit
          </button>
        </div>
        <div class="col col-lg-6">
          <button v-on:click="backToMenu" type="button" class="btn btn-success">
            Tagasi menüüd vaatama
<!--            Siit menüüd vaatama minnes peavad menüüs näha olema kõik juba lisatud retseptid.
Kas siia lehele või CreateMenuView-sse on vaja selleks midagi lisata?-->
          </button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row justify-content-start m-5">
        <div class="col col-lg-2">
          <div class="row">
            <SearchBox @insertSearchValueEvent="saveSearchIntoRequestInfo"/>
            <!-- siin on otsingukast -->
          </div>
          <div class="row mt-3">
            <CategoryDropdown @clickSelectCategoryEvent="saveCategoryIntoRequestInfo"/>
            <!-- see on Kategooria rippmenüü-->
          </div>
          <div class="row mt-3">
            <PrepTimeDropdown @clickSelectPrepTimeEvent="savePrepTimeInfoRequestInfo"/>
            <!-- see on Ajakulu rippmenüü-->
          </div>
        </div>
        <div class="col col-lg-10">
          <ChooseRecipeTable :recipes="recipes" @clickAlertButtonEvent="alertRecipeName"/>
          <!-- see on nelja veeruga retseptide tabel, mille viimases veerus on nupud-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChooseRecipeTable from "@/components/ChooseRecipe/ChooseRecipeTable";
import CategoryDropdown from "@/components/ChooseRecipe/CategoryDropdown";
import PrepTimeDropdown from "@/components/ChooseRecipe/PrepTimeDropdown";
import SearchBox from "@/components/ChooseRecipe/SearchBox";

export default {
  name: "AddToMenuView",
  components: {SearchBox, PrepTimeDropdown, CategoryDropdown, ChooseRecipeTable},
  data: function () {
    return {
      recipes: [
        {
          recipeId: 0,
          recipeName: '',
          categoryName: '',
          prepTime: ''
        }
      ],
      requestInfo: {
        searchBoxValue: '',
        categoryId: 0,
        prepTimeId: 0
      },
    }
  },

  methods: {

    addNewRecipe: function () {
      this.$router.push({name: 'addRecipeRoute'})
    },

    backToMenu: function () {
      this.$router.push({name: 'createMenuRoute'})
    },

    getAllRecipes: function () {
      this.$http.get("/recipe")
          .then(response => {
            this.recipes = response.data
            this.addSequenceNumbers()
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    },

    saveSearchIntoRequestInfo: function (searchBoxContent) {
      this.requestInfo.searchBoxValue = searchBoxContent
      this.getRecipeByRequestInfo()
    },

    saveCategoryIntoRequestInfo: function (selectedCategoryId) {
      this.requestInfo.categoryId = selectedCategoryId
      this.getRecipeByRequestInfo()
    },

    savePrepTimeInfoRequestInfo: function (selectedPrepTimeId) {

      this.requestInfo.prepTimeId = selectedPrepTimeId
      this.getRecipeByRequestInfo()
    },

    getRecipeByRequestInfo: function () {
      this.$http.get("/filter-recipes", {
            params: {
              prepTimeId: this.requestInfo.prepTimeId,
              categoryId: this.requestInfo.categoryId,
              searchBoxValue: this.requestInfo.searchBoxValue
            }
          }
      ).then(response => {
        this.recipes = response.data
        this.addSequenceNumbers()
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    alertRecipeName: function (recipe) {
      sessionStorage.setItem('recipeId', recipe.recipeId)
      sessionStorage.setItem('recipeName',recipe.recipeName)
     this.$router.push({name: 'addToMenuInsertRoute'})
    },

    addSequenceNumbers: function () {
      let counter = 1
      this.recipes.forEach(recipe => {
        recipe.sequenceNumber = counter
        counter++
      })
    }
  },

  beforeMount() {
    this.getAllRecipes()
  }
}
</script>
