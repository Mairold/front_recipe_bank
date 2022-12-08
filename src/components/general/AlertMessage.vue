<template>
  <div v-if="errorResponse?.message.length > 0 " :class="errorResponse.alertAttClass" role="alert">
    {{ errorResponse.message }}
  </div>
</template>
<script>
export default {
  name: 'AlertMessage',
  props: {
    errorResponse: {}
  }
}
</script>