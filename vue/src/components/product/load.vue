<template>
  <div class="product">
    <div>
      <input
        type="text"
        id="product"
        class="form-control"
        placeholder="Produto"
        v-on:keyup="search"
        v-model="product"
      >
      <h1>{{ product }}</h1>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" v-bind:key="item._id">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.quantity }}</td>
            <td>
              <router-link :to="`product/${item._id}/edit`" class="link">editar</router-link>
            </td>
            <td><button v-on:click="deleteProduct(item._id)">Deletar</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import helpers from '../../helpers/helpers';

export default {
  name: 'Product',
  data() {
    return {
      product: null,
      data: [],
    };
  },
  methods: {
    search() {
      const { debounce } = helpers;

      debounce(this.loadProducts, 500);
    },
    loadProducts() {
      this.api.get(`/product?q=${this.product}`)
        .then((response) => {
          const { data } = response.data;

          this.data = [...data];
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    deleteProduct(id) {
      this.api.delete(`/product/${id}`)
        .then((response) => {
          console.log(response);
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
