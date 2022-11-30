<template>


  <div class="container overflow-hidden" :id="app">
    <h1>Loo uus menüü!</h1>

    <!--  Lisa sektsioon nupp-->
    <NewSectionButton @sectionButtonEvent="generateNewSection"/>

    <div v-for="section in sections">
      <div class="row justify-content-center border border-success rounded-3 mt-3">
        <div class="col">
          Seda divi hakkame juurde looma nupu vajutusega.
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import NewSectionButton from "@/components/menu/NewSectionButton";
import SectionField from "@/components/menu/SectionField";

export default {
  name: "CreateMenuView",
  components: {SectionField, NewSectionButton},


  data: function () {
    return {
      menuId: 0,
      sections: [{
        sectionId: 0,
        sectionName: '',
        recipes: [{
          recipeInSectionId: 0,
          recipeName: '',
          plannedServingSize: 0,
        }
        ]
      }
      ]

    }
  },

  methods: {
    generateNewSection: function () {
      this.$router.push({name: 'createSectionRoute'})
    },

    addNewMenu: function () {
      this.$http.post("/menu", null, {
            params: {
              userId: sessionStorage.getItem('userId'),
            }
          }
      ).then(response => {
        this.menuId = response.data
        sessionStorage.setItem('menuId', this.menuId)
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    getMenuSections: function () {
      this.$http.get("/menu/sections" , {
        params: {
          menuId:sessionStorage.getItem('menuId')
        }
      })
          .then(response => {
            this.sections = response.data
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
  beforeMount() {
    this.addNewMenu()
    this.getMenuSections()
  }
}
</script>

