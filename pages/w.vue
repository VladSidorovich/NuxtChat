<template>
  <v-carousel v-model="page">
    <v-carousel-item v-for="name in names" :key="name">
      <v-sheet dark height="100%" tile>
        <v-row align="center" justify="center" class="text" v-if="loading"> ЗАГРУЗКА </v-row>
        <v-row align="center" justify="center" class="text" v-else>{{ name }}</v-row>
        <v-row >
          <chart :infoForChart="infoForChart" class="chart-hystory" :key="name" @loaded="loading = false"/>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import chart from "./chart";

export default {
  data() {
    return {
      loading: true,
      page: this.$route.query.page | 0,
      infoForChart: [],
      items: [
        {
          labels: ["1", "2", "3", "4", "5", "6"],
          data: [1221, 119, 1223, 51, 12, 31]
        },
        {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          data: [11212, 1119, 11223, 115, 112, 311]
        },
        {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          data: [1112, 1119, 113, 511, 112, 113]
        },
        {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          data: [111112, 1111119, 3111, 115, 12, 3]
        },
        {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          data: [12, 19, 3, 5, 2, 3]
        }
      ],
      names: [
        "Все сообщения",
        "Системные сообщения",
        "Авторизация",
        "Количество выданных id токенов",
        "Количество выданных токенов доступов"
      ]
    };
  },
  computed: {
    getInfoForChart: function() {
      switch (this.page) {
        case 0:
          return this.items[this.page];
          break;

        case 1:
          return this.items[this.page];
          break;

        case 2:
          return this.items[this.page];
          break;

        case 3:
          return this.items[this.page];
          break;

        case 4:
          return this.items[this.page];
          break;

        case 5:
          return this.items[this.page];
          break;
      }
    }
  },
  mounted() {
    this.send()
  },
  watch: {
    page() {
      this.send()
    }
  },
  methods: {
    send() {
      this.infoForChart = this.getInfoForChart;
      this.$router.push({ path: 'w', query: { page: this.page } });
    }
  },
  components: {
    chart
  }
};
</script>

<style scoped>
.chart-hystory {
  max-width: 800px;
  margin: 0 auto;
}
.text {
  color: white; /* Цвет символа */
  font-size: 150%; /* Размер шрифта */
}
</style>
