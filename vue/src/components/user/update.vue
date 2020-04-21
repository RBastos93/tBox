<template>
  <div class="updateUser">
    <b-card-group column>
      <b-card>
        <template v-slot:header>
          <b-row>
            <b-col sm="12" class="align-items-end">
              <h6 class="mb-0">Atualizar perfil</h6>
            </b-col>
          </b-row>
        </template>
        <b-card-body>
          <b-form @submit="updateUser">
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
                  label="Sobrenome"
                  label-for="lastName"
                >
                  <b-form-input
                    id="lastName"
                    v-model="lastName"
                    type="text"
                    required
                  >
                  </b-form-input>
                  <b-form-invalid-feedback id="lastName-feedback"></b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-form-group
                  label="Email"
                  label-for="email"
                >
                  <b-form-input
                    id="email"
                    v-model="email"
                    type="email"
                    required
                  >
                  </b-form-input>
                  <b-form-invalid-feedback id="email-feedback"></b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-form-group
                  label="Senha atual"
                  label-for="currentPassword"
                >
                  <b-form-input
                    id="currentPassword"
                    v-model="currentPassword"
                    type="password"
                    required
                  >
                  </b-form-input>
                  <b-form-invalid-feedback id="email-feedback"></b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-form-group
                  label="Nova senha"
                  label-for="password"
                >
                  <b-form-input
                    id="password"
                    v-model="password"
                    type="password"
                    required
                  >
                  </b-form-input>
                  <b-form-invalid-feedback id="password-feedback"></b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-form-group
                  label="Confirmação de senha"
                  label-for="passwordConfirmation"
                >
                  <b-form-input
                    id="passwordConfirmation"
                    v-model="passwordConfirmation"
                    type="password"
                    required
                  >
                  </b-form-input>
                  <b-form-invalid-feedback id="passwordConfirmation-feedback"></b-form-invalid-feedback>
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
                  v-on:click="() => this.$router.push({ path: '/home' })"
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
import invalid from '../../services/invalidFeedback';

export default {
  name: 'UpdateUser',
  data() {
    return {
      name: null,
      lastName: null,
      email: null,
      currentPassword: null,
      password: null,
      passwordConfirmation: null,
      userId: null,
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    updateUser(event) {
      const payload = {
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        currentPassword: this.currentPassword,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
      };

      this.api.put(`/user/${this.userId}`, payload)
        .then(() => {
          this.$router.push({ path: '/home' });
        })
        .catch((error) => {
          invalid(error.response.data);
        });

      event.preventDefault();
    },
    getUser() {
      this.userId = this.$route.params.userId;

      this.api.get(`/user/${this.userId}`)
        .then((response) => {
          const { name, lastName, email } = response.data.data;

          this.name = name;
          this.lastName = lastName;
          this.email = email;
        })
        .catch((error) => {
          invalid(error.response.data);
        });
    },
  },
};
</script>
