<template>
<section id="register" class="container">
  <div id="errors" v-if="errors.length">
    <span><strong>Corrija os seguinte(s) erro(s):</strong></span>
    <ul v-for="error in errors" :key="error.index">
      <li class="alert alert-danger">{{ error }}</li>
    </ul>
  </div>
  <div id="success" class="container" v-if="registered">
    <div class="alert alert-success">
      Árvore cadastrada com sucesso!
    </div>
    <figure id="qrcode">
      <img class="rounded float-left img-thumbnail" :src="'data:image/png;base64,' + qrcode">
      <br><a class="btn link-download" :href="'data:image/png;base64,' + qrcode" download>Download QRCode</a>
    </figure>
  </div>
  <form v-on:submit.prevent="register">
    <fieldset>
      <legend class="lgd-main">Cadastro de Árvores <i class="fas fa-tree fa-lg"></i></legend>
      <div class="form-group">
        <label for="name">Nome</label>
        <input v-model="tree.name" type="text" name="name" class="form-control" id="name" placeholder="Nome popular" tabindex="1" required maxlength="45">
      </div>
      <div class="form-group">
        <label for="specie">Espécie</label>
        <input v-model="tree.specie" type="text" name="specie" class="form-control" id="specie" placeholder="Espécia na classificação cientifíca" tabindex="2" required maxlength="45">
      </div>
      <div class="form-group">
        <label for="family">Família</label>
        <input v-model="tree.family" type="text" name="family" class="form-control" id="family" placeholder="Família na classificação cientifíca" tabindex="3" maxlength="45">
      </div>
      <div class="form-group">
        <label for="cap">CAP</label>
        <input v-model="tree.cap" type="number" name="cap" class="form-control" id="cap" placeholder="Circunferência da altura do peito (metros)" tabindex="4" step="0.01">
      </div>
      <div class="form-group">
        <label for="height">Altura</label>
        <input v-model="tree.height" type="number" name="height" class="form-control" id="height" placeholder="Altura total (metros)" tabindex="5">
      </div>
      <!-- classcup -->
      <fieldset id="classcup" class="wrapper">
        <legend>Classe da copa</legend>
        <div class="form-check">
          <input v-model="tree.classcup" type="radio" name="classcup" class="form-check-input" id="ampla" value="ampla" tabindex="6" checked>
          <label for="ampla" class="form-check-label">Ampla</label>
        </div><br>
        <div class="form-check">
          <input v-model="tree.classcup" type="radio" name="classcup" class="form-check-input" id="mediana" value="mediana" tabindex="7">
          <label for="mediana" class="form-check-label">Mediana</label>
        </div><br>
        <div class="form-check">
          <input v-model="tree.classcup" type="radio" name="classcup" class="form-check-input" id="curta" value="curta" tabindex="8">
          <label for="curta" class="form-check-label">Curta</label>
        </div>
      </fieldset>
      <!-- sanity -->
      <fieldset id="sanity" class="wrapper">
        <legend>Sanidade</legend>
        <div class="form-check">
          <input v-model="tree.sanity" type="radio" name="sanity" class="form-check-input" id="boa" value="boa" tabindex="9" checked>
          <label for="boa" class="form-check-label">Boa</label>
        </div><br>
        <div class="form-check">
          <input v-model="tree.sanity" type="radio" name="sanity" class="form-check-input" id="media" value="média" tabindex="10">
          <label for="media" class="form-check-label">Média</label>
        </div><br>
        <div class="form-check">
          <input v-model="tree.sanity" type="radio" name="sanity" class="form-check-input" id="ruim" value="ruim" tabindex="11">
          <label for="ruim" class="form-check-label">Ruim</label>
        </div>
      </fieldset>
      <!-- growth -->
      <fieldset id="growth" class="wrapper">
        <legend>Crescimento</legend>
        <div class="form-check">
          <input v-model="tree.growth" type="radio" name="growth" class="form-check-input" id="lento" value="lento" tabindex="12" checked>
          <label for="lento" class="form-check-label">Lento</label>
        </div><br>
        <div class="form-check">
          <input v-model="tree.growth" type="radio" name="growth" class="form-check-input" id="devagar" value="devagar" tabindex="13">
          <label for="devagar" class="form-check-label">Devagar</label>
        </div><br>
        <div class="form-check">
          <input v-model="tree.growth" type="radio" name="growth" class="form-check-input" id="normal" value="normal" tabindex="14">
          <label for="normal" class="form-check-label">Normal</label>
        </div><br>
        <div class="form-check">
          <input v-model="tree.growth" type="radio" name="growth" class="form-check-input" id="rapido" value="rápido" tabindex="15">
          <label for="rapido" class="form-check-label">Rápido</label>
        </div><br>
        <div class="form-check">
          <input v-model="tree.growth" type="radio" name="growth" class="form-check-input" id="m-rapido" value="muito rápido" tabindex="16">
          <label for="m-rapido" class="form-check-label">Muito rápido</label>
        </div>
      </fieldset>
      <!-- sociological -->
      <fieldset id="sociological" class="wrapper">
        <legend>Posição sociológica</legend>
        <div class="form-check">
          <input v-model="tree.sociological" type="radio" name="emergente" class="form-check-input" id="emergente" value="emergente" tabindex="17" checked>
          <label for="emergente" class="form-check-label">Emergente</label>
        </div><br>
        <div class="form-check">
          <input v-model="tree.sociological" type="radio" name="superior" class="form-check-input" id="superior" value="superior" tabindex="18">
          <label for="superior" class="form-check-label">Superior</label>
        </div><br>
        <div class="form-check">
          <input v-model="tree.sociological" type="radio" name="medio" class="form-check-input" id="medio" value="médio" tabindex="19">
          <label for="medio" class="form-check-label">Médio</label>
        </div><br>
        <div class="form-check">
          <input v-model="tree.sociological" type="radio" name="inferior" class="form-check-input" id="inferior" value="inferior" tabindex="20">
          <label for="inferior" class="form-check-label">Inferior</label>
        </div><br>
        <div class="form-check">
          <input v-model="tree.sociological" type="radio" name="isolada" class="form-check-input" id="isolada" value="isolada" tabindex="21">
          <label for="isolada" class="form-check-label">Isolada</label>
        </div>
      </fieldset>
      <div class="form-group">
        <label for="utilization">Utilização</label>
        <input v-model="tree.utilization" type="text" name="utilization" class="form-control" id="utilization" placeholder="Ex: Comércio e paisagismo" tabindex="22" maxlength="255">
      </div>
      <div class="form-group">
        <label for="features">Características</label>
        <textarea v-model="tree.features" class="form-control" id="features" name="features" maxlength="1500" rows="4" placeholder="Ex: Árvore de grande porta, com boa saúde reemplantada a 3 meses" tabindex="23"></textarea>
      </div>
      <!-- no functional -->
      <div class="form-group">
        <label for="image">Foto da árvore</label>
        <input type="file" class="form-control-file" id="image" name="image" tabindex="24">
      </div>
      <!--  -->
      <fieldset id="location" class="wrapper">
        <legend>Localização</legend>
        <div class="form-group">
          <label for="latitude">Latitude</label>
          <input v-model="tree.latitude" class="form-control" type="text" name="latitude" id="latitude" disabled>
        </div>
        <div class="form-group">
          <label for="longitude">Longitude</label>
          <input v-model="tree.longitude" class="form-control" type="text" name="longitude" id="longitude" disabled>
        </div>
        <input v-on:click="getLocalization" type="button" class="btn btn-info" value="Obter localização" id="get-location" name="get-location" tabindex="25">
      </fieldset>
    </fieldset>
    <div class="center">
      <button class="btn" type="submit">Finalizar cadastro</button>
    </div>
  </form>
