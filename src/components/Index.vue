<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <button class="hide-on-drawer-visible" @click="$refs.drawer.open()">
        <i>menu</i>
      </button>
      <q-toolbar-title :padding="0">
        {{ title }}
      </q-toolbar-title>
    </div>

    <q-drawer ref="drawer">
      <div class="toolbar" style="background-color: white;">
        <q-toolbar-title>
          <img src="../assets/img/kart-menu.png" width="200" height="200" alt="">
        </q-toolbar-title>
      </div>

      <hr>

      <div class="list no-border platform-delimiter">
        <q-drawer-link icon="home" :to="{path: '/bateria', exact: true}">
          Baterias
        </q-drawer-link>
        <q-drawer-link icon="settings" :to="{path: '/filtros', exact: true}">
          Filtros
        </q-drawer-link>
        <q-drawer-link icon="exit_to_app" :to="{path: '', exact: true}">
          Sair
        </q-drawer-link>
      </div>
    </q-drawer>

    <router-view class="layout-view">"</router-view>
    
  </q-layout>
</template>

<script>
import Auth from '../auth'

export default {
  name: 'index',
  data () {
    return {
      title: 'Kart Ranking - PRODAM'
    }
  },
  methods: {
    logOut () {
      Auth.signOut()
    }
  }
}
</script>

<style>
</style>
