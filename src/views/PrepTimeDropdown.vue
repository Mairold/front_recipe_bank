<template>
  <select class="form-select" aria-label="Default select example">
    <option selected disabled value="0">Ajakulu</option>
    <option v-for="prepTime in prepTimes" :key="prepTime.prepTimeId" :value="prepTime.prepTimeId">
      {{ prepTime.prepTime }}
    </option>
  </select>
</template>
<script>
export default {
  name: 'PrepTimeDropdown',
  props: {
    prepTimes: {}
  }
}
</script>