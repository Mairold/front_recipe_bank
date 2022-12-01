<template>
  <div>

    <div class="row justify-content-center m-1">
      <h1>Lisatud retsepti andmete muutmine</h1>
    </div>

    <div>
      <div class="row justify-content-center mt-2">
        <div class="col-lg-6">
          <div class="input-group mb-3">
            <div class="form-floating "><input type="text" class="form-control" id="floatingInput" placeholder="">
              <label for="floatingInput">Retsepti nimetus, mis tuleb kaasa eelmisest vaatest</label></div>
            <!--         todo: siia väljale peab tulema "Koosta menüü" üldvaatest kaasa menüüsse salvestatava retsepti nimetus -->
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
            <div><input type="number" class="form-control" id="servingSizeInput">
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
        <div><input type="text" class="form-control" id="floatingInput">
        </div>
        <button v-on:click="changeInMenu" type="button" class="btn btn-success">Salvesta muudatused</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "AddToMenuChangeView",

  methods: {

    changeInMenu: function () {
      // todo: nupule vajutades muudetakse varasemalt menüüsse salvestatud retsepti sööjate arv ning kommentaar.
      // todo: Peale salvestamist liigutakse tagasi "Koosta menüü" üldvaatesse, kus kuvatakse retsepti juures tehtud muudatused.


    }
  }
}
</script>