<template>
  <div>

    <div class="row justify-content-center m-2">
      <h1> Tere, ! Siin on kõik Sinu loodud menüüd ja ostunimekirjad:</h1>
    </div>

<!--    Siia lehele tuleb kasutaja viimane menüü ja viimane ostunimekiri-->

    <div class="m-5">

      <table class="table table-striped">
        <thead class="textBackground">
        <tr >
          <th scope="col">*</th>
          <th scope="col">Menüü</th>
          <th scope="col">Saada e-kirjaga</th>
<!--          <th scope="col">Poenimekiri</th>-->
          <th scope="col">Saada e-kirjaga</th>
        </tr>
        </thead>
        <tbody class="textBackground">
        <tr v-for="menu in menus" :key="menu.menuId">
          <th scope="row">nr</th>
<!--          {{ shoppingList.sequenceNumber }}-->
          <td><router-link :to="{name: 'menuRoute', params: { menuId: 0 }}">{{ menu.menuDate }}</router-link></td>
          <td><button type="button" class="btn btn-light">Saada</button></td>
<!--          <td><router-link :to="{name: 'shoppingListRoute', params: { shoppingListId: 0 }}">{{shoppingLists.shoppingListDate}}</router-link></td>-->
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
      userId: Number(sessionStorage.getItem('userId')),
      
      username: '',

      menus: [
        {
          menuId: 0,
          menuDate: '',
          username: ''
        }
      ],
      shoppingLists: [
        {
          shoppingListId: 0,
          shoppingListDate: ''
        }
      ]
    }
  },
  methods: {

    getUserName: function () {
      this.$http.get("/user", {
            params: {
              userId: this.userId,
            }
          }
      ).then(response => {
        this.username = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    getAllMenus: function () {
      this.$http.get("/menu/menus", {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        this.menus = response.data
        console.log(response.data)

      }).catch(error => {
        console.log(error)
      })
    },
    // getAllShoppingLists: function () {
    //   this.$http.get("/some/path", {
    //         params: {
    //           menuId: this.menus.menuId,
    //         }
    //       }
    //   ).then(response => {
    //     this.shoppingLists = response.data
    //     // this.addSequenceNumbers()
    //     console.log(response.data)
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // },
    // addSequenceNumbers: function () {
    //   let counter = 1
    //   this.shoppingLists.forEach(location => {
    //     shoppingList.sequenceNumber = counter
    //     counter++
    //   });
    // },


  },
  beforeMount() {
    this.getAllMenus()
    // this.getAllShoppingLists()
  }
}
</script>
