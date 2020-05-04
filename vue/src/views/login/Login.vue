<template>
  <div class="login">
    <div class="container">
      <form class="content" @submit="authenticate">
        <div class="card">
          <div class="card-header">
            <h1>Seja bem-vindo</h1>
          </div>
          <div class="card-body">
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
                  label="Senha"
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
import invalid from '../../services/invalidFeedback';

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
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('name', response.data.name);

        this.$router.push({ path: 'home' });
      }).catch((error) => {
        invalid(error.response.data);
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

.container {
  margin: auto;
  max-width: 500px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  padding: 30px;
}

p {
  font-size: 22px;
  line-height: 30px;
  margin-bottom: 30px;
}

form {
  display: flex;
  flex-direction: column;
}

form label {
  font-size: 14px;
  color: #444;
  font-weight: bold;
  margin-bottom: 8px;
}

form label span {
  font-weight: normal;
  color: #999;
  font-size: 12px;
}

form input {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 2px;
  height: 45px;
  padding: 0 15px;
  font-size: 16px;
}

.btn {
  border: none;
  border-radius: 2px;
  width: 100%;
  height: 40px;
  justify-content: center;
  padding: 10px;
  font-size: 16px;
  background: #f05a5b;
  font-weight: bold;
  color: #FFF;
  cursor: pointer;
}

.card * {
  box-sizing: border-box;
  font-family: sans-serif;
  display: flex;
  position: relative;
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
  flex-flow: column nowrap;
  align-items: center;
  background: none;
  border-bottom: none;
}

.card-body {
  flex-flow: column nowrap;
}

.card-footer {
  justify-content: center;
  flex-direction: row;
  background: none;
  border-top: none;
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
