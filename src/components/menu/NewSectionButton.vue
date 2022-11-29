<template>
  <div class="row justify-content-evenly">
    <div class="col-2 offset-5">
      <button v-on:click="sectionButtonClickEvent" type="button" class="btn btn-success">Lisa uus sektsioon</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NewSectionButton',
  methods: {
    sectionButtonClickEvent: function () {
      this.$emit('sectionButtonEvent')
    }
  }
}
</script>
