<template>
  <v-navigation-drawer v-model="drawer" clipped fixed app disable-route-watcher disable-resize-watcher>
    <v-list>
      <v-list-item
      >
        <v-list-item-action>
          <v-icon></v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ['drawer'],
  items: [
    {
      icon: 'mdi-apps',
      title: 'Welcome',
      to: '/'
    },
  ],
  watch:{
    drawer() {
      console.log(this.drawer)
    }
  }
}
</script>
