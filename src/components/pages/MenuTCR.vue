<template>
<section id="menu" class="container">
  <h2>Olá, seja bem vindo <em>{{ name }}</em></h2>
  <div class="card-deck">
    <div class="card border-primary mb-3" style="max-width: 18rem;">
      <div class="card-header">
        <p>Usuários cadastrados</p>
        <i class="fas fa-users fa-2x"></i>
      </div>
      <div class="card-body text-primary">
        <p class="card-text">
          {{ metadata.countUsers }}
        </p>
      </div>
    </div>
    <div class="card border-primary mb-3" style="max-width: 18rem;">
      <div class="card-header">
        <p>Árvores cadastradas</p>
        <i class="fas fa-tree fa-2x"></i>
      </div>
      <div class="card-body text-primary">
        <p class="card-text">
          {{ metadata.countTrees }}
        </p>
      </div>
    </div>
    <div class="card border-primary mb-3" style="max-width: 18rem;">
      <div class="card-header">
        <p>Árvores verificadas</p>
        <i class="fas fa-tree fa-2x"></i>
        <i class="fas fa-check-circle fa-lg"></i>
      </div>
      <div class="card-body text-primary">
        <p class="card-text">
          {{ metadata.countTreesValidated }}
        </p>
      </div>
    </div>
  </div>

  <router-link to="/logout" class="btn btn-info float-right">Logout <i class="fas fa-sign-out-alt"></i></router-link>
  <div class="dashboard container">
    <router-link to="/arvores/cadastro" class="btn btn-info">Cadastro de Árvores</router-link>
    <router-link to="/usuarios/listar" class="btn btn-info">Procurar usuários</router-link>
    <router-link to="/arvores/listar" class="btn btn-info">Visualizar Árvores</router-link>
    <router-link to="/my/arvores/listar" class="btn btn-info">Minhas Árvores</router-link>
    <router-link :to="'/usuarios/editar/' + id" class="btn btn-info">Editar informações</router-link>
    <button @click="show" class="btn btn-danger">Deletar perfil</button>
    <!-- Dialog to confirm user deletion -->
    <v-dialog/>
  </div>
</section>
</template>

<script>
export default {
  name: 'MenuTCR',
  data () {
    return {
      id: null,
      name: '',
      metadata: {
        countUsers: 0,
        countTrees: 0,
        countTreesValidated: 0
      }
    }
  },
  methods: {
    deleteAccount () {
      this.$usersService.exclude(this.id)
        .then(response => {
          if (response.status === 204) {
            this.$router.push({path: '/'})
          }
        }).catch(error => {
          console.log(error.response)
          switch (error.response.status) {
            case 400:
              break
            case 401:
              break
            case 403:
              break
            case 404:
              break
            case 500:
              break
          }
        })
    },
    show () {
      this.$modal.show('dialog', {
        title: 'Exclusão de usuário',
        text: 'Tem certeza que deseja excluír permanentemente esta conta?',
        buttons: [
          {
            title: 'SIM, EXCLUIR',
            handler: () => { this.deleteAccount() }
          },
          {
            title: 'CANCELAR'
          }
        ]
      })
    }
  },
  mounted () {
    this.$nextTick(function () {
      try {
        var data = this.$jwt.decode(localStorage.getItem('access_token')).data
      } catch (err) {
        console.log('error in load home page')
        this.$router.push('/')
      }

      this.id = data.id
      this.name = data.name

      this.$usersService.info()
        .then(response => {
          if (response.status === 204) {
            this.metadata.countUsers = response.headers['x-total-count']
          }
        }).catch(error => {
          switch (error.response.status) {
            case 401:
              break
            case 403:
              break
            case 500:
              break
          }
        })

      this.$treesService.info()
        .then(response => {
          if (response.status === 204) {
            this.metadata.countTrees = response.headers['x-total-count']
            this.metadata.countTreesValidated = response.headers['x-total-count-validated']
          }
        }).catch(error => {
          switch (error.response.status) {
            case 401:
              break
            case 403:
              break
            case 500:
              break
          }
        })
    })
  }
}
</script>

<style scoped>
.btn{
  text-transform: uppercase;
  margin: 2%;
}

h2{
  padding: 3%;
  color: #646b66;
}

/* cards */
.card{
  margin: auto!important;
  color: #0b5121;
  transition: 200ms ease;
}

.border-primary{
  border: 1px solid #1fe0a3!important;
}

.card-header{
  text-align: center;
  font-size: 22px;
}

.card-text{
  font-size: 56px;
  text-align: center;
}

/* icons in cards */
.fa-tree{
  color: #2db757;
}

</style>
