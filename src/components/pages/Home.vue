<template>

<section id="home" class="container">
  <h1>
    Olá, {{ msg }}
  </h1>
  <h2>
    {{ description }}
  </h2>
  <ul class="projects">
    <li>
      <a target="_blank" href="https://github.com/thalysonrodrigues/cadtreesa"><i class="fas fa-link"></i> Website Cadtreesa</a>
    </li>
    <li>
      <a target="_blank" href="https://github.com/thalysonrodrigues/API-RESTful-cadtreesa"><i class="fas fa-link"></i> API Cadtreesa</a>
    </li>
  </ul>
  <div id="options" class="center">
    <router-link class="btn btn-info btn-lg" to="/login">Sign In <i class="fas fa-sign-in-alt"></i></router-link>
    <router-link class="btn btn-info btn-lg" to="/cadastro">Sign Up <i class="fas fa-user-plus"></i></router-link>
  </div>
</section>

</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Seja bem-vindo ao Projeto Cadtreesa',
      description: 'Esta é a interface cliente do projeto Cadtreesa, para mais informações acesse o website do projeto ou veja a API.'
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lobster');
@import url('https://fonts.googleapis.com/css?family=Asap');

#home{
  background-image: linear-gradient(270deg, #36842f, #8eff84), url('../../assets/images/bg-home3.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-blend-mode: multiply;
  min-width: 100%;
  min-height: 100%;
  transition: background-image 500ms ease-in-out;
}

h1, h2{ text-align: center; }

h1{
  font-size: 3.5em;
  font-family: 'Lobster', cursive!important;
}

h2{ font-size: 1.5em; }

#options, h1, h2{
  padding: 5%;
  color: #fff;
}

/* options buttons {SIGNIN} | {SIGNUP} */
#options a{
  text-transform: uppercase!important;
  width: 150px;
  font-family: 'Asap', sans-serif!important;
  background-color: #36842f!important;
  border: 2px solid #4bc141;
}

#options a:hover{
  background-color: transparent!important;
}

#options a:first-child{ margin-right: 3%; }

.center{ text-align: center; }

.projects{ list-style: none; }

.projects li a{
  font-size: 1.2em;
  color: #fff;
}
</style>
