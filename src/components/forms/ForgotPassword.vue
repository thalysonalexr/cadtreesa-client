<template>
<section id="forgot-pass" class="container">
  <div id="errors" v-if="errors.length">
    <ul v-for="error in errors" :key="error.index">
      <li class="alert alert-danger">{{ error }}</li>
    </ul>
  </div>
  <div id="success" v-if="sent">
    <div class="alert alert-success">
      Accesse seu e-mail para prosseguir com a solicitação
    </div>
  </div>
  <form v-on:submit.prevent="submitForm">
    <legend>Recuperação de senha</legend>
    <fieldset>
      <div class="form-group">
        <label for="email"><i class="fas fa-user fa-sm"></i> Digite seu e-mail cadastrado</label>
      <input v-model="email" type="email" name="email" class="form-control" id="email" placeholder="exemplo@email.com" tabindex="1" required maxlength="100">
    </div>
    <button class="btn btn-primary" type="submit">Iniciar recupearação</button>
    </fieldset>
  </form>
</section>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data () {
    return {
      email: '',
      errors: [],
      sent: false
    }
  },
  methods: {
    submitForm: function () {
      this.$usersService.forgotPassword(this.email)
        .then(response => {
          if (response.status === 202) {
            this.errors = []
            this.sent = true
          }
        }).catch(error => {
          this.errors = []
          if (error.response.status === 400) {
            this.errors.push('Email field is incorrect')
          } else if (error.response.status === 404) {
            this.errors.push('No records found for email address')
          } else if (error.response.status === 500) {
            this.errors.push('Server error. Try again later')
          }
        })
    }
  }
}
</script>

<style scoped>
button.btn{ width: 100%; }

section#forgot-pass{
  min-height: 100%;
  padding: 3%;
}

section#forgot-pass form{
  width: 420px!important;
  margin: 5% auto;
}

section#forgot-pass form fieldset{
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

section#forgot-pass form .btn{
  background-color: #277021;
  border: 0;
  border-radius: 7px;
  box-shadow: 2px 2px 7px #808080;
}

section#forgot-pass form .btn:hover{
  background-color: #0f5108;
}

section#forgot-pass form .form-group{
  margin-bottom: 5%;
  padding-right: 3%;
  padding-left: 3%;
}
</style>
