<template>
  <div>
    <div class="row m-2 justify-content-start ">
      <h1>Tere tulemast kodukoka abilise lehele!</h1>
    </div>
    <div class="row justify-content-start offset-2 mt-5">
      <div class="col-3">
        <h2>Logi sisse:</h2>
      </div>
      <div class="row justify-content-start">
        <div class="col-3">
          <div class="input-group mt-3">
            <span class="input-group-text">Kasutajanimi</span>
            <input v-model="username" type="text" class="form-control">
          </div>
        </div>
      </div>
      <div class="row justify-content-start">
        <div class="col-3">
          <div class="input-group mt-3">
            <span class="input-group-text">Parool</span>
            <input v-model="password" type="password" class="form-control">
          </div>
          <div v-if="errorMessage.message.length > 0" class="alert alert-danger" role="alert">
            {{ errorMessage.message }}
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-start offset-2 mt-5">
      <div class="col-3">
        <div class="d-grid gap-2 col-6 mx-auto">
          <button v-on:click="loginAndCheckCredentials" type="button" class="btn btn-success">Logi sisse</button>
        </div>
      </div>
    </div>
    <div class="row justify-content-start offset-2 mt-3">
      <div class="col-3">
        <div class="d-grid gap-2 col-6 mx-auto">
          <button v-on:click="createUser" type="button" class="btn btn-success">Tee kasutaja</button>
        </div>
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

    validateCredentialsAndLogin: function () {
      this.$http.get("/user/login", {
            params: {
              username: this.username,
              password: this.password
            }
          }
      ).then(response => {
        this.userId = response.data
        sessionStorage.setItem('userId', this.userId)
        this.$emit('updateStatusEvent')
        this.$router.push({name: 'mainRoute'})
      }).catch(error => {
        this.errorMessage = error.response.data
        console.log(error)
      })
    },

    loginAndCheckCredentials: function () {
      this.errorMessage.message = ''
      if (this.username.length === 0 || this.password.length === 0) {
        this.errorMessage.message = 'Palun täida kõik väljad'
      } else {
        this.validateCredentialsAndLogin();
      }
    },

    createUser: function () {
      this.$router.push({name: 'createUserRoute'})
    }
  },

  beforeMount() {
    sessionStorage.clear()
    this.$emit('updateStatusEvent')
  }
}
</script>
