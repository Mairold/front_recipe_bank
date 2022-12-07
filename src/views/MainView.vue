<template>
  <div>

    <div class="row justify-content-center m-2">
      <h1> Tere, {{ username }}! Siin on kõik Sinu loodud menüüd ja ostunimekirjad:</h1>
    </div>

    <!--    Siia lehele tuleb kasutaja viimane menüü ja viimane ostunimekiri-->

    <div class="row m-5">
      <div class="col-6">
        <table class="table table-striped">
          <thead class="textBackground">
          <tr>
            <th scope="col">*</th>
            <th scope="col">Menüü</th>
            <th scope="col">Saada e-kirjaga</th>
          </tr>
          </thead>
          <tbody class="textBackground">
          <tr v-for="menu in menus" :key="menu.menuId">
            <th scope="row"> {{ menu.sequenceNumber }}</th>

            <td>
              <router-link :to="{name: 'menuRoute', params: { menuId: 0 }}">{{ menu.menuDate }}</router-link>
            </td>
            <td>
              <button type="button" class="btn btn-light">Saada</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-6">
        <table class="table table-striped">
          <thead class="textBackground">
          <tr>
            <th scope="col">*</th>
            <th scope="col">Poenimekiri</th>
            <th scope="col">Saada e-kirjaga</th>
          </tr>
          </thead>
          <tbody class="textBackground">
          <tr v-for="shoppingList in shoppingLists" :key="shoppingList.shoppingListId">
            <th scope="row">{ shoppingList.sequenceNumber }}</th>
            {
            <td>
              <router-link :to="{name: 'shoppingListRoute', params: { shoppingListId: 0 }}">
                {{ menu.shoppingListDate }}
              </router-link>
            </td>
            <td>
              <button type="button" class="btn btn-light">Saada</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
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
          menuDate: ''
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
        this.addMenuSequenceNumbers()

        console.log(response.data)

      }).catch(error => {
        console.log(error)
      })
    },
    getAllShoppingLists: function () {
      this.$http.get("/shopping-list", {
            params: {
              menuId: this.menus.menuId,
            }
          }
      ).then(response => {
        this.shoppingLists = response.data
        this.addShoppingListSequenceNumbers()
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    addMenuSequenceNumbers: function () {
      let counter = 1
      this.menus.forEach(location => {
        menu.sequenceNumber = counter
        counter++
      });
    },
    addShoppingListSequenceNumbers: function () {
      let counter = 1
      this.shoppingLists.forEach(location => {
        shoppingList.sequenceNumber = counter
        counter++
      });
    },


  },
  beforeMount() {
    this.getAllMenus()
    this.getUserName()
    this.getAllShoppingLists()
  }
}
</script>
