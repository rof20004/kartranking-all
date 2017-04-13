<template>
  <div class="login">
    <div class="layout-padding">
      <div class="card">
          <div class="card-title bg-primary text-white">
              <h5>Kart Ranking Login</h5>
          </div>

          <h6 class="card-title text-muted">Sistema de Rankeamento</h6>

          <div class="card-content">
              <form novalidate @submit.stop.prevent="login">
                <div class="floating-label">
                  <input id="email" type="text" class="full-width" v-model="email" :disabled="loading" required/>
                  <label for="email">E-mail</label>
                </div>
                <div class="floating-label">
                  <input id="password" type="password" class="full-width" v-model="password" :disabled="loading" required/>
                  <label for="password">Password</label>
                </div>
                <div class="card-actions">
                  <button type="submit" class="primary full-width" :disabled="loading">
                    <span v-if="!loading">Entrar</span>
                    <span v-if="loading" ><img src="../assets/img/ripple.svg" width="30"></span>
                  </button>
                </div>
              </form>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '../auth'
import toastr from 'toastr'

toastr.options.positionClass = 'toast-bottom-center'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      loading: false
    }
  },
  methods: {
    login () {
      this.loading = true
      Auth.signInWithEmailAndPassword(this.email, this.password).then((user) => {
        toastr.success('Autenticado com sucesso')
      }).catch((error) => {
        toastr.error(error.message)
        this.loading = false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 345px;
  margin: 60px auto;
}

.card-header {
    text-align: center
}

.card-title {
    text-align: center
}

.card-actions {
  padding: 22px 0;
}
</style>
