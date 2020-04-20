<template>
  <div class="updateProduct">
    <form @submit="updateProduct">
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
        <button>Atualizar</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UpdateProduct',
  data() {
    return {
      name: null,
      price: null,
      quantity: null,
      productId: null,
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    updateProduct(event) {
      const payload = {
        name: this.name,
        price: this.price,
        quantity: this.quantity,
      };

      this.api.put(`/product/${this.productId}`, payload)
        .then(() => {
          this.$router.go(-1);
        })
        .catch((error) => {
          console.log(error.response);
        });

      event.preventDefault();
    },
    getProduct() {
      this.productId = this.$route.params.productId;

      this.api.get(`/product/${this.productId}`)
        .then((response) => {
          const { name, quantity, price } = response.data.data;

          this.name = name;
          this.price = price;
          this.quantity = quantity;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
};
</script>
