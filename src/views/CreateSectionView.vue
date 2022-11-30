<template>
  <div>
    <h1>Uue menüü välja lisamine</h1>

    <form class="mt-5">
      <label for="sectionName">Välja nimi:</label>
      <input v-model="sectionInMenuName" type="text" id="sectionName" name="sectionName" required>
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
      sectionInMenuName: '',
    }
  },
  methods: {
    submitButtonEvent: function () {

        this.$http.post("/menu/section", null, {
              params: {
                menuId: this.menuId,
                sectionInMenuName: this.sectionInMenuName
              }
            }
        ).then(response => {
          sessionStorage.setItem('sectionInMenuId',response.data)
          console.log(response.data)
          this.$router.push({name:'createMenuRoute'})
        }).catch(error => {
          console.log(error)
        })
      }
    ,
    }

}
</script>