</section>
</template>

<script>
export default {
  name: 'RegisterTree',
  data () {
    return {
      tree: {
        name: '',
        specie: '',
        family: '',
        cap: 0.0,
        height: 0,
        classcup: 'ampla',
        sanity: 'boa',
        growth: 'normal',
        sociological: 'isolada',
        utilization: '',
        features: '',
        image: '',
        latitude: 0.0,
        longitude: 0.0
      },
      qrcode: null,
      errors: [],
      registered: false,
      validated: true
    }
  },
  methods: {
    getLocalization: function () {
      navigator.geolocation.getCurrentPosition(function (position) {
        document.getElementById('latitude').value = position.coords.latitude
        document.getElementById('longitude').value = position.coords.longitude
        document.getElementById('latitude').dispatchEvent(new Event('input'))
        document.getElementById('longitude').dispatchEvent(new Event('input'))
      })
    },
    register: function (event) {
      if (this.validated) {
        this.errors = []
        this.$treesService.create(this.tree)
          .then(response => {
            if (response.status === 201) {
              this.registered = true
              this.createQrCode(response.data.id)
              localStorage.setItem('access_token', response.headers.authorization.replace('Bearer ', ''))
              window.scrollTo(0, 0)
            }
          }).catch(error => {
            console.log(error.response)
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
              case 500:
                this.errors.push('Server error. Try again later')
                break
            }
            window.scrollTo(0, 0)
          })
      }
    },
    createQrCode: function (id) {
      this.$publicService.qrcode(`${window.location.origin}/arvores/listar/${id}`)
        .then(response => {
          this.qrcode = response
        }).catch(error => {
          switch (error.response.status) {
            case 400:
              console.log('error in implementation')
              break
            case 500:
              console.log('error in server')
              break
          }
        })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Oxygen');
fieldset{ width: 100%; }

figure#qrcode{ text-align: center; }

figure#qrcode img{
  margin: 3%;
  float: none!important;
}

fieldset.wrapper{
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  padding: 2% 0;
}

fieldset.wrapper legend{
  text-align: left;
  width: unset!important;
}

.form-check label{ font-size: 1em!important; }

.center{
  text-align: center;
  margin: 3%;
}

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
  width: 200px;
}

.lgd-main{
  text-transform: uppercase;
  width: 100%;
  color: #fff!important;
  background-color: #277021;
  margin-bottom: 5%!important;
  border-radius: 7px;
  box-shadow: 2px 2px 7px #808080;
}

#location{
  padding: 3%;
}

.link-download{
  width: 250px;
  background-color: #4a89ef;
  color: #fff;
  border-radius: 25px;
  padding: 1%;
  text-transform: uppercase;
  font-family: 'Oxygen', sans-serif!important;
  font-weight: 600;
  border: 0;
  border: 2px solid #4a89ef;
}

.link-download:hover{
  background-color: transparent;
  color: #4a89ef;
}

</style>
