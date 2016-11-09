<template>
  <div class="rank-head container" :style="style">
    <router-link :to="to" class="rank-head-back"></router-link>
    {{title}}
  </div>
</template>

<script type="es6">
  export default {
    props:['title','to','style'],
    name:'rank-head'
  }
</script>
