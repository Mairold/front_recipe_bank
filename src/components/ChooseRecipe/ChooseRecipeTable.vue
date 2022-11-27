<template>
  <table class="table table-success table-striped">
    <ChooseRecipeTableHead/>
    <tbody>
    <tr>
      <th scope="row">*</th>
      <td>Supp</td>
      <td>Frikadellisupp</td>
      <td>0-15 min</td>
      <td>
        <button type="button" class="btn btn-light">Lisa menüüsse</button>
      </td>
    </tr>
    <tr>
      <th scope="row">*</th>
      <td>Praad</td>
      <td>Seapraad hapukapsaga</td>
      <td>2+ h</td>
      <td>
        <button type="button" class="btn btn-light">Lisa menüüsse</button>
      </td>
    </tr>
    <tr>
      <th scope="row">*</th>
      <td>Magustoit</td>
      <td>Õunakook</td>
      <td>1-2 h</td>
      <td>
        <button type="button" class="btn btn-light">Lisa menüüsse</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
import ChooseRecipeTableHead from "@/components/ChooseRecipe/ChooseRecipeTableHead";

export default {
  name: 'ChooseRecipeTable',
  components: {ChooseRecipeTableHead},
  data: function () {
    return {
      // todo: Tabelis on vaja esitada jrk nr, kategooria nimi, retsepti nimi ja ajakulu

    }
  },
}
</script>