<template>
  <div class="px-2">
    <v-text-field label="search" v-model="search"></v-text-field>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :options.sync="pagination"
      :server-items-length="totalDesserts"
      :loading="loading"
      class="elevation-4"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="text-xs-right">{{ props.item.iron }}</td>
      </template>
    </v-data-table>
    <pre>{{ pagination }}</pre>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      search: "",
      totalDesserts: 0,
      desserts: [],
      loading: true,
      pagination: {},
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" }
      ]
    };
  },
  watch: {
    params: {
      handler() {
        this.getDataFromApi().then(data => {
          console.log("GETDATA");
          this.desserts = data.items;
          this.totalDesserts = data.total;
        });
      },
      deep: true
    }
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.desserts = data.items;
      this.totalDesserts = data.total;
    });
  },

  computed: {
    params(nv) {
      return {
        ...this.pagination,
        query: this.search
      };
    }
  },

  methods: {
    getDataFromApi() {
      this.loading = true;
      return new Promise(async (resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;
        let search = this.search.trim().toLowerCase();

        let items = await this.getDesserts();

        if (search) {
          items = items.filter(item => {
            return Object.values(item)
              .join(",")
              .toLowerCase()
              .includes(search);
          });
        }

        if (this.pagination.sortBy) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy];
            const sortB = b[sortBy];

            if (descending) {
              if (sortA < sortB) return 1;
              if (sortA > sortB) return -1;
              return 0;
            } else {
              if (sortA < sortB) return -1;
              if (sortA > sortB) return 1;
              return 0;
            }
          });
        }

        if (rowsPerPage > 0) {
          items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage);
        }

        const total = items.length;

        setTimeout(() => {
          this.loading = false;
          resolve({
            items,
            total
          });
        }, 300);
      });
    },
   getDesserts() {
       return new Promise(async (resolve, reject) => {
         await axios.get('/getDesserts')
        .then(res => {
          console.log(res.data.res)
          resolve(res.data.res)
        })
        .catch(err => reject(err))
       })
    }
  }
};
</script>
