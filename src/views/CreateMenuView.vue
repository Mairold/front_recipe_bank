<template>


  <div class="container overflow-hidden">
    <h1>Loo uus menüü!</h1>

    <!--  Lisa sektsioon nupp-->
    <div class="row justify-content-evenly">
      <NewMenuButton @newMenuEvent="addIdToMenuId"/>
      <NewSectionButton/>
    </div>
    <div v-for="section in sections" :key="section.sectionId">
      <div class="border border-success rounded-3 mt-3">
        <div class="row justify-content-start">
          <div class="col-2">
            <h3>{{ section.sectionName }}</h3>
          </div>
        </div>
        <RecipesInSectionTable :recipesInMenuSection="recipesInMenuSection" :section="section"
            @changeButtonClickEvent="changeRecipeInSection"
            @deleteButtonClickEvent="deleteRecipeInSection"/>
        <div class="row justify-content-start m-1">
          <div class="col-2">
            <button v-on:click="addNewRecipeToMenu" type="button" class="btn btn-success">Lisa retsept</button>
          </div>
        </div>

      </div>
    </div>
    <div class="row justify-content-end mt-3">
      <div class="col-2">
        <button v-on:click="moveToShoppingList" type="button" class="btn btn-success">Salvesta ja loo poenimekiri
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import NewSectionButton from "@/components/menu/NewSectionButton";
import NewMenuButton from "@/components/menu/NewMenuButton";
import RecipesInSectionTable from "@/views/RecipesInSectionTable";

export default {
  name: "CreateMenuView",
  components: {RecipesInSectionTable, NewMenuButton, NewSectionButton},


  data: function () {
    return {
      menuId: 0,
      sections: [
        {
          sectionId: 0,
          sectionName: '',
        }
      ],
      recipesInMenuSection: [
        {
          recipeInSectionId: 1,
          sectionInMenuId: 11,
          recipeName: 'Alkohol',
          plannedServingSize: 1000,
          recipeComment: 'Lheb liiale',
        },
        {
          recipeInSectionId: 2,
          sectionInMenuId: 12,
          recipeName: 'Vaarikad',
          plannedServingSize: 15,
          recipeComment: 'MMMMMMM',
        },
      ]
    }
  },

  methods: {
    addIdToMenuId: function (menuId) {
      this.menuId = menuId
      console.log(this.menuId)
    },
    getRecipeInSections: function () {
      this.$http.get("/recipe/inSection", {
            params: {
              menuId: sessionStorage.getItem('menuId')
            }
          }
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    getMenuSections: function () {
      this.$http.get("/menu/section", {
        params: {
          menuId: sessionStorage.getItem('menuId')
        }
      })
          .then(response => {
            this.sections = response.data
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    },

    addNewRecipeToMenu: function () {
      this.$router.push({name: 'addToMenuRoute'})
    },

    moveToShoppingList: function () {
      this.$router.push({name: 'createShoppingListRoute'})
    },

    changeRecipeInSection: function (recipeInSectionId) {
      this.$router.push({name:'addToMenuChangeRoute', query: {
        recipeInSectionId: recipeInSectionId
        }})
    },

    deleteRecipeInSection: function (recipe) {
      let index = this.recipesInMenuSection.indexOf(recipe)
      this.recipesInMenuSection.splice(index,1)
    }
  },
  beforeMount() {
    this.getMenuSections()
    this.getRecipeInSections()
    this.menuId = sessionStorage.getItem('menuId')
  }
}
</script>

