<template>
  <div >
    <select @change="groupChangeEvent" v-model="selectedIngredientGroupId" class="form-select"
            aria-label="--Vali grupp--">
      <option selected disabled value="0">--Vali grupp--</option>
      <option v-for="ingredientGroup in ingredientGroups " :key="ingredientGroup.ingredientGroupId"
              :value="ingredientGroup.ingredientGroupId">
        {{ ingredientGroup.ingredientGroupName }}

      </option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'IngredientGroupSelect',
  props: {
    ingredientGroupId: 0,
  },
  data: function () {
    return {
      selectedIngredientGroupId: this.ingredientGroupId,
      ingredientGroups: [
        {
          ingredientGroupId: 0,
          ingredientGroupName: ''
        }]
    }
  },

  methods: {
    groupChangeEvent: function () {
      this.$emit('groupChangeEvent', this.selectedIngredientGroupId)
    },

    setSelectedIngredientGroup: function () {
      this.selectedIngredientGroupId = this.ingredientGroupId
    },

    getAllIngredientGroups: function () {
      this.$http.get("/ingredient/group")
          .then(response => {
            this.ingredientGroups = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },
  },

  beforeMount() {
    this.getAllIngredientGroups()
    this.setSelectedIngredientGroup()

  },

}
</script>