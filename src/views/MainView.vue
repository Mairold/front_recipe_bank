<template>
  <div>

    <div class="row justify-content-center m-2">
      <h1> Tere, "kasutaja nimi"! Siin on kõik Sinu loodud menüüd ja ostunimekirjad:</h1>
    </div>

<!--    Siia lehele tuleb kasutaja viimane menüü ja viimane ostunimekiri-->

    <div class="m-5">

      <table class="table table-striped">
        <thead class="textBackground">
        <tr >
          <th scope="col">Kuupäev</th> // retsepti loomise kuupäev
          <th scope="col">Menüü</th>
          <th scope="col">Saada e-kirjaga</th>
          <th scope="col">Poenimekiri</th>
          <th scope="col">Saada e-kirjaga</th>
        </tr>
        </thead>
        <tbody class="textBackground">
        <tr>
          <th scope="row">pp.kk.aaaa</th>
          <td><router-link :to="{name: 'menuRoute', params: { menuId: 0 }}">Link, mis viib konkreetset menüüd vaatama</router-link></td>
          <td><button type="button" class="btn btn-light">Saada</button></td>
          <td><router-link :to="{name: 'shoppingListRoute', params: { menuId: 0 }}">Link, mis viib konkreetset poenimekirja vaatama</router-link></td>
          <td><button type="button" class="btn btn-light">Saada</button></td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  name: "MainView",
  components: {},
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),

      userName: '',
      menuId: 0,
      shoppingListId: 0,

      // vastuvõtvale lehele paneme datasse menuId: this.$route.query.menuId
      // vt vastuvõtu näidist panga frondist CustomerHomeView'st
      // <h3>Kliendi ID on {{userId}}</h3>

    }
  },
  methods: {

  }
}
</script>
