<template>


  <div class="container overflow-hidden">
<!--    <h1>Loo uus menüü!</h1>-->

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
      <div v-if="menuId !== null" class="col-2">
      <NewSectionButton />
      </div>
    </div>
    <div v-for="section in sections" :key="section.sectionId">
      <div class="border border-success rounded-3 mt-3">
        <div class="row justify-content-start">
          <div class="col-2">
            <h3>{{ section.sectionName }}</h3>
          </div>
          <div class="col-1">
            <button v-on:click="deleteSection(section.sectionId)" type="button" class="btn btn-sm btn-danger">Kustuta
            </button>
          </div>
        </div>
        <RecipesInSectionTable :recipesInMenuSection="recipesInMenuSection" :section="section"
                               @changeButtonClickEvent="changeRecipeInSection"
                               @deleteButtonClickEvent="deleteRecipeInSection"/>
        <div class="row justify-content-start m-1">
          <div class="col-2">
            <button v-on:click="addNewRecipeToMenu(section.sectionId)" type="button" class="btn btn-sm btn-success">Lisa
              retsept
            </button>
          </div>
        </div>

      </div>
    </div>
    <div class="row justify-content-end mt-3">
      <div v-if="recipesInMenuSection.length > 0" class="col-2">
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
      menuId: sessionStorage.getItem('menuId'),
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
          recipeId: 0,
          recipeName: '',
          plannedServingSize: 0,
          comment: '',
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


    addNewRecipeToMenu: function (sectionInMenuId) {
      sessionStorage.setItem('sectionInMenuId', sectionInMenuId)
      this.$router.push({name: 'addToMenuRoute'})
    },

    moveToShoppingList: function () {
      this.$router.push({name: 'createShoppingListRoute'})
    },

    changeRecipeInSection: function (recipeInSectionId) {
      sessionStorage.setItem('recipeInSectionId', recipeInSectionId)
      this.$router.push({name: 'addToMenuChangeRoute'})
    },

    getRecipeInSections: function () {
      if (sessionStorage.getItem('menuId') !== null) {
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
      }
    },

    getMenuSections: function () {
      if (sessionStorage.getItem('menuId') !== null) {
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
      }
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
    this.recipesInMenuSection = []
    this.getMenuSections()
    this.getRecipeInSections()
  }
}
</script>

