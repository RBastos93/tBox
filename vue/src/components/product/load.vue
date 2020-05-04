<template>
  <div class="product">
    <b-card-group>
      <b-card>
        <template v-slot:header>
          <b-row>
            <b-col sm="12" class="align-items-end">
              <h6 class="mb-0">Lista de produtos</h6>
            </b-col>
          </b-row>
        </template>
        <b-card-body>
          <b-row>
            <b-col sm="6">
              <b-form-group
                label-for="search"
              >
                <b-input-group>
                  <b-form-input
                    v-model="filter"
                    type="text"
                    id="search"
                    v-on:keyup="search"
                    placeholder="Procure pelo nome.."
                  >
                  </b-form-input>
                  <b-input-group-append>
                    <b-button :disabled="!filter" v-on:click="clear">Limpar</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col offset-sm="4" sm="2">
              <b-button variant="primary" to="/product/new">
                <b-icon icon="plus" class="align-end"></b-icon>
              </b-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-table-simple hover>
                <b-thead>
                  <b-tr>
                    <b-th>Nome</b-th>
                    <b-th>Preço</b-th>
                    <b-th>Quantidade</b-th>
                    <b-th colspan="2">Ações</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="item in items" v-bind:key="item._id">
                    <b-td>{{ item.name }}</b-td>
                    <b-td>{{ item.price }}</b-td>
                    <b-td>{{ item.quantity }}</b-td>
                    <b-td>
                      <b-button
                        variant="warning"
                        :to="`/product/${item._id}/edit`"
                      >
                        <b-icon icon="pencil"></b-icon>
                      </b-button>
                    </b-td>
                    <b-td>
                      <b-button variant="danger" v-on:click="deleteProduct(item._id)">
                        <b-icon icon="trash"></b-icon>
                      </b-button>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { debounce } from '../../helpers/helpers';

export default {
  name: 'Product',
  data() {
    return {
      filter: '',
      fields: ['Nome', 'Preço', 'Quantidade'],
      items: [],
    };
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
    clear() {
      this.filter = '';

      this.loadProducts();
    },
    search() {
      debounce(this.loadProducts, 500);
    },
    loadProducts() {
      this.api.get(`/product?q=${this.filter}`)
        .then((response) => {
          const { data } = response.data;

          this.items = [...data];
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    deleteProduct(id) {
      this.api.delete(`/product/${id}`)
        .then(() => {
          this.loadProducts();
        })
        .catch((error) => {
          console.log('error', error);
        });
    },
  },
};
</script>

<style scoped>

</style>
