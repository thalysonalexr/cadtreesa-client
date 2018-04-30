<template>

<section id="register" class="container">
  <div id="errors" v-if="errors.length">
    <span><strong>Corrija os seguinte(s) erro(s):</strong></span>
    <ul v-for="error in errors" :key="error.index">
      <li class="alert alert-danger">{{ error }}</li>
    </ul>
  </div>
  <div id="success" v-if="registered">
    <div class="alert alert-success">
      Cadastro realizado com sucesso! <router-link to="/login">Fazer login agora!</router-link>
    </div>
  </div>
  <form v-on:submit.prevent="register">
    <fieldset>
      <legend>Cadastro de Usuários</legend>
      <div class="form-group">
        <label for="name"><span class="obrigatory">* </span>Nome</label>
        <input v-model="user.name" type="text" name="name" class="form-control" id="name" placeholder="Nome completo" tabindex="1" required maxlength="255" autofocus>
      </div>
      <div class="form-group">
        <label for="email"><span class="obrigatory">* </span>E-mail</label>
        <input v-model="user.email" type="email" name="email" class="form-control" id="email" placeholder="Endereço de e-mail válido" tabindex="2" required maxlength="100">
      </div>
      <div class="form-group">
        <label for="rgacpf"><span class="obrigatory">* </span>RGA ou CPF</label>
        <input v-model="user.rgacpf" type="text" name="rgacpf" class="form-control" id="rgacpf" placeholder="RGA caso aluno e CPF para professor" tabindex="3" required maxlength="12" minlength="11">
      </div>
      <div class="form-group">
        <label for="password"><span class="obrigatory">* </span>Senha</label>
        <input v-model="user.password" type="password" name="password" class="form-control" id="password" placeholder="Senha com o minimo de 5 caracteres" tabindex="4" required maxlength="255" minlength="5">
      </div>
      <div class="form-group">
        <label for="confirm"><span class="obrigatory">* </span>Confirmar</label>
        <input v-on:keyup="checkPass" type="password" class="form-control" id="confirm" placeholder="Confirmar a senha" tabindex="5" required maxlength="255" minlength="5">
      </div>
    </fieldset>
    <button class="btn" type="submit">Registrar-se</button>
  </form>
</section>

</template>

<script>
export default {
  name: 'RegisterUser',
  data () {
    return {
      user: {
        name: '',
        rgacpf: '',
        email: '',
        password: ''
      },
      errors: [],
      registered: false,
      validated: false
    }
  },
  methods: {
    register: function (event) {
      if (this.validated) {
        this.$usersService.create(this.user)
          .then(response => {
            if (response.status === 201) {
              this.registered = true
              this.clearFields()
              this.errors = []
            }
          }).catch(error => {
            this.errors = []
            if (error.response.status === 400) {
              for (var err of error.response.data.errors) {
                this.errors.push(err.message)
              }
            } else if (error.response.status === 500) {
              this.errors.push('Server error. Try again later')
            }
          })
      }
    },
    checkPass: function () {
      if (document.getElementById('confirm').value !== document.getElementById('password').value) {
        this.errors = []
        this.errors.push("Password confirmation doesn't match the password")
        this.validated = false
      } else {
        this.errors = []
        this.validated = true
      }
    },
    clearFields: function () {
      for (var key in this.user) {
        this.user[key] = ''
      }
      document.getElementById('confirm').value = ''
    }
  }
}
</script>

<style scoped>
section#register{
  min-height: 100%;
  padding: 3%;
}

section#register form{
  width: 770px;
  margin: auto;
}

button.btn{
  background-color: #277021;
  color: #fff;
  width: 150px;
}

legend{
  text-transform: uppercase;
  width: 100%;
  color: #fff!important;
  background-color: #277021;
  margin-bottom: 5%!important;
  border-radius: 7px;
  box-shadow: 2px 2px 7px #808080;
}

</style>
