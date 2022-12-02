<template>
  <div>
    <h1>Uue menüü välja lisamine</h1>

    <form class="mt-5">
      <label for="sectionName">Välja nimi:</label>
      <input v-model="sectionInMenuName" type="text" id="sectionName" name="sectionName" required>
      <input v-on:click="submitButtonEvent" type="button" value="Salvesta" class="btn btn-success ms-3">
    </form>
    <div class="row justify-content-center">
      <div class="col-2">
        <AlertMessage :error-response="errorResponse"/>
      </div>
    </div>
  </div>
</template>

<script>
import AlertMessage from "@/components/general/AlertMessage";

export default {
  name: "CreateSectionView",
  components: {AlertMessage},
  data: function () {
    return {
      menuId: sessionStorage.getItem('menuId'),
      sectionInMenuName: '',
      errorResponse: {
        message: '',
        alertAttClass: 'alert alert-danger'
      }
    }
  },
  methods: {
    showErrorMessage: function (message, alertClass) {
      this.errorResponse.message = message
      this.errorResponse.alertAttClass = alertClass
    },
    submitButtonEvent: function () {
      if (this.sectionInMenuName.length < 1) {
        this.showErrorMessage('Palun sisesta välja nimi!', 'alert alert-danger')
      } else {
        this.$http.post("/menu/section", null, {
              params: {
                menuId: this.menuId,
                sectionInMenuName: this.sectionInMenuName
              }
            }
        ).then(response => {
          sessionStorage.setItem('sectionInMenuId', response.data)
          this.$router.push({name: 'createMenuRoute'})
        }).catch(error => {
          console.log(error)
        })
      }
    }
    ,
  }

}
</script>
