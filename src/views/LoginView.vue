<template>
  <div>

    <div class="row justify-content-center m-2">
      <h1>Sisselogimine</h1>
    </div>

    <div class="row justify-content-center">

      <div class="col-lg-5">

<!--        <AlertError :message="errorMessage"/>-->

        <div class="input-group mb-3">
          <span class="input-group-text">Kasutajanimi</span>
          <input v-model="username" type="text" class="form-control">
        </div>

      <div class="input-group mb-3">
          <span class="input-group-text">parool</span>
          <input v-model="password" type="password" class="form-control">
        </div>
      </div>
    </div>

    <div class="row justify-content-center m-5">

      <div class="d-grid gap-2 col-6 mx-auto">

        <button v-on:click="login" type="button" class="btn btn-success">Logi sisse</button>
      </div>
    </div>

    <div class="row justify-content-center m-5">

      <div class="d-grid gap-2 col-6 mx-auto">

        <button v-on:click="login" type="button" class="btn btn-success">Tee kasutaja</button>

      </div>

    </div>
  </div>



</template>



<script>
export default {
  name: "LoginView",

  data: function () {
    return {
      username: '',
      password: '',
      errorMessage: '',
      userId: ''
    }
  }
}
</script>
