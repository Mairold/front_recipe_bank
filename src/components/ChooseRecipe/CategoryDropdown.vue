<template>
  <select v-model="selectedCategoryId" class="form-select" aria-label="Default select example">
    <option selected disabled value="0">Kategooria</option>
    <option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">
      {{ category.categoryName }}
    </option>

  </select>
</template>
<script>
export default {
  name: 'CategoryDropdown',

  data: function () {
    return {
      selectedCategoryId: 0,
      categories: [
        {
          categoryName: '',
          categoryId: 0
        },
      ],
    }
  },
  methods: {
    getCategoryDropdownInfo: function () {
      this.$http.get('/add-to-menu/category')
          .then(result => {
            this.categories = result.data
            console.log('CATEGORIES: ' + JSON.stringify(this.categories))
          })
          .catch(error => {
            console.log('Mingi viga tuli')
          });
    },
  },
  beforeMount() {
    this.getCategoryDropdownInfo()
  }
}
</script>