<template>
  <div>
    <div class="row justify-content-center m-2">
      <h1>Lisa retsept</h1>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-5">




          <form>
            <div class="form-row">
              <div class="form-group col-md-12">
                <input type="newRecipe" class="form-control" id="recipeId" placeholder="Retsepti pealkiri">
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