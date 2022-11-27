<template>
  <select class="form-select" aria-label="Default select example">
    <option selected disabled value="0">Kategooria</option>
    <option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">
      {{ category.categoryName }}
    </option>

  </select>
</template>
<script>
export default {
  name: 'CategoryDropdown',
  props: {
    categories: {}
  }
}
</script>