<template>
  <div class="rank-head container">
    <router-link to="/rank" class="rank-head-back"></router-link>
    {{title}}
  </div>
</template>

<script type="es6">
  export default {
    props:['title'],
    name:'rank-head'
  }
</script>
