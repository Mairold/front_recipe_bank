<template>
  <div>

    <div class="row justify-content-center m-2">
      <h1> Kasutaja {{ username }} menüüd ja poenimekirjad:</h1>
    </div>

    <div class="row m-5">
      <table class="table table-striped">
        <thead class="textBackground">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Menüü</th>
          <th scope="col">Saada e-kirjaga</th>
          <th scope="col">Poenimekiri</th>
          <th scope="col">Saada e-kirjaga</th>
        </tr>
        </thead>
        <tbody class="textBackground">
        <tr v-for="menu in menus" :key="menu.shoppingListId">
          <th scope="row">{{ menu.sequenceNumber }}</th>
          <td v-on:click="setSessionStorage(menu.menuId)">
            {{ menu.formatedDateTimeMenu }}
          </td>
          <td>
            <button type="button" class="btn btn-light">Saada</button>
          </td>
          <td>
            <router-link :to="{name: 'shoppingListRoute', params: { shoppingListId: menu.shoppingListId } }">{{ menu.formatedDateTimeShoppingList }}</router-link>

          </td>
          <td>
            <button type="button" class="btn btn-light">Saada</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
import moment from "moment";

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
          shoppingListId: 0,
          shoppingListDate: ''
        }
      ],
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

    formatDateTime: function () {
      this.menus.forEach( menu => {
        menu.formatedDateTimeShoppingList = moment().format(menu.shoppingListDate, )
        menu.formatedDateTimeMenu = moment().format(menu.menuDate)
      })
    },

    getAllMenus: function () {
      this.$http.get("/shopping-list/menus", {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        this.menus = response.data
        this.addSequenceNumbers()
        this.formatDateTime()
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    addSequenceNumbers: function () {
      let counter = 1
      this.menus.forEach(menu => {
        menu.sequenceNumber = counter
        counter++
      })
    },

    setSessionStorage: function (menuId) {
      sessionStorage.setItem('menuId',menuId)
      this.$router.push({name: 'menuRoute'})
    }
  },
beforeMount()
{
  this.getAllMenus()
  this.getUserName()

}

}
</script>
