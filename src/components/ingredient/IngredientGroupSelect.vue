<template>
  <div>
    <select v-if="itemCustomName === null" @change="groupChangeEvent" v-model="selectedIngredientGroupId"
            class="form-select"
            aria-label="--Vali grupp--">
      <option selected disabled value="0">--Vali grupp--</option>
      <option disabled v-for="ingredientGroup in ingredientGroups "
              :value="ingredientGroup.ingredientGroupId">
        {{ ingredientGroup.ingredientGroupName }}
      </option>
    </select>
    <select v-else @change="groupChangeEvent" v-model="selectedIngredientGroupId" class="form-select"
            aria-label="--Vali grupp--">
      <option selected disabled value="0">--Vali grupp--</option>
      <option v-for="ingredientGroup in ingredientGroups "
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
    itemCustomName: '',
    groupId: 0
  },

  data: function () {
    return {
      selectedIngredientGroupId: this.groupId === undefined ? 0 : this.groupId,
      ingredientGroups: [
        {
          ingredientGroupId: 0,
          ingredientGroupName: ''
        }
      ]
    }
  },

  methods: {
    groupChangeEvent: function () {
      this.$emit('groupChangeEvent', this.selectedIngredientGroupId)
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

    resetData: function () {
      this.selectedIngredientGroupId = 0
    }
  },

  beforeMount() {
    this.getAllIngredientGroups()
  }
}
</script>