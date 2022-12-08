<template>
  <div>
    Logout
  </div>
</template>

<script>
export default {
  name: "LogOutView",
  methods: {
    clearSessionStorage: function () {
      sessionStorage.clear()
      this.$router.push({name:'loginRoute'})
    }
  },
  beforeMount() {
    this.clearSessionStorage()
  }
}
</script>

