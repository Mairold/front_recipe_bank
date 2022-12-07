<template>
  <div>

    <div class="row justify-content-center m-2">
      <h1> Tere, kasutaja! Siin on Sinu loodud menüüd ja ostunimekirjad:</h1>
    </div>

<!--    Siia lehele tuleb kasutaja viimane menüü ja viimane ostunimekiri-->

    <div>

      <h1> Siia tuleb tabel, kus on kõik kasutaja loodud menüüd ja ostunimekirjad</h1>

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
