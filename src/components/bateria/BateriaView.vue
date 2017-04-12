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
            <div class="dados-bateria">Posição: <span class="valor-dados-bateria">{{ bateria.pos }}</span></div>
            <div class="dados-bateria">Número do kart: <span class="valor-dados-bateria">{{ bateria.kart }}</span></div>
            <div class="dados-bateria">Participante: <span class="valor-dados-bateria">{{ bateria['.key'] }}</span></div>
            <div class="dados-bateria">Diferença para o próximo: <span class="valor-dados-bateria">{{ bateria.da }}</span></div>
            <div class="dados-bateria">Diferença para o líder: <span class="valor-dados-bateria">{{ bateria.dl }}</span></div>
            <div class="dados-bateria">Tempo da melhor volta: <span class="valor-dados-bateria">{{ bateria.tmv }}</span></div>
            <div class="dados-bateria">Tempo total: <span class="valor-dados-bateria">{{ bateria.tt }}</span></div>
            <div class="dados-bateria">Total de voltas: <span class="valor-dados-bateria">{{ bateria.tv }}</span></div>
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
      baterias: Database.getBateriasByKey(this.$route.params.bateriaId).orderByChild('pos')
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

.dados-bateria {
  padding: 5px;
}

.valor-dados-bateria {
  color: blue !important;
  font-style: italic;
}
</style>
