<template>
  <div>
    <div class="row justify-content-center m-2">
      <h1>Vali retseptid ja lisa menüüsse</h1>
    </div>

    <div>
      <div class="row justify-content-between mt-5">
        <div class="col col-lg-6">
          <button v-on:click="addNewRecipe" type="button" class="btn btn-success">Ei leidnud endale isuäratavat
            retsepti? Lisa uus siit
          </button>
        </div>
        <div class="col col-lg-6">
          <button v-on:click="backToMenu" type="button" class="btn btn-success">Tagasi menüüd vaatama</button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row justify-content-start m-5">
        <div class="col col-lg-2">
          <!-- siia tuleb otsingukast, mille võtsin Bootstrapi avalehelt :-)-->
          <div class="row">
            <input type="search" class="form-control" id="search-input" placeholder="Otsi retsepti"
                   aria-label="Search docs for..."
                   autocomplete="on" data-bd-docs-version="5.0">
          </div>
          <!-- siia tuleb kategooria rippmenüü-->
          <div class="row mt-3">
            <CategoryDropdown :categories="categories"/>
          </div>
          <!-- siia tuleb Ajakulu rippmenüü-->
          <div class="row mt-3">
            <PrepTimeDropdown :prep-times="prepTimes"/>
          </div>
        </div>
        <div class="col col-lg-10">
          <!-- siin on nelja veeruga tabel, mille viimases veerus on nupud-->
          <ChooseRecipeTable/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ChooseRecipeTable from "@/components/ChooseRecipe/ChooseRecipeTable";
import CategoryDropdown from "@/views/CategoryDropdown";
import PrepTimeDropdown from "@/views/PrepTimeDropdown";

export default {
  name: "AddToMenuView",
  components: {PrepTimeDropdown, CategoryDropdown, ChooseRecipeTable},
  data: function () {
    return {
      categories: [
        {
          categoryName: 'Supp',
          categoryId: 1
        },
        {
          categoryName: 'Praad',
          categoryId: 2
        },
        {
          categoryName: 'Magustoit',
          categoryId: 3
        },
        {
          categoryName: 'Salat',
          categoryId: 4
        }
      ],
      prepTimes: [
        {
          prepTime: '0-15 min',
          prepTimeId: 1
        },
        {
          prepTime: '1-2 h',
          prepTimeId: 2
        },
        {
          prepTime: '2+ h',
          prepTimeId: 3
        }
      ]
    }
  },

  methods: {

    backToMenu: function () {
      this.$router.push({name: 'menuRoute'})
    },
    addNewRecipe: function () {
      this.$router.push({name: 'addRecipeRoute'})
    }
  }
}
</script>
