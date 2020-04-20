<template>
  <div class="login">
    <div class="container">
      <form class="content" @submit="authenticate">
        <div class="card">
          <div class="card-header">
            <h1>Seja bem-vindo</h1>
          </div>
          <div class="card-body">
            <div class="form-group">
              <div class="row">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  placeholder="E-mail"
                  v-model="email"
                  required
                >
              </div>
              <div class="row">
                <label for="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  placeholder="Senha"
                  v-model="password"
                  required
                >
              </div>
            </div>
            <button class="btn btn-gradient">Continuar</button>
          </div>
          <div class="card-footer">
            <span>
              Não tem cadastro?
              <router-link to="/user/new" class="link">Cadastre-se</router-link>
            </span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    authenticate(event) {
      this.api.post('/auth', {
        email: this.email,
        password: this.password,
      }).then((response) => {
        localStorage.setItem('token', response.data.token);
        this.$router.push({ path: 'home' });
      }).catch((error) => {
        console.log(error.response);
      });

      event.preventDefault();
    },
  },
};
</script>

<style scoped>
.login{
  height: 100%;
}

.card * {
  box-sizing: border-box;
  font-family: sans-serif;
  display: flex;
  width: auto;
  height: auto;
  /* flex-flow: column nowrap; */
}

.card {
  background-color: #ffff;
  box-shadow: 2px 2px 6px 0 rgba(0,0,0,0.2);
  overflow: hidden;
  border-radius: 16px;
  margin: auto;
  height: 100%;
  width: 100%;
  padding: 20px 40px;
}

.card-header {
  padding: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  flex-flow: column nowrap;
  align-items: center;
}

.card-body {
  flex-flow: column nowrap;
  margin-top: 30px;
  margin-bottom: 20px;
}

.card-footer {
  margin-top: 30px;
  justify-content: center;
  flex-direction: row;
}

.card-footer span {
  flex-direction: row;
}

.form-group {
  flex-direction: column;
  flex-grow: 1;
}

.row {
  flex-direction: column;
}

.link {
  text-decoration: none;
  cursor: pointer;
  margin-left: 5px;
}

button {
  margin-top: 30px;
}

label {
  color: #ddd;
}

input.form-control {
  border: none;
  border-bottom: 1px solid #ddd;
  padding: 0 5px 5px 5px;
  font-size: 14px;
}

input:focus {
  border-image-source: linear-gradient(to right, #24d1f8, #b725ff);
  border-bottom: 1.5px solid;
  border-image-slice: 1;
}

input:focus::placeholder {
  color: transparent;
}

.btn-gradient {
  background: linear-gradient(to right, #21d1f8, #b725ff);
  border: none;
  border-radius: 20px;
}
</style>
