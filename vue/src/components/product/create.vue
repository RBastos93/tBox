<template>
  <div class="createProduct">
    <form @submit="createProduct">
      <div>
        <input
          type="text"
          id="name"
          class="form-control"
          placeholder="Nome"
          v-model="name"
        >
      </div>
      <div>
        <input
          type="text"
          id="price"
          class="form-control"
          placeholder="Preço"
          v-model="price"
        >
      </div>
      <div>
        <input
          type="text"
          id="quantity"
          class="form-control"
          placeholder="Quantidade"
          v-model="quantity"
        >
      </div>
      <div>
        <button>Criar</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateProduct',
  data() {
    return {
      name: null,
      price: null,
      quantity: null,
    };
  },
  methods: {
    createProduct(event) {
      const payload = {
        name: this.name,
        price: this.price,
        quantity: this.quantity,
      };

      this.api.post('/product', payload)
        .then(() => {
          this.$router.push({ path: '/product' });
        })
        .catch((error) => {
          console.log(error.response);
        });

      event.preventDefault();
    },
  },
};
</script>
