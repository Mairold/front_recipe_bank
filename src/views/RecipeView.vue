<template>
  <div>

    <div class="container">
      <div class="row justify-content-between m-2">
        <div class="col-10">
          <div class="input-group">
            <h3>{{ recipe.recipeName }}</h3>
            <!-- Retsepti nimi genereeritakse dünaamiliselt otse andmebaasist ning muutmine on disabled-->
          </div>
        </div>
        <div class="col col-lg-2">
          <button v-on:click="closeRecipe" type="button" class="btn btn-success">
            Sulge retsept
          </button>
        </div>
      </div>
    </div>

    <div class="row justify-content-start m-5">
      <div class="col-4">
        <div class="input-group mb-3">
          <span class="input-group-text">Kategooria</span>
          <input disabled v-model="recipe.categoryName" type="text" class="form-control">
        </div>
      </div>
      <div class="col-3">
        <div class="input-group mb-3">
          <span class="input-group-text">Ajakulu</span>
          <input disabled v-model="recipe.prepTime" type="text" class="form-control">
        </div>
      </div>
      <div class="col-2">
        <div class="input-group mb-3">
          <span class="input-group-text">Sööjate arv</span>
          <input  v-model="recipe.servingSize" class="form-control" type="number" min="1" id="servingSizeInput">
        </div>
      </div>

    </div>

    <div class="container">
      <div class="row justify-content-between m-2">
        <!--        <div class="col col-lg-6">-->
        <div class="col-5">

          <div>
            <h4>Koostisosad</h4>
            <table class="table table-striped table-hover">
              <thead>
              <tr>
                <th scope="col">Toiduaine</th>
                <th scope="col">kogus</th>
                <th scope="col">ühik</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="ingredient in ingredients" :key="ingredient.ingredientId">
                <td>{{ ingredient.ingredientName }}</td>
                <td>{{ Math.round((ingredient.quantity / initialServingSize * recipe.servingSize) * 100)/100 }}</td>
                <td>{{ ingredient.measureUnitName }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-7">
          <div>
            <h4>Valmistamise juhised</h4>
            <!--   See on fikseeritud ja muutmatu. Nii nagu andmebaasist tuleb.-->
                        <div class="m-5" >
                          <p class="textBackground" > {{ recipe.instructions }}</p>
                        </div>
          </div>
        </div>

      </div>
    </div>


  </div>

</template>

<script>
export default {
  name: "RecipeView",

  data: function () {
    return {
      recipeId: Number(sessionStorage.getItem('recipeId') ),

      recipe: {
        categoryName: '',
        prepTime: '',
        recipeName: '',
        servingSize: 0,
        instructions: ''
      },
      ingredients: [
        {
          ingredientName: '',
          quantity: 0,
          measureUnitName: ''
        }
      ],

      initialServingSize: 0,
    }
  },
  methods: {
    closeRecipe: function () {
      this.$router.go(-1)
    },

    getRecipe: function () {
      this.$http.get("/recipe/content", {
            params: {
              recipeId: this.recipeId
            }
          }
      ).then(response => {
        this.recipe = response.data
        this.initialServingSize = response.data.servingSize
      }).catch(error => {
        console.log(error)
      })
    },
    getRecipeIngredients: function () {
      this.$http.get("/ingredient/in-recipe", {
            params: {
              recipeId: this.recipeId
            }
          }
      ).then(response => {
        this.ingredients = response.data
      }).catch(error => {
        console.log(error)
      })
    },

  },
  beforeMount() {
    this.getRecipe()
    this.getRecipeIngredients()
  },
}
</script>
