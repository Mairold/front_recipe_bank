<template>
  <div>
    <div class="row justify-content-center m-2">
      <h1>Uue kasutaja loomine</h1>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-5">
        <div class="input-group mb-3">
          <span class="input-group-text">Kasutajanimi</span>
          <input v-model="username" type="text" class="form-control">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Parool</span>
          <input v-model="password" type="password" class="form-control">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Parool uuesti</span>
          <input v-model="confirmPassword" type="password" class="form-control">
        </div>
        <div class="d-grid gap-2 mx-auto">
          <button v-on:click="createUserButtonClicked" type="button" class="btn btn-success">Loo kasutaja</button>
          <div v-if="errorMessage.message.length > 0" class="alert alert-danger" role="alert">
            {{ errorMessage.message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CreateUserView",
  data: function () {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      errorMessage: {
        message: '',
        errorCode: ''
      },
    }
  },

  methods: {
    createUser: function () {
      this.errorMessage.message = ''
      this.$http.post("/user/login", null, {
            params: {
              username: this.username,
              password: this.password
            }
          }
      ).then(response => {
        console.log(response.data)
        this.$router.push({name: 'loginRoute'})
      }).catch(error => {
        this.errorMessage = error.response.data
      })
    },

    createUserButtonClicked: function () {
      this.errorMessage.message = ''
      if (this.username.length === 0 || this.password.length === 0 || this.confirmPassword.length === 0) {
        this.errorMessage.message = 'Palun täida kõik väljad'
      } else if (this.password !== this.confirmPassword) {
        this.errorMessage.message = 'Paroolid ei kattu!'
      } else {
        this.createUser()
      }
    }
  },
}
</script>
