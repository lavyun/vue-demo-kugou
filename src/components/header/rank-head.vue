<template>
  <div class="rank-head container">
    <router-link :to="to" class="rank-head-back"></router-link>
    {{title}}
  </div>
</template>

<script type="es6">
  export default {
    props:['title','to'],
    name:'rank-head'
  }
</script>
