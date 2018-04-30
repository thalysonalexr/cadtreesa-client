<template>
<section id="login" class="container">
  <div id="errors" v-if="errors.length">
    <ul v-for="error in errors" :key="error.index">
      <li class="alert alert-danger">{{ error }}</li>
    </ul>
  </div>
  <form v-on:submit.prevent="submitLogin">
    <fieldset>
      <legend>Login de usuário</legend>
      <div class="form-group">
        <label for="email"><i class="fas fa-user fa-sm"></i> E-mail</label>
        <input v-model="user.email" type="email" name="email" class="form-control" id="email" placeholder="exemplo@email.com" tabindex="1" required maxlength="100" autofocus>
      </div>
      <div class="form-group">
        <label for="password"><i class="fas fa-key fa-sm"></i> Senha</label>
        <input v-model="user.password" type="password" name="password" class="form-control" id="password" placeholder="Digite sua senha" tabindex="2" required minlength="5" maxlength="255">
      </div>
      <button class="btn btn-primary" type="submit">Entrar</button>
    </fieldset>
    <div id="forgot" class="form-group">
      <p>Esqueceu a senha?
        <router-link to="/recuperar-senha">
           Clique aqui
        </router-link>
      </p>
    </div>
  </form>
</section>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      errors: []
    }
  },
  methods: {
    submitLogin: function (event) {
      this.$usersService.login(this.user)
        .then(response => {
          if (response.status === 200) {
            localStorage.setItem('access_token', response.data.access_token)
            this.$router.push({path: `redirect/${localStorage.getItem('access_token')}`})
          }
        }).catch(error => {
          this.errors = []
          switch (error.response.status) {
            case 400:
              for (var err of error.response.data.errors) {
                this.errors.push(err.message)
              }
              break
            case 401:
              this.errors.push(error.response.data.errors[0].message)
              break
            case 404:
              this.errors.push(error.response.data.message)
              break
            case 415:
              this.errors.push('Application Error. Contact cadtreesa.suporte@gmail.com')
              break
            case 500:
              this.errors.push('Server error. Try again later')
              break
          }
        })
    }
  }
}
</script>

<style scoped>
button.btn{ width: 100%; }

section#login{
  min-height: 100%;
  padding: 3%;
}

section#login form{
  width: 420px!important;
  margin: 5% auto;
}

section#login form fieldset{
  margin-bottom: 3%!important;
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

section#login form .btn{
  background-color: #277021;
  border: 0;
  border-radius: 7px;
  box-shadow: 2px 2px 7px #808080;
}

section#login form .btn:hover{
  background-color: #0f5108;
}

section#login form .form-group{
  margin-bottom: 5%;
  padding-right: 3%;
  padding-left: 3%;
}

#forgot p{
  text-align: center;
}
</style>
