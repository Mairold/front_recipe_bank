<template>
  <div>
  <div v-for="section in sections" :key="section.sectionId">
    <div class="border border-success rounded-3 m-3">
      <div class="row justify-content-start">
        <div class="col-2">
          <h3>{{ section.sectionName }}</h3>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col">
          <table class="table table-success table-striped">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nimi</th>
              <th scope="col">Inimeste arv</th>
              <th scope="col">Kommentaar</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="recipe in recipesInMenuSection" :key="recipe.recipeInSectionId"
                v-if="recipe.sectionInMenuId === section.sectionId">
              <th scope="row">{{ recipe.sequenceNumber }}</th>
              <td v-on:click="navigateToRecipeView(recipe.recipeId)">{{ recipe.recipeName }}</td>
              <td>{{ recipe.plannedServingSize }}</td>
              <td>{{ recipe.comment }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
    <div class="row justify-content-end m-3">
      <div class="col-2">
        <CloseButton/>
      </div>
    </div>
  </div>
</template>

<script>
import CloseButton from "@/components/general/CloseButton";

export default {
  name: "MenuView",
  components: {CloseButton},
  data: function () {
    return {
      menuId: this.$route.params.menuId,
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
      ]
    }
  },
  methods: {
    getRecipeInSections: function () {
      if (this.$route.query.menuId !== null) {
        this.$http.get("/menu/section/recipe", {
              params: {
                menuId: this.menuId
              }
            }
        ).then(response => {
          this.recipesInMenuSection = response.data
          this.generateRowNumbers()
          console.log(response.data)
        }).catch(error => {
          console.log(error)
        })
      }
    },

    getMenuSections: function () {
      if (this.$route.query.menuId !== null) {
      this.$http.get("/menu/section", {
        params: {
          menuId: this.menuId
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

    generateRowNumbers: function () {
      let counter = 1
      this.recipesInMenuSection.forEach(element => {
            element.sequenceNumber = counter++
          }
      )
    },

    navigateToRecipeView: function (recipeId) {
      sessionStorage.setItem('recipeId', recipeId)
      this.$router.push({name: 'recipeRoute'})
    }

  },
  beforeMount() {
    this.sections = []
    this.getMenuSections()
    this.getRecipeInSections()
    this.generateRowNumbers()
  }


}
</script>

