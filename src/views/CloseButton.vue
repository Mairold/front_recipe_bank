<template>
  <button v-on:click="close" type="button" class="btn btn-success">
    Sulge
  </button>
</template>
<script>
export default {
  name: 'CloseButton',
  methods: {
    close: function () {
      this.$router.go(-1)
    },
  }
}
</script>
