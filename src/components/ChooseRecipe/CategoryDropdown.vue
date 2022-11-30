<template>
  <select v-on:change="clickSelectCategoryEvent" v-model="selectedCategoryId" class="form-select"
          aria-label="Default select example">
    <option selected value="0">Kategooria</option>
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
          categoryId: 0,
          categoryName: ''

        },
      ],
    }
  },

  methods: {
    getCategoryDropdownInfo: function () {
      this.$http.get('/category')
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