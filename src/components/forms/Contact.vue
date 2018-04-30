<template>

<section id="contact">
  <div id="errors" v-if="errors.length">
    <span><strong>Corrija os seguinte(s) erro(s):</strong></span>
    <ul v-for="error in errors" :key="error.index">
      <li class="alert alert-danger">{{ error }}</li>
    </ul>
  </div>
  <div id="success" v-if="sent">
    <div class="alert alert-success">
      Mensagem enviada com sucesso
    </div>
  </div>

  <form v-on:submit.prevent="sendMessage">
    <fieldset>
      <legend>Enviar mensagem para usuário</legend>
      <div class="form-group">
        <label for="name">Nome</label>
        <input v-model="contact.name" type="text" name="name" id="name" class="form-control" maxlength="255" placeholder="Nome completo" tabindex="1" required>
      </div>
      <div class="form-group">
        <label for="to-email">E-mail para retorno (seu e-mail)</label>
        <input v-model="contact.toEmail" type="email" name="to-email" id="to-mail" class="form-control" maxlength="255" placeholder="exemplo@email.com" tabindex="2" required>
      </div>
      <div class="form-group">
        <label for="from-email">Enviar para</label>
        <input v-model="contact.fromEmail" type="email" name="from-email" id="from-mail" class="form-control" maxlength="255" placeholder="exemplo@email.com" tabindex="3" required disabled>
      </div>
      <div class="form-group">
        <label for="subject">Assunto</label>
        <input v-model="contact.subject" type="text" name="subject" id="subject" class="form-control" maxlength="255" placeholder="Assunto da mensagem" tabindex="4" required autofocus>
      </div>
      <div class="form-group">
        <label for="message">Mensagem</label>
        <textarea v-model="contact.message" class="form-control" name="message" id="message" maxlength="2000" placeholder="Digite sua mensagem aqui..." rows="4" tabindex="5" required></textarea>
      </div>
    </fieldset>
    <button type="submit" class="btn btn-primary">Enviar</button>
  </form>
</section>

</template>

<script>
export default {
  name: 'Contact',
  data () {
    return {
      sent: false,
      errors: [],
      contact: {
        name: '',
        toEmail: '',
        fromEmail: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    sendMessage: function () {
      this.$publicService.sendMail(this.contact)
        .then(response => {
          if (response.status === 200) {
            this.sent = true
          }
        }).catch(error => {
          console.log(error.response)
          switch (error.response.status) {
            case 400:
              for (var err of error.response.data.errors) {
                this.errors.push(err.message)
              }
              break
            case 500:
              this.errors.push(error.response.data.message)
              break
          }
        })
    }
  },
  mounted () {
    this.$nextTick(function () {
      try {
        var token = this.$jwt.decode(localStorage.getItem('access_token'))
      } catch (err) {
        console.log('Error. Try again later')
        this.$router.push('/')
      }

      this.$usersService.list(token.data.id)
        .then(response => {
          if (response.status === 200) {
            this.contact.name = response.data.name
            this.contact.toEmail = response.data.email
          }
        }).catch(error => {
          switch (error.response.status) {
            case 401:
              console.log(error.response)
              break
            case 403:
              break
            case 404:
              break
            case 500:
              break
          }
        })
      this.$usersService.list(this.$router.history.current.params.id)
        .then(response => {
          if (response.status === 200) {
            this.contact.fromEmail = response.data.email
            localStorage.setItem('access_token', response.headers.authorization.replace('Bearer ', ''))
          }
        }).catch(error => {
          switch (error.response.status) {
            case 401:
              console.log(error.response)
              break
            case 403:
              break
            case 404:
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

section#contact{
  padding: 3%;
}

input{
  width: 100%!important;
}

</style>
