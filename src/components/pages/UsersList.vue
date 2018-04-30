<template>

<section id="list-users">
  <div class="form-group">
    <label for="name">Filtrar por nome</label>
    <input v-on:keyup="search" v-model="name" type="text" class="form-control" id="name" name="name" placeholder="Ex: Joao da Silva; joao; silva" maxlength="255" required>
  </div>
  <table id="users" class="table table-hover table-striped">
    <thead>
      <tr>
        <th>Nome</th>
        <th>E-mail</th>
        <th>Descrição</th>
        <th>Status</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in filter" :key="user.index">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td v-if="user.type === 'STD'">Aluno(a)</td>
        <td v-if="user.type === 'TCR'">Professor(a)</td>
        <td v-if="user.type === 'CDR'">Coordenador(a)</td>
        <td v-if="user.status === '1'">Ativo(a)</td>
        <td v-else>Inativo(a)</td>
        <td><router-link :to="'/usuarios/listar/' + user.id" class="btn btn-success">Visualizar</router-link></td>
        <td><router-link :to="'/usuarios/contato/' + user.id" class="btn btn-info">Contatar</router-link></td>
      </tr>
    </tbody>
  </table>
  <div class="container">
    <b-pagination v-on:input="pagination" size="md" :total-rows="rows" v-model="currentPage" :per-page="10"></b-pagination>
  </div>

</section>

</template>

<script>
export default {
  name: 'UsersList',
  data () {
    return {
      name: '',
      filter: [],
      users: [],
      query: {
        limit: 10,
        offset: 0,
        order: null
      },
      currentPage: 1,
      rows: 0
    }
  },
  methods: {
    pagination: function () {
      this.query.offset = this.currentPage - 1
      this.query.offset = this.query.offset.toString() + '0'
      this.getUsers()
    },
    search: function () {
      this.filter = []

      for (let user of this.users) {
        if (user.name.toLowerCase().indexOf(this.name.toLowerCase()) !== -1 && this.name !== '') {
          this.filter.push(user)
        } else if (this.name === '' || this.name === null || this.name === 'undefined') {
          this.pagination()
        }
      }
    },
    getUsers: function () {
      this.$usersService.listAll(this.$helpers.pagination(this.query))
        .then(response => {
          if (response.status === 200) {
            this.filter = response.data.results
            this.users = response.data.results
            this.rows = response.data.metadata.size
            localStorage.setItem('access_token', response.headers.authorization.replace('Bearer ', ''))
          }
        }).catch(error => {
          switch (error.response.status) {
            case 401:
              if (error.response.data.message === 'Expired token') {
                sessionStorage.message = 'Sessão expirada'
                try {
                  var data = this.$jwt.decode(localStorage.getItem('access_token')).data
                } catch (err) {
                  this.$router.push('/logout')
                }
                this.$usersService.timeout(data.id_log)
                  .then(response => {
                    if (response.status === 204) {
                      console.log('ok')
                    }
                  }).catch(error => {
                    if (error.response.status === 500) {
                      console.log('Error in server')
                    }
                  })
              } else {
                sessionStorage.message = 'Erro interno. Faça login novamente'
              }
              this.$router.push('/logout')
              break
            case 403:
              break
            case 404:
              this.$router.push('/usuarios/listar')
              break
            case 500:
              break
          }
        })
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.getUsers()
    })
  }
}
</script>

<style>

section#list-users{
  padding: 3%;
}

input#name{
  width: 300px;
}

</style>
