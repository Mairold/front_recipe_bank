<template>
  <div>

    <div class="container">
      <div class="row justify-content-between m-2">
        <div class="col-10">
          <div class="input-group">
            <h2>Retsepti nimetus</h2>
            <!-- Retsepti nimi genereeritakse dünaamiliselt otse andmebaasist ning muutmine on disabled-->
          </div>
        </div>
        <div class="col col-lg-2">
          <button v-on:click="closeRecipe" type="button" class="btn btn-success">
            Sulge retsept
            <!-- Nupu vajutusel viiakse tagasi sinna vaatesse, kust tuldi retsepti vaatama:
            kas tagasi 1. "Koosta menüü", 2. "Valmis menüü" või 3. "Vali retsept" vaatesse
            Kas siia või teistesse vaadetesse on vaja selleks midagi lisada?-->
          </button>
        </div>
      </div>
    </div>


    <div class="row justify-content-center m-5">
<h3>Siia tulevad ühele reale kõrvuti tulpades kategooria, ajakulu ja inimeste arv.</h3>
<!--      Kategooria ja ajakulu on fikseeritud ja disabled. Tulevad andmebaasist.-->
<!--      ServingSize tuleb andmebaasist default nagu on salvestatud.-->
<!--      Aga võiks olla muudetav ning koostisosade kogused võiksid muutuda vastavalt servingSize muutmisele-->

    </div>

    <div class="container">
      <div class="row justify-content-between m-2">
<!--        <div class="col col-lg-6">-->
        <div class="col-6">
          <div class="row">
          <div>
<!--            <h4>Siia tulevad koostisosad koos koguste ja ühikutega:</h4>-->
            <!--   Kasutan rohelist tabelit ja tabeli päisesse kiri Koostisosad.
            Koostisosade kogust peaks saama muuta vastavalt servingSize'ile -->

            <table class="table table-striped table-hover">
              <thead>
              <tr>
               <th scope="col">Koostisosad</th>
                <th scope="col">kogus</th>
                <th scope="col">ühik</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Sibul</td>
                <td>2</td>
                <td>tk</td>
              </tr>
              <tr>
                <td>Spagetid</td>
                <td>300</td>
                <td>g</td>
              </tr>
              <tr>
                <td>Purustatud tomatid, 400g</td>
                <td>1</td>
                <td>purk</td>
              </tr>
              </tbody>
            </table>
          </div>
          </div>
<!--          <div class="col col-lg-2">-->
          <div class="col-12">
            <div class="row">
          <div>
            <h4>Siia tulevad valmistamise juhised pealkirjaga "Valmistamine":</h4>
            <!--   See on fikseeritud ja muutmatu. Nii nagu andmebaasist tuleb.-->
            <table class="table table-striped table-hover">
              <thead>
              <tr>
                <th scope="col">Valmistamine</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Pane kõrvitsatükid potti, kalla peale nii palju puljongit (või vesi + puljongipulber), et kõrvitsatükid oleksid kaetud. Lisa puljongipulber. Kuumuta keemiseni.
                  Haki sibul, prae õlis kuldseks. Lisa koos praadimisõliga kõrvitsatükkidele. Keeda kõrvitsatükke koos praetud sibulaga, kuni kõrvitsatükid on pehmed (aeg oleneb kõrvitsatüübist).
                  Kui kõrvits on pehme, siis püreesta kannmikseris või köögikombainis või saumiksriga ühtlaseks. Lisa sulatatud juust ning püreesta uuesti. Maitsesta vajadusel soola ja pipraga.
                  Lase supil 10-15 minutit taheneda, siis jaota kaussidesse ja serveeri. Peale nirista paksemat kõrvitsaseemneõli.
                  NIPP: Kui soovid, võid kaunistada supi ka röstitud kõrvitsaseemnetega</td>
              </tr>
              </tbody>
            </table>

          </div>
          </div>
          </div>
        </div>
      </div>
    </div>


  </div>

</template>

<script>
export default {
  name: "RecipeView",

  data: function () {
    return {}
  },
  methods: {
    closeRecipe: function () {

    }
  }
}
</script>
