<template>
  <div>

    <div class="row justify-content-center m-1">
      <h1>Lisatud retsepti andmete muutmine</h1>
    </div>

    <div>
      <div class="row justify-content-center mt-2">
        <div class="col-lg-6">
          <div class="input-group mb-3">
            <div class="form-floating "><input disabled v-model="recipeName" type="text" class="form-control" id="floatingInput" placeholder="">
              <label for="floatingInput">Retsepti nimetus</label></div>
            <!--         todo: siia väljale peab tulema bäkist menüüsse salvestatud ja hetkel muudetava retsepti nimetus -->
          </div>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-lg-3">
          <h5>Muuda sööjate arvu:</h5>
          <!--         todo: siia väljale peab tulema "Koosta menüü" üldvaatest kaasa menüüsse salvestatud sööjate arv -->
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-lg-1">
          <div class="input-group mb-3">
            <div><input v-model="servingSize" type="number" class="form-control" id="servingSizeInput">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center mt-3">
      <div class="col-lg-9">
        <h5>Täienda kommentaari:</h5>
        <!--         todo: siia väljale peab tulema "Koosta menüü" üldvaatest kaasa menüüsse salvestatud retsepti kommentaar -->
      </div>
    </div>

    <div class="row justify-content-center mt-2">
      <div class="d-grid gap-5 col-7 mx-auto">
        <div><input v-model="servingSize" type="text" class="form-control" id="floatingInput">
        </div>
        <button v-on:click="changeInMenu" type="button" class="btn btn-success">Salvesta muudatused</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "AddToMenuChangeView",

  data: function () {
    return {

      recipeInSectionId: sessionStorage.getItem('recipeInSectionId'),
// mida ma siin vastu võtan? Mul on vaja eeltäita retsepti ID, serving size ja kommentaar
      // kõik need andmed saab siia recipe_in_section Id järgi.
      // Kui ID tuleb saasa, siis sellel lehel võiks teha Get-päringu, mis tooks bäckist need andmed ära ja eeltäidaks väljad.
      // Selleks peaks olema beforemount?

      recipeInMenuRequest: {
        recipeInSectionId: Number(sessionStorage.getItem('recipeInSectionId')), // selle salvestab SS-sse "Koosta menüü" vaade
        // userId: Number(sessionStorage.getItem('userId')), Seda polegi siin vaja, sest salvestamine toimub sectionInMenu tabelisse ja sela pole userId-d
        recipeId: Number(sessionStorage.getItem('recipeId')),
        servingSize: 4,
        commentToRecipe: '',
      },

    }
  },

  methods: {


    changeInMenu: function () {
      alert('See nupp salvestab muudatused ja viib tagasi "Koosta menüü" üldvaatesse')

      this.$http.put("/change-recipe-in-menu", this.recipeInMenuRequest     // mida me saadame put-iga bäkki?
      ).then(response => {
        console.log(response.data)
        this.$router.push({name: 'menuRoute'})
        // Peale salvestamist liigutakse tagasi "Koosta menüü" üldvaatesse, kus kuvatakse retsepti juures tehtud muudatused.
      }).catch(error => {
        console.log(error)
      })
    },
    // todo: nupule vajutades muudetakse varasemalt menüüsse salvestatud retsepti sööjate arv ning kommentaar.
    // todo: väljad eeltäidetakse andmebaasi andmetega, mitte sessionstoragest
    // salvesta muudatused taha tuleb bäkis put-teenus ja andmebaasis salvestatakse andmed üle.
    // Backis tuleb Id järgi üles entity ja siis anname sisse DTo. Küsida sealkohal Rainilt mäpperi kohta, sest me ei ole seda õppinud.


  }
}
</script>