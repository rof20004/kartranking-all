<template>
  <div class="bateria-add">
    <div class="layout-padding">
      <h2>Cadastrar Bateria</h2>
      <button class="primary push circular back-list" @click="$router.go(-1)">
        <i>subdirectory_arrow_left</i>
        <q-tooltip>
          Voltar para listagem
        </q-tooltip>
      </button>
      <div class="card">
        <div class="card-content">
            <form novalidate @submit.stop.prevent="add">
              <div class="floating-label">
                <input type="text" v-model="bateria.dataHora" required/>
                <label>Data do Evento</label>
              </div>
              <div class="card-actions">
                <button type="button" class="primary small" @click="openDialogFormParticipante">Inserir Participante</button>
                <button type="button" class="primary clear small" :disabled="!isValid" @click="add">Finalizar Cadastro</button>
              </div>
            </form>
        </div>
      </div>
      <div class="list baterias-content" v-for="(participante, index) in participantes" v-if="participantes.length > 0">
        <div class="item multiple-lines">
          <div class="item-content">
            <div class="dados-bateria">Posição: <span class="valor-dados-bateria">{{ participante.pos }}</span></div>
            <div class="dados-bateria">Número do kart: <span class="valor-dados-bateria">{{ participante.kart }}</span></div>
            <div class="dados-bateria">Participante: <span class="valor-dados-bateria">{{ participante.nome }}</span></div>
            <div class="dados-bateria">Diferença para o próximo: <span class="valor-dados-bateria">{{ participante.da }}</span></div>
            <div class="dados-bateria">Diferença para o líder: <span class="valor-dados-bateria">{{ participante.dl }}</span></div>
            <div class="dados-bateria">Tempo da melhor volta: <span class="valor-dados-bateria">{{ participante.tmv }}</span></div>
            <div class="dados-bateria">Tempo total: <span class="valor-dados-bateria">{{ participante.tt }}</span></div>
            <div class="dados-bateria">Total de voltas: <span class="valor-dados-bateria">{{ participante.tv }}</span></div>
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
import toastr from 'toastr'
import { Dialog } from 'quasar'

export default {
  name: 'bateria-add',
  data () {
    return {
      title: 'Cadastrar Bateria',
      bateria: {
        dataHora: ''
      },
      participante: {
        nome: '',
        da: '',
        dl: '',
        kart: '',
        pos: '',
        tmv: '',
        tt: '',
        tv: ''
      },
      participantes: []
    }
  },
  computed: {
    validation () {
      return {
        dataHora: !!this.bateria.dataHora.trim() && this.bateria.dataHora.trim().length === 12
      }
    },
    isValid () {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    },
    validationParticipante () {
      return {
        nome: !!this.participante.nome.trim(),
        kart: !!this.participante.kart.trim(),
        pos: !!this.participante.pos.trim(),
        tmv: !!this.participante.tmv.trim(),
        tt: !!this.participante.tt.trim(),
        tv: !!this.participante.tv.trim()
      }
    },
    isValidParticipante () {
      var validation = this.validationParticipante
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  methods: {
    add () {
      if (this.isValid) {
        if (this.participantes.length !== 0) {
          let saveRef = Database.getBaterias().child(this.bateria.dataHora)
          this.participantes.forEach((participante) => {
            let p = this.deepCopy(participante)
            let key = p.nome
            delete p.nome
            saveRef.child(key).set(p)
          })
        } else {
          Database.getBaterias().child(this.bateria.dataHora).set(true)
        }

        /**
         * Atualização do Ranking
         */
        let rankingRef = Database.getRankings()
        this.participantes.forEach((participante) => {
          let time = participante.tmv.split(':')
          let scoreInSeconds = 0
          if (time.length === 3) {
            scoreInSeconds = parseFloat(time[2]) + parseInt(time[1]) * 60 + parseInt(time[0]) * 3600
          }
          rankingRef.child(participante.nome).set({ 'score': scoreInSeconds, 'tmv': participante.tmv })
        })

        toastr.success('Bateria cadastrada com sucesso')

        this.bateria.dataHora = ''
        this.participantes = []
      }
    },
    addParticipante (data) {
      let participante = data
      this.participantes.push(participante)
      toastr.success('Participante cadastrado com sucesso')
      this.clearParticipanteForm()
    },
    clearParticipanteForm () {
      this.participante.nome = ''
      this.participante.da = ''
      this.participante.dl = ''
      this.participante.kart = ''
      this.participante.pos = ''
      this.participante.tmv = ''
      this.participante.tt = ''
      this.participante.tv = ''
    },
    deepCopy (oldObj) {
      var newObj = oldObj
      if (oldObj && typeof oldObj === 'object') {
        newObj = Object.prototype.toString.call(oldObj) === '[object Array]' ? [] : {}
        for (var i in oldObj) {
          newObj[i] = this.deepCopy(oldObj[i])
        }
      }
      return newObj
    },
    openDialogFormParticipante () {
      let vm = this
      Dialog.create({
        title: 'Cadastrar Participante',
        form: {
          nome: {
            type: 'textbox',
            label: 'Nome',
            model: ''
          },
          da: {
            type: 'textbox',
            label: 'DA',
            model: ''
          },
          dl: {
            type: 'textbox',
            label: 'DL',
            model: ''
          },
          kart: {
            type: 'textbox',
            label: 'Kart',
            model: ''
          },
          pos: {
            type: 'textbox',
            label: 'Posição',
            model: ''
          },
          tmv: {
            type: 'textbox',
            label: 'Tempo da Melhor Volta',
            model: ''
          },
          tt: {
            type: 'textbox',
            label: 'Tempo Total',
            model: ''
          },
          tv: {
            type: 'textbox',
            label: 'Total de Voltas',
            model: ''
          }
        },
        buttons: [
          'Cancelar',
          {
            label: 'Confirmar',
            preventClose: true,
            handler (data) {
              let participante = vm.deepCopy(data)
              vm.addParticipante(participante)
            }
          }
        ]
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  text-align: center;
}

.sem-participantes {
  margin-top: 100px;
}

.back-list {
  margin-bottom: 20px;
}

.card-actions {
  padding: 22px 0;
}

.dados-bateria {
  padding: 5px;
}

.valor-dados-bateria {
  color: blue !important;
  font-style: italic;
}
</style>
