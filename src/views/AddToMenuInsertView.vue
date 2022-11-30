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
          </div>
        </div>
      </div>

      <div class="row justify-content-center mt-1">
        <div class="col-lg-3">
          <h5>Sisesta palun sööjate arv:</h5>
          <div class="input-group mb-3">
            <div class="form-floating "><input type="number" class="form-control" id="servingSizeInput" placeholder="">
              <label for="servingSizeInput">Siia sisesta sööjate arv</label></div>
          </div>
        </div>


    </div>
    </div>

    <div class="row justify-content-center mt-3">
      <div class="col-lg-9">
        <h5>Siia saad sisestada oma kommentaarid retsepti kohta. Näiteks söögikord, kes valmistab jms:</h5>
      </div>
      <div class="col-lg-6">
        <div class="input-group mb-3">
          <div class="form-floating "><input type="text" class="form-control" id="floatingInput" placeholder="">
            <label for="floatingInput">Siia sisesta oma kommentaarid retsepti kohta</label></div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center mt-2">
      <div class="d-grid gap-2 col-6 mx-auto">
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
      // nupule vajutades salvestatakse retsept id järgi menüüsse ja võetakse kaasa sööjate arv ning kommentaar


    }
  }
}
</script>