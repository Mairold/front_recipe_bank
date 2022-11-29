<template>
  <input v-on:input="insertSearchValueEvent" v-model="searchValue" type="search" class="form-control" id="search-input"
         placeholder="Otsi retsepti"
         aria-label="Search docs for..."
         autocomplete="on" data-bd-docs-version="5.0">
</template>

<script>
export default {
  name: 'SearchBox',

  data: function () {
    return {
      searchValue: '',
    }
  },

  methods: {
    insertSearchValueEvent: function () {
      this.$emit('insertSearchValueEvent', this.searchValue)
    },
  },
}
</script>