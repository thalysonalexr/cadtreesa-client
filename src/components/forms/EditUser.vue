<template>

<section id="edit-user" class="container">
  <div id="errors" v-if="errors.length">
    <span><strong>Corrija os seguinte(s) erro(s):</strong></span>
    <ul v-for="error in errors" :key="error.index">
      <li class="alert alert-danger">{{ error }}</li>
    </ul>
  </div>
  <div id="success" v-if="success">
    <div class="alert alert-success">
      Usuário alterado com sucesso! <router-link to="-1">Voltar ao painel de controle</router-link>
    </div>
  </div>
  <form v-on:submit.prevent="submitInfo">
    <fieldset>
      <legend>Editar informações <i class="fas fa-users fa-lg"></i></legend>
      <div class="form-group">
        <label for="name">Nome</label>
        <input v-model="user.name" type="text" name="name" class="form-control" id="name" placeholder="Nome completo" tabindex="1" required maxlength="255" autofocus>
      </div>
      <div class="form-group">
        <label for="email">E-mail</label>
        <input v-model="user.email" type="email" name="email" class="form-control" id="email" placeholder="Endereço de e-mail válido" tabindex="2" required maxlength="100">
      </div>
      <div class="form-group">
        <label for="rgacpf">RGA ou CPF</label>
        <input v-model="user.rgacpf" type="text" name="rgacpf" class="form-control" id="rgacpf" placeholder="RGA caso aluno e CPF para professor" tabindex="3" required maxlength="12" minlength="11">
      </div>
    </fieldset>
    <button class="btn" type="submit">Atualizar informações</button>
  </form>
  <form v-on:submit.prevent="submitPass">
    <fieldset>
      <legend>Atualizar credenciais</legend>
      <div class="form-group">
        <label for="password">Senha atual</label>
        <input v-model="password.old" type="password" name="old-password" class="form-control" id="old-password" placeholder="Sua senha atual" tabindex="4" required maxlength="255" minlength="5">
      </div>
      <div class="form-group">
        <label for="password">Nova senha</label>
        <input v-model="password.new" type="password" name="new-password" class="form-control" id="new-password" placeholder="Senha com o minimo de 5 caracteres" tabindex="5" required maxlength="255" minlength="5">
      </div>
      <div class="form-group">
        <label for="confirm">Confirmar nova senha</label>
        <input v-model="password.confirm" type="password" name="confirm" class="form-control" id="confirm" placeholder="Confirmar a senha" tabindex="6" required maxlength="255" minlength="5">
      </div>
    </fieldset>
    <button class="btn" type="submit">Atualizar credenciais</button>
  </form>
</section>

</template>

<script>
export default{
  name: 'EditUser',
  data () {
    return {
      errors: [],
      success: false,
      idUser: 0,
      user: {
        name: '',
        rgacpf: '',
        email: '',
        password: ''
      },
      password: {
        old: '',
        new: '',
        confirm: ''
      }
    }
  },
  methods: {
    submitInfo: function () {
      this.$usersService.edit(this.idUser, this.user)
        .then(response => {
          if (response.status === 200) {
            this.success = true
            this.errors = []
            localStorage.setItem('access_token', response.headers.authorization.replace('Bearer ', ''))
          }
        }).catch(error => {
          switch (error.response.status) {
            case 400:
              for (var err of error.response.data.errors) {
                this.errors.push(err.message)
              }
              break
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
    },
    submitPass: function () {
      this.errors = []

      this.$usersService.checkPass(this.password.old)
        .then(response => {
          if (response.status === 200) {
            localStorage.setItem('access_token', response.headers.authorization.replace('Bearer ', ''))
          }
        }).catch(error => {
          switch (error.response.status) {
            case 400:
              this.errors.push(error.response.data.errors[0].message)
              break
            case 401:
              this.errors.push("Old password isn't valid")
              break
            case 403:
              break
            case 415:
              break
            case 500:
              break
          }
        })

      if (this.password.new !== this.password.confirm) {
        this.errors.push("Password confirmation doesn't match the password")
      } else {
        this.$usersService.changePassword(this.password.new, localStorage.getItem('access_token'))
          .then(response => {
            if (response.status === 204) {
              this.success = true
              this.errors = []
              localStorage.setItem('access_token', response.headers.authorization.replace('Bearer ', ''))
            }
          }).catch(error => {
            switch (error.response.status) {
              case 400:
                break
              case 401:
                break
              case 500:
                break
            }
          })
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.$usersService.list(this.$router.history.current.params.id)
        .then(response => {
          if (response.status === 200) {
            this.idUser = response.data.id
            this.user.name = response.data.name
            this.user.rgacpf = response.data.rgacpf
            this.user.email = response.data.email
            this.user.password = response.data.password
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

section#edit-user{
  padding: 3%;
}

button.btn{
  background-color: #1fe0a3;
  color: #fff;
}

</style>
