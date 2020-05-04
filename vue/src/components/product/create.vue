<template>
  <div class="createProduct">
    <b-card-group column>
      <b-card>
        <template v-slot:header>
          <b-row>
            <b-col sm="12" class="align-items-end">
              <h6 class="mb-0">Registrar produto</h6>
            </b-col>
          </b-row>
        </template>
        <b-card-body>
          <b-form @submit="createProduct">
            <b-row>
              <b-col sm="12">
                <b-form-group
                  label="Nome"
                  label-for="name"
                >
                  <b-form-input
                    id="name"
                    v-model="name"
                    type="text"
                    required
                  >
                  </b-form-input>
                  <b-form-invalid-feedback id="name-feedback"></b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-form-group
                  label="Preço"
                  label-for="price"
                >
                  <b-input-group prepend="R$">
                    <b-form-input
                      id="price"
                      v-model="price"
                      v-money="money"
                      type="text"
                      required
                    >
                    </b-form-input>
                    <b-form-invalid-feedback id="price-feedback"></b-form-invalid-feedback>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-form-group
                  label="Quantidade"
                  label-for="quantity"
                >
                  <b-input-group append="un">
                    <b-form-input
                      id="quantity"
                      v-model="quantity"
                      type="number"
                      required
                    >
                    </b-form-input>
                    <b-form-invalid-feedback id="quantity-feedback"></b-form-invalid-feedback>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="4">
                <b-button type="submit" block variant="primary">Criar</b-button>
              </b-col>
              <b-col sm="4">
                <b-button
                  block
                  variant="danger"
                  v-on:click="() => this.$router.push({ path: '/product' })"
                >
                  Voltar
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-card-body>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { maskMoney, removeChars } from '../../helpers/helpers';
import invalid from '../../services/invalidFeedback';

export default {
  name: 'CreateProduct',
  data() {
    return {
      name: null,
      price: null,
      quantity: null,
      money: maskMoney,
    };
  },
  methods: {
    createProduct(event) {
      const regex = /\.|,/g;
      const replaceChars = {
        ',': '.',
        '.': '',
      };

      const payload = {
        name: this.name,
        price: removeChars(this.price, replaceChars, regex),
        quantity: this.quantity,
      };

      this.api.post('/product', payload)
        .then(() => {
          this.$router.push({ path: '/product' });
        })
        .catch((error) => {
          invalid(error.response.data);
        });

      event.preventDefault();
    },
  },
};
</script>
