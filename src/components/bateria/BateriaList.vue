<template>
  <div class="bateria-list">
    <div class="layout-padding">
      <h2>Baterias</h2>
      <button class="orange push circular add-bateria" @click="$router.push({path: '/bateria/add'})">
        <i>note_add</i>
        <q-tooltip>
          Cadastrar bateria
        </q-tooltip>
      </button>
      <div class="list baterias-content" v-for="(bateria, index) in baterias" v-if="baterias.length > 0">
        <div class="item multiple-lines has-secondary">
          <div class="item-content">
            <div>Data: {{ bateria['.key'] | data }}</div>
            <div>Hora: {{ bateria['.key'] | hora }}</div>
          </div>
          <div class="item-secondary">
            <i slot="target">
              more_vert

              <q-popover ref="popover">
                <div class="list">
                  <div class="item item-link" @click="$refs.popover[index].close(), $router.push({ path: '/bateria/view/' + bateria['.key'] })">
                    <div class="item-content">Detalhar</div>
                  </div>
                </div>
              </q-popover>
            </i>
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
import Moment from 'moment'

export default {
  name: 'bateria-list',
  filters: {
    data (value) {
      return Moment(value, 'YYYYMMDDHHmmss').format('DD/MM/YYYY')
    },
    hora (value) {
      return Moment(value, 'YYYYMMDDHHmmss').format('HH:mm')
    }
  },
  firebase () {
    return {
      baterias: Database.getBaterias().orderByKey()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  text-align: center;
}

.add-bateria {
  margin-bottom: 20px;
}

.list.baterias-content {
  margin: 0 auto;
}
</style>
