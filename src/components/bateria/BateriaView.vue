<template>
  <div class="bateria-details">
    <div class="layout-padding">
      <h2>Rank da Bateria</h2>
      <button class="primary push circular back-list" @click="$router.go(-1)">
        <i>subdirectory_arrow_left</i>
        <q-tooltip>
          Voltar para listagem
        </q-tooltip>
      </button>
      <div class="list baterias-content" v-for="(bateria, index) in baterias" v-if="baterias.length > 0">
        <div class="item multiple-lines">
          <div class="item-content">
            <div class="row gutter sm-column">
              <div class="width-1of3 dados-bateria">POS: {{ bateria.pos }}</div>
              <div class="width-1of3 dados-bateria">KART: {{ bateria.kart }}</div>
              <div class="width-2of3 dados-bateria">Participante: {{ bateria['.key'] }}</div>
              <div class="width-1of3 dados-bateria">DA: {{ bateria.da }}</div>
            </div>
            <div class="row gutter sm-column">
              <div class="width-1of3 dados-bateria">DL: {{ bateria.dl }}</div>
              <div class="width-1of3 dados-bateria">TMV: {{ bateria.tmv }}</div>
              <div class="width-2of3 dados-bateria">TT: {{ bateria.tt }}</div>
              <div class="width-1of3 dados-bateria">TV: {{ bateria.tv }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        Sem Registros
      </div>
    </div>
  </div>
</template>

<script>
import Database from '../../database'

export default {
  name: 'bateria-details',
  firebase () {
    return {
      baterias: Database.getBateriasByKey(this.$route.params.bateriaId).orderByChild('pos').startAt(1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  text-align: center;
}

.back-list {
  margin-bottom: 30px;
}
</style>
