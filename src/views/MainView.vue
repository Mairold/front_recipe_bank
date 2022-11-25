<template>
  <div>

    <div class="row justify-content-center m-2">
      <h1>Avavaade</h1>
    </div>

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
