<template>
    <div>
      <button v-on:click="generateNewSection" type="button" class="btn btn-success">Lisa uus sektsioon</button>
    </div>
</template>
<script>
export default {
  name: 'NewSectionButton',
  methods: {
    generateNewSection: function () {
      this.$router.push({name: 'createSectionRoute'})
    }
  }
}
</script>
