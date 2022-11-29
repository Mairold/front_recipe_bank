<template>
  <select v-on:change="clickSelectCategoryEvent" v-model="selectedCategoryId" class="form-select"
          aria-label="Default select example">
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
          })
          .catch(error => {
            console.log(error)
          });
    },
    clickSelectCategoryEvent: function () {
      this.$emit('clickSelectCategoryEvent', this.selectedCategoryId)
    },
  },
  beforeMount() {
    this.getCategoryDropdownInfo()
  }
}
</script>