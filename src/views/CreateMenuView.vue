<template>


  <div class="container overflow-hidden">
    <h1>Loo uus menüü!</h1>

    <!--  Lisa sektsioon nupp-->
    <div class="row justify-content-evenly">
      <NewMenuButton/>
      <NewSectionButton/>
    </div>
    <div v-for="section in sections">
      <div class="border border-success rounded-3 mt-3">
        <div class="row justify-content-start">
          <div class="col-2">
            <h3>{{ section.sectionName }}</h3>
          </div>
        </div>
        <div v-for="recipe in recipesInMenuSection" class="row justify-content-center">
          <div class="col">
            <table class="table table-success table-striped">
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nimi</th>
                <th scope="col">Inimeste arv</th>
                <th scope="col">Kommentaar</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="recipe.recipeInSectionId === section.sectionId">
                <th scope="row">1</th>
                <td>{{ recipe.recipeName }}</td>
                <td>{{ recipe.plannedServingSize }}</td>
                <td>{{ recipe.recipeComment }}</td>
                <td>
                  <button type="button" class="btn btn-success">Muuda</button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger">Kustuta</button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row justify-content-start m-1">
          <div class="col-2">
            <button type="button" class="btn btn-success">Lisa retsept</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewSectionButton from "@/components/menu/NewSectionButton";
import NewMenuButton from "@/views/NewMenuButton";

export default {
  name: "CreateMenuView",
  components: {NewMenuButton, NewSectionButton},


  data: function () {
    return {

      sections: [{
        sectionId: 0,
        sectionName: '',
      }
      ],
      recipesInMenuSection: [{
        recipeInSectionId: 0,
        sectionInMenuId: 0,
        recipeName: '',
        plannedServingSize: 0,
        recipeComment: '',
      }
      ]
    }
  },

  methods: {
    getRecipeInSections: function () {
      this.$http.get("/menu/section/recipe", {
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
  },
  beforeMount() {
    this.getMenuSections()
    this.getRecipeInSections()
  }
}
</script>

