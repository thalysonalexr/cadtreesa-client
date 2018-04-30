<template>

<section id="change-pass" class="container">
  <div id="errors" v-if="errors.length">
    <ul v-for="error in errors" :key="error.index">
      <li class="alert alert-danger">{{ error }}</li>
    </ul>
  </div>
  <div id="success" v-if="registered">
    <div class="alert alert-success">
      Senha atualizada com sucesso! <a href="/login">Fazer login agora!</a>
    </div>
  </div>
  <form v-on:submit.prevent="submitForm">
    <legend>Recuperação de senha <i class="fas fa-key"></i></legend>
    <fieldset>
      <div class="form-group">
        <label for="password">Nova senha</label>
        <input v-model="password" type="password" name="password" class="form-control" id="password" placeholder="Digite a nova senha" tabindex="1" required maxlength="255" minlength="5">
      </div>
      <div class="form-group">
        <label for="confirm">Confirmar nova senha</label>
        <input v-on:keyup="checkPass" type="password" name="confirm" class="form-control" id="confirm" placeholder="Confirme sua senha" tabindex="2" required maxlength="255">
      </div>
      <button class="btn btn-primary" type="submit">Trocar senha</button>
    </fieldset>
  </form>
</section>

</template>

<script>
export default {
  name: 'ChangePassword',
  data () {
    return {
      password: '',
      errors: [],
      registered: false
    }
  },
  methods: {
    submitForm: function () {
      this.$usersService.changePassword(this.password, this.$router.history.current.params.token)
        .then(response => {
          if (response.status === 204) {
            this.errors = []
            this.clearFields()
            this.registered = true
          }
        }).catch(error => {
          this.errors = []
          switch (error.response.status) {
            case 400:
              this.errors.push(error.response.data.errors.message)
              break
            case 401:
              this.errors.push(error.response.data.message)
              break
            case 500:
              this.errors.push(error.response.data.message)
              break
          }
        })
    },
    checkPass: function () {
      this.errors = []
      if (document.getElementById('confirm').value !== document.getElementById('password').value) {
        this.errors.push("Password confirmation doesn't match the password")
        this.validated = false
      } else {
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

<style>
button.btn{ width: 100%; }

section#change-pass{
  min-height: 100%;
  padding: 3%;
}

section#change-pass form{
  width: 420px!important;
  margin: 5% auto;
}

section#change-pass form fieldset{
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

section#change-pass form .btn{
  background-color: #277021;
  border: 0;
  border-radius: 7px;
  box-shadow: 2px 2px 7px #808080;
}

section#change-pass form .btn:hover{
  background-color: #0f5108;
}

section#change-pass form .form-group{
  margin-bottom: 5%;
  padding-right: 3%;
  padding-left: 3%;
}

</style>
