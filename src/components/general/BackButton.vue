<template>
  <div class="col pe-5 ">
    <button v-on:click="backButtonClickEvent" type="button" class="btn btn-success">Tagasi</button>
  </div>
</template>
<script>
export default {
  name: 'BackButton',
  methods: {
    backButtonClickEvent: function () {
      this.$emit('backButtonAction')
    }
  }
}
</script>