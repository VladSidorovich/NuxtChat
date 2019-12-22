<template>
  <v-container>
    <v-layout column justify-center align-center>
      <v-flex xs12 md8>
        <v-card xs12 min-width="400px">
          <v-card-title>
            <h2>Nuxt чат</h2>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Ваше имя"
              required
            ></v-text-field>

            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Введите комнату"
              required
            ></v-text-field>

              <v-btn
                :disabled="!valid"
                color="primary"
                @click="submit"
              >
                Войти
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    head: {
      title: 'Добро пожаловать в Nuxt-чат'
    },
    layout: 'empty',
    sockets: {
      connect() {
        console.log('client io connected')
      }
    },
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Введите имя',
        v => (v && v.length <= 16) || 'Имя не должно превышать 16 символов',
      ],
      room: '',
      roomRules: [
        v => !!v || 'Введите комнату',
      ],
    }),

    methods: {
      ...mapMutations(['setUser']),
      submit() {
        if (this.$refs.form.validate()) {
          const user = {
            name: this.name,
            room: this.room
          }
          this.setUser(user)
          this.$router.push('/chat')
        }
      }
    },
  }
</script>
