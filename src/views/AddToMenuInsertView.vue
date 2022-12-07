<template>
  <div>

    <div class="row justify-content-center m-1">
      <h1>Retsepti lisamine menüüsse</h1>
    </div>

    <div>
      <div class="row justify-content-center mt-2">
        <div class="col-lg-6">
          <div class="input-group mb-3">
            <div class="form-floating "><input disabled v-model="recipeName" type="text" class="form-control" id="floatingInput" placeholder="">
              <label for="floatingInput">Retsepti nimetus</label></div>
<!--            siin väljal on kaasa võetud "Vali retsept" vaatest menüüsse salvestatava retsepti nimetus. Seda ei saa siin vaates enam muuta-->
          </div>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-lg-3">
          <h5>Vali sööjate arv:</h5>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-lg-1">
          <div class="input-group mb-3">
            <div><input v-model="recipeToMenuRequest.servingSize" type="number" min="1" class="form-control" id="servingSizeInput">
<!--              väljale on määratud default väärtuseks 4-->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center mt-3">
      <div class="col-lg-9">
        <h5>Sisesta kommentaarid retsepti kohta. Näiteks söögikord, toimkond jms:</h5>
      </div>
    </div>

    <div class="row justify-content-center mt-2">
      <div class="d-grid gap-5 col-7 mx-auto">
        <div><input v-model="recipeToMenuRequest.commentToRecipe" type="text" class="form-control" id="floatingInput">
        </div>
        <button v-on:click="insertToMenu" type="button" class="btn btn-success">Lisa menüüsse</button>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "AddToMenuInsertView",

  data: function () {
    return {

      recipeName: sessionStorage.getItem('recipeName'),
      // Retsepti nime toon väljale session storagest. RetseptiId salvestada session storage'isse juba eelmises vaates ja selleks lisada sessionstorage-set "vali retsept" vaatesse

      recipeToMenuRequest: {
        sectionInMenuId: Number(sessionStorage.getItem('sectionInMenuId')), // selle salvestab SS-sse "Koosta menüü" vaade
        // userId: Number(sessionStorage.getItem('userId')), Seda polegi siin vaja, sest salvestamine toimub sectionInMenu tabelisse ja sela pole userId-d
        recipeId: Number(sessionStorage.getItem('recipeId')),
        servingSize: 4,
        commentToRecipe: '',
    }
  }
  },

  // nupule vajutades salvestatakse retsept id järgi menüüsse ja võetakse sinna kaasa sööjate arv ning kommentaar.
  // todo: Peale nupu vajutamist liigutakse tagasi "Vali retsept" vaatesse järgmist retsepti otsima.

  methods: {

    insertToMenu: function () { // see meetod salvestab backis valitud retsepti koos sööjate arvu ja kommentaariga recipe-in-sectionisse
      this.$http.post("/menu/add-recipe-to-section", this.recipeToMenuRequest
      ).then(response => {
// tagasi ei ole meil siia midagi vaja saada, edasi on vaja liikuda "Vali retsept" vaatesse.
        // Kas oleks vaja midagi sessionstoragesse panna?
        console.log(response.data)
        this.$router.push({name: 'addToMenuRoute'})
      }).catch(error => {
        console.log(error)
      })
    },

    }
}
</script>