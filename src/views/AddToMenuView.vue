<template>
  <div>
    <div class="row justify-content-center m-2">
      <h1>Vali retseptid ja lisa menüüsse</h1>
    </div>

    <div>
      <div class="row justify-content-between m-4">
        <div class="col offset-md-0">

          <button v-on:click="addNewRecipe" type="button" class="btn btn-success">Ei leidnud endale isuäratavat
            retsepti? Lisa uus siit </button>
        </div>
        <div class="col pe-5">

          <button v-on:click="backToMenu" type="button" class="btn btn-success">Tagasi menüüd vaatama</button>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row justify-content-start m-5">
        <div class="col col-lg-3">
          <!-- siia tuleb otsingukast, mille võtsin Bootstrapi avalehelt :-)-->
          <div class="row">
          <input type="search" class="form-control" id="search-input" placeholder="Otsi retsepti" aria-label="Search docs for..."
                 autocomplete="on" data-bd-docs-version="5.0">
          </div>
          <div class="row mt-3">
            <!-- siia tuleb kategooria rippmenüü-->
            <select class="form-select" aria-label="Default select example">
              <option selected disabled value="0">Kategooria</option>
              <option value="1">Supp</option>
              <option value="2">Praad</option>
              <option value="3">Magustoit</option>
            </select>
          </div>
          <div class="row mt-3">
            <!-- siia tuleb valmistamise aeg rippmenüü-->
            <select class="form-select" aria-label="Default select example">
              <option selected disabled value="0">Valmistamise aeg</option>
              <option value="1">0-15 min</option>
              <option value="2">1-2 h</option>
              <option value="3">2+ h</option>
            </select>
          </div>
        </div>
        <div class="col col-lg-9">
          <!-- siia tuleb nelja veeruga tabel, mille viimases veerus on nupud-->
          <table class="table table-success table-striped">
            <thead>
            <tr>
              <th scope="col">Kategooria</th>
              <th scope="col">Retsept</th>
              <th scope="col">Valmistamise aeg</th>
              <th scope="col">Lisa menüüsse</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th scope="row">Supp</th>
              <td>Frikadellisupp</td>
              <td>0-15 min</td>
              <td><button type="button" class="btn btn-light">Lisa menüüsse</button></td>
            </tr>
            <tr>
              <th scope="row">Praad</th>
              <td>Seapraad hapukapsaga</td>
              <td>2+ h</td>
              <td><button type="button" class="btn btn-light">Lisa menüüsse</button></td>
            </tr>
            <tr>
              <th scope="row">Magustoit</th>
              <td>Õunakook</td>
              <td>1-2 h</td>
              <td><button type="button" class="btn btn-light">Lisa menüüsse</button></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "AddToMenuView",

  data: function () {
    return {}
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
