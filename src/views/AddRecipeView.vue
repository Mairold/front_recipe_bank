<template>
  <div>
    <div class="row justify-content-center m-2">
      <h1>Lisa retsept</h1>
    </div>

    <!-- Üldandmete komponent -->

    <div class="container.col-md-8" aria-placeholder="Üldandmed" type="text" id="General">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <div style="border:1px solid darkslategrey; text-align: left; padding:10px; text-indent: 3px">
            Üldandmed
            <form>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <input type="text" class="form-control" id="recipeId" placeholder="Retsepti pealkiri">
                </div>
              </div>
              <div class="row justify-content-center mt-3">
                <div class="col-md-4 ">
                  <select class="form-select" aria-label="Default select example">
                    <option selected>Kategooria</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div class="col-md-4 ">
                  <select class="form-select" aria-label="Default select example">
                    <option selected>Valmistamise aeg</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div class="col-md-4 ">
                  <select class="form-select" aria-label="Default select example">
                    <option selected>Sööjate arv</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
              </div>
            </form>
          </div>


          <!-- Koostisosade komponent -->

          <div style="border:1px solid darkslategrey; text-align: left; padding:10px; text-indent: 3px">
            Koostisosad
            <div class="row g-3">
              <div class="col-md-3">
                <select class="form-select" aria-label="Default select example">
                  <option selected>Koostisosa, ühik</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="col-md-2">
                <input type="newRecipe" class="form-control" id="recipeId" placeholder="500">
              </div>
              <div class="col-md-2">
                <select class="form-select" aria-label="Default select example">
                  <option selected>Ühik</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select></div>
              <div class="col-md-1">
                <input type="image" src="plus.ico.png" height="30" width="30"/>
              </div>

              <div class="col-md-4">
                <div class="form-floating">
                  <input type="text" class="form-control" id="floatingInput" placeholder=""
                         style="height: 250px; margin-outside: 5px">
                  <label for="floatingInput">Valmistamise juhend</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group col-md-12">

    <div class="row-cols-md-6">
      <button type="button" class="btn btn-success">Lisa deeki uus toiduaine</button>
    </div>

      <button type="button" class="btn btn-success">Salvesta retsept</button>
    </div>

    <div class="form-group col-md-12">
    <div class="row-cols-md-3">
      <button type="button" class="btn btn-success">Salvesta retsept ja lisa menüüsse</button>

      <div class="row-cols-md-3">
      <select class="form-select" aria-label="Default select example">
        <option selected>Vali grupp</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
    </div>
    </div>
    </div>

</template>

<script>
export default {
  name: "AddRecipe"
}
</script>

<style scoped>

</style>
