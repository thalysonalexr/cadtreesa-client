<template>
<section id="not-found" class="container">
  <header>
    <h1>
      {{ msg }}
    </h1>
    <h2>
      {{ description }}
    </h2>
  </header>
</section>
</template>

<script>
export default {
  name: 'NotFound',
  data () {
    return {
      msg: '404 :(',
      description: 'Página não encontrada.'
    }
  }
}
</script>

<style scoped>

header{ text-align: center; }

</style>
