<template>
  <div class="createUser">
    <form @submit="createUser">
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
          id="lastName"
          class="form-control"
          placeholder="Sobrenome"
          v-model="lastName"
        >
      </div>
      <div>
        <input
          type="email"
          id="email"
          class="form-control"
          placeholder="Email"
          v-model="email"
        >
      </div>
      <div>
        <input
          type="password"
          id="password"
          class="form-control"
          placeholder="Senha"
          v-model="password"
        >
      </div>
      <div>
        <input
          type="password"
          id="passwordConfirmation"
          class="form-control"
          placeholder="Confirmação de senha"
          v-model="passwordConfirmation"
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
  name: 'CreateUser',
  data() {
    return {
      name: null,
      lastName: null,
      email: null,
      password: null,
      passwordConfirmation: null,
    };
  },
  methods: {
    createUser(event) {
      const payload = {
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
      };

      this.api.post('/user', payload)
        .then(() => {
          this.$router.push({ path: '/login' });
        })
        .catch((error) => {
          console.log(error.response);
        });

      event.preventDefault();
    },
  },
};
</script>
