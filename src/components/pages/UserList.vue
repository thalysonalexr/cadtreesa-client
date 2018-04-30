<template>

<section id="list-user">
  <table class="table table-hover table-striped">
    <tbody>
      <tr>
        <td>Código</td>
        <td>{{ user.id }}</td>
      </tr>
      <tr>
        <td>Nome</td>
        <td>{{ user.name }}</td>
      </tr>
      <tr>
        <td>{{ user.rgacpf && user.rgacpf.length === 11? 'CPF': 'RGA' }}</td>
        <td>{{ user.rgacpf }}</td>
      </tr>
      <tr>
        <td>E-mail</td>
        <td>{{ user.email }}</td>
      </tr>
      <tr>
        <td>Descrição</td>
        <td v-if="user.type === 'STD'">Aluno(a)</td>
        <td v-if="user.type === 'TCR'">Professor(a)</td>
        <td v-if="user.type === 'CDR'">Coordenador(a)</td>
      </tr>
      <tr>
        <td>Status</td>
        <td>{{ user.status === '1'? 'Ativo(a)': 'Inativo(a)' }}</td>
      </tr>
      <tr>
        <td>Criado em</td>
        <td>{{ user.created }}</td>
      </tr>
    </tbody>
  </table>
  <router-link :to="'/usuarios/contato/' + user.id" class="btn btn-info">Contatar</router-link>
</section>

</template>

<script>
export default {
  name: 'UserList',
  data () {
    return {
      user: {}
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.$usersService.list(this.$router.history.current.params.id)
        .then(response => {
          if (response.status === 200) {
            this.user = response.data
            localStorage.setItem('access_token', response.headers.authorization.replace('Bearer ', ''))
          }
        }).catch(error => {
          switch (error.response.status) {
            case 401:
              if (error.response.data.message === 'Expired token') {
                sessionStorage.message = 'Sessão expirada'
                this.$usersService.timeout()
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
    })
  }
}
</script>

<style scoped>

section#list-user{
  padding: 2%;
}

@media screen and (min-width: 400px) {
  fieldset{ width: 90%!important; }
}

@media screen and (min-width: 500px) {
  fieldset{ width: 80%!important; }
}

@media screen and (min-width: 600px) {
  fieldset{ width: 70%!important; }
}

@media screen and (min-width: 700px) {
  fieldset{ width: 60%!important; }
}

@media screen and (min-width: 800px) {
  fieldset{ width: %!important; }
}

</style>
