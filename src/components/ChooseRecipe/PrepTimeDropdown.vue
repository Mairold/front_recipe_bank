<template>
  <select v-model="selectedPrepTimeId" class="form-select" aria-label="Default select example">
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
            // alert('Töötab!')
            console.log('PREP-TIMES: ' + JSON.stringify(this.prepTimes))
          })
          .catch(error => {
            console.log('Mingi viga tuli')
          })
    }
  },
  beforeMount() {
    this.getPrepTimeDropdownInfo()
  }
}
</script>