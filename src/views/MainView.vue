<template>
  <div>

    <div class="row justify-content-center m-2">
      <h1>Avavaade, kus on kuvatud viimase menüü ja ostunimekirja sisu</h1>
    </div>

<!--    Siia lehele tuleb kasutaja viimane menüü ja viimane ostunimekiri-->

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
