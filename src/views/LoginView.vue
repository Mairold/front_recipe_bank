<template>
  <div>

    <div class="row justify-content-center m-2">
      <h1>Sisselogimine</h1>
    </div>

    <div class="row justify-content-center">

      <div class="col-lg-5">


        <div class="input-group mb-3">
          <span class="input-group-text">Kasutajanimi</span>
          <input v-model="username" type="text" class="form-control">
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">parool</span>
          <input v-model="password" type="password" class="form-control">
        </div>

        <div v-if="errorMessage.message.length > 0" class="alert alert-danger" role="alert">
          {{ errorMessage.message }}
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

        <button v-on:click="createUser" type="button" class="btn btn-success">Tee kasutaja</button>

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
      userId: 0,
      errorMessage: {
        message: '',
        errorCode: ''
      },
    }
  },
  methods: {

    login: function () {

      this.errorMessage.message = ''
      if (this.username.length === 0 || this.password.length === 0) {
        this.errorMessage.message = 'Palun täida kõik väljad'

      } else {

        this.$http.get("/login", {
              params: {
                username: this.username,
                password: this.password
              }
            }
        ).then(response => {
          this.userId = response.data
          console.log(response.data)

          sessionStorage.setItem('userId', this.userId)
          this.$router.push({name: 'mainRoute'})

        }).catch(error => {
          this.errorMessage = error.response.data
          console.log(error)
        });
      }
    },
    createUser: function () {
      this.$router.push({name: 'createUserRoute'})
    }
  }
}
</script>
