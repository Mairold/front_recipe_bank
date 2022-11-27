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
            <CategoryDropdown/> <!-- see on Kategooria rippmenüü-->
          </div>
          <div class="row mt-3">
            <PrepTimeDropdown/> <!-- see on Ajakulu rippmenüü-->
          </div>
        </div>
        <div class="col col-lg-10">
          <ChooseRecipeTable/>  <!-- see on nelja veeruga retseptide tabel, mille viimases veerus on nupud-->
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
    return {}
  },

  methods: {

    backToMenu: function () {
      this.$router.push({name: 'menuRoute'})
    },
    addNewRecipe: function () {
      this.$router.push({name: 'addRecipeRoute'})
    },
  }
}
</script>
