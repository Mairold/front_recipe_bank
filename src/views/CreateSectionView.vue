<template>
  <div>
    <h1>Uue menüü välja lisamine</h1>

    <form class="mt-5">
      <label v-model="sectionInMenuName" for="sectionName">Välja nimi:</label>
      <input type="text" id="sectionName" name="sectionName" required>
      <input v-on:click="submitButtonEvent" type="submit" value="Salvesta" class="btn btn-success ms-3">
    </form>
  </div>
</template>

<script>
export default {
  name: "CreateSectionView",
  data: function () {
    return {
      menuId: sessionStorage.getItem('menuId'),
      sectionInMenuName: ''
    }
  },
  methods: {
    submitButtonEvent: function () {

        this.$http.post("/some/path", null, {
              params: {
                someRequestParam1: this.menuId,
                someRequestParam2: this.sectionInMenuName
              }
            }
        ).then(response => {
          console.log(response.data)
        }).catch(error => {
          console.log(error)
        })
      }
    ,
    }

}
</script>
