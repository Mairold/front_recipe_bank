<template>
  <div>
    <div class="row justify-content-center m-2">
      <h1>Vali retseptid ja lisa menüüsse</h1>
    </div>

    <div>
      <div class="row justify-content-between mt-5">
        <div class="col col-lg-6">
          <button v-on:click="addNewRecipe" type="button" class="btn btn-success">
            Ei leidnud endale isuäratavat retsepti? Lisa uus siit
          </button>
        </div>
        <div class="col col-lg-6">
          <button v-on:click="backToMenu" type="button" class="btn btn-success">
            Tagasi menüüd vaatama
          </button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row justify-content-start m-5">
        <div class="col col-lg-2">
          <!-- siin on otsingukast, mille rottisin Bootstrapi avalehelt -->
          <div class="row">
            <input type="search" class="form-control" id="search-input" placeholder="Otsi retsepti"
                   aria-label="Search docs for..."
                   autocomplete="on" data-bd-docs-version="5.0">
          </div>
          <div class="row mt-3">
            <CategoryDropdown @clickSelectCategoryEvent="getRecipeByCategoryId"/> <!-- see on Kategooria rippmenüü-->
          </div>
          <div class="row mt-3">
            <PrepTimeDropdown @clickSelectPrepTimeEvent="getRecipeByPrepTimeId"/> <!-- see on Ajakulu rippmenüü-->
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

export default {
  name: "AddToMenuView",
  components: {PrepTimeDropdown, CategoryDropdown, ChooseRecipeTable},
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

    backToMenu: function () {
      this.$router.push({name: 'menuRoute'})
    },
    addNewRecipe: function () {
      this.$router.push({name: 'addRecipeRoute'})
    },

    getAllRecipes: function () {
      this.$http.get("/add-to-menu/recipe")
          .then(response => {
            this.recipes = response.data
            this.addSequenceNumbers()
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    },

    getRecipeByCategoryId: function (selectedCategoryId) {
      alert('Klick event juhtus, saime parentis sõnumi ja käivitasime selle meetodi, Category id: ' + selectedCategoryId)

      this.$http.get("/add-to-menu/info/by-category", {
            params: {
              categoryId: selectedCategoryId
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
    getRecipeByPrepTimeId: function (selectedPrepTimeId) {
      alert('Klick event juhtus, saime parentis sõnumi ja käivitasime selle meetodi, PrepTime id: ' + selectedPrepTimeId)
      this.$http.get("/add-to-menu/info/by-preptime", {
        params: {
          prepTimeId: selectedPrepTimeId
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

    alertRecipeName: function (recipeName) {
      alert(recipeName + ' alert from child')
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
    // this.getRecipeByCategoryId()
    // this.getRecipeByPrepTimeId()

  }
}
</script>
