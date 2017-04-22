<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <button class="hide-on-drawer-visible" @click="$refs.drawer.open()">
        <i>menu</i>
      </button>
      <q-toolbar-title :padding="0">
        {{ title }}
      </q-toolbar-title>
      <button @click="logOut">
        <i>exit_to_app</i>
        Sair
      </button>
    </div>

    <q-drawer ref="drawer">
      <div class="toolbar" style="background-color: white;">
        <q-toolbar-title>
          <img src="../assets/img/kart-menu.png" width="200" height="200" alt="">
        </q-toolbar-title>
      </div>

      <hr>

      <div class="list no-border platform-delimiter">
        <q-drawer-link icon="edit_location" :to="{path: '/bateria', exact: true}">
          Baterias
        </q-drawer-link>
        <q-drawer-link icon="apps" :to="{path: '/ranking', exact: true}">
          Ranking
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
