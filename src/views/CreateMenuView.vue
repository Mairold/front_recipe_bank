<template>


  <div class="container overflow-hidden">
    <h1>Loo uus menüü!</h1>

    <!--  Lisa sektsioon nupp-->
    <div class="row justify-content-center">
      <NewMenuButton @newMenuEvent="addIdToMenuId"/>
      <div class="col-3">
        <div v-if="menuId === 0 & sections.length === 0">
          <== Alusta uut Menüü plaani.
        </div>
        <div v-if="menuId > 0 & sections.length === 0">
          Nüüd tee uus menüü väli ==>
        </div>
      </div>
      <NewSectionButton/>
    </div>
    <div v-for="section in sections" :key="section.sectionId">
      <div class="border border-success rounded-3 mt-3">
        <div class="row justify-content-start">
          <div class="col-2">
            <h3>{{ section.sectionName }}</h3>
          </div>
          <div class="col-1">
            <button v-on:click="deleteSection(section.sectionId)" type="button" class="btn btn-sm btn-danger">Kustuta</button>
          </div>
        </div>
        <RecipesInSectionTable :recipesInMenuSection="recipesInMenuSection" :section="section"
                               @changeButtonClickEvent="changeRecipeInSection"
                               @deleteButtonClickEvent="deleteRecipeInSection"/>
        <div class="row justify-content-start m-1">
          <div class="col-2">
            <button v-on:click="addNewRecipeToMenu" type="button" class="btn btn-sm btn-success">Lisa retsept</button>
          </div>
        </div>

      </div>
    </div>
    <div class="row justify-content-end mt-3">
      <div class="col-2">
        <button v-on:click="moveToShoppingList" type="button" class="btn btn-sm btn-success">Salvesta ja loo poenimekiri
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import NewSectionButton from "@/components/menu/NewSectionButton";
import NewMenuButton from "@/components/menu/NewMenuButton";
import RecipesInSectionTable from "@/components/menu/RecipesInSectionTable";
import AlertMessage from "@/components/general/AlertMessage";

export default {
  name: "CreateMenuView",
  components: {AlertMessage, RecipesInSectionTable, NewMenuButton, NewSectionButton},


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
          recipeInSectionId: 0,
          sectionInMenuId: 0,
          recipeName: '',
          plannedServingSize: 0,
          recipeComment: '',
        }
      ],
      errorResponse: {
        message: '',
        alertAttClass: 'alert alert-danger'
      }
    }
  },

  methods: {
    addIdToMenuId: function (menuId) {
      this.menuId = menuId
      this.getMenuSections()
      this.getRecipeInSections()
      console.log(this.menuId)
    },


    addNewRecipeToMenu: function () {
      this.$router.push({name: 'addToMenuRoute'})
    },

    moveToShoppingList: function () {
      this.$router.push({name: 'createShoppingListRoute'})
    },

    changeRecipeInSection: function (recipeInSectionId) {
      this.$router.push({
        name: 'addToMenuChangeRoute', query: {
          recipeInSectionId: recipeInSectionId
        }
      })
    },

    getRecipesInThisSectionBy: function (sectionId) {
      let recipesInOneSection
      this.recipesInMenuSection.forEach(unit => {
            if (unit.sectionInMenuId === sectionId) {
              recipesInOneSection.push(unit.sectionInMenuId)
            }
          }
      )
      return recipesInOneSection;
    },

    getRecipeInSections: function () {
      this.$http.get("/menu/section/recipe", {
            params: {
              menuId: sessionStorage.getItem('menuId')
            }
          }
      ).then(response => {
        this.recipesInMenuSection = response.data
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

    deleteRecipeInSection: function (recipeId) {
      this.$http.delete("/menu/section/recipe", {
            params: {
              recipeInSectionId: recipeId,
            }
          }
      ).then(response => {
        this.getMenuSections()
        this.getRecipeInSections()
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    deleteSection: function (sectionId) {
      this.$http.delete("/menu/section", {
            params: {
              menuSectionId: sectionId,
              recipeIds: this.getRecipesInThisSectionBy(sectionId)
            }
          }
      ).then(response => {
        this.getMenuSections()
        this.getRecipeInSections()
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
  },
  beforeMount() {
    this.sections = []
    this.getMenuSections()
    this.getRecipeInSections()
  }
}
</script>

