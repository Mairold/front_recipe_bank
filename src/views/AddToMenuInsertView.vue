<template>
  <div>

    <div class="row justify-content-center m-1">
      <h1>Retsepti lisamine menüüsse</h1>
    </div>

    <div>
      <div class="row justify-content-center mt-2">
        <div class="col-lg-6">
          <div class="input-group mb-3">
            <div class="form-floating "><input type="text" class="form-control" id="floatingInput" placeholder="">
              <label for="floatingInput">Retsepti nimetus, mis tuleb kaasa eelmisest vaatest</label></div>
<!--            todo: siia väljale peab tulema "Vali retsept" vaatest kaasa menüüsse salvestatava retsepti nimetus-->
          </div>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-lg-3">
          <h5>Sisesta sööjate arv:</h5>
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
        <h5>Sisesta kommentaarid retsepti kohta. Näiteks söögikord, toimkond jms:</h5>
      </div>
    </div>

    <div class="row justify-content-center mt-2">
      <div class="d-grid gap-5 col-7 mx-auto">
        <div><input type="text" class="form-control" id="floatingInput">
        </div>
        <button v-on:click="insertToMenu" type="button" class="btn btn-success">Lisa menüüsse</button>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "AddToMenuInsertView",

  methods: {

    insertToMenu: function () {
      // todo: nupule vajutades salvestatakse retsept id järgi menüüsse ja võetakse sinna kaasa sööjate arv ning kommentaar.
      // todo: Peale nupu vajutamist liigutakse "Koosta menüü" üldvaatesse, kuhu on kuvatud äsja menüüsse lisatud retsept.

    }
  }
}
</script>