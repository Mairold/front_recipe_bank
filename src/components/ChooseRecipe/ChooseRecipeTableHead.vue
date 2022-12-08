<template>
  <thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">Kategooria</th>
    <th scope="col">Retsept</th>
    <th scope="col">Ajakulu</th>
    <th v-if="sectionInMenuId !== null" scope="col">Lisa menüüsse</th>
  </tr>
  </thead>
</template>
<script>
export default {
  name: 'ChooseRecipeTableHead',
  props: {
    sectionInMenuId: 0
  },
}
</script>