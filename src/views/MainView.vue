<template>
  <div>
<h1>Avavaade</h1>

  </div>
</template>



<script>
export default {
  name: "MainView",
  components: {},
  data: function () {
    return {
      userId: sessionStorage.getItem('userId')

    }
  },
  methods: {

  }
}
</script>
