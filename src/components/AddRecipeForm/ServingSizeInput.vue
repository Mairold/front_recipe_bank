<template>
  <div class="col-lg-5">

    <input v-model="servingSize" type="number" pattern="[0-9]"
           class="form-control" id="servingSizeId" placeholder="Sööjate arv" >
</div>
</template>

<script>
export default {
  name: "ServingSize",
  props:{
    servingSize: {}
  }
}
</script>

<style scoped>

</style>