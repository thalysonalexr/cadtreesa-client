<template>
<main>
  <nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/">
      <img id="logo" src="./assets/images/logo.png" width="30" alt="Logotipo Cadtreesa"> Cadtreesa
    </a>
  </nav>
  <router-view/>
  <footer id="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-12 py-5">
          <div class="social-network">
            <a class="github" target="_blank" href="https://github.com/thalysonrodrigues"><i class="fab fa-github fa-2x"></i></a>
            <a class="googleplus" target="_blank" href="https://plus.google.com/u/0/112388458181496755071"><i class="fab fa-google-plus-g fa-2x"></i></a>
            <a class="twitter" target="_blank" href="https://twitter.com/thalyson_rodss"><i class="fab fa-twitter fa-2x"></i></a>
            <a class="linkedin" target="_blank" href="https://www.linkedin.com/in/thalyson-alexandre-rodrigues-de-sousa-46a99114a/"><i class="fab fa-linkedin-in fa-2x"></i></a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-copyright py-3 text-center">
      © {{ new Date().getFullYear() }} Copyright:
      <a target="_blank" href="https://github.com/thalysonrodrigues">Thalyson Rodrigues</a>
    </div>
  </footer>
</main>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#logo{ width: 42px; }

#navbar, #footer{ background-color: #4bc141!important; }

.navbar-brand{
  color: #fff!important;
  font-size: 26px;
}

.social-network{
  text-align: center;
}

.social-network a{
  margin-right: 2%;
  color: #fff;
}

.github:hover{ color: #24292e; }
.googleplus:hover{ color: #db4437; }
.twitter:hover{ color: #1DA1F2; }
.linkedin:hover{ color: #0073b1; }

.social-network a:last-child{
  margin-right: 0;
}

.footer-copyright{ color: #fff; }
</style>
