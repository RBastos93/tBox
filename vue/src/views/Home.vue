<template>
  <div class="home">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand to="/home">NavBar</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item
              v-on:click="() => this.$router.push({ path: '/product' })"
            >
              Produtos
            </b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template v-slot:button-content>
                <em>{{ user }} </em>
              </template>
              <b-dropdown-item
                v-on:click="() => this.$router.push({ path: `/user/${this.userId}/edit` })"
              >
                Perfil
              </b-dropdown-item>
              <b-dropdown-item v-on:click="signOut">Sair</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div>
      <b-card>
        <b-card-body>
          <b-row class="justify-content-md-center">
            <b-col sm=10>
              <router-view></router-view>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      userId: null,
      user: null,
    };
  },
  mounted() {
    this.userId = localStorage.getItem('id');
    this.user = localStorage.getItem('name');
  },
  methods: {
    signOut() {
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      this.$router.push({ path: '/login' });
    },
  },
};
</script>
<style scoped>

</style>
