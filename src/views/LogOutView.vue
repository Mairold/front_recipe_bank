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
    }
  },
  beforeMount() {
    this.clearSessionStorage()
    this.$router.push({name:'loginRoute'})
  }
}
</script>

