<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
      disable-route-watcher disable-resize-watcher
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />
   

    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer
      fixed
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      fixed: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
