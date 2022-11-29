<template>
  <select v-on:change="clickSelectPrepTimeEvent" v-model="selectedPrepTimeId" class="form-select"
          aria-label="Default select example">
    <option selected disabled value="0">Ajakulu</option>
    <option v-for="prepTime in prepTimes" :key="prepTime.prepTimeId" :value="prepTime.prepTimeId">
      {{ prepTime.prepTime }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'PrepTimeDropdown',

  data: function () {
    return {
      selectedPrepTimeId: 0,
      prepTimes: [
        {
          prepTime: '',
          prepTimeId: 0
        }
      ]
    }
  },
  methods: {
    getPrepTimeDropdownInfo: function () {
      this.$http.get('/add-to-menu/prep-time')
          .then(result => {
            this.prepTimes = result.data
          })
          .catch(error => {
            console.log(error)
          })
    },
    clickSelectPrepTimeEvent: function () {
      this.$emit('clickSelectPrepTimeEvent', this.selectedPrepTimeId)
    },
  },
  beforeMount() {
    this.getPrepTimeDropdownInfo()
  }
}
</script>